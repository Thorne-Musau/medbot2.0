import { Message } from '../types/chat';

interface XAIExplanation {
  prediction: string;
  confidence: number;
  factors: {
    factor: string;
    weight: number;
    explanation: string;
  }[];
  reasoning: string;
  limitations: string[];
}

export const generateXAIExplanation = async (
  prediction: string,
  confidence: number,
  factors: { factor: string; weight: number; explanation: string }[],
  reasoning: string,
  limitations: string[]
): Promise<XAIExplanation> => {
  return {
    prediction,
    confidence,
    factors,
    reasoning,
    limitations,
  };
};

export const formatXAIResponse = (explanation: XAIExplanation): string => {
  const confidencePercentage = Math.round(explanation.confidence * 100);
  
  let response = `🔍 AI Analysis Explanation\n\n`;
  response += `Prediction: ${explanation.prediction}\n`;
  response += `Confidence Level: ${confidencePercentage}%\n\n`;
  
  response += `📊 Contributing Factors:\n`;
  explanation.factors.forEach(({ factor, weight, explanation }) => {
    const weightPercentage = Math.round(weight * 100);
    response += `• ${factor} (${weightPercentage}%): ${explanation}\n`;
  });
  
  response += `\n🤔 Reasoning:\n${explanation.reasoning}\n\n`;
  
  response += `⚠️ Limitations:\n`;
  explanation.limitations.forEach(limitation => {
    response += `• ${limitation}\n`;
  });
  
  return response;
};

export const enhanceHealthChatResponse = (message: Message, xaiExplanation: XAIExplanation): Message => {
  return {
    ...message,
    content: `${message.content}\n\n${formatXAIResponse(xaiExplanation)}`,
  };
}; 