// AI Provider Configurations
// อัพเดทล่าสุด: กุมภาพันธ์ 2569

export interface AIModel {
    value: string;
    label: string;
    tier?: 'free' | 'paid';
    pricing?: string;
}

export interface ProviderConfig {
    name: string;
    keyLabel: string;
    keyPlaceholder: string;
    keyUrl: string;
    keyUrlLabel: string;
    info: string;
    badge: string;
    models: AIModel[];
}

export const providerConfig: Record<string, ProviderConfig> = {
    gemini: {
        name: 'Google Gemini',
        keyLabel: 'Gemini API Key',
        keyPlaceholder: 'AIza...',
        keyUrl: 'https://aistudio.google.com/app/apikey',
        keyUrlLabel: 'Google AI Studio',
        info: 'รับ API Key ฟรีได้ที่ Google AI Studio',
        badge: 'แนะนำ - ฟรี',
        models: [
            // Gemini 3 Series (ใหม่ล่าสุด)
            { value: 'gemini-3-flash-preview', label: 'Gemini 3 Flash (ใหม่สุด - เร็ว ฉลาด)', tier: 'free', pricing: '$0.5/$3 ต่อ 1M tokens' },
            { value: 'gemini-3-pro-preview', label: 'Gemini 3 Pro (แพงสุด - ฉลาดสุด)', tier: 'paid', pricing: '$2/$12 ต่อ 1M tokens' },
            // Gemini 2.5 Series (แนะนำ - คุ้มค่า)
            { value: 'gemini-2.5-flash', label: 'Gemini 2.5 Flash (แนะนำ - คุ้มค่ามาก)', tier: 'free', pricing: '$0.3/$2.5 ต่อ 1M tokens' },
            { value: 'gemini-2.5-pro', label: 'Gemini 2.5 Pro (Thinking - ซับซ้อน)', tier: 'free', pricing: '$1.25/$10 ต่อ 1M tokens' },
            { value: 'gemini-2.5-flash-lite', label: 'Gemini 2.5 Flash-Lite (ประหยัดสุด)', tier: 'free', pricing: '$0.1/$0.4 ต่อ 1M tokens' },
            // Gemini 2.0 (จะปิดให้บริการ 31 มี.ค. 2569)
            { value: 'gemini-2.0-flash', label: 'Gemini 2.0 Flash (จะปิด มี.ค. 69)', tier: 'free', pricing: 'ใกล้ปิดบริการ' }
        ]
    },
    deepseek: {
        name: 'DeepSeek',
        keyLabel: 'DeepSeek API Key',
        keyPlaceholder: 'sk-...',
        keyUrl: 'https://platform.deepseek.com/api_keys',
        keyUrlLabel: 'DeepSeek Platform',
        info: 'ต้องเติมเงินก่อนใช้งาน - ราคาถูกมาก!',
        badge: 'ถูกมาก - ฉลาด',
        models: [
            { value: 'deepseek-chat', label: 'DeepSeek V3.2 Chat (แนะนำ ฉลาด ถูก)', tier: 'paid', pricing: '$0.14/$0.28 ต่อ 1M (cache $0.014)' },
            { value: 'deepseek-reasoner', label: 'DeepSeek V3.2 Reasoner (Thinking Mode)', tier: 'paid', pricing: '$0.55/$2.19 ต่อ 1M' }
        ]
    },
    kimi: {
        name: 'Kimi (Moonshot)',
        keyLabel: 'Kimi API Key',
        keyPlaceholder: 'sk-...',
        keyUrl: 'https://platform.moonshot.ai/console',
        keyUrlLabel: 'Moonshot Platform',
        info: 'โมเดล 1T params รองรับ 256K context',
        badge: '256K Context',
        models: [
            { value: 'kimi-k2-0905-preview', label: 'Kimi K2 0905 (ใหม่สุด แนะนำ)', tier: 'paid', pricing: '$0.60/$2.50 ต่อ 1M' },
            { value: 'kimi-k2-0711-preview', label: 'Kimi K2 0711 (เสถียร)', tier: 'paid', pricing: '$0.60/$2.50 ต่อ 1M' },
            { value: 'kimi-k2-thinking', label: 'Kimi K2 Thinking (Reasoning)', tier: 'paid', pricing: '$0.60/$2.50 ต่อ 1M' }
        ]
    },
    openrouter: {
        name: 'OpenRouter',
        keyLabel: 'OpenRouter API Key',
        keyPlaceholder: 'sk-or-v1-...',
        keyUrl: 'https://openrouter.ai/keys',
        keyUrlLabel: 'OpenRouter',
        info: 'รองรับ 300+ models รวมถึง Claude, DeepSeek, Qwen, Gemini, Typhoon และอื่นๆ',
        badge: 'ฟรี + มีค่าใช้จ่าย',
        models: [
            // === โมเดลฟรี (Free Tier) ===
            // Google Gemini (ฟรี)
            { value: 'google/gemini-3-flash-preview', label: 'Gemini 3 Flash (ฟรี ใหม่สุด)', tier: 'free', pricing: 'ฟรี' },
            { value: 'google/gemini-2.5-flash', label: 'Gemini 2.5 Flash (ฟรี แนะนำ)', tier: 'free', pricing: 'ฟรี' },
            { value: 'google/gemini-2.5-pro', label: 'Gemini 2.5 Pro (ฟรี Thinking)', tier: 'free', pricing: 'ฟรี' },
            // DeepSeek (ฟรี - รองรับไทย)
            { value: 'deepseek/deepseek-chat-v3-0324:free', label: 'DeepSeek V3 (ฟรี คุ้มสุด)', tier: 'free', pricing: 'ฟรี' },
            { value: 'deepseek/deepseek-r1:free', label: 'DeepSeek R1 Reasoning (ฟรี)', tier: 'free', pricing: 'ฟรี' },
            // Qwen (ฟรี - รองรับไทย)
            { value: 'qwen/qwen3-235b-a22b:free', label: 'Qwen 3 235B (ฟรี ฉลาด)', tier: 'free', pricing: 'ฟรี' },
            { value: 'qwen/qwen-2.5-72b-instruct:free', label: 'Qwen 2.5 72B (ฟรี)', tier: 'free', pricing: 'ฟรี' },
            // Meta Llama (ฟรี - รองรับไทย)
            { value: 'meta-llama/llama-3.3-70b-instruct:free', label: 'Llama 3.3 70B (ฟรี รองรับไทย)', tier: 'free', pricing: 'ฟรี' },
            // Mistral (ฟรี)
            { value: 'mistralai/devstral-2512:free', label: 'Devstral 2 Coding (ฟรี)', tier: 'free', pricing: 'ฟรี' },
            // NVIDIA (ฟรี)
            { value: 'nvidia/nemotron-3-nano-30b-a3b:free', label: 'NVIDIA Nemotron 3 (ฟรี)', tier: 'free', pricing: 'ฟรี' },
            // อื่นๆ ฟรี
            { value: 'arcee-ai/trinity-large-preview:free', label: 'Arcee Trinity 400B (ฟรี)', tier: 'free', pricing: 'ฟรี' },

            // === โมเดลมีค่าใช้จ่าย ===
            // DeepSeek (ราคาถูกมาก)
            { value: 'deepseek/deepseek-chat-v3.2', label: 'DeepSeek V3.2 (ถูกมาก)', tier: 'paid', pricing: '$0.25/$0.38 ต่อ 1M' },
            // Gemini (ราคาปานกลาง-แพง)
            { value: 'google/gemini-3-pro-preview', label: 'Gemini 3 Pro (แพง)', tier: 'paid', pricing: '$2/$12 ต่อ 1M' },
            // Claude (แพง แต่ฉลาด)
            { value: 'anthropic/claude-opus-4.5', label: 'Claude Opus 4.5 (แพงมาก)', tier: 'paid', pricing: '$5/$25 ต่อ 1M' },
            { value: 'anthropic/claude-sonnet-4', label: 'Claude Sonnet 4 (แพง)', tier: 'paid', pricing: '$3/$15 ต่อ 1M' },
            { value: 'anthropic/claude-haiku-4.5', label: 'Claude Haiku 4.5 (คุ้มค่า)', tier: 'paid', pricing: '$0.8/$4 ต่อ 1M' },
            // OpenAI
            { value: 'openai/gpt-4.1', label: 'GPT-4.1 (แพง)', tier: 'paid', pricing: '$2/$8 ต่อ 1M' },
            { value: 'openai/gpt-4.1-mini', label: 'GPT-4.1 Mini (คุ้มค่า)', tier: 'paid', pricing: '$0.4/$1.6 ต่อ 1M' },
            // Moonshot/Kimi (ราคาถูก รองรับไทย)
            { value: 'moonshotai/kimi-k2', label: 'Kimi K2 (ถูก รองรับไทย)', tier: 'paid', pricing: '$0.3/$0.9 ต่อ 1M' },
            // Mistral (ราคาถูก)
            { value: 'mistralai/mistral-large-2512', label: 'Mistral Large 3 (ราคาถูก)', tier: 'paid', pricing: '$0.5/$1.5 ต่อ 1M' },
            // โมเดลไทย
            { value: 'scb10x/typhoon2-70b-instruct', label: 'Typhoon 2 70B (ไทยโดยเฉพาะ)', tier: 'paid', pricing: '$0.5/$1.5 ต่อ 1M' },
            { value: 'scb10x/typhoon2-8b-instruct', label: 'Typhoon 2 8B (ไทย ถูก)', tier: 'paid', pricing: '$0.1/$0.3 ต่อ 1M' }
        ]
    }
};
