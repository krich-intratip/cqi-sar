'use client';

import React from 'react';
import { Settings, FileText, Activity, BarChart2, BookOpen, Info } from 'lucide-react';

export type Phase = 'settings' | 'upload' | 'evaluating' | 'results' | 'guide' | 'about';

interface NavbarProps {
    currentPhase: Phase;
    onPhaseChange: (phase: Phase) => void;
    apiReady: boolean;
    fileReady: boolean;
    resultsReady: boolean;
}

export default function Navbar({ currentPhase, onPhaseChange, apiReady, fileReady, resultsReady }: NavbarProps) {
    const mainNavItems: { id: Phase; label: string; icon: React.ReactNode; disabled: boolean }[] = [
        { id: 'settings', label: 'ตั้งค่า AI', icon: <Settings size={18} />, disabled: false },
        { id: 'upload', label: 'อัปโหลดเอกสาร', icon: <FileText size={18} />, disabled: !apiReady },
        { id: 'evaluating', label: 'ประเมิน', icon: <Activity size={18} />, disabled: !fileReady },
        { id: 'results', label: 'ผลลัพธ์', icon: <BarChart2 size={18} />, disabled: !resultsReady },
    ];

    const infoNavItems: { id: Phase; label: string; icon: React.ReactNode }[] = [
        { id: 'guide', label: 'คู่มือ', icon: <BookOpen size={18} /> },
        { id: 'about', label: 'เกี่ยวกับ', icon: <Info size={18} /> },
    ];

    return (
        <div className="mb-8 animate-fade-in">
            {/* Main Navigation */}
            <div className="flex flex-wrap gap-2 justify-center mb-3">
                {mainNavItems.map((item) => (
                    <button
                        key={item.id}
                        onClick={() => !item.disabled && onPhaseChange(item.id)}
                        disabled={item.disabled}
                        className={`
                            px-6 py-3 rounded-xl flex items-center gap-2 font-medium transition-all duration-300
                            ${currentPhase === item.id
                                ? 'bg-gradient-to-br from-primary-blue to-primary-dark text-white shadow-lg scale-105'
                                : 'bg-bg-card border-2 border-transparent hover:-translate-y-1 hover:shadow-md hover:border-primary-blue/50'
                            }
                            ${item.disabled ? 'opacity-50 cursor-not-allowed grayscale' : 'cursor-pointer'}
                        `}
                    >
                        {item.icon}
                        <span>{item.label}</span>
                    </button>
                ))}
            </div>

            {/* Info Navigation */}
            <div className="flex gap-2 justify-center">
                {infoNavItems.map((item) => (
                    <button
                        key={item.id}
                        onClick={() => onPhaseChange(item.id)}
                        className={`
                            px-4 py-2 rounded-lg flex items-center gap-2 text-sm font-medium transition-all duration-300
                            ${currentPhase === item.id
                                ? 'bg-pastel-purple text-purple-700 shadow-md'
                                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                            }
                        `}
                    >
                        {item.icon}
                        <span>{item.label}</span>
                    </button>
                ))}
            </div>
        </div>
    );
}

