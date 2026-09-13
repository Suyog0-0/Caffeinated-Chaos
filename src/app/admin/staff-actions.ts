"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { z } from "zod";
import { getAdminContext } from "@/app/admin/admin-auth";
import {
  createServiceRoleClient,
  isSupabaseServiceRoleConfigured,
} from "@/supabase/server";

export type StaffFormState = { error?: string } | undefined;

const staffSchema = z.object({
  name: z.string().trim().min(2, "Enter the staff member's full name."),
  email: z.email("Enter a valid email address.").trim().toLowerCase(),
  password: z
    .string()
    .min(8, "Password must contain at least 8 characters."),
});

export async function createSuperAdminAction(
  _state: StaffFormState,
  formData: FormData,
): Promise<StaffFormState> {
  const context = await getAdminContext();

  if (!context) {
    return { error: "Your admin session expired. Sign in again." };
  }

  if (context.admin.role !== "super_admin") {
    return { error: "Only a super admin can create staff accounts." };
  }

  const parsed = staffSchema.safeParse({
    name: formData.get("name"),
    email: formData.get("email"),
    password: formData.get("password"),
  });

  if (!parsed.success) {
    return { error: parsed.error.issues[0].message };
  }

  if (!isSupabaseServiceRoleConfigured()) {
    return {
      error:
        "Staff creation is not configured. Add SUPABASE_SECRET_KEY to the server environment.",
    };
  }

  const serviceClient = createServiceRoleClient();
  const { name, email, password } = parsed.data;
  const { data: authData, error: authError } =
    await serviceClient.auth.admin.createUser({
      email,
      password,
      email_confirm: true,
      user_metadata: { name },
      app_metadata: { role: "super_admin" },
    });

  if (authError || !authData.user) {
    console.error("Super admin Auth user creation failed:", authError?.message);
    return {
      error:
        authError?.message === "A user with this email address has already been registered"
          ? "A staff account with this email already exists."
          : "The staff account could not be created. Check the email and try again.",
    };
  }

  const { error: adminError } = await serviceClient.from("admin").insert({
    auth_user_id: authData.user.id,
    name,
    email,
    role: "super_admin",
  });

  if (adminError) {
    console.error("Super admin record creation failed:", adminError.message);
    const { error: cleanupError } =
      await serviceClient.auth.admin.deleteUser(authData.user.id);

    if (cleanupError) {
      console.error("Orphaned Auth user cleanup failed:", cleanupError.message);
    }

    return {
      error:
        adminError.code === "23505"
          ? "A staff account with this email already exists."
          : "The staff record could not be saved. No account was created.",
    };
  }

  revalidatePath("/admin/staff");
  redirect("/admin/staff?notice=created");
}
