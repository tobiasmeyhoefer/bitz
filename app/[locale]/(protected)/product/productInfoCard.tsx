import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card'
import { Separator } from '@/components/ui/separator'
import { useTranslations, useLocale } from 'next-intl'
import ProductInfoCardEditable from './productInfoCardEditable'
import { ProductType } from '@/lib/types'
import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import { createConversation } from '@/lib/conversations-actions'
import { Link, redirect } from '@/navigation'
import { revalidatePath } from 'next/cache'
import { createCheckoutSession, productHasCheckoutSessionOpened } from '@/lib/stripe-actions'
import { getUser } from '@/lib/useraction'
import { redirect as red } from 'next/navigation'

type ProductInfoType = {
  productInfo: ProductType & { isOwner: boolean }
}

export default function ProductInfoCard(props: ProductInfoType) {
  const product = props.productInfo
  const tDate = useTranslations('Date')
  const tProduct = useTranslations('Product')
  const tProductForm = useTranslations('addProductPage')
  const locale = useLocale()

  const editableCardTranslations = {
    quantity: tProduct('quantity'),
    title: tProductForm('title'),
    price: tProductForm('price'),
    description: tProductForm('description'),
    cancel: tProductForm('cancel'),
    save: tProductForm('save'),
    edit: tProductForm('edit'),
  }

  const getDate = (
    timestamp: any,
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
      {product.isOwner ? (
        <ProductInfoCardEditable
          productInfo={product}
          translations={editableCardTranslations}
          date={getDate(product.createdAt, false, 'text-right')}
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
                <div className="whitespace-nowrap text-right lg:w-[20vw]">
                  {tProduct('quantity')}: {product.quantity}
                </div>
              </div>
              <div>{getDate(product.createdAt, true, 'text-right')}</div>
            </CardContent>
          </Card>
          <form
            action={async () => {
              'use server'
              await createConversation(product.id!)
              revalidatePath('/conversations')
              redirect('/conversations')
            }}
          >
            <Button type="submit" className="fixed bottom-6 right-40">
              Kaufen
            </Button>
          </form>
          {product.isDirectlyBuyable ? (
            <form
              action={async () => {
                'use server'
                const openedCheckoutSession = await productHasCheckoutSessionOpened(product.id!)
                if (!openedCheckoutSession) {
                  const user = await getUser()
                  await createCheckoutSession(user![0].id, product.id!)
                  revalidatePath('/transactions')
                  console.log(product.paymentUrl)
                  red(product.paymentUrl!)
                }
              }}
            >
              <Button className="fixed bottom-6 right-6" type="submit">
                Direkt Kaufen
              </Button>
            </form>
          ) : null}
        </div>
      )}
    </>
  )
}
