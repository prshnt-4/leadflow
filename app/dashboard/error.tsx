"use client";

import { useEffect } from "react";
import { Button } from "@/components/ui/button";

export default function DashboardError({ reset }: { reset: () => void }) {
  useEffect(() => {
    // Keep diagnostic details in the browser console without exposing internals in the UI.
    console.error("Dashboard failed to load.");
  }, []);

  return (
    <section role="alert" className="rounded-3xl border border-red-900/70 bg-slate-900/80 p-6 text-white">
      <h2 className="text-xl font-semibold">Unable to load the dashboard</h2>
      <p className="mt-2 text-sm text-slate-400">Please check your connection and try again.</p>
      <Button type="button" onClick={reset} className="mt-4">Try again</Button>
    </section>
  );
}
