"use client";

import { useState } from "react";
import { Sidebar } from "@/components/crm/Sidebar";
import { Topbar } from "@/components/crm/Topbar";

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100">
      <div className="flex min-h-screen">
        <Sidebar mobileOpen={mobileMenuOpen} onClose={() => setMobileMenuOpen(false)} />

        <div className="flex min-h-screen flex-1 flex-col min-w-0">
          <Topbar onMenuClick={() => setMobileMenuOpen(true)} />
          <main className="flex-1 overflow-auto p-4 sm:p-6 lg:p-8">
            <div className="mx-auto w-full max-w-7xl">{children}</div>
          </main>
        </div>
      </div>
    </div>
  );
}
