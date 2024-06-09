'use client'

import { cn } from '@/lib/utils'
import { FormEvent, useState, useEffect, useRef } from 'react'
import { Input } from '../ui/input'
import { Button } from '../ui/button'
import { useChat } from 'ai/react'

const ExperimentalAi: React.FC = () => {
  const [isOpened, setIsOpened] = useState(false)
  const { messages, input, handleInputChange, handleSubmit } = useChat()
  const containerRef = useRef<HTMLDivElement>(null)

  const handleClickOutside = (event: MouseEvent) => {
    if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
      setIsOpened(false)
    }
  }

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [])

  return (
    <div className="fixed">
      <div
        onClick={() => setIsOpened(!isOpened)}
        className="fixed bottom-4 right-4 flex h-[60px] w-[60px] cursor-pointer items-center justify-center rounded-full bg-neutral-900 hover:bg-neutral-800"
      >
        <p className="text-xl font-bold text-white">AI</p>
      </div>
      <div
        ref={containerRef}
        className={cn(
          'fixed bottom-20 right-20 z-10 flex h-[500px] w-[400px] flex-col justify-between rounded-lg border border-neutral-400 bg-white p-2 shadow-2xl',
          { hidden: !isOpened },
        )}
      >
        <div className="overflow-y-scroll">
          {messages.map((m) => (
            <div
              key={m.id}
              className={cn(
                'm-2 w-2/3 whitespace-pre-wrap rounded-lg border border-solid border-neutral-400 bg-neutral-900 p-2 text-white shadow-lg',
                { 'float-left bg-indigo-900': m.role === 'user', 'float-right': m.role !== 'user' },
              )}
            >
              {m.content}
            </div>
          ))}
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
