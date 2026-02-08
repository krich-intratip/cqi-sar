'use client';

import React, { useState } from 'react';
import { evaluationCriteria, APP_VERSION, APP_LAST_UPDATE, APP_NAME } from '@/types/evaluation';

type GuideTab = 'steps' | 'api' | 'faq';

export default function UserGuide() {
    const [activeTab, setActiveTab] = useState<GuideTab>('steps');

    const tabs = [
        { id: 'steps' as GuideTab, label: '📝 ขั้นตอนการใช้งาน' },
        { id: 'api' as GuideTab, label: '🔑 วิธีสมัคร API' },
        { id: 'faq' as GuideTab, label: '❓ คำถามที่พบบ่อย' },
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

            {/* Section Toggle */}
            <div className="flex justify-center gap-2 flex-wrap">
                {tabs.map(tab => (
                    <button
                        key={tab.id}
                        onClick={() => setActiveTab(tab.id)}
                        className={`px-5 py-3 rounded-lg font-medium transition-all ${
                            activeTab === tab.id
                                ? 'bg-primary-blue text-white'
                                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                        }`}
                    >
                        {tab.label}
                    </button>
                ))}
            </div>

            {/* Tab Content */}
            {activeTab === 'steps' && <StepsTab />}
            {activeTab === 'api' && <ApiGuideTab />}
            {activeTab === 'faq' && <FaqTab />}
        </div>
    );
}

