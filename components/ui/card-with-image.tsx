import * as React from 'react'
import Image from 'next/image'

import { CardWithImageProps } from '@/lib/types'
import { cn, formatDate } from '@/lib/utils'
import { Link } from '@/navigation'
import { Card, CardHeader, CardTitle, CardDescription } from './card'
import FavoriteLike from '../favorites/favorite-like'
import { Badge } from './badge'
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip'
import { CardContainer } from './3d-card'

const CardWithImage = React.forwardRef<HTMLDivElement, CardWithImageProps>(
  ({ className, ...props }, ref) => {
    const product = props.product
    return (
      <>
        {props && product && (
          <CardContainer>
            <Card className={cn(`w-[160px] md:w-[200px] lg:w-[240px]`, className)} ref={ref}>
              <Link href={`/product/${product.id}`}>
                {product.imageUrl1 ? (
                  <Image
                    src={product.imageUrl1 as string}
                    width={300}
                    height={300}
                    layout="responsive"
                    className={`rounded-t-xl`}
                    alt="Preview Image Article"
                    style={{ objectFit: 'cover' }}
                    sizes="(max-width: 640px) 160px, (max-width: 768px) 200px, 240px"
                  />
                ) : (
                  <div
                    className={`flex h-[160px] w-[160px] items-center justify-center rounded-t-xl md:h-[200px] md:w-[200px] lg:h-[240px] lg:w-[240px]`}
                  >
                    <div>Placeholder Image</div>
                  </div>
                )}
              </Link>

              <CardHeader className="p-2 md:p-3">
                <div className="flex max-w-full justify-between">
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger className="max-w-[calc(100%-36px)]">
                        <CardTitle
                          className="truncate align-middle text-lg md:text-2xl"
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
                  {!props.editable && props.favIcon && (
                    <FavoriteLike className="" productId={product.id} />
                  )}
                </div>
                <CardDescription className="!mt-0 text-sm">
                  <div className="flex justify-between">
                    <Badge className="md:text-md m-0 text-xs" variant="secondary">
                      {props.product.category}
                    </Badge>
                    <div className="text-left text-lg text-foreground md:text-xl">
                      {props.product.price}€
                    </div>
                  </div>
                  {!props.editable && props.favIcon && (
                    <Link
                      className="hidden text-right font-semibold text-foreground md:block"
                      href={`/myshop/${product.sellerId}`}
                    >
                      {props.viewTranslation}
                    </Link>
                  )}
                  <div className="mt-2 flex justify-between">
                    <div className="md:text-md hidden flex-nowrap items-end whitespace-nowrap text-right text-xs md:flex">
                      {props.product.location}
                    </div>
                    <div className="md:text-md flex flex-nowrap items-end whitespace-nowrap text-right text-xs md:hidden">
                      {props.product.location?.split(' ').slice(1)}
                    </div>
                    <div className=" md:text-md flex items-end text-right text-right text-xs md:block">
                      {formatDate(product.createdAt)}
                    </div>
                  </div>
                </CardDescription>
              </CardHeader>
            </Card>
          </CardContainer>
        )}
      </>
    )
  },
)
CardWithImage.displayName = 'CardWithImage'

export { CardWithImage }