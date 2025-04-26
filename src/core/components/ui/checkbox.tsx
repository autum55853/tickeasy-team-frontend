import * as React from "react";
export interface CheckboxProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string | React.ReactNode;
}

const Checkbox = React.forwardRef<HTMLButtonElement, CheckboxProps>(({ className, id, label, checked, onChange, ...props }) => {
  return (
    <div className="flex items-center space-x-1 p-2">
      <input type="checkbox" id={id} checked={checked} onChange={(e) => onChange?.(e)} className="h-4 w-4 cursor-pointer" {...props} />
      {label && (
        <label htmlFor={id} className={className}>
          {label}
        </label>
      )}
    </div>
  );
});
Checkbox.displayName = "Checkbox";

export { Checkbox };
