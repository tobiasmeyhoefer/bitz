/**
 * A React component that renders a separator line or vertical bar.
 * 
 * The `Separator` component is a wrapper around the `@radix-ui/react-separator` component,
 * providing a consistent look and feel for separators in the application.
 * 
 * The component supports the following props:
 * - `orientation`: Determines whether the separator is horizontal or vertical.
 * - `decorative`: Indicates whether the separator is purely decorative and should be hidden from screen readers.
 * - `className`: Additional CSS classes to apply to the separator.
 * 
 * The separator is styled with a `bg-border` class, which sets the background color to the border color defined in the application's design system.
 */
"use client"

import * as React from "react"
import * as SeparatorPrimitive from "@radix-ui/react-separator"

import { cn } from "@/lib/utils"

const Separator = React.forwardRef<
  React.ElementRef<typeof SeparatorPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof SeparatorPrimitive.Root>
>(
  (
    { className, orientation = "horizontal", decorative = true, ...props },
    ref
  ) => (
    <SeparatorPrimitive.Root
      ref={ref}
      decorative={decorative}
      orientation={orientation}
      className={cn(
        "shrink-0 bg-border",
        orientation === "horizontal" ? "h-[1px] w-full" : "h-full w-[1px]",
        className
      )}
      {...props}
    />
  )
)
Separator.displayName = SeparatorPrimitive.Root.displayName

export { Separator }
