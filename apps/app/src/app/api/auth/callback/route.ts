import { createClient } from "@v1/supabase/server";
import { NextResponse } from "next/server";
import { mapSupabaseError } from "@/lib/auth-errors";

export async function GET(request: Request) {
  const { searchParams, origin } = new URL(request.url);
  const code = searchParams.get("code");
  const next = searchParams.get("next") ?? "/";
  const error_description = searchParams.get("error_description");
  const error_code = searchParams.get("error");

  // Handle explicit error from OAuth provider
  if (error_code) {
    const errorMessage = error_description || "Authentication failed";
    const authError = mapSupabaseError(errorMessage);
    return NextResponse.redirect(
      `${origin}/login?error=${encodeURIComponent(authError.message)}`,
    );
  }

  // Handle code exchange
  if (code) {
    const supabase = createClient();

    try {
      const { error } = await supabase.auth.exchangeCodeForSession(code);

      if (!error) {
        // Success - redirect to intended destination
        const forwardedHost = request.headers.get("x-forwarded-host");
        const isLocalEnv = process.env.NODE_ENV === "development";

        if (isLocalEnv) {
          return NextResponse.redirect(`${origin}${next}`);
        }
        if (forwardedHost) {
          return NextResponse.redirect(`https://${forwardedHost}${next}`);
        }
        return NextResponse.redirect(`${origin}${next}`);
      } else {
        // Handle exchange error
        const authError = mapSupabaseError(error.message);
        return NextResponse.redirect(
          `${origin}/login?error=${encodeURIComponent(authError.message)}`,
        );
      }
    } catch (err) {
      // Handle unexpected errors
      console.error("Auth callback error:", err);
      return NextResponse.redirect(
        `${origin}/login?error=${encodeURIComponent("An unexpected error occurred during authentication")}`,
      );
    }
  }

  // Missing code parameter
  return NextResponse.redirect(
    `${origin}/login?error=${encodeURIComponent("Invalid authentication request")}`,
  );
}
