import { cn } from "@/core/lib/utils";
import * as React from "react";
export interface CheckboxProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  type?: string;
  placeholder?: string;
  id?: string;
  error?: boolean;
  errorMessage?: string;
}

const Input = React.forwardRef<HTMLInputElement, CheckboxProps>(
  ({ id, type, label, placeholder, disabled, onChange, error, errorMessage, ...props }, ref) => {
    return (
      <div className={cn("m-3 grid w-full items-center gap-1")} {...props}>
        <label className="pl-2" htmlFor={id}>
          {label}
        </label>
        <input
          className="border-input bg-background ring-offset-background placeholder:text-muted-foreground focus-visible:ring-ring w-full rounded-md border px-3 py-2 text-sm file:border-0 file:bg-transparent file:text-sm file:font-medium focus-visible:ring-2 focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50"
          type={type}
          id={id}
          placeholder={placeholder}
          onChange={(e) => onChange?.(e)}
          ref={ref}
          disabled={disabled}
        />
        {error && <p className="text-red-500">{errorMessage}</p>}
      </div>
    );
  }
);
Input.displayName = "Input";

export { Input };
