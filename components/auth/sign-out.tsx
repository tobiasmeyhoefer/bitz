import { signOut } from "@/auth"
import { Button } from "../ui/button"
import {useTranslations} from 'next-intl';
 
export function SignOut() {
  const t = useTranslations("Navbar")
  return (
    <form
      action={async () => {
        "use server"
        await signOut()
      }}
    >
      <Button type="submit">{t("logoutButton")}</Button>
    </form>
  )
}