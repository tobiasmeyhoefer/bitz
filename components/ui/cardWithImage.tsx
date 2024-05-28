import * as React from 'react'
import Image from 'next/image'

import { CardWithImageProps } from '@/lib/types'
import { cn } from '@/lib/utils'
import { Link } from '@/navigation'
import { Card, CardHeader, CardTitle, CardDescription } from './card'
import FavoriteLike from '../favorites/favoriteLike'
import { PopAlert } from '../myShop/popalert'
const CardWithImage = React.forwardRef<HTMLDivElement, CardWithImageProps>(
  ({ className, ...props }, ref) => {
    const cardWidth = 300 //props.previewType === 'product' ? 300 : 600

    props.product.isOwner = props.editable

    const getImgBorder = (index: number, arraylength: number) => {
      switch (index) {
        case 0:
          return 'rounded-tl-xl'
        case arraylength - 1:
          return 'rounded-tr-xl'
        default:
          return ''
      }
    }

    return (
      <>
        {props ? (
          <Card className={cn(`w-[${cardWidth}px]`, className)} ref={ref}>
            <Link
              href={`/product/${btoa(props.productID!)}?p=${btoa(JSON.stringify(props.product))}`}
            >
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
                {!props.product.isOwner && props.favIcon && <FavoriteLike productId={props.productID!} />}
                
              </div>
              <CardDescription className="truncate text-xl">{props.desc}</CardDescription>
            </CardHeader>
          </Card>
        ) : (
          <></>
          // Not needed until user shops/profiles are clarified
          // <Link href={`/myshop/${props.shopID}`}>
          //   <Card className={cn(`w-[${cardWidth}px]`, className)} ref={ref}>
          //     <div className="flex rounded-t-xl">
          //       {props.imgUrl1 !== undefined ? (
          //         Array.isArray(props.imgUrl1) &&
          //         props.imgUrl1.map((iUrl: string, index) => (
          //           <Image
          //             key={iUrl}
          //             src={iUrl}
          //             width={cardWidth / props.imgUrl1!.length}
          //             height={300}
          //             alt="Preview Image Shop"
          //             className={getImgBorder(index, props.imgUrl1!.length)}
          //             style={{ objectFit: 'cover', height: '300px' }}
          //           />
          //         ))
          //       ) : (
          //         <div
          //           className={`w-[${cardWidth}px] flex h-[300px] items-center justify-center rounded-t-xl`}
          //         >
          //           <div>Placeholder Image</div>
          //         </div>
          //       )}
          //     </div>

          //     <CardHeader className="p-3">
          //       <div className="flex justify-between">
          //         <CardTitle className="align-middle text-2xl" style={{ lineHeight: 'unset' }}>
          //           {props.title}
          //         </CardTitle>
          //         <Button variant="ghost" size="icon">
          //           <FaRegHeart />
          //         </Button>
          //       </div>
          //       <CardDescription className="text-xl truncate text-black">{props.desc}</CardDescription>
          //     </CardHeader>
          //   </Card>
          // </Link>
        )}
      </>
    )
  },
)
CardWithImage.displayName = 'CardWithImage'

export { CardWithImage }
