"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useAction } from "next-safe-action/hooks";
import { Button } from "@v1/ui/button";
import { PasswordInput } from "@v1/ui/password-input";
import { Label } from "@v1/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@v1/ui/card";
import { resetPasswordAction } from "@/actions/auth/reset-password-action";
import { resetPasswordSchema } from "@/actions/auth/schema";
import { z } from "zod";
import { Loader2 } from "lucide-react";

type FormData = z.infer<typeof resetPasswordSchema>;

export function ResetPasswordForm() {
  const [error, setError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(resetPasswordSchema),
  });

  const mutation = useAction(resetPasswordAction, {
    onError: (error) => {
      setError(error.error.serverError || "Something went wrong");
    },
  });

  const onSubmit = (data: FormData) => {
    setError(null);
    mutation.execute(data);
  };

  return (
    <Card className="w-full max-w-md">
      <CardHeader className="space-y-1">
        <CardTitle className="text-2xl font-bold">Reset Password</CardTitle>
        <CardDescription>
          Enter your new password below.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="password">New Password</Label>
            <PasswordInput
              id="password"
              placeholder="••••••••"
              showStrengthIndicator={true}
              {...register("password")}
              disabled={mutation.isPending}
            />
            {errors.password && (
              <p className="text-sm text-destructive">{errors.password.message}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="confirmPassword">Confirm Password</Label>
            <PasswordInput
              id="confirmPassword"
              placeholder="••••••••"
              {...register("confirmPassword")}
              disabled={mutation.isPending}
            />
            {errors.confirmPassword && (
              <p className="text-sm text-destructive">{errors.confirmPassword.message}</p>
            )}
          </div>

          {error && (
            <div className="rounded-md bg-destructive/10 p-3">
              <p className="text-sm text-destructive">{error}</p>
            </div>
          )}

          <Button type="submit" className="w-full" disabled={mutation.isPending}>
            {mutation.isPending ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Updating password...
              </>
            ) : (
              "Update password"
            )}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}