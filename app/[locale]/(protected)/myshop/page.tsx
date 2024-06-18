import { Button } from '@/components/ui/button'
import { Link } from '@/navigation'
import MyShopContent from '@/components/myShop/myshopContent'
import { getTranslations } from 'next-intl/server'
import Banner from '@/components/myShop/banner'

const MyShop = async () => {
  const t = await getTranslations('MyShop')
  return (
    <div className="inset-x-1/2 top-24 flex flex-col items-center">
      <Banner defaultBannerUrl={''} />
      <h1 className="mb-4 mt-20 text-left font-montserrat text-3xl font-bold">{t('title')}</h1>
      <div>
        <MyShopContent />
      </div>
      <div className="fixed bottom-8 right-28 mt-8 flex justify-end space-x-4">
        <Link href="myshop/add">
          <Button> {t('addProducts')}</Button>
        </Link>
      </div>
    </div>
  )
}

export default MyShop
