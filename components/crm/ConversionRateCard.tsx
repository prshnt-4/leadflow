import { ArrowUpRight, TrendingUp } from "lucide-react";

import { Card, CardContent } from "@/components/ui/card";

interface ConversionRateCardProps {
  won: number;
  lost: number;
  total: number;
}

export function ConversionRateCard({
  won,
  lost,
  total,
}: ConversionRateCardProps) {
  const closed = won + lost;
  const rate = closed > 0 ? Math.round((won / closed) * 100) : 0;
  const winShare = total > 0 ? Math.round((won / total) * 100) : 0;

  return (
    <Card className="group border-slate-800/70 bg-slate-900/80 text-white shadow-[0_4px_20px_rgba(2,8,23,0.1)] transition-all duration-300 hover:-translate-y-1 hover:border-cyan-500/50 hover:shadow-[0_10px_30px_rgba(34,211,238,0.15)]">
      <CardContent className="p-5">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-sm text-slate-400 transition-colors group-hover:text-cyan-100/70">
              Conversion Rate
            </p>
            <div className="mt-3 flex items-end gap-3">
              <p className="text-4xl font-bold">{rate}%</p>
              <span className="mb-1 inline-flex items-center gap-1 rounded-full bg-emerald-500/10 px-2 py-0.5 text-xs font-medium text-emerald-400">
                <TrendingUp className="h-3 w-3" />
                Won / closed
              </span>
            </div>
            <p className="mt-2 text-sm text-slate-400">
              {won} won of {closed} closed leads · {winShare}% of pipeline
            </p>
          </div>

          <span className="self-start rounded-full bg-cyan-500/10 p-2 text-cyan-400 transition-all duration-300 group-hover:scale-110 group-hover:bg-cyan-500/20 group-hover:shadow-[0_0_15px_rgba(34,211,238,0.2)] sm:self-center">
            <ArrowUpRight className="h-4 w-4" />
          </span>
        </div>
      </CardContent>
    </Card>
  );
}
