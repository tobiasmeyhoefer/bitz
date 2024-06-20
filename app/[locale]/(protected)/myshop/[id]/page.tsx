import { getProductsOwned } from '@/lib/product-actions'
import { CardWithImage } from '@/components/ui/cardWithImage'

// Some user shop
export default async function Page({ params }: { params: { id: string } }) {
  const products = await getProductsOwned(params.id)

  return (
    <div
      className={`flex h-full flex-col items-center justify-center px-4 py-20 sm:px-10 md:px-[20px] lg:px-[30px] xl:px-[80px]`}
    >
      {
        <div className="-mx-2 mt-[20px] flex flex-wrap justify-around overflow-y-hidden">
          {products?.map((p, index) => (
            // <AnimatedCard  delay={0.3} >
            <CardWithImage
              key={`pr-${index}`}
              className="mx-[5px] my-[0.5rem]"
              product={products[index]}
              editable={false}
            />
            // </AnimatedCard>
          ))}
        </div>
      }
    </div>
  )
}
