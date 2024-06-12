import * as React from 'react'
import Image from 'next/image'

import { CardWithImageProps } from '@/lib/types'
import { cn, formatDate } from '@/lib/utils'
import { Link } from '@/navigation'
import { Card, CardHeader, CardTitle, CardDescription } from './card'
import FavoriteLike from '../favorites/favoriteLike'
import { ProdDelAlert } from '../myShop/productDelAlert'

const CardWithImage = React.forwardRef<HTMLDivElement, CardWithImageProps>(
  ({ className, ...props }, ref) => {
    const cardWidth = 300

    props.product.isOwner = props.editable

    return (
      <>
        {props && props.product ? (
          <Card className={cn(`w-[${cardWidth}px]`, className)} ref={ref}>
            <Link href={`/product/${props.productID}`}>
              {props.imgUrl1 !== undefined ? (
                <Image
                  src={props.imgUrl1 as string}
                  width={cardWidth}
                  height={300}
                  className="rounded-t-xl"
                  alt="Preview Image Article"
                  style={{ objectFit: 'cover', height: '300px' }}
                />
              ) : (
                <div
                  className={`w-[${cardWidth}px] flex h-[300px] items-center justify-center rounded-t-xl`}
                >
                  <div>Placeholder Image</div>
                </div>
              )}
            </Link>

            <CardHeader className="p-3">
              <div className="flex justify-between">
                <CardTitle className="align-middle text-2xl" style={{ lineHeight: 'unset' }}>
                  {props.title}
                </CardTitle>
                {props.editable && props.favIcon && <ProdDelAlert productId={props.productID!} />}
                {!props.editable && props.favIcon && <FavoriteLike productId={props.productID!} />}
              </div>
              <CardDescription className="truncate text-xl">
                <div className="text-right">{props.price}€</div>
                <div className="text-right text-xs">{formatDate(props.timestamp!)}</div>
                {props.product.isSold && <p className="text-green-500">verkauft</p>}
              </CardDescription>
            </CardHeader>
          </Card>
        ) : (
          <></>
        )}
      </>
    )
  },
)
CardWithImage.displayName = 'CardWithImage'

export { CardWithImage }
