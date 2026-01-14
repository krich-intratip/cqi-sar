// AI Provider Configurations

export interface AIModel {
    value: string;
    label: string;
}

export interface ProviderConfig {
    name: string;
    keyLabel: string;
    info: string;
    models: AIModel[];
}

export const providerConfig: Record<string, ProviderConfig> = {
    gemini: {
        name: 'Google Gemini',
        keyLabel: 'Gemini API Key',
        info: 'รับ API Key ได้ที่ <a href="https://aistudio.google.com/app/apikey" target="_blank" class="text-primary-blue underline">Google AI Studio</a> (ฟรี!)',
        models: [
            { value: 'gemini-2.5-flash', label: 'Gemini 2.5 Flash (แนะนำ - เร็ว คุ้มค่า)' },
            { value: 'gemini-2.5-pro', label: 'Gemini 2.5 Pro (ฉลาดสุด - Thinking)' },
            { value: 'gemini-2.5-flash-lite', label: 'Gemini 2.5 Flash-Lite (ประหยัดสุด)' },
            { value: 'gemini-2.0-flash', label: 'Gemini 2.0 Flash' }
        ]
    },
    openai: {
        name: 'OpenAI ChatGPT',
        keyLabel: 'OpenAI API Key',
        info: 'รับ API Key ได้ที่ <a href="https://platform.openai.com/api-keys" target="_blank" class="text-primary-blue underline">OpenAI Platform</a>',
        models: [
            { value: 'gpt-5', label: 'GPT-5 (ฉลาดสุด - Aug 2025)' },
            { value: 'gpt-5-mini', label: 'GPT-5 Mini (เร็ว ประหยัด)' },
            { value: 'gpt-4.1', label: 'GPT-4.1 (1M context)' },
            { value: 'gpt-4.1-mini', label: 'GPT-4.1 Mini (คุ้มค่า)' },
            { value: 'gpt-4o', label: 'GPT-4o (Multimodal)' },
            { value: 'gpt-4o-mini', label: 'GPT-4o Mini' }
        ]
    },
    openrouter: {
        name: 'OpenRouter',
        keyLabel: 'OpenRouter API Key',
        info: 'รับ API Key ได้ที่ <a href="https://openrouter.ai/keys" target="_blank" class="text-primary-blue underline">OpenRouter</a><br>✅ รองรับหลาย models รวมถึง Claude, DeepSeek, Qwen, Typhoon และอื่นๆ',
        models: [
            { value: 'google/gemini-2.5-flash-preview-05-20', label: '🔷 Gemini 2.5 Flash Preview (ฟรี)' },
            { value: 'google/gemini-2.5-pro-preview-05-06', label: '🔷 Gemini 2.5 Pro Preview (ฟรี)' },
            { value: 'deepseek/deepseek-chat-v3-0324', label: '🔵 DeepSeek V3 (ฟรี)' },
            { value: 'deepseek/deepseek-r1-0528', label: '🔵 DeepSeek R1 Reasoning (ฟรี)' },
            { value: 'deepseek/deepseek-r1-distill-llama-70b', label: '🔵 DeepSeek R1 Distill 70B (ฟรี)' },
            { value: 'qwen/qwen3-235b-a22b', label: '🟣 Qwen 3 235B (ฟรี)' },
            { value: 'qwen/qwen-2.5-coder-32b-instruct', label: '🟣 Qwen 2.5 Coder 32B (ฟรี)' },
            { value: 'qwen/qwen-2.5-72b-instruct', label: '🟣 Qwen 2.5 72B (ฟรี)' },
            { value: 'meta-llama/llama-4-maverick', label: '🦙 Llama 4 Maverick (ฟรี)' },
            { value: 'meta-llama/llama-4-scout', label: '🦙 Llama 4 Scout (ฟรี)' },
            { value: 'meta-llama/llama-3.3-70b-instruct', label: '🦙 Llama 3.3 70B (ฟรี)' },
            { value: 'microsoft/phi-4', label: '🟦 Microsoft Phi-4 (ฟรี)' },
            { value: 'nvidia/llama-3.1-nemotron-70b-instruct', label: '🟩 NVIDIA Nemotron 70B (ฟรี)' },
            { value: 'mistralai/mistral-small-3.1-24b-instruct', label: '🟠 Mistral Small 3.1 (ฟรี)' },
            { value: 'anthropic/claude-sonnet-4', label: '🟠 Claude Sonnet 4 (มีค่าใช้จ่าย)' },
            { value: 'anthropic/claude-haiku-3.5', label: '🟠 Claude Haiku 3.5 (มีค่าใช้จ่าย)' },
            { value: 'openai/gpt-4.1', label: '🟢 GPT-4.1 (มีค่าใช้จ่าย)' },
            { value: 'moonshotai/kimi-k2', label: '🌙 Kimi K2 (มีค่าใช้จ่าย)' },
            { value: 'scb10x/typhoon2-70b-instruct', label: '🇹🇭 Typhoon 2 70B Thai (มีค่าใช้จ่าย)' },
            { value: 'scb10x/typhoon2-8b-instruct', label: '🇹🇭 Typhoon 2 8B Thai (มีค่าใช้จ่าย)' }
        ]
    }
};
