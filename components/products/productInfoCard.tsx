import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card'
import { Separator } from '@/components/ui/separator'
import { useTranslations, useLocale } from 'next-intl'
import ProductInfoCardEditable from './productInfoCardEditable'
import { cn } from '@/lib/utils'
import { BuyButtons } from '@/components/products/buy-buttons'
import { ProductType } from '@/schema'
import { Link } from '@/navigation'

type ProductInfoType = {
  productInfo: ProductType
  isOwner: boolean
}

export default function ProductInfoCard(props: ProductInfoType) {
  const product = props.productInfo
  const isOwner = props.isOwner
  const tDate = useTranslations('Date')
  const tProductForm = useTranslations('addProductPage')
  const locale = useLocale()

  const editableCardTranslations = {
    title: tProductForm('title'),
    price: tProductForm('price'),
    description: tProductForm('description'),
    cancel: tProductForm('cancel'),
    save: tProductForm('save'),
    edit: tProductForm('edit'),
  }
  const getDate = (
    timestamp: Date | string,
    dateFirst: boolean,
    className?: string,
  ): JSX.Element | undefined => {
    const date = new Date(timestamp)
    let month = ''
    let dateEl

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
      dateFirst ? (
        (dateEl = (
          <div className={cn('text-xs', className)}>
            {date.getUTCDate()} {month} {date.getUTCFullYear()}
            <br /> {time}
          </div>
        ))
      ) : (
        <div className={cn('text-xs', className)}>
          {time} <br />
          {date.getUTCDate()} {month} {date.getUTCFullYear()}
        </div>
      )
      return dateEl
    } else if (locale === 'de') {
      dateFirst
        ? (dateEl = (
            <div className={cn('text-xs', className)}>
              {date.getUTCDate()}.{month} {date.getUTCFullYear()}
              <br /> {date.getUTCHours()}:{date.getUTCMinutes()} Uhr
            </div>
          ))
        : (dateEl = (
            <div className={cn('text-xs', className)}>
              {date.getUTCHours()}:{date.getUTCMinutes()} Uhr <br />
              {date.getUTCDate()}.{month} {date.getUTCFullYear()}
            </div>
          ))
      return dateEl
    }
  }
  return (
    <>
      {isOwner ? (
        <ProductInfoCardEditable
          productInfo={product}
          translations={editableCardTranslations}
          locale={locale}
        />
      ) : (
        <div className="flex flex-col">
          <Card className="my-3 h-full w-[90vw] lg:my-0 lg:h-[60vh] lg:w-[40vw]">
            <CardHeader className="flex h-[20%] flex-row items-center justify-between">
              <CardTitle className="text-center">{product.title}</CardTitle>
              <CardTitle className="text-3xl">
                {product.price} {locale === 'en' ? '$' : '€'}
              </CardTitle>
            </CardHeader>
            <Separator />
            <CardContent className="flex min-h-[80%] flex-col justify-between p-6">
              <div className="flex justify-between text-wrap pb-6">
                <div className="h-fit w-9/12 break-words">{product.description}</div>
              </div>
              <div className="flex justify-between">
                {getDate(product.createdAt!, true, 'text-right')}
              </div>
            </CardContent>
          </Card>
          <BuyButtons product={product} />
        </div>
      )}
    </>
  )
}
