/**
 * Renders a loading skeleton UI for the settings page.
 * The skeleton includes placeholders for various UI elements such as a profile picture, form fields, and buttons.
 * This component is used to provide a smooth loading experience while the actual content is being fetched.
 */

import { Skeleton, SVGSkeleton } from '@/components/ui/skeleton'

const LoadingSkeleton = () => (
  <>
    <div>
      <div className="mb-8 flex justify-center gap-4">
        <SVGSkeleton className="h-[200px] w-[200px] rounded-full" />
        <div className="mt-6">
          <form className="space-y-4">
            <div className="space-y-2">
              <label className="leading-none">
                <Skeleton className="w-[136px] max-w-full" />
              </label>
              <div className="flex h-9 w-full border border-input px-3 py-1 shadow-sm transition-colors file:border-0"></div>
            </div>
            <div className="mt-4 inline-flex h-9 items-center justify-center px-4 py-2 shadow-sm transition-colors">
              <Skeleton className="w-[64px] max-w-full" />
            </div>
          </form>
        </div>
      </div>
      <h3 className="mb-4">
        <Skeleton className="w-[176px] max-w-full" />
      </h3>
      <div className="flex flex-col">
        <div className="mb-6">
          <label className="leading-none">
            <Skeleton className="w-[144px] max-w-full" />
          </label>
          <form>
            <div className="space-y-2">
              <div className="flex h-9 w-full border border-input px-3 py-1 shadow-sm transition-colors file:border-0"></div>
            </div>
            <div className="mt-4 inline-flex h-9 items-center justify-center px-4 py-2 shadow-sm transition-colors">
              <Skeleton className="w-[64px] max-w-full" />
            </div>
          </form>
        </div>
        <div className="mb-6">
          <label className="leading-none">
            <Skeleton className="w-[96px] max-w-full" />
          </label>
          <form>
            <div className="space-y-2">
              <div className="geocoder-container">
                <div>
                  <Skeleton className="w-[168px] max-w-full" />
                </div>
                <div>
                  <SVGSkeleton className="h-[24px] w-4" />
                </div>
              </div>
            </div>
            <div className="mt-4 inline-flex h-9 items-center justify-center px-4 py-2 shadow-sm transition-colors">
              <Skeleton className="w-[64px] max-w-full" />
            </div>
          </form>
        </div>
      </div>
    </div>
  </>
)

const LoadingSkeletonSettings = () => (
  <div className="flex h-full w-full justify-center p-10">
    <LoadingSkeleton />
  </div>
)

export default LoadingSkeletonSettings
