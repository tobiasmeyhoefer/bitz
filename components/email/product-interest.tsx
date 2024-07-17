import { Html } from '@react-email/html'
import { Head, Hr, Link, Row, Section, Tailwind, Text } from '@react-email/components'

/**
 * Renders an email template for a product interest notification.
 *
 * @param {object} props - The component props.
 * @param {string} props.productName - The name of the product.
 * @returns {JSX.Element} - The rendered email template.
 */

export default function ProductInterestEmail(productName: string) {
  return (
    <Tailwind>
      <Html>
        <Section className="text-center">
          <Row>
            <Head>
              <title>{productName}</title>
            </Head>
            <Text className="text-2xl font-bold">
              Somebody wants to buy your Bit {productName}!
            </Text>
            <Text className="text-lg">Start chatting now</Text>
            <Hr className="mb-10" />
            <Link
              className="rounded-lg bg-black px-6 py-2 text-white hover:bg-neutral-800"
              href="https://bitztech.de/en/conversations"
            >
              Conversations
            </Link>
          </Row>
        </Section>
      </Html>
    </Tailwind>
  )
}
