export default function Sparkline({ points = [], color = '#0EA5A0', width = 120, height = 32 }) {
  if (!points.length) return null

  const max = Math.max(...points)
  const min = Math.min(...points)
  const range = max - min || 1
  const step = width / (points.length - 1)

  const coords = points.map((value, index) => {
    const x = index * step
    const y = height - ((value - min) / range) * (height - 6) - 3
    return `${x},${y}`
  })

  return (
    <svg width={width} height={height} viewBox={`0 0 ${width} ${height}`} className="overflow-visible" aria-hidden="true">
      <polyline
        points={coords.join(' ')}
        fill="none"
        stroke={color}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}
