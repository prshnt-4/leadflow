import { ArrowRight } from "lucide-react";

import { Button } from "@/components/ui/button";

export function CTA() {
  return (
    <section className="mx-auto max-w-7xl px-6 pb-20 lg:px-8">
      <div className="rounded-[2rem] border border-slate-200 bg-slate-950 px-8 py-16 text-center text-white shadow-xl sm:px-12 lg:px-16">
        <p className="text-sm font-semibold uppercase tracking-[0.3em] text-slate-400">Ready to optimize every lead?</p>
        <h2 className="mx-auto mt-4 max-w-3xl text-3xl font-semibold tracking-tight sm:text-4xl">
          Join teams using LeadFlow to grow faster with less friction.
        </h2>
        <p className="mx-auto mt-5 max-w-2xl text-lg leading-8 text-slate-300">
          Bring structure to your pipeline and gain the confidence to focus on the deals that matter most.
        </p>
        <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
          <Button size="lg" className="rounded-full bg-white text-slate-950 hover:bg-slate-100">
            Start Free
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
          <Button variant="outline" size="lg" className="rounded-full border-white/20 bg-white/10 text-white hover:bg-white/20">
            Book a Demo
          </Button>
        </div>
      </div>
    </section>
  );
}
