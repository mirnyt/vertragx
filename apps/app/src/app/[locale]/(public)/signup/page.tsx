import { AuthForm } from "@/components/auth-form";
import Image from "next/image";

export const metadata = {
  title: "Sign Up",
  description: "Create a new VertragX account",
};

export default function SignUpPage() {
  return (
    <div className="min-h-screen w-full flex flex-col items-center justify-center p-4">
      <div className="w-full max-w-md space-y-8">
        <div className="flex flex-col items-center">
          <Image src="/logo.png" alt="VertragX" width={200} height={200} className="mb-8" />
        </div>
        <AuthForm mode="signup" />
      </div>
    </div>
  );
}