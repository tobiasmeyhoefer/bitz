'use client'

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Button } from '../ui/button'
import { BorderBeam } from '../magicui/border-beam'
import { useOnboardingStore } from '@/stores/onboarding-store'
import { getOnboardingState, setOnboardingState } from '@/lib/useraction'
import { useEffect, useState } from 'react'
import { cn } from '@/lib/utils'

interface OnboardingCardProps {
  className?: string
}

const OnboardingBrowseCard: React.FC<OnboardingCardProps> = ({ className }) => {
  const { onboardingIndexBrowse, updateOnboardingIndexBrowse } = useOnboardingStore()
  const [onboardingFinished, setOnboardingFinished] = useState(true)

  useEffect(() => {
    const fetch = async () => {
      const onboardingIsFinished = await getOnboardingState()
      setOnboardingFinished(onboardingIsFinished!)
    }
    fetch()
  }, [onboardingIndexBrowse])

  if (onboardingFinished) {
    return null
  }

  let title: string = ''
  let description: string = ''

  switch (onboardingIndexBrowse) {
    case 0:
      title = 'Willkommen bei Bitz'
      description =
        'Hier auf der Entdecken Seite kannst du neue Produkte finden. Wir nennen diese Bitz'
      break
    case 1:
      title = 'Suchbar'
      description = 'Über die Suchbar kannst du spezifischer nach Bitz suchen'
      break
    case 2:
      title = 'Meine Bitz'
      description = 'In mein Bitz findest du deine Inserate und kannst dort auch weitere hinzufügen'
      break
    case 3:
      title = 'Konversationen'
      description =
        'Der Bereich Konversationen ist für das Abwicklen von Geschäften gedacht. Wir vermeiden Chats um die Sicherheit zu erhöhen.'
      break
    case 4:
      title = 'Transaktionen'
      description =
        'Im Bereich Transaktionen siehst du deine getätigten Käufe sei es über Direkt kaufen oder über die normale Kaufen Funktion getätigte'
      break
    case 5:
      title = 'Favoriten'
      description = 'Hier findest du von dir abgespeicherte Bitz'
      break
    case 6:
      title = 'Einstellungen'
      description =
        'In den Einstellungen kannst du unter anderem dein Profilbild ändern, Passkeys hinzufügen oder das Aussehen der Anwendung personalisieren'
      break
    default:
      title = ''
      description = ''
  }

  return (
    <div className="absolute inset-0 flex items-center justify-center">
      <Card
        className={cn(
          ' z-20 relative flex min-h-[200px] w-[400px] flex-col justify-between shadow-xl',
          className,
        )}
      >
        <CardHeader>
          <CardTitle>{title}</CardTitle>
          <CardDescription>{description}</CardDescription>
        </CardHeader>
        <CardFooter className='flex gap-4'>
          {onboardingIndexBrowse === 6 ? (
            <Button
              onClick={async () => {
                setOnboardingFinished(true)
                await setOnboardingState(true)
              }}
            >
              Fertig
            </Button>
          ) : (
            <Button onClick={() => updateOnboardingIndexBrowse(onboardingIndexBrowse + 1)}>
              Weiter
            </Button>
          )}
          <Button
            onClick={async () => {
              setOnboardingFinished(true)
              await setOnboardingState(true)
            }}
            variant={'ghost'}
          >
            Überspringen
          </Button>
        </CardFooter>
        <BorderBeam borderWidth={4} className='-z-10 -m-1' duration={10} />
      </Card>
      <div className="fixed inset-0 z-10 bg-black/70"></div>
    </div>
  )
}

export default OnboardingBrowseCard