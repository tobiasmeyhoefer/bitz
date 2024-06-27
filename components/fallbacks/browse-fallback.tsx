import { Skeleton, SVGSkeleton } from '@/components/ui/skeleton'

const LoadingSkeleton = () => (
  <>
    <div className="-mx-2 mt-[20px] flex flex-wrap justify-around overflow-y-hidden">
      <div>
        <div>
          <div className="flex items-center justify-center">
            <div className="relative flex items-center justify-center">
              <div className="absolute right-0 top-0 m-2"></div>
              <div className="border w-[150px] md:w-[200px] lg:w-[300px] mx-[5px] my-[0.5rem]">
                <a>
                  <SVGSkeleton className="rounded-t-xl w-[300px] h-[300px]" />
                </a>
                <div className="flex flex-col space-y-1.5 p-3">
                  <div className="flex max-w-full justify-between">
                    <div className="max-w-[calc(100%-36px)]">
                      <h3 className="tracking-tight align-middle">
                        <Skeleton className="w-[56px] max-w-full" />
                      </h3>
                    </div>
                    <form>
                      <div className="items-center transition-colors h-9 w-9 flex justify-end">
                        <SVGSkeleton className="w-[20px] h-[20px]" />
                      </div>
                    </form>
                  </div>
                  <div>
                    <div className="flex justify-between">
                      <div className="inline-flex items-center border px-2.5 py-0.5 transition-colors border-transparent m-0">
                        <Skeleton className="w-[40px] max-w-full" />
                      </div>
                      <div className="text-left">
                        <Skeleton className="w-[24px] max-w-full" />
                      </div>
                    </div>
                    <div className="mt-2 flex justify-between">
                      <div className="flex flex-nowrap items-center text-right">
                        <Skeleton className="w-[96px] max-w-full" />
                        <SVGSkeleton className="mx-1 size-3 w-[1empx] h-[1empx]" />
                      </div>
                      <div className="text-right">
                        <a className="hidden md:block">
                          <Skeleton className="w-[72px] max-w-full" />
                        </a>
                        <div className="hidden items-end text-right md:block">
                          <Skeleton className="w-[152px] max-w-full" />
                        </div>
                        <div className="flex items-end text-right md:hidden">
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
              <div className="absolute right-0 top-0 m-2"></div>
              <div className="border w-[150px] md:w-[200px] lg:w-[300px] mx-[5px] my-[0.5rem]">
                <a>
                  <SVGSkeleton className="rounded-t-xl w-[300px] h-[300px]" />
                </a>
                <div className="flex flex-col space-y-1.5 p-3">
                  <div className="flex max-w-full justify-between">
                    <div className="max-w-[calc(100%-36px)]">
                      <h3 className="tracking-tight align-middle">
                        <Skeleton className="w-[112px] max-w-full" />
                      </h3>
                    </div>
                    <form>
                      <div className="items-center transition-colors h-9 w-9 flex justify-end">
                        <SVGSkeleton className="w-[20px] h-[20px]" />
                      </div>
                    </form>
                  </div>
                  <div>
                    <div className="flex justify-between">
                      <div className="inline-flex items-center border px-2.5 py-0.5 transition-colors border-transparent m-0">
                        <Skeleton className="w-[96px] max-w-full" />
                      </div>
                      <div className="text-left">
                        <Skeleton className="w-[24px] max-w-full" />
                      </div>
                    </div>
                    <div className="mt-2 flex justify-between">
                      <div className="flex flex-nowrap items-center text-right">
                        <Skeleton className="w-[40px] max-w-full" />
                        <SVGSkeleton className="mx-1 size-3 w-[1empx] h-[1empx]" />
                      </div>
                      <div className="text-right">
                        <a className="hidden md:block">
                          <Skeleton className="w-[72px] max-w-full" />
                        </a>
                        <div className="hidden items-end text-right md:block">
                          <Skeleton className="w-[152px] max-w-full" />
                        </div>
                        <div className="flex items-end text-right md:hidden">
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
              <div className="absolute right-0 top-0 m-2"></div>
              <div className="border w-[150px] md:w-[200px] lg:w-[300px] mx-[5px] my-[0.5rem]">
                <a>
                  <SVGSkeleton className="rounded-t-xl w-[300px] h-[300px]" />
                </a>
                <div className="flex flex-col space-y-1.5 p-3">
                  <div className="flex max-w-full justify-between">
                    <div className="max-w-[calc(100%-36px)]">
                      <h3 className="tracking-tight align-middle">
                        <Skeleton className="w-[80px] max-w-full" />
                      </h3>
                    </div>
                    <form>
                      <div className="items-center transition-colors h-9 w-9 flex justify-end">
                        <SVGSkeleton className="w-[20px] h-[20px]" />
                      </div>
                    </form>
                  </div>
                  <div>
                    <div className="flex justify-between">
                      <div className="inline-flex items-center border px-2.5 py-0.5 transition-colors border-transparent m-0">
                        <Skeleton className="w-[40px] max-w-full" />
                      </div>
                      <div className="text-left">
                        <Skeleton className="w-[32px] max-w-full" />
                      </div>
                    </div>
                    <div className="mt-2 flex justify-between">
                      <div className="flex flex-nowrap items-center text-right">
                        <Skeleton className="w-[40px] max-w-full" />
                        <SVGSkeleton className="mx-1 size-3 w-[1empx] h-[1empx]" />
                      </div>
                      <div className="text-right">
                        <a className="hidden md:block">
                          <Skeleton className="w-[72px] max-w-full" />
                        </a>
                        <div className="hidden items-end text-right md:block">
                          <Skeleton className="w-[152px] max-w-full" />
                        </div>
                        <div className="flex items-end text-right md:hidden">
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
              <div className="absolute right-0 top-0 m-2"></div>
              <div className="border w-[150px] md:w-[200px] lg:w-[300px] mx-[5px] my-[0.5rem]">
                <a>
                  <SVGSkeleton className="rounded-t-xl w-[300px] h-[300px]" />
                </a>
                <div className="flex flex-col space-y-1.5 p-3">
                  <div className="flex max-w-full justify-between">
                    <div className="max-w-[calc(100%-36px)]">
                      <h3 className="tracking-tight align-middle">
                        <Skeleton className="w-[48px] max-w-full" />
                      </h3>
                    </div>
                    <form>
                      <div className="items-center transition-colors h-9 w-9 flex justify-end">
                        <SVGSkeleton className="w-[20px] h-[20px]" />
                      </div>
                    </form>
                  </div>
                  <div>
                    <div className="flex justify-between">
                      <div className="inline-flex items-center border px-2.5 py-0.5 transition-colors border-transparent m-0">
                        <Skeleton className="w-[64px] max-w-full" />
                      </div>
                      <div className="text-left">
                        <Skeleton className="w-[24px] max-w-full" />
                      </div>
                    </div>
                    <div className="mt-2 flex justify-between">
                      <div className="flex flex-nowrap items-center text-right">
                        <Skeleton className="w-[40px] max-w-full" />
                        <SVGSkeleton className="mx-1 size-3 w-[1empx] h-[1empx]" />
                      </div>
                      <div className="text-right">
                        <a className="hidden md:block">
                          <Skeleton className="w-[72px] max-w-full" />
                        </a>
                        <div className="hidden items-end text-right md:block">
                          <Skeleton className="w-[152px] max-w-full" />
                        </div>
                        <div className="flex items-end text-right md:hidden">
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
              <div className="absolute right-0 top-0 m-2"></div>
              <div className="border w-[150px] md:w-[200px] lg:w-[300px] mx-[5px] my-[0.5rem]">
                <a>
                  <SVGSkeleton className="rounded-t-xl w-[300px] h-[300px]" />
                </a>
                <div className="flex flex-col space-y-1.5 p-3">
                  <div className="flex max-w-full justify-between">
                    <div className="max-w-[calc(100%-36px)]">
                      <h3 className="tracking-tight align-middle">
                        <Skeleton className="w-[96px] max-w-full" />
                      </h3>
                    </div>
                    <form>
                      <div className="items-center transition-colors h-9 w-9 flex justify-end">
                        <SVGSkeleton className="w-[20px] h-[20px]" />
                      </div>
                    </form>
                  </div>
                  <div>
                    <div className="flex justify-between">
                      <div className="inline-flex items-center border px-2.5 py-0.5 transition-colors border-transparent m-0">
                        <Skeleton className="w-[48px] max-w-full" />
                      </div>
                      <div className="text-left">
                        <Skeleton className="w-[24px] max-w-full" />
                      </div>
                    </div>
                    <div className="mt-2 flex justify-between">
                      <div className="flex flex-nowrap items-center text-right">
                        <Skeleton className="w-[40px] max-w-full" />
                        <SVGSkeleton className="mx-1 size-3 w-[1empx] h-[1empx]" />
                      </div>
                      <div className="text-right">
                        <a className="hidden md:block">
                          <Skeleton className="w-[72px] max-w-full" />
                        </a>
                        <div className="hidden items-end text-right md:block">
                          <Skeleton className="w-[152px] max-w-full" />
                        </div>
                        <div className="flex items-end text-right md:hidden">
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
              <div className="absolute right-0 top-0 m-2"></div>
              <div className="border w-[150px] md:w-[200px] lg:w-[300px] mx-[5px] my-[0.5rem]">
                <a>
                  <SVGSkeleton className="rounded-t-xl w-[300px] h-[300px]" />
                </a>
                <div className="flex flex-col space-y-1.5 p-3">
                  <div className="flex max-w-full justify-between">
                    <div className="max-w-[calc(100%-36px)]">
                      <h3 className="tracking-tight align-middle">
                        <Skeleton className="w-[320px] max-w-full" />
                      </h3>
                    </div>
                    <form>
                      <div className="items-center transition-colors h-9 w-9 flex justify-end">
                        <SVGSkeleton className="w-[20px] h-[20px]" />
                      </div>
                    </form>
                  </div>
                  <div>
                    <div className="flex justify-between">
                      <div className="inline-flex items-center border px-2.5 py-0.5 transition-colors border-transparent m-0">
                        <Skeleton className="w-[120px] max-w-full" />
                      </div>
                      <div className="text-left">
                        <Skeleton className="w-[32px] max-w-full" />
                      </div>
                    </div>
                    <div className="mt-2 flex justify-between">
                      <div className="flex flex-nowrap items-center text-right">
                        <Skeleton className="w-[40px] max-w-full" />
                        <SVGSkeleton className="mx-1 size-3 w-[1empx] h-[1empx]" />
                      </div>
                      <div className="text-right">
                        <a className="hidden md:block">
                          <Skeleton className="w-[72px] max-w-full" />
                        </a>
                        <div className="hidden items-end text-right md:block">
                          <Skeleton className="w-[152px] max-w-full" />
                        </div>
                        <div className="flex items-end text-right md:hidden">
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
              <div className="absolute right-0 top-0 m-2"></div>
              <div className="border w-[150px] md:w-[200px] lg:w-[300px] mx-[5px] my-[0.5rem]">
                <a>
                  <SVGSkeleton className="rounded-t-xl w-[300px] h-[300px]" />
                </a>
                <div className="flex flex-col space-y-1.5 p-3">
                  <div className="flex max-w-full justify-between">
                    <div className="max-w-[calc(100%-36px)]">
                      <h3 className="tracking-tight align-middle">
                        <Skeleton className="w-[48px] max-w-full" />
                      </h3>
                    </div>
                    <form>
                      <div className="items-center transition-colors h-9 w-9 flex justify-end">
                        <SVGSkeleton className="w-[20px] h-[20px]" />
                      </div>
                    </form>
                  </div>
                  <div>
                    <div className="flex justify-between">
                      <div className="inline-flex items-center border px-2.5 py-0.5 transition-colors border-transparent m-0">
                        <Skeleton className="w-[56px] max-w-full" />
                      </div>
                      <div className="text-left">
                        <Skeleton className="w-[16px] max-w-full" />
                      </div>
                    </div>
                    <div className="mt-2 flex justify-between">
                      <div className="flex flex-nowrap items-center text-right">
                        <Skeleton className="w-[40px] max-w-full" />
                        <SVGSkeleton className="mx-1 size-3 w-[1empx] h-[1empx]" />
                      </div>
                      <div className="text-right">
                        <a className="hidden md:block">
                          <Skeleton className="w-[72px] max-w-full" />
                        </a>
                        <div className="hidden items-end text-right md:block">
                          <Skeleton className="w-[152px] max-w-full" />
                        </div>
                        <div className="flex items-end text-right md:hidden">
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
              <div className="absolute right-0 top-0 m-2"></div>
              <div className="border w-[150px] md:w-[200px] lg:w-[300px] mx-[5px] my-[0.5rem]">
                <a>
                  <SVGSkeleton className="rounded-t-xl w-[300px] h-[300px]" />
                </a>
                <div className="flex flex-col space-y-1.5 p-3">
                  <div className="flex max-w-full justify-between">
                    <div className="max-w-[calc(100%-36px)]">
                      <h3 className="tracking-tight align-middle">
                        <Skeleton className="w-[136px] max-w-full" />
                      </h3>
                    </div>
                    <form>
                      <div className="items-center transition-colors h-9 w-9 flex justify-end">
                        <SVGSkeleton className="w-[20px] h-[20px]" />
                      </div>
                    </form>
                  </div>
                  <div>
                    <div className="flex justify-between">
                      <div className="inline-flex items-center border px-2.5 py-0.5 transition-colors border-transparent m-0">
                        <Skeleton className="w-[40px] max-w-full" />
                      </div>
                      <div className="text-left">
                        <Skeleton className="w-[24px] max-w-full" />
                      </div>
                    </div>
                    <div className="mt-2 flex justify-between">
                      <div className="flex flex-nowrap items-center text-right">
                        <Skeleton className="w-[40px] max-w-full" />
                        <SVGSkeleton className="mx-1 size-3 w-[1empx] h-[1empx]" />
                      </div>
                      <div className="text-right">
                        <a className="hidden md:block">
                          <Skeleton className="w-[72px] max-w-full" />
                        </a>
                        <div className="hidden items-end text-right md:block">
                          <Skeleton className="w-[152px] max-w-full" />
                        </div>
                        <div className="flex items-end text-right md:hidden">
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
              <div className="absolute right-0 top-0 m-2"></div>
              <div className="border w-[150px] md:w-[200px] lg:w-[300px] mx-[5px] my-[0.5rem]">
                <a>
                  <SVGSkeleton className="rounded-t-xl w-[300px] h-[300px]" />
                </a>
                <div className="flex flex-col space-y-1.5 p-3">
                  <div className="flex max-w-full justify-between">
                    <div className="max-w-[calc(100%-36px)]">
                      <h3 className="tracking-tight align-middle">
                        <Skeleton className="w-[104px] max-w-full" />
                      </h3>
                    </div>
                    <form>
                      <div className="items-center transition-colors h-9 w-9 flex justify-end">
                        <SVGSkeleton className="w-[20px] h-[20px]" />
                      </div>
                    </form>
                  </div>
                  <div>
                    <div className="flex justify-between">
                      <div className="inline-flex items-center border px-2.5 py-0.5 transition-colors border-transparent m-0">
                        <Skeleton className="w-[40px] max-w-full" />
                      </div>
                      <div className="text-left">
                        <Skeleton className="w-[24px] max-w-full" />
                      </div>
                    </div>
                    <div className="mt-2 flex justify-between">
                      <div className="flex flex-nowrap items-center text-right">
                        <Skeleton className="w-[40px] max-w-full" />
                        <SVGSkeleton className="mx-1 size-3 w-[1empx] h-[1empx]" />
                      </div>
                      <div className="text-right">
                        <a className="hidden md:block">
                          <Skeleton className="w-[72px] max-w-full" />
                        </a>
                        <div className="hidden items-end text-right md:block">
                          <Skeleton className="w-[152px] max-w-full" />
                        </div>
                        <div className="flex items-end text-right md:hidden">
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
              <div className="absolute right-0 top-0 m-2"></div>
              <div className="border w-[150px] md:w-[200px] lg:w-[300px] mx-[5px] my-[0.5rem]">
                <a>
                  <SVGSkeleton className="rounded-t-xl w-[300px] h-[300px]" />
                </a>
                <div className="flex flex-col space-y-1.5 p-3">
                  <div className="flex max-w-full justify-between">
                    <div className="max-w-[calc(100%-36px)]">
                      <h3 className="tracking-tight align-middle">
                        <Skeleton className="w-[56px] max-w-full" />
                      </h3>
                    </div>
                    <form>
                      <div className="items-center transition-colors h-9 w-9 flex justify-end">
                        <SVGSkeleton className="w-[20px] h-[20px]" />
                      </div>
                    </form>
                  </div>
                  <div>
                    <div className="flex justify-between">
                      <div className="inline-flex items-center border px-2.5 py-0.5 transition-colors border-transparent m-0">
                        <Skeleton className="w-[24px] max-w-full" />
                      </div>
                      <div className="text-left">
                        <Skeleton className="w-[24px] max-w-full" />
                      </div>
                    </div>
                    <div className="mt-2 flex justify-between">
                      <div className="flex flex-nowrap items-center text-right">
                        <Skeleton className="w-[40px] max-w-full" />
                        <SVGSkeleton className="mx-1 size-3 w-[1empx] h-[1empx]" />
                      </div>
                      <div className="text-right">
                        <a className="hidden md:block">
                          <Skeleton className="w-[72px] max-w-full" />
                        </a>
                        <div className="hidden items-end text-right md:block">
                          <Skeleton className="w-[152px] max-w-full" />
                        </div>
                        <div className="flex items-end text-right md:hidden">
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
              <div className="absolute right-0 top-0 m-2"></div>
              <div className="border w-[150px] md:w-[200px] lg:w-[300px] mx-[5px] my-[0.5rem]">
                <a>
                  <SVGSkeleton className="rounded-t-xl w-[300px] h-[300px]" />
                </a>
                <div className="flex flex-col space-y-1.5 p-3">
                  <div className="flex max-w-full justify-between">
                    <div className="max-w-[calc(100%-36px)]">
                      <h3 className="tracking-tight align-middle">
                        <Skeleton className="w-[80px] max-w-full" />
                      </h3>
                    </div>
                    <form>
                      <div className="items-center transition-colors h-9 w-9 flex justify-end">
                        <SVGSkeleton className="w-[20px] h-[20px]" />
                      </div>
                    </form>
                  </div>
                  <div>
                    <div className="flex justify-between">
                      <div className="inline-flex items-center border px-2.5 py-0.5 transition-colors border-transparent m-0">
                        <Skeleton className="w-[48px] max-w-full" />
                      </div>
                      <div className="text-left">
                        <Skeleton className="w-[40px] max-w-full" />
                      </div>
                    </div>
                    <div className="mt-2 flex justify-between">
                      <div className="flex flex-nowrap items-center text-right">
                        <Skeleton className="w-[40px] max-w-full" />
                        <SVGSkeleton className="mx-1 size-3 w-[1empx] h-[1empx]" />
                      </div>
                      <div className="text-right">
                        <a className="hidden md:block">
                          <Skeleton className="w-[72px] max-w-full" />
                        </a>
                        <div className="hidden items-end text-right md:block">
                          <Skeleton className="w-[152px] max-w-full" />
                        </div>
                        <div className="flex items-end text-right md:hidden">
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
              <div className="absolute right-0 top-0 m-2"></div>
              <div className="border w-[150px] md:w-[200px] lg:w-[300px] mx-[5px] my-[0.5rem]">
                <a>
                  <SVGSkeleton className="rounded-t-xl w-[300px] h-[300px]" />
                </a>
                <div className="flex flex-col space-y-1.5 p-3">
                  <div className="flex max-w-full justify-between">
                    <div className="max-w-[calc(100%-36px)]">
                      <h3 className="tracking-tight align-middle">
                        <Skeleton className="w-[32px] max-w-full" />
                      </h3>
                    </div>
                    <form>
                      <div className="items-center transition-colors h-9 w-9 flex justify-end">
                        <SVGSkeleton className="w-[20px] h-[20px]" />
                      </div>
                    </form>
                  </div>
                  <div>
                    <div className="flex justify-between">
                      <div className="inline-flex items-center border px-2.5 py-0.5 transition-colors border-transparent m-0">
                        <Skeleton className="w-[96px] max-w-full" />
                      </div>
                      <div className="text-left">
                        <Skeleton className="w-[32px] max-w-full" />
                      </div>
                    </div>
                    <div className="mt-2 flex justify-between">
                      <div className="flex flex-nowrap items-center text-right">
                        <Skeleton className="w-[40px] max-w-full" />
                        <SVGSkeleton className="mx-1 size-3 w-[1empx] h-[1empx]" />
                      </div>
                      <div className="text-right">
                        <a className="hidden md:block">
                          <Skeleton className="w-[72px] max-w-full" />
                        </a>
                        <div className="hidden items-end text-right md:block">
                          <Skeleton className="w-[152px] max-w-full" />
                        </div>
                        <div className="flex items-end text-right md:hidden">
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
  </>
);

const LoadingSkeletonBrowse = () => (
  <div className="flex justify-center w-full h-full p-10">
    <LoadingSkeleton />
  </div>
);

export default LoadingSkeletonBrowse;