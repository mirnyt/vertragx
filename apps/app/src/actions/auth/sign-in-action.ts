"use server";

import { actionClientWithMeta } from "../safe-action";
import { signInSchema } from "./schema";
import { createClient } from "@v1/supabase/server";
import { redirect } from "next/navigation";
import { mapSupabaseError } from "@/lib/auth-errors";

export const signInAction = actionClientWithMeta
  .schema(signInSchema)
  .metadata({
    name: "sign-in",
    track: {
      event: "user_signed_in",
      channel: "auth"
    }
  })
  .action(async ({ parsedInput: { email, password } }) => {
    const supabase = createClient();

    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      const authError = mapSupabaseError(error.message);
      throw new Error(authError.message);
    }

    redirect("/");
  });