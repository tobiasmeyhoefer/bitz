'use client'

import { useEffect, useState } from 'react'
import { Button } from './button'

export default function ScrollToTopButton() {
  const [showButton, setShowButton] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 100) {
        setShowButton(true)
      } else {
        setShowButton(false)
      }
    }

    window.addEventListener('scroll', handleScroll)

    // Clean up the event listener on component unmount
    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [])

  const scrollUp = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    })
  }

  return (
    // showButton &&
    <Button
      onClick={scrollUp}
      variant="outline"
      className="fixed bottom-8 right-12 z-30 h-12 w-12 rounded-sm border hover:bg-accent hover:text-accent-foreground"
    >
      ↑
    </Button>
  )
}
