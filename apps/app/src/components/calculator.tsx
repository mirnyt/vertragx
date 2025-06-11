"use client";

import { useState } from "react";
import { useAction } from "next-safe-action/hooks";
import { calculateExpressionAction } from "@/actions/voltagent/calculate-action";

export function Calculator() {
  const [expression, setExpression] = useState("");
  const { execute, isPending, result, hasSucceeded, hasErrored } = useAction(calculateExpressionAction);

  const handleCalculate = () => {
    if (!expression.trim()) return;
    execute({ expression });
  };

  const getResultDisplay = () => {
    if (hasErrored) {
      return "Error: Failed to calculate";
    }
    
    if (hasSucceeded && result.data) {
      if (result.data.success) {
        return result.data.result || "No result";
      }
      return `Error: ${result.data.error || "Unknown error"}`;
    }
    
    return "";
  };

  return (
    <div className="max-w-md mx-auto p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-4 text-center">
        VoltAgent Calculator
      </h2>
      <div className="space-y-4">
        <input
          type="text"
          value={expression}
          onChange={(e) => setExpression(e.target.value)}
          placeholder="Enter expression (e.g., 2 + 2)"
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          onKeyDown={(e) => e.key === "Enter" && handleCalculate()}
        />
        <button
          type="button"
          onClick={handleCalculate}
          disabled={isPending}
          className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 disabled:opacity-50"
        >
          {isPending ? "Calculating..." : "Calculate"}
        </button>
        {getResultDisplay() && (
          <div className="p-3 bg-gray-100 rounded-md">
            <strong>Result: </strong>
            {getResultDisplay()}
          </div>
        )}
      </div>
    </div>
  );
}
