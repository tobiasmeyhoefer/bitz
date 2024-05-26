'use client'

import {
  BrowseContentProps,
  SearchBarProps,
  Shop,
  RevealOnScrollProps,
  ProductType,
} from '@/lib/types'

import { useEffect, useRef, useState } from 'react'

const RevealOnScroll = ({ children }: RevealOnScrollProps) => {
  const [isVisible, setIsVisible] = useState(false)
  const ref = useRef(null)

  useEffect(() => {
    const scrollObserver = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setIsVisible(true)
        scrollObserver.unobserve(entry.target)
      }
    })

    scrollObserver.observe(ref.current!)

    return () => {
      if (ref.current) {
        scrollObserver.unobserve(ref.current)
      }
    }
  }, [])

  const classes = `transition-opacity duration-1000
      ${isVisible ? 'opacity-100' : 'opacity-0'}`

  return (
    <div ref={ref} className={classes}>
      {children}
    </div>
  )
}

export default RevealOnScroll