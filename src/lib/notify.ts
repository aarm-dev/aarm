// Email notifications via Resend's HTTP API (no SDK dependency).
// No-ops safely when RESEND_API_KEY isn't set, so submissions never break.

type NewListing = {
  name: string;
  website: string;
  description: string;
  category?: string;
  pocName?: string;
  pocEmail?: string;
  submittedBy?: string;
};

function recipients(): string[] {
  return (process.env.NOTIFY_TO || process.env.ADMIN_EMAILS || "")
    .split(",")
    .map((s) => s.trim())
    .filter(Boolean);
}

export async function notifyNewListing(b: NewListing): Promise<void> {
  const key = process.env.RESEND_API_KEY;
  const to = recipients();
  if (!key || to.length === 0) {
    console.info("[notify] skipped (RESEND_API_KEY or NOTIFY_TO not set)");
    return;
  }
  const from = process.env.NOTIFY_FROM || "AARM <onboarding@resend.dev>";
  const site = process.env.NEXT_PUBLIC_SITE_URL || "https://aarm.dev";

  const html = `
    <h2>New builder submission</h2>
    <p>A new company was submitted to the AARM registry and is awaiting review.</p>
    <table cellpadding="6" style="border-collapse:collapse;font-family:system-ui,sans-serif;font-size:14px">
      <tr><td><strong>Name</strong></td><td>${esc(b.name)}</td></tr>
      <tr><td><strong>Website</strong></td><td>${esc(b.website)}</td></tr>
      <tr><td><strong>Category</strong></td><td>${esc(b.category || "—")}</td></tr>
      <tr><td><strong>Description</strong></td><td>${esc(b.description)}</td></tr>
      <tr><td><strong>Point of contact</strong></td><td>${esc(b.pocName || "—")} ${b.pocEmail ? `&lt;${esc(b.pocEmail)}&gt;` : ""}</td></tr>
      <tr><td><strong>Submitted by</strong></td><td>${esc(b.submittedBy || "—")}</td></tr>
    </table>
    <p><a href="${site}/admin">Review in the admin queue →</a></p>
  `;

  try {
    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: { Authorization: `Bearer ${key}`, "Content-Type": "application/json" },
      body: JSON.stringify({
        from,
        to,
        subject: `New AARM builder submission: ${b.name}`,
        html,
      }),
    });
    if (!res.ok) console.error("[notify] resend error", res.status, await res.text());
  } catch (e) {
    console.error("[notify] failed", e);
  }
}

function esc(s: string) {
  return s.replace(/[&<>"]/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]!));
}
