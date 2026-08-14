import { useState } from 'react'

export function usePager(items = [], startIndex = 0) {
  const [index, setIndex] = useState(startIndex)
  const count = items.length
  const safeIndex = count ? ((index % count) + count) % count : 0

  function goNext() {
    if (count < 2) return
    setIndex((current) => (current + 1) % count)
  }

  function goPrev() {
    if (count < 2) return
    setIndex((current) => (current - 1 + count) % count)
  }

  return {
    item: items[safeIndex] || items[0] || null,
    index: safeIndex,
    count,
    canPage: count > 1,
    goNext,
    goPrev,
  }
}
