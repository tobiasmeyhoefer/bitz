'use client'

import { useEffect, useState } from 'react'
import { Button } from './button'

export default function ScrollToTopButton() {
  const [showButton, setShowButton] = useState(false)
  const [scrollY, setScrollY] = useState(0)

  useEffect(() => {
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll) 
  }, [])

  const handleScroll = () => {
    setScrollY(window.scrollY)
    // console.log(window.scrollY)
    if (window.scrollY > 10) { 
      setShowButton(true)
      console.log("show")
    } else {
      setShowButton(false)
      console.log("hide")
    }
  }

  const scrollUp = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    })
  }

  return (
    showButton && 
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
