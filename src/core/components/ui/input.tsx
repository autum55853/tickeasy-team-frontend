import { cn } from "@/core/lib/utils";
import * as React from "react";
export interface CheckboxProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  type?: string;
  placeholder?: string;
  id?: string;
  error?: boolean;
  errorMessage?: string;
  inputClass?: string;
  required?: boolean;
  value?: string;
}

const Input = React.forwardRef<HTMLInputElement, CheckboxProps>(
  ({ id, type, label, placeholder, disabled, maxLength, required, value, onChange, error, errorMessage, inputClass }, ref) => {
    return (
      <div className={cn("m-1 h-[80px] w-full")}>
        <label className="pl-2" htmlFor={id}>
          {label}
          {required && <span className="ml-1 text-lg text-red-500">*</span>}
        </label>
        <input
          className={`${inputClass} border-input bg-background ring-offset-background placeholder:text-muted-foreground focus-visible:ring-ring my-2 w-full rounded-md border px-3 py-2 text-sm file:border-0 file:bg-transparent file:text-sm file:font-medium focus-visible:ring-2 focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50`}
          type={type}
          id={id}
          value={value}
          placeholder={placeholder}
          onChange={(e) => onChange?.(e)}
          ref={ref}
          disabled={disabled}
          maxLength={maxLength}
        />
        <p className="pl-2 text-sm text-red-500">{error && errorMessage ? errorMessage : ""}</p>
      </div>
    );
  }
);
Input.displayName = "Input";

export { Input };
