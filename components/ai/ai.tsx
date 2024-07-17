/**
 * The `Ai` component is a React functional component that provides an AI-powered chat interface. It uses the `useChat` hook to manage the chat state and interactions.
 *
 * The component renders a fixed button that, when clicked, opens a chat window. The chat window displays a list of messages, with messages from the user displayed on the right and messages from the AI assistant displayed on the left. The user can enter a new message in an input field and submit it using the "senden" button.
 *
 * The component also includes functionality to close the chat window when the user clicks outside of it.
 *
 * @returns The `Ai` React component.
 */
'use client'

import { cn } from '@/lib/utils'
import { useState, useEffect, useRef } from 'react'
import { Input } from '../ui/input'
import { Button } from '../ui/button'
import { useChat } from 'ai/react'
import { usePathname } from '@/navigation'

const Ai: React.FC = () => {
  const [isOpened, setIsOpened] = useState(false)
  const { messages, input, handleInputChange, handleSubmit } = useChat()
  const containerRef = useRef<HTMLDivElement>(null)
  const buttonRef = useRef<HTMLDivElement>(null)
  const pathname = usePathname()

  const handleClickOutside = (event: MouseEvent) => {
    if (
      containerRef.current &&
      !containerRef.current.contains(event.target as Node) &&
      buttonRef.current &&
      !buttonRef.current.contains(event.target as Node)
    ) {
      setIsOpened(false)
    }
  }

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside)
    if (messages.length === 0) {
      messages.push({
        content: 'Hallo mein Name ist Byte, Wie kann ich dir weiterhelfen?',
        role: 'assistant',
        createdAt: new Date(),
        id: 'AAAAAA',
      })
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [messages])

  if(pathname.startsWith("/conversations/")) {
    return null
  }

  return (
    <div className="fixed">
      <div
        ref={buttonRef}
        onClick={() => setIsOpened(!isOpened)}
        className="fixed bottom-6 left-[calc(100vw-84px)] flex h-[60px] w-[60px] cursor-pointer items-center justify-center rounded-full bg-neutral-900 hover:bg-neutral-800"
      >
        <p className="text-xl font-bold text-white">AI</p>
      </div>
      <div
        ref={containerRef}
        className={cn(
          'fixed md:bottom-20 md:right-20 bottom-16 right-16 z-10 flex h-[400px] md:text-md text-sm w-[280px] flex-col justify-between rounded-lg border border-neutral-400 bg-white p-2 shadow-2xl md:h-[500px] md:w-[400px]',
          { hidden: !isOpened },
        )}
      >
        <div className="overflow-auto">
          {messages.map((m) => (
            <div
              key={m.id}
              className={cn(
                'm-2 w-2/3 whitespace-pre-wrap rounded-lg border border-solid border-neutral-400 bg-neutral-900 p-2 text-white shadow-lg',
                { 'float-right bg-indigo-900': m.role === 'user', 'float-left': m.role !== 'user' },
              )}
            >
              {m.content}
            </div>
          ))}
          <div className="pointer-events-none absolute inset-0 -z-10 flex items-center justify-center"></div>
        </div>
        <div className="p-2">
          <form className="flex gap-2" onSubmit={handleSubmit}>
            <Input
              onChange={handleInputChange}
              className="h-[40px] rounded-xl bg-white text-primary"
              placeholder="ask something..."
              value={input}
              type="text"
            />
            <Button type="submit" className="h-[40px] rounded-xl">
              senden
            </Button>
          </form>
        </div>
      </div>
    </div>
  )
}

export default Ai
