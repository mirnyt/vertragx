import { SignOut } from "@/components/sign-out";
import { Calculator } from "@/components/calculator";
import { getI18n } from "@/locales/server";
import { getUser } from "@v1/supabase/queries";

export const metadata = {
  title: "Home",
};

export default async function Page() {
  const { data } = await getUser();
  const t = await getI18n();

  return (
    <div className="h-screen w-screen flex flex-col items-center justify-center">
      <div className="flex flex-col items-center justify-center gap-8">
        <p>{t("welcome", { name: data?.user?.email })}</p>

        <Calculator />

        <SignOut />
      </div>
    </div>
  );
}
