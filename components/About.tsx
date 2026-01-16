'use client';

import React from 'react';
import { APP_VERSION, APP_LAST_UPDATE, APP_NAME, experts, evaluationCriteria, MAX_POSSIBLE_SCORE } from '@/types/evaluation';

const DEVELOPER_LINK = 'https://portfolio-two-sepia-33.vercel.app/';

export default function About() {
    return (
        <div className="bg-bg-card rounded-2xl p-8 shadow-lg animate-fade-in-slide space-y-6">
            {/* Header */}
            <div className="bg-gradient-to-r from-pastel-purple to-pastel-pink p-8 rounded-2xl text-center">
                <h2 className="text-2xl md:text-3xl font-bold text-primary-dark mb-4">
                    ℹ️ เกี่ยวกับระบบ
                </h2>
                <p className="text-gray-600">
                    {APP_NAME} - ระบบประเมินโครงการ CQI ด้วย AI
                </p>
            </div>

            {/* Purpose */}
            <div className="bg-white p-6 rounded-xl border shadow-sm">
                <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
                    <span>🎯</span> วัตถุประสงค์
                </h3>
                <div className="space-y-3 text-gray-700">
                    <p>
                        ระบบ {APP_NAME} พัฒนาขึ้นเพื่อใช้ประกอบ<strong>การอบรม KM (Knowledge Management)</strong>
                        และ<strong>ทดสอบการประเมินด้วยตนเอง (CQI - Continuous Quality Improvement)</strong>
                        ของหน่วยงานใน ทบ.
                    </p>
                    <p>
                        ระบบจะช่วยให้ผู้ใช้งานสามารถประเมินโครงการ CQI ได้อย่างรวดเร็วและมีมาตรฐาน
                        โดยใช้ผู้เชี่ยวชาญ AI 3 ท่านในการประเมินตามเกณฑ์มาตรฐาน 8 หัวข้อ
                    </p>
                </div>
            </div>

            {/* Features */}
            <div className="bg-white p-6 rounded-xl border shadow-sm">
                <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
                    <span>✨</span> คุณสมบัติหลัก
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="p-4 bg-pastel-blue rounded-lg">
                        <h4 className="font-semibold mb-2">🤖 AI Evaluation</h4>
                        <p className="text-sm text-gray-600">ประเมินโดยผู้เชี่ยวชาญ AI 3 ท่านที่มีความชำนาญต่างกัน</p>
                    </div>
                    <div className="p-4 bg-pastel-green rounded-lg">
                        <h4 className="font-semibold mb-2">📊 8 เกณฑ์มาตรฐาน</h4>
                        <p className="text-sm text-gray-600">ประเมินตามเกณฑ์มาตรฐาน CQI ครบทั้ง 8 หัวข้อ (รวม {MAX_POSSIBLE_SCORE} คะแนน)</p>
                    </div>
                    <div className="p-4 bg-pastel-purple rounded-lg">
                        <h4 className="font-semibold mb-2">📄 PDF Analysis</h4>
                        <p className="text-sm text-gray-600">อัปโหลดไฟล์ PDF และสรุปประเด็นสำคัญด้วย AI</p>
                    </div>
                    <div className="p-4 bg-pastel-orange rounded-lg">
                        <h4 className="font-semibold mb-2">📥 Export Report</h4>
                        <p className="text-sm text-gray-600">ส่งออกผลการประเมินเป็นรายงาน HTML ที่พร้อมพิมพ์</p>
                    </div>
                </div>
            </div>

            {/* Experts */}
            <div className="bg-white p-6 rounded-xl border shadow-sm">
                <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
                    <span>👨‍🔬</span> ผู้เชี่ยวชาญ AI
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {Object.values(experts).map((expert) => (
                        <div
                            key={expert.id}
                            className="p-4 rounded-xl border-t-4 text-center"
                            style={{
                                borderColor: expert.borderColor,
                                background: `linear-gradient(180deg, ${expert.color} 0%, white 30%)`
                            }}
                        >
                            <span className="text-4xl">{expert.avatar}</span>
                            <h4 className="font-semibold mt-2">{expert.name}</h4>
                            <p className="text-sm text-gray-600">{expert.title}</p>
                            <p className="text-xs text-gray-500 mt-2">{expert.experience}</p>
                        </div>
                    ))}
                </div>
            </div>

            {/* Criteria Summary */}
            <div className="bg-white p-6 rounded-xl border shadow-sm">
                <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
                    <span>📝</span> เกณฑ์การประเมิน
                </h3>
                <div className="overflow-x-auto">
                    <table className="w-full text-sm">
                        <thead>
                            <tr className="bg-gray-50">
                                <th className="p-3 text-left border">#</th>
                                <th className="p-3 text-left border">หัวข้อ</th>
                                <th className="p-3 text-center border">น้ำหนัก</th>
                                <th className="p-3 text-center border">คะแนนเต็ม</th>
                            </tr>
                        </thead>
                        <tbody>
                            {evaluationCriteria.map((c) => (
                                <tr key={c.id} className="hover:bg-gray-50">
                                    <td className="p-3 border">{c.id}</td>
                                    <td className="p-3 border">{c.name}</td>
                                    <td className="p-3 border text-center">×{c.weight}</td>
                                    <td className="p-3 border text-center">{c.maxScore}</td>
                                </tr>
                            ))}
                        </tbody>
                        <tfoot>
                            <tr className="bg-gray-100 font-bold">
                                <td className="p-3 border" colSpan={3}>รวม</td>
                                <td className="p-3 border text-center">{MAX_POSSIBLE_SCORE}</td>
                            </tr>
                        </tfoot>
                    </table>
                </div>
            </div>

            {/* Version & Developer */}
            <div className="bg-white p-6 rounded-xl border shadow-sm">
                <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
                    <span>🔧</span> ข้อมูลระบบ
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                        <h4 className="font-semibold mb-2">เวอร์ชัน</h4>
                        <p className="text-xl font-bold text-primary-blue">{APP_VERSION}</p>
                        <p className="text-sm text-gray-500">อัปเดตล่าสุด: {APP_LAST_UPDATE}</p>
                    </div>
                    <div>
                        <h4 className="font-semibold mb-2">เทคโนโลยี</h4>
                        <p className="text-sm text-gray-600">Next.js 16 + Tailwind CSS 4 + TypeScript</p>
                    </div>
                </div>
            </div>

            {/* Developer Info */}
            <div className="bg-gradient-to-r from-pastel-blue to-pastel-purple p-6 rounded-xl text-center">
                <h3 className="text-xl font-semibold mb-4">👨‍💻 ผู้พัฒนา</h3>
                <p className="text-2xl font-bold text-primary-dark mb-2">พล.ท.ดร.กริช อินทราทิพย์</p>
                <a
                    href={DEVELOPER_LINK}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-primary-blue underline hover:text-primary-dark text-sm"
                >
                    ดูโปรไฟล์ผู้พัฒนา
                </a>
                <div className="mt-4 text-gray-600">
                    <p>© 2569 สงวนลิขสิทธิ์</p>
                </div>
            </div>
        </div>
    );
}
