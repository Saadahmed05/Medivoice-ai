import * as React from "react";
import { cn } from "@/lib/utils";

// ─── Card ─────────────────────────────────────────────────────────────────────

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Subtle lift on hover — Linear / Stripe style */
  hoverable?: boolean;
  /** Flat card with only a border, no shadow */
  flat?: boolean;
  /** Use a dashed border — for empty states / upload zones */
  dashed?: boolean;
}

const Card = React.forwardRef<HTMLDivElement, CardProps>(
  ({ className, hoverable = false, flat = false, dashed = false, ...props }, ref) => (
    <div
      ref={ref}
      className={cn(
        // Base
        "rounded-2xl bg-white",
        // Border & shadow
        !flat && !dashed && [
          "border border-slate-200/80",
          "shadow-[0_0_0_1px_rgba(0,0,0,0.03),0_2px_4px_rgba(0,0,0,0.04),0_4px_8px_-2px_rgba(0,0,0,0.04)]",
        ],
        flat && "border border-slate-200",
        dashed && "border-2 border-dashed border-slate-200 bg-slate-50/50",
        // Hover
        hoverable && [
          "transition-all duration-200 cursor-pointer",
          "hover:border-slate-300/80",
          "hover:shadow-[0_0_0_1px_rgba(0,0,0,0.05),0_4px_8px_rgba(0,0,0,0.06),0_12px_24px_-4px_rgba(0,0,0,0.07)]",
          "hover:-translate-y-px",
        ],
        className
      )}
      {...props}
    />
  )
);
Card.displayName = "Card";

// ─── CardHeader ───────────────────────────────────────────────────────────────

const CardHeader = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("flex flex-col space-y-1 p-6", className)}
    {...props}
  />
));
CardHeader.displayName = "CardHeader";

// ─── CardTitle ────────────────────────────────────────────────────────────────

const CardTitle = React.forwardRef<
  HTMLHeadingElement,
  React.HTMLAttributes<HTMLHeadingElement>
>(({ className, ...props }, ref) => (
  <h3
    ref={ref}
    className={cn(
      "font-heading text-[15px] font-semibold leading-none tracking-[-0.01em] text-slate-900",
      className
    )}
    {...props}
  />
));
CardTitle.displayName = "CardTitle";

// ─── CardDescription ──────────────────────────────────────────────────────────

const CardDescription = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLParagraphElement>
>(({ className, ...props }, ref) => (
  <p
    ref={ref}
    className={cn("text-sm text-slate-500 leading-relaxed mt-0.5", className)}
    {...props}
  />
));
CardDescription.displayName = "CardDescription";

// ─── CardContent ──────────────────────────────────────────────────────────────

const CardContent = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div ref={ref} className={cn("p-6 pt-0", className)} {...props} />
));
CardContent.displayName = "CardContent";

// ─── CardFooter ───────────────────────────────────────────────────────────────

const CardFooter = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn(
      "flex items-center p-6 pt-0",
      className
    )}
    {...props}
  />
));
CardFooter.displayName = "CardFooter";

// ─── CardDivider ──────────────────────────────────────────────────────────────

function CardDivider({ className }: { className?: string }) {
  return <div className={cn("mx-6 h-px bg-slate-100", className)} />;
}

export {
  Card,
  CardContent,
  CardDescription,
  CardDivider,
  CardFooter,
  CardHeader,
  CardTitle,
};
