"use server";

import { actionClientWithMeta } from "@/actions/safe-action";
import { calculateExpressionClient } from "@v1/voltagent/agents";
import { calculateExpressionInputSchema } from "@v1/voltagent/schemas";

export const calculateExpressionAction = actionClientWithMeta
  .schema(calculateExpressionInputSchema)
  .metadata({
    name: "calculate-expression",
  })
  .action(async ({ parsedInput: { expression } }) => {
    const result = await calculateExpressionClient(expression);
    return result;
  });