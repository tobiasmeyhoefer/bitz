import { useTranslations } from 'next-intl'
import { Button } from '@/components/ui/button'
import { Link } from '@/navigation'

const MyShop = () => {
  const t = useTranslations('MyShop')
  return (
    <>
      <h1>{t('title')}</h1>
      <Button className="absolute bottom-20 left-1/4">
        <Link href="myshop/add">{t('addProducts')}</Link>
      </Button>
      <Button className="absolute bottom-20 left-3/4">
        <Link href="myshop/update">{t('updateProducts')}</Link>
      </Button>
    </>
  )
}

export default MyShop
