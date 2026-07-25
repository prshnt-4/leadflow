"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Bell, Menu, Search } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface TopbarProps {
  onMenuClick?: () => void;
}

interface SessionUser {
  name: string;
  email: string;
}

function getInitials(name: string): string {
  return name
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase() ?? "")
    .join("");
}

export function Topbar({ onMenuClick }: TopbarProps) {
  const router = useRouter();
  const [user, setUser] = useState<SessionUser | null>(null);

  useEffect(() => {
    let active = true;

    async function loadSession() {
      try {
        const response = await fetch("/api/auth/session");
        if (!response.ok) {
          return;
        }

        const data = await response.json();
        if (active && data.user) {
          setUser(data.user);
        }
      } catch {
        // Session fetch is best-effort for display only.
      }
    }

    loadSession();

    return () => {
      active = false;
    };
  }, []);

  const signOut = async () => {
    try {
      await fetch("/api/auth/logout", { method: "POST" });
    } catch {
      // ignore
    }

    router.push("/login");
    router.refresh();
  };

  return (
    <header className="flex flex-col gap-4 border-b border-slate-800/80 bg-slate-950/85 px-4 py-4 backdrop-blur sm:px-6 lg:px-8 lg:flex-row lg:items-center lg:justify-between">
      <div className="flex items-center gap-3">
        <Button
          variant="outline"
          size="icon"
          onClick={onMenuClick}
          className="border-slate-800 bg-slate-900 text-slate-100 hover:bg-slate-800 lg:hidden"
          aria-label="Open navigation menu"
        >
          <Menu className="h-4 w-4" />
        </Button>

        <div>
          <p className="text-sm text-slate-400">
            Welcome back{user?.name ? `, ${user.name.split(" ")[0]}` : ""}
          </p>
          <h1 className="text-xl font-semibold text-white">LeadFlow CRM</h1>
        </div>
      </div>

      <div className="flex w-full flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
        <div className="relative flex-1 min-w-0">
          <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
          <Input
            placeholder="Global search (coming soon)"
            disabled
            title="Global search is not enabled yet"
            className="h-10 w-full max-w-full rounded-2xl border-slate-800 bg-slate-900/80 pl-9 text-sm text-slate-100 shadow-inner opacity-80"
          />
        </div>

        <div className="flex items-center gap-3">
          <Button variant="outline" size="icon" className="border-slate-800 bg-slate-900 text-slate-100 hover:bg-slate-800">
            <Bell className="h-4 w-4" />
          </Button>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="rounded-full p-1">
                <Avatar className="h-9 w-9 border border-slate-800">
                  <AvatarFallback className="bg-cyan-500/20 text-cyan-300">
                    {user ? getInitials(user.name) : "LF"}
                  </AvatarFallback>
                </Avatar>
              </Button>
            </DropdownMenuTrigger>

            <DropdownMenuContent align="end" className="w-56">
              <DropdownMenuLabel>
                {user ? (
                  <div className="space-y-1">
                    <p>{user.name}</p>
                    <p className="text-xs font-normal text-slate-400">
                      {user.email}
                    </p>
                  </div>
                ) : (
                  "My Account"
                )}
              </DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={() => (window.location.href = "/dashboard/profile")}>Profile</DropdownMenuItem>
              <DropdownMenuItem onClick={() => (window.location.href = "/dashboard/settings")}>Settings</DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={signOut}>Sign out</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  );
}
