 // @ts-nocheck -- Deno edge function, not part of the Next.js TypeScript project
import { serve } from "https://deno.land/std@0.177.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.39.3";
import { sendEmail } from "../_shared/resend.ts";
import { buildStatusUpdateEmail } from "../_shared/email-templates.ts";

serve(async (req: Request) => {
  try {
    const payload = await req.json();

    // Verify it's an UPDATE
    if (payload.type !== "UPDATE") {
      return new Response("Not an UPDATE event", { status: 200 });
    }

    const { record, old_record } = payload;

    // Check if status changed
    if (record.status === old_record.status) {
      return new Response("Status did not change, ignoring.", { status: 200 });
    }

    const supabaseUrl = Deno.env.get("SUPABASE_URL") ?? "";
    const supabaseServiceKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") ?? "";

    if (!supabaseUrl || !supabaseServiceKey) {
      throw new Error("Missing Supabase environment variables");
    }

    const supabase = createClient(supabaseUrl, supabaseServiceKey);

    // Fetch team members
    const { data: teamMembers, error } = await supabase
      .from("project_researcher")
      .select(`
        researcher_id,
        researcher (
          name,
          email
        )
      `)
      .eq("project_id", record.id);

    if (error) throw error;
    if (!teamMembers || teamMembers.length === 0) {
      return new Response("No team members found", { status: 200 });
    }

    const emails = teamMembers
      .map((member: any) => member.researcher?.email)
      .filter(Boolean)
      .filter((email: string) => email === "vehora7@gmail.com" || email === "vehora07@gmail.com");

    if (emails.length === 0) {
      return new Response("No valid email addresses found for team", { status: 200 });
    }

    // Send emails
    const subject = `Project Status Update: ${record.title}`;
    const html = buildStatusUpdateEmail({
      title: record.title,
      previousStatus: old_record.status,
      newStatus: record.status,
      ctaUrl: "https://caffeinated-chaos.vercel.app/",
    });

    await sendEmail({
      to: emails,
      subject,
      html,
    });

    return new Response(JSON.stringify({ success: true, emailsSentTo: emails }), {
      headers: { "Content-Type": "application/json" },
      status: 200,
    });
  } catch (err: any) {
    console.error("Error in notify-project-team:", err.message);
    return new Response(JSON.stringify({ error: err.message }), {
      headers: { "Content-Type": "application/json" },
      status: 500,
    });
  }
});