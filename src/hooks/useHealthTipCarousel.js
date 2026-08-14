import { useCarousel } from './useCarousel'

export function useHealthTipCarousel(tips = [], loopMs = 4000) {
  const { item, index } = useCarousel(tips, loopMs, 0)
  return {
    tip: item,
    index,
  }
}
