import * as React from 'react'

import { cn } from '@/lib/utils'
import Image from 'next/image'
import { Button } from '@/components/ui/button'
import { FaRegHeart } from 'react-icons/fa'
import { StaticImport } from 'next/dist/shared/lib/get-img-props'

const Card = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn(
      'rounded-xl border bg-card text-card-foreground shadow',
      className,
    )}
    {...props}
  />
))
Card.displayName = 'Card'

const CardHeader = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn('flex flex-col space-y-1.5 p-6', className)}
    {...props}
  />
))
CardHeader.displayName = 'CardHeader'

const CardTitle = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLHeadingElement>
>(({ className, ...props }, ref) => (
  <h3
    ref={ref}
    className={cn('font-semibold leading-none tracking-tight', className)}
    {...props}
  />
))
CardTitle.displayName = 'CardTitle'

const CardDescription = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLParagraphElement>
>(({ className, ...props }, ref) => (
  <p
    ref={ref}
    className={cn('text-sm text-muted-foreground', className)}
    {...props}
  />
))
CardDescription.displayName = 'CardDescription'

const CardContent = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div ref={ref} className={cn('p-6 pt-0', className)} {...props} />
))
CardContent.displayName = 'CardContent'

const CardFooter = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn('flex items-center p-6 pt-0', className)}
    {...props}
  />
))
CardFooter.displayName = 'CardFooter'

type CardWithImageProps = {
  title: string
  desc: string
  content?: string
  imgUrl: string | string[]
  previewType: string /* shop || article */
  className?: React.HTMLAttributes<HTMLDivElement>
  icon?: any
}

const CardWithImage = React.forwardRef<HTMLDivElement, CardWithImageProps>(
  ({ className, ...props }, ref) => {
    const cardWidth = props.previewType === 'article' ? 300 : 500

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
        {props.previewType === 'article' ? (
          <Card className="w-[300px]" ref={ref}>
            <Image
              src={props.imgUrl as string}
              width={cardWidth}
              height={300}
              className="rounded-t-xl"
              alt="Preview Image Article"
              style={{ objectFit: 'cover', height: '250px' }}
            />
            <CardHeader className="p-3">
              <div className="flex justify-between">
                <CardTitle
                  className="align-middle text-2xl"
                  style={{ lineHeight: 'unset' }}
                >
                  {props.title}
                </CardTitle>
                <Button variant="ghost" size="icon">
                  <FaRegHeart />
                </Button>
              </div>
              <CardDescription className="text-xl text-black">
                {props.desc}
              </CardDescription>
            </CardHeader>
            <CardContent className="p-3 pt-0">{props.content}</CardContent>
          </Card>
        ) : (
          <Card className="w-[500px]" ref={ref}>
            <div className="flex rounded-t-xl">
              {Array.isArray(props.imgUrl) &&
                props.imgUrl.map((iUrl: string, index) => (
                  <Image
                    key={iUrl}
                    src={iUrl}
                    width={cardWidth / props.imgUrl.length}
                    height={300}
                    alt="Preview Image Shop"
                    className={getImgBorder(index, props.imgUrl.length)}
                    style={{ objectFit: 'cover', height: '250px' }}
                  />
                ))}
            </div>

            <CardHeader className="p-3">
              <div className="flex justify-between">
                <CardTitle
                  className="align-middle text-2xl"
                  style={{ lineHeight: 'unset' }}
                >
                  {props.title}
                </CardTitle>
                <Button variant="ghost" size="icon">
                  <FaRegHeart />
                </Button>
              </div>
              <CardDescription className="text-xl text-black">
                {props.desc}
              </CardDescription>
            </CardHeader>
          </Card>
        )}
      </>
    )
  },
)
CardWithImage.displayName = 'CardWithImage'

export {
  Card,
  CardHeader,
  CardFooter,
  CardTitle,
  CardDescription,
  CardContent,
  CardWithImage,
}
