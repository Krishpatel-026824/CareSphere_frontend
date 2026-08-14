import { useEffect, useState } from 'react'

export function useCarousel(items = [], loopMs = 4000, startIndex = 0, paused = false) {
  const [index, setIndex] = useState(startIndex)
  const count = items.length
  const safeIndex = count ? index % count : 0

  useEffect(() => {
    if (count < 2 || paused || !loopMs) return undefined

    const timer = setInterval(() => {
      setIndex((current) => (current + 1) % count)
    }, loopMs)

    return () => clearInterval(timer)
  }, [count, loopMs, paused])

  return {
    item: items[safeIndex] || items[0] || null,
    index: safeIndex,
  }
}
