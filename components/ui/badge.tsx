/**
 * A React component that renders a badge with customizable styles.
 *
 * The `Badge` component uses the `cva` (class-variance-authority) library to define
 * the available variants for the badge. The supported variants are:
 *
 * - `default`: A primary-colored badge with a hover effect.
 * - `secondary`: A secondary-colored badge with a hover effect.
 * - `destructive`: A destructive-colored badge with a hover effect.
 * - `outline`: An outline-style badge with no background color.
 *
 * The component accepts all standard HTML attributes for a `div` element, as well as
 * the `variant` prop to specify the desired badge style.
 *
 * @param props - The props for the `Badge` component.
 * @param props.className - An optional CSS class name to apply to the badge.
 * @param props.variant - The variant of the badge to render (default, secondary, destructive, or outline).
 * @returns A React element representing the badge.
 */

import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const badgeVariants = cva(
  "inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",
  {
    variants: {
      variant: {
        default:
          "border-transparent bg-primary text-primary-foreground hover:bg-primary/80",
        secondary:
          "border-transparent bg-secondary text-secondary-foreground hover:bg-secondary/80",
        destructive:
          "border-transparent bg-destructive text-destructive-foreground hover:bg-destructive/80",
        outline: "text-foreground",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
)

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {}

function Badge({ className, variant, ...props }: BadgeProps) {
  return (
    <div className={cn(badgeVariants({ variant }), className)} {...props} />
  )
}

export { Badge, badgeVariants }
