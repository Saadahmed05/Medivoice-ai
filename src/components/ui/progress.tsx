import * as React from "react";
import * as ProgressPrimitive from "@radix-ui/react-progress";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const progressVariants = cva(
  "relative w-full overflow-hidden rounded-full bg-slate-100",
  {
    variants: {
      size: {
        xs: "h-1",
        sm: "h-1.5",
        md: "h-2",
        lg: "h-3",
      },
    },
    defaultVariants: { size: "md" },
  }
);

interface ProgressProps
  extends React.ComponentPropsWithoutRef<typeof ProgressPrimitive.Root>,
    VariantProps<typeof progressVariants> {
  /** Use gradient fill */
  gradient?: boolean;
  /** Color variant */
  color?: "primary" | "accent" | "success" | "warning" | "danger";
}

const colorMap = {
  primary: "bg-primary-600",
  accent:  "bg-accent-500",
  success: "bg-green-500",
  warning: "bg-amber-500",
  danger:  "bg-red-500",
};

const gradientMap = {
  primary: "bg-gradient-to-r from-primary-500 to-primary-400",
  accent:  "bg-gradient-to-r from-accent-600 to-accent-400",
  success: "bg-gradient-to-r from-green-600 to-green-400",
  warning: "bg-gradient-to-r from-amber-600 to-amber-400",
  danger:  "bg-gradient-to-r from-red-600 to-red-400",
};

const Progress = React.forwardRef<
  React.ComponentRef<typeof ProgressPrimitive.Root>,
  ProgressProps
>(({ className, value, size, gradient = false, color = "primary", ...props }, ref) => (
  <ProgressPrimitive.Root
    ref={ref}
    className={cn(progressVariants({ size }), className)}
    {...props}
  >
    <ProgressPrimitive.Indicator
      className={cn(
        "h-full rounded-full transition-all duration-500 ease-out",
        gradient ? gradientMap[color] : colorMap[color]
      )}
      style={{ transform: `translateX(-${100 - (value ?? 0)}%)` }}
    />
  </ProgressPrimitive.Root>
));
Progress.displayName = ProgressPrimitive.Root.displayName;

// ─── Segmented Progress ───────────────────────────────────────────────────────

interface SegmentedProgressProps {
  segments: Array<{ value: number; color: string; label?: string }>;
  className?: string;
}

export function SegmentedProgress({ segments, className }: SegmentedProgressProps) {
  const total = segments.reduce((sum, s) => sum + s.value, 0);
  return (
    <div
      className={cn("flex h-2 w-full overflow-hidden rounded-full bg-slate-100", className)}
      role="progressbar"
      aria-valuenow={total}
      aria-valuemax={100}
    >
      {segments.map((seg, i) => (
        <div
          key={i}
          className="h-full transition-all duration-500"
          style={{
            width: `${seg.value}%`,
            backgroundColor: seg.color,
          }}
          title={seg.label}
        />
      ))}
    </div>
  );
}

export { Progress };
