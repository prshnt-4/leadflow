import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function SettingsPage() {
  return (
    <div className="mx-auto w-full max-w-4xl space-y-6">
      <Card className="border-slate-800 bg-slate-900/80 text-white">
        <CardHeader>
          <CardTitle>Workspace Settings</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3 text-sm text-slate-400">
          <p>Customize your CRM experience, team visibility, and notification preferences.</p>
          <p>This section is intentionally mock-only for now.</p>
        </CardContent>
      </Card>
    </div>
  );
}
