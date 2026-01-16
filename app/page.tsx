'use client';

import React, { useState, useEffect } from 'react';
import Navbar, { Phase } from '@/components/Navbar';
import PhaseSettings from '@/components/PhaseSettings';
import PhaseUpload from '@/components/PhaseUpload';
import PhaseEvaluation from '@/components/PhaseEvaluation';
import PhaseResults from '@/components/PhaseResults';
import UserGuide from '@/components/UserGuide';
import About from '@/components/About';
import QRCodeModal from '@/components/QRCodeModal';
import { AIConfig, EvaluationResults, APP_VERSION, APP_LAST_UPDATE, APP_NAME, APP_TITLE } from '@/types/evaluation';

export default function Home() {
    const [currentPhase, setCurrentPhase] = useState<Phase>('settings');
    const [config, setConfig] = useState<AIConfig>({
        provider: null,
        apiKey: '',
        model: '',
        customModel: ''
    });
    const [apiReady, setApiReady] = useState(false);
    const [pdfText, setPdfText] = useState<string | null>(null);
    const [fileReady, setFileReady] = useState(false);
    const [evaluationResults, setEvaluationResults] = useState<EvaluationResults | null>(null);
    const [isQRModalOpen, setIsQRModalOpen] = useState(false);

    // Load saved config from localStorage
    useEffect(() => {
        if (typeof window !== 'undefined') {
            const savedProvider = localStorage.getItem('cqi_provider');
            if (savedProvider) {
                const savedApiKey = localStorage.getItem(`cqi_apikey_${savedProvider}`);
                const savedModel = localStorage.getItem(`cqi_model_${savedProvider}`);
                const savedCustomModel = localStorage.getItem(`cqi_custom_model_${savedProvider}`);
                setConfig({
                    provider: savedProvider as AIConfig['provider'],
                    apiKey: savedApiKey || '',
                    model: savedModel || '',
                    customModel: savedCustomModel || ''
                });
            }
        }
    }, []);

    // Save config to localStorage
    useEffect(() => {
        if (typeof window !== 'undefined' && config.provider) {
            localStorage.setItem('cqi_provider', config.provider);
            if (config.apiKey) localStorage.setItem(`cqi_apikey_${config.provider}`, config.apiKey);
            if (config.model) localStorage.setItem(`cqi_model_${config.provider}`, config.model);
            if (config.customModel) localStorage.setItem(`cqi_custom_model_${config.provider}`, config.customModel);
        }
    }, [config]);

    const handleEvaluationComplete = (results: EvaluationResults) => {
        setEvaluationResults(results);
        setCurrentPhase('results');
    };

    const handleReset = () => {
        setPdfText(null);
        setFileReady(false);
        setEvaluationResults(null);
        setCurrentPhase('upload');
    };

    return (
        <div className="min-h-screen bg-bg-main py-8 px-4">
            <div className="max-w-[1200px] mx-auto">
                {/* Header */}
                <header className="text-center bg-gradient-to-br from-pastel-blue to-pastel-purple rounded-3xl p-10 mb-8 shadow-lg animate-fade-in-down">
                    <h1 className="text-4xl font-bold text-primary-dark mb-2">
                        🏆 {APP_TITLE}
                    </h1>
                    <p className="text-lg text-gray-600">
                        โดยผู้เชี่ยวชาญอัจฉริยะ 3 ท่าน
                    </p>
                    <p className="text-sm text-gray-500 mt-4">
                        {APP_NAME} {APP_VERSION} | อัปเดตล่าสุด: {APP_LAST_UPDATE}
                    </p>
                </header>

                {/* Donation Support Banner */}
                <div className="bg-gradient-to-r from-pastel-green via-pastel-purple to-pastel-blue p-6 rounded-2xl shadow-md mb-6 animate-fade-in">
                    <div className="flex flex-col md:flex-row items-center justify-center gap-6">
                        <div className="text-center md:text-left">
                            <h3 className="text-lg font-semibold text-gray-800 mb-2 flex items-center justify-center md:justify-start gap-2">
                                <span>☕</span> สนับสนุนผู้พัฒนา
                            </h3>
                            <p className="text-gray-600 text-sm">
                                สนับสนุนช่วยค่าเช่า Server ของ Web app นี้<br />
                                เพื่อให้สามารถบริการได้ต่อไป
                            </p>
                        </div>
                        <button
                            onClick={() => setIsQRModalOpen(true)}
                            className="w-28 h-28 rounded-xl overflow-hidden shadow-md border-2 border-white bg-white p-1 flex-shrink-0 cursor-pointer hover:scale-105 hover:shadow-lg transition-all duration-200 group relative"
                            title="คลิกเพื่อดูรูปขนาดใหญ่"
                        >
                            {/* eslint-disable-next-line @next/next/no-img-element */}
                            <img
                                src="/donation-qr.jpg"
                                alt="QR Code สำหรับบริจาค"
                                className="w-full h-full object-contain rounded-lg"
                            />
                            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors rounded-xl flex items-center justify-center">
                                <span className="opacity-0 group-hover:opacity-100 transition-opacity text-white text-xs font-medium bg-black/50 px-2 py-1 rounded">🔍 ดูใหญ่</span>
                            </div>
                        </button>
                    </div>
                </div>

                {/* Navigation */}
                <Navbar
                    currentPhase={currentPhase}
                    onPhaseChange={setCurrentPhase}
                    apiReady={apiReady}
                    fileReady={fileReady && apiReady}
                    resultsReady={evaluationResults !== null}
                />

                {/* Phase Content */}
                <main>
                    {currentPhase === 'settings' && (
                        <PhaseSettings
                            config={config}
                            setConfig={setConfig}
                            onApiTested={setApiReady}
                            onNext={() => setCurrentPhase('upload')}
                        />
                    )}

                    {currentPhase === 'upload' && (
                        <PhaseUpload
                            config={config}
                            pdfText={pdfText}
                            setPdfText={setPdfText}
                            onFileProcessed={setFileReady}
                            onNext={() => setCurrentPhase('evaluating')}
                            onBack={() => setCurrentPhase('settings')}
                        />
                    )}

                    {currentPhase === 'evaluating' && pdfText && (
                        <PhaseEvaluation
                            config={config}
                            pdfText={pdfText}
                            onComplete={handleEvaluationComplete}
                            onBack={() => setCurrentPhase('upload')}
                        />
                    )}

                    {currentPhase === 'results' && evaluationResults && (
                        <PhaseResults
                            results={evaluationResults}
                            onReset={handleReset}
                        />
                    )}

                    {currentPhase === 'guide' && <UserGuide />}

                    {currentPhase === 'about' && <About />}
                </main>

                {/* Footer */}
                <footer className="mt-12 text-center text-gray-500 text-sm">
                    <p>© 2569 พล.ท.ดร.กริช อินทราทิพย์ - สงวนลิขสิทธิ์</p>
                    <p className="mt-1">{APP_NAME} {APP_VERSION} | พัฒนาด้วย Next.js 16 + Tailwind CSS 4</p>
                </footer>
            </div>

            {/* QR Code Modal */}
            <QRCodeModal
                isOpen={isQRModalOpen}
                onClose={() => setIsQRModalOpen(false)}
                imageSrc="/donation-qr.jpg"
                imageAlt="QR Code สำหรับบริจาค"
                downloadFileName="donation-qr-cqi-sar.jpg"
            />
        </div>
    );
}
