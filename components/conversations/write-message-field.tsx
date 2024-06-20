'use client'

import axios from 'axios'
import { Button } from '../ui/button'
import { Input } from '../ui/input'
import { useState } from 'react'
import { createMessage } from '@/lib/message-actions'
import { ConversationType, UserType } from '@/schema'
import { Label } from '@/components/ui/label'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { PopoverClose } from '@radix-ui/react-popover'
import { Textarea } from '../ui/textarea'

const WriteMessageField = ({ conv, user }: { conv: ConversationType; user: UserType }) => {
  const [input, setInput] = useState('')
  const [delayInput, setDelayInput] = useState('10')
  const [moneyInput, setMoneyInput] = useState('')
  const [locationInput, setLocationInput] = useState('')
  const [timeInput, setTimeInput] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  const scrollToBottom = () => {
    const element = document.getElementById('testo')
    element!.scrollTop = element!.scrollHeight
  }

  const sendMessage = async () => {
    setIsLoading(true)
    if (input.trim() === '') return
    await createMessage(input, user.id, conv.id)
    await axios.post('/api/message', { content: input, convId: conv.id, senderId: user.id })
    setInput('')
    setTimeout(() => scrollToBottom(), 200)
    setIsLoading(false)
  }

  return (
    <div>
      <div className="flex gap-2">
        {conv.sellerId === user.id ? (
          <>
            <Popover>
              <PopoverTrigger asChild>
                <Button variant="outline">Ort?</Button>
              </PopoverTrigger>
              <PopoverContent className="w-80 flex flex-col gap-2">
                <h4 className="font-medium leading-none">Ort?</h4>
                <PopoverClose>
                  <Button
                    className="w-full"
                    onClick={() => setInput(`Du kannst das Bit hier abholen: ${user.adress} `)}
                    variant={'outline'}
                  >
                    Meine Adresse
                  </Button>
                </PopoverClose>
                <label id="place">anderer Ort?</label>
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
                    className="w-full"
                    onClick={() => setInput(`Du kannst das Bit hier abholen: ${locationInput}`)}
                    variant={'outline'}
                  >
                    Fertig
                  </Button>
                </PopoverClose>
              </PopoverContent>
            </Popover>

            <Popover>
              <PopoverTrigger asChild>
                <Button variant="outline">Zeit?</Button>
              </PopoverTrigger>
              <PopoverContent className="w-80 flex flex-col gap-2">
                <h4 className="font-medium leading-none">Zeit?</h4>
                <label id="place">Schreibe hier wann du Zeit hast:</label>
                <Textarea
                  id="place"
                  onChange={({ target }) => setTimeInput(target.value)}
                  defaultValue=""
                  placeholder="Morgen bis 12 oder Donnerstag von 14-16Uhr "
                  className="col-span-2 h-8"/>
                <PopoverClose>
                  <Button
                    className="w-full"
                    onClick={() => setInput(`Ich habe ${timeInput} Zeit ✨`)}
                    variant={'outline'}
                  >
                    Fertig
                  </Button>
                </PopoverClose>
              </PopoverContent>
            </Popover>

            <Button
              onClick={() => setInput('Wir haben einen Deal ✅')}
              variant={'outline'}
            >
              Deal!
            </Button>
          </>
        ) : (
          <>
            <Popover>
              <PopoverTrigger asChild>
                <Button variant="outline">Verhandlung</Button>
              </PopoverTrigger>
              <PopoverContent className="w-80">
                <div className="grid gap-4">
                  <div className="space-y-2">
                    <h4 className="font-medium leading-none">Angebot</h4>
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
                        className="w-full"
                        onClick={() =>
                          setInput(`Ich biete dir ${moneyInput} Euro. Haben wir einen Deal?`)
                        }
                        variant={'outline'}
                      >
                        Fertig
                      </Button>
                    </PopoverClose>
                  </div>
                </div>
              </PopoverContent>
            </Popover>

            <Button onClick={() => setInput('Wo wollen wir uns treffen? ✨')} variant={'outline'}>
              Ort
            </Button>
            <Button
              onClick={() => setInput('Wann kann ich das Bit abholen? ✨')}
              variant={'outline'}
            >
              Zeit
            </Button>

            <Popover>
              <PopoverTrigger asChild>
                <Button variant="outline">Verspätung</Button>
              </PopoverTrigger>
              <PopoverContent className="w-80">
                <div className="grid gap-4">
                  <div className="space-y-2">
                    <h4 className="font-medium leading-none">Verspätung</h4>
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
                      <span className="text-sm">Minuten</span>
                    </div>
                    <PopoverClose>
                      <Button
                        className="w-full"
                        onClick={() => setInput(`Ich verspäte mich um ${delayInput} Minuten`)}
                        variant={'outline'}
                      >
                        Fertig
                      </Button>
                    </PopoverClose>
                  </div>
                </div>
              </PopoverContent>
            </Popover>

            <Button
              onClick={() => setInput('Ich bin nicht mehr interessiert, Entschuligung ❌')}
              variant={'outline'}
            >
              Abbruch
            </Button>
          </>
        )}
      </div>
      <div className="mr-20 flex gap-2 p-2">
        <Input
          className="h-[64px] rounded-xl bg-white text-primary"
          placeholder="type a message..."
          value={input}
          onChange={({ target }) => setInput(target.value)}
          type="text"
        />

        {isLoading ? <Button disabled onClick={sendMessage} className="h-[64px] rounded-xl px-6">
          senden
        </Button> : <Button onClick={sendMessage} className="h-[64px] rounded-xl px-6">
          senden
        </Button>}
      </div>
    </div>
  )
}

export default WriteMessageField
