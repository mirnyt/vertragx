"use server";

import { actionClient } from "../safe-action";
import { signInSchema } from "./schema";
import { createClient } from "@v1/supabase/server";
import { redirect } from "next/navigation";

export const signInAction = actionClient
  .schema(signInSchema)
  .action(async ({ parsedInput: { email, password } }) => {
    const supabase = createClient();

    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      throw new Error("Invalid email or password");
    }

    redirect("/");
  });