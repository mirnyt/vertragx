"use server";

import { actionClientWithMeta } from "../safe-action";
import { forgotPasswordSchema } from "./schema";
import { createClient } from "@v1/supabase/server";
import { headers } from "next/headers";
import { mapSupabaseError } from "@/lib/auth-errors";

export const forgotPasswordAction = actionClientWithMeta
  .schema(forgotPasswordSchema)
  .metadata({
    name: "forgot-password",
    track: {
      event: "password_reset_requested",
      channel: "auth"
    }
  })
  .action(async ({ parsedInput: { email } }) => {
    const supabase = createClient();
    const origin = headers().get("origin");

    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: `${origin}/reset-password`,
    });

    if (error) {
      const authError = mapSupabaseError(error.message);
      throw new Error(authError.message);
    }

    return {
      success: true,
      message: "Password reset email sent! Check your inbox for the reset link.",
    };
  });