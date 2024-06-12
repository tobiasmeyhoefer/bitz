import { Button } from '@/components/ui/button'
import { Link } from '@/navigation'
import MyShopContent from '@/components/myShop/myshopContent'
import { getTranslations } from 'next-intl/server'

const MyShop = async () => {
  const t = await getTranslations('MyShop')
  return (
    <div className="inset-x-1/2 top-24 flex flex-col items-center">
      <h1 className="mb-4 mt-20 text-left font-montserrat text-3xl font-bold">{t('title')}</h1>
      <div className="">
        <MyShopContent />
      </div>
      <div className="fixed bottom-0 right-0 mt-8 flex justify-end space-x-4 px-10 py-5">
        <Link href="myshop/add">
          <Button> {t('addProducts')}</Button>
        </Link>
      </div>
    </div>
  )
}

export default MyShop
