import Link from "next/link";

export function Footer() {
  return (
    <footer className="border-t border-slate-800/80 bg-slate-950/95 backdrop-blur-sm">
      <div className="mx-auto flex max-w-6xl flex-col items-center gap-3 px-6 py-6 text-center text-sm text-slate-400 sm:px-8 lg:flex-row lg:justify-between lg:text-left">
        <p className="font-medium text-slate-400">© 2026 LeadFlow CRM. All rights reserved.</p>
        <p className="text-slate-400/90">
          Built for{" "}
          <Link
            href="https://digitalheroesco.com"
            target="_blank"
            rel="noopener noreferrer"
            className="font-medium text-slate-200 transition-colors hover:text-cyan-400"
          >
            Digital Heroes
          </Link>{" "}
          Training Task
        </p>
      </div>
    </footer>
  );
}
