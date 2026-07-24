import { ArrowRight, CirclePlus, Layers3, TrendingUp } from "lucide-react";

import { Card, CardContent } from "@/components/ui/card";
import { SectionHeading } from "@/components/landing/SectionHeading";

const steps = [
  {
    title: "Capture Leads",
    description: "Bring in inquiries from your website, ads, and outbound channels in one place.",
    icon: CirclePlus,
  },
  {
    title: "Manage Pipeline",
    description: "Track conversations, assign owners, and keep momentum moving from first touch to close.",
    icon: Layers3,
  },
  {
    title: "Grow Business",
    description: "Use insight-rich reports to focus your team on the deals most likely to convert.",
    icon: TrendingUp,
  },
];

export function HowItWorks() {
  return (
    <section className="mx-auto max-w-7xl px-6 py-20 lg:px-8">
      <SectionHeading
        eyebrow="How it works"
        title="A simple workflow that scales with your team"
        description="LeadFlow makes lead ownership clear, collaboration effortless, and visibility instant."
        centered
      />
      <div className="mt-12 grid gap-6 lg:grid-cols-3">
        {steps.map((step, index) => {
          const Icon = step.icon;
          return (
            <Card key={step.title} className="relative overflow-hidden border-slate-200/80 bg-white/80">
              <CardContent className="p-8">
                <div className="flex items-center justify-between">
                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-slate-950 text-white">
                    <Icon className="h-5 w-5" />
                  </div>
                  <span className="text-sm font-semibold text-slate-400">0{index + 1}</span>
                </div>
                <h3 className="mt-6 text-xl font-semibold text-slate-950">{step.title}</h3>
                <p className="mt-3 text-base leading-7 text-slate-600">{step.description}</p>
                {index < steps.length - 1 ? (
                  <div className="mt-6 hidden lg:flex">
                    <ArrowRight className="h-5 w-5 text-slate-400" />
                  </div>
                ) : null}
              </CardContent>
            </Card>
          );
        })}
      </div>
    </section>
  );
}
