import { WelcomeEmail } from '@/components/email/email-template'
import { Resend } from 'resend'

const resend = new Resend(process.env.AUTH_RESEND_KEY)

export async function POST(req: Request) {
  const { to } = await req.json()

  try {
    const { data, error } = await resend.emails.send({
      from: 'auth@bitztech.de',
      to: to,
      subject: `Welcome at Bitz!`,
      react: WelcomeEmail(),
    })

    if (error) {
      return Response.json({ error }, { status: 500 })
    }

    return Response.json(data)
  } catch (error) {
    return Response.json({ error }, { status: 500 })
  }
}
