import { cn } from "@/lib/utils";

type AuthAlertVariant = "error" | "success";

interface AuthAlertProps {
  variant: AuthAlertVariant;
  message: string;
  className?: string;
}

const styles: Record<AuthAlertVariant, string> = {
  error: "border-red-500/30 bg-red-500/10 text-red-200",
  success: "border-emerald-500/30 bg-emerald-500/10 text-emerald-200",
};

export function AuthAlert({ variant, message, className }: AuthAlertProps) {
  if (!message) {
    return null;
  }

  return (
    <div
      role="alert"
      className={cn(
        "rounded-xl border px-4 py-3 text-sm",
        styles[variant],
        className
      )}
    >
      {message}
    </div>
  );
}
