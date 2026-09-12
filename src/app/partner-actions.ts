"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { z } from "zod";
import { getAdminContext } from "@/app/admin/admin-auth";

export type PartnerFormState = { error?: string } | undefined;

const uuidSchema = z.string().regex(
  /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i,
);
const optionalUrl = z.union([
  z.literal(""),
  z.url("Enter a valid URL.").refine(
    (url) => url.startsWith("https://") || url.startsWith("http://"),
    "URL must start with http:// or https://.",
  ),
]);
const partnerSchema = z.object({
  name: z.string().trim().min(1, "Enter the partner name."),
  description: z.string().trim(),
  website: optionalUrl,
  logo_url: optionalUrl,
  partner_type: z.string().trim(),
  publish_status: z.enum(["draft", "preview", "published"]),
  is_demo_data: z.boolean(),
});

function field(formData: FormData, name: string) {
  return String(formData.get(name) ?? "");
}

function parsePartner(formData: FormData) {
  return partnerSchema.safeParse({
    name: field(formData, "name"),
    description: field(formData, "description"),
    website: field(formData, "website"),
    logo_url: field(formData, "logo_url"),
    partner_type: field(formData, "partner_type"),
    publish_status: field(formData, "publish_status"),
    is_demo_data: formData.get("is_demo_data") === "on",
  });
}

function values(partner: z.infer<typeof partnerSchema>) {
  return {
    name: partner.name,
    description: partner.description || null,
    website: partner.website || null,
    logo_url: partner.logo_url || null,
    partner_type: partner.partner_type || null,
    publish_status: partner.publish_status,
    is_demo_data: partner.is_demo_data,
  };
}

function saveError(code?: string) {
  if (code === "PGRST205" || code === "42P01") return "Partner management is not available in the connected database.";
  if (code === "42501") return "Your account does not have permission to save partners. Check the partner RLS policies.";
  if (code === "23502") return "A required database field is missing. Complete the required details and try again.";
  return "The partner could not be saved. Check your connection and try again.";
}

export async function createPartnerAction(
  _state: PartnerFormState,
  formData: FormData,
): Promise<PartnerFormState> {
  const context = await getAdminContext();
  if (!context) return { error: "Your admin session expired. Sign in again." };

  const parsed = parsePartner(formData);
  if (!parsed.success) return { error: parsed.error.issues[0].message };

  const { data, error } = await context.supabase
    .from("partner")
    .insert(values(parsed.data))
    .select("id")
    .maybeSingle();
  if (error || !data) {
    if (error) console.error("Partner create failed:", error.message);
    return { error: error ? saveError(error.code) : saveError() };
  }

  revalidatePath("/admin");
  revalidatePath("/admin/partners");
  revalidatePath("/partners");
  redirect("/admin/partners?notice=created");
}

export async function updatePartnerAction(
  partnerId: string,
  _state: PartnerFormState,
  formData: FormData,
): Promise<PartnerFormState> {
  const id = uuidSchema.safeParse(partnerId);
  if (!id.success) return { error: "This partner ID is invalid." };

  const context = await getAdminContext();
  if (!context) return { error: "Your admin session expired. Sign in again." };

  const parsed = parsePartner(formData);
  if (!parsed.success) return { error: parsed.error.issues[0].message };

  const { data, error } = await context.supabase
    .from("partner")
    .update(values(parsed.data))
    .eq("id", id.data)
    .select("id")
    .maybeSingle();
  if (error || !data) {
    if (error) console.error("Partner update failed:", error.message);
    return { error: error ? saveError(error.code) : "No partner was updated. It may have been removed or blocked by RLS." };
  }

  revalidatePath("/admin");
  revalidatePath("/admin/partners");
  revalidatePath("/partners");
  revalidatePath(`/partners/${id.data}`);
  redirect("/admin/partners?notice=updated");
}

export async function deletePartnerAction(partnerId: string) {
  const id = uuidSchema.safeParse(partnerId);
  if (!id.success) redirect("/admin/partners?error=invalid-id");

  const context = await getAdminContext();
  if (!context) redirect("/admin/login");

  const { data, error } = await context.supabase
    .from("partner")
    .delete()
    .eq("id", id.data)
    .select("id")
    .maybeSingle();
  if (error || !data) {
    if (error) console.error("Partner delete failed:", error.message);
    redirect("/admin/partners?error=delete-failed");
  }

  revalidatePath("/admin");
  revalidatePath("/admin/partners");
  revalidatePath("/partners");
  redirect("/admin/partners?notice=deleted");
}
