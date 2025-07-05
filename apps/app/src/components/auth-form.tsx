"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useAction } from "next-safe-action/hooks";
import { Button } from "@v1/ui/button";
import { Input } from "@v1/ui/input";
import { PasswordInput } from "@v1/ui/password-input";
import { Label } from "@v1/ui/label";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@v1/ui/card";
import { useToast } from "@v1/ui/use-toast";
import { signUpAction } from "@/actions/auth/sign-up-action";
import { signInAction } from "@/actions/auth/sign-in-action";
import {
  signUpSchema,
  signInSchema,
  type AuthFormData,
  type SignUpFormData,
  type SignInFormData,
} from "@/actions/auth/schema";
import Link from "next/link";
import { Loader2 } from "lucide-react";

type AuthFormProps = {
  mode: "signin" | "signup";
};

export function AuthForm({ mode }: AuthFormProps) {
  const { toast } = useToast();
  const isSignUp = mode === "signup";
  const schema = isSignUp ? signUpSchema : signInSchema;

  // Use proper conditional types
  type FormData = AuthFormData<typeof mode>;

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
  });

  const signUpMutation = useAction(signUpAction, {
    onSuccess: (data) => {
      if (data.data?.success) {
        toast({
          variant: "success",
          title: "Account created!",
          description: data.data.message,
        });
      }
    },
    onError: (error) => {
      toast({
        variant: "destructive",
        title: "Sign up failed",
        description: error.error.serverError || "Something went wrong",
      });
    },
  });

  const signInMutation = useAction(signInAction, {
    onError: (error) => {
      toast({
        variant: "destructive",
        title: "Sign in failed",
        description: error.error.serverError || "Invalid email or password",
      });
    },
  });

  const isLoading = signUpMutation.isPending || signInMutation.isPending;

  const onSubmit = (data: FormData) => {
    if (isSignUp) {
      signUpMutation.execute(data as SignUpFormData);
    } else {
      signInMutation.execute(data as SignInFormData);
    }
  };

  return (
    <Card className="w-full max-w-md">
      <CardHeader className="space-y-1">
        <CardTitle className="text-2xl font-bold">
          {isSignUp ? "Create an account" : "Welcome back"}
        </CardTitle>
        <CardDescription>
          {isSignUp
            ? "Enter your details to create your account"
            : "Enter your credentials to access your account"}
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          {isSignUp && (
            <div className="space-y-2">
              <Label htmlFor="fullName">Full Name</Label>
              <Input
                id="fullName"
                placeholder="John Doe"
                autoFocus
                {...register("fullName" as keyof FormData)}
                disabled={isLoading}
              />
              {"fullName" in errors && errors.fullName && (
                <p className="text-sm text-destructive">
                  {errors.fullName.message}
                </p>
              )}
            </div>
          )}

          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              placeholder="john@example.com"
              autoFocus={!isSignUp}
              {...register("email")}
              disabled={isLoading}
            />
            {errors.email && (
              <p className="text-sm text-destructive">{errors.email.message}</p>
            )}
          </div>

          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <Label htmlFor="password">Password</Label>
              {!isSignUp && (
                <Link
                  href="/forgot-password"
                  className="text-xs text-muted-foreground hover:text-primary"
                >
                  Forgot password?
                </Link>
              )}
            </div>
            <PasswordInput
              id="password"
              placeholder="••••••••"
              showStrengthIndicator={isSignUp}
              {...register("password")}
              disabled={isLoading}
            />
            {errors.password && (
              <p className="text-sm text-destructive">
                {errors.password.message}
              </p>
            )}
          </div>

          <Button type="submit" className="w-full" disabled={isLoading}>
            {isLoading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                {isSignUp ? "Creating account..." : "Signing in..."}
              </>
            ) : (
              <>{isSignUp ? "Create account" : "Sign in"}</>
            )}
          </Button>
        </form>
      </CardContent>
      <CardFooter>
        <p className="text-sm text-muted-foreground text-center w-full">
          {isSignUp ? (
            <>
              Already have an account?{" "}
              <Link href="/login" className="text-primary hover:underline">
                Sign in
              </Link>
            </>
          ) : (
            <>
              Don't have an account?{" "}
              <Link href="/signup" className="text-primary hover:underline">
                Create account
              </Link>
            </>
          )}
        </p>
      </CardFooter>
    </Card>
  );
}
