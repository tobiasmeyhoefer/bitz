/**
 * The `HeroCards` component renders a set of hero cards on the landing page. It includes a testimonial card, a team card, a pricing card, and a service card. Each card is animated using the `HeroCardAnimation` component.
 *
 * The testimonial card displays a user's quote and their username. The team card displays an image of a team member, their name, and their role. The pricing card displays the free pricing plan with a list of benefits. The service card displays information about the light and dark mode feature.
 *
 * This component is part of the `landing-page` module and is used to showcase the key features and benefits of the application.
 */

import React from 'react'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  CardFooter,
} from '@/components/ui/card'
import { LightBulbIcon } from './icons'
import { Check } from 'lucide-react'
import Image from 'next/image'
import { Link } from '@/navigation'
import HeroCardAnimation from './hero-card-animation'

export const HeroCards = () => {
  return (
    <div className="relative hidden h-[500px] w-[700px] flex-row flex-wrap gap-8 lg:flex">
      {/* Testimonial */}
      <HeroCardAnimation
        className="absolute -top-[15px] right-[370px] w-[240px] shadow-black/10 drop-shadow-xl dark:shadow-white/10"
        delay={0.1}
      >
        <Card>
          <CardHeader className="flex flex-row items-center gap-4 pb-2">
            <div className="flex flex-col">
              <CardTitle className="text-lg">Malte Stanley</CardTitle>
              <CardDescription>@maltostan</CardDescription>
            </div>
          </CardHeader>
          <CardContent>Bitz is awesome!</CardContent>
        </Card>
      </HeroCardAnimation>

      {/* Team */}
      <HeroCardAnimation
        className="absolute right-[80px] top-4 flex w-64 flex-col items-center justify-center shadow-black/10 drop-shadow-xl dark:shadow-white/10"
        delay={0.3}
      >
        <Card>
          <CardHeader className="mt-8 flex items-center justify-center pb-2">
            <Image
              src="https://avatars.githubusercontent.com/u/1684899?v=4"
              alt="user avatar"
              width={100}
              height={100}
              className="absolute -top-12 aspect-square h-24 w-24 rounded-full object-cover grayscale-[0%]"
            />
            <CardTitle className="text-center">Jens Pilgrim</CardTitle>
            <CardDescription className="font-normal ">Frontend Developer</CardDescription>
          </CardHeader>
          <CardContent className="pb-2 text-center">
            <p>This UI is absolutely stunning thanks to the team of bitz</p>
          </CardContent>
          <CardFooter>
            <div></div>
          </CardFooter>
        </Card>
      </HeroCardAnimation>

      {/* Pricing */}
      <HeroCardAnimation
        className="absolute left-[80px] top-[150px] w-64 shadow-black/10 drop-shadow-xl dark:shadow-white/10"
        delay={0.5}
      >
        <Card>
          <CardHeader>
            <CardTitle className="item-center flex justify-between">
              Free
              <Badge variant="secondary" className="text-sm">
                For ever
              </Badge>
            </CardTitle>
            <div>
              <span className="text-3xl font-bold">$0</span>
              <span className="text-muted-foreground"> /month</span>
            </div>
            <CardDescription>Die Nutzung von Bitz ist kostenlos</CardDescription>
          </CardHeader>
          <CardContent>
            <Link href={'/auth/login'}>
              <Button className="w-full bg-card-button">Start Now</Button>
            </Link>
          </CardContent>
          <hr className="m-auto mb-4 w-4/5" />
          <CardFooter className="flex">
            <div className="space-y-4">
              {['Unlimited Tech', 'Customize your Shop', 'Safety first'].map((benefit) => (
                <span key={benefit} className="flex">
                  <Check className="text-green-500" /> <h3 className="ml-2">{benefit}</h3>
                </span>
              ))}
            </div>
          </CardFooter>
        </Card>
      </HeroCardAnimation>

      {/* Service */}
      <HeroCardAnimation
        className="absolute bottom-[35px] right-[80px] w-[250px] shadow-black/10 drop-shadow-xl dark:shadow-white/10"
        delay={0.7}
      >
        <Card>
          <CardHeader className="flex items-start justify-start gap-4 space-y-1 md:flex-row">
            <div className="mt-1 rounded-2xl bg-primary/20 p-1">
              <LightBulbIcon />
            </div>
            <div>
              <CardTitle>Light & dark mode</CardTitle>
              <CardDescription className="text-md mt-2">
                Easily switch between your favorite theme
              </CardDescription>
            </div>
          </CardHeader>
        </Card>
      </HeroCardAnimation>
    </div>
  )
}
