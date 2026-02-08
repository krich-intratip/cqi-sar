'use client';

import React, { useState } from 'react';
import { Download, RotateCcw } from 'lucide-react';
import {
    EvaluationResults,
    evaluationCriteria,
    experts,
    MAX_POSSIBLE_SCORE,
    APP_VERSION
} from '@/types/evaluation';
import { getExpertTotalScore, getQualityBadgeColor, collectAllRecommendations } from '@/lib/evaluation';

interface PhaseResultsProps {
    results: EvaluationResults;
    onReset: () => void;
}

export default function PhaseResults({ results, onReset }: PhaseResultsProps) {
    const [activeTab, setActiveTab] = useState<'summary' | 'expert1' | 'expert2' | 'expert3' | 'recommendations'>('summary');

    const { summary } = results;
    const allRecommendations = collectAllRecommendations(results.experts);

    const handleExportHtml = () => {
        const htmlContent = generateHtmlReport();
        const blob = new Blob([htmlContent], { type: 'text/html;charset=utf-8' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `CQI_Report_${results.projectName || 'Report'}_${new Date().toISOString().split('T')[0]}.html`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
    };

    const generateHtmlReport = (): string => {
        return `<!DOCTYPE html>
<html lang="th">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>รายงานการประเมิน CQI - ${results.projectName}</title>
<link href="https://fonts.googleapis.com/css2?family=Prompt:wght@300;400;500;600;700&display=swap" rel="stylesheet">
<style>
body { font-family: 'Prompt', sans-serif; background: #FAFAFA; color: #333; line-height: 1.6; padding: 40px; }
.container { max-width: 900px; margin: 0 auto; background: white; padding: 40px; border-radius: 16px; box-shadow: 0 4px 6px rgba(0,0,0,0.1); }
h1 { color: #1565C0; text-align: center; }
.score-display { text-align: center; font-size: 4em; font-weight: 700; color: #2E7D32; }
.quality-badge { display: inline-block; padding: 10px 30px; background: #4CAF50; color: white; border-radius: 50px; font-weight: 600; }
table { width: 100%; border-collapse: collapse; margin: 20px 0; }
th, td { border: 1px solid #E0E0E0; padding: 12px; text-align: left; }
th { background: #F5F5F5; }
.expert-card { background: #F5F5F5; padding: 20px; border-radius: 12px; margin: 15px 0; }
.rec-critical { border-left: 4px solid #E53935; }
.rec-high { border-left: 4px solid #FB8C00; }
.rec-enhancement { border-left: 4px solid #1976D2; }
</style>
</head>
<body>
<div class="container">
<h1>🏆 รายงานการประเมินโครงการ CQI</h1>
<p style="text-align: center; color: #666;">โครงการ: ${results.projectName}</p>
<p style="text-align: center; color: #666;">หน่วยงาน: ${results.organization}</p>
<p style="text-align: center; color: #666;">วันที่ประเมิน: ${results.evaluationDate}</p>
<hr style="margin: 30px 0; border: 1px solid #E0E0E0;">

<div style="text-align: center; margin: 40px 0;">
<div class="score-display">${summary?.totalScore.toFixed(1)}/${MAX_POSSIBLE_SCORE}</div>
<p style="font-size: 1.5em; color: #666;">${summary?.percentage.toFixed(1)}%</p>
<div class="quality-badge">${summary?.qualityLevel}</div>
</div>

<h2>📊 คะแนนรายหัวข้อ</h2>
<table>
<tr><th>หัวข้อ</th><th>น้ำหนัก</th><th>คะแนนเฉลี่ย</th><th>คะแนนถ่วงน้ำหนัก</th></tr>
${summary?.criteriaAverages.map(c => `
<tr><td>${c.name}</td><td>×${c.weight}</td><td>${c.averageScore.toFixed(2)}</td><td>${c.weightedScore.toFixed(2)}/${c.maxWeightedScore}</td></tr>
`).join('')}
</table>

<h2>👨‍🔬 ความเห็นจากผู้เชี่ยวชาญ</h2>
${Object.entries(results.experts).filter(([, e]) => e).map(([id, data]) => `
<div class="expert-card">
<h3>${experts[id].avatar} ${experts[id].name}</h3>
<p><strong>คะแนนรวม:</strong> ${data && getExpertTotalScore(data).toFixed(1)}/${MAX_POSSIBLE_SCORE}</p>
<p><strong>ความเห็น:</strong> ${data?.overallComment}</p>
<p><strong>จุดแข็ง:</strong> ${data?.strengths.join(', ')}</p>
<p><strong>จุดอ่อน:</strong> ${data?.weaknesses.join(', ')}</p>
</div>
`).join('')}

<h2>💡 คำแนะนำ</h2>
${allRecommendations.map(r => `
<div class="expert-card rec-${r.priority}">
<p><strong>[${r.priority.toUpperCase()}]</strong> ${r.title}</p>
<p>${r.detail}</p>
<p><em>ผลที่คาดหวัง: ${r.expectedResult}</em></p>
</div>
`).join('')}

<hr style="margin: 40px 0;">
<p style="text-align: center; color: #999;">สร้างโดย CQI-SAR ${APP_VERSION}</p>
</div>
</body>
</html>`;
    };

    const tabs = [
        { id: 'summary', label: '📊 สรุปผล', color: '#1976D2' },
        { id: 'expert1', label: `${experts.expert1.avatar} Expert 1`, color: experts.expert1.borderColor },
        { id: 'expert2', label: `${experts.expert2.avatar} Expert 2`, color: experts.expert2.borderColor },
        { id: 'expert3', label: `${experts.expert3.avatar} Expert 3`, color: experts.expert3.borderColor },
        { id: 'recommendations', label: '💡 คำแนะนำ', color: '#FB8C00' },
    ];

    const renderExpertTab = (expertId: 'expert1' | 'expert2' | 'expert3') => {
        const data = results.experts[expertId];
        if (!data) return <p>ไม่มีข้อมูล</p>;

        const expert = experts[expertId];
        const totalScore = getExpertTotalScore(data);

        return (
            <div>
                <div className="flex items-center gap-4 mb-6">
                    <span className="text-5xl">{expert.avatar}</span>
                    <div>
                        <h3 className="text-xl font-semibold">{expert.name}</h3>
                        <p className="text-gray-600">{expert.title}</p>
                        <p className="text-2xl font-bold mt-1" style={{ color: expert.borderColor }}>
                            {totalScore.toFixed(1)}/{MAX_POSSIBLE_SCORE}
                        </p>
                    </div>
                </div>

                <div className="bg-gray-50 p-4 rounded-xl mb-6 border-l-4" style={{ borderColor: expert.borderColor }}>
                    <p className="italic">"{data.summaryQuote}"</p>
                </div>

                <div className="mb-6">
                    <h4 className="font-semibold mb-2">ความเห็นโดยรวม</h4>
                    <p>{data.overallComment}</p>
                </div>

                <div className="grid grid-cols-2 gap-4 mb-6">
                    <div className="bg-pastel-green p-4 rounded-xl">
                        <h4 className="font-semibold mb-2">✅ จุดแข็ง</h4>
                        <ul className="list-disc pl-5 space-y-1">
                            {data.strengths.map((s, i) => <li key={i}>{s}</li>)}
                        </ul>
                    </div>
                    <div className="bg-pastel-pink p-4 rounded-xl">
                        <h4 className="font-semibold mb-2">⚠️ จุดอ่อน</h4>
                        <ul className="list-disc pl-5 space-y-1">
                            {data.weaknesses.map((w, i) => <li key={i}>{w}</li>)}
                        </ul>
                    </div>
                </div>

                <h4 className="font-semibold mb-3">คะแนนรายหัวข้อ</h4>
                <div className="space-y-2">
                    {data.scores.map(score => {
                        const criteria = evaluationCriteria.find(c => c.id === score.criteriaId);
                        return (
                            <div key={score.criteriaId} className="p-3 bg-gray-50 rounded-lg">
                                <div className="flex justify-between items-center">
                                    <span>{criteria?.name}</span>
                                    <span className="font-bold">{score.score}/4</span>
                                </div>
                                <p className="text-sm text-gray-600 mt-1">{score.reason}</p>
                            </div>
                        );
                    })}
                </div>
            </div>
        );
    };

    return (
        <div className="bg-bg-card rounded-2xl p-8 shadow-lg animate-fade-in-slide">
            {/* Header */}
            <div className="text-center mb-8">
                <h2 className="text-3xl font-bold mb-2">🏆 ผลการประเมินโครงการ CQI</h2>
                <p className="text-gray-600">โครงการ: {results.projectName}</p>
                <p className="text-gray-600">หน่วยงาน: {results.organization}</p>
                <p className="text-sm text-gray-500">ประเมินเมื่อ: {results.evaluationDate}</p>
            </div>

            {/* Score Summary */}
            {summary && (
                <div className="text-center mb-8">
                    <div className="text-6xl font-bold text-green-600 mb-2">
                        {summary.totalScore.toFixed(1)}/{MAX_POSSIBLE_SCORE}
                    </div>
                    <div className="text-2xl text-gray-500 mb-4">
                        {summary.percentage.toFixed(1)}%
                    </div>
                    <div className={`inline-block px-8 py-3 rounded-full text-white text-lg font-semibold ${getQualityBadgeColor(summary.percentage)}`}>
                        {summary.qualityLevel}
                    </div>
                </div>
            )}

            {/* Tabs */}
            <div className="flex flex-wrap gap-2 mb-6 p-2 bg-gray-100 rounded-xl">
                {tabs.map(tab => (
                    <button
                        key={tab.id}
                        onClick={() => setActiveTab(tab.id as typeof activeTab)}
                        className={`flex-1 min-w-[120px] py-3 px-4 rounded-lg font-medium transition-all ${activeTab === tab.id
                                ? 'bg-white shadow-md -translate-y-1'
                                : 'hover:bg-gray-200'
                            }`}
                        style={activeTab === tab.id ? { borderBottom: `3px solid ${tab.color}` } : {}}
                    >
                        {tab.label}
                    </button>
                ))}
            </div>

            {/* Tab Content */}
            <div className="min-h-[400px] p-4">
                {activeTab === 'summary' && summary && (
                    <div>
                        <h3 className="text-xl font-semibold mb-4">📊 สรุปคะแนนรายหัวข้อ</h3>
                        <table className="w-full border-collapse text-sm">
                            <thead>
                                <tr className="bg-gray-50">
                                    <th className="border p-3 text-left">หัวข้อ</th>
                                    <th className="border p-3 text-center">น้ำหนัก</th>
                                    <th className="border p-3 text-center">Expert 1</th>
                                    <th className="border p-3 text-center">Expert 2</th>
                                    <th className="border p-3 text-center">Expert 3</th>
                                    <th className="border p-3 text-center">เฉลี่ย</th>
                                    <th className="border p-3 text-center">คะแนนถ่วง</th>
                                </tr>
                            </thead>
                            <tbody>
                                {summary.criteriaAverages.map(ca => {
                                    const e1 = results.experts.expert1?.scores.find(s => s.criteriaId === ca.criteriaId);
                                    const e2 = results.experts.expert2?.scores.find(s => s.criteriaId === ca.criteriaId);
                                    const e3 = results.experts.expert3?.scores.find(s => s.criteriaId === ca.criteriaId);
                                    return (
                                        <tr key={ca.criteriaId} className="hover:bg-gray-50">
                                            <td className="border p-3">{ca.name}</td>
                                            <td className="border p-3 text-center">×{ca.weight}</td>
                                            <td className="border p-3 text-center">{e1?.score || '-'}</td>
                                            <td className="border p-3 text-center">{e2?.score || '-'}</td>
                                            <td className="border p-3 text-center">{e3?.score || '-'}</td>
                                            <td className="border p-3 text-center font-medium">{ca.averageScore.toFixed(2)}</td>
                                            <td className="border p-3 text-center font-bold">{ca.weightedScore.toFixed(2)}/{ca.maxWeightedScore}</td>
                                        </tr>
                                    );
                                })}
                            </tbody>
                            <tfoot>
                                <tr className="bg-gray-100 font-bold">
                                    <td className="border p-3" colSpan={6}>รวมคะแนน</td>
                                    <td className="border p-3 text-center">{summary.totalScore.toFixed(2)}/{MAX_POSSIBLE_SCORE}</td>
                                </tr>
                            </tfoot>
                        </table>
                    </div>
                )}

                {activeTab === 'expert1' && renderExpertTab('expert1')}
                {activeTab === 'expert2' && renderExpertTab('expert2')}
                {activeTab === 'expert3' && renderExpertTab('expert3')}

                {activeTab === 'recommendations' && (
                    <div>
                        <h3 className="text-xl font-semibold mb-4">💡 คำแนะนำจากผู้เชี่ยวชาญ</h3>
                        <div className="space-y-4">
                            {allRecommendations.map((rec, i) => (
                                <div
                                    key={i}
                                    className={`p-4 rounded-xl border-l-4 ${rec.priority === 'critical' ? 'bg-red-50 border-red-500' :
                                            rec.priority === 'high' ? 'bg-orange-50 border-orange-500' :
                                                'bg-blue-50 border-blue-500'
                                        }`}
                                >
                                    <div className="flex items-center gap-2 mb-2">
                                        <span className={`px-2 py-1 rounded text-xs font-bold text-white ${rec.priority === 'critical' ? 'bg-red-500' :
                                                rec.priority === 'high' ? 'bg-orange-500' : 'bg-blue-500'
                                            }`}>
                                            {rec.priority.toUpperCase()}
                                        </span>
                                        <span className="font-semibold">{rec.title}</span>
                                        <span className="text-sm text-gray-500 ml-auto">จาก: {experts[rec.source]?.name}</span>
                                    </div>
                                    <p className="mb-2">{rec.detail}</p>
                                    <p className="text-sm text-green-700">
                                        <strong>ผลที่คาดหวัง:</strong> {rec.expectedResult}
                                    </p>
                                </div>
                            ))}
                        </div>
                    </div>
                )}
            </div>

            {/* Action Buttons */}
            <div className="flex gap-4 mt-8">
                <button
                    onClick={handleExportHtml}
                    className="flex-1 py-4 bg-pastel-green rounded-xl font-semibold flex items-center justify-center gap-2 hover:bg-green-200 transition-all hover:-translate-y-1"
                >
                    <Download size={20} />
                    ดาวน์โหลดรายงาน HTML
                </button>
                <button
                    onClick={onReset}
                    className="px-6 py-4 bg-gray-200 rounded-xl font-semibold flex items-center gap-2 hover:bg-gray-300 transition-all"
                >
                    <RotateCcw size={20} />
                    ประเมินใหม่
                </button>
            </div>
        </div>
    );
}
