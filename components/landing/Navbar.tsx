import Link from "next/link";

import { Button } from "@/components/ui/button";

const navItems = [
  { label: "Home", href: "#home" },
  { label: "Features", href: "#features" },
  { label: "Pricing", href: "#pricing" },
  { label: "Contact", href: "#contact" },
];

export function Navbar() {
  return (
    <header id="home" className="sticky top-0 z-50 border-b border-slate-800/80 bg-slate-950/80 backdrop-blur-xl">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4 lg:px-8">
        <Link href="#home" className="text-xl font-semibold tracking-tight text-white">
          LeadFlow
        </Link>
        <nav className="hidden items-center gap-8 text-sm font-medium text-slate-300 md:flex">
          {navItems.map((item) => (
            <Link key={item.href} href={item.href} className="transition hover:text-white">
              {item.label}
            </Link>
          ))}
        </nav>
        <Link href="/login">
          <Button variant="outline" size="sm" className="rounded-full border-slate-700 bg-slate-900 text-white hover:bg-slate-800 px-4">
            Login
          </Button>
        </Link>
      </div>
    </header>
  );
}
