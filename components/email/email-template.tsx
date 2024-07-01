import { Html } from '@react-email/html'
import { Text } from '@react-email/text'
import { Section } from '@react-email/section'
import { Container } from '@react-email/container'
import { Link, Tailwind } from '@react-email/components'
import { Img } from '@react-email/components'

export function WelcomeEmail() {
  return (
    <Tailwind>
      <Html>
        <Img src="/images/mail/welcome.png" alt="Welcome" width="300" height="300" />;
        <h2 className="mb-10 text-3xl font-bold">Welcome at Bitz!</h2>
        <p className="mb-10">
          Thank you for creating an account! We hope you will like our Open Source Project. If you
          need help or further information just ask our AI
        </p>
        <a href="https://bitztech.de" className="rounded-lg bg-black px-5 py-3 text-white">
          To Bitz
        </a>
      </Html>
    </Tailwind>
  )
}

export function ProductInterestEmail(header: string, content: string) {
  return (
    <Html>
      <Section style={main}>
        <Container style={container}>
          <Text style={heading}>Somebody wants to buy your Bit</Text>
          <Text style={paragraph}>Start chatting now</Text>
          <Link href="https://bitztech.de/en/conversations">Conversations</Link>;
        </Container>
      </Section>
    </Html>
  )
}

export function ProductDirectlySoldEmail(productName: string, address: string) {
  return (
    <Html>
      <Section style={main}>
        <Container style={container}>
          <Text style={heading}>Your Bit {productName} has been bought</Text>
          <Text style={paragraph}>Please send your Bit here: {address} in the next 7 Days</Text>
          <Link href="https://bitztech.de/en">Bitz</Link>;
        </Container>
      </Section>
    </Html>
  )
}

export function NewMessagesEmail() {
  return (
    <Html>
      <Section style={main}>
        <Container style={container}>
          <Text style={heading}>There are new messages to check out at Bitz</Text>
          <Link href="https://bitztech.de/en/conversations">Conversations</Link>;
        </Container>
      </Section>
    </Html>
  )
}

export function AccountVerified() {
  return (
    <Html>
      <Section style={main}>
        <Container style={container}>
          <Text style={heading}>Your Account has been verified!</Text>
          <Text style={paragraph}>You can now use all functions of Bitz!</Text>
          <Link href="https://bitztech.de/en/conversations">Bitz</Link>;
        </Container>
      </Section>
    </Html>
  )
}

// Styles for the email template
const main = {
  backgroundColor: '#ffffff',
}

const container = {
  margin: '0 auto',
  padding: '20px 0 48px',
  width: '580px',
}

const heading = {
  fontSize: '32px',
  lineHeight: '1.3',
  fontWeight: '700',
  color: '#484848',
}

const paragraph = {
  fontSize: '18px',
  lineHeight: '1.4',
  color: '#484848',
}
