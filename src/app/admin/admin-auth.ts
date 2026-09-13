import "server-only";

import { cache } from "react";
import { redirect } from "next/navigation";
import {
  createAuthenticatedServerClient,
  isSupabaseConfigured,
} from "@/supabase/server";

async function verifyAdmin() {
  if (!isSupabaseConfigured()) return null;

  const supabase = await createAuthenticatedServerClient();
  const { data } = await supabase.auth.getClaims();
  const userId = data?.claims.sub;
  if (!userId) return null;

  const { data: admin } = await supabase
    .from("admin")
    .select("id, name, email, role")
    .eq("auth_user_id", userId)
    .in("role", ["admin", "super_admin"])
    .maybeSingle();

  return admin ? { supabase, admin } : null;
}

export const getAdminContext = cache(verifyAdmin);

export async function requireAdmin() {
  const context = await getAdminContext();
  if (!context) redirect("/admin/login");
  return context;
}

export async function requireSuperAdmin() {
  const context = await requireAdmin();
  if (context.admin.role !== "super_admin") redirect("/admin");
  return context;
}
