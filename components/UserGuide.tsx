'use client';

import React, { useState } from 'react';
import { evaluationCriteria, APP_VERSION, APP_LAST_UPDATE, APP_NAME } from '@/types/evaluation';

type GuideTab = 'functional' | 'nonfunctional' | 'timeline';

export default function UserGuide() {
    const [activeTab, setActiveTab] = useState<GuideTab>('functional');

    const tabs = [
        { id: 'functional' as GuideTab, label: '📋 Functional', desc: 'คู่มือการใช้งาน' },
        { id: 'nonfunctional' as GuideTab, label: '⚙️ Non-Functional', desc: 'คุณสมบัติระบบ' },
        { id: 'timeline' as GuideTab, label: '📅 Timeline', desc: 'ประวัติการพัฒนา' },
    ];

    return (
        <div className="bg-bg-card rounded-2xl p-8 shadow-lg animate-fade-in-slide space-y-6">
            <div className="bg-gradient-to-r from-pastel-green to-pastel-blue p-8 rounded-2xl text-center">
                <h2 className="text-2xl md:text-3xl font-bold text-primary-dark mb-4">
                    📖 คู่มือการใช้งาน
                </h2>
                <p className="text-gray-600">
                    {APP_NAME} {APP_VERSION} - ระบบประเมินโครงการ CQI ด้วย AI
                </p>
            </div>

            {/* Sub-tabs */}
            <div className="flex flex-wrap gap-2 p-2 bg-gray-100 rounded-xl">
                {tabs.map(tab => (
                    <button
                        key={tab.id}
                        onClick={() => setActiveTab(tab.id)}
                        className={`flex-1 min-w-[140px] py-3 px-4 rounded-lg font-medium transition-all text-center ${activeTab === tab.id
                            ? 'bg-white shadow-md -translate-y-0.5 text-primary-dark'
                            : 'hover:bg-gray-200 text-gray-600'
                            }`}
                    >
                        <div>{tab.label}</div>
                        <div className="text-xs mt-0.5">{tab.desc}</div>
                    </button>
                ))}
            </div>

            {/* Tab Content */}
            {activeTab === 'functional' && <FunctionalTab />}
            {activeTab === 'nonfunctional' && <NonFunctionalTab />}
            {activeTab === 'timeline' && <TimelineTab />}
        </div>
    );
}

