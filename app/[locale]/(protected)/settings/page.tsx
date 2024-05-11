import RegisterPasskey from '@/components/auth/register-passkey'
import LocaleSwitcher from '@/components/settings/LocaleSwitcher'
import { checkPasskey } from '@/lib/action'

const Settings = async () => {
  // const hasPasskey = await checkPasskey()
  return (
    <div className="flex h-full flex-col items-center px-20 py-40">
      <h1 className="mb-10 text-3xl">Settings</h1>
      <div className="flex flex-col gap-6">
        <LocaleSwitcher />
        {/* {hasPasskey ? <p>Passkey registered</p> : <RegisterPasskey />} */}
        <RegisterPasskey />
      </div>
    </div>
  )
}

export default Settings
