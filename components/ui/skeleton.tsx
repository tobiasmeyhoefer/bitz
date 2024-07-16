/**
 * A React component that renders a skeleton loading state with a pulsing animation.
 *
 * @param {React.HTMLAttributes<HTMLDivElement>} props - The standard HTML attributes for a div element.
 * @param {string} [props.className] - An optional CSS class name to apply to the skeleton element.
 * @returns {React.ReactElement} A div element with the skeleton loading state.
 */

import { cn } from '@/lib/utils'

function Skeleton({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return <div className={cn('animate-pulse rounded-md bg-primary/10', className)} {...props} />
}

const SVGSkeleton = ({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) => (
  <svg className={className + ' animate-pulse rounded bg-gray-300'} />
)

export { Skeleton, SVGSkeleton }
