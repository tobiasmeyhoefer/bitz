import { CardWithImage } from '@/components/ui/cardWithImage'
import { getFavoriteProducts } from '@/lib/productaction'

const Favorites = async () => {
  const products = await getFavoriteProducts()
  return (
    <>
      <h1 className="text-3xl font-bold">Favoriten</h1>
      <div
        className={`${`h-full`} flex w-full flex-col items-center justify-center px-10 py-20 md:px-[20px] lg:px-[30px] xl:px-[80px]`}
      >
        <div className="-mx-2 mt-[20px] flex flex-wrap justify-around overflow-y-hidden">
          {products?.map((p, index) => (
            <CardWithImage
              key={`pr-${index}`}
              title={p.title}
              desc={p.description!}
              imgUrl1={p.imageUrl1}
              className="mx-[5px] my-[0.5rem]"
              productID={p.id}
              favIcon
              editable={false}
            />
          ))}
        </div>
      </div>
    </>
  )
}

export default Favorites
