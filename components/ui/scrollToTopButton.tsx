'use client'

import { useEffect, useState } from 'react'
import { Button } from './button'

export default function ScrollToTopButton() {
  const [showButton, setShowButton] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 100) {
        setShowButton(true)
        console.log("show")
      } else {
        setShowButton(false)
        console.log("hide")
      }
    }

    window.addEventListener('scroll', handleScroll)

    // Cleanup function to remove the event listener
    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, []) // Empty dependency array to ensure this runs only once on mount

  const scrollUp = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    })
  }

  return (
    // showButton && 
    (
      <Button
        onClick={scrollUp}
        variant="outline"
        className="fixed bottom-8 right-12 z-30 h-12 w-12 rounded-sm border hover:bg-accent hover:text-accent-foreground"
      >
        ↑
      </Button>
    )
  )
}
