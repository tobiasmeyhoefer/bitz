'use client'

/**
 * The `WriteMessageField` component is responsible for rendering the input field and buttons for sending messages in a conversation.
 *
 * It provides the following functionality:
 * - Allows the user to input a message and send it.
 * - Includes various buttons for adding location, time, and deal information to the message.
 * - Checks for profanity in the message before sending.
 * - Scrolls to the bottom of the conversation when a message is sent.
 * - Displays a warning if the user tries to send a self-written message.
 *
 * @param {Object} props - The component props.
 * @param {ConversationType} props.conv - The current conversation object.
 * @param {UserType} props.user - The current user object.
 * @returns {JSX.Element} The `WriteMessageField` component.
 */
import axios from 'axios'
import { Button } from '../ui/button'
import { Input } from '../ui/input'
import { useState } from 'react'
import { createMessage } from '@/lib/message-actions'
import { ConversationType, UserType } from '@/schema'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { PopoverClose } from '@radix-ui/react-popover'
import { Textarea } from '../ui/textarea'
import confetti from 'canvas-confetti'
import { checkProfanity } from '@/lib/product-actions'
import { useToast } from '../ui/use-toast'

interface WriteMessageFieldProps {
  conv: ConversationType
  user: UserType
  translations: {
    title: string
    description: string
    deal1: string
    deal2: string
    warnMsg: string
    myAddress: string
    otherLocation: string
    pickUpHere: string
    done: string
    timeQuestion: string
    writeWhenTime: string
    timePlaceholder: string
    iHave: string
    time: string
    negotiation: string
    offer: string
    offerAmount: string
    dealQuestion: string
    whereMeet: string
    whenPickUp: string
    delay: string
    minutes: string
    notInterested: string
    cancel: string
    delayMessage: string
    send: string
  }
}

