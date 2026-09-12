"use client";

import { type FormEvent, useState } from "react";
import { useRouter } from "next/navigation";
import { ArrowRight, LockKeyhole, LoaderCircle } from "lucide-react";
import { createClient } from "@/supabase/client";
import { adminTw } from "@/components/admin/admin-tailwind";

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
    <form className="mt-9 grid [&_label]:mb-[7px] [&_label]:text-[13px] [&_label]:font-bold [&_label]:text-[#33473e] [&_input]:mb-[18px] [&_input]:min-h-[50px] [&_input]:border [&_input]:border-[#c7cac3] [&_input]:bg-white [&_input]:px-[13px] [&_input]:text-sm [&_input]:text-[#17251f] [&_input]:outline-none [&_input:focus]:border-[#153c2e] [&_input:focus]:shadow-[0_0_0_2px_rgba(21,60,46,.12)] [&_button]:mt-1 [&_button]:grid [&_button]:min-h-[52px] [&_button]:cursor-pointer [&_button]:grid-cols-[18px_1fr_18px] [&_button]:items-center [&_button]:gap-2.5 [&_button]:border-0 [&_button]:bg-[#153c2e] [&_button]:px-4 [&_button]:text-[13px] [&_button]:font-bold [&_button]:text-white [&_button:disabled]:cursor-not-allowed [&_button:disabled]:opacity-55" onSubmit={handleSubmit}>
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
        <p className="-mt-1 mb-3.5 text-[13px] text-[#9d3028]" role="alert">
          {error ?? "Supabase environment variables are not configured."}
        </p>
      )}

      <button disabled={pending || !configured} type="submit">
        {pending ? <LoaderCircle className={adminTw.spin} size={17} /> : <LockKeyhole size={17} />}
        {pending ? "Signing in…" : "Sign in to workspace"}
        {!pending && <ArrowRight size={17} />}
      </button>
    </form>
  );
}
