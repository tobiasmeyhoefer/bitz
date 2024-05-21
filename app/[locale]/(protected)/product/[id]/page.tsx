import { ProductType } from '@/lib/types'
import { ProductImageCarousel } from '../productImgCarousel'

export default function Page({
  params,
  searchParams,
}: {
  params: { id: string }
  searchParams: { p: string }
}) {
  const productId = atob(params.id)
  const product: ProductType = JSON.parse(atob(searchParams.p))
  return (
    <div>
      Some Product ID: {productId}
      {/* <div>Title: {product.title}</div> */}
      <br />
      <br />
      {product.title}
      <ProductImageCarousel className="mx-auto" />
    </div>
  )
}
