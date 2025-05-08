import * as React from "react";
import { Check } from "lucide-react";
import { cn } from "@/core/lib/utils";

export interface CheckboxProps extends React.InputHTMLAttributes<HTMLInputElement> {
  id: string;
  label?: string | React.ReactNode;
  required?: boolean;
}

const Checkbox = React.forwardRef<HTMLInputElement, CheckboxProps>(({ className, id, label, checked, required, onChange, ...props }, ref) => {
  return (
    <div className="my-2 flex items-center space-x-2">
      <label htmlFor={id} className="my-2 flex cursor-pointer items-center space-x-2">
        <div className="relative flex h-4 w-4 items-center justify-center">
          <input
            type="checkbox"
            id={id}
            checked={checked}
            onChange={onChange}
            className={cn(
              "peer border-primary ring-offset-background focus-visible:ring-ring data-[state=checked]:bg-primary data-[state=checked]:text-primary-foreground h-4 w-4 shrink-0 rounded-sm border focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50",
              className
            )}
            ref={ref}
            {...props}
          />
          <Check className="absolute h-4 w-4 text-white opacity-0 transition-opacity peer-data-[state=checked]:opacity-100" />
        </div>
        <span className="leading-none font-medium peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
          {label}
          {required && <span className="ml-1 text-lg text-red-500">*</span>}
        </span>
      </label>
    </div>
  );
});
Checkbox.displayName = "Checkbox";

export { Checkbox };
