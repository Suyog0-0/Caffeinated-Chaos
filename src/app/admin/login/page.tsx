import { redirect } from "next/navigation";
import Image from "next/image";
import { LoginForm } from "@/components/admin/login-form";
import {
  createAuthenticatedServerClient,
  isSupabaseConfigured,
} from "@/src/supabase/server";

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
    <div className="admin-login-page">
      <section className="admin-login-panel">
        <div className="admin-login-brand">
          <Image
            alt="IJMR — Journal of Multidisciplinary Research"
            height={75}
            priority
            src="/ijmr-logo-white.svg"
            width={190}
          />
        </div>
        <p className="admin-login-kicker">Staff access</p>
        <h1>Welcome back.</h1>
        <p>Sign in with your R&amp;D staff account to manage the research hub.</p>
        <LoginForm configured={configured} />
        <small>Access is limited to approved administrators.</small>
      </section>
      <aside className="admin-login-aside" aria-hidden="true">
        <div>
          <span>Research &amp; Development</span>
          <p>One workspace for a connected research ecosystem.</p>
        </div>
      </aside>
    </div>
  );
}