function FunctionalTab() {
    return (
        <div className="space-y-6 animate-fade-in">
            {/* Step 1: AI Settings - Detailed */}
            <div className="bg-white p-6 rounded-xl border shadow-sm">
                <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
                    <span>⚙️</span> ขั้นตอนที่ 1: ตั้งค่า AI Provider
                </h3>
                <div className="space-y-4">
                    <div className="flex items-start gap-4">
                        <span className="flex-shrink-0 w-8 h-8 bg-primary-blue text-white rounded-full flex items-center justify-center font-bold">1</span>
                        <div>
                            <h4 className="font-semibold mb-1">เลือก AI Provider</h4>
                            <p className="text-gray-600 text-sm mb-2">
                                ระบบรองรับ 3 Provider ดังนี้:
                            </p>
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                                <div className="p-3 bg-blue-50 rounded-lg border border-blue-100">
                                    <div className="font-semibold text-sm">🔷 Google Gemini</div>
                                    <div className="text-xs text-gray-600 mt-1">
                                        <span className="bg-green-100 text-green-700 px-1.5 py-0.5 rounded text-xs font-medium">ฟรี</span>
                                        <span className="ml-1">แนะนำสำหรับผู้เริ่มต้น</span>
                                    </div>
                                    <div className="text-xs text-gray-500 mt-1">Models: Gemini 2.5 Flash/Pro</div>
                                </div>
                                <div className="p-3 bg-green-50 rounded-lg border border-green-100">
                                    <div className="font-semibold text-sm">🟢 OpenAI ChatGPT</div>
                                    <div className="text-xs text-gray-600 mt-1">
                                        <span className="bg-orange-100 text-orange-700 px-1.5 py-0.5 rounded text-xs font-medium">มีค่าใช้จ่าย</span>
                                    </div>
                                    <div className="text-xs text-gray-500 mt-1">Models: GPT-4.1, o3-mini</div>
                                </div>
                                <div className="p-3 bg-purple-50 rounded-lg border border-purple-100">
                                    <div className="font-semibold text-sm">🔀 OpenRouter</div>
                                    <div className="text-xs text-gray-600 mt-1">
                                        <span className="bg-green-100 text-green-700 px-1.5 py-0.5 rounded text-xs font-medium">ฟรี</span>
                                        <span className="mx-0.5">+</span>
                                        <span className="bg-orange-100 text-orange-700 px-1.5 py-0.5 rounded text-xs font-medium">มีค่าใช้จ่าย</span>
                                    </div>
                                    <div className="text-xs text-gray-500 mt-1">รวมหลาย Models จากหลาย Provider</div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="flex items-start gap-4">
                        <span className="flex-shrink-0 w-8 h-8 bg-primary-blue text-white rounded-full flex items-center justify-center font-bold">2</span>
                        <div>
                            <h4 className="font-semibold mb-1">วิธีขอรับ API Key</h4>
                            <div className="space-y-2">
                                <div className="p-3 bg-gray-50 rounded-lg text-sm">
                                    <p className="font-medium">🔷 Google Gemini (ฟรี):</p>
                                    <ol className="list-decimal pl-5 text-gray-600 text-xs mt-1 space-y-0.5">
                                        <li>ไปที่ <span className="text-primary-blue">aistudio.google.com/app/apikey</span></li>
                                        <li>Login ด้วย Google Account</li>
                                        <li>คลิก &quot;Create API Key&quot;</li>
                                        <li>คัดลอก API Key มาวางในระบบ</li>
                                    </ol>
                                </div>
                                <div className="p-3 bg-gray-50 rounded-lg text-sm">
                                    <p className="font-medium">🟢 OpenAI (มีค่าใช้จ่าย):</p>
                                    <ol className="list-decimal pl-5 text-gray-600 text-xs mt-1 space-y-0.5">
                                        <li>ไปที่ <span className="text-primary-blue">platform.openai.com/api-keys</span></li>
                                        <li>สมัครสมาชิกและเติมเครดิต</li>
                                        <li>คลิก &quot;Create new secret key&quot;</li>
                                        <li>คัดลอก API Key (จะแสดงครั้งเดียว)</li>
                                    </ol>
                                </div>
                                <div className="p-3 bg-gray-50 rounded-lg text-sm">
                                    <p className="font-medium">🔀 OpenRouter (ฟรี + มีค่าใช้จ่าย):</p>
                                    <ol className="list-decimal pl-5 text-gray-600 text-xs mt-1 space-y-0.5">
                                        <li>ไปที่ <span className="text-primary-blue">openrouter.ai/keys</span></li>
                                        <li>สมัครสมาชิก (ใช้ Google/GitHub login ได้)</li>
                                        <li>คลิก &quot;Create Key&quot;</li>
                                        <li>เลือก Model ฟรี เช่น Gemini, DeepSeek, Qwen</li>
                                    </ol>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="flex items-start gap-4">
                        <span className="flex-shrink-0 w-8 h-8 bg-primary-blue text-white rounded-full flex items-center justify-center font-bold">3</span>
                        <div>
                            <h4 className="font-semibold mb-1">เลือก Model / ระบุ Model เอง</h4>
                            <p className="text-gray-600 text-sm">
                                เลือก AI Model จาก dropdown หรือพิมพ์ชื่อ Model เองสำหรับ Model ใหม่ที่ยังไม่มีในรายการ
                                ระบบแสดง Model แยกตามประเภท ฟรี/มีค่าใช้จ่าย
                            </p>
                        </div>
                    </div>

                    <div className="flex items-start gap-4">
                        <span className="flex-shrink-0 w-8 h-8 bg-primary-blue text-white rounded-full flex items-center justify-center font-bold">4</span>
                        <div>
                            <h4 className="font-semibold mb-1">ทดสอบการเชื่อมต่อ</h4>
                            <p className="text-gray-600 text-sm">
                                กดปุ่ม &quot;ทดสอบการเชื่อมต่อ&quot; เพื่อตรวจสอบว่า API Key และ Model ทำงานได้ถูกต้อง
                                ระบบจะบันทึกการตั้งค่าใน Browser อัตโนมัติ ไม่ต้องกรอกใหม่ทุกครั้ง
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
                                ระบบจะแสดงข้อมูลสรุปของเอกสาร (จำนวนหน้า, คำ, ตัวอักษร) สามารถกดปุ่ม &quot;สรุปประเด็นสำคัญ&quot; ให้ AI ช่วยวิเคราะห์ก่อนประเมินได้
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
                                ระบบจะใช้ AI ผู้เชี่ยวชาญ 3 ท่านประเมินโครงการ CQI ทีละท่าน (ใช้เวลาประมาณ 1-2 นาที)
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
                            <span className="text-gray-500 text-sm ml-2">(น้ำหนัก x{criteria.weight}, เต็ม {criteria.maxScore})</span>
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

function NonFunctionalTab() {
    return (
        <div className="space-y-6 animate-fade-in">
            {/* Technology Stack */}
            <div className="bg-white p-6 rounded-xl border shadow-sm">
                <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
                    <span>🛠️</span> เทคโนโลยีที่ใช้
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="p-4 bg-blue-50 rounded-lg">
                        <h4 className="font-semibold text-sm mb-2">Frontend Framework</h4>
                        <ul className="text-sm text-gray-600 space-y-1">
                            <li>Next.js 16 (App Router)</li>
                            <li>React 19</li>
                            <li>TypeScript 5</li>
                            <li>Tailwind CSS 4</li>
                        </ul>
                    </div>
                    <div className="p-4 bg-green-50 rounded-lg">
                        <h4 className="font-semibold text-sm mb-2">AI Integration</h4>
                        <ul className="text-sm text-gray-600 space-y-1">
                            <li>Google Gemini API</li>
                            <li>OpenAI API</li>
                            <li>OpenRouter API</li>
                            <li>Server Actions (Secure)</li>
                        </ul>
                    </div>
                    <div className="p-4 bg-purple-50 rounded-lg">
                        <h4 className="font-semibold text-sm mb-2">Libraries</h4>
                        <ul className="text-sm text-gray-600 space-y-1">
                            <li>PDF.js (PDF Processing)</li>
                            <li>Lucide React (Icons)</li>
                            <li>Google Fonts - Prompt</li>
                        </ul>
                    </div>
                    <div className="p-4 bg-orange-50 rounded-lg">
                        <h4 className="font-semibold text-sm mb-2">Hosting & Deploy</h4>
                        <ul className="text-sm text-gray-600 space-y-1">
                            <li>Vercel (Primary)</li>
                            <li>Cloudflare Pages</li>
                            <li>GitHub Repository</li>
                        </ul>
                    </div>
                </div>
            </div>

            {/* Performance */}
            <div className="bg-white p-6 rounded-xl border shadow-sm">
                <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
                    <span>⚡</span> Performance & Quality
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="p-4 bg-gray-50 rounded-lg text-center">
                        <div className="text-2xl font-bold text-green-600">SSR</div>
                        <div className="text-sm text-gray-600">Server-Side Rendering</div>
                    </div>
                    <div className="p-4 bg-gray-50 rounded-lg text-center">
                        <div className="text-2xl font-bold text-blue-600">PWA-Ready</div>
                        <div className="text-sm text-gray-600">Responsive Design</div>
                    </div>
                    <div className="p-4 bg-gray-50 rounded-lg text-center">
                        <div className="text-2xl font-bold text-purple-600">Secure</div>
                        <div className="text-sm text-gray-600">API Keys ไม่ถูกเก็บบน Server</div>
                    </div>
                </div>
            </div>

            {/* Security & Privacy */}
            <div className="bg-white p-6 rounded-xl border shadow-sm">
                <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
                    <span>🔒</span> ความปลอดภัยและความเป็นส่วนตัว
                </h3>
                <div className="space-y-3 text-sm text-gray-700">
                    <div className="flex items-start gap-3">
                        <span className="text-green-500 font-bold mt-0.5">✓</span>
                        <p>API Key ถูกเก็บไว้ใน Browser ของผู้ใช้เท่านั้น (LocalStorage) ไม่ถูกส่งไปเก็บที่ Server</p>
                    </div>
                    <div className="flex items-start gap-3">
                        <span className="text-green-500 font-bold mt-0.5">✓</span>
                        <p>เอกสาร PDF ถูกประมวลผลบน Browser ไม่ถูกอัปโหลดไปเก็บที่ใด</p>
                    </div>
                    <div className="flex items-start gap-3">
                        <span className="text-green-500 font-bold mt-0.5">✓</span>
                        <p>การสื่อสารกับ AI Provider ใช้ Server Actions ผ่าน HTTPS เท่านั้น</p>
                    </div>
                    <div className="flex items-start gap-3">
                        <span className="text-green-500 font-bold mt-0.5">✓</span>
                        <p>ไม่มีการเก็บข้อมูลการใช้งานหรือเอกสารบน Server</p>
                    </div>
                </div>
            </div>

            {/* Browser Support */}
            <div className="bg-white p-6 rounded-xl border shadow-sm">
                <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
                    <span>🌐</span> Browser ที่รองรับ
                </h3>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                    <div className="p-3 bg-gray-50 rounded-lg text-center text-sm">
                        <div className="text-2xl mb-1">🟢</div>
                        <div className="font-medium">Chrome 90+</div>
                    </div>
                    <div className="p-3 bg-gray-50 rounded-lg text-center text-sm">
                        <div className="text-2xl mb-1">🔵</div>
                        <div className="font-medium">Edge 90+</div>
                    </div>
                    <div className="p-3 bg-gray-50 rounded-lg text-center text-sm">
                        <div className="text-2xl mb-1">🟠</div>
                        <div className="font-medium">Firefox 90+</div>
                    </div>
                    <div className="p-3 bg-gray-50 rounded-lg text-center text-sm">
                        <div className="text-2xl mb-1">⚪</div>
                        <div className="font-medium">Safari 15+</div>
                    </div>
                </div>
            </div>
        </div>
    );
}

function TimelineTab() {
    const timeline = [
        {
            version: 'v2.2.0',
            date: '8 กุมภาพันธ์ 2569',
            tag: 'latest',
            changes: [
                'ปรับปรุงระบบตั้งค่า AI Provider (รองรับ Free/Paid model grouping)',
                'ปรับปรุงหน้าคู่มือแบ่งเป็น 3 tabs (Functional, Non-functional, Timeline)',
                'อัพเดทรายการ Models ล่าสุด (GPT-4.1 Nano, o3-mini)',
                'เปลี่ยน favicon เป็นตราสัญลักษณ์ ทบ.',
                'ปรับปรุงหน้า About ด้วยข้อมูลระบบที่ครบถ้วน',
                'แก้ไข Bugs: HTML report version, model select UX, dependency cleanup',
                'เพิ่มการ Deploy บน Cloudflare Pages',
            ]
        },
        {
            version: 'v2.1.0',
            date: '16 มกราคม 2569',
            changes: [
                'เพิ่มระบบ Donation Banner พร้อม QR Code Modal',
                'ปรับปรุง UI การแสดง QR Code',
            ]
        },
        {
            version: 'v2.0.0',
            date: '10 มกราคม 2569',
            changes: [
                'สร้างระบบใหม่ด้วย Next.js 16 + React 19 + TypeScript',
                'รองรับ 3 AI Providers: Google Gemini, OpenAI, OpenRouter',
                'ระบบผู้เชี่ยวชาญ AI 3 ท่านประเมินตามเกณฑ์ 8 หัวข้อ',
                'รองรับ PDF Upload และ Text Extraction',
                'Export รายงานเป็น HTML',
                'บันทึกการตั้งค่าใน LocalStorage',
                'Responsive Design รองรับมือถือ',
            ]
        },
    ];

    return (
        <div className="space-y-6 animate-fade-in">
            <div className="bg-white p-6 rounded-xl border shadow-sm">
                <h3 className="text-xl font-semibold mb-6 flex items-center gap-2">
                    <span>📅</span> ประวัติการพัฒนาระบบ
                </h3>
                <div className="space-y-6">
                    {timeline.map((release, idx) => (
                        <div key={release.version} className="relative pl-8 border-l-3 border-gray-200">
                            <div className={`absolute left-[-8px] top-0 w-4 h-4 rounded-full ${idx === 0 ? 'bg-primary-blue ring-4 ring-primary-blue/20' : 'bg-gray-300'}`} />
                            <div className="mb-2">
                                <span className={`text-lg font-bold ${idx === 0 ? 'text-primary-blue' : 'text-gray-700'}`}>
                                    {release.version}
                                </span>
                                {release.tag && (
                                    <span className="ml-2 text-xs bg-green-100 text-green-700 px-2 py-0.5 rounded-full font-medium">
                                        {release.tag}
                                    </span>
                                )}
                                <span className="ml-3 text-sm text-gray-500">{release.date}</span>
                            </div>
                            <ul className="space-y-1.5">
                                {release.changes.map((change, i) => (
                                    <li key={i} className="text-sm text-gray-600 flex items-start gap-2">
                                        <span className="text-gray-400 mt-0.5">•</span>
                                        <span>{change}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
