import { updateSession } from "@v1/supabase/middleware";
import { createI18nMiddleware } from "next-international/middleware";
import { type NextRequest, NextResponse } from "next/server";

const I18nMiddleware = createI18nMiddleware({
  locales: ["en", "fr"],
  defaultLocale: "en",
  urlMappingStrategy: "rewrite",
});

export async function middleware(request: NextRequest) {
  const { response, user } = await updateSession(
    request,
    I18nMiddleware(request),
  );

  const isAuthRoute =
    request.nextUrl.pathname.endsWith("/login") ||
    request.nextUrl.pathname.endsWith("/signup") ||
    request.nextUrl.pathname.endsWith("/forgot-password") ||
    request.nextUrl.pathname.endsWith("/reset-password") ||
    request.nextUrl.pathname.endsWith("/") ||
    request.nextUrl.pathname.endsWith("/search-results") ||
    request.nextUrl.pathname.endsWith("/search") ||
    request.nextUrl.pathname.endsWith("/changelog")
    

  if (!isAuthRoute && !user) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  return response;
}

export const config = {
  matcher: [
    "/((?!_next/static|api|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
  ],
};
