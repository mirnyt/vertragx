import "server-only";

import { openai } from "@ai-sdk/openai";
import { Agent, VoltAgent } from "@voltagent/core";
import { VercelAIProvider } from "@voltagent/vercel-ai";

// Simple calculator implementation without complex type inference
function calculateExpression(expression: string): number {
  try {
    // Using Function is still not ideal for production but safer than direct eval
    // eslint-disable-next-line no-new-func
    const result = new Function(`return ${expression}`)();
    return result;
  } catch (e) {
    const errorMessage = e instanceof Error ? e.message : String(e);
    throw new Error(
      `Invalid expression: ${expression}. Error: ${errorMessage}`,
    );
  }
}

export const calculatorAgent = new Agent({
  name: "Calculator Assistant",
  description:
    "A helpful assistant that can answer questions and perform mathematical calculations",
  llm: new VercelAIProvider(),
  model: openai("gpt-4o-mini"),
  tools: [],
});

// Initialize VoltAgent with the calculator agent
export const voltAgent = new VoltAgent({
  agents: {
    calculator: calculatorAgent,
  },
});

// Helper function for client usage
export async function calculateExpressionClient(expression: string) {
  try {
    const result = calculateExpression(expression);
    return { success: true, result: result.toString() };
  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error.message : "Unknown error occurred",
    };
  }
}
