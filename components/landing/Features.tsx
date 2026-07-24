import { ArrowUpRight, Lock, Search, Sparkles, Users, Zap } from "lucide-react";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
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
            <Card key={feature.title} className="border-slate-200/80 bg-white/80 shadow-sm transition hover:-translate-y-1 hover:shadow-md">
              <CardHeader>
                <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-2xl bg-slate-950 text-white">
                  <Icon className="h-5 w-5" />
                </div>
                <CardTitle>{feature.title}</CardTitle>
                <CardDescription>{feature.description}</CardDescription>
              </CardHeader>
            </Card>
          );
        })}
      </div>
    </section>
  );
}
