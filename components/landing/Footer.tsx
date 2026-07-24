import Link from "next/link";

const footerLinks = [
  { label: "Features", href: "#features" },
  { label: "Pricing", href: "#pricing" },
  { label: "Contact", href: "#contact" },
];

export function Footer() {
  return (
    <footer className="border-t border-slate-200 bg-white/80">
      <div className="mx-auto flex max-w-7xl flex-col gap-8 px-6 py-10 lg:flex-row lg:items-center lg:justify-between lg:px-8">
        <div>
          <p className="text-xl font-semibold tracking-tight text-slate-950">LeadFlow</p>
          <p className="mt-2 text-sm text-slate-600">Modern lead management for focused growth.</p>
        </div>
        <div className="flex flex-wrap items-center gap-6 text-sm text-slate-600">
          {footerLinks.map((item) => (
            <Link key={item.href} href={item.href} className="transition hover:text-slate-950">
              {item.label}
            </Link>
          ))}
        </div>
        <div className="flex gap-4 text-sm text-slate-600">
          <span className="rounded-full border border-slate-200 px-3 py-1">X</span>
          <span className="rounded-full border border-slate-200 px-3 py-1">in</span>
          <span className="rounded-full border border-slate-200 px-3 py-1">GH</span>
        </div>
      </div>
      <div className="border-t border-slate-200 px-6 py-4 text-center text-sm text-slate-500 lg:px-8">
        © 2026 LeadFlow. All rights reserved.
      </div>
    </footer>
  );
}
