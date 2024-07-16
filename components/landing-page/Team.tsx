/**
 * The `Team` component displays a section with a list of team members, including their profile images, names, and positions.
 *
 * The team member data is defined in the `teamList` array, which contains objects with the following properties:
 * - `imageUrl`: the URL of the team member's profile image
 * - `name`: the name of the team member
 * - `position`: the position or role of the team member
 *
 * The component uses the `useTranslations` hook from `next-intl` to retrieve the translated strings for the section title and subtitle.
 *
 * The team member cards are rendered using the `Card` component from the `@/components/ui/card` module, with the profile image, name, and position displayed within the card.
 */
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import Image from 'next/image'
import { useTranslations } from 'next-intl'

interface TeamProps {
  imageUrl: string
  name: string
  position: string
}

const teamList: TeamProps[] = [
  {
    imageUrl: 'https://avatars.githubusercontent.com/u/56676993?v=4',
    name: 'Anna',
    position: 'Frontend Developer',
  },
  {
    imageUrl: 'https://avatars.githubusercontent.com/u/161626918?v=4',
    name: 'Anton',
    position: 'Scrum Master, 3D Animator, Frontend Developer',
  },
  {
    imageUrl: 'https://avatars.githubusercontent.com/u/106620326?v=4',
    name: 'Dennis',
    position: 'Backend Developer',
  },
  {
    imageUrl: 'https://avatars.githubusercontent.com/u/52629335?v=4',
    name: 'Lucas',
    position: 'Frontend Developer',
  },
  {
    imageUrl: 'https://avatars.githubusercontent.com/u/167678060?v=4',
    name: 'Niko',
    position: 'Backend Developer',
  },
  {
    imageUrl: 'https://avatars.githubusercontent.com/u/104424520?v=4',
    name: 'Tobias',
    position: 'Product Owner, Frontend / Backend Developer',
  },
]

export const Team = () => {
  const t = useTranslations('Landingpage.OurTeam')

  return (
    <section id="team" className="container py-24 sm:py-32">
      <h2 className="text-3xl font-bold md:text-4xl">
        <span className="bg-gradient-to-b from-card-foreground/60 to-card-foreground bg-clip-text text-transparent">
          {t('title')}{' '}
        </span>
        Team
      </h2>

      <p className="mb-10 mt-4 text-xl text-muted-foreground">{t('sub')}</p>

      <div className="grid gap-8 gap-y-10 md:grid-cols-2 lg:grid-cols-4">
        {teamList.map(({ imageUrl, name, position }: TeamProps) => (
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
          </Card>
        ))}
      </div>
    </section>
  )
}
