"use client"

import { signIn } from "@/auth";
import { Button } from "../ui/button";
import { DEFAULT_LOGIN_REDIRECT } from "@/routes";
import { FcGoogle } from "react-icons/fc";
import { FaGithub } from "react-icons/fa";

const Socials = () => {
  const onClick = (provider: "google"| "github") => {
    signIn(provider, {
      callbackUrl: DEFAULT_LOGIN_REDIRECT
    })
  }
  return (
    <div className='flex w-full items-center gap-x-2'>
      <Button
        size={'lg'}
        className='w-full'
        variant={'outline'}
        onClick={() => onClick("google")}
      >
        <FcGoogle className='h-5 w-5' />
      </Button>
      <Button
        size={'lg'}
        className='w-full'
        variant={'outline'}
        onClick={() => onClick("github")}
      >
        <FaGithub className='h-5 w-5' />
      </Button>
    </div>
  );
}
 
export default Socials;