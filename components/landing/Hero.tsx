import { ArrowRight, PlayCircle } from "lucide-react";
import Link from "next/link";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

export function Hero() {
  return (
    <section className="mx-auto grid max-w-7xl gap-12 px-6 py-20 lg:grid-cols-[1.05fr_0.95fr] lg:px-8 lg:py-28">
      <div className="flex flex-col justify-center relative z-10">
        <div className="mb-6 inline-flex w-fit items-center rounded-full border border-cyan-500/30 bg-cyan-500/10 px-3 py-1 text-sm font-medium text-cyan-400">
          <span className="mr-2 h-2.5 w-2.5 rounded-full bg-cyan-400 animate-pulse" />
          New: AI-powered lead insights
        </div>
        <h1 className="max-w-2xl text-4xl font-semibold tracking-tight text-white sm:text-5xl lg:text-6xl">
          Convert More Leads. Close More Deals.
        </h1>
        <p className="mt-6 max-w-xl text-lg leading-8 text-slate-400">
          LeadFlow helps startups and businesses organize, track, and manage customer leads effortlessly.
        </p>
        <div className="mt-8 flex flex-col gap-3 sm:flex-row">
          <Link href="/signup" className="w-full sm:w-auto">
            <Button size="lg" className="w-full rounded-full bg-cyan-500 px-6 text-slate-950 hover:bg-cyan-400 hover:shadow-lg hover:shadow-cyan-500/20 sm:w-auto">
              Get Started
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </Link>
          <Link href="#contact" className="w-full sm:w-auto">
            <Button variant="outline" size="lg" className="w-full rounded-full border-slate-700 bg-slate-900 px-6 text-white hover:bg-slate-800 sm:w-auto">
              <PlayCircle className="mr-2 h-4 w-4" />
              Live Demo
            </Button>
          </Link>
        </div>
        <div className="mt-10 flex flex-wrap gap-4 text-sm text-slate-400">
          <div className="rounded-full border border-slate-800 bg-slate-900/50 px-3 py-2">No credit card required</div>
          <div className="rounded-full border border-slate-800 bg-slate-900/50 px-3 py-2">14-day free trial</div>
        </div>
      </div>

      <div className="flex items-center justify-center relative">
        <div className="absolute -inset-1 rounded-[2rem] bg-gradient-to-r from-cyan-500 to-indigo-500 opacity-20 blur-2xl" />
        <Card className="w-full max-w-xl border-slate-800 bg-gradient-to-br from-slate-950 via-slate-900 to-slate-900 p-2 text-white shadow-2xl relative z-10">
          <CardContent className="space-y-4 p-5 sm:p-6">
            <div className="flex items-center justify-between rounded-2xl border border-white/10 bg-white/10 p-4">
              <div>
                <p className="text-sm text-slate-300">Pipeline health</p>
                <p className="mt-1 text-2xl font-semibold">82%</p>
              </div>
              <div className="rounded-full bg-emerald-500/20 px-3 py-1 text-sm text-emerald-300">
                +12% this week
              </div>
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="rounded-2xl border border-white/10 bg-slate-900/70 p-4">
                <p className="text-sm text-slate-400">New leads</p>
                <p className="mt-2 text-3xl font-semibold">126</p>
              </div>
              <div className="rounded-2xl border border-white/10 bg-slate-900/70 p-4">
                <p className="text-sm text-slate-400">Qualified</p>
                <p className="mt-2 text-3xl font-semibold">38</p>
              </div>
            </div>
            <div className="rounded-2xl border border-white/10 bg-slate-900/70 p-4">
              <div className="mb-3 flex items-center justify-between">
                <p className="text-sm text-slate-400">Activity overview</p>
                <p className="text-sm text-slate-300">Today</p>
              </div>
              <div className="space-y-3">
                {[
                  ["Follow-up", "8"],
                  ["Demo booked", "4"],
                  ["Deals closed", "2"],
                ].map(([label, value]) => (
                  <div key={label} className="flex items-center justify-between rounded-xl bg-white/5 px-3 py-2 text-sm">
                    <span className="text-slate-300">{label}</span>
                    <span className="font-semibold">{value}</span>
                  </div>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  );
}
