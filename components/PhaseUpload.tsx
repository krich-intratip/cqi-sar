'use client';

import React, { useCallback, useState, useRef, useEffect } from 'react';
import { Upload, FileText, Sparkles, Loader2 } from 'lucide-react';
import { generateContent } from '@/app/actions/ai';
import { generateSummaryPrompt } from '@/lib/prompts';
import { AIConfig } from '@/types/evaluation';

interface PhaseUploadProps {
    config: AIConfig;
    pdfText: string | null;
    setPdfText: (text: string | null) => void;
    onFileProcessed: (ready: boolean) => void;
    onNext: () => void;
    onBack: () => void;
}

export default function PhaseUpload({ config, pdfText, setPdfText, onFileProcessed, onNext, onBack }: PhaseUploadProps) {
    const [dragOver, setDragOver] = useState(false);
    const [fileName, setFileName] = useState('');
    const [fileSize, setFileSize] = useState('');
    const [extracting, setExtracting] = useState(false);
    const [summarizing, setSummarizing] = useState(false);
    const [summaryHtml, setSummaryHtml] = useState<string | null>(null);
    const fileInputRef = useRef<HTMLInputElement>(null);
    const pdfjsLoaded = useRef(false);

    // Load PDF.js
    useEffect(() => {
        if (!pdfjsLoaded.current && typeof window !== 'undefined') {
            const script = document.createElement('script');
            script.src = 'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.min.js';
            script.onload = () => {
                pdfjsLoaded.current = true;
                // @ts-ignore
                window.pdfjsLib.GlobalWorkerOptions.workerSrc = 'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.worker.min.js';
            };
            document.head.appendChild(script);
        }
    }, []);

    const formatFileSize = (bytes: number) => {
        if (bytes < 1024) return bytes + ' B';
        if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(2) + ' KB';
        return (bytes / (1024 * 1024)).toFixed(2) + ' MB';
    };

    const extractPdfText = async (file: File): Promise<string> => {
        // @ts-ignore
        const pdfjsLib = window.pdfjsLib;
        const arrayBuffer = await file.arrayBuffer();
        const pdf = await pdfjsLib.getDocument({ data: arrayBuffer }).promise;
        let fullText = '';
        for (let i = 1; i <= pdf.numPages; i++) {
            const page = await pdf.getPage(i);
            const textContent = await page.getTextContent();
            const pageText = textContent.items.map((item: { str: string }) => item.str).join(' ');
            fullText += `--- หน้า ${i} ---\n${pageText}\n\n`;
        }
        return fullText;
    };

    const handleFile = useCallback(async (file: File) => {
        if (file.type !== 'application/pdf') {
            alert('กรุณาอัปโหลดไฟล์ PDF เท่านั้น');
            return;
        }

        setFileName(file.name);
        setFileSize(formatFileSize(file.size));
        setExtracting(true);
        setSummaryHtml(null);

        try {
            const text = await extractPdfText(file);
            setPdfText(text);
            onFileProcessed(true);
        } catch (error) {
            console.error('PDF extraction error:', error);
            alert('ไม่สามารถอ่านไฟล์ PDF ได้');
            onFileProcessed(false);
        } finally {
            setExtracting(false);
        }
    }, [setPdfText, onFileProcessed]);

    const handleDrop = useCallback((e: React.DragEvent) => {
        e.preventDefault();
        setDragOver(false);
        const file = e.dataTransfer.files[0];
        if (file) handleFile(file);
    }, [handleFile]);

    const handleSummarize = async () => {
        if (!pdfText || !config.provider || !config.apiKey) return;

        setSummarizing(true);
        try {
            const effectiveModel = config.customModel || config.model;
            const prompt = generateSummaryPrompt(pdfText);
            const result = await generateContent(
                { provider: config.provider, apiKey: config.apiKey, model: effectiveModel },
                prompt
            );
            if (result.success && result.text) {
                let cleanHtml = result.text.trim();
                cleanHtml = cleanHtml.replace(/^```html\s*/i, '').replace(/^```\s*/i, '').replace(/\s*```$/i, '');
                setSummaryHtml(cleanHtml);
            }
        } catch (error) {
            console.error('Summary error:', error);
        } finally {
            setSummarizing(false);
        }
    };

    const wordCount = pdfText ? pdfText.split(/\s+/).length : 0;
    const charCount = pdfText ? pdfText.length : 0;
    const pageCount = pdfText ? (pdfText.match(/--- หน้า \d+ ---/g) || []).length : 0;

    return (
        <div className="bg-bg-card rounded-2xl p-8 shadow-lg animate-fade-in-slide">
            <h2 className="text-2xl font-semibold mb-6 flex items-center gap-3">
                <span className="text-3xl">📄</span>
                ขั้นตอนที่ 2: อัปโหลดเอกสาร CQI
            </h2>

            {/* Drop Zone */}
            <div
                onClick={() => fileInputRef.current?.click()}
                onDragOver={(e) => { e.preventDefault(); setDragOver(true); }}
                onDragLeave={() => setDragOver(false)}
                onDrop={handleDrop}
                className={`border-3 border-dashed rounded-xl p-10 text-center cursor-pointer transition-all duration-300 ${dragOver
                        ? 'border-primary-blue bg-pastel-blue scale-[1.02]'
                        : 'border-gray-300 hover:border-primary-blue hover:bg-pastel-blue'
                    }`}
            >
                <Upload className="mx-auto mb-4" size={48} />
                <p className="font-semibold text-lg">คลิกหรือลากไฟล์ PDF มาวางที่นี่</p>
                <p className="text-sm text-gray-500 mt-2">รองรับไฟล์ PDF ขนาดไม่เกิน 10MB</p>
                <input
                    ref={fileInputRef}
                    type="file"
                    accept=".pdf"
                    onChange={(e) => e.target.files?.[0] && handleFile(e.target.files[0])}
                    className="hidden"
                />
            </div>

            {/* Extracting Status */}
            {extracting && (
                <div className="mt-4 p-4 bg-pastel-blue rounded-xl flex items-center gap-3">
                    <Loader2 className="animate-spin text-primary-blue" size={24} />
                    <span className="font-medium">กำลังอ่านเนื้อหา PDF...</span>
                </div>
            )}

            {/* File Info */}
            {fileName && !extracting && (
                <div className="mt-4 p-4 bg-pastel-green rounded-xl">
                    <div className="flex items-center gap-2 mb-2">
                        <FileText size={20} className="text-green-600" />
                        <span className="font-semibold">{fileName}</span>
                        <span className="text-sm text-gray-600">({fileSize})</span>
                    </div>
                    {pdfText && (
                        <div className="text-sm text-gray-600">
                            📊 จำนวนหน้า: {pageCount} | คำ: {wordCount.toLocaleString()} | ตัวอักษร: {charCount.toLocaleString()}
                        </div>
                    )}
                </div>
            )}

            {/* Summary Section */}
            {pdfText && (
                <div className="mt-6">
                    <button
                        onClick={handleSummarize}
                        disabled={summarizing}
                        className="px-6 py-3 bg-pastel-purple rounded-xl font-semibold transition-all hover:bg-purple-200 hover:-translate-y-1 disabled:opacity-50 flex items-center gap-2"
                    >
                        {summarizing ? <Loader2 className="animate-spin" size={18} /> : <Sparkles size={18} />}
                        {summarizing ? 'กำลังสรุปเนื้อหา...' : '✨ สรุปประเด็นสำคัญจากเอกสาร (AI)'}
                    </button>

                    {summaryHtml && (
                        <div
                            className="mt-4 p-6 bg-white border rounded-xl"
                            dangerouslySetInnerHTML={{ __html: summaryHtml }}
                        />
                    )}
                </div>
            )}

            {/* Navigation Buttons */}
            <div className="mt-8 flex gap-4">
                <button
                    onClick={onBack}
                    className="px-6 py-3 bg-gray-200 rounded-xl font-medium hover:bg-gray-300 transition-all"
                >
                    ← ย้อนกลับ
                </button>
                {pdfText && (
                    <button
                        onClick={onNext}
                        className="flex-1 py-3 bg-gradient-to-r from-primary-blue to-primary-dark text-white rounded-xl font-semibold transition-all hover:-translate-y-1 hover:shadow-lg flex items-center justify-center gap-2"
                    >
                        🚀 เริ่มการประเมิน
                    </button>
                )}
            </div>
        </div>
    );
}
