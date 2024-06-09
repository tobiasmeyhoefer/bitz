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
import { create } from 'zustand'
import { useOnboardingStore } from '@/stores/onboarding-store'
import { OnboardingCardEnum } from '@/lib/types'

const OnboardingCard = () => {
  const { onboardingIndex, update } = useOnboardingStore()
  // const isOnboarding await checkOnboardingState()
  //if(!isOnboarding)
  //return null

  let title: string = ''
  let description: string = ''

  switch (onboardingIndex) {
    case 0:
      //Browse
      title = 'Entdecken'
      description = 'Scrolle einfach umher und finde unzählige neue Technik die dich begeistert'
      break
    case 1:
      //Search
      title = 'Suchen'
      description = 'Hier kannst du nach spezifischen Bitz suchen'
      break
    case 2:
      title = 'Meine Bitz'
      description = 'Hier siehst du deine eigenen Produkte... Wir nennen diese Bitz'
      break
    case 3:
      title = 'Bit hinzufügen'
      description = 'Du kannst hier ein Bit hinzufügen '
      break
    case 4:
      title = 'Und sonst so?'
      description =
        'Hier oben findest du weitere nützliche Dinge wie deine getätigten Käufe oder die Einstellungen'
      break
    default:
      // Handle default case
      break
  }

  return (
    <>
    {/* positioning auslagern */}
      <Card className="absolute left-10 top-10 z-10 w-[300px] shadow-xl">
        <CardHeader>
          <CardTitle>{title}</CardTitle>
          <CardDescription>{description}</CardDescription>
        </CardHeader>
        <CardFooter>
          <Button onClick={() => update(onboardingIndex + 1)}>Weiter</Button>
          <Button variant={'ghost'}>Überspringen</Button>
        </CardFooter>
        <BorderBeam className="pointer-events-none" />
      </Card>
      <div className="inset-0 fixed bg-black/70"></div>
    </>
  )
}

export default OnboardingCard
