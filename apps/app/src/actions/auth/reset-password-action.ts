"use server";

import { actionClientWithMeta } from "../safe-action";
import { resetPasswordSchema } from "./schema";
import { createClient } from "@v1/supabase/server";
import { redirect } from "next/navigation";
import { mapSupabaseError } from "@/lib/auth-errors";

export const resetPasswordAction = actionClientWithMeta
  .schema(resetPasswordSchema)
  .metadata({
    name: "reset-password",
    track: {
      event: "password_reset_completed",
      channel: "auth",
    },
  })
  .action(async ({ parsedInput: { password } }) => {
    const supabase = createClient();

    const { error } = await supabase.auth.updateUser({
      password,
    });

    if (error) {
      const authError = mapSupabaseError(error.message);
      throw new Error(authError.message);
    }

    redirect("/login?message=password-updated");
  });
