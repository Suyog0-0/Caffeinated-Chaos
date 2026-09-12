import { serve } from "https://deno.land/std@0.177.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.39.3";
import { sendEmail } from "../_shared/resend.ts";

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
    const html = `
      <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto;">
        <h2>Project Status Changed</h2>
        <p>The project <strong>${record.title}</strong> has changed status.</p>
        <p><strong>Previous Status:</strong> ${old_record.status}</p>
        <p><strong>New Status:</strong> <span style="color: #0B3B24;">${record.status}</span></p>
        <br/>
        <p>View the project in the R&D Hub for more details.</p>
      </div>
    `;

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
