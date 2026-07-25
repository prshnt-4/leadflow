import { ArrowRight } from "lucide-react";

import { Button } from "@/components/ui/button";

export function CTA() {
  return (
    <section className="mx-auto max-w-7xl px-6 pb-20 lg:px-8 relative">
      <div className="absolute inset-0 -z-10 mx-auto max-w-5xl rounded-full bg-cyan-500/10 blur-3xl" />
      <div className="rounded-[2rem] border border-slate-800 bg-gradient-to-br from-slate-900 to-slate-950 px-8 py-16 text-center text-white shadow-2xl shadow-slate-900 sm:px-12 lg:px-16 relative overflow-hidden">
        <div className="absolute top-0 right-0 -mt-20 -mr-20 h-64 w-64 rounded-full bg-cyan-500/10 blur-3xl" />
        <p className="text-sm font-semibold uppercase tracking-[0.3em] text-cyan-400">Ready to optimize every lead?</p>
        <h2 className="mx-auto mt-4 max-w-3xl text-3xl font-semibold tracking-tight text-white sm:text-4xl">
          Join teams using LeadFlow to grow faster with less friction.
        </h2>
        <p className="mx-auto mt-5 max-w-2xl text-lg leading-8 text-slate-300">
          Bring structure to your pipeline and gain the confidence to focus on the deals that matter most.
        </p>
        <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row relative z-10">
          <Button size="lg" className="rounded-full bg-cyan-500 text-slate-950 hover:bg-cyan-400 hover:shadow-lg hover:shadow-cyan-500/20 px-8">
            Start Free
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
          <Button variant="outline" size="lg" className="rounded-full border-slate-700 bg-slate-800/50 text-white hover:bg-slate-800 px-8">
            Book a Demo
          </Button>
        </div>
      </div>
    </section>
  );
}
