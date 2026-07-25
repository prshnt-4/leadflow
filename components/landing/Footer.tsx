import Link from "next/link";

const footerLinks = [
  { label: "Features", href: "#features" },
  { label: "Pricing", href: "#pricing" },
  { label: "Contact", href: "#contact" },
];

export function Footer() {
  return (
    <footer className="border-t border-slate-800 bg-slate-950">
      <div className="mx-auto flex max-w-7xl flex-col gap-8 px-6 py-10 lg:flex-row lg:items-center lg:justify-between lg:px-8">
        <div>
          <p className="text-xl font-semibold tracking-tight text-white">LeadFlow</p>
          <p className="mt-2 text-sm text-slate-400">Modern lead management for focused growth.</p>
        </div>
        <div className="flex flex-wrap items-center gap-6 text-sm text-slate-400">
          {footerLinks.map((item) => (
            <Link key={item.href} href={item.href} className="transition hover:text-white">
              {item.label}
            </Link>
          ))}
        </div>
        <div className="flex gap-4 text-sm text-slate-400">
          <span className="rounded-full border border-slate-700 px-3 py-1 hover:border-slate-500 hover:text-white cursor-pointer transition-colors">X</span>
          <span className="rounded-full border border-slate-700 px-3 py-1 hover:border-slate-500 hover:text-white cursor-pointer transition-colors">in</span>
          <span className="rounded-full border border-slate-700 px-3 py-1 hover:border-slate-500 hover:text-white cursor-pointer transition-colors">GH</span>
        </div>
      </div>
      <div className="border-t border-slate-800 px-6 py-4 text-center text-sm text-slate-500 lg:px-8">
        © 2026 LeadFlow. All rights reserved.
      </div>
    </footer>
  );
}
