import { Skeleton, SVGSkeleton } from '@/components/ui/skeleton'


/**
 * Renders a loading skeleton for a conversation list.
 * The skeleton includes placeholders for the conversation image, title, and description.
 * This component is typically used when the actual conversation data is being loaded.
 */

export const ConversationLoadingSkeleton = () => (
  /**
   * Renders the ConversationLoadingSkeleton component within a centered container.
   * This component is typically used for previewing the loading skeleton in a sandbox or development environment.
   */
  <>
    <div className="flex w-full flex-col gap-6">
      <a>
        <div className="relative flex h-[140px] border">
          <div>
            <SVGSkeleton className="h-[140px] min-h-[140px] w-[140px] min-w-[140px]" />
          </div>
          <div>
            <div className="flex flex-col space-y-1.5 p-6">
              <h3 className="leading-none tracking-tight">
                <Skeleton className="w-[328px] max-w-full" />
              </h3>
            </div>
            <div className="flex flex-col items-start p-6 pt-0">
              <p>
                <Skeleton className="w-[152px] max-w-full" />
              </p>
            </div>
          </div>
        </div>
      </a>
      <a>
        <div className="relative flex h-[140px] border">
          <div>
            <SVGSkeleton className="h-[140px] min-h-[140px] w-[140px] min-w-[140px]" />
          </div>
          <div>
            <div className="flex flex-col space-y-1.5 p-6">
              <h3 className="leading-none tracking-tight">
                <Skeleton className="w-[352px] max-w-full" />
              </h3>
            </div>
            <div className="flex flex-col items-start p-6 pt-0">
              <p>
                <Skeleton className="w-[152px] max-w-full" />
              </p>
            </div>
          </div>
        </div>
      </a>
      <a>
        <div className="relative flex h-[140px] border">
          <div>
            <SVGSkeleton className="h-[140px] min-h-[140px] w-[140px] min-w-[140px]" />
          </div>
          <div>
            <div className="flex flex-col space-y-1.5 p-6">
              <h3 className="leading-none tracking-tight">
                <Skeleton className="w-[392px] max-w-full" />
              </h3>
            </div>
            <div className="flex flex-col items-start p-6 pt-0">
              <p>
                <Skeleton className="w-[152px] max-w-full" />
              </p>
            </div>
          </div>
        </div>
      </a>
      <a>
        <div className="relative flex h-[140px] border">
          <div>
            <SVGSkeleton className="h-[140px] min-h-[140px] w-[140px] min-w-[140px]" />
          </div>
          <div>
            <div className="flex flex-col space-y-1.5 p-6">
              <h3 className="leading-none tracking-tight">
                <Skeleton className="w-[384px] max-w-full" />
              </h3>
            </div>
            <div className="flex flex-col items-start p-6 pt-0">
              <p>
                <Skeleton className="w-[152px] max-w-full" />
              </p>
            </div>
          </div>
        </div>
      </a>
      <a>
        <div className="relative flex h-[140px] border">
          <div>
            <SVGSkeleton className="h-[140px] min-h-[140px] w-[140px] min-w-[140px]" />
          </div>
          <div>
            <div className="flex flex-col space-y-1.5 p-6">
              <h3 className="leading-none tracking-tight">
                <Skeleton className="w-[352px] max-w-full" />
              </h3>
            </div>
            <div className="flex flex-col items-start p-6 pt-0">
              <p>
                <Skeleton className="w-[152px] max-w-full" />
              </p>
            </div>
          </div>
        </div>
      </a>
      <a>
        <div className="relative flex h-[140px] border">
          <div>
            <SVGSkeleton className="h-[140px] min-h-[140px] w-[140px] min-w-[140px]" />
          </div>
          <div>
            <div className="flex flex-col space-y-1.5 p-6">
              <h3 className="leading-none tracking-tight">
                <Skeleton className="w-[456px] max-w-full" />
              </h3>
            </div>
            <div className="flex flex-col items-start p-6 pt-0">
              <p>
                <Skeleton className="w-[152px] max-w-full" />
              </p>
            </div>
          </div>
        </div>
      </a>
    </div>
  </>
)

// Sandbox preview implementation
const SandboxPreview = () => (
  <div className="flex h-full w-full justify-center p-10">
    <ConversationLoadingSkeleton />
  </div>
)

export default SandboxPreview
