import { Button } from '@/components/ui/button'
import { Link } from '@/navigation'
import MyShopContent from '@/components/myShop/myshopContent'
import { getTranslations } from 'next-intl/server'
import Banner from '@/components/myShop/banner'

const MyShop = async () => {
  const t = await getTranslations('MyShop')
  return (
    <div className="inset-x-1/2 flex flex-col items-center">
      <Banner title={t('title')} />
      <div>
        <MyShopContent />
      </div>
      <div className="fixed bottom-8 right-28 flex justify-end space-x-4">
        <Link href="myshop/add">
          <Button> {t('addProducts')}</Button>
        </Link>
      </div>
    </div>
  )
}

export default MyShop
