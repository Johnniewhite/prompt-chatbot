import { getOpenAIChatResponse } from './openai';
import { getChatResponse as getGeminiResponse } from './gemini';

export async function getChatResponse(message: string) {
  try {
    // Try OpenAI first
    const response = await getOpenAIChatResponse(message);
    return response;
  } catch (error) {
    console.log('OpenAI failed, falling back to Gemini:', error);
    
    try {
      // Fallback to Gemini
      const response = await getGeminiResponse(message);
      return response;
    } catch (geminiError) {
      // If both fail, throw the error
      console.error('Both OpenAI and Gemini failed:', geminiError);
      throw new Error('All AI services are currently unavailable. Please try again later.');
    }
  }
} 