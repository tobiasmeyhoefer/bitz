/**
 * Renders a product information card component, either in an editable or read-only mode depending on the `isOwner` prop.
 *
 * @param {ProductInfoType} props - The props for the component.
 * @param {ProductType} props.productInfo - The product information to display.
 * @param {boolean} props.isOwner - Indicates whether the current user is the owner of the product.
 * @returns {JSX.Element} - The rendered product information card.
 */
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card'
import { Separator } from '@/components/ui/separator'
import { useTranslations, useLocale } from 'next-intl'
import ProductInfoCardEditable from './product-info-card-editable'
import { cn } from '@/lib/utils'
import { BuyButtons } from '@/components/products/buy-buttons'
import { ProductType } from '@/schema'

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
    category: tProductForm('category'),
    isDirectlyBuyable: tProductForm('isDirectlyBuyable'),
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
        <div className="w-[90vw] lg:h-[70vh] lg:w-[50vw]">
          <Card className="mt-2 flex h-full flex-col justify-between lg:mt-0 lg:h-[70vh]">
            <CardHeader className="flex h-[20%] flex-row items-center justify-between">
              <CardTitle className="">{product.title}</CardTitle>
              <CardTitle className="!mt-0 w-1/2 text-right text-2xl md:text-3xl">
                {product.price} €
              </CardTitle>
            </CardHeader>
            <Separator />
            <CardContent className="flex min-h-[80%] flex-col justify-between p-6">
              <div className="flex justify-between text-wrap pb-6">
                <div className="h-fit w-9/12 break-words">{product.description}</div>
              </div>
              <div className="flex justify-between ">
                <div className="md:text-md flex flex-nowrap items-end whitespace-nowrap text-right text-xs">
                  {product.location}
                </div>
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
