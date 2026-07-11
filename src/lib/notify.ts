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

export async function notifyClaim(c: {
  builderName: string;
  builderSlug: string;
  userEmail: string;
  method: "domain_match" | "manual";
}): Promise<void> {
  const key = process.env.RESEND_API_KEY;
  const to = recipients();
  if (!key || to.length === 0) {
    console.info("[notify] claim skipped (not configured)");
    return;
  }
  const from = process.env.NOTIFY_FROM || "AARM <onboarding@resend.dev>";
  const site = process.env.NEXT_PUBLIC_SITE_URL || "https://aarm.dev";
  const auto = c.method === "domain_match";

  const html = `
    <h2>Listing claim ${auto ? "auto-approved" : "needs review"}</h2>
    <p><strong>${esc(c.userEmail)}</strong> claimed <strong>${esc(c.builderName)}</strong>
    via <em>${esc(c.method)}</em>.</p>
    <p>${auto
      ? "Domain matched — they now own the listing. No action needed."
      : "This claim is pending your approval in the admin queue."}</p>
    <p><a href="${site}/builders/${esc(c.builderSlug)}">View listing</a> ·
       <a href="${site}/admin">Open admin queue →</a></p>
  `;

  try {
    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: { Authorization: `Bearer ${key}`, "Content-Type": "application/json" },
      body: JSON.stringify({
        from,
        to,
        subject: `Claim ${auto ? "auto-approved" : "to review"}: ${c.builderName}`,
        html,
      }),
    });
    if (!res.ok) console.error("[notify] resend error", res.status, await res.text());
  } catch (e) {
    console.error("[notify] claim failed", e);
  }
}

async function sendEmail(to: string[], subject: string, html: string): Promise<void> {
  const key = process.env.RESEND_API_KEY;
  if (!key || to.length === 0) {
    console.info("[notify] skipped (not configured)");
    return;
  }
  const from = process.env.NOTIFY_FROM || "AARM <onboarding@resend.dev>";
  try {
    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: { Authorization: `Bearer ${key}`, "Content-Type": "application/json" },
      body: JSON.stringify({ from, to, subject, html }),
    });
    if (!res.ok) console.error("[notify] resend error", res.status, await res.text());
  } catch (e) {
    console.error("[notify] send failed", e);
  }
}

const SITE = () => process.env.NEXT_PUBLIC_SITE_URL || "https://aarm.dev";

/** Email the submitter when their listing is approved or rejected. */
export async function notifyListingDecision(p: { to: string; name: string; slug: string; approved: boolean }) {
  if (!p.to) return;
  const html = p.approved
    ? `<h2>Your AARM listing is live</h2>
       <p><strong>${esc(p.name)}</strong> has been approved and now appears in the AARM builder registry.</p>
       <p><a href="${SITE()}/builders/${esc(p.slug)}">View your listing →</a></p>
       <p>Sign in and choose <em>“Manage this listing”</em> to keep your details up to date.</p>`
    : `<h2>Update on your AARM submission</h2>
       <p>Thanks for submitting <strong>${esc(p.name)}</strong> to the AARM registry. After review, it wasn’t approved for listing at this time.</p>
       <p>Reply to this email if you’d like feedback or want to resubmit.</p>`;
  await sendEmail(
    [p.to],
    p.approved ? `Your AARM listing is live: ${p.name}` : `Update on your AARM submission: ${p.name}`,
    html
  );
}

/** Email the requester when their manage request is approved or rejected. */
export async function notifyClaimDecision(p: { to: string; builderName: string; builderSlug: string; approved: boolean }) {
  if (!p.to) return;
  const html = p.approved
    ? `<h2>You can now manage ${esc(p.builderName)}</h2>
       <p>Your request to manage <strong>${esc(p.builderName)}</strong> on AARM was approved.</p>
       <p><a href="${SITE()}/builders/${esc(p.builderSlug)}/edit">Manage your listing →</a></p>`
    : `<h2>Update on your AARM request</h2>
       <p>Your request to manage <strong>${esc(p.builderName)}</strong> wasn’t approved. If you believe this is a mistake, reply to this email and we’ll take another look.</p>`;
  await sendEmail(
    [p.to],
    p.approved ? `You can now manage ${p.builderName} on AARM` : `Update on your AARM request: ${p.builderName}`,
    html
  );
}

/** INTERCEPT interest confirmation to the registrant (+ a team heads-up). */
export async function notifyInterceptSignup(p: { to: string; name?: string; role?: string }) {
  if (!p.to) return;
  const name = (p.name && p.name.trim()) || "there";
  const html = `
  <div style="background:#0A0A0A;padding:28px 16px">
    <div style="max-width:520px;margin:0 auto;border:1px solid #262626;background:#0A0A0A;padding:32px;font-family:'JetBrains Mono',ui-monospace,SFMono-Regular,Menlo,monospace">
      <div style="font-size:26px;font-weight:800;letter-spacing:3px;color:#ffffff">INTERCEPT</div>
      <div style="font-size:10px;text-transform:uppercase;letter-spacing:3px;color:#737373;margin-top:8px">Builders · Breakers · Defenders of Agentic Runtime Security</div>
      <div style="height:2px;background:#FF7A00;margin:22px 0"></div>
      <p style="color:#e5e5e5;font-size:14px">Dear ${esc(name)},</p>
      <p style="color:#a3a3a3;font-size:14px;line-height:1.7">
        Thanks for registering your interest in <strong style="color:#ffffff">INTERCEPT</strong>.
        You&rsquo;re on the list — we&rsquo;ll notify you with updates as the program, speakers, and
        venue come together.
      </p>
      <div style="border:1px solid #262626;padding:14px 16px;margin:22px 0">
        <span style="color:#2EFF7B;font-weight:700;font-size:13px">ACCESS: PENDING</span>
        <div style="color:#737373;font-size:12px;margin-top:6px">OCT 14 2026 // LOCATION TBA</div>
      </div>
      <p style="color:#737373;font-size:12px">— The AARM team · <a href="https://aarm.dev" style="color:#FF7A00;text-decoration:none">aarm.dev</a></p>
    </div>
  </div>`;
  await sendEmail([p.to], "You're on the list — INTERCEPT", html);

  const team = recipients();
  if (team.length) {
    await sendEmail(
      team,
      `INTERCEPT interest: ${p.to}`,
      `<p style="font-family:sans-serif">${esc(p.to)}${p.name ? ` (${esc(p.name)})` : ""}${p.role ? ` — ${esc(p.role)}` : ""} registered interest in INTERCEPT.</p>`
    );
  }
}

function esc(s: string) {
  return s.replace(/[&<>"]/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]!));
}
