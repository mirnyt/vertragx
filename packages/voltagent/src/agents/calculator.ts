import "server-only";

import { openai } from "@ai-sdk/openai";
import { Agent, VoltAgent, createTool } from "@voltagent/core";
import { VercelAIProvider } from "@voltagent/vercel-ai";
import { calculateExpressionInputSchema } from "../schemas/calculator";

// Define a calculator tool
const calculatorTool = createTool({
  name: "calculate",
  description: "Perform a mathematical calculation",
  parameters: calculateExpressionInputSchema,
  execute: async (args) => {
    try {
      // Using Function is still not ideal for production but safer than direct eval
      // eslint-disable-next-line no-new-func
      const result = new Function(`return ${args.expression}`)();
      return { result };
    } catch (e) {
      // Properly use the error variable
      const errorMessage = e instanceof Error ? e.message : String(e);
      throw new Error(
        `Invalid expression: ${args.expression}. Error: ${errorMessage}`,
      );
    }
  },
});

export const calculatorAgent = new Agent({
  name: "Calculator Assistant",
  description:
    "A helpful assistant that can answer questions and perform mathematical calculations",
  llm: new VercelAIProvider(),
  model: openai("gpt-4o-mini"),
  tools: [calculatorTool],
});

// Initialize VoltAgent with the calculator agent
export const voltAgent = new VoltAgent({
  agents: {
    calculator: calculatorAgent,
  },
});

// Helper function for client usage
export async function calculateExpression(expression: string) {
  try {
    const result = await calculatorAgent.generateText(
      `Calculate ${expression}. Only respond with the numeric result.`,
    );

    return { success: true, result: result.text };
  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error.message : "Unknown error occurred",
    };
  }
}
