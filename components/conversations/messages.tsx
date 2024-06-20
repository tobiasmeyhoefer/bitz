'use client'

import { pusherClient } from '@/lib/pusher'
import { cn } from '@/lib/utils'
import { useEffect, useState } from 'react'
import { HiDotsVertical } from 'react-icons/hi'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'

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
      scrollToBottom()
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
          <div className="flex justify-between">
            <p>{m.content}</p>
            <DropdownMenu>
              <DropdownMenuTrigger><HiDotsVertical /></DropdownMenuTrigger>
              <DropdownMenuContent>
                {/* <DropdownMenuLabel>My Account</DropdownMenuLabel>
                <DropdownMenuSeparator /> */}
                <DropdownMenuItem>Delete</DropdownMenuItem>
                {/* <DropdownMenuItem>Billing</DropdownMenuItem>
                <DropdownMenuItem>Team</DropdownMenuItem>
                <DropdownMenuItem>Subscription</DropdownMenuItem> */}
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      ))}
    </div>
  )
}

export default Messages
