import {
  forwardRef,
  useId,
  type ComponentPropsWithoutRef,
} from "react";

import { cn } from "../../lib/cn";

export type TextFieldProps = ComponentPropsWithoutRef<"input"> & {
  label: string;
  hint?: string;
  error?: string;
};

export const TextField = forwardRef<HTMLInputElement, TextFieldProps>(
  function TextField(
    {
      id,
      label,
      hint,
      error,
      required,
      disabled,
      className,
      "aria-describedby": ariaDescribedBy,
      "aria-invalid": ariaInvalid,
      ...inputProps
    },
    ref,
  ) {
    const generatedId = useId();

    const inputId = id ?? generatedId;
    const hintId = `${inputId}-hint`;
    const errorId = `${inputId}-error`;

    const describedBy =
      [
        ariaDescribedBy,
        hint ? hintId : undefined,
        error ? errorId : undefined,
      ]
        .filter(Boolean)
        .join(" ") || undefined;

    return (
        <div className="flex min-w-0 flex-col gap-2">
            <label
                htmlFor={inputId}
                className={cn(
                    "text-sm font-semibold text-slate-700",
                    disabled && "text-slate-400"
                )}
            >
                {label}
                {required && (
                    <span aria-hidden="true" className="ms-1 text-danger-600">
                        *
                    </span>
                )}</label>
                <input
                    {...inputProps}
                    ref={ref}
                    id={inputId}
                    required={required}
                    disabled={disabled}
                    aria-invalid={error ? true : ariaInvalid}
                    aria-describedby={describedBy}
                    className={cn(
                        "min-h-12 w-full rounded-xl border bg-white px-4 py-3",
                        "text-base text-slate-900 shadow-sm",
                        "placeholder::text-slate-400",
                        "transition-colors",
                        "focus-visible:outline focus-visible:ring-4",
                        "disabled:cursor-not-allowed disable:shadow-none",
                        error
                        ? "border-danger-600 focus-visable:border-danger-600 focus-visable:ring-danger600/10"
                        :"border-slate-300 hover:enabled:border-slate-400 focus-visable:border-brand-500 focus-visible:ring-brand-500/12",
                        className,
                    )}
                    />
                    {hint && (
                        <p id={hintId} className="text-xs leading-6 text-slate-500">{hint}</p>
                    )}
                    {error && (
                        <p id={errorId} className="text-xs leading-6 text-danger-600">{error}</p>
                    )}
        </div>
    );
  },
);