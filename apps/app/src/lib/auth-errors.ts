// Authentication error types and messages
export enum AuthErrorCode {
  INVALID_CREDENTIALS = "invalid_credentials",
  USER_NOT_FOUND = "user_not_found",
  EMAIL_ALREADY_EXISTS = "email_already_exists",
  WEAK_PASSWORD = "weak_password",
  EMAIL_NOT_CONFIRMED = "email_not_confirmed",
  TOO_MANY_REQUESTS = "too_many_requests",
  NETWORK_ERROR = "network_error",
  UNKNOWN_ERROR = "unknown_error",
}

export interface AuthError {
  code: AuthErrorCode;
  message: string;
  originalError?: string;
}

// Map Supabase error messages to our custom error types
export function mapSupabaseError(error: string): AuthError {
  const errorLower = error.toLowerCase();

  if (
    errorLower.includes("invalid login credentials") ||
    errorLower.includes("invalid email or password")
  ) {
    return {
      code: AuthErrorCode.INVALID_CREDENTIALS,
      message:
        "Invalid email or password. Please check your credentials and try again.",
      originalError: error,
    };
  }

  if (errorLower.includes("user not found")) {
    return {
      code: AuthErrorCode.USER_NOT_FOUND,
      message: "No account found with this email address.",
      originalError: error,
    };
  }

  if (
    errorLower.includes("already registered") ||
    errorLower.includes("already exists")
  ) {
    return {
      code: AuthErrorCode.EMAIL_ALREADY_EXISTS,
      message:
        "An account with this email address already exists. Please sign in instead.",
      originalError: error,
    };
  }

  if (errorLower.includes("password") && errorLower.includes("weak")) {
    return {
      code: AuthErrorCode.WEAK_PASSWORD,
      message:
        "Password is too weak. Please choose a stronger password with at least 8 characters.",
      originalError: error,
    };
  }

  if (
    errorLower.includes("email not confirmed") ||
    errorLower.includes("not verified")
  ) {
    return {
      code: AuthErrorCode.EMAIL_NOT_CONFIRMED,
      message:
        "Please verify your email address before signing in. Check your inbox for a confirmation link.",
      originalError: error,
    };
  }

  if (
    errorLower.includes("too many requests") ||
    errorLower.includes("rate limit")
  ) {
    return {
      code: AuthErrorCode.TOO_MANY_REQUESTS,
      message:
        "Too many login attempts. Please wait a few minutes before trying again.",
      originalError: error,
    };
  }

  if (errorLower.includes("network") || errorLower.includes("fetch")) {
    return {
      code: AuthErrorCode.NETWORK_ERROR,
      message: "Network error. Please check your connection and try again.",
      originalError: error,
    };
  }

  return {
    code: AuthErrorCode.UNKNOWN_ERROR,
    message: "An unexpected error occurred. Please try again.",
    originalError: error,
  };
}

// Get user-friendly error message
export function getErrorMessage(error: unknown): string {
  if (typeof error === "string") {
    return mapSupabaseError(error).message;
  }

  if (error instanceof Error) {
    return mapSupabaseError(error.message).message;
  }

  return mapSupabaseError("Unknown error").message;
}
