"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useAction } from "next-safe-action/hooks";
import { Button } from "@v1/ui/button";
import { Input } from "@v1/ui/input";
import { Label } from "@v1/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@v1/ui/card";
import { useToast } from "@v1/ui/use-toast";
import { forgotPasswordAction } from "@/actions/auth/forgot-password-action";
import { forgotPasswordSchema, type ForgotPasswordFormData } from "@/actions/auth/schema";
import Link from "next/link";
import { Loader2, ArrowLeft } from "lucide-react";

export function ForgotPasswordForm() {
  const { toast } = useToast();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ForgotPasswordFormData>({
    resolver: zodResolver(forgotPasswordSchema),
  });

  const mutation = useAction(forgotPasswordAction, {
    onSuccess: (data) => {
      if (data.data?.success) {
        toast({
          variant: "success",
          title: "Reset email sent!",
          description: data.data.message,
        });
      }
    },
    onError: (error) => {
      toast({
        variant: "destructive",
        title: "Failed to send reset email",
        description: error.error.serverError || "Something went wrong",
      });
    },
  });

  const onSubmit = (data: ForgotPasswordFormData) => {
    mutation.execute(data);
  };

  return (
    <Card className="w-full max-w-md">
      <CardHeader className="space-y-1">
        <CardTitle className="text-2xl font-bold">Forgot Password</CardTitle>
        <CardDescription>
          Enter your email address and we'll send you a link to reset your password.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              placeholder="john@example.com"
              autoFocus
              {...register("email")}
              disabled={mutation.isPending}
            />
            {errors.email && (
              <p className="text-sm text-destructive">{errors.email.message}</p>
            )}
          </div>

          <Button type="submit" className="w-full" disabled={mutation.isPending}>
            {mutation.isPending ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Sending reset link...
              </>
            ) : (
              "Send reset link"
            )}
          </Button>
        </form>

        <div className="text-center">
          <Link 
            href="/login" 
            className="text-sm text-muted-foreground hover:text-primary inline-flex items-center gap-1"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to login
          </Link>
        </div>
      </CardContent>
    </Card>
  );
}