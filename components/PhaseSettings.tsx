'use client';

import React, { useState } from 'react';
import { Search, Globe, Check, AlertCircle, Loader2, Eye, EyeOff } from 'lucide-react';
import { testConnection } from '@/app/actions/ai';
import { providerConfig } from '@/lib/providers';
import { AIConfig } from '@/types/evaluation';

interface PhaseSettingsProps {
    config: AIConfig;
    setConfig: (config: AIConfig) => void;
    onApiTested: (success: boolean) => void;
    onNext: () => void;
}

export default function PhaseSettings({ config, setConfig, onApiTested, onNext }: PhaseSettingsProps) {
    const [testing, setTesting] = useState(false);
    const [testResult, setTestResult] = useState<{ success: boolean; message?: string } | null>(null);
    const [showPassword, setShowPassword] = useState(false);

    const handleProviderChange = (provider: string) => {
        setConfig({ ...config, provider: provider as AIConfig['provider'], model: '', customModel: '' });
        setTestResult(null);
        onApiTested(false);
    };

    const handleTestConnection = async () => {
        const effectiveModel = config.customModel || config.model;
        if (!config.provider || !config.apiKey || !effectiveModel) {
            setTestResult({ success: false, message: 'กรุณากรอกข้อมูลให้ครบ' });
            return;
        }

        setTesting(true);
        setTestResult(null);

        try {
            const result = await testConnection(config.provider, config.apiKey, effectiveModel);
            setTestResult(result);
            onApiTested(result.success);
        } catch {
            setTestResult({ success: false, message: 'เกิดข้อผิดพลาด' });
            onApiTested(false);
        } finally {
            setTesting(false);
        }
    };

    const providers = [
        { id: 'gemini', icon: '🔷', name: 'Google Gemini' },
        { id: 'openai', icon: '🟢', name: 'OpenAI ChatGPT' },
        { id: 'openrouter', icon: '🔀', name: 'OpenRouter' },
    ];

    const currentProvider = config.provider ? providerConfig[config.provider] : null;

    return (
        <div className="bg-bg-card rounded-2xl p-8 shadow-lg animate-fade-in-slide">
            <h2 className="text-2xl font-semibold mb-6 flex items-center gap-3">
                <span className="text-3xl">⚙️</span>
                ขั้นตอนที่ 1: ตั้งค่า AI Provider
            </h2>

            {/* Provider Selection */}
            <div className="mb-6">
                <label className="block font-medium mb-3">เลือก AI Provider ที่ต้องการใช้:</label>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    {providers.map((p) => (
                        <label
                            key={p.id}
                            className={`flex flex-col items-center p-5 rounded-xl border-3 cursor-pointer transition-all duration-300 hover:border-primary-blue/50 hover:-translate-y-1
                                ${config.provider === p.id
                                    ? 'border-primary-blue bg-pastel-blue shadow-lg'
                                    : 'border-gray-200 bg-bg-card'
                                }`}
                        >
                            <input
                                type="radio"
                                name="provider"
                                value={p.id}
                                checked={config.provider === p.id}
                                onChange={() => handleProviderChange(p.id)}
                                className="sr-only"
                            />
                            <span className="text-4xl mb-2">{p.icon}</span>
                            <span className="font-semibold">{p.name}</span>
                        </label>
                    ))}
                </div>
            </div>

            {/* API Key & Model Selection */}
            {config.provider && currentProvider && (
                <div className="space-y-5 animate-fade-in">
                    <div>
                        <label className="block font-medium mb-2">{currentProvider.keyLabel}:</label>
                        <div className="relative">
                            <input
                                type={showPassword ? 'text' : 'password'}
                                value={config.apiKey}
                                onChange={(e) => setConfig({ ...config, apiKey: e.target.value })}
                                placeholder="กรอก API Key ของคุณ"
                                className="w-full px-4 py-3 pr-12 border-2 border-gray-200 rounded-xl focus:border-primary-blue focus:outline-none focus:ring-2 focus:ring-primary-blue/20"
                            />
                            <button
                                type="button"
                                onClick={() => setShowPassword(!showPassword)}
                                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
                            >
                                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                            </button>
                        </div>
                        <div
                            className="mt-2 p-3 bg-pastel-yellow rounded-lg text-sm"
                            dangerouslySetInnerHTML={{ __html: currentProvider.info }}
                        />
                    </div>

                    <div>
                        <label className="block font-medium mb-2">เลือก Model:</label>
                        <select
                            value={config.model}
                            onChange={(e) => setConfig({ ...config, model: e.target.value })}
                            className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-primary-blue focus:outline-none focus:ring-2 focus:ring-primary-blue/20"
                        >
                            <option value="">-- เลือก Model --</option>
                            {currentProvider.models.map((m) => (
                                <option key={m.value} value={m.value}>{m.label}</option>
                            ))}
                        </select>
                    </div>

                    <div className="p-4 bg-pastel-blue rounded-xl">
                        <label className="block text-sm text-gray-600 mb-2">
                            🆕 หรือระบุชื่อ Model เอง (สำหรับโมเดลใหม่ที่ยังไม่มีในรายการ):
                        </label>
                        <input
                            type="text"
                            value={config.customModel}
                            onChange={(e) => setConfig({ ...config, customModel: e.target.value })}
                            placeholder="เช่น google/gemini-2.5-flash-thinking"
                            className="w-full px-4 py-2 border-2 border-blue-200 rounded-lg focus:border-primary-blue focus:outline-none"
                        />
                        <p className="mt-2 text-xs text-gray-500">
                            💡 ถ้ากรอกช่องนี้ ระบบจะใช้ชื่อโมเดลที่พิมพ์แทนที่จะใช้จาก dropdown ด้านบน
                        </p>
                    </div>

                    {/* Test Connection Button */}
                    <div className="flex items-center gap-4">
                        <button
                            onClick={handleTestConnection}
                            disabled={testing || !config.apiKey || (!config.model && !config.customModel)}
                            className="px-6 py-3 bg-pastel-orange rounded-xl font-semibold transition-all hover:bg-orange-200 hover:-translate-y-1 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
                        >
                            {testing ? <Loader2 className="animate-spin" size={18} /> : <Globe size={18} />}
                            {testing ? 'กำลังทดสอบ...' : '🔗 ทดสอบการเชื่อมต่อ'}
                        </button>

                        {testResult && (
                            <div className={`flex-1 p-3 rounded-xl flex items-center gap-2 ${testResult.success ? 'bg-pastel-green text-green-700' : 'bg-pastel-pink text-red-700'
                                }`}>
                                {testResult.success ? <Check size={20} /> : <AlertCircle size={20} />}
                                <span className="text-sm">
                                    {testResult.success
                                        ? '✅ เชื่อมต่อสำเร็จ! พร้อมใช้งาน'
                                        : `❌ ${testResult.message || 'การเชื่อมต่อล้มเหลว'}`
                                    }
                                </span>
                            </div>
                        )}
                    </div>

                    {testResult?.success && (
                        <button
                            onClick={onNext}
                            className="w-full py-4 bg-gradient-to-r from-primary-blue to-primary-dark text-white rounded-xl font-semibold text-lg transition-all hover:-translate-y-1 hover:shadow-lg flex items-center justify-center gap-2"
                        >
                            <Search size={20} />
                            ถัดไป: อัปโหลดเอกสาร CQI
                        </button>
                    )}
                </div>
            )}
        </div>
    );
}
