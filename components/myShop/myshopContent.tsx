import { CardWithImage } from '@/components/ui/cardWithImage'
import { getProductsOwned } from '@/lib/product-actions'
import { getUser } from '@/lib/user-actions'

const MyShopContent = async () => {
  const user = await getUser()
  const products = await getProductsOwned(user.id)

  if(products.length === 0) {
    return <p>Du hast noch keine Bitz veröffentlicht</p>
  }

  return (
    <div
      className={`flex h-full flex-col items-center justify-center px-4 py-20 sm:px-10 md:px-[20px] lg:px-[30px] xl:px-[80px]`}
    >
      {
        <div className="-mx-2 mt-[20px] flex flex-wrap justify-around overflow-y-hidden">
          {products?.map((p, index) => (
            <CardWithImage
              key={`pr-${index}`}
              className="mx-[5px] my-[0.5rem]"
              product={products[index]}
              favIcon
              editable
            />
          ))}
        </div>
      }
    </div>
  )
}

export default MyShopContent
