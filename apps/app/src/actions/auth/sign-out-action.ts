"use server";

import { createClient } from "@v1/supabase/server";
import { redirect } from "next/navigation";

export async function signOutAction() {
  const supabase = createClient();
  
  const { error } = await supabase.auth.signOut();
  
  if (error) {
    throw new Error(error.message);
  }
  
  redirect("/login");
}