const WriteMessageField = ({ conv, user, translations }: WriteMessageFieldProps) => {
  const [input, setInput] = useState('')
  const [delayInput, setDelayInput] = useState('10')
  const [moneyInput, setMoneyInput] = useState('')
  const [locationInput, setLocationInput] = useState('')
  const [timeInput, setTimeInput] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const { toast } = useToast()
  const [warning, setWarning] = useState(false)

  const scrollToBottom = () => {
    const element = document.getElementById('testo')
    element!.scrollTop = element!.scrollHeight
  }

  const handleFireworkClick = () => {
    const duration = 5 * 1000
    const animationEnd = Date.now() + duration
    const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 0 }

    const randomInRange = (min: number, max: number) => Math.random() * (max - min) + min

    const interval = window.setInterval(() => {
      const timeLeft = animationEnd - Date.now()

      if (timeLeft <= 0) {
        return clearInterval(interval)
      }

      const particleCount = 50 * (timeLeft / duration)
      confetti({
        ...defaults,
        particleCount,
        origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 },
      })
      confetti({
        ...defaults,
        particleCount,
        origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 },
      })
    }, 250)
  }

  const sendMessage = async () => {
    setIsLoading(true)

    if (input.trim() === '') return

    if (await checkProfanity(input)) {
      toast({
        title: translations.title,
        description: translations.description,
        duration: 2000,
      })
      setIsLoading(false)
      return
    }

    if (input === 'Wir haben einen Deal ✅' || input === 'We have a deal ✅') {
      await createMessage(translations.deal2, user.id, conv.id, true, conv.productId)
      await axios.post('/api/message', {
        content: input,
        convId: conv.id,
        senderId: user.id,
        isSystemMessage: true,
      })
      handleFireworkClick()
    } else {
      await createMessage(input, user.id, conv.id, false, conv.productId)
      await axios.post('/api/message', { content: input, convId: conv.id, senderId: user.id })
    }

    setInput('')
    setTimeout(() => scrollToBottom(), 200)
    setIsLoading(false)
  }

  return (
    <div className="z-10 bg-background">
      {warning ? (
        <p className="mb-2 rounded-lg bg-red-100 p-2 text-sm text-red-500">
          {translations.warnMsg}
        </p>
      ) : null}
      <div className="mt-2">
        {conv.sellerId === user.id ? (
          <div className="flex gap-2 max-sm:overflow-x-scroll">
            <Popover>
              <PopoverTrigger asChild>
                <Button variant="outline">{translations.location}</Button>
              </PopoverTrigger>
              <PopoverContent className="flex w-80 flex-col gap-2">
                <h4 className="font-medium leading-none">Ort?</h4>
                <PopoverClose>
                  <Button
                    className="w-full bg-card-button text-primary-foreground"
                    onClick={() => setInput(`Du kannst das Bit hier abholen: ${user.adress} `)}
                    variant={'outline'}
                  >
                    {translations.myAddress}
                  </Button>
                </PopoverClose>
                <label id="place">{translations.otherLocation}</label>
                <Input
                  type="text"
                  id="place"
                  onChange={({ target }) => setLocationInput(target.value)}
                  defaultValue=""
                  placeholder="Teststraße 17b 12345 Berlin"
                  className="col-span-2 h-8"
                />
                <PopoverClose>
                  <Button
                    className="w-full bg-card-button text-primary-foreground"
                    onClick={() => setInput(`${translations.pickUpHere} ${locationInput}`)}
                    variant={'outline'}
                  >
                    {translations.done}
                  </Button>
                </PopoverClose>
              </PopoverContent>
            </Popover>

            <Popover>
              <PopoverTrigger asChild>
                <Button variant="outline">{translations.timeQuestion}</Button>
              </PopoverTrigger>
              <PopoverContent className="flex w-80 flex-col gap-2">
                <h4 className="font-medium leading-none">{translations.timeQuestion}</h4>
                <label id="place">{translations.writeWhenTime}</label>
                <Textarea
                  id="place"
                  onChange={({ target }) => setTimeInput(target.value)}
                  defaultValue=""
                  placeholder={translations.timePlaceholder}
                  className="col-span-2 h-8"
                />
                <PopoverClose>
                  <Button
                    className="w-full bg-card-button text-primary-foreground"
                    onClick={() =>
                      setInput(`${translations.iHave} ${timeInput} ${translations.time} ✨`)
                    }
                    variant={'outline'}
                  >
                    {translations.done}
                  </Button>
                </PopoverClose>
              </PopoverContent>
            </Popover>

            <Button
              onClick={async () => {
                setInput(translations.deal1)
              }}
              variant={'outline'}
            >
              Deal!
            </Button>
          </div>
        ) : (
          <div className="flex gap-2 max-sm:overflow-x-scroll">
            <Popover>
              <PopoverTrigger asChild>
                <Button variant="outline">{translations.negotiation}</Button>
              </PopoverTrigger>
              <PopoverContent className="w-80">
                <div className="grid gap-4">
                  <div className="space-y-2">
                    <h4 className="font-medium leading-none">{translations.offer}</h4>
                  </div>
                  <div className="grid gap-2">
                    <div className="grid grid-cols-3 items-center gap-4">
                      <Input
                        type="number"
                        onChange={({ target }) => setMoneyInput(target.value)}
                        defaultValue=""
                        className="col-span-2 h-8"
                      />
                      <span className="text-sm">€</span>
                    </div>
                    <PopoverClose>
                      <Button
                        className="w-full bg-card-button text-primary-foreground"
                        onClick={() =>
                          setInput(
                            `${translations.offerAmount} ${moneyInput} ${translations.dealQuestion}`,
                          )
                        }
                        variant={'outline'}
                      >
                        {translations.done}
                      </Button>
                    </PopoverClose>
                  </div>
                </div>
              </PopoverContent>
            </Popover>

            <Button onClick={() => setInput(translations.whereMeet)} variant={'outline'}>
              {translations.location}
            </Button>
            <Button onClick={() => setInput(translations.whenPickUp)} variant={'outline'}>
              {translations.time}
            </Button>

            <Popover>
              <PopoverTrigger asChild>
                <Button variant="outline">{translations.delay}</Button>
              </PopoverTrigger>
              <PopoverContent className="w-80">
                <div className="grid gap-4">
                  <div className="space-y-2">
                    <h4 className="font-medium leading-none">{translations.delay}</h4>
                  </div>
                  <div className="grid gap-2">
                    <div className="grid grid-cols-3 items-center gap-4">
                      <Input
                        type="number"
                        id="delay"
                        onChange={({ target }) => setDelayInput(target.value)}
                        defaultValue="10"
                        className="col-span-2 h-8"
                      />
                      <span className="text-sm">{translations.minutes}</span>
                    </div>
                    <PopoverClose>
                      <Button
                        className="w-full bg-card-button text-primary-foreground"
                        onClick={() =>
                          setInput(
                            `${translations.delayMessage} ${delayInput} ${translations.minutes}`,
                          )
                        }
                        variant={'outline'}
                      >
                        {translations.done}
                      </Button>
                    </PopoverClose>
                  </div>
                </div>
              </PopoverContent>
            </Popover>

            <Button onClick={() => setInput(translations.notInterested)} variant={'outline'}>
              {translations.cancel}
            </Button>
          </div>
        )}
      </div>
      <form className="mt-2 flex gap-2">
        <Input
          className="h-[50px] rounded-xl md:h-[64px]"
          placeholder="type a message..."
          value={input}
          onChange={({ target }) => {
            setInput(target.value)

            if (target.value === '') {
              setWarning(false)
              return
            }
            setWarning(true)
          }}
          type="text"
        />

        {isLoading ? (
          <Button disabled onClick={sendMessage} className="h-[50px] rounded-xl px-6 md:h-[64px]">
            {translations.send}
          </Button>
        ) : (
          <Button
            type="submit"
            onClick={sendMessage}
            className="h-[50px] rounded-xl px-6 md:h-[64px]"
          >
            {translations.send}
          </Button>
        )}
      </form>
    </div>
  )
}

export default WriteMessageField
