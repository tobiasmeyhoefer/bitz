import { getProductsOwned } from '@/lib/product-actions'
import { getUser } from '@/lib/user-actions'
import { getTranslations } from 'next-intl/server'
import { CardWithImage } from '../ui/cardWithImage'

const MyShopContent = async () => {
  const user = await getUser()
  const products = await getProductsOwned(user.id)
  const tShop = await getTranslations('MyShop')
  const tAlert = await getTranslations('ProdDelAlert')
  const myshopTranslations = {
    sold: tShop('sold'),
    menuDeleteOption: tAlert('menuDeleteOption'),
    title: tAlert('title'),
    yousure: tAlert('yousure'),
    cancel: tAlert('cancel'),
    confirm: tAlert('confirm'),
  }
  if (products.length === 0) {
    return <p className="mt-20 px-4 text-center text-lg font-bold">{tShop('noBitz')}</p>
  }

  return (
    <div
      className={`flex h-full flex-col items-center justify-center px-4 py-10 sm:px-10 md:px-[20px] lg:px-[30px] xl:px-[80px]`}
    >
      {
        <div className="mx-2 mt-[20px] flex flex-wrap justify-around overflow-hidden">
          {products?.map((p, index) => (
            <CardWithImage
              key={`pr-${index}`}
              className="mx-[5px] my-[0.5rem]"
              product={p}
              editable
              viewTranslation={tShop('viewShop')}
              myshopTranslations={myshopTranslations}
            />
          ))}
        </div>
      }
    </div>
  )
}

export default MyShopContent
