import * as React from 'react'
import Image from 'next/image'

import { CardWithImageProps } from '@/lib/types'
import { cn, formatDate } from '@/lib/utils'
import { Link } from '@/navigation'
import { Card, CardHeader, CardTitle, CardDescription } from './card'
import FavoriteLike from '../favorites/favoriteLike'
import { ProdDelAlert } from '../myShop/productDelAlert'
import { Badge } from './badge'
import { FaLocationDot } from 'react-icons/fa6'
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip'

const CardWithImage = React.forwardRef<HTMLDivElement, CardWithImageProps>(
  ({ className, ...props }, ref) => {
    const cardWidth = 300
    const product = props.product

    return (
      <>
        {props && product ? (
          <Card className={cn(`w-[${cardWidth}px]`, className)} ref={ref}>
            <Link href={`/product/${product.id}`}>
              {product.imageUrl1 !== undefined ? (
                <Image
                  src={product.imageUrl1 as string}
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
              <div className="flex max-w-full justify-between">
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger className="max-w-[calc(100%-36px)]">
                      <CardTitle
                        className="truncate align-middle text-2xl"
                        style={{ lineHeight: 'unset' }}
                      >
                        {product.title}
                      </CardTitle>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>{product.title}</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>

                {props.editable && props.favIcon && <ProdDelAlert productId={product.id} />}
                {!props.editable && props.favIcon && <FavoriteLike productId={product.id} />}
              </div>
              <CardDescription className="text-sm">
                <div className="flex justify-between">
                  <Badge className="text-md m-0" variant="secondary">
                    {props.product.category}
                  </Badge>
                  <div className="text-left text-xl">{props.product.price}€</div>
                </div>

                <div className="mt-2 flex justify-between">
                  <div className="flex flex-nowrap items-center text-right">
                    <FaLocationDot className="mx-1 size-3" />
                    {props.product.location}
                  </div>
                  <div className="flex items-end text-right">{formatDate(product.createdAt)}</div>
                </div>

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
