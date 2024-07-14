import { CardWithImageMyShop } from '../ui/cardWithImageMyShop'
import { getProductsOwned } from '@/lib/product-actions'
import { getUser } from '@/lib/user-actions'
import AnimatedCard from '../ui/animated-card'
import { getTranslations } from 'next-intl/server'

const MyShopContent = async () => {
  const user = await getUser()
  const products = await getProductsOwned(user.id)
  const t = await getTranslations('MyShop')
  if (products.length === 0) {
    return <p>{t('noBitz')}</p>
  }

  return (
    <div
      className={`flex h-full flex-col items-center justify-center px-4 py-10 sm:px-10 md:px-[20px] lg:px-[30px] xl:px-[80px]`}
    >
      {
        <div className="mx-2 mt-[20px] flex flex-wrap justify-around overflow-y-hidden">
          {products?.map((p, index) => (
            // <AnimatedCard  delay={0.3} >
            <CardWithImageMyShop
              key={`pr-${index}`}
              className="mx-[5px] my-[0.5rem]"
              product={p}
              editable
              viewTranslation={t('viewShop')}
            />
            // </AnimatedCard>
          ))}
        </div>
      }
    </div>
  )
}

export default MyShopContent
