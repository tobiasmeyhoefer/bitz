import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card'
import { Separator } from '@/components/ui/separator'
import { ProductType } from '@/lib/types'
import { useTranslations, useLocale } from 'next-intl'

type ProductInfoType = {
  product: ProductType
}

export default function ProductInfoCard(props: ProductInfoType) {
  const product = props.product
  const tDate = useTranslations('Date')
  const tProduct = useTranslations('Product')
  const locale = useLocale()

  const getDate = (timestamp: any) => {
    const date = new Date(timestamp)
    let month = ''

    switch (date.getUTCMonth() + 1) {
      case 1:
        month = tDate('january')
      case 2:
        month = tDate('february')
      case 3:
        month = tDate('march')
      case 4:
        month = tDate('april')
      case 5:
        month = tDate('may')
      case 6:
        month = tDate('june')
      case 7:
        month = tDate('july')
      case 8:
        month = tDate('august')
      case 9:
        month = tDate('september')
      case 10:
        month = tDate('october')
      case 11:
        month = tDate('november')
      case 12:
        month = tDate('december')
    }
    if (locale === 'en') {
      let time
      if (date.getUTCHours() > 12) {
        time = `${date.getUTCHours() - 12}:${date.getUTCMinutes()} p.m.`
      } else {
        time = `${date.getUTCHours()}:${date.getUTCMinutes()}  a.m.`
      }
      return (
        <div className="text-right text-xs">
          {date.getUTCDate()} {month} {date.getUTCFullYear()}
          <br /> {time}
        </div>
      )
    } else if (locale === 'de') {
      return (
        <div className="text-right text-xs">
          {date.getUTCDate()}.{month} {date.getUTCFullYear()}
          <br /> {date.getUTCHours()}:{date.getUTCMinutes()} Uhr
        </div>
      )
    }
  }
  return (
    <Card className="my-3 h-full w-[90vw] lg:my-0 lg:h-[60vh] lg:w-[40vw]">
      <CardHeader className="flex h-[20%] flex-row items-center justify-between">
        <CardTitle className="text-center">{product.title}</CardTitle>
        <CardTitle className="text-3xl">
          {product.price} {locale === 'en' ? '$' : '€'}
        </CardTitle>
      </CardHeader>
      <Separator />
      <CardContent className="flex h-[80%] flex-col justify-between p-6">
        <div className="flex justify-between pb-6">
          <div>{product.description}</div>
          <div className="text-nowrap text-right lg:w-[20vw]">
            {tProduct('quantity')}: {product.quantity}
          </div>
        </div>
        <div>{getDate(product.createdAt)}</div>
      </CardContent>
    </Card>
  )
}
