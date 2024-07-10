import * as React from 'react'
import Image from 'next/image'

import { CardWithImageProps } from '@/lib/types'
import { cn, formatDate, formatDateDMY } from '@/lib/utils'
import { Link } from '@/navigation'
import { Card, CardHeader, CardTitle, CardDescription } from './card'
import FavoriteLike from '../favorites/favoriteLike'
import { ProdDelAlert } from '../myShop/productDelAlert'
import { useTranslations } from 'next-intl'
import { Badge } from './badge'
import { FaLocationDot } from 'react-icons/fa6'
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip'
import { CardContainer } from './3d-card'

const CardWithImageMyShop = React.forwardRef<HTMLDivElement, CardWithImageProps>(
  ({ className, ...props }, ref) => {
    const product = props.product
    const t = useTranslations('ProdDelAlert')
    const sold = useTranslations('MyShop')
    return (
      <>
        {props && product ? (
          <CardContainer>
            <div className="absolute right-0 top-0 m-2"></div>
            <Card className={cn(`w-[150px] md:w-[200px] lg:w-[300px]`, className)} ref={ref}>
              <Link href={`/product/${product.id}`}>
                <div className="relative">
                  {props.product.isSold && (
                    <Badge className="md:text-md absolute right-2 top-2 bg-green-500 text-sm md:right-4 md:top-4">
                      {sold('sold')}
                    </Badge>
                  )}

                  {product.imageUrl1 !== undefined ? (
                    <Image
                      src={product.imageUrl1 as string}
                      width={300}
                      height={300}
                      layout="responsive"
                      className={`rounded-t-xl`}
                      alt="Preview Image Article"
                      style={{ objectFit: 'cover' }}
                      sizes="(max-width: 640px) 150px, (max-width: 768px) 200px, 300px"
                    />
                  ) : (
                    <div
                      className={`flex h-[150px] w-[150px] items-center justify-center rounded-t-xl md:h-[200px] md:w-[200px] lg:h-[300px] lg:w-[300px]`}
                    >
                      <div>Placeholder Image</div>
                    </div>
                  )}
                </div>
              </Link>

              <CardHeader className="p-3">
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
                  <ProdDelAlert
                    menuDeleteOption={t('menuDeleteOption')}
                    productId={props.product.id}
                    title={t('title')}
                    yousure={t('yousure')}
                    cancel={t('cancel')}
                    confirm={t('confirm')}
                  />

                  {!props.editable && props.favIcon && <FavoriteLike productId={product.id} />}
                </div>
                <CardDescription className="text-sm">
                  <div className="flex justify-between">
                    <Badge className="md:text-md m-0 text-xs" variant="secondary">
                      {props.product.category}
                    </Badge>
                    <div className="text-left text-lg md:text-xl">{props.product.price}€</div>
                  </div>

                  <div className="mt-2 flex justify-between">
                    <div className="md:text-md flex flex-nowrap items-center text-right text-xs">
                      <FaLocationDot className="mx-1 size-3" />
                      {props.product.location}
                    </div>
                    <div className="text-right">
                      <div className="md:text-md flex hidden items-end text-right text-xs md:block">
                        {formatDate(product.createdAt)}
                      </div>
                      <div className="md:text-md block flex items-end text-right text-xs md:hidden">
                        {formatDateDMY(product.createdAt)}
                      </div>
                    </div>
                  </div>
                  {props.editable && props.favIcon && (
                    <ProdDelAlert
                      menuDeleteOption={t('menuDeleteOption')}
                      productId={props.product.id}
                      title={t('title')}
                      yousure={t('yousure')}
                      cancel={t('cancel')}
                      confirm={t('confirm')}
                    />
                  )}
                </CardDescription>
              </CardHeader>
            </Card>
          </CardContainer>
        ) : (
          <></>
        )}
      </>
    )
  },
)
CardWithImageMyShop.displayName = 'CardWithImageMyShop'

export { CardWithImageMyShop }
