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
  publication_type: z.union([z.literal(""), z.enum(["journal", "conference", "report"])]),
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

async function syncPublicationAuthors(supabase: Awaited<ReturnType<typeof import("@/app/admin/admin-auth").getAdminContext>> extends infer T ? T extends { supabase: infer S } ? S : never : never, publicationId: string, formData: FormData) {
  const authorIds = formData.getAll("author_ids").map(String).filter(Boolean);

  const { error: deleteError } = await supabase.from("publication_author").delete().eq("publication_id", publicationId);
  if (deleteError) {
    console.error("Publication authors clear failed:", deleteError.message);
    return "The publication was saved, but its authors could not be updated. Try editing the publication again.";
  }

  if (authorIds.length === 0) return null;

  const rows = authorIds.map((researcherId, index) => ({
    publication_id: publicationId,
    researcher_id: researcherId,
    author_order: index + 1,
  }));

  const { error: insertError } = await supabase.from("publication_author").insert(rows);
  if (insertError) {
    console.error("Publication authors save failed:", insertError.message);
    return "The publication was saved, but its authors could not be updated. Check that each researcher still exists.";
  }
  return null;
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
  if (error.code === "23514") {
    return "One of the values doesn't match the allowed options (e.g. publication type must be Journal, Conference, or Report). Fix it and try again.";
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
  if (!parsed.success) {
    const issue = parsed.error.issues[0];
    const field = issue.path.join(".") || "form";
    const raw = formData.get(String(issue.path[0]));
    return { error: `${field}: ${issue.message} (received: ${JSON.stringify(raw)})` };
  }

  const { data: inserted, error } = await context.supabase
    .from("publication")
    .insert(publicationPayload(formData, parsed.data))
    .select("id")
    .single();

  if (error || !inserted) {
    if (error) console.error("Publication create failed:", error.message);
    return { error: error ? publicationSaveError(error) : "The publication could not be saved. Check your connection and try again." };
  }

  const authorsError = await syncPublicationAuthors(context.supabase, inserted.id, formData);
  if (authorsError) return { error: authorsError };

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
  if (!parsed.success) {
    const issue = parsed.error.issues[0];
    const field = issue.path.join(".") || "form";
    const raw = formData.get(String(issue.path[0]));
    return { error: `${field}: ${issue.message} (received: ${JSON.stringify(raw)})` };
  }

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

  const authorsError = await syncPublicationAuthors(context.supabase, id.data, formData);
  if (authorsError) return { error: authorsError };

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
