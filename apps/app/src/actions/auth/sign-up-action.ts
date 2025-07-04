"use server";

import { actionClient } from "../safe-action";
import { signUpSchema } from "./schema";
import { createClient } from "@v1/supabase/server";
import { redirect } from "next/navigation";
import { headers } from "next/headers";

export const signUpAction = actionClient
  .schema(signUpSchema)
  .action(async ({ parsedInput: { email, password, fullName } }) => {
    const supabase = createClient();
    const origin = headers().get("origin");

    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          full_name: fullName,
        },
        emailRedirectTo: `${origin}/api/auth/callback`,
      },
    });

    if (error) {
      throw new Error(error.message);
    }

    if (data.user && data.user.identities && data.user.identities.length === 0) {
      throw new Error("Email already registered. Please sign in instead.");
    }

    return {
      success: true,
      message: "Account created successfully! Please check your email to verify your account.",
    };
  });