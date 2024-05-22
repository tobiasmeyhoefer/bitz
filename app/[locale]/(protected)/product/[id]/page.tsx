import { ProductType } from '@/lib/types'
import { ProductImageCarousel } from '../productImgCarousel'
import { Button } from '@/components/ui/button'
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from '@/components/ui/card'
import { timestamp } from 'drizzle-orm/mysql-core'

export default function Page({
  params,
  searchParams,
}: {
  params: { id: string }
  searchParams: { p: string }
}) {
  const productId = atob(params.id)
  const product: ProductType = JSON.parse(atob(searchParams.p))

  const getDate = (timestamp: any) => {
    const date = new Date(timestamp)

    return (
      <div>
        {date.getDate()} {date.getMonth() + 1} {date.getFullYear()} {date.getHours()}:
        {date.getMinutes()}
      </div>
    )
  }
  return (
    <div className="flex h-[70vh] w-full flex-col items-center justify-center lg:h-[60vh] lg:flex-row lg:justify-around">
      {/* <div>Title: {product.title}</div> */}
      <ProductImageCarousel className="" size={600} />
      {/* <div>
        infos
        <br />
        Some Product ID: {productId}
        <br />
        {product.title}
      </div> */}
      <Card className="h-full w-[80vw] lg:w-[40vw]">
        <CardHeader>
          <CardTitle className="flex justify-between">
            <div>{product.title}</div>
            <div className="text-3xl">{product.price} $</div>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div>{product.description}</div>
        </CardContent>
        <CardFooter className="flex justify-between">
          {getDate(product.createdAt)}
          <br />
          {product.createdAt?.toLocaleString()}
          <br />
          {product.createdAt?.toString()}
        </CardFooter>
        <div className="h-[44px]"></div>
      </Card>
    </div>
  )
}