function StepsTab() {
    return (
        <div className="space-y-6 animate-fade-in">
            {/* Step 1: AI Settings */}
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
                                เลือก Provider ที่ต้องการใช้งาน ได้แก่ Google Gemini (แนะนำ - ฟรี), DeepSeek (ถูกมาก), Kimi (256K context), หรือ OpenRouter (300+ โมเดล)
                            </p>
                            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                                <div className="p-3 bg-blue-50 rounded-lg border border-blue-100">
                                    <div className="font-semibold text-sm">🔷 Gemini</div>
                                    <div className="text-xs text-gray-600 mt-1">
                                        <span className="bg-green-100 text-green-700 px-1.5 py-0.5 rounded text-xs font-medium">ฟรี</span>
                                        <span className="ml-1">แนะนำ!</span>
                                    </div>
                                </div>
                                <div className="p-3 bg-sky-50 rounded-lg border border-sky-100">
                                    <div className="font-semibold text-sm">🔵 DeepSeek</div>
                                    <div className="text-xs text-gray-600 mt-1">
                                        <span className="bg-blue-100 text-blue-700 px-1.5 py-0.5 rounded text-xs font-medium">ถูกมาก</span>
                                    </div>
                                </div>
                                <div className="p-3 bg-purple-50 rounded-lg border border-purple-100">
                                    <div className="font-semibold text-sm">🌙 Kimi</div>
                                    <div className="text-xs text-gray-600 mt-1">
                                        <span className="bg-purple-100 text-purple-700 px-1.5 py-0.5 rounded text-xs font-medium">256K</span>
                                    </div>
                                </div>
                                <div className="p-3 bg-orange-50 rounded-lg border border-orange-100">
                                    <div className="font-semibold text-sm">🔀 OpenRouter</div>
                                    <div className="text-xs text-gray-600 mt-1">
                                        <span className="bg-green-100 text-green-700 px-1.5 py-0.5 rounded text-xs font-medium">ฟรี</span>
                                        <span className="mx-0.5">+</span>
                                        <span className="bg-orange-100 text-orange-700 px-1.5 py-0.5 rounded text-xs font-medium">Paid</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="flex items-start gap-4">
                        <span className="flex-shrink-0 w-8 h-8 bg-primary-blue text-white rounded-full flex items-center justify-center font-bold">2</span>
                        <div>
                            <h4 className="font-semibold mb-1">กรอก API Key</h4>
                            <p className="text-gray-600 text-sm">
                                กรอก API Key ของ Provider ที่เลือก (ดูวิธีสมัครในหน้า &quot;วิธีสมัคร API&quot;)
                            </p>
                        </div>
                    </div>

                    <div className="flex items-start gap-4">
                        <span className="flex-shrink-0 w-8 h-8 bg-primary-blue text-white rounded-full flex items-center justify-center font-bold">3</span>
                        <div>
                            <h4 className="font-semibold mb-1">เลือก Model / ระบุ Model เอง</h4>
                            <p className="text-gray-600 text-sm">
                                เลือก AI Model จาก dropdown หรือพิมพ์ชื่อ Model เองสำหรับ Model ใหม่ที่ยังไม่มีในรายการ
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
                                ระบบจะแสดงข้อมูลสรุปของเอกสาร ให้ตรวจสอบความถูกต้อง
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
                            className={`p-3 rounded-lg ${index < 4 ? 'bg-blue-50' : index < 6 ? 'bg-green-50' : 'bg-purple-50'}`}
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

function ApiGuideTab() {
    return (
        <div className="space-y-6 animate-fade-in">
            {/* Gemini */}
            <div className="bg-white p-6 rounded-xl border shadow-sm">
                <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
                    1️⃣ <span>✨ Google Gemini (แนะนำ - ฟรี!)</span>
                </h3>
                <div className="space-y-3">
                    <div className="p-4 bg-green-50 rounded-lg border-l-4 border-green-500">
                        <p className="text-green-800 font-medium">💚 ฟรี! มี Free Tier ใช้งานได้ไม่จำกัด</p>
                    </div>
                    <h4 className="font-semibold text-gray-800">ขั้นตอนการสมัคร:</h4>
                    <ol className="list-decimal pl-5 space-y-2 text-sm text-gray-600">
                        <li>เข้าไปที่ <a href="https://aistudio.google.com/apikey" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline font-medium">aistudio.google.com/apikey</a></li>
                        <li>ล็อกอินด้วย Google Account (ใช้ Gmail ได้เลย)</li>
                        <li>คลิกปุ่ม <strong>&quot;Create API Key&quot;</strong></li>
                        <li>เลือก Project หรือสร้างใหม่ แล้วคลิก <strong>&quot;Create API key in new project&quot;</strong></li>
                        <li>Copy API Key ที่ได้มาใช้งาน</li>
                    </ol>
                    <div className="mt-3 p-3 bg-blue-50 rounded-lg">
                        <p className="text-sm text-blue-800">
                            <strong>โมเดลแนะนำ:</strong> Gemini 2.5 Flash (เร็ว คุ้มค่า) หรือ Gemini 3 Flash (ใหม่สุด)
                        </p>
                    </div>
                </div>
            </div>

            {/* DeepSeek */}
            <div className="bg-white p-6 rounded-xl border shadow-sm">
                <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
                    2️⃣ <span>🔵 DeepSeek (ถูกมาก ฉลาด)</span>
                </h3>
                <div className="space-y-3">
                    <div className="p-4 bg-orange-50 rounded-lg border-l-4 border-orange-500">
                        <p className="text-orange-800 font-medium">⚠️ ต้องเติมเงินก่อนใช้งาน - แต่ราคาถูกมาก!</p>
                    </div>
                    <h4 className="font-semibold text-gray-800">ขั้นตอนการสมัคร:</h4>
                    <ol className="list-decimal pl-5 space-y-2 text-sm text-gray-600">
                        <li>เข้าไปที่ <a href="https://platform.deepseek.com" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline font-medium">platform.deepseek.com</a></li>
                        <li>คลิก <strong>&quot;Sign Up&quot;</strong> แล้วลงทะเบียนด้วย Email หรือ Google</li>
                        <li>ยืนยัน Email (ถ้าสมัครด้วย Email)</li>
                        <li>เข้าไปที่ <a href="https://platform.deepseek.com/top_up" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline font-medium">Top Up</a> เพื่อเติมเงิน (ขั้นต่ำ $5)</li>
                        <li>เข้าไปที่ <a href="https://platform.deepseek.com/api_keys" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline font-medium">API Keys</a></li>
                        <li>คลิก <strong>&quot;Create new API key&quot;</strong> แล้ว Copy มาใช้งาน</li>
                    </ol>
                    <div className="mt-3 p-3 bg-blue-50 rounded-lg">
                        <p className="text-sm text-blue-800">
                            <strong>โมเดลแนะนำ:</strong> deepseek-chat (ฉลาด ราคา $0.14/1M tokens) หรือ deepseek-reasoner (Thinking Mode)
                        </p>
                    </div>
                    <div className="mt-2 p-3 bg-green-50 rounded-lg">
                        <p className="text-sm text-green-800">
                            <strong>💡 ราคา:</strong> ถูกกว่า GPT-4 ประมาณ 100 เท่า! เติม $5 ใช้ได้หลายหมื่นครั้ง
                        </p>
                    </div>
                </div>
            </div>

            {/* Kimi */}
            <div className="bg-white p-6 rounded-xl border shadow-sm">
                <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
                    3️⃣ <span>🌙 Kimi / Moonshot (256K Context)</span>
                </h3>
                <div className="space-y-3">
                    <div className="p-4 bg-purple-50 rounded-lg border-l-4 border-purple-500">
                        <p className="text-purple-800 font-medium">🌙 โมเดล 1 ล้านล้าน parameters รองรับ context ยาวมาก</p>
                    </div>
                    <h4 className="font-semibold text-gray-800">ขั้นตอนการสมัคร:</h4>
                    <ol className="list-decimal pl-5 space-y-2 text-sm text-gray-600">
                        <li>เข้าไปที่ <a href="https://platform.moonshot.ai" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline font-medium">platform.moonshot.ai</a></li>
                        <li>คลิก <strong>&quot;Sign Up&quot;</strong> หรือ <strong>&quot;登录&quot;</strong> (Login)</li>
                        <li>สมัครด้วย Email หรือ Google Account</li>
                        <li>เข้าไปที่ <a href="https://platform.moonshot.ai/console/pay" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline font-medium">เติมเงิน</a> (เริ่มต้น $1)</li>
                        <li>เข้าไปที่ <a href="https://platform.moonshot.ai/console" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline font-medium">Console</a> &gt; API Keys</li>
                        <li>คลิก <strong>&quot;Create API Key&quot;</strong> แล้ว Copy มาใช้งาน</li>
                    </ol>
                    <div className="mt-3 p-3 bg-blue-50 rounded-lg">
                        <p className="text-sm text-blue-800">
                            <strong>โมเดลแนะนำ:</strong> kimi-k2-0905-preview (ใหม่สุด) หรือ kimi-k2-thinking (Reasoning)
                        </p>
                    </div>
                    <div className="mt-2 p-3 bg-orange-50 rounded-lg">
                        <p className="text-sm text-orange-800">
                            <strong>⚠️ หมายเหตุ:</strong> โมเดลบางตัวอาจใช้ไม่ได้ ใช้เฉพาะที่ระบบแนะนำ
                        </p>
                    </div>
                </div>
            </div>

            {/* OpenRouter */}
            <div className="bg-white p-6 rounded-xl border shadow-sm">
                <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
                    4️⃣ <span>🔀 OpenRouter (300+ Models)</span>
                </h3>
                <div className="space-y-3">
                    <div className="p-4 bg-blue-50 rounded-lg border-l-4 border-blue-500">
                        <p className="text-blue-800 font-medium">✅ มีโมเดลฟรีให้ใช้! รวม Claude, GPT, DeepSeek, Gemini และอื่นๆ</p>
                    </div>
                    <h4 className="font-semibold text-gray-800">ขั้นตอนการสมัคร:</h4>
                    <ol className="list-decimal pl-5 space-y-2 text-sm text-gray-600">
                        <li>เข้าไปที่ <a href="https://openrouter.ai" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline font-medium">openrouter.ai</a></li>
                        <li>คลิก <strong>&quot;Sign In&quot;</strong> แล้วล็อกอินด้วย Google หรือ GitHub</li>
                        <li>เข้าไปที่ <a href="https://openrouter.ai/keys" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline font-medium">API Keys</a></li>
                        <li>คลิก <strong>&quot;Create Key&quot;</strong></li>
                        <li>ตั้งชื่อ Key แล้วคลิก <strong>&quot;Create&quot;</strong></li>
                        <li>Copy API Key มาใช้งาน</li>
                    </ol>
                    <div className="mt-3 p-3 bg-green-50 rounded-lg">
                        <p className="text-sm text-green-800">
                            <strong>โมเดลฟรีแนะนำ:</strong> google/gemini-2.5-flash, deepseek/deepseek-chat-v3-0324:free, qwen/qwen3-235b-a22b:free
                        </p>
                    </div>
                    <div className="mt-2 p-3 bg-blue-50 rounded-lg">
                        <p className="text-sm text-blue-800">
                            <strong>💡 เคล็ดลับ:</strong> เลือกโมเดลที่มี &quot;:free&quot; ต่อท้ายจะใช้ได้ฟรี!
                        </p>
                    </div>
                </div>
            </div>

            {/* Comparison Table */}
            <div className="bg-white p-6 rounded-xl border shadow-sm">
                <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
                    📊 <span>เปรียบเทียบ AI Providers</span>
                </h3>
                <div className="overflow-x-auto">
                    <table className="w-full text-sm">
                        <thead>
                            <tr className="bg-gray-100">
                                <th className="p-3 text-left">Provider</th>
                                <th className="p-3 text-left">ราคา</th>
                                <th className="p-3 text-left">จุดเด่น</th>
                                <th className="p-3 text-left">ข้อจำกัด</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr className="border-b">
                                <td className="p-3 font-medium">✨ Gemini</td>
                                <td className="p-3 text-green-600">ฟรี</td>
                                <td className="p-3">ใช้ง่าย ฟรี รองรับไทยดี</td>
                                <td className="p-3">Rate limit ต่อนาที</td>
                            </tr>
                            <tr className="border-b">
                                <td className="p-3 font-medium">🔵 DeepSeek</td>
                                <td className="p-3 text-blue-600">$0.14/1M</td>
                                <td className="p-3">ฉลาดมาก ราคาถูกมาก</td>
                                <td className="p-3">ต้องเติมเงินก่อน</td>
                            </tr>
                            <tr className="border-b">
                                <td className="p-3 font-medium">🌙 Kimi</td>
                                <td className="p-3 text-purple-600">$0.60/1M</td>
                                <td className="p-3">256K context ยาวมาก</td>
                                <td className="p-3">ต้องเติมเงิน บางโมเดลใช้ไม่ได้</td>
                            </tr>
                            <tr>
                                <td className="p-3 font-medium">🔀 OpenRouter</td>
                                <td className="p-3 text-gray-600">หลากหลาย</td>
                                <td className="p-3">300+ โมเดล มีฟรี</td>
                                <td className="p-3">ต้องเลือกโมเดลเอง</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}

function FaqTab() {
    return (
        <div className="space-y-6 animate-fade-in">
            <div className="bg-white p-6 rounded-xl border shadow-sm">
                <h3 className="text-xl font-semibold mb-6 flex items-center gap-2">
                    <span>❓</span> คำถามที่พบบ่อย (FAQ)
                </h3>
                <div className="space-y-4">
                    <div className="border-b pb-4">
                        <h4 className="font-semibold text-primary-blue mb-2">
                            Q: รองรับไฟล์ประเภทใดบ้าง?
                        </h4>
                        <p className="text-gray-600 text-sm">
                            A: ระบบรองรับเฉพาะไฟล์ PDF เท่านั้น โดยขนาดไฟล์ไม่เกิน 25MB
                            และควรเป็น PDF ที่สามารถ copy ข้อความได้ (ไม่ใช่ภาพสแกน)
                        </p>
                    </div>

                    <div className="border-b pb-4">
                        <h4 className="font-semibold text-primary-blue mb-2">
                            Q: ขอ API Key ได้จากที่ไหน?
                        </h4>
                        <p className="text-gray-600 text-sm">
                            A: สามารถขอ API Key ได้จาก:
                        </p>
                        <ul className="list-disc pl-5 mt-2 text-sm text-gray-600 space-y-1">
                            <li>Google Gemini: <a href="https://aistudio.google.com/apikey" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">aistudio.google.com/apikey</a> (ฟรี)</li>
                            <li>DeepSeek: <a href="https://platform.deepseek.com/api_keys" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">platform.deepseek.com</a> (ต้องเติมเงิน ถูกมาก)</li>
                            <li>Kimi: <a href="https://platform.moonshot.ai/console" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">platform.moonshot.ai</a> (256K context)</li>
                            <li>OpenRouter: <a href="https://openrouter.ai/keys" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">openrouter.ai/keys</a> (300+ โมเดล มีฟรี)</li>
                        </ul>
                    </div>

                    <div className="border-b pb-4">
                        <h4 className="font-semibold text-primary-blue mb-2">
                            Q: ผลประเมินจัดเก็บไว้ที่ไหน?
                        </h4>
                        <p className="text-gray-600 text-sm">
                            A: ผลประเมินจัดเก็บไว้ใน Browser Session เท่านั้น
                            เมื่อปิดหน้าต่างหรือ refresh หน้าเว็บ ข้อมูลจะหายไป
                            กรุณากดบันทึกรายงานเป็นไฟล์ HTML ไว้ก่อนปิดหน้าเว็บ
                        </p>
                    </div>

                    <div className="border-b pb-4">
                        <h4 className="font-semibold text-primary-blue mb-2">
                            Q: API Key ปลอดภัยหรือไม่?
                        </h4>
                        <p className="text-gray-600 text-sm">
                            A: API Key จะถูกเก็บไว้ใน Local Storage ของ Browser เท่านั้น
                            ไม่ได้ส่งไปเก็บที่ Server ของเรา การเรียก AI จะทำผ่าน Server Actions ที่ปลอดภัย
                        </p>
                    </div>

                    <div className="border-b pb-4">
                        <h4 className="font-semibold text-primary-blue mb-2">
                            Q: ใช้เวลาประเมินนานแค่ไหน?
                        </h4>
                        <p className="text-gray-600 text-sm">
                            A: การประเมินใช้เวลาประมาณ 1-2 นาที ขึ้นอยู่กับขนาดเอกสาร
                            และความเร็วของ AI Provider ที่เลือกใช้
                        </p>
                    </div>

                    <div className="border-b pb-4">
                        <h4 className="font-semibold text-primary-blue mb-2">
                            Q: ทำไมถึงมีผู้ทรงคุณวุฒิ 3 ท่าน?
                        </h4>
                        <p className="text-gray-600 text-sm">
                            A: เพื่อให้การประเมินมีมุมมองที่หลากหลาย ผู้ทรงคุณวุฒิแต่ละท่านจะเน้นประเด็นที่แตกต่างกัน:
                        </p>
                        <ul className="list-disc pl-5 mt-2 text-sm text-gray-600 space-y-1">
                            <li><strong>ดร.สมชาย:</strong> กระบวนการ PDCA, การวิเคราะห์สาเหตุ, หลักฐานเชิงประจักษ์</li>
                            <li><strong>รศ.ดร.มาลี:</strong> ผลลัพธ์ที่วัดได้, ความยั่งยืน, ผลกระทบต่อผู้รับบริการ</li>
                            <li><strong>ศ.ดร.วิชัย:</strong> นวัตกรรม, การถ่ายทอดความรู้, การขยายผล</li>
                        </ul>
                    </div>

                    <div>
                        <h4 className="font-semibold text-primary-blue mb-2">
                            Q: ผลประเมินน่าเชื่อถือได้มากน้อยเพียงใด?
                        </h4>
                        <p className="text-gray-600 text-sm">
                            A: ผลประเมินเป็นการประเมินเบื้องต้นโดย AI
                            ควรใช้ประกอบการพิจารณาร่วมกับการรีวิวจากผู้เชี่ยวชาญมนุษย์
                            เพื่อให้ได้ผลการประเมินที่ครบถ้วนและแม่นยำ
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}
