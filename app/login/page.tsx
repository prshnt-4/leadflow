"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";

export default function LoginPage() {

    const router = useRouter();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const handleLogin = async () => {
        try {
            setLoading(true);
            setError("");

            const response = await fetch("/api/auth/login", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ email, password }),
            });

            const data = await response.json();

            if (!response.ok) {
                setError(data.message || "Login failed. Please try again.");
                return;
            }

            console.log("Login successful:", data);
            router.push("/dashboard");
        } catch (error) {
            console.error("Login error:", error);
            setError("An unexpected error occurred. Please try again.");
        } finally {
            setLoading(false);
        }
    };


    return (
        <main className="relative flex min-h-screen items-center justify-center overflow-hidden px-4 py-12 text-white">
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-slate-800 via-slate-900 to-indigo-950" />
            <div
                className="pointer-events-none absolute inset-0"
                style={{
                    backgroundImage:
                        "linear-gradient(rgba(255,255,255,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.04) 1px, transparent 1px)",
                    backgroundSize: "72px 72px",
                    opacity: 0.18,
                }}
            />
            <div className="pointer-events-none absolute -left-24 top-12 h-72 w-72 rounded-full bg-indigo-500/20 blur-3xl" />
            <div className="pointer-events-none absolute right-0 top-1/4 h-96 w-96 rounded-full bg-violet-500/15 blur-3xl" />
            <div className="pointer-events-none absolute inset-x-0 bottom-0 h-60 bg-gradient-to-t from-slate-950 via-slate-900/40 to-transparent blur-3xl" />

            <Link href="/dashboard" className="absolute left-4 top-4 z-20 rounded-full border border-white/10 bg-white/8 px-4 py-3 backdrop-blur-xl shadow-lg shadow-slate-950/10 sm:left-8 sm:top-8">
                <div className="flex items-center gap-3 text-sm font-semibold text-white">
                    <span className="flex h-9 w-9 items-center justify-center rounded-2xl bg-gradient-to-br from-indigo-500 to-violet-500 text-base shadow-lg shadow-indigo-500/20">L</span>
                    <span>LeadFlow</span>
                </div>
            </Link>

            <Card className="relative w-full max-w-md overflow-hidden rounded-[2rem] border border-white/10 bg-white/8 shadow-[0_25px_80px_rgba(99,102,241,0.18)] backdrop-blur-xl transition-transform duration-700 ease-out hover:-translate-y-0.5 animate-fade-in-up">
                <div className="absolute inset-x-0 top-0 h-44 bg-[radial-gradient(circle_at_top,_rgba(99,102,241,0.18),transparent_38%)]" />
                <CardHeader className="relative z-10 space-y-4 px-8 pt-12">
                    <CardTitle className="text-5xl font-bold tracking-tight text-white">Welcome back</CardTitle>
                    <CardDescription className="max-w-xs text-base text-slate-300">
                        Sign in to your LeadFlow workspace and continue building your sales pipeline with confidence.
                    </CardDescription>
                </CardHeader>

                <CardContent className="relative z-10 space-y-6 px-8 pb-8 pt-2">
                    <div className="space-y-4">
                        <div>
                            <label className="mb-2 block text-sm font-medium text-slate-200">Email</label>
                            <div className="relative">
                                <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-4 text-slate-400">
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className="h-5 w-5">
                                        <path d="M3 7.5v9a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-9" />
                                        <path d="M4.5 7.5 12 13.5l7.5-6" />
                                    </svg>
                                </div>
                                <Input
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    placeholder="you@example.com"
                                    className="h-12 rounded-xl border border-white/10 bg-white/5 px-12 text-white placeholder:text-slate-500 focus:border-indigo-500 focus-visible:ring-2 focus-visible:ring-indigo-500/40"
                                />
                            </div>
                        </div>

                        <div>
                            <label className="mb-2 block text-sm font-medium text-slate-200">Password</label>
                            <div className="relative">
                                <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-4 text-slate-400">
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className="h-5 w-5">
                                        <rect x="5" y="10" width="14" height="10" rx="2" />
                                        <path d="M8 10V7a4 4 0 0 1 8 0v3" />
                                    </svg>
                                </div>
                                <Input
                                    type="password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    placeholder="••••••••"
                                    className="h-12 rounded-xl border border-white/10 bg-white/5 px-12 text-white placeholder:text-slate-500 focus:border-indigo-500 focus-visible:ring-2 focus-visible:ring-indigo-500/40"
                                />
                            </div>
                        </div>
                    </div>

                    <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                        <label className="inline-flex items-center gap-2 text-sm text-slate-300">
                            <input type="checkbox" className="h-4 w-4 rounded border-white/15 bg-slate-950 text-indigo-500 focus:ring-indigo-500" />
                            Remember me
                        </label>
                        <Link href="#" className="text-sm font-medium text-indigo-400 transition-colors duration-200 hover:text-indigo-200">
                            Forgot password?
                        </Link>
                    </div>

                    {error && (
                        <p className="text-sm text-red-400 text-center">
                            {error}
                        </p>
                    )}

                    <Button
                        onClick={handleLogin}
                        disabled={loading}
                        className="w-full rounded-xl bg-gradient-to-r from-indigo-500 to-violet-500 px-4 py-3 text-base font-semibold text-white shadow-lg shadow-violet-500/20 transition duration-300 ease-out hover:from-indigo-400 hover:to-violet-400 hover:scale-[1.01]"
                    >
                        {loading ? "Signing In..." : "Login"}
                    </Button>
                </CardContent>

                <CardFooter className="relative z-10 flex flex-col items-center justify-center gap-2 border-t border-white/10 bg-white/5 px-8 py-6 text-center text-sm text-slate-300 sm:flex-row sm:justify-between">
                    <p className="text-slate-300/90">Don&apos;t have an account?</p>
                    <Link href="/signup" className="font-semibold text-indigo-400 transition-colors duration-200 hover:text-indigo-200">
                        Create one
                    </Link>
                </CardFooter>
            </Card>
        </main>
    );
}
