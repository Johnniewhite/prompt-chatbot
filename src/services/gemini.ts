import { GoogleGenerativeAI } from "@google/generative-ai";
import { SYSTEM_PROMPT } from "@/app/constants/systemPrompt";

interface GeminiError extends Error {
  message: string;
}

const genAI = new GoogleGenerativeAI(process.env.NEXT_PUBLIC_GEMINI_API_KEY!);

// Simple rate limiting
let lastRequestTime = 0;
const MIN_REQUEST_INTERVAL = 1000; // 1 second minimum between requests

export async function getChatResponse(message: string) {
  try {
    // Check if we need to wait before making another request
    const now = Date.now();
    const timeSinceLastRequest = now - lastRequestTime;
    if (timeSinceLastRequest < MIN_REQUEST_INTERVAL) {
      await new Promise(resolve => 
        setTimeout(resolve, MIN_REQUEST_INTERVAL - timeSinceLastRequest)
      );
    }

    const model = genAI.getGenerativeModel({ model: "gemini-pro" });
    const chat = model.startChat({
      history: [
        {
          role: "user",
          parts: SYSTEM_PROMPT,
        },
        {
          role: "model",
          parts: "I understand and will act according to these guidelines.",
        },
      ],
    });

    lastRequestTime = Date.now();
    const result = await chat.sendMessage(message);
    const response = await result.response;
    return response.text();
  } catch (error) {
    console.error('Error in getChatResponse:', error);
    
    const geminiError = error as GeminiError;
    // Handle rate limit errors specifically
    if (geminiError.message?.includes('429') || geminiError.message?.includes('quota')) {
      throw new Error('The AI is receiving too many requests right now. Please wait a moment and try again.');
    }
    
    // Handle other errors
    throw new Error('Failed to get response from Gemini. Please try again.');
  }
} 