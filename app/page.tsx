import { CTA } from "@/components/landing/CTA";
import { Contact } from "@/components/landing/Contact";
import { Features } from "@/components/landing/Features";
import { Hero } from "@/components/landing/Hero";
import { HowItWorks } from "@/components/landing/HowItWorks";
import { Navbar } from "@/components/landing/Navbar";
import { Testimonials } from "@/components/landing/Testimonials";
import { Statistics } from "@/components/landing/Statistics";
import { FAQ } from "@/components/landing/FAQ";

export default function Home() {
  return (
    <main className="min-h-screen bg-slate-950 text-slate-100 selection:bg-cyan-500/30">
      <Navbar />
      <Hero />
      <Features />
      <Statistics />
      <HowItWorks />
      <Testimonials />
      <FAQ />
      <CTA />
      <Contact />
    </main>
  );
}