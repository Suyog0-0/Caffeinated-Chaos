import { redirect } from "next/navigation";
import Image from "next/image";
import { LoginForm } from "@/components/admin/login-form";
import {
  createAuthenticatedServerClient,
  isSupabaseConfigured,
} from "@/supabase/server";

export default async function AdminLoginPage() {
  const configured = isSupabaseConfigured();

  if (configured) {
    const supabase = await createAuthenticatedServerClient();
    const { data } = await supabase.auth.getClaims();
    const userId = data?.claims.sub;
    if (userId) {
      const { data: admin } = await supabase
        .from("admin")
        .select("id")
        .eq("auth_user_id", userId)
        .maybeSingle();
      if (admin) redirect("/admin");
    }
  }

  return (
    <div className="grid min-h-screen grid-cols-[minmax(440px,.85fr)_1.15fr] bg-[#fffefb] max-[980px]:grid-cols-2 max-[720px]:block">
      <section className="m-auto w-[min(calc(100%_-_72px),460px)] py-[60px] [&>h1]:m-0 [&>h1]:font-sans [&>h1]:text-[58px] [&>h1]:font-normal [&>h1]:leading-[.95] [&>h1]:tracking-[-.04em] [&>p:not(:first-of-type)]:mt-[18px] [&>p:not(:first-of-type)]:max-w-[380px] [&>p:not(:first-of-type)]:text-[15px] [&>p:not(:first-of-type)]:leading-[1.55] [&>p:not(:first-of-type)]:text-[#5d6a64] [&>small]:mt-5 [&>small]:block [&>small]:text-center [&>small]:text-xs [&>small]:text-[#7b8580] max-[720px]:w-[min(calc(100%_-_40px),460px)] max-[720px]:py-[34px] max-[720px]:pb-[50px] max-[720px]:[&>h1]:text-[50px]">
        <div className="grid min-h-[88px] w-[220px] place-items-center bg-[#0b1b33] px-[15px] py-1.5 [&_img]:h-auto [&_img]:w-[190px]">
          <Image
            alt="IJMR — Journal of Multidisciplinary Research"
            height={75}
            priority
            src="/ijmr-logo-white.svg"
            width={190}
          />
        </div>
        <p className="!mb-3 !mt-[68px] !text-[10px] !font-bold !text-[#496057] max-[720px]:!mt-[52px]">Staff access</p>
        <h1>Welcome back.</h1>
        <p>Sign in with your R&amp;D staff account to manage the research hub.</p>
        <LoginForm configured={configured} />
        <small>Access is limited to approved administrators.</small>
      </section>
      <aside className="flex items-end overflow-hidden bg-[#0b1b33] p-[70px] text-white max-[980px]:p-11 max-[720px]:hidden" aria-hidden="true">
        <div className="max-w-[570px] border-t border-[#516079] pt-[26px]">
          <span className="text-[11px] font-bold text-[#e1c451]">Research &amp; Development</span>
          <p className="mt-4 font-sans text-[clamp(42px,5vw,70px)] leading-[.98] tracking-[-.035em]">One workspace for a connected research ecosystem.</p>
        </div>
      </aside>
    </div>
  );
}
