"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function ProfilePage() {
  // Placeholder user data — integrate with backend/session when available
  const user = {
    name: "Jordan Rivera",
    email: "jordan@company.com",
    joined: "2024-05-12",
  };

  return (
    <div className="mx-auto max-w-3xl space-y-6">
      <div className="rounded-lg border border-slate-800/70 bg-slate-900/80 p-6">
        <h2 className="text-2xl font-semibold text-white">Profile</h2>
        <p className="mt-2 text-sm text-slate-400">Manage your personal information.</p>

        <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div>
            <p className="text-sm text-slate-400">Name</p>
            <p className="mt-1 text-base font-medium text-white">{user.name}</p>
          </div>
          <div>
            <p className="text-sm text-slate-400">Email</p>
            <p className="mt-1 text-base font-medium text-white">{user.email}</p>
          </div>
          <div>
            <p className="text-sm text-slate-400">Joined</p>
            <p className="mt-1 text-base font-medium text-white">{new Date(user.joined).toLocaleDateString()}</p>
          </div>
        </div>

        <div className="mt-6 flex items-center gap-3">
          <Button className="rounded-md">Edit Profile</Button>
          <Link href="/dashboard" className="text-sm text-slate-400 hover:text-slate-200">Back to dashboard</Link>
        </div>
      </div>
    </div>
  );
}
