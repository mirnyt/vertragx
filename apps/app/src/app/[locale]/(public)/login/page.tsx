import { AuthForm } from "@/components/auth-form";
import { LoginErrorHandler } from "@/components/login-error-handler";
import Image from "next/image";

export const metadata = {
  title: "Login",
  description: "Sign in to your VertragX account",
};

export default function LoginPage() {
  return (
    <div className="min-h-screen w-full flex flex-col items-center justify-center py-4 sm:py-6 md:py-8">
      <div className="w-full max-w-md space-y-4 sm:space-y-6 md:space-y-8">
        <div className="flex flex-col items-center">
          <Image
            src="/logo.png"
            alt="VertragX"
            width={200}
            height={200}
            className="mb-2 sm:mb-3 md:mb-4"
          />
        </div>
        <AuthForm mode="signin" />
        <LoginErrorHandler />
      </div>
    </div>
  );
}
