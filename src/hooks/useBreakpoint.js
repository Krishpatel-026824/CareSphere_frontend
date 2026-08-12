import { useEffect, useState } from 'react'

const queries = {
  sm: '(min-width: 640px)',
  md: '(min-width: 768px)',
  lg: '(min-width: 1024px)',
  xl: '(min-width: 1280px)',
}

export function useBreakpoint() {
  const [bp, setBp] = useState({ sm: false, md: false, lg: false, xl: false })

  useEffect(() => {
    const mqs = Object.fromEntries(
      Object.entries(queries).map(([key, query]) => [key, window.matchMedia(query)]),
    )

    const update = () => {
      setBp({
        sm: mqs.sm.matches,
        md: mqs.md.matches,
        lg: mqs.lg.matches,
        xl: mqs.xl.matches,
      })
    }

    update()
    Object.values(mqs).forEach((mq) => mq.addEventListener('change', update))
    return () => Object.values(mqs).forEach((mq) => mq.removeEventListener('change', update))
  }, [])

  return bp
}
