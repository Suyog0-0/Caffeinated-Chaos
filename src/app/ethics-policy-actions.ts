"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { z } from "zod";
import { getAdminContext } from "@/app/admin/admin-auth";

export type EthicsPolicyFormState = { error?: string } | undefined;

const uuidSchema = z.string().regex(
  /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i,
);
const optionalFileUrl = z.union([
  z.literal(""),
  z.url("Enter a valid file URL.").refine(
    (url) => url.startsWith("https://") || url.startsWith("http://"),
    "File URL must start with http:// or https://.",
  ),
]);
const policySchema = z.object({
  title: z.string().trim().min(1, "Enter the policy title."),
  category: z.string().trim(),
  content: z.string().trim(),
  file_url: optionalFileUrl,
  publish_status: z.enum(["draft", "preview", "published"]),
});

function field(formData: FormData, name: string) {
  return String(formData.get(name) ?? "");
}

function parsePolicy(formData: FormData) {
  return policySchema.safeParse({
    title: field(formData, "title"),
    category: field(formData, "category"),
    content: field(formData, "content"),
    file_url: field(formData, "file_url"),
    publish_status: field(formData, "publish_status"),
  });
}

function values(policy: z.infer<typeof policySchema>) {
  return {
    title: policy.title,
    category: policy.category || null,
    content: policy.content || null,
    file_url: policy.file_url || null,
    publish_status: policy.publish_status,
  };
}

function saveError(code?: string) {
  if (code === "PGRST205" || code === "42P01") return "Ethics policy management is not available in the connected database.";
  if (code === "42501") return "Your account does not have permission to save ethics policies. Check the ethics_policy RLS policies.";
  if (code === "23502") return "A required database field is missing. Complete the required details and try again.";
  return "The ethics policy could not be saved. Check your connection and try again.";
}

export async function createEthicsPolicyAction(
  _state: EthicsPolicyFormState,
  formData: FormData,
): Promise<EthicsPolicyFormState> {
  const context = await getAdminContext();
  if (!context) return { error: "Your admin session expired. Sign in again." };

  const parsed = parsePolicy(formData);
  if (!parsed.success) return { error: parsed.error.issues[0].message };

  const { data, error } = await context.supabase
    .from("ethics_policy")
    .insert(values(parsed.data))
    .select("id")
    .maybeSingle();
  if (error || !data) {
    if (error) console.error("Ethics policy create failed:", error.message);
    return { error: error ? saveError(error.code) : saveError() };
  }

  revalidatePath("/admin");
  revalidatePath("/admin/ethics-policies");
  revalidatePath("/ethics");
  redirect("/admin/ethics-policies?notice=created");
}

export async function updateEthicsPolicyAction(
  policyId: string,
  _state: EthicsPolicyFormState,
  formData: FormData,
): Promise<EthicsPolicyFormState> {
  const id = uuidSchema.safeParse(policyId);
  if (!id.success) return { error: "This ethics policy ID is invalid." };

  const context = await getAdminContext();
  if (!context) return { error: "Your admin session expired. Sign in again." };

  const parsed = parsePolicy(formData);
  if (!parsed.success) return { error: parsed.error.issues[0].message };

  const { data, error } = await context.supabase
    .from("ethics_policy")
    .update(values(parsed.data))
    .eq("id", id.data)
    .select("id")
    .maybeSingle();
  if (error || !data) {
    if (error) console.error("Ethics policy update failed:", error.message);
    return { error: error ? saveError(error.code) : "No ethics policy was updated. It may have been removed or blocked by RLS." };
  }

  revalidatePath("/admin");
  revalidatePath("/admin/ethics-policies");
  revalidatePath("/ethics");
  redirect("/admin/ethics-policies?notice=updated");
}

export async function deleteEthicsPolicyAction(policyId: string) {
  const id = uuidSchema.safeParse(policyId);
  if (!id.success) redirect("/admin/ethics-policies?error=invalid-id");

  const context = await getAdminContext();
  if (!context) redirect("/admin/login");

  const { data, error } = await context.supabase
    .from("ethics_policy")
    .delete()
    .eq("id", id.data)
    .select("id")
    .maybeSingle();
  if (error || !data) {
    if (error) console.error("Ethics policy delete failed:", error.message);
    redirect("/admin/ethics-policies?error=delete-failed");
  }

  revalidatePath("/admin");
  revalidatePath("/admin/ethics-policies");
  revalidatePath("/ethics");
  redirect("/admin/ethics-policies?notice=deleted");
}
