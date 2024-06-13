"use client"

import { useEffect } from 'react'
import { motion, useAnimation } from 'framer-motion'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Badge } from '@/components/ui/badge'
import { Button, buttonVariants } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  CardFooter,
} from '@/components/ui/card'
import { Check, Linkedin } from 'lucide-react'
import { LightBulbIcon } from './Icons'
import { GitHubLogoIcon } from '@radix-ui/react-icons'
import Image from 'next/image'
import { Link } from '@/navigation'

const cardVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: { opacity: 1, y: 0 }
}

export const HeroCards = () => {
  const controls = useAnimation()

  useEffect(() => {
    const sequence = async () => {
      await controls.start('visible')
    }
    sequence()
  }, [controls])

  return (
    <div className="relative hidden h-[500px] w-[700px] flex-row flex-wrap gap-8 lg:flex">
      {/* Testimonial */}
      <motion.div
        className="absolute -top-[15px] right-[370px] w-[240px] shadow-black/10 drop-shadow-xl dark:shadow-white/10"
        initial="hidden"
        animate={controls}
        variants={cardVariants}
        transition={{ delay: 0.1, duration: 0.5 }}
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
      </motion.div>

      {/* Team */}
      <motion.div
        className="absolute right-[80px] top-4 flex w-64 flex-col items-center justify-center shadow-black/10 drop-shadow-xl dark:shadow-white/10"
        initial="hidden"
        animate={controls}
        variants={cardVariants}
        transition={{ delay: 0.3, duration: 0.5 }}
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
            <CardDescription className="font-normal text-primary">Frontend Developer</CardDescription>
          </CardHeader>
          <CardContent className="pb-2 text-center">
            <p>This UI is absolutely stunning thanks to the team of bitz</p>
          </CardContent>
          <CardFooter>
            <div>
              {/* <a
              rel="noreferrer noopener"
              href="https://github.com/leoMirandaa"
              target="_blank"
              className={buttonVariants({
                variant: 'ghost',
                size: 'sm',
              })}
            >
              <span className="sr-only">Github icon</span>
              <GitHubLogoIcon className="h-5 w-5" />
            </a> */}
            {/* <a
              rel="noreferrer noopener"
              href="https://twitter.com/leo_mirand4"
              target="_blank"
              className={buttonVariants({
                variant: 'ghost',
                size: 'sm',
              })}
            >
              <span className="sr-only">X icon</span>
              <svg
                role="img"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 fill-foreground"
              >
                <title>X</title>
                <path d="M18.901 1.153h3.68l-8.04 9.19L24 22.846h-7.406l-5.8-7.584-6.638 7.584H.474l8.6-9.83L0 1.154h7.594l5.243 6.932ZM17.61 20.644h2.039L6.486 3.24H4.298Z" />
              </svg>
            </a> */}

            {/* <a
              rel="noreferrer noopener"
              href="https://www.linkedin.com/"
              target="_blank"
              className={buttonVariants({
                variant: 'ghost',
                size: 'sm',
              })}
            >
              <span className="sr-only">Linkedin icon</span>
              <Linkedin size="20" />
            </a> */}
            </div>
          </CardFooter>
        </Card>
      </motion.div>

      {/* Pricing */}
      <motion.div
        className="absolute left-[80px] top-[150px] w-64 shadow-black/10 drop-shadow-xl dark:shadow-white/10"
        initial="hidden"
        animate={controls}
        variants={cardVariants}
        transition={{ delay: 0.5, duration: 0.5 }}
      >
        <Card>
          <CardHeader>
            <CardTitle className="item-center flex justify-between">
              Free
              <Badge variant="secondary" className="text-sm text-primary">For ever</Badge>
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
              {['Unlimited Tech', 'Customize your Shop', 'Safety first'].map((benefit: string) => (
                <span key={benefit} className="flex">
                  <Check className="text-green-500" /> <h3 className="ml-2">{benefit}</h3>
                </span>
              ))}
            </div>
          </CardFooter>
        </Card>
      </motion.div>

      {/* Service */}
      <motion.div
        className="absolute bottom-[35px] right-[80px] w-[250px] shadow-black/10 drop-shadow-xl dark:shadow-white/10"
        initial="hidden"
        animate={controls}
        variants={cardVariants}
        transition={{ delay: 0.7, duration: 0.5 }}
      >
        <Card>
          <CardHeader className="flex items-start justify-start gap-4 space-y-1 md:flex-row">
            <div className="mt-1 rounded-2xl bg-primary/20 p-1">
              <LightBulbIcon />
            </div>
            <div>
              <CardTitle>Light & dark mode</CardTitle>
              <CardDescription className="text-md mt-2">Easily switch between your favorite theme</CardDescription>
            </div>
          </CardHeader>
        </Card>
      </motion.div>
    </div>
  )
}
