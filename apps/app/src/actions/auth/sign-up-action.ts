"use server";

import { actionClientWithMeta } from "../safe-action";
import { signUpSchema } from "./schema";
import { createClient } from "@v1/supabase/server";
import { headers } from "next/headers";
import { mapSupabaseError } from "@/lib/auth-errors";

export const signUpAction = actionClientWithMeta
  .schema(signUpSchema)
  .metadata({
    name: "sign-up",
    track: {
      event: "user_signed_up",
      channel: "auth",
    },
  })
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
      const authError = mapSupabaseError(error.message);
      throw new Error(authError.message);
    }

    if (
      data.user &&
      data.user.identities &&
      data.user.identities.length === 0
    ) {
      const authError = mapSupabaseError("Email already registered");
      throw new Error(authError.message);
    }

    return {
      success: true,
      message:
        "Account created successfully! Please check your email to verify your account.",
    };
  });
