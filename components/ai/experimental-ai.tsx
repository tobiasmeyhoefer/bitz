'use client'

import { cn } from '@/lib/utils'
import { FormEvent, useState, useEffect, useRef } from 'react'
import { Input } from '../ui/input'
import { Button } from '../ui/button'
import { useChat } from 'ai/react'
import supportPerson from '@/public/images/support-person.svg'
import Image from 'next/image'

const ExperimentalAi: React.FC = () => {
  const [isOpened, setIsOpened] = useState(false)
  const { messages, input, handleInputChange, handleSubmit } = useChat()
  const containerRef = useRef<HTMLDivElement>(null)
  const buttonRef = useRef<HTMLDivElement>(null)

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

  return (
    <div className="fixed">
      <div
        ref={buttonRef}
        onClick={() => setIsOpened(!isOpened)}
        className="fixed bottom-6 right-6 flex h-[60px] w-[60px] cursor-pointer items-center justify-center rounded-full bg-neutral-900 hover:bg-neutral-800"
      >
        <p className="text-xl font-bold text-white">AI</p>
      </div>
      <div
        ref={containerRef}
        className={cn(
          'fixed bottom-20 right-20 z-10 flex md:h-[500px] md:w-[400px] h-[400px] w-[300px] flex-col justify-between rounded-lg border border-neutral-400 bg-white p-2 shadow-2xl',
          { hidden: !isOpened },
        )}
      >
        <div className="overflow-y-scroll">
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
          <div className="pointer-events-none absolute inset-0 flex items-center justify-center -z-10">
            <Image
              src={supportPerson}
              className="pointer-events-none fixed md:h-52 md:w-52 h-32 w-32"
              alt="a support person"
              width={100}
              height={100}
            />
          </div>
        </div>
        <div className="p-2">
          <form className="flex gap-2" onSubmit={handleSubmit}>
            <Input
              onChange={handleInputChange}
              className="h-[40px] rounded-xl text-primary"
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

export default ExperimentalAi
