import { SignInGoogle } from "@/components/auth/sign-in-google";
import { SignInResend } from "@/components/auth/sign-in-resend";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle,} from "@/components/ui/card";

const Login = () => {
  return (
    <div className="flex justify-center mt-10">
    <Card className="w-[500px] h-[330px]">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl">Login</CardTitle>
          <CardDescription>via Google or Email</CardDescription>
        </CardHeader>
        <CardContent className="text-center">
            <div className="grid w-full items-center gap-8">
              <div className="flex flex-col space-y-2.5">
                <p> SignIn with your Google Account</p>
                <SignInGoogle/>
              </div>
              <div className= "flex flex-col space-y-2.5 align-center">
                <p> SignIn with your Email Account</p>
                <SignInResend/>
              </div>
            </div>
        </CardContent>
      </Card>
    </div>
  );
}
 
export default Login;