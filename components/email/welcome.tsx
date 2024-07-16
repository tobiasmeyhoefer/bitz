/**
 * Renders a welcome email component for the Bitz Open Source Project.
 *
 * This component displays a welcome message, a link to the Bitz website, and some
 * additional information for new users who have created an account.
 *
 * @returns {JSX.Element} The welcome email component
 */

import { Html } from '@react-email/html'
import { Head, Hr, Link, Row, Section, Tailwind, Text } from '@react-email/components'

export default function WelcomeEmail() {
  return (
    <Tailwind>
      <Html>
        <Section className="text-center">
          <Row>
            <Head>
              <title>Welcome at Bitz!</title>
            </Head>
            <Text className="text-2xl font-bold">Welcome at Bitz!</Text>
            <Text className="text-lg">
              Thank you for creating an account! We hope you will like our Open Source Project. If
              you need help or further information just ask our AI
            </Text>
            <Hr className="mb-10" />
            <Link
              className="rounded-lg bg-black px-6 py-2 text-white hover:bg-neutral-800"
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
