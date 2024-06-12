import 'server-only'
import { getUserById } from '@/lib/user-actions'
import { auth } from '@/auth'
import { getTranslations } from 'next-intl/server'
import { useSession } from 'next-auth/react'

const SessionPage = async () => {
  let location
  const session = await auth()
  //    const { data: session } = useSession();
  const user = await getUserById(session?.user?.id!)
  const userId = session?.user?.id!
  //const userId = session?.user?.id;
  try {
    if (user.location) {
      location = user.location
    }
  } catch (err) {}
  const t = await getTranslations('MyShop')

  return (
    <div className="inset-x-1/2 top-24 flex flex-col items-center">
      <div className="inset-x-1/2 top-24 flex flex-col items-center">
        <h1>Test Page</h1>
        {session ? (
          <p>Current Session expires: {session?.expires}</p>
        ) : (
          <p>No user session found.</p>
        )}
      </div>
      <div className="inset-x-1/2 top-24 flex flex-col items-center">
        {user ? <p>Current User ID: {userId}</p> : <p>No user session found.</p>}
      </div>
    </div>
  )
}
export default SessionPage
