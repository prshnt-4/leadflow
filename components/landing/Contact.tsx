import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { SectionHeading } from "@/components/landing/SectionHeading";

export function Contact() {
  return (
    <section id="contact" className="mx-auto max-w-7xl px-6 py-20 lg:px-8">
      <SectionHeading
        eyebrow="Contact"
        title="Let’s build a smoother lead process together"
        description="Tell us about your team and we’ll show you how LeadFlow can fit your workflow."
        centered
      />
      <div className="mt-12 grid gap-8 lg:grid-cols-[0.9fr_1.1fr]">
        <Card className="border-slate-200/80 bg-slate-950 text-white shadow-sm">
          <CardHeader>
            <CardTitle className="text-white">Prefer a quick intro?</CardTitle>
            <CardDescription className="text-slate-300">
              Share a few details and our team will reach out with a tailored walkthrough.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4 text-sm text-slate-300">
            <p>hello@leadflow.io</p>
            <p>+1 (800) 555-0142</p>
            <p>Available Mon–Fri · 8am–6pm PT</p>
          </CardContent>
        </Card>

        <Card className="border-slate-200/80 bg-white/80 shadow-sm">
          <CardContent className="p-8">
            <form className="space-y-5">
              <div className="grid gap-5 sm:grid-cols-2">
                <label className="space-y-2 text-sm font-medium text-slate-700">
                  <span>Name</span>
                  <input className="w-full rounded-xl border border-slate-200 bg-white px-3 py-2.5 outline-none ring-0" placeholder="Alex Morgan" />
                </label>
                <label className="space-y-2 text-sm font-medium text-slate-700">
                  <span>Email</span>
                  <input className="w-full rounded-xl border border-slate-200 bg-white px-3 py-2.5 outline-none ring-0" placeholder="alex@company.com" />
                </label>
              </div>
              <label className="space-y-2 text-sm font-medium text-slate-700">
                <span>Company</span>
                <input className="w-full rounded-xl border border-slate-200 bg-white px-3 py-2.5 outline-none ring-0" placeholder="Northstar Labs" />
              </label>
              <label className="space-y-2 text-sm font-medium text-slate-700">
                <span>Message</span>
                <textarea className="min-h-32 w-full rounded-xl border border-slate-200 bg-white px-3 py-2.5 outline-none ring-0" placeholder="Tell us what you need." />
              </label>
              <Button className="rounded-full px-6">Submit</Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </section>
  );
}
