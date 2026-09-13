const LOGO_URL =
  "https://ijmr.islingtoncollege.edu.np/plugins/themes/islington/images/ijmr-logo-white.svg";
const BRAND_GREEN = "#0B3B24";
const BRAND_GREEN_DARK = "#072517";

function capitalize(value: string): string {
  if (!value) return value;
  return value.charAt(0).toUpperCase() + value.slice(1);
}

/**
 * Builds a branded, table-based HTML email for a project status change.
 * Uses inline styles and a table layout throughout (no flexbox/grid, no
 * external stylesheet) so it renders consistently across Gmail, Outlook,
 * Apple Mail, and other major email clients.
 */
export function buildStatusUpdateEmail({
  title,
  previousStatus,
  newStatus,
  ctaUrl,
}: {
  title: string;
  previousStatus: string;
  newStatus: string;
  ctaUrl: string;
}): string {
  const prevLabel = capitalize(previousStatus);
  const newLabel = capitalize(newStatus);

  return `
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>${subjectSafe(title)}</title>
  </head>
  <body style="margin:0; padding:0; background-color:#F8F7F4; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Helvetica, Arial, sans-serif;">
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background-color:#F8F7F4; padding: 32px 16px;">
      <tr>
        <td align="center">
          <table role="presentation" width="600" cellpadding="0" cellspacing="0" style="max-width:600px; width:100%; background-color:#FFFFFF; border-radius:12px; overflow:hidden; border:1px solid #E5E2D9;">

            <!-- Header -->
            <tr>
              <td align="center" style="background-color:${BRAND_GREEN}; padding: 28px 24px;">
                <img src="${LOGO_URL}" alt="IJMR" width="120" style="display:block; height:auto; max-width:120px;" />
              </td>
            </tr>

            <!-- Accent bar -->
            <tr>
              <td style="height:4px; line-height:4px; font-size:0; background:linear-gradient(90deg, #EE4554, #FFC609, #7CC142, #00B5A2, #0076BB);">&nbsp;</td>
            </tr>

            <!-- Body -->
            <tr>
              <td style="padding: 36px 32px 8px 32px;">
                <p style="margin:0 0 6px 0; font-size:12px; font-weight:600; letter-spacing:0.08em; text-transform:uppercase; color:#7A8B80;">
                  Project Status Update
                </p>
                <h1 style="margin:0 0 20px 0; font-size:22px; line-height:1.35; font-weight:700; color:#17251F; font-family: Georgia, 'Times New Roman', serif;">
                  ${escapeHtml(title)}
                </h1>
              </td>
            </tr>

            <!-- Status badges -->
            <tr>
              <td style="padding: 0 32px 28px 32px;">
                <table role="presentation" cellpadding="0" cellspacing="0">
                  <tr>
                    <td style="padding: 8px 16px; background-color:#F1EFEA; border-radius:20px; font-size:13px; font-weight:600; color:#5B5850;">
                      ${escapeHtml(prevLabel)}
                    </td>
                    <td style="padding: 0 12px; font-size:16px; color:#9DB4A8;">&#8594;</td>
                    <td style="padding: 8px 16px; background-color:#E4EAE1; border-radius:20px; font-size:13px; font-weight:700; color:${BRAND_GREEN};">
                      ${escapeHtml(newLabel)}
                    </td>
                  </tr>
                </table>
              </td>
            </tr>

            <!-- Divider -->
            <tr>
              <td style="padding: 0 32px;">
                <table role="presentation" width="100%" cellpadding="0" cellspacing="0">
                  <tr><td style="border-top:1px solid #EFECE5; font-size:0; line-height:0;">&nbsp;</td></tr>
                </table>
              </td>
            </tr>

            <!-- CTA -->
            <tr>
              <td align="left" style="padding: 28px 32px 36px 32px;">
                <p style="margin:0 0 20px 0; font-size:14px; line-height:1.6; color:#4A554E;">
                  This project's status was just updated. Head over to the R&amp;D Hub to see the full details, timeline, and next steps.
                </p>
                <table role="presentation" cellpadding="0" cellspacing="0">
                  <tr>
                    <td style="border-radius:8px; background-color:${BRAND_GREEN};">
                      <a href="${ctaUrl}" target="_blank" style="display:inline-block; padding:12px 24px; font-size:14px; font-weight:600; color:#FFFFFF; text-decoration:none; border-radius:8px;">
                        View Project in R&amp;D Hub
                      </a>
                    </td>
                  </tr>
                </table>
              </td>
            </tr>

            <!-- Footer -->
            <tr>
              <td style="background-color:#F8F7F4; padding: 20px 32px; border-top:1px solid #E5E2D9;">
                <p style="margin:0; font-size:12px; line-height:1.6; color:#8A9990;">
                  You're receiving this because you're listed as a team member on this project in the Islington Research &amp; Development Hub.
                </p>
              </td>
            </tr>

          </table>
        </td>
      </tr>
    </table>
  </body>
</html>
  `.trim();
}

function escapeHtml(value: string): string {
  return String(value)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

function subjectSafe(value: string): string {
  return escapeHtml(value);
}