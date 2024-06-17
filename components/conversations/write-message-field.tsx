'use client'

import axios from 'axios'
import { Button } from '../ui/button'
import { Input } from '../ui/input'
import { useState } from 'react'
import { createMessage } from '@/lib/message-actions'

const WriteMessageField = ({ convId, userId }: { convId: string; userId: string }) => {
  const [input, setInput] = useState('')

  const scrollToBottom = () => {
    const element = document.getElementById('testo')
    element!.scrollTop = element!.scrollHeight
  }

  const sendMessage = async () => {
    if (input.trim() === '') return
    await createMessage(input, userId, convId)
    await axios.post('/api/message', { content: input, convId, senderId: userId })
    setInput('')
    setTimeout(() => scrollToBottom(), 200)
  }

  

  return (
    <>
      <div className='flex gap-2'>
        <Button onClick={() => setInput("Ich habe morgen Zeit")} variant={"outline"}>Ich habe morgen Zeit</Button>
        <Button onClick={() => setInput("Ich komme zu spät")} variant={"outline"}>Ich komme zu spät</Button>
        <Button onClick={() => setInput("Ich bin nicht mehr interessiert, Entschuligung")} variant={"outline"}>Ich bin nicht mehr interessiert, Entschuligung</Button>
        <Button onClick={() => setInput("Deal?")} variant={"outline"}>Deal?</Button>
      </div>
      <div className="mr-20 flex gap-2 p-2">
        <Input
          className="h-[64px] rounded-xl bg-white text-primary"
          placeholder="type a message..."
          value={input}
          onChange={({ target }) => setInput(target.value)}
          type="text"
        />
        <Button onClick={sendMessage} className="h-[64px] rounded-xl px-6">
          senden
        </Button>
      </div>
    </>
  )
}

export default WriteMessageField
