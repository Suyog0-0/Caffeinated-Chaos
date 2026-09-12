"use client";

import { type FormEvent, useState } from "react";
import { useRouter } from "next/navigation";
import { ArrowRight, LockKeyhole, LoaderCircle } from "lucide-react";
import { createClient } from "@/supabase/client";

export function LoginForm({ configured }: { configured: boolean }) {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string>();
  const [pending, setPending] = useState(false);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!configured) return;

    setPending(true);
    setError(undefined);
    const supabase = createClient();
    const { data, error: signInError } = await supabase.auth.signInWithPassword({
      email: email.trim(),
      password,
    });

    if (signInError || !data.user) {
      setError("The email or password is incorrect.");
      setPending(false);
      return;
    }

    const { data: admin } = await supabase
      .from("admin")
      .select("role")
      .eq("auth_user_id", data.user.id)
      .in("role", ["admin", "super_admin"])
      .maybeSingle();

    if (!admin) {
      await supabase.auth.signOut();
      setError("This account does not have admin access.");
      setPending(false);
      return;
    }

    router.replace("/admin");
    router.refresh();
  }

  return (
    <form className="admin-login-form" onSubmit={handleSubmit}>
      <label htmlFor="email">Email address</label>
      <input
        autoComplete="email"
        id="email"
        name="email"
        onChange={(event) => setEmail(event.target.value)}
        placeholder="admin@islingtoncollege.edu.np"
        required
        type="email"
        value={email}
      />

      <label htmlFor="password">Password</label>
      <input
        autoComplete="current-password"
        id="password"
        name="password"
        onChange={(event) => setPassword(event.target.value)}
        placeholder="Enter your password"
        required
        type="password"
        value={password}
      />

      {(error || !configured) && (
        <p className="admin-form-error" role="alert">
          {error ?? "Supabase environment variables are not configured."}
        </p>
      )}

      <button disabled={pending || !configured} type="submit">
        {pending ? <LoaderCircle className="admin-spin" size={17} /> : <LockKeyhole size={17} />}
        {pending ? "Signing in…" : "Sign in to workspace"}
        {!pending && <ArrowRight size={17} />}
      </button>
    </form>
  );
}
