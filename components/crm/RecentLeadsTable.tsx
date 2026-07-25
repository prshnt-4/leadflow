"use client";

import { MoreHorizontal, Pencil, Trash2 } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface Lead {
  _id: string;
  name: string;
  email: string;
  company: string;
  phone: string;
  status: string;
  source: string;
}

interface Props {
  leads: Lead[];
}

export function RecentLeadsTable({ leads }: Props) {
  return (
    <Card className="border-slate-800/70 bg-slate-900/80 text-white shadow-[0_10px_30px_rgba(2,8,23,0.24)]">
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle>Recent Leads</CardTitle>

        <Button
          variant="outline"
          className="border-slate-700 bg-slate-950 text-slate-100 hover:bg-slate-800"
        >
          View all
        </Button>
      </CardHeader>

      <CardContent>
        <div className="overflow-x-auto">
          <table className="min-w-full text-left text-sm">
            <thead className="text-slate-400">
              <tr>
                <th className="pb-3">Lead</th>
                <th className="pb-3">Company</th>
                <th className="pb-3">Status</th>
                <th className="pb-3">Phone</th>
                <th className="pb-3">Source</th>
                <th className="pb-3">Actions</th>
              </tr>
            </thead>

            <tbody>
              {leads.map((lead) => (
                <tr key={lead._id} className="border-t border-slate-800">
                  <td className="py-3">
                    <p className="font-medium">{lead.name}</p>
                    <p className="text-slate-400">{lead.email}</p>
                  </td>

                  <td>{lead.company}</td>

                  <td>
                    <span className="rounded-full bg-cyan-500/10 px-2 py-1 text-cyan-400">
                      {lead.status}
                    </span>
                  </td>

                  <td>{lead.phone}</td>

                  <td>{lead.source}</td>

                  <td>
                    <div className="flex gap-2">
                      <Button variant="ghost" size="icon">
                        <Pencil size={16} />
                      </Button>

                      <Button variant="ghost" size="icon">
                        <Trash2 size={16} />
                      </Button>

                      <Button variant="ghost" size="icon">
                        <MoreHorizontal size={16} />
                      </Button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {leads.length === 0 && (
            <p className="py-6 text-center text-slate-400">
              No leads found.
            </p>
          )}
        </div>
      </CardContent>
    </Card>
  );
}