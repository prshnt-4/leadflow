"use client";

import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { FormEvent, Suspense, useState } from "react";

import { AuthAlert } from "@/components/auth/AuthAlert";
import { AuthLayout } from "@/components/auth/AuthLayout";
import { LoadingSpinner } from "@/components/auth/LoadingSpinner";
import { PasswordInput } from "@/components/auth/PasswordInput";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  getFirstError,
  validateLoginForm,
  type FieldErrors,
} from "@/lib/auth/validation";

function LoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const redirectTo = searchParams.get("redirect") ?? "/dashboard";

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [fieldErrors, setFieldErrors] = useState<FieldErrors>({});

  const handleLogin = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const validationErrors = validateLoginForm(email, password);
    setFieldErrors(validationErrors);

    if (Object.keys(validationErrors).length > 0) {
      setError(getFirstError(validationErrors));
      setSuccess("");
      return;
    }

    try {
      setLoading(true);
      setError("");
      setSuccess("");

      const response = await fetch("/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password, rememberMe }),
      });

      const data = await response.json();

      if (!response.ok) {
        setError(data.message || "Login failed. Please try again.");
        return;
      }

      setSuccess(data.message || "Login successful. Redirecting...");
      router.push(redirectTo);
      router.refresh();
    } catch {
      setError("An unexpected error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card className="relative w-full max-w-md overflow-hidden rounded-[2rem] border border-white/10 bg-white/8 shadow-[0_25px_80px_rgba(99,102,241,0.18)] backdrop-blur-xl transition-transform duration-700 ease-out hover:-translate-y-0.5 animate-fade-in-up">
      <div className="absolute inset-x-0 top-0 h-44 bg-[radial-gradient(circle_at_top,_rgba(99,102,241,0.18),transparent_38%)]" />
      <CardHeader className="relative z-10 space-y-4 px-6 pt-12 sm:px-8">
        <CardTitle className="text-4xl font-bold tracking-tight text-white sm:text-5xl">
          Welcome back
        </CardTitle>
        <CardDescription className="max-w-xs text-base text-slate-300">
          Sign in to your LeadFlow workspace and continue building your sales
          pipeline with confidence.
        </CardDescription>
      </CardHeader>

      <CardContent className="relative z-10 space-y-6 px-6 pb-8 pt-2 sm:px-8">
        <form onSubmit={handleLogin} className="space-y-6" noValidate>
          <div className="space-y-4">
            <div>
              <label
                htmlFor="email"
                className="mb-2 block text-sm font-medium text-slate-200"
              >
                Email
              </label>
              <div className="relative">
                <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-4 text-slate-400">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.8"
                    className="h-5 w-5"
                  >
                    <path d="M3 7.5v9a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-9" />
                    <path d="M4.5 7.5 12 13.5l7.5-6" />
                  </svg>
                </div>
                <Input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(event) => setEmail(event.target.value)}
                  placeholder="you@example.com"
                  autoComplete="email"
                  disabled={loading}
                  aria-invalid={Boolean(fieldErrors.email)}
                  aria-describedby={
                    fieldErrors.email ? "email-error" : undefined
                  }
                  className="h-12 rounded-xl border border-white/10 bg-white/5 px-12 text-white placeholder:text-slate-500 focus:border-indigo-500 focus-visible:ring-2 focus-visible:ring-indigo-500/40"
                />
              </div>
              {fieldErrors.email ? (
                <p id="email-error" className="mt-1.5 text-sm text-red-400">
                  {fieldErrors.email}
                </p>
              ) : null}
            </div>

            <div>
              <label
                htmlFor="password"
                className="mb-2 block text-sm font-medium text-slate-200"
              >
                Password
              </label>
              <PasswordInput
                id="password"
                value={password}
                onChange={setPassword}
                error={fieldErrors.password}
                disabled={loading}
              />
            </div>
          </div>

          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <label className="inline-flex items-center gap-2 text-sm text-slate-300">
              <input
                type="checkbox"
                checked={rememberMe}
                onChange={(event) => setRememberMe(event.target.checked)}
                disabled={loading}
                className="h-4 w-4 rounded border-white/15 bg-slate-950 text-indigo-500 focus:ring-indigo-500"
              />
              Remember me
            </label>
            <Link
              href="/forgot-password"
              className="text-sm font-medium text-indigo-400 transition-colors duration-200 hover:text-indigo-200"
            >
              Forgot password?
            </Link>
          </div>

          <AuthAlert variant="error" message={error} />
          <AuthAlert variant="success" message={success} />

          <Button
            type="submit"
            disabled={loading}
            className="w-full rounded-xl bg-gradient-to-r from-indigo-500 to-violet-500 px-4 py-3 text-base font-semibold text-white shadow-lg shadow-violet-500/20 transition-all duration-300 ease-out hover:scale-[1.02] hover:from-indigo-400 hover:to-violet-400 hover:shadow-indigo-500/30 active:scale-95 disabled:opacity-70"
          >
            {loading ? <LoadingSpinner label="Signing in..." /> : "Login"}
          </Button>
        </form>
      </CardContent>

      <CardFooter className="relative z-10 flex flex-col items-center justify-center gap-2 border-t border-white/10 bg-white/5 px-8 py-6 text-center text-sm text-slate-300 sm:flex-row sm:justify-between">
        <p className="text-slate-300/90">Don&apos;t have an account?</p>
        <Link
          href="/signup"
          className="font-semibold text-indigo-400 transition-colors duration-200 hover:text-indigo-200"
        >
          Create one
        </Link>
      </CardFooter>
    </Card>
  );
}

export default function LoginPage() {
  return (
    <AuthLayout>
      <Suspense
        fallback={
          <div className="flex w-full max-w-md items-center justify-center rounded-[2rem] border border-white/10 bg-white/8 p-12 backdrop-blur-xl">
            <LoadingSpinner label="Loading..." />
          </div>
        }
      >
        <LoginForm />
      </Suspense>
    </AuthLayout>
  );
}
