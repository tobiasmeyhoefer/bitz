/**
 * A React component that renders a card with an image, title, description, and other details.
 *
 * @param {CardWithImageProps} props - The props for the component.
 * @param {string} [props.className] - An optional CSS class name to apply to the card.
 * @param {Product} props.product - The product data to display in the card.
 * @param {MyshopTranslations} props.myshopTranslations - Translations for the myshop feature.
 * @param {boolean} [props.editable] - Whether the card is in an editable mode.
 * @param {boolean} [props.favIcon] - Whether to display a favorite icon.
 * @param {string} [props.viewTranslation] - The translation for the "View" link.
 * @returns {React.ReactElement} - The rendered card component.
 */
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
import { ProdDelAlert } from '../my-shop/product-delete-alert'

const CardWithImage = React.forwardRef<HTMLDivElement, CardWithImageProps>(
  ({ className, ...props }, ref) => {
    const product = props.product
    const myshopTranslations = props.myshopTranslations
    return (
      <>
        {props && product && (
          <CardContainer>
            <Card
              className={cn(
                `w-[calc(90svw/2)] max-w-[calc(1420px/6)] sm:w-[calc(90svw/3)] md:w-[calc(90svw/4)] lg:w-[calc(90svw/5)]`,
                className,
              )}
              ref={ref}
            >
              <Link href={`/product/${product.id}`}>
                <div className="relative">
                  {props.product.isSold && myshopTranslations && (
                    <Badge className="md:text-md absolute right-2 top-2 bg-green-500 text-sm md:right-4 md:top-4">
                      {myshopTranslations.sold}
                    </Badge>
                  )}

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
                </div>
              </Link>

              <CardHeader className="p-2 md:p-3">
                <div className="mb-[-4px] flex max-w-full justify-between">
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger className="max-w-[calc(100%-36px)]">
                        <CardTitle
                          className="truncate align-middle text-xl md:text-2xl"
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
                  {myshopTranslations && (
                    <ProdDelAlert
                      menuDeleteOption={myshopTranslations.menuDeleteOption}
                      productId={props.product.id}
                      title={myshopTranslations.title}
                      yousure={myshopTranslations.yousure}
                      cancel={myshopTranslations.cancel}
                      confirm={myshopTranslations.confirm}
                    />
                  )}
                  {!props.editable && props.favIcon && (
                    <FavoriteLike className="" productId={product.id} />
                  )}
                </div>
                <CardDescription className="!mt-0 text-sm">
                  <div className="flex flex-col justify-between gap-2">
                    <div className="m-0 w-28 text-xs md:text-sm">{props.product.category}</div>
                    <div className="flex items-end justify-between">
                      <div className="text-left text-lg text-foreground md:text-xl">
                        {props.product.price}€
                      </div>
                      {!props.editable && props.favIcon && (
                        <Link
                          className="hidden text-right font-semibold text-foreground hover:font-bold md:block"
                          href={`/my-shop/${product.sellerId}`}
                        >
                          {props.viewTranslation}
                        </Link>
                      )}
                    </div>
                  </div>
                  <div className="mt-2 flex justify-between">
                    <div className="md:text-md hidden flex-nowrap items-end whitespace-nowrap text-right text-xs md:flex">
                      {props.product.location}
                    </div>
                    <div className="md:text-md flex flex-nowrap items-end whitespace-nowrap text-right text-xs md:hidden">
                      {props.product.location?.split(' ').slice(1)}
                    </div>
                    <div className=" md:text-md flex items-end text-right text-xs md:block">
                      {formatDate(product.createdAt)}
                    </div>
                  </div>
                  {props.editable && props.favIcon && myshopTranslations && (
                    <ProdDelAlert
                      menuDeleteOption={myshopTranslations.menuDeleteOption}
                      productId={props.product.id}
                      title={myshopTranslations.title}
                      yousure={myshopTranslations.yousure}
                      cancel={myshopTranslations.cancel}
                      confirm={myshopTranslations.confirm}
                    />
                  )}
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
