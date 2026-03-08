// src/hooks/useTyping.js
// Animates text appearing one character at a time (typewriter effect).

import { useState, useEffect } from 'react'

/**
 * @param {string} text - The full string to type out
 * @param {number} speed - Milliseconds per character (default: 22)
 * @returns {{ shown: string, done: boolean }}
 */
export function useTyping(text, speed = 22) {
  const [shown, setShown] = useState('')
  const [done,  setDone]  = useState(false)

  useEffect(() => {
    if (!text) return
    setShown('')
    setDone(false)
    let i = 0
    const iv = setInterval(() => {
      if (i < text.length) {
        setShown(text.slice(0, ++i))
      } else {
        clearInterval(iv)
        setDone(true)
      }
    }, speed)
    return () => clearInterval(iv)
  }, [text, speed])

  return { shown, done }
}
