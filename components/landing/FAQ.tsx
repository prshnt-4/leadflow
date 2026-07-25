"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { SectionHeading } from "@/components/landing/SectionHeading";

const faqs = [
  {
    question: "How long does it take to set up LeadFlow?",
    answer: "Most teams are fully onboarded and capturing leads within 24 hours. Our intuitive interface requires minimal training, and we provide dedicated onboarding support for Enterprise customers.",
  },
  {
    question: "Can I integrate LeadFlow with my existing tools?",
    answer: "Yes, LeadFlow integrates seamlessly with over 100+ tools including Slack, Zapier, Gmail, and major marketing automation platforms.",
  },
  {
    question: "Is my data secure?",
    answer: "Absolutely. We use bank-grade encryption, SOC 2 Type II compliance, and regular security audits to ensure your pipeline data remains completely private and secure.",
  },
  {
    question: "Do you offer a free trial?",
    answer: "Yes, we offer a full-featured 14-day free trial with no credit card required. You can test all Pro features before making a decision.",
  },
];

export function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section className="mx-auto max-w-4xl px-6 py-20 lg:px-8">
      <SectionHeading
        eyebrow="FAQ"
        title="Frequently Asked Questions"
        description="Everything you need to know about getting started with LeadFlow."
        centered
      />
      <div className="mt-12 space-y-4">
        {faqs.map((faq, index) => (
          <div 
            key={index} 
            className="rounded-2xl border border-slate-800 bg-slate-900/50 p-6 cursor-pointer transition-colors hover:bg-slate-900/80"
            onClick={() => setOpenIndex(openIndex === index ? null : index)}
          >
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-medium text-white">{faq.question}</h3>
              <ChevronDown className={`h-5 w-5 text-slate-400 transition-transform duration-200 ${openIndex === index ? "rotate-180" : ""}`} />
            </div>
            {openIndex === index && (
              <p className="mt-4 text-slate-300 leading-relaxed">
                {faq.answer}
              </p>
            )}
          </div>
        ))}
      </div>
    </section>
  );
}
