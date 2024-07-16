/**
 * A reusable input component that extends the standard HTML `<input>` element.
 * It provides a consistent styling and behavior across the application.
 *
 * @param {InputProps} props - The props for the input component.
 * @param {string} [props.className] - Additional CSS classes to apply to the input.
 * @param {string} [props.type] - The type of the input (e.g. "text", "email", "password").
 * @param {React.InputHTMLAttributes<HTMLInputElement>} props - All other standard HTML input attributes.
 * @returns {React.ReactElement} - The rendered input component.
 */
import * as React from "react"

import { cn } from "@/lib/utils"

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, ...props }, ref) => {
    return (
      <input
        type={type}
        className={cn(
          "flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50",
          className
        )}
        ref={ref}
        {...props}
      />
    )
  }
)
Input.displayName = "Input"

export { Input }
