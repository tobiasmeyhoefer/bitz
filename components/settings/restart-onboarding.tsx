import { setOnboardingState } from '@/lib/useraction'
import { Button } from '../ui/button'
import { redirect } from '@/navigation'

const RestartOnboarding = async () => {
  return (
    <form
      className="w-full"
      action={async () => {
        'use server'
        await setOnboardingState(false)
        redirect("/browse")
      }}
    >
      <Button>Einführung neu beginnen</Button>
    </form>
  )
}

export default RestartOnboarding
