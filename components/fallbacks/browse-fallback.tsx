/**
 * Renders a loading skeleton UI for the browse page.
 * This component displays a series of skeleton placeholders to indicate that content is still loading.
 * The skeleton placeholders are used for various UI elements such as search bar, filters, and product cards.
 * This component is typically used as a fallback when the actual content is not yet available.
 */

import { Skeleton, SVGSkeleton } from '@/components/ui/skeleton'

const LoadingSkeleton = () => (
  <>
    <div className="mt-[20px] grid w-full grid-cols-2 gap-6 sm:grid-cols-3 sm:gap-4 sm:gap-x-14 md:grid-cols-4 md:gap-x-7 lg:grid-cols-5 ">
      {Array.from({ length: 20 }).map((_, index) => (
        <div key={`kp-${index}`}>
          <CardWithImageSkeleton key={`pr-${index}`} />
        </div>
      ))}
    </div>
  </>
)

const CardWithImageSkeleton = () => (
  <div>
    <Skeleton className="relative h-[300px] w-full rounded-lg">
      <Skeleton className="absolute top-0 left-0 h-52 w-full"></Skeleton>
      <Skeleton className="absolute bottom-14 left-2 h-6 w-3/4"></Skeleton>
      <Skeleton className="absolute bottom-5 left-2 h-6 w-1/2"></Skeleton>
    </Skeleton>
  </div>
)

const LoadingSkeletonBrowse = () => (
  <div className="flex h-full w-full justify-center p-10">
    <LoadingSkeleton />
  </div>
)

export default LoadingSkeletonBrowse
