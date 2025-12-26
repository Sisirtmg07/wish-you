"use client"

import { useEffect, useState } from "react"

interface TypewriterEffectProps {
  text: string
  delay?: number
  speed?: number
  className?: string
}

export function TypewriterEffect({ text, delay = 0, speed = 100, className = "" }: TypewriterEffectProps) {
  const [displayedText, setDisplayedText] = useState("")
  const [isComplete, setIsComplete] = useState(false)

  useEffect(() => {
    let timeout: NodeJS.Timeout
    let charIndex = 0

    const startTyping = () => {
      timeout = setTimeout(() => {
        if (charIndex < text.length) {
          setDisplayedText(text.slice(0, charIndex + 1))
          charIndex++
          startTyping()
        } else {
          setIsComplete(true)
        }
      }, speed)
    }

    if (delay > 0) {
      const delayTimeout = setTimeout(startTyping, delay)
      return () => {
        clearTimeout(delayTimeout)
        clearTimeout(timeout)
      }
    } else {
      startTyping()
      return () => clearTimeout(timeout)
    }
  }, [text, delay, speed])

  return <span className={className}>{displayedText}</span>
}
