// Types for CQI-SAR Evaluation System

// AI Provider Types
export type AIProvider = 'gemini' | 'openai' | 'openrouter';

export interface AIConfig {
    provider: AIProvider | null;
    apiKey: string;
    model: string;
    customModel: string;
}

// Expert Types
export interface Expert {
    id: 'expert1' | 'expert2' | 'expert3';
    name: string;
    title: string;
    avatar: string;
    experience: string;
    color: string;
    borderColor: string;
    focus: string;
    questions: string;
}

export const experts: Record<string, Expert> = {
    expert1: {
        id: 'expert1',
        name: 'ดร.สมชาย กระบวนการเป็นเลิศ',
        title: 'ผู้เชี่ยวชาญด้านกระบวนการและระเบียบวิธี',
        avatar: '👨‍🔬',
        experience: '20+ ปี, Six Sigma Black Belt, ISO Auditor',
        color: '#BBDEFB',
        borderColor: '#1976D2',
        focus: 'ความเข้มงวดของ PDCA, การวิเคราะห์สาเหตุรากเหง้า, หลักฐานเชิงประจักษ์',
        questions: '"มีหลักฐานยืนยันหรือไม่?", "PDCA ครบถ้วนหรือไม่?", "วิเคราะห์เป็นระบบหรือไม่?"'
    },
    expert2: {
        id: 'expert2',
        name: 'รศ.ดร.มาลี ผลลัพธ์ยั่งยืน',
        title: 'ผู้เชี่ยวชาญด้านผลลัพธ์และความยั่งยืน',
        avatar: '👩‍💼',
        experience: '15+ ปี, Balanced Scorecard Specialist',
        color: '#C8E6C9',
        borderColor: '#388E3C',
        focus: 'ผลลัพธ์ที่วัดได้, ความยั่งยืน, ผลกระทบต่อผู้รับบริการ, ต้นทุน-ประโยชน์',
        questions: '"ผลลัพธ์จะยั่งยืนหรือไม่?", "ผลกระทบที่แท้จริงคืออะไร?", "ระบบทำงานได้โดยไม่มีทีมหรือไม่?"'
    },
    expert3: {
        id: 'expert3',
        name: 'ศ.ดร.วิชัย นวัตกรรมแห่งการเรียนรู้',
        title: 'ผู้เชี่ยวชาญด้านนวัตกรรมและการจัดการความรู้',
        avatar: '👨‍🏫',
        experience: '18+ ปี, Knowledge Management Systems Expert',
        color: '#D1C4E9',
        borderColor: '#7B1FA2',
        focus: 'ความคิดสร้างสรรค์, การถ่ายทอดความรู้, การขยายผล, การเรียนรู้องค์กร',
        questions: '"มีอะไรเป็นนวัตกรรม?", "หน่วยอื่นเรียนรู้ได้หรือไม่?", "ความรู้ถูกบันทึกอย่างไร?"'
    }
};

// Evaluation Criteria Types
export interface EvaluationCriteria {
    id: number;
    name: string;
    weight: number;
    maxScore: number;
}

export const evaluationCriteria: EvaluationCriteria[] = [
    { id: 1, name: 'การคัดเลือกหัวข้อปัญหา', weight: 3, maxScore: 12 },
    { id: 2, name: 'การวิเคราะห์สาเหตุของปัญหา', weight: 3, maxScore: 12 },
    { id: 3, name: 'การกำหนดเป้าหมายและตัวชี้วัด', weight: 2, maxScore: 8 },
    { id: 4, name: 'การแก้ปัญหา/หมุนวงจร PDCA', weight: 3, maxScore: 12 },
    { id: 5, name: 'ผลสำเร็จของโครงการ', weight: 4, maxScore: 16 },
    { id: 6, name: 'การจัดทำมาตรฐานใหม่', weight: 3, maxScore: 12 },
    { id: 7, name: 'ความโดดเด่น/นวัตกรรม', weight: 2, maxScore: 8 },
    { id: 8, name: 'การจัดการความรู้', weight: 3, maxScore: 12 }
];

// Score Types
export interface ScoreItem {
    criteriaId: number;
    score: number;
    reason: string;
}

export interface Recommendation {
    priority: 'critical' | 'high' | 'enhancement';
    title: string;
    detail: string;
    expectedResult: string;
}

export interface ExpertEvaluation {
    expertId: string;
    projectName: string;
    organization: string;
    overallComment: string;
    scores: ScoreItem[];
    strengths: string[];
    weaknesses: string[];
    recommendations: Recommendation[];
    summaryQuote: string;
}

export interface CriteriaAverage {
    criteriaId: number;
    name: string;
    averageScore: number;
    weightedScore: number;
    maxWeightedScore: number;
    weight: number;
}

export interface EvaluationSummary {
    totalScore: number;
    maxPossibleScore: number;
    percentage: number;
    qualityLevel: string;
    criteriaAverages: CriteriaAverage[];
}

export interface EvaluationResults {
    projectName: string;
    organization: string;
    evaluationDate: string;
    experts: {
        expert1?: ExpertEvaluation;
        expert2?: ExpertEvaluation;
        expert3?: ExpertEvaluation;
    };
    summary: EvaluationSummary | null;
}

// App Constants
export const APP_VERSION = 'v2.2.0';
export const APP_LAST_UPDATE = '8 กุมภาพันธ์ 2569';
export const APP_NAME = 'CQI-SAR';
export const APP_TITLE = 'ระบบประเมินโครงการ CQI';
export const MAX_POSSIBLE_SCORE = 92;

