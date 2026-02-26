import { GoogleGenAI, Type } from "@google/genai";
import { AgentMatchResponse } from '../types';

// Ensure API key is available
const apiKey = process.env.API_KEY || '';

const ai = new GoogleGenAI({ apiKey });

export const analyzeUserRequest = async (userQuery: string): Promise<AgentMatchResponse> => {
  try {
    const model = "gemini-3-flash-preview";
    
    const response = await ai.models.generateContent({
      model: model,
      contents: `User is looking for a real estate agent on GayRealEstate.com. Analyze their query: "${userQuery}". 
      Identify the location they are interested in, their intent (buy/sell), and key features they want.
      Also provide a short, welcoming reasoning sentence for why we are matching them with specific agents.`,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            suggestedLocation: { type: Type.STRING, description: "The city and state inferred from the query, e.g. 'Austin, TX' or 'New York, NY'" },
            intent: { type: Type.STRING, enum: ["buy", "sell", "invest"], description: "User's primary goal" },
            keyFeatures: { type: Type.ARRAY, items: { type: Type.STRING }, description: "Keywords like 'condo', 'luxury', 'family', 'quiet'" },
            reasoning: { type: Type.STRING, description: "A friendly, professional sentence explaining the search criteria extraction." }
          },
          required: ["reasoning"]
        }
      }
    });

    const text = response.text;
    if (!text) {
      throw new Error("No response from AI");
    }

    return JSON.parse(text) as AgentMatchResponse;

  } catch (error) {
    console.error("Error analyzing user request:", error);
    // Fallback response in case of error
    return {
      reasoning: "We're having trouble connecting to our AI concierge, but here are some popular agents.",
      intent: 'buy'
    };
  }
};
