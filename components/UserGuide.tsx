'use client';

import React from 'react';
import { evaluationCriteria } from '@/types/evaluation';

export default function UserGuide() {
    return (
        <div className="bg-bg-card rounded-2xl p-8 shadow-lg animate-fade-in-slide space-y-6">
            <div className="bg-gradient-to-r from-pastel-green to-pastel-blue p-8 rounded-2xl text-center">
                <h2 className="text-2xl md:text-3xl font-bold text-primary-dark mb-4">
                    📖 คู่มือการใช้งาน
                </h2>
                <p className="text-gray-600">
                    ขั้นตอนการใช้งานระบบประเมินโครงการ CQI
                </p>
            </div>

            {/* Step 1 */}
            <div className="bg-white p-6 rounded-xl border shadow-sm">
                <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
                    <span>⚙️</span> ขั้นตอนที่ 1: ตั้งค่า AI Provider
                </h3>
                <div className="space-y-4">
                    <div className="flex items-start gap-4">
                        <span className="flex-shrink-0 w-8 h-8 bg-primary-blue text-white rounded-full flex items-center justify-center font-bold">1</span>
                        <div>
                            <h4 className="font-semibold mb-1">เลือก AI Provider</h4>
                            <p className="text-gray-600 text-sm">
                                เลือก Provider ที่ต้องการใช้งาน ได้แก่ Google Gemini (แนะนำ - ฟรี), OpenAI, หรือ OpenRouter
                            </p>
                        </div>
                    </div>
                    <div className="flex items-start gap-4">
                        <span className="flex-shrink-0 w-8 h-8 bg-primary-blue text-white rounded-full flex items-center justify-center font-bold">2</span>
                        <div>
                            <h4 className="font-semibold mb-1">กรอก API Key</h4>
                            <p className="text-gray-600 text-sm">
                                กรอก API Key ของ Provider ที่เลือก สามารถขอรับ API Key ฟรีได้จากลิงก์ที่ระบุ
                            </p>
                        </div>
                    </div>
                    <div className="flex items-start gap-4">
                        <span className="flex-shrink-0 w-8 h-8 bg-primary-blue text-white rounded-full flex items-center justify-center font-bold">3</span>
                        <div>
                            <h4 className="font-semibold mb-1">เลือก Model</h4>
                            <p className="text-gray-600 text-sm">
                                เลือก AI Model ที่ต้องการใช้ โดยระบบแนะนำให้ใช้ Gemini 2.5 Flash หรือ Pro
                            </p>
                        </div>
                    </div>
                    <div className="flex items-start gap-4">
                        <span className="flex-shrink-0 w-8 h-8 bg-primary-blue text-white rounded-full flex items-center justify-center font-bold">4</span>
                        <div>
                            <h4 className="font-semibold mb-1">ทดสอบการเชื่อมต่อ</h4>
                            <p className="text-gray-600 text-sm">
                                กดปุ่ม &quot;ทดสอบการเชื่อมต่อ&quot; เพื่อตรวจสอบว่า API Key และ Model ทำงานได้ถูกต้อง
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Step 2 */}
            <div className="bg-white p-6 rounded-xl border shadow-sm">
                <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
                    <span>📄</span> ขั้นตอนที่ 2: อัปโหลดเอกสาร CQI
                </h3>
                <div className="space-y-4">
                    <div className="flex items-start gap-4">
                        <span className="flex-shrink-0 w-8 h-8 bg-green-600 text-white rounded-full flex items-center justify-center font-bold">1</span>
                        <div>
                            <h4 className="font-semibold mb-1">อัปโหลดไฟล์ PDF</h4>
                            <p className="text-gray-600 text-sm">
                                คลิกพื้นที่อัปโหลดหรือลากไฟล์ PDF ของโครงการ CQI ที่ต้องการประเมินมาวาง
                            </p>
                        </div>
                    </div>
                    <div className="flex items-start gap-4">
                        <span className="flex-shrink-0 w-8 h-8 bg-green-600 text-white rounded-full flex items-center justify-center font-bold">2</span>
                        <div>
                            <h4 className="font-semibold mb-1">ตรวจสอบการอ่านเอกสาร</h4>
                            <p className="text-gray-600 text-sm">
                                ระบบจะแสดงข้อมูลสรุปของเอกสารที่อัปโหลด ให้ตรวจสอบความถูกต้อง
                            </p>
                        </div>
                    </div>
                </div>
                <div className="mt-4 p-4 bg-orange-50 rounded-lg border-l-4 border-orange-400">
                    <p className="text-sm text-orange-700">
                        <strong>💡 คำแนะนำ:</strong> ใช้ไฟล์ PDF ที่มีข้อความสามารถ copy ได้ (ไม่ใช่ภาพสแกน) จะให้ผลการประเมินที่แม่นยำกว่า
                    </p>
                </div>
            </div>

            {/* Step 3 */}
            <div className="bg-white p-6 rounded-xl border shadow-sm">
                <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
                    <span>🚀</span> ขั้นตอนที่ 3: เริ่มการประเมิน
                </h3>
                <div className="space-y-4">
                    <div className="flex items-start gap-4">
                        <span className="flex-shrink-0 w-8 h-8 bg-purple-600 text-white rounded-full flex items-center justify-center font-bold">1</span>
                        <div>
                            <h4 className="font-semibold mb-1">กดปุ่ม &quot;เริ่มการประเมิน&quot;</h4>
                            <p className="text-gray-600 text-sm">
                                เมื่อตั้งค่าและอัปโหลดเอกสารเรียบร้อย ให้กดปุ่มเริ่มการประเมิน
                            </p>
                        </div>
                    </div>
                    <div className="flex items-start gap-4">
                        <span className="flex-shrink-0 w-8 h-8 bg-purple-600 text-white rounded-full flex items-center justify-center font-bold">2</span>
                        <div>
                            <h4 className="font-semibold mb-1">รอผลการประเมิน</h4>
                            <p className="text-gray-600 text-sm">
                                ระบบจะใช้ AI ผู้เชี่ยวชาญ 3 ท่านประเมินโครงการ CQI (ใช้เวลาประมาณ 1-2 นาที)
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Step 4 */}
            <div className="bg-white p-6 rounded-xl border shadow-sm">
                <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
                    <span>📊</span> ขั้นตอนที่ 4: ดูผลการประเมินและบันทึกรายงาน
                </h3>
                <div className="space-y-4">
                    <div className="flex items-start gap-4">
                        <span className="flex-shrink-0 w-8 h-8 bg-orange-600 text-white rounded-full flex items-center justify-center font-bold">1</span>
                        <div>
                            <h4 className="font-semibold mb-1">ดูผลการประเมิน</h4>
                            <p className="text-gray-600 text-sm">
                                ระบบจะแสดงคะแนนรวม, ผลการประเมินจากผู้เชี่ยวชาญแต่ละท่าน, จุดแข็ง-จุดอ่อน และคำแนะนำ
                            </p>
                        </div>
                    </div>
                    <div className="flex items-start gap-4">
                        <span className="flex-shrink-0 w-8 h-8 bg-orange-600 text-white rounded-full flex items-center justify-center font-bold">2</span>
                        <div>
                            <h4 className="font-semibold mb-1">บันทึกรายงาน</h4>
                            <p className="text-gray-600 text-sm">
                                กดปุ่ม &quot;ดาวน์โหลดรายงาน HTML&quot; เพื่อบันทึกผลการประเมินเป็นไฟล์ HTML
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Evaluation Criteria */}
            <div className="bg-white p-6 rounded-xl border shadow-sm">
                <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
                    <span>📝</span> เกณฑ์การประเมิน 8 หัวข้อ (รวม 92 คะแนน)
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {evaluationCriteria.map((criteria, index) => (
                        <div
                            key={criteria.id}
                            className={`p-3 rounded-lg ${index < 4 ? 'bg-blue-50' : index < 6 ? 'bg-green-50' : 'bg-purple-50'
                                }`}
                        >
                            <span className="font-semibold">{criteria.id}. {criteria.name}</span>
                            <span className="text-gray-500 text-sm ml-2">(น้ำหนัก ×{criteria.weight}, เต็ม {criteria.maxScore})</span>
                        </div>
                    ))}
                </div>
                <div className="mt-4 p-4 bg-gray-50 rounded-lg">
                    <h4 className="font-semibold mb-2">ระดับคะแนน:</h4>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-2 text-sm">
                        <div className="flex items-center gap-2">
                            <span className="w-4 h-4 bg-score4 rounded"></span>
                            <span>4 = ดีเยี่ยม</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <span className="w-4 h-4 bg-score3 rounded"></span>
                            <span>3 = ดี</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <span className="w-4 h-4 bg-score2 rounded"></span>
                            <span>2 = พอใช้</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <span className="w-4 h-4 bg-score1 rounded"></span>
                            <span>1 = ต้องปรับปรุง</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
