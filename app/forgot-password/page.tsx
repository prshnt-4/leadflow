"use client";

import Link from "next/link";
import { FormEvent, useState } from "react";

import { AuthAlert } from "@/components/auth/AuthAlert";
import { AuthLayout } from "@/components/auth/AuthLayout";
import { LoadingSpinner } from "@/components/auth/LoadingSpinner";
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
  validateForgotPasswordForm,
  type FieldErrors,
} from "@/lib/auth/validation";

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [fieldErrors, setFieldErrors] = useState<FieldErrors>({});

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const validationErrors = validateForgotPasswordForm(email);
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

      const response = await fetch("/api/auth/forgot-password", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      });

      const data = await response.json();

      if (!response.ok) {
        setError(data.message || "Unable to process your request.");
        return;
      }

      setSuccess(
        data.message ||
          "If an account with that email exists, you'll receive reset instructions shortly."
      );
      setEmail("");
      setFieldErrors({});
    } catch {
      setError("An unexpected error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthLayout>
      <Card className="relative w-full max-w-md overflow-hidden rounded-[2rem] border border-white/10 bg-white/8 shadow-[0_25px_80px_rgba(99,102,241,0.18)] backdrop-blur-xl transition-transform duration-700 ease-out hover:-translate-y-0.5 animate-fade-in-up">
        <div className="absolute inset-x-0 top-0 h-44 bg-[radial-gradient(circle_at_top,_rgba(99,102,241,0.18),transparent_38%)]" />
        <CardHeader className="relative z-10 space-y-4 px-6 pt-12 sm:px-8">
          <CardTitle className="text-4xl font-bold tracking-tight text-white sm:text-5xl">
            Reset password
          </CardTitle>
          <CardDescription className="max-w-xs text-base text-slate-300">
            Enter your email and we&apos;ll send you instructions to reset your
            password.
          </CardDescription>
        </CardHeader>

        <CardContent className="relative z-10 space-y-6 px-6 pb-8 pt-2 sm:px-8">
          <form onSubmit={handleSubmit} className="space-y-6" noValidate>
            <div>
              <label
                htmlFor="email"
                className="mb-2 block text-sm font-medium text-slate-200"
              >
                Email
              </label>
              <Input
                id="email"
                type="email"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                placeholder="you@example.com"
                autoComplete="email"
                disabled={loading}
                aria-invalid={Boolean(fieldErrors.email)}
                aria-describedby={fieldErrors.email ? "email-error" : undefined}
                className="h-12 rounded-xl border border-white/10 bg-white/5 px-4 text-white placeholder:text-slate-500 focus:border-indigo-500 focus-visible:ring-2 focus-visible:ring-indigo-500/40"
              />
              {fieldErrors.email ? (
                <p id="email-error" className="mt-1.5 text-sm text-red-400">
                  {fieldErrors.email}
                </p>
              ) : null}
            </div>

            <AuthAlert variant="error" message={error} />
            <AuthAlert variant="success" message={success} />

            <Button
              type="submit"
              disabled={loading}
              className="w-full rounded-xl bg-gradient-to-r from-indigo-500 to-violet-500 px-4 py-3 text-base font-semibold text-white shadow-lg shadow-violet-500/20 transition-all duration-300 ease-out hover:scale-[1.02] hover:from-indigo-400 hover:to-violet-400 hover:shadow-indigo-500/30 active:scale-95 disabled:opacity-70"
            >
              {loading ? (
                <LoadingSpinner label="Sending instructions..." />
              ) : (
                "Send reset link"
              )}
            </Button>
          </form>
        </CardContent>

        <CardFooter className="relative z-10 flex flex-col items-center justify-center gap-2 border-t border-white/10 bg-white/5 px-8 py-6 text-center text-sm text-slate-300 sm:flex-row sm:justify-between">
          <p className="text-slate-300/90">Remember your password?</p>
          <Link
            href="/login"
            className="font-semibold text-indigo-400 transition-colors duration-200 hover:text-indigo-200"
          >
            Back to sign in
          </Link>
        </CardFooter>
      </Card>
    </AuthLayout>
  );
}
