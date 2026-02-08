'use server';

/**
 * AI Server Actions for CQI-SAR
 * Supports Google Gemini, DeepSeek, Kimi (Moonshot), and OpenRouter APIs
 * อัพเดทล่าสุด: กุมภาพันธ์ 2569
 */

const providerEndpoints = {
    gemini: 'https://generativelanguage.googleapis.com/v1beta/models/',
    deepseek: 'https://api.deepseek.com/chat/completions',
    kimi: 'https://api.moonshot.ai/v1/chat/completions',
    openrouter: 'https://openrouter.ai/api/v1/chat/completions'
};

export async function testConnection(provider: string, apiKey: string, model: string) {
    try {
        const result = await generateContent(
            { provider, apiKey, model },
            'สวัสดี ตอบสั้นๆ ว่า "เชื่อมต่อสำเร็จ"'
        );
        return { success: true, message: result.text?.substring(0, 100) };
    } catch (error: unknown) {
        const message = error instanceof Error ? error.message : 'Unknown error';
        return { success: false, error: message };
    }
}

export async function generateContent(
    config: { provider: string; apiKey: string; model: string },
    prompt: string
): Promise<{ success: boolean; text?: string; error?: string }> {
    try {
        if (config.provider === 'gemini') {
            return await callGemini(prompt, config.apiKey, config.model);
        } else if (config.provider === 'deepseek') {
            return await callDeepSeek(prompt, config.apiKey, config.model);
        } else if (config.provider === 'kimi') {
            return await callKimi(prompt, config.apiKey, config.model);
        } else if (config.provider === 'openrouter') {
            return await callOpenRouter(prompt, config.apiKey, config.model);
        }
        throw new Error('Unknown provider: ' + config.provider);
    } catch (error: unknown) {
        const message = error instanceof Error ? error.message : 'Unknown error';
        return { success: false, error: message };
    }
}

async function callGemini(prompt: string, apiKey: string, model: string) {
    const url = `${providerEndpoints.gemini}${model}:generateContent?key=${apiKey}`;
    const response = await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            contents: [{ parts: [{ text: prompt }] }],
            generationConfig: {
                temperature: 0.7,
                maxOutputTokens: 8192
            }
        })
    });

    if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error?.message || response.statusText);
    }

    const data = await response.json();
    return { success: true, text: data.candidates[0].content.parts[0].text };
}

async function callDeepSeek(prompt: string, apiKey: string, model: string) {
    const response = await fetch(providerEndpoints.deepseek, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${apiKey}`
        },
        body: JSON.stringify({
            model: model,
            messages: [{ role: 'user', content: prompt }],
            temperature: 0.7,
            max_tokens: 8192
        })
    });

    if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error?.message || response.statusText);
    }

    const data = await response.json();
    return { success: true, text: data.choices[0].message.content };
}

async function callKimi(prompt: string, apiKey: string, model: string) {
    const response = await fetch(providerEndpoints.kimi, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${apiKey}`
        },
        body: JSON.stringify({
            model: model,
            messages: [{ role: 'user', content: prompt }],
            temperature: 0.7,
            max_tokens: 8192
        })
    });

    if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error?.message || response.statusText);
    }

    const data = await response.json();
    return { success: true, text: data.choices[0].message.content };
}

async function callOpenRouter(prompt: string, apiKey: string, model: string) {
    const response = await fetch(providerEndpoints.openrouter, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${apiKey}`,
            'HTTP-Referer': 'https://cqi-sar.vercel.app',
            'X-Title': 'CQI-SAR Evaluation System'
        },
        body: JSON.stringify({
            model: model,
            messages: [{ role: 'user', content: prompt }],
            temperature: 0.7,
            max_tokens: 8192
        })
    });

    if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error?.message || response.statusText);
    }

    const data = await response.json();
    return { success: true, text: data.choices[0].message.content };
}
