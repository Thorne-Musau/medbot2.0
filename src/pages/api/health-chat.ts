// File: src/pages/api/health-chat.ts
import type { APIRoute } from 'astro';
import OpenAI from 'openai';
import { GoogleGenerativeAI } from '@google/generative-ai';

// Define interfaces for our message types
interface ChatMessage {
  sender: 'user' | 'assistant' | string;
  content: string;
}

interface OpenAIMessage {
  role: 'user' | 'assistant' | 'system';
  content: string;
}

// Initialize AI clients
const openai = new OpenAI({
  apiKey: import.meta.env.OPENAI_API_KEY
});

const genAI = new GoogleGenerativeAI(import.meta.env.GEMINI_API_KEY);
const TOGETHER_API_KEY = import.meta.env.TOGETHER_API_KEY;

export const POST: APIRoute = async ({ request }) => {
  try {
    const body = await request.json();
    const { message, userSettings, history = [] } = body;

    const systemPrompt = `You are a helpful health information assistant that provides specific health information to users. 
You should:
- Only answer health-related questions
- Provide evidence-based information when possible
- Always include Explainable AI (X-AI) in your response with the following structure:
  * Prediction/Assessment: Your main assessment or prediction
  * Confidence Level: A percentage indicating how confident you are
  * Contributing Factors: List of factors that influenced your assessment, with weights
  * Reasoning: Clear explanation of how you arrived at your assessment
  * Limitations: Known limitations or uncertainties in your assessment
- Give a clear explanation of the disease, its symptoms, and its causes
- Clearly state when information is general and not medical advice
- You can also ask followup questions if needed to help you provide a more accurate response
- Encourage users to consult healthcare professionals for diagnosis, treatment, or medical advice
- Try not to over explain a disease, but rather provide a clear and concise explanation, focusing on the main points and only explain when the user wants a detailed explanation
- Organize your response in a way that is easy to understand, with headings and subheadings
- Be respectful and compassionate about health concerns
- Use language that is accessible based on the user's preferred clarity level
- Make definitive medical diagnoses or prescribing treatments according to the user's specific context: ${userSettings || 'No specific context provided'}
- Keep responses concise and focused on answering the user's question


Format your X-AI response as a JSON object with the following structure:
{
  "prediction": "string",
  "confidence": number (0-1),
  "factors": [
    {
      "factor": "string",
      "weight": number (0-1),
      "explanation": "string"
    }
  ],
  "reasoning": "string",
  "limitations": ["string"]
}`;

    let response: string | null = null;
    let xaiData: any = null;
    let error: Error | null = null;

    // Try OpenAI first
    try {
      const openaiResponse = await openai.chat.completions.create({
        model: "gpt-3.5-turbo",
        messages: [
          { role: "system", content: systemPrompt },
          ...history.map((msg: any) => ({
            role: msg.sender === "user" ? "user" : "assistant",
            content: msg.content,
          })),
          { role: "user", content: message },
        ],
        temperature: 0.7,
        max_tokens: 1000,
      });

      response = openaiResponse.choices[0]?.message?.content || null;
    } catch (err) {
      console.error('OpenAI error:', err);
      error = err as Error;
    }

    // If OpenAI fails, try Gemini
    if (!response) {
      try {
        const model = genAI.getGenerativeModel({ model: "gemini-1.0-pro" });
        const result = await model.generateContent([
          systemPrompt,
          ...history.map((msg: any) => msg.content),
          message,
        ]);
        response = result.response.text();
      } catch (err) {
        console.error('Gemini error:', err);
        error = err as Error;
      }
    }

    // If both fail, try Together AI
    if (!response) {
      try {
        const togetherResponse = await fetch('https://api.together.xyz/v1/chat/completions', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${TOGETHER_API_KEY}`
          },
          body: JSON.stringify({
            model: "meta-llama/Llama-3.2-11B-Vision-Instruct-Turbo",
            messages: [
              { role: "system", content: systemPrompt },
              ...history.map((msg: any) => ({
                role: msg.sender === "user" ? "user" : "assistant",
                content: msg.content,
              })),
              { role: "user", content: message },
            ],
            max_tokens: 1000,
            temperature: 0.7,
          })
        });

        const togetherData = await togetherResponse.json();
        response = togetherData.choices?.[0]?.message?.content || null;
      } catch (err) {
        console.error('Together AI error:', err);
        error = err as Error;
      }
    }

    // If we have a response, try to parse X-AI data
    if (response) {
      try {
        const xaiMatch = response.match(/\{[\s\S]*\}/);
        if (xaiMatch) {
          xaiData = JSON.parse(xaiMatch[0]);
          response = response.replace(/\{[\s\S]*\}/, '').trim();
        }
      } catch (err) {
        console.error('Error parsing X-AI data:', err);
      }
    }

    // If all AI services failed, return an error
    if (!response) {
      throw new Error('All AI services failed to generate a response');
    }

    return new Response(
      JSON.stringify({
        response,
        xaiData,
        apiStatus: error ? 'degraded' : 'success',
        error: error?.message
      }),
      {
        status: 200,
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );
  } catch (error) {
    return new Response(
      JSON.stringify({
        error: error instanceof Error ? error.message : 'An error occurred',
        apiStatus: 'error'
      }),
      {
        status: 500,
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );
  }
};