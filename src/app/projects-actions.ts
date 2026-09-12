"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { z } from "zod";
import { getAdminContext } from "@/app/admin/admin-auth";

export type ProjectFormState = { error?: string } | undefined;

const projectSchema = z
  .object({
    title: z.string().trim().min(1, "Enter the project title."),
    slug: z
      .string()
      .trim()
      .min(1, "Enter a URL slug.")
      .regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, "Use lowercase letters, numbers, and hyphens for the slug."),
    research_area_id: z.string().trim(),
    description: z.string().trim(),
    objective: z.string().trim(),
    status: z.enum(["proposed", "ongoing", "completed", "archived"]),
    start_date: z.string().trim(),
    end_date: z.string().trim(),
    publish_status: z.enum(["draft", "preview", "published"]),
  })
  .refine(
    ({ start_date, end_date }) => !start_date || !end_date || end_date >= start_date,
    { message: "The end date cannot be before the start date.", path: ["end_date"] },
  );

const postgresUuidSchema = z.string().regex(
  /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i,
);

function parseProject(formData: FormData) {
  return projectSchema.safeParse({
    title: formData.get("title"),
    slug: formData.get("slug"),
    research_area_id: formData.get("research_area_id"),
    description: formData.get("description"),
    objective: formData.get("objective"),
    status: formData.get("status"),
    start_date: formData.get("start_date"),
    end_date: formData.get("end_date"),
    publish_status: formData.get("publish_status"),
  });
}

function nullable(value: string) {
  return value || null;
}

function projectSaveError(error: { code?: string }) {
  if (error.code === "42501") return "Your account does not have permission to save projects. Check the project RLS policies.";
  if (error.code === "23505") return "That project slug is already in use. Choose a different slug.";
  if (error.code === "23503") return "The selected research area no longer exists. Refresh the page and choose another one.";
  if (error.code === "23502") return "A required database field is missing. Complete the required details and try again.";
  return "The project could not be saved. Check your connection and try again.";
}

function projectValues(values: z.infer<typeof projectSchema>, formData: FormData) {
  return {
    title: values.title,
    slug: values.slug,
    research_area_id: nullable(values.research_area_id),
    description: nullable(values.description),
    objective: nullable(values.objective),
    status: values.status,
    start_date: nullable(values.start_date),
    end_date: nullable(values.end_date),
    publish_status: values.publish_status,
    is_demo_data: formData.get("is_demo_data") === "on",
    last_updated_at: new Date().toISOString(),
  };
}

export async function createProjectAction(
  _state: ProjectFormState,
  formData: FormData,
): Promise<ProjectFormState> {
  const context = await getAdminContext();
  if (!context) return { error: "Your admin session expired. Sign in again." };

  const parsed = parseProject(formData);
  if (!parsed.success) return { error: parsed.error.issues[0].message };

  const { error } = await context.supabase.from("project").insert(projectValues(parsed.data, formData));
  if (error) {
    console.error("Project create failed:", error.message);
    return { error: projectSaveError(error) };
  }

  revalidatePath("/admin");
  revalidatePath("/admin/projects");
  revalidatePath("/projects");
  redirect("/admin/projects?notice=created");
}

export async function updateProjectAction(
  projectId: string,
  _state: ProjectFormState,
  formData: FormData,
): Promise<ProjectFormState> {
  const id = postgresUuidSchema.safeParse(projectId);
  if (!id.success) return { error: "This project ID is invalid." };

  const context = await getAdminContext();
  if (!context) return { error: "Your admin session expired. Sign in again." };

  const parsed = parseProject(formData);
  if (!parsed.success) return { error: parsed.error.issues[0].message };

  const { data, error } = await context.supabase
    .from("project")
    .update(projectValues(parsed.data, formData))
    .eq("id", id.data)
    .select("id")
    .maybeSingle();

  if (error || !data) {
    if (error) console.error("Project update failed:", error.message);
    return {
      error: error
        ? projectSaveError(error)
        : "No project was updated. It may have been removed or your account may not have permission to edit it.",
    };
  }

  revalidatePath("/admin");
  revalidatePath("/admin/projects");
  revalidatePath("/projects");
  revalidatePath("/projects/[slug]", "page");
  redirect("/admin/projects?notice=updated");
}

export async function deleteProjectAction(projectId: string) {
  const id = postgresUuidSchema.safeParse(projectId);
  if (!id.success) redirect("/admin/projects?error=invalid-id");

  const context = await getAdminContext();
  if (!context) redirect("/admin/login");

  const { data, error } = await context.supabase
    .from("project")
    .delete()
    .eq("id", id.data)
    .select("id")
    .maybeSingle();

  if (error || !data) {
    if (error) console.error("Project delete failed:", error.message);
    redirect("/admin/projects?error=delete-failed");
  }

  revalidatePath("/admin");
  revalidatePath("/admin/projects");
  revalidatePath("/projects");
  revalidatePath("/projects/[slug]", "page");
  redirect("/admin/projects?notice=deleted");
}
