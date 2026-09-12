"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { z } from "zod";
import { getAdminContext } from "@/app/admin/admin-auth";

export type OpportunityFormState = { error?: string } | undefined;

const uuidSchema = z.string().regex(
  /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i,
);
const optionalId = z.union([z.literal(""), uuidSchema]);
const optionalUrl = z.union([
  z.literal(""),
  z.url("Enter a valid application URL.").refine(
    (url) => url.startsWith("https://") || url.startsWith("http://"),
    "Application URL must start with http:// or https://.",
  ),
]);

const opportunitySchema = z.object({
  title: z.string().trim().min(1, "Enter the opportunity title."),
  opportunity_type: z.string().trim(),
  description: z.string().trim(),
  deadline: z.string().trim(),
  application_url: optionalUrl,
  status: z.enum(["open", "closed"]),
  publish_status: z.enum(["draft", "preview", "published"]),
  research_area_id: optionalId,
  grant_id: optionalId,
  event_id: optionalId,
  project_id: optionalId,
});

function field(formData: FormData, name: string) {
  return String(formData.get(name) ?? "");
}

function nullable(value: string) {
  return value || null;
}

function parseOpportunity(formData: FormData) {
  return opportunitySchema.safeParse({
    title: field(formData, "title"),
    opportunity_type: field(formData, "opportunity_type"),
    description: field(formData, "description"),
    deadline: field(formData, "deadline"),
    application_url: field(formData, "application_url"),
    status: field(formData, "status"),
    publish_status: field(formData, "publish_status"),
    research_area_id: field(formData, "research_area_id"),
    grant_id: field(formData, "grant_id"),
    event_id: field(formData, "event_id"),
    project_id: field(formData, "project_id"),
  });
}

function opportunityValues(
  values: z.infer<typeof opportunitySchema>,
  formData: FormData,
) {
  return {
    title: values.title,
    opportunity_type: nullable(values.opportunity_type),
    description: nullable(values.description),
    deadline: nullable(values.deadline),
    application_url: nullable(values.application_url),
    status: values.status,
    publish_status: values.publish_status,
    is_demo_data: formData.get("is_demo_data") === "on",
    research_area_id: nullable(values.research_area_id),
    grant_id: nullable(values.grant_id),
    event_id: nullable(values.event_id),
    project_id: nullable(values.project_id),
    updated_at: new Date().toISOString(),
  };
}

function saveError(code?: string) {
  if (code === "PGRST205" || code === "42P01") {
    return "Opportunity management is not available in the connected database.";
  }
  if (code === "42501") {
    return "Your account does not have permission to save opportunities. Check the opportunity RLS policies.";
  }
  if (code === "23503") {
    return "One of the linked records no longer exists. Refresh the page and choose it again.";
  }
  if (code === "23502") {
    return "A required database field is missing. Complete the required details and try again.";
  }
  return "The opportunity could not be saved. Check your connection and try again.";
}

export async function createOpportunityAction(
  _state: OpportunityFormState,
  formData: FormData,
): Promise<OpportunityFormState> {
  const context = await getAdminContext();
  if (!context) return { error: "Your admin session expired. Sign in again." };

  const parsed = parseOpportunity(formData);
  if (!parsed.success) return { error: parsed.error.issues[0].message };

  const { data, error } = await context.supabase
    .from("opportunity")
    .insert(opportunityValues(parsed.data, formData))
    .select("id")
    .maybeSingle();
  if (error || !data) {
    if (error) console.error("Opportunity create failed:", error.message);
    return { error: error ? saveError(error.code) : saveError() };
  }

  revalidatePath("/admin");
  revalidatePath("/admin/opportunities");
  revalidatePath("/opportunities");
  redirect("/admin/opportunities?notice=created");
}

export async function updateOpportunityAction(
  opportunityId: string,
  _state: OpportunityFormState,
  formData: FormData,
): Promise<OpportunityFormState> {
  const id = uuidSchema.safeParse(opportunityId);
  if (!id.success) return { error: "This opportunity ID is invalid." };

  const context = await getAdminContext();
  if (!context) return { error: "Your admin session expired. Sign in again." };

  const parsed = parseOpportunity(formData);
  if (!parsed.success) return { error: parsed.error.issues[0].message };

  const { data, error } = await context.supabase
    .from("opportunity")
    .update(opportunityValues(parsed.data, formData))
    .eq("id", id.data)
    .select("id")
    .maybeSingle();
  if (error || !data) {
    if (error) console.error("Opportunity update failed:", error.message);
    return {
      error: error
        ? saveError(error.code)
        : "No opportunity was updated. It may have been removed or blocked by RLS.",
    };
  }

  revalidatePath("/admin");
  revalidatePath("/admin/opportunities");
  revalidatePath("/opportunities");
  redirect("/admin/opportunities?notice=updated");
}

export async function deleteOpportunityAction(opportunityId: string) {
  const id = uuidSchema.safeParse(opportunityId);
  if (!id.success) redirect("/admin/opportunities?error=invalid-id");

  const context = await getAdminContext();
  if (!context) redirect("/admin/login");

  const { data, error } = await context.supabase
    .from("opportunity")
    .delete()
    .eq("id", id.data)
    .select("id")
    .maybeSingle();
  if (error || !data) {
    if (error) console.error("Opportunity delete failed:", error.message);
    redirect("/admin/opportunities?error=delete-failed");
  }

  revalidatePath("/admin");
  revalidatePath("/admin/opportunities");
  revalidatePath("/opportunities");
  redirect("/admin/opportunities?notice=deleted");
}
