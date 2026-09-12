"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { z } from "zod";
import { getAdminContext } from "@/app/admin/admin-auth";

export type ResearchAreaFormState = { error?: string } | undefined;

const postgresUuidSchema = z.string().regex(
  /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i,
);

const researchAreaSchema = z.object({
  name: z.string().trim().min(1, "Enter the research area name."),
  slug: z.string().trim().min(1, "Enter a URL slug.").regex(
    /^[a-z0-9]+(?:-[a-z0-9]+)*$/,
    "Use lowercase letters, numbers, and single hyphens for the slug.",
  ),
  description: z.string().trim(),
  publish_status: z.enum(["draft", "preview", "published"]),
});

function parseResearchArea(formData: FormData) {
  return researchAreaSchema.safeParse({
    name: formData.get("name"),
    slug: formData.get("slug"),
    description: formData.get("description"),
    publish_status: formData.get("publish_status"),
  });
}

function researchAreaSaveError(error: { code?: string }) {
  if (error.code === "42501") {
    return "Your account does not have permission to save research areas. Check the research_area RLS policies.";
  }
  if (error.code === "23505") return "That slug is already used by another research area.";
  if (error.code === "23502") return "A required database field is missing. Complete the required details and try again.";
  if (error.code === "23503") return "This change conflicts with a linked project. Review the linked records and try again.";
  return "The research area could not be saved. Check your connection and try again.";
}

export async function createResearchAreaAction(
  _state: ResearchAreaFormState,
  formData: FormData,
): Promise<ResearchAreaFormState> {
  const context = await getAdminContext();
  if (!context) return { error: "Your admin session expired. Sign in again." };

  const parsed = parseResearchArea(formData);
  if (!parsed.success) return { error: parsed.error.issues[0].message };

  const { error } = await context.supabase.from("research_area").insert({
    name: parsed.data.name,
    slug: parsed.data.slug,
    description: parsed.data.description || null,
    is_active: formData.get("is_active") === "on",
    publish_status: parsed.data.publish_status,
    is_demo_data: formData.get("is_demo_data") === "on",
  });

  if (error) {
    console.error("Research area create failed:", error.message);
    return { error: researchAreaSaveError(error) };
  }

  revalidatePath("/admin");
  revalidatePath("/admin/research-areas");
  revalidatePath("/research-areas");
  revalidatePath("/projects");
  redirect("/admin/research-areas?notice=created");
}

export async function updateResearchAreaAction(
  researchAreaId: string,
  _state: ResearchAreaFormState,
  formData: FormData,
): Promise<ResearchAreaFormState> {
  const id = postgresUuidSchema.safeParse(researchAreaId);
  if (!id.success) return { error: "This research area ID is invalid." };

  const context = await getAdminContext();
  if (!context) return { error: "Your admin session expired. Sign in again." };

  const parsed = parseResearchArea(formData);
  if (!parsed.success) return { error: parsed.error.issues[0].message };

  const { data: updated, error } = await context.supabase
    .from("research_area")
    .update({
      name: parsed.data.name,
      slug: parsed.data.slug,
      description: parsed.data.description || null,
      is_active: formData.get("is_active") === "on",
      publish_status: parsed.data.publish_status,
      is_demo_data: formData.get("is_demo_data") === "on",
    })
    .eq("id", id.data)
    .select("id")
    .maybeSingle();

  if (error || !updated) {
    if (error) console.error("Research area update failed:", error.message);
    return {
      error: error
        ? researchAreaSaveError(error)
        : "No research area was updated. It may have been removed or your account may not have permission to edit it.",
    };
  }

  revalidatePath("/admin");
  revalidatePath("/admin/research-areas");
  revalidatePath("/research-areas");
  revalidatePath("/projects");
  redirect("/admin/research-areas?notice=updated");
}

export async function deleteResearchAreaAction(researchAreaId: string) {
  const id = postgresUuidSchema.safeParse(researchAreaId);
  if (!id.success) redirect("/admin/research-areas?error=invalid-id");

  const context = await getAdminContext();
  if (!context) redirect("/admin/login");

  const { data: deleted, error } = await context.supabase
    .from("research_area")
    .delete()
    .eq("id", id.data)
    .select("id")
    .maybeSingle();

  if (error || !deleted) {
    if (error) console.error("Research area delete failed:", error.message);
    redirect("/admin/research-areas?error=delete-failed");
  }

  revalidatePath("/admin");
  revalidatePath("/admin/research-areas");
  revalidatePath("/research-areas");
  revalidatePath("/projects");
  redirect("/admin/research-areas?notice=deleted");
}
