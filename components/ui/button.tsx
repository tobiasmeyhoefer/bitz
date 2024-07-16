/**
 * A reusable button component that supports various styles and sizes.
 *
 * The `Button` component is a React component that provides a consistent and customizable button interface. It uses the `class-variance-authority` library to define a set of button variants and sizes, which can be applied to the button through props.
 *
 * The component supports the following variants:
 * - `default`: A default button style with a primary color background and shadow.
 * - `callToAction`: A call-to-action button style with a gradient background and rounded corners.
 * - `destructive`: A destructive button style with a red background.
 * - `outline`: An outline button style with a border and hover effect.
 * - `secondary`: A secondary button style with a gray background.
 * - `ghost`: A ghost button style with a hover effect.
 * - `link`: A link-style button with an underline on hover.
 *
 * The component supports the following sizes:
 * - `default`: A standard-sized button.
 * - `sm`: A small-sized button.
 * - `lg`: A large-sized button.
 * - `xl`: An extra-large-sized button.
 * - `icon`: A button-sized icon.
 *
 * The `Button` component can be used as a regular button or as a child of another component (using the `asChild` prop). It supports all the standard button HTML attributes, as well as the `variant` and `size` props to customize the button's appearance.
 */

import { Slot } from '@radix-ui/react-slot'
import { cva, type VariantProps } from 'class-variance-authority'
import * as React from 'react'

import { cn } from '@/lib/utils'

const buttonVariants = cva(
  'inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50',
  {
    variants: {
      variant: {
        default: 'bg-primary text-primary-foreground shadow hover:bg-primary-hover/90',
        callToAction:
          'px-6 py-3 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-white rounded-full shadow hover:bg-primary/90',
        destructive: 'bg-destructive text-destructive-foreground shadow-sm hover:bg-destructive/90',
        outline:
          'border border-input bg-background shadow-sm hover:bg-accent hover:text-accent-foreground',
        secondary: 'bg-secondary text-secondary-foreground shadow-sm hover:bg-secondary/80',
        ghost: 'hover:bg-accent hover:text-accent-foreground',
        link: 'text-primary underline-offset-4 hover:underline',
      },
      size: {
        default: 'h-9 px-4 py-2',
        sm: 'h-8 rounded-md px-3 text-xs',
        lg: 'h-10 rounded-md px-8',
        xl: 'h-12 rounded-md px-10 text-xl font-semibold',
        icon: 'h-9 w-9',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  },
)

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : 'button'
    return (
      <Comp className={cn(buttonVariants({ variant, size, className }))} ref={ref} {...props} />
    )
  },
)
Button.displayName = 'Button'

export { Button, buttonVariants }
