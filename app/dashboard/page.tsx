import { LeadStats } from "@/components/crm/LeadStats";
import { RecentLeadsTable } from "@/components/crm/RecentLeadsTable";
import { getDashboardStats } from "@/lib/api/dashboard";

async function getLeads() {
    try {
        const baseUrl = process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3001";

        const res = await fetch(`${baseUrl}/api/leads`, {
            cache: "no-store",
        });

        const data = await res.json();
        return data.data || [];
    } catch (error) {
        console.error("Failed to fetch leads:", error);
        return [];
    }
}

export default async function DashboardPage() {
    const leads = await getLeads();

    const stats = await getDashboardStats();

    return (
        <div className="space-y-6">
            <section className="rounded-3xl border border-slate-800/70 bg-[linear-gradient(135deg,rgba(15,23,42,0.95),rgba(8,15,32,0.9))] p-6 shadow-[0_20px_60px_rgba(2,8,23,0.3)]">
                <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
                    <div>
                        <p className="text-sm font-medium uppercase tracking-[0.3em] text-cyan-400">
                            Operations overview
                        </p>

                        <h2 className="mt-2 text-3xl font-semibold text-white">
                            Run your pipeline with clarity
                        </h2>

                        <p className="mt-3 max-w-2xl text-sm text-slate-400 sm:text-base">
                            Keep every lead, follow-up, and opportunity aligned in a single
                            workspace designed for modern teams.
                        </p>
                    </div>

                    <div className="rounded-2xl border border-slate-800 bg-slate-950/80 px-4 py-3 text-sm text-slate-300">
                        <p className="font-medium text-white">Next review</p>
                        <p className="mt-1 text-slate-400">Thursday · 2:30 PM</p>
                    </div>
                </div>
            </section>

            <LeadStats
                total={stats.totalLeads}
                newLeads={stats.newLeads}
                contacted={stats.contacted}
                qualified={stats.qualified}
                won={stats.won}
                lost={stats.lost}
            />

            <RecentLeadsTable leads={leads.slice(0, 5)} />
        </div>
    );
}