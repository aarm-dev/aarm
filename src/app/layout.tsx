import type { Metadata } from "next";
import { Plus_Jakarta_Sans } from "next/font/google";
import { Geist_Mono } from "next/font/google";
import { SiteNav } from "@/components/site-nav";
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
        <SiteNav />
        <main className="flex-1">{children}</main>
        <footer className="border-t border-neutral-100 py-8">
          <div className="mx-auto max-w-6xl px-6">
            <div className="flex flex-col items-center justify-between gap-4 sm:flex-row">
              <div className="flex items-center gap-2 font-mono text-xs text-neutral-400">
                <span className="font-bold" style={{ color: "#1A6EB5" }}>AARM</span>
                <span>· CSA Working Group</span>
              </div>
              <div className="flex items-center gap-5 font-mono text-xs text-neutral-400">
                <a href="https://github.com/aarm-dev/docs" target="_blank" rel="noopener noreferrer" className="hover:text-neutral-700 transition-colors">github</a>
                <a href="https://arxiv.org/abs/2602.09433" target="_blank" rel="noopener noreferrer" className="hover:text-neutral-700 transition-colors">arxiv</a>
                <a href="https://cloudsecurityalliance.org/research/working-groups/autonomous-action-runtime-management-aarm" target="_blank" rel="noopener noreferrer" className="hover:text-neutral-700 transition-colors">csa</a>
              </div>
            </div>
          </div>
        </footer>
      </body>
    </html>
  );
}
