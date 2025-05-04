import { cn } from "@/core/lib/utils";
import * as React from "react";
export interface CheckboxProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  type?: string;
  placeholder?: string;
  id?: string;
  error?: boolean;
  errorMessage?: string;
  required?: boolean;
  value?: string;
}

const Input = React.forwardRef<HTMLInputElement, CheckboxProps>(
  ({ id, type, label, value, placeholder, onChange, error, errorMessage, required, ...props }, ref) => {
    return (
      <div className={cn("grid w-full items-center gap-1 py-2", props.className)}>
        <label className="" htmlFor={id}>
          {label}
          {required && <span className="ml-1 text-lg text-red-500">*</span>}
        </label>
        <input
          ref={ref}
          id={id}
          value={value}
          type={type}
          placeholder={placeholder}
          onChange={onChange}
          className={cn(
            "border-input bg-background ring-offset-background placeholder:text-muted-foreground focus-visible:ring-ring flex h-10 w-full rounded-md border px-3 py-2 text-sm file:border-0 file:bg-transparent file:text-sm file:font-medium focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50",
            error && "border-red-500"
          )}
        />

        {error && <p className="text-sm text-red-500">{errorMessage}</p>}
      </div>
    );
  }
);
Input.displayName = "Input";

export { Input };
