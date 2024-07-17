import { Html } from '@react-email/html'
import { Head, Hr, Link, Row, Section, Tailwind, Text } from '@react-email/components'
import { useTranslations } from 'next-intl'
/**
 * Renders an email template for a product interest notification.
 *
 * @param {object} props - The component props.
 * @param {string} props.productName - The name of the product.
 * @returns {JSX.Element} - The rendered email template.
 */

export default function ProductInterestEmail(productName: string) {
  const t = useTranslations('common')
  return (
    <Tailwind>
      <Html>
        <Section className="text-center">
          <Row>
            <Head>
              <title>
                {t('title')} {productName}!
              </title>
            </Head>
            <Text className="text-2xl font-bold">
              {t('title')} {productName}!
            </Text>
            <Text className="text-lg">{t('chatnow')}</Text>
            <Hr className="mb-10" />
            <Link
              className="rounded-lg bg-black px-6 py-2 text-white hover:bg-neutral-800"
              href="https://bitztech.de/en/conversations"
            >
              {t('chatnow')}
            </Link>
          </Row>
        </Section>
      </Html>
    </Tailwind>
  )
}
