import { ArrowUpRight, Lock, Search, Sparkles, Users, Zap } from "lucide-react";

import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { SectionHeading } from "@/components/landing/SectionHeading";

const features = [
  {
    title: "Lead Management",
    description: "Keep every prospect organized with a visual pipeline built for fast-moving teams.",
    icon: Sparkles,
  },
  {
    title: "Analytics Dashboard",
    description: "Turn activity into actionable insight with real-time reporting and forecasts.",
    icon: ArrowUpRight,
  },
  {
    title: "Secure Authentication",
    description: "Protect accounts with enterprise-ready access controls and session security.",
    icon: Lock,
  },
  {
    title: "Smart Search",
    description: "Find the right lead instantly with filters, tags, and contextual search.",
    icon: Search,
  },
  {
    title: "Team Collaboration",
    description: "Share notes, handoffs, and updates so everyone stays aligned.",
    icon: Users,
  },
  {
    title: "Real-Time Updates",
    description: "Monitor pipeline changes as they happen with instant notifications.",
    icon: Zap,
  },
];

export function Features() {
  return (
    <section id="features" className="mx-auto max-w-7xl px-6 py-20 lg:px-8">
      <SectionHeading
        eyebrow="Features"
        title="Everything you need to run a sharper pipeline"
        description="From intake through conversion, LeadFlow gives your team the clarity and mobility to move faster."
        centered
      />
      <div className="mt-12 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
        {features.map((feature) => {
          const Icon = feature.icon;
          return (
            <Card key={feature.title} className="border-slate-800 bg-slate-900/50 text-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_10px_30px_rgba(34,211,238,0.1)] hover:border-cyan-500/30">
              <CardHeader>
                <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-2xl bg-cyan-500/10 text-cyan-400">
                  <Icon className="h-5 w-5" />
                </div>
                <CardTitle className="text-white">{feature.title}</CardTitle>
                <CardDescription className="text-slate-400">{feature.description}</CardDescription>
              </CardHeader>
            </Card>
          );
        })}
      </div>
    </section>
  );
}
