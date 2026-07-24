import { Check } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { SectionHeading } from "@/components/landing/SectionHeading";

const tiers = [
  {
    name: "Starter",
    price: "$29",
    description: "For early-stage teams building momentum.",
    features: ["Up to 3 users", "Unlimited pipelines", "Basic insights"],
    featured: false,
  },
  {
    name: "Pro",
    price: "$79",
    description: "For growing companies that need more visibility.",
    features: ["Unlimited users", "Advanced analytics", "Automations"],
    featured: true,
  },
  {
    name: "Enterprise",
    price: "Custom",
    description: "For larger organizations with complex workflows.",
    features: ["Dedicated support", "Security controls", "Custom onboarding"],
    featured: false,
  },
];

export function Pricing() {
  return (
    <section id="pricing" className="mx-auto max-w-7xl px-6 py-20 lg:px-8">
      <SectionHeading
        eyebrow="Pricing"
        title="Choose a plan that fits your next stage"
        description="Simple pricing that scales as your pipeline grows."
        centered
      />
      <div className="mt-12 grid gap-6 lg:grid-cols-3">
        {tiers.map((tier) => (
          <Card key={tier.name} className={`border-slate-200/80 bg-white/80 shadow-sm ${tier.featured ? "border-slate-950 shadow-lg" : ""}`}>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>{tier.name}</CardTitle>
                {tier.featured ? (
                  <span className="rounded-full bg-slate-950 px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-white">
                    Popular
                  </span>
                ) : null}
              </div>
              <CardDescription>{tier.description}</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <span className="text-4xl font-semibold text-slate-950">{tier.price}</span>
                {tier.price !== "Custom" ? <span className="ml-2 text-slate-600">/month</span> : null}
              </div>
              <ul className="space-y-3 text-sm text-slate-600">
                {tier.features.map((feature) => (
                  <li key={feature} className="flex items-center gap-2">
                    <Check className="h-4 w-4 text-emerald-500" />
                    {feature}
                  </li>
                ))}
              </ul>
            </CardContent>
            <CardFooter>
              <Button className={`w-full rounded-full ${tier.featured ? "" : "bg-slate-100 text-slate-900 hover:bg-slate-200"}`}>
                {tier.name === "Enterprise" ? "Contact Sales" : "Start Free"}
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </section>
  );
}
