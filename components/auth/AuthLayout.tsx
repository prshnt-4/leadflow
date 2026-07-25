import Link from "next/link";

interface AuthLayoutProps {
  children: React.ReactNode;
}

export function AuthLayout({ children }: AuthLayoutProps) {
  return (
    <main className="relative flex min-h-screen items-center justify-center overflow-hidden px-4 py-12 text-white">
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-slate-800 via-slate-900 to-indigo-950" />
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.04) 1px, transparent 1px)",
          backgroundSize: "72px 72px",
          opacity: 0.18,
        }}
      />
      <div className="pointer-events-none absolute -left-24 top-12 h-72 w-72 rounded-full bg-indigo-500/20 blur-3xl" />
      <div className="pointer-events-none absolute right-0 top-1/4 h-96 w-96 rounded-full bg-violet-500/15 blur-3xl" />
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-60 bg-gradient-to-t from-slate-950 via-slate-900/40 to-transparent blur-3xl" />

      <Link
        href="/"
        className="absolute left-4 top-4 z-20 rounded-full border border-white/10 bg-white/8 px-4 py-3 backdrop-blur-xl shadow-lg shadow-slate-950/10 sm:left-8 sm:top-8"
      >
        <div className="flex items-center gap-3 text-sm font-semibold text-white">
          <span className="flex h-9 w-9 items-center justify-center rounded-2xl bg-gradient-to-br from-indigo-500 to-violet-500 text-base shadow-lg shadow-indigo-500/20">
            L
          </span>
          <span>LeadFlow</span>
        </div>
      </Link>

      {children}
    </main>
  );
}
