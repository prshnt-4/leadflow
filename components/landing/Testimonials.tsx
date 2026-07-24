import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { SectionHeading } from "@/components/landing/SectionHeading";

const testimonials = [
  {
    quote:
      "LeadFlow helped us replace scattered spreadsheets with a calm, dependable workflow. Our team finally trusts the pipeline.",
    name: "Maya Chen",
    role: "VP Growth, Northstar",
  },
  {
    quote:
      "The visibility is incredible. We can spot stalled deals early and keep momentum moving without extra admin work.",
    name: "Darius Patel",
    role: "Founder, Brightlane",
  },
  {
    quote:
      "From onboarding to daily follow-ups, everything feels intuitive. It’s the first tool our team actually enjoys using.",
    name: "Rosa Alvarez",
    role: "Operations Lead, Lumen",
  },
];

export function Testimonials() {
  return (
    <section className="mx-auto max-w-7xl px-6 py-20 lg:px-8">
      <SectionHeading
        eyebrow="Testimonials"
        title="Loved by teams that value speed and clarity"
        description="See how modern operators use LeadFlow to stay aligned and close more business."
        centered
      />
      <div className="mt-12 grid gap-6 lg:grid-cols-3">
        {testimonials.map((testimonial) => (
          <Card key={testimonial.name} className="border-slate-200/80 bg-slate-50/80 shadow-sm">
            <CardHeader>
              <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-full bg-slate-950 text-sm font-semibold text-white">
                {testimonial.name.split(" ").map((part) => part[0]).join("")}
              </div>
              <CardTitle>{testimonial.name}</CardTitle>
              <CardDescription>{testimonial.role}</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-base leading-7 text-slate-600">“{testimonial.quote}”</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  );
}
