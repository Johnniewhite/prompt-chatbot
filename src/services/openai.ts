import OpenAI from 'openai';
import { SYSTEM_PROMPT } from '@/app/constants/systemPrompt';

const openai = new OpenAI({
  apiKey: process.env.NEXT_PUBLIC_OPENAI_API_KEY,
  dangerouslyAllowBrowser: true // Note: In production, you should use API routes
});

export async function getOpenAIChatResponse(message: string) {
  try {
    const completion = await openai.chat.completions.create({
      messages: [
        { role: 'system', content: SYSTEM_PROMPT },
        { role: 'user', content: message }
      ],
      model: 'gpt-4o',
    });

    return completion.choices[0]?.message?.content || '';
  } catch (error) {
    console.error('OpenAI Error:', error);
    throw error;
  }
} 