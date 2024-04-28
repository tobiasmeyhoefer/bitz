import { signIn } from "@/auth"
import { Button } from "../ui/button"
import { MdEmail } from "react-icons/md"

export function SignInResend() {
  return (
    <form className="flex flex-col items-center space-y-1" action={async (formData) => {
      "use server";
      await signIn("resend", formData);
    }}>
    <input className="border-2 w-[250px] text-center" type="text" name="email" placeholder="Email" />
      <Button className=" w-[130px]" variant="outline" type="submit"> <MdEmail /></Button>
      </form>
  );
}