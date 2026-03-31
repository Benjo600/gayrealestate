import { GoogleGenAI, Type } from "@google/genai";
import type { Context, Config } from "@netlify/functions";

export default async (req: Request, context: Context) => {
  if (req.method !== "POST") {
    return new Response("Method Not Allowed", { status: 405 });
  }

  try {
    const { userQuery } = await req.json();
    const apiKey = Netlify.env.get("GEMINI_API_KEY");

    if (!apiKey) {
      return new Response(JSON.stringify({ error: "API Key not configured" }), { status: 500 });
    }

    const ai = new GoogleGenAI({ apiKey });
    const model = "gemini-1.5-flash";
    
    // Using the style from the original project:
    const response = await (ai as any).models.generateContent({
      model: model,
      contents: `User is looking for a real estate agent on GayRealEstateCT.net. Analyze their query: "${userQuery}". 
      Identify the location they are interested in, their intent (buy/sell), and key features they want.
      Also provide a short, welcoming reasoning sentence for why we are matching them with specific agents.`,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            suggestedLocation: { type: Type.STRING },
            intent: { type: Type.STRING, enum: ["buy", "sell", "invest"] },
            keyFeatures: { type: Type.ARRAY, items: { type: Type.STRING } },
            reasoning: { type: Type.STRING }
          },
          required: ["reasoning"]
        }
      }
    });

    const text = response.text;
    return new Response(text, {
      headers: { "Content-Type": "application/json" }
    });

  } catch (error: any) {
    console.error("Gemini Proxy Error:", error);
    return new Response(JSON.stringify({ error: error.message }), { status: 500 });
  }
};

export const config: Config = {
  path: "/api/analyze-request"
};
