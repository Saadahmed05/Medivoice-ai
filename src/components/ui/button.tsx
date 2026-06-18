import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const buttonVariants = cva(
  // Base — Stripe-quality button foundation
  [
    "inline-flex items-center justify-center gap-2 whitespace-nowrap",
    "rounded-[10px] text-sm font-medium leading-none",
    "transition-all duration-150 ease-out",
    "focus-visible:outline-none focus-visible:ring-[3px] focus-visible:ring-primary-500/20 focus-visible:ring-offset-0",
    "disabled:pointer-events-none disabled:opacity-50",
    "active:scale-[0.97]",
    "select-none",
    "[&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",
  ],
  {
    variants: {
      variant: {
        // Primary — blue, Stripe-style shadow
        default: [
          "bg-primary-600 text-white",
          "shadow-[0_1px_2px_rgba(0,0,0,0.12),0_1px_0_rgba(255,255,255,0.08)_inset,0_-1px_0_rgba(0,0,0,0.12)_inset]",
          "hover:bg-primary-700",
          "hover:shadow-[0_2px_4px_rgba(0,0,0,0.14),0_1px_0_rgba(255,255,255,0.08)_inset,0_-1px_0_rgba(0,0,0,0.12)_inset]",
          "active:bg-primary-800",
        ],
        // Destructive
        destructive: [
          "bg-red-500 text-white",
          "shadow-[0_1px_2px_rgba(0,0,0,0.12),0_-1px_0_rgba(0,0,0,0.12)_inset]",
          "hover:bg-red-600",
        ],
        // Secondary — white with border (Linear-style)
        secondary: [
          "bg-white text-slate-700 border border-slate-200",
          "shadow-[0_1px_2px_rgba(0,0,0,0.04),0_1px_0_rgba(255,255,255,0.9)_inset]",
          "hover:bg-slate-50 hover:border-slate-300 hover:text-slate-900",
          "active:bg-slate-100",
        ],
        // Outline — transparent with border
        outline: [
          "bg-transparent text-slate-700 border border-slate-200",
          "hover:bg-slate-50 hover:text-slate-900 hover:border-slate-300",
          "active:bg-slate-100",
        ],
        // Ghost — no border, subtle hover
        ghost: [
          "bg-transparent text-slate-600",
          "hover:bg-slate-100 hover:text-slate-900",
          "active:bg-slate-200",
        ],
        // Link
        link: [
          "bg-transparent text-primary-600 underline-offset-4",
          "hover:text-primary-700 hover:underline",
          "active:text-primary-800",
        ],
        // Accent (teal/AI)
        accent: [
          "bg-accent-500 text-white",
          "shadow-[0_1px_2px_rgba(0,0,0,0.12),0_-1px_0_rgba(0,0,0,0.12)_inset]",
          "hover:bg-accent-600",
        ],
      },
      size: {
        xs:      "h-7 px-2.5 text-xs rounded-lg",
        sm:      "h-8 px-3 text-xs",
        default: "h-9 px-4",
        lg:      "h-10 px-5 text-sm rounded-xl",
        xl:      "h-12 px-6 text-base rounded-xl",
        "icon-xs":  "h-7 w-7 rounded-lg",
        "icon-sm":  "h-8 w-8",
        icon:       "h-9 w-9",
        "icon-lg":  "h-10 w-10 rounded-xl",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
  loading?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    { className, variant, size, asChild = false, loading = false, children, disabled, ...props },
    ref
  ) => {
    const Comp = asChild ? Slot : "button";

    return (
      <Comp
        ref={ref}
        disabled={disabled ?? loading}
        aria-busy={loading}
        className={cn(buttonVariants({ variant, size }), className)}
        {...props}
      >
        {loading ? (
          <>
            <span
              className="h-3.5 w-3.5 animate-spin rounded-full border-2 border-current border-t-transparent"
              aria-hidden="true"
            />
            <span className="sr-only">Loading…</span>
          </>
        ) : (
          children
        )}
      </Comp>
    );
  }
);
Button.displayName = "Button";

export { Button, buttonVariants };
