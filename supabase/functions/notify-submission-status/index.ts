import { serve } from "https://deno.land/std@0.177.0/http/server.ts";
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

    // Since we don't have a concrete schema, we assume the table has a submitter_email and title
    const email = record.submitter_email;
    const title = record.title || `Submission #${record.id}`;

    if (!email) {
      return new Response("No submitter_email found in record", { status: 200 });
    }

    // Determine the subject and message based on the status
    let subject = `Update on your submission: ${title}`;
    let htmlContent = `Your submission status has been updated to: <strong>${record.status}</strong>`;

    if (record.status.toLowerCase() === 'accepted' || record.status.toLowerCase() === 'approved') {
      subject = `Congratulations! Your submission was accepted: ${title}`;
      htmlContent = `
        <h2>Great News!</h2>
        <p>Your submission <strong>${title}</strong> has been officially accepted.</p>
        <p>Our team will reach out to you shortly with next steps.</p>
      `;
    } else if (record.status.toLowerCase() === 'rejected' || record.status.toLowerCase() === 'declined') {
      subject = `Update on your submission: ${title}`;
      htmlContent = `
        <h2>Submission Update</h2>
        <p>Thank you for your submission <strong>${title}</strong>.</p>
        <p>Unfortunately, we are unable to move forward with your application at this time.</p>
        <p>We encourage you to apply for future opportunities.</p>
      `;
    }

    const html = `
      <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto;">
        ${htmlContent}
      </div>
    `;

    await sendEmail({
      to: email,
      subject,
      html,
    });

    return new Response(JSON.stringify({ success: true, emailSentTo: email }), {
      headers: { "Content-Type": "application/json" },
      status: 200,
    });
  } catch (err: any) {
    console.error("Error in notify-submission-status:", err.message);
    return new Response(JSON.stringify({ error: err.message }), {
      headers: { "Content-Type": "application/json" },
      status: 500,
    });
  }
});
