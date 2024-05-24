'use client'

import { useEffect, useState } from 'react'

export default function ScrollToTopButton() {
  const [showButton, setShowButton] = useState(false)

  useEffect(() => {
    window.addEventListener('scroll', () => {
      if (window.scrollY > 100) {
        setShowButton(true)
      } else {
        setShowButton(false)
      }
    })
  }, [])

  const scrollUp = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    })
  }

  return (
    // showButton && ( ""scroll-to-top"""
    <button className=" fixed bottom-8 right-12 z-50 h-12 w-12 rounded-sm border hover:bg-accent hover:text-accent-foreground">
      ↑
    </button>
  )
  // )
}
