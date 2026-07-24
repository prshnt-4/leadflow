const brands = ["Northstar", "Lumen", "Vertex", "Brightlane", "Apex" ];

export function TrustedBy() {
  return (
    <section className="border-y border-slate-200 bg-slate-50/70 py-10">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <p className="text-center text-sm font-semibold uppercase tracking-[0.3em] text-slate-500">
          Trusted by growing teams
        </p>
        <div className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-5">
          {brands.map((brand) => (
            <div
              key={brand}
              className="flex items-center justify-center rounded-full border border-slate-200 bg-white px-4 py-3 text-sm font-semibold text-slate-600 shadow-sm"
            >
              {brand}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
