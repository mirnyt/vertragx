import { z } from "zod";

export const calculateExpressionInputSchema = z.object({
  expression: z
    .string()
    .describe("The mathematical expression to evaluate, e.g. (2 + 2) * 3"),
});
