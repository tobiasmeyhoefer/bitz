import LocaleSwitcher from "@/components/settings/LocaleSwitcher"
import LocationChooser from "@/components/settings/LocationChooser"

const Settings = () => {
  return (
    <div className="h-full px-20 py-40 flex flex-col items-center">
      <h1 className="text-3xl mb-10">Settings</h1>
      <LocaleSwitcher/>
      <LocationChooser/>
    </div>
  )
}

export default Settings
