import { auth } from "@/auth"
import RegisterPasskey from "@/components/auth/register-passkey"
import LocaleSwitcher from "@/components/settings/LocaleSwitcher"
import { checkPasskey } from "@/lib/action"

const Settings = async () => {
  const hasPasskey = await checkPasskey()
  return (
    <div className="h-full px-20 py-40 flex flex-col items-center">
      <h1 className="text-3xl mb-10">Settings</h1>
      <div className="flex flex-col gap-6">
      <LocaleSwitcher/>
      {hasPasskey ? <p>Passkey already registered</p> : <RegisterPasskey/>}
      </div>
      {/* <RegisterPasskey/> */}
    </div>
  )
}

export default Settings
