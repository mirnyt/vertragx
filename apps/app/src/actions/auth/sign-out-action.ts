"use server";

import { actionClientWithMeta } from "../safe-action";
import { createClient } from "@v1/supabase/server";
import { redirect } from "next/navigation";
import { z } from "zod";

export const signOutAction = actionClientWithMeta
  .schema(z.object({})) // No input required
  .metadata({
    name: "sign-out",
    track: {
      event: "user_signed_out",
      channel: "auth",
    },
  })
  .action(async () => {
    const supabase = createClient();

    const { error } = await supabase.auth.signOut();

    if (error) {
      throw new Error("Failed to sign out. Please try again.");
    }

    redirect("/login");
  });
