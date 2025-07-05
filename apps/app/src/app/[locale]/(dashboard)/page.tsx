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
    <div className="p-4 md:p-6 space-y-6">
      <div className="max-w-4xl mx-auto">
        <div className="space-y-8">
          <div className="text-center space-y-4">
            <h1 className="text-2xl md:text-3xl font-bold">Dashboard</h1>
            <p className="text-muted-foreground">{t("welcome", { name: data?.user?.email })}</p>
          </div>

          <div className="flex flex-col items-center gap-8">
            <Calculator />
            <SignOut />
          </div>
        </div>
      </div>
    </div>
  );
}
