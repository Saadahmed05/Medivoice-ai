import * as React from "react";
import * as AvatarPrimitive from "@radix-ui/react-avatar";
import { cn, getInitials } from "@/lib/utils";

// ─── Primitives ───────────────────────────────────────────────────────────────

const AvatarRoot = React.forwardRef<
  React.ComponentRef<typeof AvatarPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof AvatarPrimitive.Root>
>(({ className, ...props }, ref) => (
  <AvatarPrimitive.Root
    ref={ref}
    className={cn("relative flex shrink-0 overflow-hidden rounded-full", className)}
    {...props}
  />
));
AvatarRoot.displayName = AvatarPrimitive.Root.displayName;

const AvatarImage = React.forwardRef<
  React.ComponentRef<typeof AvatarPrimitive.Image>,
  React.ComponentPropsWithoutRef<typeof AvatarPrimitive.Image>
>(({ className, ...props }, ref) => (
  <AvatarPrimitive.Image
    ref={ref}
    className={cn("aspect-square h-full w-full object-cover", className)}
    {...props}
  />
));
AvatarImage.displayName = AvatarPrimitive.Image.displayName;

const AvatarFallback = React.forwardRef<
  React.ComponentRef<typeof AvatarPrimitive.Fallback>,
  React.ComponentPropsWithoutRef<typeof AvatarPrimitive.Fallback>
>(({ className, ...props }, ref) => (
  <AvatarPrimitive.Fallback
    ref={ref}
    className={cn(
      "flex h-full w-full items-center justify-center rounded-full",
      // Premium gradient fallback — Blue → Teal
      "bg-gradient-to-br from-primary-500 to-accent-500",
      "text-white font-semibold tracking-tight",
      className
    )}
    {...props}
  />
));
AvatarFallback.displayName = AvatarPrimitive.Fallback.displayName;

// ─── Composed Avatar ──────────────────────────────────────────────────────────

export type AvatarSize = "xs" | "sm" | "md" | "lg" | "xl" | "2xl";

const sizeClasses: Record<AvatarSize, string> = {
  xs:  "h-6 w-6 text-[9px]",
  sm:  "h-7 w-7 text-[10px]",
  md:  "h-9 w-9 text-xs",
  lg:  "h-11 w-11 text-sm",
  xl:  "h-14 w-14 text-base",
  "2xl": "h-20 w-20 text-xl",
};

const ringClasses: Record<AvatarSize, string> = {
  xs:    "ring-1",
  sm:    "ring-[1.5px]",
  md:    "ring-2",
  lg:    "ring-2",
  xl:    "ring-2",
  "2xl": "ring-[3px]",
};

const statusSizeClasses: Record<AvatarSize, string> = {
  xs:    "h-1.5 w-1.5",
  sm:    "h-2 w-2",
  md:    "h-2.5 w-2.5",
  lg:    "h-3 w-3",
  xl:    "h-3.5 w-3.5",
  "2xl": "h-4 w-4",
};

const statusColors = {
  online:  "bg-green-500",
  offline: "bg-slate-300",
  busy:    "bg-red-500",
  away:    "bg-amber-400",
} as const;

interface AvatarProps {
  src?: string;
  name: string;
  size?: AvatarSize;
  className?: string;
  status?: keyof typeof statusColors;
}

export function Avatar({ src, name, size = "md", className, status }: AvatarProps) {
  return (
    <div className="relative inline-flex shrink-0">
      <AvatarRoot
        className={cn(
          sizeClasses[size],
          ringClasses[size],
          "ring-white shadow-sm",
          className
        )}
      >
        {src && <AvatarImage src={src} alt={name} />}
        <AvatarFallback>{getInitials(name)}</AvatarFallback>
      </AvatarRoot>

      {status && (
        <span
          aria-label={`Status: ${status}`}
          className={cn(
            "absolute bottom-0 right-0 block rounded-full ring-[1.5px] ring-white",
            statusColors[status],
            statusSizeClasses[size]
          )}
        />
      )}
    </div>
  );
}

// ─── Avatar Group ─────────────────────────────────────────────────────────────

interface AvatarGroupProps {
  items: Array<{ name: string; src?: string }>;
  size?: AvatarSize;
  max?: number;
  className?: string;
}

export function AvatarGroup({ items, size = "sm", max = 4, className }: AvatarGroupProps) {
  const visible = items.slice(0, max);
  const overflow = items.length - max;

  return (
    <div className={cn("flex items-center", className)}>
      {visible.map((item, i) => (
        <div
          key={i}
          className="-ml-2 first:ml-0"
          style={{ zIndex: visible.length - i }}
        >
          <Avatar name={item.name} src={item.src} size={size} />
        </div>
      ))}
      {overflow > 0 && (
        <div
          className={cn(
            "-ml-2 flex items-center justify-center rounded-full",
            "bg-slate-100 ring-2 ring-white",
            "text-xs font-medium text-slate-600",
            sizeClasses[size]
          )}
        >
          +{overflow}
        </div>
      )}
    </div>
  );
}

export { AvatarRoot, AvatarImage, AvatarFallback };
