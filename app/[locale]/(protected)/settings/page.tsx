import RegisterPasskey from "@/components/auth/register-passkey"
import LocaleSwitcher from "@/components/settings/LocaleSwitcher"

const Settings = () => {
  return (
    <div className="h-full px-20 py-40 flex flex-col items-center">
      <h1 className="text-3xl mb-10">Settings</h1>
      <LocaleSwitcher/>
      <RegisterPasskey/>
    </div>
  )
}

export default Settings
