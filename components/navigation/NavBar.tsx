import { auth } from "@/auth"
import { SignIn } from "../sign-in"
import { SignOut } from "../sign-out"
import Link from "next/link"

const NavBar = async () => {
  const session = await auth()
  const isLoggedIn = !!session?.user

  console.log(isLoggedIn)

  return (
    <nav className="flex justify-between px-20 h-[100px] items-center">
      <h1>Bitz</h1>
      <ul className="flex">
        {!isLoggedIn ? (
          <li className="flex gap-10">
            <Link href={"/auth/register"}>Registrieren</Link>
            <Link href={"/auth/login"}>Anmelden</Link>
          </li>
        ) : null}
        {isLoggedIn ? (
          <li>
            <SignOut/>
          </li>
        ) : null}
      </ul>
    </nav>
  )
}

export default NavBar
