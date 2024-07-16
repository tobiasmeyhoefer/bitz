/**
 * Renders a loading skeleton UI for the browse page.
 * This component displays a series of skeleton placeholders to indicate that content is still loading.
 * The skeleton placeholders are used for various UI elements such as search bar, filters, and product cards.
 * This component is typically used as a fallback when the actual content is not yet available.
 */

import { Skeleton, SVGSkeleton } from '@/components/ui/skeleton'

const LoadingSkeleton = () => (
  <>
    <div className="flex w-full flex-col items-center justify-center px-4 sm:px-10 md:px-[20px] lg:px-[30px] xl:px-[80px]">
      <div className="flex w-full flex-col items-center justify-center gap-6 lg:flex-row">
        <div className="top-[20px] flex h-14 w-full border border-input px-3 py-1 shadow-sm transition-colors file:border-0 md:w-2/3">
          <Skeleton className="w-[136px] max-w-full" />
        </div>
        <div className="flex w-full flex-row justify-around lg:w-auto lg:justify-normal">
          <div className="flex flex-row items-center gap-1">
            <div>
              <Skeleton className="w-[120px] max-w-full" />
            </div>
            <div className="[&amp;>span]:line-clamp-1 flex h-9 w-[5.4rem] items-center justify-between border-0 border-input px-3 py-2 shadow-none">
              <span>
                <Skeleton className="w-[40px] max-w-full" />
              </span>
              <SVGSkeleton className="h-[15px] w-[15px]" />
            </div>
          </div>
          <div className="inline-flex h-9 items-center justify-center border border-input px-4 py-2 shadow-sm transition-colors">
            <Skeleton className="w-[48px] max-w-full" />
          </div>
        </div>
      </div>
      <div className="mt-[20px] grid grid-cols-2 gap-2 sm:grid-cols-3 sm:gap-4 lg:grid-cols-4 2xl:grid-cols-5">
        <div>
          <div>
            <div className="flex items-center justify-center">
              <div className="relative flex items-center justify-center">
                <div className="mx-auto w-[160px] border md:w-[200px] lg:w-[240px]">
                  <a>
                    <SVGSkeleton className="h-[300px] w-[300px] rounded-t-xl" />
                  </a>
                  <div className="flex flex-col space-y-1.5 p-2 md:p-3">
                    <div className="flex max-w-full justify-between">
                      <div className="max-w-[calc(100%-36px)]">
                        <h3 className="align-middle tracking-tight">
                          <Skeleton className="w-[336px] max-w-full" />
                        </h3>
                      </div>
                      <form>
                        <div className="flex h-9 w-9 items-center justify-center transition-colors">
                          <SVGSkeleton className="h-[20px] w-[20px]" />
                        </div>
                      </form>
                    </div>
                    <div className="!mt-0">
                      <div className="flex justify-between">
                        <div className="m-0 inline-flex items-center border border-transparent px-2.5 py-0.5 transition-colors">
                          <Skeleton className="w-[48px] max-w-full" />
                        </div>
                        <div className="text-left">
                          <Skeleton className="w-[24px] max-w-full" />
                        </div>
                      </div>
                      <div className="mt-2 flex justify-between">
                        <div className="flex flex-nowrap items-end text-right">
                          <Skeleton className="w-[96px] max-w-full" />
                        </div>
                        <div className="text-right">
                          <a className="hidden md:block">
                            <Skeleton className="w-[64px] max-w-full" />
                          </a>
                          <div className="flex items-end text-right md:block">
                            <Skeleton className="w-[56px] max-w-full" />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div>
          <div>
            <div className="flex items-center justify-center">
              <div className="relative flex items-center justify-center">
                <div className="mx-auto w-[160px] border md:w-[200px] lg:w-[240px]">
                  <a>
                    <SVGSkeleton className="h-[300px] w-[300px] rounded-t-xl" />
                  </a>
                  <div className="flex flex-col space-y-1.5 p-2 md:p-3">
                    <div className="flex max-w-full justify-between">
                      <div className="max-w-[calc(100%-36px)]">
                        <h3 className="align-middle tracking-tight">
                          <Skeleton className="w-[72px] max-w-full" />
                        </h3>
                      </div>
                      <form>
                        <div className="flex h-9 w-9 items-center justify-center transition-colors">
                          <SVGSkeleton className="h-[20px] w-[20px]" />
                        </div>
                      </form>
                    </div>
                    <div className="!mt-0">
                      <div className="flex justify-between">
                        <div className="m-0 inline-flex items-center border border-transparent px-2.5 py-0.5 transition-colors">
                          <Skeleton className="w-[40px] max-w-full" />
                        </div>
                        <div className="text-left">
                          <Skeleton className="w-[32px] max-w-full" />
                        </div>
                      </div>
                      <div className="mt-2 flex justify-between">
                        <div className="flex flex-nowrap items-end text-right">
                          <Skeleton className="w-[96px] max-w-full" />
                        </div>
                        <div className="text-right">
                          <a className="hidden md:block">
                            <Skeleton className="w-[64px] max-w-full" />
                          </a>
                          <div className="flex items-end text-right md:block">
                            <Skeleton className="w-[64px] max-w-full" />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div>
          <div>
            <div className="flex items-center justify-center">
              <div className="relative flex items-center justify-center">
                <div className="mx-auto w-[160px] border md:w-[200px] lg:w-[240px]">
                  <a>
                    <SVGSkeleton className="h-[300px] w-[300px] rounded-t-xl" />
                  </a>
                  <div className="flex flex-col space-y-1.5 p-2 md:p-3">
                    <div className="flex max-w-full justify-between">
                      <div className="max-w-[calc(100%-36px)]">
                        <h3 className="align-middle tracking-tight">
                          <Skeleton className="w-[232px] max-w-full" />
                        </h3>
                      </div>
                      <form>
                        <div className="flex h-9 w-9 items-center justify-center transition-colors">
                          <SVGSkeleton className="h-[20px] w-[20px]" />
                        </div>
                      </form>
                    </div>
                    <div className="!mt-0">
                      <div className="flex justify-between">
                        <div className="m-0 inline-flex items-center border border-transparent px-2.5 py-0.5 transition-colors">
                          <Skeleton className="w-[40px] max-w-full" />
                        </div>
                        <div className="text-left">
                          <Skeleton className="w-[24px] max-w-full" />
                        </div>
                      </div>
                      <div className="mt-2 flex justify-between">
                        <div className="flex flex-nowrap items-end text-right">
                          <Skeleton className="w-[96px] max-w-full" />
                        </div>
                        <div className="text-right">
                          <a className="hidden md:block">
                            <Skeleton className="w-[64px] max-w-full" />
                          </a>
                          <div className="flex items-end text-right md:block">
                            <Skeleton className="w-[80px] max-w-full" />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div>
          <div>
            <div className="flex items-center justify-center">
              <div className="relative flex items-center justify-center">
                <div className="mx-auto w-[160px] border md:w-[200px] lg:w-[240px]">
                  <a>
                    <SVGSkeleton className="h-[300px] w-[300px] rounded-t-xl" />
                  </a>
                  <div className="flex flex-col space-y-1.5 p-2 md:p-3">
                    <div className="flex max-w-full justify-between">
                      <div className="max-w-[calc(100%-36px)]">
                        <h3 className="align-middle tracking-tight">
                          <Skeleton className="w-[160px] max-w-full" />
                        </h3>
                      </div>
                      <form>
                        <div className="flex h-9 w-9 items-center justify-center transition-colors">
                          <SVGSkeleton className="h-[20px] w-[20px]" />
                        </div>
                      </form>
                    </div>
                    <div className="!mt-0">
                      <div className="flex justify-between">
                        <div className="m-0 inline-flex items-center border border-transparent px-2.5 py-0.5 transition-colors">
                          <Skeleton className="w-[40px] max-w-full" />
                        </div>
                        <div className="text-left">
                          <Skeleton className="w-[24px] max-w-full" />
                        </div>
                      </div>
                      <div className="mt-2 flex justify-between">
                        <div className="flex flex-nowrap items-end text-right">
                          <Skeleton className="w-[96px] max-w-full" />
                        </div>
                        <div className="text-right">
                          <a className="hidden md:block">
                            <Skeleton className="w-[64px] max-w-full" />
                          </a>
                          <div className="flex items-end text-right md:block">
                            <Skeleton className="w-[80px] max-w-full" />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div>
          <div>
            <div className="flex items-center justify-center">
              <div className="relative flex items-center justify-center">
                <div className="mx-auto w-[160px] border md:w-[200px] lg:w-[240px]">
                  <a>
                    <SVGSkeleton className="h-[300px] w-[300px] rounded-t-xl" />
                  </a>
                  <div className="flex flex-col space-y-1.5 p-2 md:p-3">
                    <div className="flex max-w-full justify-between">
                      <div className="max-w-[calc(100%-36px)]">
                        <h3 className="align-middle tracking-tight">
                          <Skeleton className="w-[296px] max-w-full" />
                        </h3>
                      </div>
                      <form>
                        <div className="flex h-9 w-9 items-center justify-center transition-colors">
                          <SVGSkeleton className="h-[20px] w-[20px]" />
                        </div>
                      </form>
                    </div>
                    <div className="!mt-0">
                      <div className="flex justify-between">
                        <div className="m-0 inline-flex items-center border border-transparent px-2.5 py-0.5 transition-colors">
                          <Skeleton className="w-[72px] max-w-full" />
                        </div>
                        <div className="text-left">
                          <Skeleton className="w-[32px] max-w-full" />
                        </div>
                      </div>
                      <div className="mt-2 flex justify-between">
                        <div className="flex flex-nowrap items-end text-right">
                          <Skeleton className="w-[96px] max-w-full" />
                        </div>
                        <div className="text-right">
                          <a className="hidden md:block">
                            <Skeleton className="w-[64px] max-w-full" />
                          </a>
                          <div className="flex items-end text-right md:block">
                            <Skeleton className="w-[80px] max-w-full" />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div>
          <div>
            <div className="flex items-center justify-center">
              <div className="relative flex items-center justify-center">
                <div className="mx-auto w-[160px] border md:w-[200px] lg:w-[240px]">
                  <a>
                    <SVGSkeleton className="h-[300px] w-[300px] rounded-t-xl" />
                  </a>
                  <div className="flex flex-col space-y-1.5 p-2 md:p-3">
                    <div className="flex max-w-full justify-between">
                      <div className="max-w-[calc(100%-36px)]">
                        <h3 className="align-middle tracking-tight">
                          <Skeleton className="w-[184px] max-w-full" />
                        </h3>
                      </div>
                      <form>
                        <div className="flex h-9 w-9 items-center justify-center transition-colors">
                          <SVGSkeleton className="h-[20px] w-[20px]" />
                        </div>
                      </form>
                    </div>
                    <div className="!mt-0">
                      <div className="flex justify-between">
                        <div className="m-0 inline-flex items-center border border-transparent px-2.5 py-0.5 transition-colors">
                          <Skeleton className="w-[40px] max-w-full" />
                        </div>
                        <div className="text-left">
                          <Skeleton className="w-[24px] max-w-full" />
                        </div>
                      </div>
                      <div className="mt-2 flex justify-between">
                        <div className="flex flex-nowrap items-end text-right">
                          <Skeleton className="w-[96px] max-w-full" />
                        </div>
                        <div className="text-right">
                          <a className="hidden md:block">
                            <Skeleton className="w-[64px] max-w-full" />
                          </a>
                          <div className="flex items-end text-right md:block">
                            <Skeleton className="w-[80px] max-w-full" />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div>
          <div>
            <div className="flex items-center justify-center">
              <div className="relative flex items-center justify-center">
                <div className="mx-auto w-[160px] border md:w-[200px] lg:w-[240px]">
                  <a>
                    <SVGSkeleton className="h-[300px] w-[300px] rounded-t-xl" />
                  </a>
                  <div className="flex flex-col space-y-1.5 p-2 md:p-3">
                    <div className="flex max-w-full justify-between">
                      <div className="max-w-[calc(100%-36px)]">
                        <h3 className="align-middle tracking-tight">
                          <Skeleton className="w-[184px] max-w-full" />
                        </h3>
                      </div>
                      <form>
                        <div className="flex h-9 w-9 items-center justify-center transition-colors">
                          <SVGSkeleton className="h-[20px] w-[20px]" />
                        </div>
                      </form>
                    </div>
                    <div className="!mt-0">
                      <div className="flex justify-between">
                        <div className="m-0 inline-flex items-center border border-transparent px-2.5 py-0.5 transition-colors">
                          <Skeleton className="w-[80px] max-w-full" />
                        </div>
                        <div className="text-left">
                          <Skeleton className="w-[32px] max-w-full" />
                        </div>
                      </div>
                      <div className="mt-2 flex justify-between">
                        <div className="flex flex-nowrap items-end text-right">
                          <Skeleton className="w-[96px] max-w-full" />
                        </div>
                        <div className="text-right">
                          <a className="hidden md:block">
                            <Skeleton className="w-[64px] max-w-full" />
                          </a>
                          <div className="flex items-end text-right md:block">
                            <Skeleton className="w-[80px] max-w-full" />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div>
          <div>
            <div className="flex items-center justify-center">
              <div className="relative flex items-center justify-center">
                <div className="mx-auto w-[160px] border md:w-[200px] lg:w-[240px]">
                  <a>
                    <SVGSkeleton className="h-[300px] w-[300px] rounded-t-xl" />
                  </a>
                  <div className="flex flex-col space-y-1.5 p-2 md:p-3">
                    <div className="flex max-w-full justify-between">
                      <div className="max-w-[calc(100%-36px)]">
                        <h3 className="align-middle tracking-tight">
                          <Skeleton className="w-[304px] max-w-full" />
                        </h3>
                      </div>
                      <form>
                        <div className="flex h-9 w-9 items-center justify-center transition-colors">
                          <SVGSkeleton className="h-[20px] w-[20px]" />
                        </div>
                      </form>
                    </div>
                    <div className="!mt-0">
                      <div className="flex justify-between">
                        <div className="m-0 inline-flex items-center border border-transparent px-2.5 py-0.5 transition-colors">
                          <Skeleton className="w-[96px] max-w-full" />
                        </div>
                        <div className="text-left">
                          <Skeleton className="w-[16px] max-w-full" />
                        </div>
                      </div>
                      <div className="mt-2 flex justify-between">
                        <div className="flex flex-nowrap items-end text-right">
                          <Skeleton className="w-[96px] max-w-full" />
                        </div>
                        <div className="text-right">
                          <a className="hidden md:block">
                            <Skeleton className="w-[64px] max-w-full" />
                          </a>
                          <div className="flex items-end text-right md:block">
                            <Skeleton className="w-[80px] max-w-full" />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="mb-6 mt-4 inline-flex h-9 items-center justify-center px-4 py-2 transition-colors">
        <Skeleton className="w-[72px] max-w-full" />
      </div>
    </div>
  </>
)

const LoadingSkeletonBrowse = () => (
  <div className="flex h-full w-full justify-center p-10">
    <LoadingSkeleton />
  </div>
)

export default LoadingSkeletonBrowse
