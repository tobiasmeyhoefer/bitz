import { signIn } from "@/auth"

const Register = () => {
  return (
    <>
      <h1>Register</h1>
      <form
        action={async (formData) => {
          "use server"
          await signIn("resend", formData)
        }}
      >
        <input type="text" name="email" placeholder="Email" />
        <button type="submit">Signin with Resend</button>
      </form>
    </>
  )
}

export default Register
