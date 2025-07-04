"use server";

import { actionClient } from "../safe-action";
import { resetPasswordSchema } from "./schema";
import { createClient } from "@v1/supabase/server";
import { redirect } from "next/navigation";

export const resetPasswordAction = actionClient
  .schema(resetPasswordSchema)
  .action(async ({ parsedInput: { password } }) => {
    const supabase = createClient();

    const { error } = await supabase.auth.updateUser({
      password,
    });

    if (error) {
      throw new Error(error.message);
    }

    redirect("/login?message=password-updated");
  });