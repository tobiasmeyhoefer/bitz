import { ProductType } from '@/lib/types'

export default function Page({
  params,
  searchParams,
}: {
  params: { id: string }
  searchParams: { p: string }
}) {
  const product: ProductType = JSON.parse(searchParams.p)
  return (
    <div>
      Some Product ID: {params.id}
      <div>Title: {product.title}</div>
    </div>
  )
}
