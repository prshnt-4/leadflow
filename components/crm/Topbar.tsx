import { Bell, Search, Settings2 } from "lucide-react";

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

export function Topbar() {
  return (
    <header className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-800/80 bg-slate-950/85 px-4 py-4 backdrop-blur sm:px-6 lg:px-8">
      <div className="flex items-center gap-3">
        <div className="rounded-2xl border border-slate-800 bg-slate-900 p-2 lg:hidden">
          <Settings2 className="h-4 w-4 text-slate-400" />
        </div>
        <div>
          <p className="text-sm text-slate-400">Welcome back</p>
          <h1 className="text-xl font-semibold text-white">LeadFlow CRM</h1>
        </div>
      </div>

      <div className="flex flex-1 items-center gap-3 lg:max-w-xl">
        <div className="relative flex-1">
          <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
          <Input placeholder="Search leads or contacts" className="h-10 rounded-2xl border-slate-800 bg-slate-900/80 pl-9 text-sm text-slate-100 shadow-inner" />
        </div>
        <Button variant="outline" size="icon" className="border-slate-800 bg-slate-900 text-slate-100 hover:bg-slate-800">
          <Bell className="h-4 w-4" />
        </Button>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="rounded-full p-1">
              <Avatar className="h-9 w-9 border border-slate-800">
                <AvatarFallback className="bg-cyan-500/20 text-cyan-300">JD</AvatarFallback>
              </Avatar>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-56">
            <DropdownMenuLabel>My Account</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem>Profile</DropdownMenuItem>
            <DropdownMenuItem>Billing</DropdownMenuItem>
            <DropdownMenuItem>Sign out</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
}
