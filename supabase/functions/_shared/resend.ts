export async function sendEmail({
  to,
  subject,
  html,
}: {
  to: string | string[];
  subject: string;
  html: string;
}) {
  const RESEND_API_KEY = Deno.env.get("RESEND_API_KEY");
  
  if (!RESEND_API_KEY) {
    console.warn("No RESEND_API_KEY found in environment variables. Simulating email send:");
    console.log(`To: ${to}\nSubject: ${subject}\nBody: ${html}`);
    return { id: "simulated-id", message: "Email simulated successfully (missing API key)" };
  }

  try {
    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${RESEND_API_KEY}`,
      },
      body: JSON.stringify({
        from: "Acme <onboarding@resend.dev>", // Change this when domain is verified in Resend
        to: Array.isArray(to) ? to : [to],
        subject: subject,
        html: html,
      }),
    });

    const data = await res.json();
    
    if (res.ok) {
      console.log(`Successfully sent email to ${to}:`, data);
      return data;
    } else {
      console.error(`Failed to send email to ${to}:`, data);
      throw new Error(`Resend Error: ${data.message || 'Unknown error'}`);
    }
  } catch (error) {
    console.error(`Error sending email to ${to}:`, error);
    throw error;
  }
}
