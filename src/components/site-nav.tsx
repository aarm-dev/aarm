"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";

const links = [
  { href: "/conformance", label: "Conformance" },
  { href: "/builders", label: "Builders" },
  { href: "https://github.com/aarm-dev/docs", label: "Spec", external: true },
];

export function SiteNav() {
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-50 border-b border-neutral-100 bg-white/95 backdrop-blur-sm">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-6">
        <Link href="/" className="flex items-center">
          <Image
            src="/logo/dark.svg"
            alt="AARM"
            width={200}
            height={32}
            priority
            className="h-[32px] w-auto"
          />
        </Link>

        <nav className="flex items-center gap-1">
          {links.map((link) =>
            link.external ? (
              <a
                key={link.href}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-md px-3 py-1.5 text-sm text-neutral-500 transition-colors hover:text-neutral-900"
              >
                {link.label}
              </a>
            ) : (
              <Link
                key={link.href}
                href={link.href}
                className={`rounded-md px-3 py-1.5 text-sm transition-colors ${
                  pathname === link.href
                    ? "text-neutral-900 font-medium"
                    : "text-neutral-500 hover:text-neutral-900"
                }`}
              >
                {link.label}
              </Link>
            )
          )}
          <a
            href="https://cloudsecurityalliance.org/research/working-groups/autonomous-action-runtime-management-aarm"
            target="_blank"
            rel="noopener noreferrer"
            className="ml-2 rounded-lg px-4 py-1.5 text-sm font-semibold text-white transition-opacity hover:opacity-85"
            style={{ backgroundColor: "#1A6EB5" }}
          >
            Join TWG
          </a>
        </nav>
      </div>
    </header>
  );
}
