"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { SectionHeading } from "@/components/landing/SectionHeading";

export function Contact() {
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    const formData = new FormData(e.currentTarget);
    const data = {
      name: formData.get("name"),
      email: formData.get("email"),
      company: formData.get("company"),
      message: formData.get("message"),
    };

    if (!data.name || !data.email) {
      setError("Name and email are required.");
      setLoading(false);
      return;
    }

    try {
      const res = await fetch("/api/leads/public", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (!res.ok) throw new Error("Failed to submit form");
      setSuccess(true);
    } catch {
      setError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="contact" className="mx-auto max-w-7xl px-6 py-20 lg:px-8">
      <SectionHeading
        eyebrow="Contact"
        title="Let’s build a smoother lead process together"
        description="Tell us about your team and we’ll show you how LeadFlow can fit your workflow."
        centered
      />
      <div className="mt-12 grid gap-8 lg:grid-cols-[0.9fr_1.1fr]">
        <Card className="border-slate-800 bg-slate-950 text-white shadow-sm">
          <CardHeader>
            <CardTitle className="text-white">Prefer a quick intro?</CardTitle>
            <CardDescription className="text-slate-400">
              Share a few details and our team will reach out with a tailored walkthrough.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4 text-sm text-slate-300">
            <p>hello@leadflow.io</p>
            <p>+1 (800) 555-0142</p>
            <p>Available Mon–Fri · 8am–6pm PT</p>
          </CardContent>
        </Card>

        <Card className="border-slate-800 bg-slate-900/50 shadow-sm text-white">
          <CardContent className="p-8">
            {success ? (
              <div className="text-center py-12">
                <h3 className="text-xl font-bold text-white">Message Sent!</h3>
                <p className="mt-2 text-slate-400">We&apos;ll be in touch shortly.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="grid gap-5 sm:grid-cols-2">
                  <label className="space-y-2 text-sm font-medium text-slate-300">
                    <span>Name *</span>
                    <input name="name" required className="w-full rounded-xl border border-slate-700 bg-slate-950 px-3 py-2.5 text-white outline-none ring-0 placeholder:text-slate-500 focus:border-cyan-500 transition-colors" placeholder="Alex Morgan" />
                  </label>
                  <label className="space-y-2 text-sm font-medium text-slate-300">
                    <span>Email *</span>
                    <input name="email" type="email" required className="w-full rounded-xl border border-slate-700 bg-slate-950 px-3 py-2.5 text-white outline-none ring-0 placeholder:text-slate-500 focus:border-cyan-500 transition-colors" placeholder="alex@company.com" />
                  </label>
                </div>
                <label className="space-y-2 text-sm font-medium text-slate-300">
                  <span>Company</span>
                  <input name="company" className="w-full rounded-xl border border-slate-700 bg-slate-950 px-3 py-2.5 text-white outline-none ring-0 placeholder:text-slate-500 focus:border-cyan-500 transition-colors" placeholder="Northstar Labs" />
                </label>
                <label className="space-y-2 text-sm font-medium text-slate-300">
                  <span>Message</span>
                  <textarea name="message" className="min-h-32 w-full rounded-xl border border-slate-700 bg-slate-950 px-3 py-2.5 text-white outline-none ring-0 placeholder:text-slate-500 focus:border-cyan-500 transition-colors" placeholder="Tell us what you need." />
                </label>
                {error && <p className="text-sm text-red-400">{error}</p>}
                <Button type="submit" disabled={loading} className="rounded-full bg-cyan-500 text-slate-950 hover:bg-cyan-400 px-8 font-semibold transition-all hover:scale-105 active:scale-95 disabled:opacity-50">
                  {loading ? "Submitting..." : "Submit"}
                </Button>
              </form>
            )}
          </CardContent>
        </Card>
      </div>
    </section>
  );
}
