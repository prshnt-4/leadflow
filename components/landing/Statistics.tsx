
const stats = [
  { label: "Pipeline Managed", value: "$1B+" },
  { label: "Teams using LeadFlow", value: "10,000+" },
  { label: "Uptime guarantee", value: "99.9%" },
  { label: "Average ROI increase", value: "150%" },
];

export function Statistics() {
  return (
    <section className="mx-auto max-w-7xl px-6 py-20 lg:px-8 border-y border-slate-800/60 bg-slate-900/30">
      <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => (
          <div key={stat.label} className="flex flex-col items-center justify-center text-center">
            <p className="text-5xl font-bold tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-indigo-400 sm:text-6xl">
              {stat.value}
            </p>
            <p className="mt-4 text-sm font-semibold uppercase tracking-widest text-slate-400">
              {stat.label}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
