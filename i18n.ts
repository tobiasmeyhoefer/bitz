import { notFound } from 'next/navigation'
import { getRequestConfig } from 'next-intl/server'

export const locales = ['en', 'de'] as const
type Locale = (typeof locales)[number]

export default getRequestConfig(async ({ locale }: { locale: string }) => {
  if (!locales.includes(locale as Locale)) notFound()

  return {
    messages: (await import(`@/messages/${locale}.json`)).default,
  }
})
