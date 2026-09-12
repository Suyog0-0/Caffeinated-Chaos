"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { z } from "zod";
import { getAdminContext } from "@/app/admin/admin-auth";

export type ResourceFormState = { error?: string } | undefined;

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
const resourceSchema = z.object({
  title: z.string().trim().min(1, "Enter the resource title."),
  category: z.string().trim(),
  description: z.string().trim(),
  content: z.string().trim(),
  file_url: optionalFileUrl,
  publish_status: z.enum(["draft", "preview", "published"]),
});

function field(formData: FormData, name: string) {
  return String(formData.get(name) ?? "");
}

function parseResource(formData: FormData) {
  return resourceSchema.safeParse({
    title: field(formData, "title"),
    category: field(formData, "category"),
    description: field(formData, "description"),
    content: field(formData, "content"),
    file_url: field(formData, "file_url"),
    publish_status: field(formData, "publish_status"),
  });
}

function values(resource: z.infer<typeof resourceSchema>) {
  return {
    title: resource.title,
    category: resource.category || null,
    description: resource.description || null,
    content: resource.content || null,
    file_url: resource.file_url || null,
    publish_status: resource.publish_status,
  };
}

function saveError(code?: string) {
  if (code === "PGRST205" || code === "42P01") return "Research Support management is not available in the connected database.";
  if (code === "42501") return "Your account does not have permission to save resources. Check the resource RLS policies.";
  if (code === "23502") return "A required database field is missing. Complete the required details and try again.";
  return "The resource could not be saved. Check your connection and try again.";
}

export async function createResourceAction(
  _state: ResourceFormState,
  formData: FormData,
): Promise<ResourceFormState> {
  const context = await getAdminContext();
  if (!context) return { error: "Your admin session expired. Sign in again." };

  const parsed = parseResource(formData);
  if (!parsed.success) return { error: parsed.error.issues[0].message };

  const { data, error } = await context.supabase
    .from("resource")
    .insert(values(parsed.data))
    .select("id")
    .maybeSingle();
  if (error || !data) {
    if (error) console.error("Resource create failed:", error.message);
    return { error: error ? saveError(error.code) : saveError() };
  }

  revalidatePath("/admin");
  revalidatePath("/admin/research-support");
  revalidatePath("/research-support");
  redirect("/admin/research-support?notice=created");
}

export async function updateResourceAction(
  resourceId: string,
  _state: ResourceFormState,
  formData: FormData,
): Promise<ResourceFormState> {
  const id = uuidSchema.safeParse(resourceId);
  if (!id.success) return { error: "This resource ID is invalid." };

  const context = await getAdminContext();
  if (!context) return { error: "Your admin session expired. Sign in again." };

  const parsed = parseResource(formData);
  if (!parsed.success) return { error: parsed.error.issues[0].message };

  const { data, error } = await context.supabase
    .from("resource")
    .update(values(parsed.data))
    .eq("id", id.data)
    .select("id")
    .maybeSingle();
  if (error || !data) {
    if (error) console.error("Resource update failed:", error.message);
    return { error: error ? saveError(error.code) : "No resource was updated. It may have been removed or blocked by RLS." };
  }

  revalidatePath("/admin");
  revalidatePath("/admin/research-support");
  revalidatePath("/research-support");
  redirect("/admin/research-support?notice=updated");
}

export async function deleteResourceAction(resourceId: string) {
  const id = uuidSchema.safeParse(resourceId);
  if (!id.success) redirect("/admin/research-support?error=invalid-id");

  const context = await getAdminContext();
  if (!context) redirect("/admin/login");

  const { data, error } = await context.supabase
    .from("resource")
    .delete()
    .eq("id", id.data)
    .select("id")
    .maybeSingle();
  if (error || !data) {
    if (error) console.error("Resource delete failed:", error.message);
    redirect("/admin/research-support?error=delete-failed");
  }

  revalidatePath("/admin");
  revalidatePath("/admin/research-support");
  revalidatePath("/research-support");
  redirect("/admin/research-support?notice=deleted");
}
