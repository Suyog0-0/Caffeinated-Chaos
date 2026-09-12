"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { z } from "zod";
import {
  createAuthenticatedServerClient,
  isSupabaseConfigured,
} from "@/src/supabase/server";
import { getAdminContext } from "@/src/app/admin/admin-auth";

export type ResearcherFormState = { error?: string } | undefined;

const researcherSchema = z.object({
  name: z.string().trim().min(1, "Enter the researcher's name."),
  position: z.string().trim(),
  department: z.string().trim(),
  email: z.union([z.literal(""), z.email("Enter a valid email address.")]),
  biography: z.string().trim(),
  photo_url: z.union([
    z.literal(""),
    z.url("Enter a valid photo URL.").refine(
      (value) => value.startsWith("https://") || value.startsWith("http://"),
      "Photo URL must start with http:// or https://.",
    ),
  ]),
  google_scholar_url: z.union([
    z.literal(""),
    z.url("Enter a valid profile URL.").refine(
      (value) => value.startsWith("https://") || value.startsWith("http://"),
      "Profile URL must start with http:// or https://.",
    ),
  ]),
  publish_status: z.enum(["draft", "preview", "published"]),
});

const postgresUuidSchema = z.string().regex(
  /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i,
  "Invalid UUID.",
);

function parseResearcher(formData: FormData) {
  return researcherSchema.safeParse({
    name: formData.get("name"),
    position: formData.get("position"),
    department: formData.get("department"),
    email: formData.get("email"),
    biography: formData.get("biography"),
    photo_url: formData.get("photo_url"),
    google_scholar_url: formData.get("google_scholar_url"),
    publish_status: formData.get("publish_status"),
  });
}

function nullable(value: string) {
  return value || null;
}

function researcherSaveError(error: { code?: string }) {
  if (error.code === "42501") {
    return "Your account does not have permission to save researchers. Check the researcher RLS policies.";
  }
  if (error.code === "23505") {
    return "A researcher with the same unique details already exists. Check the email and profile links.";
  }
  if (error.code === "23502") {
    return "A required database field is missing. Complete the required details and try again.";
  }
  return "The researcher could not be saved. Check your connection and try again.";
}

export async function logoutAction() {
  if (isSupabaseConfigured()) {
    const supabase = await createAuthenticatedServerClient();
    await supabase.auth.signOut();
  }
  redirect("/admin/login");
}

export async function createResearcherAction(
  _state: ResearcherFormState,
  formData: FormData,
): Promise<ResearcherFormState> {
  const context = await getAdminContext();
  if (!context) return { error: "Your admin session expired. Sign in again." };
  const { supabase } = context;

  const parsed = parseResearcher(formData);
  if (!parsed.success) return { error: parsed.error.issues[0].message };

  const values = parsed.data;
  const { error } = await supabase.from("researcher").insert({
    name: values.name,
    position: nullable(values.position),
    department: nullable(values.department),
    email: nullable(values.email),
    biography: nullable(values.biography),
    photo_url: nullable(values.photo_url),
    google_scholar_url: nullable(values.google_scholar_url),
    publish_status: values.publish_status,
    is_demo_data: formData.get("is_demo_data") === "on",
  });

  if (error) {
    console.error("Researcher create failed:", error.message);
    return { error: researcherSaveError(error) };
  }

  revalidatePath("/admin");
  revalidatePath("/admin/researchers");
  revalidatePath("/people");
  redirect("/admin/researchers?notice=created");
}

export async function updateResearcherAction(
  researcherId: string,
  _state: ResearcherFormState,
  formData: FormData,
): Promise<ResearcherFormState> {
  const id = postgresUuidSchema.safeParse(researcherId);
  if (!id.success) return { error: "This researcher ID is invalid." };

  const context = await getAdminContext();
  if (!context) return { error: "Your admin session expired. Sign in again." };
  const { supabase } = context;

  const parsed = parseResearcher(formData);
  if (!parsed.success) return { error: parsed.error.issues[0].message };

  const values = parsed.data;
  const { data: updated, error } = await supabase
    .from("researcher")
    .update({
      name: values.name,
      position: nullable(values.position),
      department: nullable(values.department),
      email: nullable(values.email),
      biography: nullable(values.biography),
      photo_url: nullable(values.photo_url),
      google_scholar_url: nullable(values.google_scholar_url),
      publish_status: values.publish_status,
      is_demo_data: formData.get("is_demo_data") === "on",
      updated_at: new Date().toISOString(),
    })
    .eq("id", id.data)
    .select("id")
    .maybeSingle();

  if (error || !updated) {
    if (error) console.error("Researcher update failed:", error.message);
    return {
      error: error
        ? researcherSaveError(error)
        : "No researcher was updated. It may have been removed or your account may not have permission to edit it.",
    };
  }

  revalidatePath("/admin");
  revalidatePath("/admin/researchers");
  revalidatePath("/people");
  revalidatePath(`/people/${id.data}`);
  redirect("/admin/researchers?notice=updated");
}

export async function deleteResearcherAction(researcherId: string) {
  const id = postgresUuidSchema.safeParse(researcherId);
  if (!id.success) redirect("/admin/researchers?error=invalid-id");

  const context = await getAdminContext();
  if (!context) redirect("/admin/login");
  const { supabase } = context;

  const { data: deleted, error } = await supabase
    .from("researcher")
    .delete()
    .eq("id", id.data)
    .select("id")
    .maybeSingle();
  if (error || !deleted) {
    if (error) console.error("Researcher delete failed:", error.message);
    redirect("/admin/researchers?error=delete-failed");
  }

  revalidatePath("/admin");
  revalidatePath("/admin/researchers");
  revalidatePath("/people");
  redirect("/admin/researchers?notice=deleted");
}
