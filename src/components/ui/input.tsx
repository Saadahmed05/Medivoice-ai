import * as React from "react";
import { cn } from "@/lib/utils";

// ─── Input ────────────────────────────────────────────────────────────────────

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  error?: boolean;
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, leftIcon, rightIcon, error, ...props }, ref) => {
    return (
      <div className="relative flex w-full items-center">
        {leftIcon && (
          <div className="pointer-events-none absolute left-3 flex items-center text-slate-400 [&_svg]:h-4 [&_svg]:w-4">
            {leftIcon}
          </div>
        )}
        <input
          type={type}
          ref={ref}
          className={cn(
            // Base
            "flex h-9 w-full rounded-[10px] border bg-white px-3 py-2",
            "text-sm text-slate-900 placeholder:text-slate-400",
            // Border & shadow
            "border-slate-200 shadow-[0_1px_2px_rgba(0,0,0,0.04)]",
            // Transitions
            "transition-colors duration-150",
            // Focus — Stripe/Linear style ring
            "focus:outline-none focus:border-primary-500 focus:ring-[3px] focus:ring-primary-500/15",
            // Disabled
            "disabled:cursor-not-allowed disabled:bg-slate-50 disabled:text-slate-400 disabled:border-slate-200",
            // Error
            error && "border-red-400 focus:border-red-500 focus:ring-red-500/15",
            // Icon padding
            leftIcon && "pl-9",
            rightIcon && "pr-9",
            className
          )}
          {...props}
        />
        {rightIcon && (
          <div className="absolute right-3 flex items-center text-slate-400 [&_svg]:h-4 [&_svg]:w-4">
            {rightIcon}
          </div>
        )}
      </div>
    );
  }
);
Input.displayName = "Input";

// ─── Textarea ─────────────────────────────────────────────────────────────────

export interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  error?: boolean;
}

const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className, error, ...props }, ref) => {
    return (
      <textarea
        ref={ref}
        className={cn(
          "flex min-h-[88px] w-full rounded-[10px] border bg-white px-3 py-2.5",
          "text-sm text-slate-900 placeholder:text-slate-400",
          "border-slate-200 shadow-[0_1px_2px_rgba(0,0,0,0.04)]",
          "resize-none",
          "transition-colors duration-150",
          "focus:outline-none focus:border-primary-500 focus:ring-[3px] focus:ring-primary-500/15",
          "disabled:cursor-not-allowed disabled:bg-slate-50 disabled:text-slate-400",
          error && "border-red-400 focus:border-red-500 focus:ring-red-500/15",
          className
        )}
        {...props}
      />
    );
  }
);
Textarea.displayName = "Textarea";

// ─── Label ────────────────────────────────────────────────────────────────────

export interface LabelProps extends React.LabelHTMLAttributes<HTMLLabelElement> {
  required?: boolean;
}

const Label = React.forwardRef<HTMLLabelElement, LabelProps>(
  ({ className, children, required, ...props }, ref) => {
    return (
      <label
        ref={ref}
        className={cn(
          "block text-[13px] font-medium text-slate-700 mb-1.5 leading-none",
          className
        )}
        {...props}
      >
        {children}
        {required && (
          <span className="ml-1 text-red-500" aria-hidden="true">*</span>
        )}
      </label>
    );
  }
);
Label.displayName = "Label";

// ─── FormField ────────────────────────────────────────────────────────────────

interface FormFieldProps {
  label?: string;
  error?: string;
  hint?: string;
  required?: boolean;
  htmlFor?: string;
  className?: string;
  children: React.ReactNode;
}

function FormField({ label, error, hint, required, htmlFor, className, children }: FormFieldProps) {
  return (
    <div className={cn("flex flex-col", className)}>
      {label && (
        <Label htmlFor={htmlFor} required={required}>
          {label}
        </Label>
      )}
      {children}
      {hint && !error && (
        <p className="text-[12px] text-slate-400 mt-1.5 leading-relaxed">{hint}</p>
      )}
      {error && (
        <p role="alert" className="text-[12px] text-red-600 mt-1.5 leading-none font-medium">
          {error}
        </p>
      )}
    </div>
  );
}

// ─── Select ───────────────────────────────────────────────────────────────────

export interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  error?: boolean;
}

const Select = React.forwardRef<HTMLSelectElement, SelectProps>(
  ({ className, error, children, ...props }, ref) => {
    return (
      <select
        ref={ref}
        className={cn(
          "flex h-9 w-full appearance-none rounded-[10px] border bg-white px-3 py-2",
          "text-sm text-slate-900",
          "border-slate-200 shadow-[0_1px_2px_rgba(0,0,0,0.04)]",
          "transition-colors duration-150",
          "focus:outline-none focus:border-primary-500 focus:ring-[3px] focus:ring-primary-500/15",
          "disabled:cursor-not-allowed disabled:bg-slate-50 disabled:text-slate-400",
          "bg-[url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20'%3E%3Cpath stroke='%236b7280' stroke-linecap='round' stroke-linejoin='round' stroke-width='1.5' d='M6 8l4 4 4-4'/%3E%3C/svg%3E\")] bg-right-3 bg-no-repeat pr-8",
          error && "border-red-400 focus:border-red-500 focus:ring-red-500/15",
          className
        )}
        {...props}
      >
        {children}
      </select>
    );
  }
);
Select.displayName = "Select";

export { Input, Textarea, Label, FormField, Select };
