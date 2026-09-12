"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { z } from "zod";
import { getAdminContext } from "@/src/app/admin/admin-auth";

export type SecondaryContentKind = "event" | "grant" | "announcement";
export type SecondaryContentFormState = { error?: string } | undefined;

const uuidSchema = z.string().regex(
  /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i,
);
const optionalUrl = z.union([
  z.literal(""),
  z.url("Enter a valid URL.").refine(
    (value) => value.startsWith("https://") || value.startsWith("http://"),
    "URL must start with http:// or https://.",
  ),
]);
const publishStatus = z.enum(["draft", "preview", "published"]);
const baseSchema = z.object({
  title: z.string().trim().min(1, "Enter a title."),
  publish_status: publishStatus,
  is_demo_data: z.boolean(),
});
const eventSchema = baseSchema.extend({
  event_type: z.string().trim(),
  description: z.string().trim(),
  location: z.string().trim(),
  start_at: z.string().trim(),
  end_at: z.string().trim(),
  registration_url: optionalUrl,
  image_url: optionalUrl,
}).refine(
  (value) => !value.start_at || !value.end_at || value.end_at >= value.start_at,
  { message: "End date must be after the start date.", path: ["end_at"] },
);
const grantSchema = baseSchema.extend({
  funder: z.string().trim(),
  description: z.string().trim(),
  amount: z.union([z.literal(""), z.coerce.number().nonnegative("Amount cannot be negative.")]),
  currency: z.string().trim(),
  deadline: z.string().trim(),
  external_url: optionalUrl,
  status: z.enum(["open", "closed", "awarded"]),
});
const announcementSchema = baseSchema.extend({
  summary: z.string().trim(),
  content: z.string().trim(),
});

const details = {
  event: { table: "event", route: "/admin/events", label: "Event" },
  grant: { table: "grant", route: "/admin/grants", label: "Grant" },
  announcement: { table: "announcement", route: "/admin/announcements", label: "Announcement" },
} as const;

function value(formData: FormData, name: string) {
  return String(formData.get(name) ?? "");
}

function nullable(input: string) {
  return input || null;
}

function parse(kind: SecondaryContentKind, formData: FormData) {
  const common = {
    title: value(formData, "title"),
    publish_status: value(formData, "publish_status"),
    is_demo_data: formData.get("is_demo_data") === "on",
  };

  if (kind === "event") {
    return eventSchema.safeParse({
      ...common,
      event_type: value(formData, "event_type"),
      description: value(formData, "description"),
      location: value(formData, "location"),
      start_at: value(formData, "start_at"),
      end_at: value(formData, "end_at"),
      registration_url: value(formData, "registration_url"),
      image_url: value(formData, "image_url"),
    });
  }
  if (kind === "grant") {
    return grantSchema.safeParse({
      ...common,
      funder: value(formData, "funder"),
      description: value(formData, "description"),
      amount: value(formData, "amount"),
      currency: value(formData, "currency"),
      deadline: value(formData, "deadline"),
      external_url: value(formData, "external_url"),
      status: value(formData, "status"),
    });
  }
  return announcementSchema.safeParse({
    ...common,
    summary: value(formData, "summary"),
    content: value(formData, "content"),
  });
}

function payload(
  kind: SecondaryContentKind,
  data: Record<string, unknown>,
): Record<string, unknown> {
  const common = {
    title: data.title,
    publish_status: data.publish_status,
    is_demo_data: data.is_demo_data,
  };
  if (kind === "event") {
    return {
      ...common,
      event_type: nullable(data.event_type as string),
      description: nullable(data.description as string),
      location: nullable(data.location as string),
      start_at: nullable(data.start_at as string),
      end_at: nullable(data.end_at as string),
      registration_url: nullable(data.registration_url as string),
      image_url: nullable(data.image_url as string),
    };
  }
  if (kind === "grant") {
    return {
      ...common,
      funder: nullable(data.funder as string),
      description: nullable(data.description as string),
      amount: data.amount === "" ? null : data.amount,
      currency: nullable(data.currency as string),
      deadline: nullable(data.deadline as string),
      external_url: nullable(data.external_url as string),
      status: data.status,
    };
  }
  return {
    ...common,
    summary: nullable(data.summary as string),
    content: nullable(data.content as string),
  };
}

function saveError(kind: SecondaryContentKind, code?: string) {
  const label = details[kind].label;
  if (code === "PGRST205" || code === "42P01") {
    return `${label} management needs the local Supabase migration to be applied first.`;
  }
  if (code === "42501") return `Your account does not have permission to save this ${label.toLowerCase()}. Check its RLS policies.`;
  if (code === "23505") return `${label} conflicts with an existing record. Check its unique details.`;
  return `${label} could not be saved. Check your connection and try again.`;
}

export async function saveSecondaryContentAction(
  kind: SecondaryContentKind,
  id: string | null,
  _state: SecondaryContentFormState,
  formData: FormData,
): Promise<SecondaryContentFormState> {
  if (id && !uuidSchema.safeParse(id).success) return { error: `This ${details[kind].label.toLowerCase()} ID is invalid.` };
  const context = await getAdminContext();
  if (!context) return { error: "Your admin session expired. Sign in again." };
  const parsed = parse(kind, formData);
  if (!parsed.success) return { error: parsed.error.issues[0].message };

  const record = payload(kind, parsed.data as Record<string, unknown>);
  const request = id
    ? context.supabase.from(details[kind].table).update({ ...record, updated_at: new Date().toISOString() }).eq("id", id)
    : context.supabase.from(details[kind].table).insert(record);
  const { data: saved, error } = await request.select("id").maybeSingle();
  if (error || !saved) {
    if (error) console.error(`${details[kind].label} save failed:`, error.message);
    return { error: error ? saveError(kind, error.code) : `No ${details[kind].label.toLowerCase()} was saved. It may have been removed or blocked by RLS.` };
  }

  revalidatePath(details[kind].route);
  redirect(`${details[kind].route}?notice=${id ? "updated" : "created"}`);
}

export async function deleteSecondaryContentAction(kind: SecondaryContentKind, id: string) {
  if (!uuidSchema.safeParse(id).success) redirect(`${details[kind].route}?error=invalid-id`);
  const context = await getAdminContext();
  if (!context) redirect("/admin/login");
  const { data, error } = await context.supabase
    .from(details[kind].table)
    .delete()
    .eq("id", id)
    .select("id")
    .maybeSingle();
  if (error || !data) {
    if (error) console.error(`${details[kind].label} delete failed:`, error.message);
    redirect(`${details[kind].route}?error=delete-failed`);
  }
  revalidatePath(details[kind].route);
  redirect(`${details[kind].route}?notice=deleted`);
}
