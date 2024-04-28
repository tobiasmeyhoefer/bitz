import { SignIn } from "@/components/auth/sign-in";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle,} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const Login = () => {
  return (
  <div>
    <h1>Login</h1>
    <SignIn/>
  </div>
  );
}
 
export default Login;