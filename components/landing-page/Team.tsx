import { buttonVariants } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Facebook, Instagram, Linkedin } from 'lucide-react'
import Image from 'next/image'
import { useTranslations } from 'next-intl'


interface TeamProps {
  imageUrl: string
  name: string
  position: string
  socialNetworks: SociaNetworkslProps[]
}

interface SociaNetworkslProps {
  name: string
  url: string
}

const teamList: TeamProps[] = [
  {
    imageUrl: 'https://avatars.githubusercontent.com/u/56676993?v=4',
    name: 'Anna',
    position: 'Frontend Developer',
    socialNetworks: [
      // { name: 'Linkedin', url: 'http://linkedin.com' },
      // {
      //   name: 'Facebook',
      //   url: 'https://www.facebook.com/',
      // },
      // {
      //   name: 'Instagram',
      //   url: 'https://www.instagram.com/',
      // },
    ],
  },
  {
    imageUrl: 'https://avatars.githubusercontent.com/u/161626918?v=4',
    name: 'Anton',
    position: 'Scrum Master, 3D Animator, Frontend Developer',
    socialNetworks: [
      // { name: 'Linkedin', url: 'http://linkedin.com' },
      // {
      //   name: 'Facebook',
      //   url: 'https://www.facebook.com/',
      // },
      // {
      //   name: 'Instagram',
      //   url: 'https://www.instagram.com/',
      // },
    ],
  },
  {
    imageUrl: 'https://avatars.githubusercontent.com/u/106620326?v=4',
    name: 'Dennis',
    position: 'Backend Developer',
    socialNetworks: [
      // { name: 'Linkedin', url: 'http://linkedin.com' },
      // {
      //   name: 'Instagram',
      //   url: 'https://www.instagram.com/',
      // },
    ],
  },
  {
    imageUrl: 'https://avatars.githubusercontent.com/u/52629335?v=4',
    name: 'Lucas',
    position: 'Frontend Developer',
    socialNetworks: [
      // { name: 'Linkedin', url: 'http://linkedin.com' },
      // {
      //   name: 'Facebook',
      //   url: 'https://www.facebook.com/',
      // },
    ],
  },
  {
    imageUrl: 'https://avatars.githubusercontent.com/u/167678060?v=4',
    name: 'Niko',
    position: 'Backend Developer',
    socialNetworks: [],
  },
  {
    imageUrl: 'https://avatars.githubusercontent.com/u/104424520?v=4',
    name: 'Tobias',
    position: 'Product Owner, Frontend / Backend Developer',
    socialNetworks: [
      // { name: 'Linkedin', url: 'http://linkedin.com' },
      // {
      //   name: 'Facebook',
      //   url: 'https://www.facebook.com/',
      // },
    ],
  },
]

export const Team = () => {
  const t = useTranslations('Landingpage.OurTeam')
  const socialIcon = (iconName: string) => {
    switch (iconName) {
      case 'Linkedin':
        return <Linkedin size="20" />

      case 'Facebook':
        return <Facebook size="20" />

      case 'Instagram':
        return <Instagram size="20" />
    }
  }

  return (
    <section id="team" className="container py-24 sm:py-32">
      <h2 className="text-3xl font-bold md:text-4xl">
        <span className="bg-gradient-to-b from-primary/60 to-primary bg-clip-text text-transparent">
          {t('title')}{' '}
        </span>
        Team
      </h2>

      <p className="mb-10 mt-4 text-xl text-muted-foreground">
        {t('sub')}
      </p>

      <div className="grid gap-8 gap-y-10 md:grid-cols-2 lg:grid-cols-4">
        {teamList.map(({ imageUrl, name, position, socialNetworks }: TeamProps) => (
          <Card
            key={name}
            className="relative mt-8 flex flex-col items-center justify-center bg-muted/50"
          >
            <CardHeader className="mt-8 flex items-center justify-center pb-2">
              <Image
                width={100}
                height={100}
                src={imageUrl}
                alt={`${name} ${position}`}
                className="absolute -top-12 aspect-square h-24 w-24 rounded-full object-cover"
              />
              <CardTitle className="text-center">{name}</CardTitle>
              <CardDescription className="text-center text-card-foreground">
                {position}
              </CardDescription>
            </CardHeader>

            <CardContent className="pb-2 text-center">
              <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit.</p>
            </CardContent>

            <CardFooter>
              {socialNetworks.map(({ name, url }: SociaNetworkslProps) => (
                <div key={name}>
                  <a
                    rel="noreferrer noopener"
                    href={url}
                    target="_blank"
                    className={buttonVariants({
                      variant: 'ghost',
                      size: 'sm',
                    })}
                  >
                    <span className="sr-only">{name} icon</span>
                    {socialIcon(name)}
                  </a>
                </div>
              ))}
            </CardFooter>
          </Card>
        ))}
      </div>
    </section>
  )
}
