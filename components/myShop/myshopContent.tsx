import { CardWithImage } from '@/components/ui/cardWithImage'
import { getProductsOwned } from '@/lib/productaction'
import { getUser } from '@/lib/useraction'

const MyShopContent = async () => {
  const users = await getUser()
  const user = users?.[0]
  const products = await getProductsOwned(user!.id)

  return (
    <div
      className={`flex h-full flex-col items-center justify-center px-4 py-20 sm:px-10 md:px-[20px] lg:px-[30px] xl:px-[80px]`}
    >
      {
        <div className="-mx-2 mt-[20px] flex flex-wrap justify-around overflow-y-hidden">
          {products?.map((p, index) => (
            <CardWithImage
              key={`pr-${index}`}
              title={p.title}
              price={p.price}
              desc={p.description!}
              imgUrl1={p.imageUrl1}
              timestamp={p.createdAt}
              className="mx-[5px] my-[0.5rem]"
              productID={p.id}
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
