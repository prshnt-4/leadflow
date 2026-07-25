import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface LeadPipelineProps {
  newLeads: number;
  contacted: number;
  qualified: number;
  proposal: number;
  won: number;
  lost: number;
}

const STAGES = [
  { key: "newLeads", label: "New", color: "bg-blue-500" },
  { key: "contacted", label: "Contacted", color: "bg-amber-500" },
  { key: "qualified", label: "Qualified", color: "bg-purple-500" },
  { key: "proposal", label: "Proposal", color: "bg-cyan-500" },
  { key: "won", label: "Won", color: "bg-emerald-500" },
  { key: "lost", label: "Lost", color: "bg-red-500" },
] as const;

export function LeadPipeline({
  newLeads,
  contacted,
  qualified,
  proposal,
  won,
  lost,
}: LeadPipelineProps) {
  const values: Record<(typeof STAGES)[number]["key"], number> = {
    newLeads,
    contacted,
    qualified,
    proposal,
    won,
    lost,
  };

  const max = Math.max(...Object.values(values), 1);

  return (
    <Card className="border-slate-800/70 bg-slate-900/80 text-white shadow-[0_10px_30px_rgba(2,8,23,0.24)] transition-all duration-300 hover:border-slate-700/80 hover:shadow-[0_15px_40px_rgba(2,8,23,0.4)]">
      <CardHeader>
        <CardTitle>Lead Pipeline</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {STAGES.map((stage) => {
          const count = values[stage.key];
          const width = Math.max((count / max) * 100, count > 0 ? 8 : 0);

          return (
            <div key={stage.key} className="space-y-2">
              <div className="flex items-center justify-between text-sm">
                <span className="text-slate-300">{stage.label}</span>
                <span className="font-medium text-white">{count}</span>
              </div>
              <div className="h-2 overflow-hidden rounded-full bg-slate-800">
                <div
                  className={`h-full rounded-full transition-all duration-500 ${stage.color}`}
                  style={{ width: `${width}%` }}
                />
              </div>
            </div>
          );
        })}
      </CardContent>
    </Card>
  );
}
