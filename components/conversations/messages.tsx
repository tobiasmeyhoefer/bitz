'use client'

import { pusherClient } from '@/lib/pusher'
import { cn, formatDate } from '@/lib/utils'
import { useEffect, useOptimistic, useState } from 'react'
import { HiDotsVertical } from 'react-icons/hi'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { MessageType } from '@/schema'
import { deleteMessageById } from '@/lib/message-actions'

interface MessageProps {
  convId: string
  initialMessages: {
    content: string
    id: string
    isSender: boolean
    timeStamp: Date
    isSystemMessage: boolean
  }[]
  userId: string
}

const Messages = ({ convId, initialMessages, userId }: MessageProps) => {
  const [messages, setMessages] = useState(initialMessages)
  const [optimisticMessages, optimisticSetMessages] = useOptimistic(initialMessages, )

  const scrollToBottom = () => {
    const element = document.getElementById('testo')
    element!.scrollTop = element!.scrollHeight
  }

  useEffect(() => {
    pusherClient.subscribe(convId)
    scrollToBottom()

    const handleIncomingMessage = (data: {
      content: string
      senderId: string
      timeStamp: Date
      isSystemMessage: boolean
    }) => {
      const isSender = data.senderId === userId
      setMessages((prev) => [
        ...prev,
        {
          content: data.content,
          id: `${prev.length}-${Date.now()}`,
          isSender,
          timeStamp: data.timeStamp ?? new Date(),
          isSystemMessage: data.isSystemMessage,
        },
      ])
      scrollToBottom()
    }

    pusherClient.bind('incoming-message', handleIncomingMessage)

    return () => {
      pusherClient.unsubscribe(convId)
      pusherClient.unbind('incoming-message', handleIncomingMessage)
    }
  }, [convId, userId])

  const deleteMessage = async (messageId: string, index: number) => {
    await deleteMessageById(messageId)
    const newMessages = messages.filter((_, i) => i !== index)
    setMessages(newMessages)
  }

  return (
    <div id="testo" className="overflow-y-scroll">
      {messages.map((m, i) => (
        <>
          <div
            key={m.id}
            className={cn(
              'm-2 w-2/3 whitespace-pre-wrap rounded-lg border border-solid border-neutral-400 p-2 text-white',
              {
                'float-right bg-indigo-900': m.isSender,
                'float-left bg-neutral-900': !m.isSender,
                'flex items-center justify-center bg-emerald-800': m.isSystemMessage,
              },
            )}
          >
            {m.isSystemMessage ? (
              <div className="text-center">
                <p className="text-xl">Juhu ihr habt eine Deal</p>
                <p className="text-sm">
                  Sofern noch nicht geschehen solltet ihr noch Ort und Zeitpunkt des Treffs
                  ausmachen
                </p>
              </div>
            ) : (
              <div className="flex justify-between">
                <div>
                  <p>{m.content}</p>
                  <p className="text-sm text-neutral-500">{formatDate(m.timeStamp)}</p>
                </div>
                {m.isSender ? (
                  <DropdownMenu>
                    <DropdownMenuTrigger>
                      <HiDotsVertical />
                    </DropdownMenuTrigger>
                    <DropdownMenuContent>
                      <DropdownMenuItem onClick={() => deleteMessage(m.id, i)}>
                        Delete
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                ) : null}
              </div>
            )}
          </div>
        </>
      ))}
    </div>
  )
}

export default Messages
