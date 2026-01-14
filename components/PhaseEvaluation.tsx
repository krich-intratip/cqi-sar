'use client';

import React, { useEffect, useState, useRef } from 'react';
import { generateContent } from '@/app/actions/ai';
import { generateExpertPrompt } from '@/lib/prompts';
import { AIConfig, experts, ExpertEvaluation, EvaluationResults } from '@/types/evaluation';
import { calculateSummary } from '@/lib/evaluation';

interface PhaseEvaluationProps {
    config: AIConfig;
    pdfText: string;
    onComplete: (results: EvaluationResults) => void;
    onBack: () => void;
}

type ExpertStatus = 'pending' | 'evaluating' | 'completed' | 'error';

export default function PhaseEvaluation({ config, pdfText, onComplete, onBack }: PhaseEvaluationProps) {
    const [currentStep, setCurrentStep] = useState(0);
    const [expertStatus, setExpertStatus] = useState<Record<string, ExpertStatus>>({
        expert1: 'pending',
        expert2: 'pending',
        expert3: 'pending'
    });
    const [expertResults, setExpertResults] = useState<Record<string, ExpertEvaluation | null>>({
        expert1: null,
        expert2: null,
        expert3: null
    });
    const [error, setError] = useState<string | null>(null);
    const hasStarted = useRef(false);

    const parseExpertResponse = (responseText: string): ExpertEvaluation | null => {
        try {
            // Clean up response
            let cleanJson = responseText.trim();
            cleanJson = cleanJson.replace(/^```json\s*/i, '').replace(/^```\s*/i, '').replace(/\s*```$/i, '');

            // Find JSON object
            const jsonMatch = cleanJson.match(/\{[\s\S]*\}/);
            if (!jsonMatch) return null;

            const parsed = JSON.parse(jsonMatch[0]);
            return parsed as ExpertEvaluation;
        } catch (e) {
            console.error('JSON parse error:', e);
            return null;
        }
    };

    const evaluateWithExpert = async (expertId: string): Promise<ExpertEvaluation | null> => {
        setExpertStatus(prev => ({ ...prev, [expertId]: 'evaluating' }));

        try {
            const effectiveModel = config.customModel || config.model;
            const prompt = generateExpertPrompt(expertId, pdfText);
            const result = await generateContent(
                { provider: config.provider!, apiKey: config.apiKey, model: effectiveModel },
                prompt
            );

            if (result.success && result.text) {
                const evaluation = parseExpertResponse(result.text);
                if (evaluation) {
                    setExpertStatus(prev => ({ ...prev, [expertId]: 'completed' }));
                    setExpertResults(prev => ({ ...prev, [expertId]: evaluation }));
                    return evaluation;
                }
            }
            throw new Error('Invalid response');
        } catch (err) {
            console.error(`Expert ${expertId} error:`, err);
            setExpertStatus(prev => ({ ...prev, [expertId]: 'error' }));
            return null;
        }
    };

    const runEvaluation = async () => {
        setCurrentStep(1);
        await new Promise(r => setTimeout(r, 500)); // Document analysis

        const expertIds = ['expert1', 'expert2', 'expert3'];
        const results: Record<string, ExpertEvaluation | null> = {
            expert1: null,
            expert2: null,
            expert3: null
        };

        for (let i = 0; i < expertIds.length; i++) {
            setCurrentStep(i + 2);
            const evaluation = await evaluateWithExpert(expertIds[i]);
            results[expertIds[i]] = evaluation;
            await new Promise(r => setTimeout(r, 1000)); // Delay between experts
        }

        setCurrentStep(5);

        // Calculate summary
        const summary = calculateSummary({
            expert1: results.expert1 || undefined,
            expert2: results.expert2 || undefined,
            expert3: results.expert3 || undefined
        });

        const finalResults: EvaluationResults = {
            projectName: results.expert1?.projectName || 'โครงการ CQI',
            organization: results.expert1?.organization || '',
            evaluationDate: new Date().toLocaleDateString('th-TH', {
                year: 'numeric',
                month: 'long',
                day: 'numeric'
            }),
            experts: {
                expert1: results.expert1 || undefined,
                expert2: results.expert2 || undefined,
                expert3: results.expert3 || undefined
            },
            summary
        };

        onComplete(finalResults);
    };

    useEffect(() => {
        if (!hasStarted.current) {
            hasStarted.current = true;
            runEvaluation();
        }
    }, []);

    const steps = [
        { id: 1, label: 'วิเคราะห์เอกสาร' },
        { id: 2, label: 'Expert 1' },
        { id: 3, label: 'Expert 2' },
        { id: 4, label: 'Expert 3' },
        { id: 5, label: 'สรุปผล' }
    ];

    return (
        <div className="bg-bg-card rounded-2xl p-8 shadow-lg animate-fade-in-slide">
            <h2 className="text-2xl font-semibold mb-6 flex items-center gap-3">
                <span className="text-3xl">📊</span>
                กำลังประเมินโครงการ CQI
            </h2>

            {/* Progress Steps */}
            <div className="flex justify-between mb-8">
                {steps.map((step) => (
                    <div key={step.id} className="flex-1 text-center">
                        <div
                            className={`w-10 h-10 mx-auto rounded-full flex items-center justify-center font-semibold transition-all duration-300 ${currentStep > step.id
                                    ? 'bg-score4 text-white'
                                    : currentStep === step.id
                                        ? 'bg-primary-blue text-white shadow-lg ring-4 ring-primary-blue/30'
                                        : 'bg-gray-200'
                                }`}
                        >
                            {currentStep > step.id ? '✓' : step.id}
                        </div>
                        <p className="text-sm mt-2 text-gray-600">{step.label}</p>
                    </div>
                ))}
            </div>

            {/* Expert Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
                {Object.entries(experts).map(([id, expert]) => (
                    <div
                        key={id}
                        className="p-5 rounded-xl border-t-4 transition-all duration-300"
                        style={{
                            borderColor: expert.borderColor,
                            background: `linear-gradient(180deg, ${expert.color} 0%, white 30%)`,
                            opacity: expertStatus[id] === 'pending' ? 0.5 : 1
                        }}
                    >
                        <div className="text-4xl mb-2">{expert.avatar}</div>
                        <div className="font-semibold">{expert.name}</div>
                        <div className="text-sm text-gray-600 mb-3">{expert.title}</div>
                        <div className={`text-sm font-medium ${expertStatus[id] === 'completed' ? 'text-green-600' :
                                expertStatus[id] === 'evaluating' ? 'text-blue-600' :
                                    expertStatus[id] === 'error' ? 'text-red-600' :
                                        'text-gray-400'
                            }`}>
                            {expertStatus[id] === 'completed' && '✅ เสร็จสิ้น'}
                            {expertStatus[id] === 'evaluating' && '⏳ กำลังประเมิน...'}
                            {expertStatus[id] === 'error' && '❌ เกิดข้อผิดพลาด'}
                            {expertStatus[id] === 'pending' && '⏸️ รอดำเนินการ'}
                        </div>
                    </div>
                ))}
            </div>

            {/* Current Status */}
            <div className="text-center py-6">
                {currentStep < 5 ? (
                    <div className="flex items-center justify-center gap-3">
                        <div className="w-8 h-8 border-4 border-primary-blue border-t-transparent rounded-full animate-spin" />
                        <span className="text-lg font-medium text-gray-600">
                            {steps[currentStep - 1]?.label || 'กำลังเริ่มต้น...'}
                        </span>
                    </div>
                ) : (
                    <div className="text-green-600 text-lg font-semibold">
                        ✅ การประเมินเสร็จสมบูรณ์!
                    </div>
                )}
            </div>

            {error && (
                <div className="mt-4 p-4 bg-pastel-pink rounded-xl text-red-700">
                    ❌ {error}
                </div>
            )}

            <button
                onClick={onBack}
                className="mt-4 px-6 py-3 bg-gray-200 rounded-xl font-medium hover:bg-gray-300 transition-all"
            >
                ← ย้อนกลับ
            </button>
        </div>
    );
}
