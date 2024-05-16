import {
  Shop,
  RevealOnScrollProps,
} from '@/lib/types'
import { CardWithImage } from '@/components/ui/card'
import { getFavorites } from '@/lib/productaction'
import { ProductType } from '@/lib/types'

const FavoriteContent = async () => {
  // const [loading, setLoading] = useState(false)
  let isProduct = (item: any) => item.price !== undefined
  const products = await getFavorites()
  console.log(products)
  return (
    <div
      // className={`${loading && `h-full`} flex w-full flex-col items-center justify-center px-10 py-20 md:px-[20px] lg:px-[30px] xl:px-[80px]`}
      // !loading ?
    >
        <div className="-mx-2 mt-[20px] flex flex-wrap justify-around overflow-y-hidden">
          {products?.map((p, index) => (
              <CardWithImage
                key={`pr-${index}`}
                title={p.title}
                desc={p.description!}
                imgUrl1={p.imageUrl1}
                previewType={isProduct(p) ? 'product' : 'shop'}
                className="mx-[5px] my-[0.5rem]"
                productId={p.id}
              />
          ))}
        </div>
    </div>
  )
}

export default FavoriteContent