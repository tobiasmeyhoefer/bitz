/**
 * Renders an email template for an account verification notification.
 *
 * This component is used to generate an HTML email that is sent to users when their
 * Bitz account has been successfully verified. It includes a title, a message
 * indicating that the account is now fully functional, and a link to the Bitz
 * website.
 */
import { Html } from '@react-email/html'
import { Head, Hr, Link, Row, Section, Tailwind, Text } from '@react-email/components'

export default function AccountVerifiedEmail() {
  return (
    <Tailwind>
      <Html>
        <Section className='text-center'>
          <Row>
            <Head>
              <title>Your Bitz Account has been verified!</title>
            </Head>
            <Text className="text-2xl font-bold text-neutral-900">Your Bitz Account has been verified!</Text>
            <Text className="text-lg text-neutral-900">You can now use all functions of Bitz!</Text>
            <Hr className='mb-10' />
            <Link
              className="rounded-lg bg-neutral-900 px-6 py-2 text-white"
              href="https://bitztech.de/en"
            >
              Bitz
            </Link>
          </Row>
        </Section>
      </Html>
    </Tailwind>
  )
}
