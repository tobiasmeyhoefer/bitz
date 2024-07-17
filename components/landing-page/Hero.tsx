/**
 * The `Hero` component is the main hero section of the landing page. It includes a 3D cube animation, a title and subtitle, a call-to-action button, and a link to the project's GitHub repository.
 *
 * The component uses the `useTranslations` hook from `next-intl` to retrieve localized strings for the content. It also imports various UI components and icons from other parts of the application.
 *
 * The component is responsible for rendering the main hero content and layout, including the positioning of the 3D cube animation and the hero cards section.
 */
import { Button } from '@/components/ui/button'
import { buttonVariants } from '@/components/ui/button'
import { HeroCards } from '@/components/landing-page/hero-cards'
import { GitHubLogoIcon } from '@radix-ui/react-icons'
import { Link } from '@/navigation'
import dynamic from 'next/dynamic'
import { useTranslations } from 'next-intl'

const CubeScene = dynamic(() => import('@/components/explosion/cube-scene'), {
  ssr: false,
})

export const Hero = () => {
const t = useTranslations('Landingpage')
  return (
    <section className="container grid place-items-center gap-10 py-20 md:py-32 lg:grid-cols-2">
      <div className="space-y-6 text-center lg:text-start">
        <main className="font-montserrat text-5xl font-bold md:text-6xl">
          <div id="clickEventWrapper" className="h-[300px] md:h-[400px]">
              <CubeScene />
          </div>
          <h1 className="inline">
            {t('sub01')}{' '}
            <span className="inline bg-gradient-to-r from-indigo-700  to-indigo-800 bg-clip-text text-transparent">
              {t('sub02')}
            </span>{' '}
            {t('sub03')}
          </h1>{' '}
          <h2 className="inline">
            <span className="inline bg-gradient-to-r from-indigo-700  to-indigo-800 bg-clip-text text-transparent">
              {t('sub04')}
            </span>{' '}
            <span className="text-xl">{t('sub05')}</span>
          </h2>
        </main>

        <p className="mx-auto text-xl text-muted-foreground md:w-10/12 lg:mx-0">
          {t("discoverBitz")}
        </p>

        <div className="space-y-4 md:space-x-4 md:space-y-0">
          <Link href={'/auth/login'}>
            <Button className="w-full md:w-1/3">{t('callButton')}</Button>
          </Link>

          <Link
            rel="noreferrer noopener"
            href="https://github.com/tobiasmeyhoefer/bitz"
            target="_blank"
            className={`w-full md:w-1/3 ${buttonVariants({
              variant: 'outline',
            })}`}
          >
            Github Repository
            <GitHubLogoIcon className="ml-2 h-5 w-5" />
          </Link>
        </div>
      </div>

      {/* Hero cards sections */}
      <div className="z-10">
        <HeroCards />
      </div>

      {/* Shadow effect */}
      <div className="shadow"></div>
    </section>
  )
}