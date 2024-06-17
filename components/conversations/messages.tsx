'use client'

import { pusherClient } from '@/lib/pusher'
import { cn } from '@/lib/utils'
import { useEffect, useState } from 'react'

interface MessageProps {
  convId: string
  initialMessages: {
    content: string
    id: string
    isSender: boolean
  }[]
  userId: string
}

const Messages = ({ convId, initialMessages, userId }: MessageProps) => {
  const [messages, setMessages] = useState(initialMessages)

  const scrollToBottom = () => {
    const element = document.getElementById('testo')
    element!.scrollTop = element!.scrollHeight
  }

  useEffect(() => {
    pusherClient.subscribe(convId)
    scrollToBottom()

    const handleIncomingMessage = (data: { content: string; senderId: string }) => {
      const isSender = data.senderId === userId
      setMessages((prev) => [
        ...prev,
        { content: data.content, id: `${prev.length}-${Date.now()}`, isSender },
      ])
    }

    pusherClient.bind('incoming-message', handleIncomingMessage)

    return () => {
      pusherClient.unsubscribe(convId)
      pusherClient.unbind('incoming-message', handleIncomingMessage)
    }
  }, [convId, userId])

  return (
    <div id="testo" className="overflow-y-scroll">
      {messages.map((m) => (
        <div
          key={m.id}
          className={cn(
            'm-2 w-2/3 whitespace-pre-wrap rounded-lg border border-solid border-neutral-400 p-2 text-white',
            { 'float-right bg-indigo-900': m.isSender, 'float-left bg-neutral-900': !m.isSender },
          )}
        >
          {m.content}
        </div>
      ))}
    </div>
  )
}

export default Messages
