import type React from "react";
import { cn } from "@/utils";

type OutlineBadgeTone = "muted" | "success" | "warning" | "primary";

interface OutlineBadgeProps {
  children: React.ReactNode;
  tone?: OutlineBadgeTone;
  className?: string;
}

export function OutlineBadge({ children, tone = "muted", className }: OutlineBadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center px-1.5 py-0.5 text-[10px] font-medium uppercase tracking-wide border",
        tone === "success"
          ? "text-success border-success/50"
          : tone === "warning"
            ? "text-warning border-warning/50"
            : tone === "primary"
              ? "text-primary border-primary/50"
              : "text-muted-foreground border-border",
        className,
      )}
    >
      {children}
    </span>
  );
}
