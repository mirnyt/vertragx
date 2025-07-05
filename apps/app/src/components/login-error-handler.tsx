"use client";

import { useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { useToast } from "@v1/ui/use-toast";

export function LoginErrorHandler() {
  const searchParams = useSearchParams();
  const { toast } = useToast();

  useEffect(() => {
    const error = searchParams.get("error");
    const message = searchParams.get("message");

    if (error) {
      toast({
        variant: "destructive",
        title: "Authentication Error",
        description: decodeURIComponent(error),
      });
    }

    if (message === "password-updated") {
      toast({
        variant: "success",
        title: "Password Updated",
        description:
          "Your password has been successfully updated. Please sign in with your new password.",
      });
    }
  }, [searchParams, toast]);

  return null;
}
