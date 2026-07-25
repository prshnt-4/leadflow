"use client";
import * as React from "react";
import { cn } from "@/lib/utils";
const Context = React.createContext<{ open: boolean; toggle: () => void; close: () => void } | null>(null);
export function DropdownMenu({ children }: { children: React.ReactNode }) { const [open, setOpen] = React.useState(false); return <Context.Provider value={{ open, toggle: () => setOpen((value) => !value), close: () => setOpen(false) }}>{children}</Context.Provider>; }
type TriggerProps = { onClick?: React.MouseEventHandler<HTMLElement>; "aria-haspopup"?: "menu"; "aria-expanded"?: boolean };
export function DropdownMenuTrigger({ children }: { children: React.ReactElement<TriggerProps>; asChild?: boolean }) { const context = React.useContext(Context); return React.cloneElement(children, { "aria-haspopup": "menu", "aria-expanded": context?.open, onClick: () => context?.toggle() }); }
export function DropdownMenuContent({ className, children }: React.HTMLAttributes<HTMLDivElement> & { align?: string }) { const context = React.useContext(Context); if (!context?.open) return null; return <div role="menu" className={cn("absolute right-4 z-50 min-w-48 rounded-md border bg-white p-1 text-slate-950 shadow-md", className)}>{children}</div>; }
export function DropdownMenuItem({ className, onClick, ...props }: React.ButtonHTMLAttributes<HTMLButtonElement>) { const context = React.useContext(Context); return <button type="button" role="menuitem" className={cn("flex w-full rounded px-2 py-1.5 text-left text-sm hover:bg-slate-100", className)} onClick={(event) => { onClick?.(event); context?.close(); }} {...props} />; }
export const DropdownMenuLabel = ({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) => <div className={cn("px-2 py-1.5 text-sm font-semibold", className)} {...props} />;
export const DropdownMenuSeparator = ({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) => <div className={cn("my-1 h-px bg-slate-200", className)} {...props} />;
