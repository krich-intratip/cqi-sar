// AI Provider Configurations

export interface AIModel {
    value: string;
    label: string;
    tier?: 'free' | 'paid';
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
            { value: 'gemini-2.5-flash', label: 'Gemini 2.5 Flash (แนะนำ - เร็ว คุ้มค่า)', tier: 'free' },
            { value: 'gemini-2.5-pro', label: 'Gemini 2.5 Pro (ฉลาดสุด - Thinking)', tier: 'free' },
            { value: 'gemini-2.5-flash-lite', label: 'Gemini 2.5 Flash-Lite (ประหยัดสุด)', tier: 'free' },
            { value: 'gemini-2.0-flash', label: 'Gemini 2.0 Flash', tier: 'free' }
        ]
    },
    openai: {
        name: 'OpenAI ChatGPT',
        keyLabel: 'OpenAI API Key',
        keyPlaceholder: 'sk-...',
        keyUrl: 'https://platform.openai.com/api-keys',
        keyUrlLabel: 'OpenAI Platform',
        info: 'รับ API Key ได้ที่ OpenAI Platform (มีค่าใช้จ่าย)',
        badge: 'มีค่าใช้จ่าย',
        models: [
            { value: 'gpt-4.1', label: 'GPT-4.1 (1M context - แนะนำ)', tier: 'paid' },
            { value: 'gpt-4.1-mini', label: 'GPT-4.1 Mini (คุ้มค่า)', tier: 'paid' },
            { value: 'gpt-4.1-nano', label: 'GPT-4.1 Nano (ประหยัดสุด)', tier: 'paid' },
            { value: 'gpt-4o', label: 'GPT-4o (Multimodal)', tier: 'paid' },
            { value: 'gpt-4o-mini', label: 'GPT-4o Mini', tier: 'paid' },
            { value: 'o3-mini', label: 'o3-mini (Reasoning)', tier: 'paid' }
        ]
    },
    openrouter: {
        name: 'OpenRouter',
        keyLabel: 'OpenRouter API Key',
        keyPlaceholder: 'sk-or-v1-...',
        keyUrl: 'https://openrouter.ai/keys',
        keyUrlLabel: 'OpenRouter',
        info: 'รองรับหลาย models รวมถึง Claude, DeepSeek, Qwen, Typhoon และอื่นๆ',
        badge: 'ฟรี + มีค่าใช้จ่าย',
        models: [
            // Free Models
            { value: 'google/gemini-2.5-flash-preview-05-20', label: 'Gemini 2.5 Flash Preview', tier: 'free' },
            { value: 'google/gemini-2.5-pro-preview-05-06', label: 'Gemini 2.5 Pro Preview', tier: 'free' },
            { value: 'deepseek/deepseek-chat-v3-0324', label: 'DeepSeek V3', tier: 'free' },
            { value: 'deepseek/deepseek-r1-0528', label: 'DeepSeek R1 Reasoning', tier: 'free' },
            { value: 'deepseek/deepseek-r1-distill-llama-70b', label: 'DeepSeek R1 Distill 70B', tier: 'free' },
            { value: 'qwen/qwen3-235b-a22b', label: 'Qwen 3 235B', tier: 'free' },
            { value: 'qwen/qwen-2.5-72b-instruct', label: 'Qwen 2.5 72B', tier: 'free' },
            { value: 'meta-llama/llama-4-maverick', label: 'Llama 4 Maverick', tier: 'free' },
            { value: 'meta-llama/llama-4-scout', label: 'Llama 4 Scout', tier: 'free' },
            { value: 'meta-llama/llama-3.3-70b-instruct', label: 'Llama 3.3 70B', tier: 'free' },
            { value: 'microsoft/phi-4', label: 'Microsoft Phi-4', tier: 'free' },
            { value: 'nvidia/llama-3.1-nemotron-70b-instruct', label: 'NVIDIA Nemotron 70B', tier: 'free' },
            { value: 'mistralai/mistral-small-3.1-24b-instruct', label: 'Mistral Small 3.1', tier: 'free' },
            // Paid Models
            { value: 'anthropic/claude-sonnet-4', label: 'Claude Sonnet 4', tier: 'paid' },
            { value: 'anthropic/claude-haiku-3.5', label: 'Claude Haiku 3.5', tier: 'paid' },
            { value: 'openai/gpt-4.1', label: 'GPT-4.1', tier: 'paid' },
            { value: 'moonshotai/kimi-k2', label: 'Kimi K2', tier: 'paid' },
            { value: 'scb10x/typhoon2-70b-instruct', label: 'Typhoon 2 70B Thai', tier: 'paid' },
            { value: 'scb10x/typhoon2-8b-instruct', label: 'Typhoon 2 8B Thai', tier: 'paid' }
        ]
    }
};
