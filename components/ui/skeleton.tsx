import { cn } from '@/lib/utils'

function Skeleton({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return <div className={cn('animate-pulse rounded-md bg-primary/10', className)} {...props} />
}

const SVGSkeleton = ({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) => (
  <svg className={className + ' animate-pulse rounded bg-gray-300'} />
)

export { Skeleton, SVGSkeleton }
