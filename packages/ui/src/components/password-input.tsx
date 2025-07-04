"use client";

import { Eye, EyeOff } from "lucide-react";
import * as React from "react";
import { cn } from "../utils";
import { Button } from "./button";
import { Input } from "./input";

interface PasswordStrength {
  score: number;
  label: string;
  color: string;
  suggestions: string[];
}

function calculatePasswordStrength(password: string): PasswordStrength {
  let score = 0;
  const suggestions: string[] = [];

  if (password.length === 0) {
    return {
      score: 0,
      label: "",
      color: "bg-gray-200",
      suggestions: [],
    };
  }

  // Length check
  if (password.length >= 8) {
    score += 1;
  } else {
    suggestions.push("Use at least 8 characters");
  }

  // Uppercase check
  if (/[A-Z]/.test(password)) {
    score += 1;
  } else {
    suggestions.push("Add uppercase letters");
  }

  // Lowercase check
  if (/[a-z]/.test(password)) {
    score += 1;
  } else {
    suggestions.push("Add lowercase letters");
  }

  // Number check
  if (/\d/.test(password)) {
    score += 1;
  } else {
    suggestions.push("Add numbers");
  }

  // Special character check
  if (/[!@#$%^&*(),.?":{}|<>]/.test(password)) {
    score += 1;
  } else {
    suggestions.push("Add special characters");
  }

  const strengthMap = [
    { label: "Very Weak", color: "bg-red-500" },
    { label: "Weak", color: "bg-orange-500" },
    { label: "Fair", color: "bg-yellow-500" },
    { label: "Good", color: "bg-blue-500" },
    { label: "Strong", color: "bg-green-500" },
    { label: "Very Strong", color: "bg-green-600" },
  ];

  return {
    score,
    label: strengthMap[score]?.label || "Very Weak",
    color: strengthMap[score]?.color || "bg-red-500",
    suggestions: suggestions.slice(0, 2), // Limit to 2 suggestions
  };
}

export interface PasswordInputProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "type"> {
  showStrengthIndicator?: boolean;
}

const PasswordInput = React.forwardRef<HTMLInputElement, PasswordInputProps>(
  ({ className, showStrengthIndicator = false, ...props }, ref) => {
    const [showPassword, setShowPassword] = React.useState(false);
    const [password, setPassword] = React.useState("");
    const strength = calculatePasswordStrength(password);

    const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const value = e.target.value;
      setPassword(value);
      props.onChange?.(e);
    };

    return (
      <div className="space-y-2">
        <div className="relative">
          <Input
            {...props}
            ref={ref}
            type={showPassword ? "text" : "password"}
            className={cn("pr-10", className)}
            value={password}
            onChange={handlePasswordChange}
          />
          <Button
            type="button"
            variant="ghost"
            size="sm"
            className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
            onClick={() => setShowPassword(!showPassword)}
            tabIndex={-1}
          >
            {showPassword ? (
              <EyeOff className="h-4 w-4 text-muted-foreground" />
            ) : (
              <Eye className="h-4 w-4 text-muted-foreground" />
            )}
          </Button>
        </div>

        {showStrengthIndicator && password && (
          <div className="space-y-2">
            {/* Strength bar */}
            <div className="flex space-x-1">
              {[1, 2, 3, 4, 5].map((level) => (
                <div
                  key={level}
                  className={cn(
                    "h-2 flex-1 rounded-full",
                    level <= strength.score ? strength.color : "bg-muted",
                  )}
                />
              ))}
            </div>

            {/* Strength label */}
            <div className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground">
                Password strength:{" "}
                <span className="font-medium">{strength.label}</span>
              </span>
            </div>

            {/* Suggestions */}
            {strength.suggestions.length > 0 && strength.score < 4 && (
              <div className="text-xs text-muted-foreground">
                <p>Suggestions:</p>
                <ul className="list-disc list-inside space-y-1">
                  {strength.suggestions.map((suggestion) => (
                    <li key={suggestion}>{suggestion}</li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        )}
      </div>
    );
  },
);

PasswordInput.displayName = "PasswordInput";

export { PasswordInput };
