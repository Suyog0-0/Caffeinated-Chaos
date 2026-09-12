"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { z } from "zod";
import { getAdminContext } from "@/app/admin/admin-auth";

export type PublicationFormState = { error?: string } | undefined;

const postgresUuidSchema = z.string().regex(
  /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i,
  "Invalid UUID.",
);

const optionalUuidSchema = z.union([z.literal(""), postgresUuidSchema]);
const publicationSchema = z.object({
  title: z.string().trim().min(1, "Enter the publication title."),
  publication_type: z.string().trim(),
  year: z.union([
    z.literal(""),
    z.string().regex(/^\d{4}$/, "Enter a four-digit year.").refine(
      (value) => Number(value) >= 1800 && Number(value) <= 2200,
      "Enter a year between 1800 and 2200.",
    ),
  ]),
  date_of_issue: z.union([
    z.literal(""),
    z.string().regex(/^\d{4}-\d{2}-\d{2}$/, "Enter a valid issue date."),
  ]),
  summary: z.string().trim(),
  venue: z.string().trim(),
  doi: z.string().trim(),
  external_url: z.union([
    z.literal(""),
    z.url("Enter a valid external URL.").refine(
      (value) => value.startsWith("https://") || value.startsWith("http://"),
      "External URL must start with http:// or https://.",
    ),
  ]),
  research_area_id: optionalUuidSchema,
  project_id: optionalUuidSchema,
  publish_status: z.enum(["draft", "preview", "published"]),
});

function parsePublication(formData: FormData) {
  return publicationSchema.safeParse({
    title: formData.get("title"),
    publication_type: formData.get("publication_type"),
    year: formData.get("year"),
    date_of_issue: formData.get("date_of_issue"),
    summary: formData.get("summary"),
    venue: formData.get("venue"),
    doi: formData.get("doi"),
    external_url: formData.get("external_url"),
    research_area_id: formData.get("research_area_id"),
    project_id: formData.get("project_id"),
    publish_status: formData.get("publish_status"),
  });
}

function nullable(value: string) {
  return value || null;
}

function publicationPayload(formData: FormData, values: z.infer<typeof publicationSchema>) {
  return {
    title: values.title,
    publication_type: nullable(values.publication_type),
    year: values.year ? Number(values.year) : null,
    date_of_issue: nullable(values.date_of_issue),
    summary: nullable(values.summary),
    venue: nullable(values.venue),
    doi: nullable(values.doi),
    external_url: nullable(values.external_url),
    research_area_id: nullable(values.research_area_id),
    project_id: nullable(values.project_id),
    publish_status: values.publish_status,
    is_ijmr: formData.get("is_ijmr") === "on",
    is_demo_data: formData.get("is_demo_data") === "on",
  };
}

function publicationSaveError(error: { code?: string }) {
  if (error.code === "42501") {
    return "Your account does not have permission to save publications. Check the publication RLS policies.";
  }
  if (error.code === "23505") {
    return "A publication with the same unique details already exists. Check the DOI and title.";
  }
  if (error.code === "23503") {
    return "The selected project or research area no longer exists. Refresh the page and try again.";
  }
  if (error.code === "23502") {
    return "A required database field is missing. Complete the required details and try again.";
  }
  return "The publication could not be saved. Check your connection and try again.";
}

export async function createPublicationAction(
  _state: PublicationFormState,
  formData: FormData,
): Promise<PublicationFormState> {
  const context = await getAdminContext();
  if (!context) return { error: "Your admin session expired. Sign in again." };

  const parsed = parsePublication(formData);
  if (!parsed.success) return { error: parsed.error.issues[0].message };

  const { error } = await context.supabase
    .from("publication")
    .insert(publicationPayload(formData, parsed.data));

  if (error) {
    console.error("Publication create failed:", error.message);
    return { error: publicationSaveError(error) };
  }

  revalidatePath("/admin");
  revalidatePath("/admin/publications");
  revalidatePath("/publications");
  redirect("/admin/publications?notice=created");
}

export async function updatePublicationAction(
  publicationId: string,
  _state: PublicationFormState,
  formData: FormData,
): Promise<PublicationFormState> {
  const id = postgresUuidSchema.safeParse(publicationId);
  if (!id.success) return { error: "This publication ID is invalid." };

  const context = await getAdminContext();
  if (!context) return { error: "Your admin session expired. Sign in again." };

  const parsed = parsePublication(formData);
  if (!parsed.success) return { error: parsed.error.issues[0].message };

  const { data: updated, error } = await context.supabase
    .from("publication")
    .update(publicationPayload(formData, parsed.data))
    .eq("id", id.data)
    .select("id")
    .maybeSingle();

  if (error || !updated) {
    if (error) console.error("Publication update failed:", error.message);
    return {
      error: error
        ? publicationSaveError(error)
        : "No publication was updated. It may have been removed or your account may not have permission to edit it.",
    };
  }

  revalidatePath("/admin");
  revalidatePath("/admin/publications");
  revalidatePath("/publications");
  revalidatePath(`/publications/${id.data}`);
  redirect("/admin/publications?notice=updated");
}

export async function deletePublicationAction(publicationId: string) {
  const id = postgresUuidSchema.safeParse(publicationId);
  if (!id.success) redirect("/admin/publications?error=invalid-id");

  const context = await getAdminContext();
  if (!context) redirect("/admin/login");

  const { data: deleted, error } = await context.supabase
    .from("publication")
    .delete()
    .eq("id", id.data)
    .select("id")
    .maybeSingle();

  if (error || !deleted) {
    if (error) console.error("Publication delete failed:", error.message);
    redirect("/admin/publications?error=delete-failed");
  }

  revalidatePath("/admin");
  revalidatePath("/admin/publications");
  revalidatePath("/publications");
  redirect("/admin/publications?notice=deleted");
}
