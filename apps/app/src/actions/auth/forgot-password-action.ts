"use server";

import { actionClient } from "../safe-action";
import { forgotPasswordSchema } from "./schema";
import { createClient } from "@v1/supabase/server";
import { headers } from "next/headers";

export const forgotPasswordAction = actionClient
  .schema(forgotPasswordSchema)
  .action(async ({ parsedInput: { email } }) => {
    const supabase = createClient();
    const origin = headers().get("origin");

    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: `${origin}/reset-password`,
    });

    if (error) {
      throw new Error(error.message);
    }

    return {
      success: true,
      message: "Password reset email sent! Check your inbox for the reset link.",
    };
  });