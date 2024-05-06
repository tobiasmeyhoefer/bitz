import { useTranslations } from 'next-intl'
import { Button } from '@/components/ui/button'
import Link from 'next/link'

const MyShop = () => {
  const t = useTranslations('MyShop')
  const linktext = useTranslations('addProducts')
  return (
    <>
      <h1>{t('title')}</h1>
      <Button asChild className="absolute bottom-20 left-1/2">
        <Link href="myshop/add">{linktext('title')}</Link>
      </Button>
    </>
  )
}

export default MyShop
