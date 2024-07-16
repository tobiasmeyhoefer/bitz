/**
 * Renders an error page for authentication-related errors.
 * 
 * This component is responsible for displaying appropriate error messages based on the error code passed in the URL query parameters.
 * It provides a "Home" button to navigate back to the main application.
 */
'use client'

import { Button } from '@/components/ui/button'
import { Link } from '@/navigation'
import { useParams, useSearchParams } from 'next/navigation'

enum Error {
  Configuration = 'Configuration',
  OAuthAccountNotLinked = 'OAuthAccountNotLinked',
}

const errorMap = {
  [Error.Configuration]: (
    <p>
      There was a problem. Please contact Tobi if this error persists. Unique error code:{' '}
      <code className="rounded-sm bg-slate-100 p-1 text-xs">Configuration</code>
    </p>
  ),
  [Error.OAuthAccountNotLinked]: (
    <p>
      <p>
        Wrong Account. Please contact Tobi if this error persists. Unique error code:{' '}
        <code className="rounded-sm bg-slate-100 p-1 text-xs">OAuthAccountNotLinked</code>
      </p>
    </p>
  ),
}

export default function AuthErrorPage() {
  const search = useSearchParams()
  const error = search.get('error') as Error

  return (
    <div className="flex h-screen w-full flex-col items-center justify-center">
      <div className="block max-w-sm rounded-lg border border-gray-200 bg-white p-6 text-center shadow">
        <h5 className="mb-2 flex flex-row items-center justify-center gap-2 text-xl font-bold tracking-tight text-gray-900 dark:text-white">
          Something went wrong ❌
        </h5>
        <div className="mb-4 font-normal text-gray-700 dark:text-gray-400">
          {errorMap[error] || 'Please contact us if this error persists.'}
        </div>
        <Link href={'/'}>
          <Button variant={"outline"}>Home</Button>
        </Link>
      </div>
      <div></div>
    </div>
  )
}
