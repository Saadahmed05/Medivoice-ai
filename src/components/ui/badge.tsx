import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const badgeVariants = cva(
  [
    "inline-flex items-center gap-1.5 rounded-full border px-2 py-0.5",
    "text-xs font-medium transition-colors duration-150 select-none",
    "leading-none",
  ],
  {
    variants: {
      variant: {
        // Semantic — Apple/Stripe color system
        default:     "bg-primary-50  text-primary-700  border-primary-100",
        secondary:   "bg-slate-100   text-slate-600    border-slate-200",
        success:     "bg-green-50    text-green-700    border-green-100",
        warning:     "bg-amber-50    text-amber-700    border-amber-100",
        destructive: "bg-red-50      text-red-700      border-red-100",
        accent:      "bg-teal-50     text-teal-700     border-teal-100",
        purple:      "bg-purple-50   text-purple-700   border-purple-100",
        orange:      "bg-orange-50   text-orange-700   border-orange-100",
        // Solid variants
        "solid-default":     "bg-primary-600  text-white border-primary-600",
        "solid-success":     "bg-green-500    text-white border-green-500",
        "solid-destructive": "bg-red-500      text-white border-red-500",
        "solid-warning":     "bg-amber-500    text-white border-amber-500",
        // Outline only
        outline: "bg-transparent text-slate-600 border-slate-300",
      },
      size: {
        sm: "text-[10px] px-1.5 py-0",
        md: "text-xs px-2 py-0.5",
        lg: "text-sm px-2.5 py-1 rounded-lg",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "md",
    },
  }
);

export interface BadgeProps
  extends React.HTMLAttributes<HTMLSpanElement>,
    VariantProps<typeof badgeVariants> {
  /** Show an animated pulse dot before the label */
  pulse?: boolean;
}

function Badge({ className, variant, size, pulse = false, children, ...props }: BadgeProps) {
  const pulseColor =
    variant === "destructive" || variant === "solid-destructive"
      ? "bg-red-500"
      : variant === "success" || variant === "solid-success"
      ? "bg-green-500"
      : variant === "warning" || variant === "solid-warning"
      ? "bg-amber-500"
      : variant === "accent"
      ? "bg-teal-500"
      : "bg-primary-500";

  return (
    <span className={cn(badgeVariants({ variant, size }), className)} {...props}>
      {pulse && (
        <span className="relative flex h-1.5 w-1.5 shrink-0" aria-hidden="true">
          <span
            className={cn(
              "animate-ping absolute inline-flex h-full w-full rounded-full opacity-75",
              pulseColor
            )}
          />
          <span
            className={cn("relative inline-flex h-1.5 w-1.5 rounded-full", pulseColor)}
          />
        </span>
      )}
      {children}
    </span>
  );
}

export { Badge, badgeVariants };
