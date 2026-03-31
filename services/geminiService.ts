import { AgentMatchResponse } from '../types';

export const analyzeUserRequest = async (userQuery: string): Promise<AgentMatchResponse> => {
  try {
    const response = await fetch('/api/analyze-request', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ userQuery })
    });

    if (!response.ok) {
       throw new Error(`Proxy responded with status ${response.status}`);
    }

    return await response.json() as AgentMatchResponse;

  } catch (error) {
    console.error("Error analyzing user request via proxy:", error);
    // Fallback response in case of error
    return {
      reasoning: "We're having trouble connecting to our AI concierge, but here are some popular agents.",
      intent: 'buy'
    };
  }
};
