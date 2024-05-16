import { CardWithImage } from '@/components/ui/card'
import { getFavoriteProducts } from '@/lib/productaction'

const Favorites = async () => {
  const products = await getFavoriteProducts()
  return (
    <div
      className={`${`h-full`} flex w-full flex-col items-center justify-center px-10 py-20 md:px-[20px] lg:px-[30px] xl:px-[80px]`}
      // !loading ?
    >
        <div className="-mx-2 mt-[20px] flex flex-wrap justify-around overflow-y-hidden">
          {products?.map((p, index) => (
              <CardWithImage
                key={`pr-${index}`}
                title={p.title}
                desc={p.description!}
                imgUrl1={p.imageUrl1}
                previewType={'product'}
                className="mx-[5px] my-[0.5rem]"
                productId={p.id}
              />
          ))}
        </div>
    </div>
  )
}

export default Favorites
