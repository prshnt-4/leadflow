import Link from "next/link";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";

export default function SignupPage() {
  return (
    <main className="relative flex min-h-screen items-center justify-center overflow-hidden px-4 py-12 text-white">
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-slate-800 via-slate-900 to-indigo-950" />
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.04) 1px, transparent 1px)",
          backgroundSize: "72px 72px",
          opacity: 0.18,
        }}
      />
      <div className="pointer-events-none absolute -left-24 top-12 h-72 w-72 rounded-full bg-indigo-500/20 blur-3xl" />
      <div className="pointer-events-none absolute right-0 top-1/4 h-96 w-96 rounded-full bg-violet-500/15 blur-3xl" />
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-60 bg-gradient-to-t from-slate-950 via-slate-900/40 to-transparent blur-3xl" />

      <div className="absolute left-4 top-4 z-20 rounded-full border border-white/10 bg-white/8 px-4 py-3 backdrop-blur-xl shadow-lg shadow-slate-950/10 sm:left-8 sm:top-8">
        <div className="flex items-center gap-3 text-sm font-semibold text-white">
          <span className="flex h-9 w-9 items-center justify-center rounded-2xl bg-gradient-to-br from-indigo-500 to-violet-500 text-base shadow-lg shadow-indigo-500/20">L</span>
          <span>LeadFlow</span>
        </div>
      </div>

      <Card className="relative w-full max-w-md overflow-hidden rounded-[2rem] border border-white/10 bg-white/8 shadow-[0_25px_80px_rgba(99,102,241,0.18)] backdrop-blur-xl transition-transform duration-700 ease-out hover:-translate-y-0.5 animate-fade-in-up">
        <div className="absolute inset-x-0 top-0 h-44 bg-[radial-gradient(circle_at_top,_rgba(99,102,241,0.18),transparent_38%)]" />
        <CardHeader className="relative z-10 space-y-4 px-8 pt-12">
          <CardTitle className="text-5xl font-bold tracking-tight text-white">Create your account</CardTitle>
          <CardDescription className="max-w-xs text-base text-slate-300">
            Start working smarter with LeadFlow CRM.
          </CardDescription>
        </CardHeader>

        <CardContent className="relative z-10 space-y-5 px-8 pb-8 pt-2">
          <div>
            <label className="mb-2 block text-sm font-medium text-slate-200">Full Name</label>
            <Input placeholder="Taylor Brooks" className="h-12 rounded-xl border border-white/10 bg-white/5 px-4 text-white placeholder:text-slate-500 focus:border-indigo-500 focus-visible:ring-2 focus-visible:ring-indigo-500/40" />
          </div>
          <div>
            <label className="mb-2 block text-sm font-medium text-slate-200">Email</label>
            <Input placeholder="you@example.com" className="h-12 rounded-xl border border-white/10 bg-white/5 px-4 text-white placeholder:text-slate-500 focus:border-indigo-500 focus-visible:ring-2 focus-visible:ring-indigo-500/40" />
          </div>
          <div>
            <label className="mb-2 block text-sm font-medium text-slate-200">Password</label>
            <Input type="password" placeholder="••••••••" className="h-12 rounded-xl border border-white/10 bg-white/5 px-4 text-white placeholder:text-slate-500 focus:border-indigo-500 focus-visible:ring-2 focus-visible:ring-indigo-500/40" />
          </div>
          <Button className="w-full rounded-xl bg-gradient-to-r from-indigo-500 to-violet-500 px-4 py-3 text-base font-semibold text-white shadow-lg shadow-violet-500/20 transition duration-300 ease-out hover:from-indigo-400 hover:to-violet-400 hover:scale-[1.01]">
            Create account
          </Button>
        </CardContent>

        <CardFooter className="relative z-10 flex flex-col items-center justify-center gap-2 border-t border-white/10 bg-white/5 px-8 py-6 text-center text-sm text-slate-300 sm:flex-row sm:justify-between">
          <p className="text-slate-300/90">Already have an account?</p>
          <Link href="/login" className="font-semibold text-indigo-400 transition-colors duration-200 hover:text-indigo-200">
            Sign in
          </Link>
        </CardFooter>
      </Card>
    </main>
  );
}
