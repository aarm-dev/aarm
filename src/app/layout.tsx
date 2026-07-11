import type { Metadata } from "next";
import { Plus_Jakarta_Sans } from "next/font/google";
import { Geist_Mono } from "next/font/google";
import { SiteNav } from "@/components/site-nav";
import { AuthProvider } from "@/components/auth-provider";
import { HideOnIntercept } from "@/components/hide-on-intercept";
import { Analytics } from "@vercel/analytics/next";
import "./globals.css";

const sans = Plus_Jakarta_Sans({
  variable: "--font-sans",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
});

const mono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "AARM — Autonomous Action Runtime Management",
  description:
    "The runtime security standard for autonomous AI agents. Specification, conformance requirements, and a registry of builders.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${sans.variable} ${mono.variable}`}>
      <body className="flex min-h-screen flex-col bg-white antialiased">
        <AuthProvider>
          <SiteNav />
        </AuthProvider>
        <main className="flex-1">{children}</main>
        <HideOnIntercept>
        <footer className="border-t border-neutral-100 bg-white pt-14 pb-8">
          <div className="mx-auto max-w-6xl px-6">
            {/* Top section */}
            <div className="mb-12 grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
              {/* Brand */}
              <div className="lg:col-span-1">
                <div className="mb-4">
                  <img src="/logo/dark.svg" alt="AARM" className="h-8 w-auto" />
                </div>
                <p className="mb-5 text-sm leading-relaxed text-neutral-500">
                  The open runtime security standard for autonomous AI agents. A Cloud Security Alliance project.
                </p>
                <div className="flex items-center gap-3">
                  <a
                    href="https://github.com/aarm-dev/aarm"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex h-8 w-8 items-center justify-center rounded-lg border border-neutral-200 text-neutral-500 transition-colors hover:border-neutral-300 hover:text-neutral-800"
                    aria-label="GitHub"
                  >
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
                    </svg>
                  </a>
                  <a
                    href="https://arxiv.org/abs/2602.09433"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex h-8 w-8 items-center justify-center rounded-lg border border-neutral-200 text-neutral-500 transition-colors hover:border-neutral-300 hover:text-neutral-800"
                    aria-label="arXiv paper"
                  >
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                      <polyline points="14 2 14 8 20 8" />
                      <line x1="16" y1="13" x2="8" y2="13" />
                      <line x1="16" y1="17" x2="8" y2="17" />
                      <polyline points="10 9 9 9 8 9" />
                    </svg>
                  </a>
                </div>
              </div>

              {/* Standard */}
              <div>
                <h4 className="mb-4 text-xs font-semibold uppercase tracking-widest text-neutral-400">Standard</h4>
                <ul className="space-y-2.5">
                  {[
                    { href: "/about", label: "About AARM" },
                    { href: "/conformance", label: "Requirements" },
                    { href: "/conformance", label: "Testing protocol" },
                    { href: "https://arxiv.org/abs/2602.09433", label: "arXiv paper", external: true },
                    { href: "/spec", label: "Full specification" },
                  ].map((link) => (
                    <li key={link.label}>
                      {link.external ? (
                        <a href={link.href} target="_blank" rel="noopener noreferrer" className="text-sm text-neutral-500 transition-colors hover:text-neutral-800">
                          {link.label}
                        </a>
                      ) : (
                        <a href={link.href} className="text-sm text-neutral-500 transition-colors hover:text-neutral-800">
                          {link.label}
                        </a>
                      )}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Ecosystem */}
              <div>
                <h4 className="mb-4 text-xs font-semibold uppercase tracking-widest text-neutral-400">Ecosystem</h4>
                <ul className="space-y-2.5">
                  {[
                    { href: "/builders", label: "Builder registry" },
                    { href: "/builders?filter=Conformant", label: "Conformant builders" },
                    { href: "/conformance", label: "Claim conformance" },
                  ].map((link) => (
                    <li key={link.href}>
                      <a href={link.href} className="text-sm text-neutral-500 transition-colors hover:text-neutral-800">
                        {link.label}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Community */}
              <div>
                <h4 className="mb-4 text-xs font-semibold uppercase tracking-widest text-neutral-400">Community</h4>
                <ul className="space-y-2.5">
                  {[
                    { href: "/working-group", label: "Working group" },
                    { href: "/events", label: "Events" },
                    { href: "https://cloudsecurityalliance.org/research/working-groups/autonomous-action-runtime-management-aarm", label: "Join the TWG", external: true },
                    { href: "https://github.com/aarm-dev/aarm", label: "Contribute on GitHub", external: true },
                  ].map((link) => (
                    <li key={link.href}>
                      {link.external ? (
                        <a href={link.href} target="_blank" rel="noopener noreferrer" className="text-sm text-neutral-500 transition-colors hover:text-neutral-800">
                          {link.label}
                        </a>
                      ) : (
                        <a href={link.href} className="text-sm text-neutral-500 transition-colors hover:text-neutral-800">
                          {link.label}
                        </a>
                      )}
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Bottom bar */}
            <div className="flex flex-col items-center justify-between gap-3 border-t border-neutral-100 pt-6 sm:flex-row">
              <div className="font-mono text-xs text-neutral-400">
                © 2026 AARM · A <a href="https://cloudsecurityalliance.org" target="_blank" rel="noopener noreferrer" className="hover:text-neutral-600 transition-colors">Cloud Security Alliance</a> project
              </div>
              <div className="flex items-center gap-1">
                <span className="rounded-full bg-green-50 px-2.5 py-0.5 font-mono text-[10px] font-bold uppercase tracking-wide text-green-700 border border-green-100">
                  System Category Spec
                </span>
                <span className="rounded-full px-2.5 py-0.5 font-mono text-[10px] font-bold uppercase tracking-wide border"
                  style={{ backgroundColor: "rgba(26,110,181,0.06)", color: "#1A6EB5", borderColor: "rgba(26,110,181,0.2)" }}>
                  Community Verified
                </span>
              </div>
            </div>
          </div>
        </footer>
        </HideOnIntercept>
        <Analytics />
      </body>
    </html>
  );
}
