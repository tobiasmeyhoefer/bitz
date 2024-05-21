import { SVGSkeleton, Skeleton } from '@/components/ui/skeleton'

export default function Loading() {
  // You can add any UI inside Loading, including a Skeleton.
  return (
     <>
    <div className="flex w-full flex-col items-center justify-center px-4 py-20 sm:px-10 md:px-[20px] lg:px-[30px] xl:px-[80px]">
      <div className="flex border border-input px-3 py-1 shadow-sm transition-colors file:border-0 top-[20px] h-14 w-full sm:w-2/3 md:w-1/2">
        <Skeleton className="w-[136px] max-w-full" />
      </div>
      <div className="-mx-2 mt-[20px] flex flex-wrap justify-around overflow-y-hidden">
        <div>
          <div className="border w-[300px] mx-[5px] my-[0.5rem]">
            <a>
              <SVGSkeleton className="rounded-t-xl w-[300px] h-[300px]" />
            </a>
            <div className="flex flex-col space-y-1.5 p-3">
              <div className="flex justify-between">
                <h3 className="tracking-tight align-middle">
                  <Skeleton className="w-[32px] max-w-full" />
                </h3>
                <form>
                  <div className="inline-flex items-center justify-center transition-colors h-9 w-9">
                    <SVGSkeleton className="w-5 h-20" />
                  </div>
                </form>
              </div>
              <p>
                <Skeleton className="w-[32px] max-w-full" />
              </p>
            </div>
          </div>
        </div>
        <div>
          <div className="border w-[300px] mx-[5px] my-[0.5rem]">
            <a>
              <SVGSkeleton className="rounded-t-xl w-[300px] h-[300px]" />
            </a>
            <div className="flex flex-col space-y-1.5 p-3">
              <div className="flex justify-between">
                <h3 className="tracking-tight align-middle">
                  <Skeleton className="w-[80px] max-w-full" />
                </h3>
                <form>
                  <div className="inline-flex items-center justify-center transition-colors h-9 w-9">
                    <SVGSkeleton className="w-5 h-20" />
                  </div>
                </form>
              </div>
              <p>
                <Skeleton className="w-[40px] max-w-full" />
              </p>
            </div>
          </div>
        </div>
        <div>
          <div className="border w-[300px] mx-[5px] my-[0.5rem]">
            <a>
              <SVGSkeleton className="rounded-t-xl w-[300px] h-[300px]" />
            </a>
            <div className="flex flex-col space-y-1.5 p-3">
              <div className="flex justify-between">
                <h3 className="tracking-tight align-middle">
                  <Skeleton className="w-[80px] max-w-full" />
                </h3>
                <form>
                  <div className="inline-flex items-center justify-center transition-colors h-9 w-9">
                    <SVGSkeleton className="w-5 h-20" />
                  </div>
                </form>
              </div>
              <p>
                <Skeleton className="w-[40px] max-w-full" />
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </>
  )
}
