function toCoords(points, width, height) {
  const max = Math.max(...points)
  const min = Math.min(...points)
  const range = max - min || 1
  const step = width / Math.max(points.length - 1, 1)

  return points.map((value, index) => ({
    x: index * step,
    y: height - ((value - min) / range) * (height - 6) - 3,
  }))
}

function toSmoothPath(coords) {
  if (coords.length < 2) return ''

  let d = `M ${coords[0].x} ${coords[0].y}`

  for (let i = 0; i < coords.length - 1; i += 1) {
    const p0 = coords[i - 1] || coords[i]
    const p1 = coords[i]
    const p2 = coords[i + 1]
    const p3 = coords[i + 2] || p2
    const cp1x = p1.x + (p2.x - p0.x) / 6
    const cp1y = p1.y + (p2.y - p0.y) / 6
    const cp2x = p2.x - (p3.x - p1.x) / 6
    const cp2y = p2.y - (p3.y - p1.y) / 6
    d += ` C ${cp1x} ${cp1y}, ${cp2x} ${cp2y}, ${p2.x} ${p2.y}`
  }

  return d
}

export default function Sparkline({
  points = [],
  color = '#0EA5A0',
  width = 120,
  height = 32,
  smooth = false,
}) {
  if (!points.length) return null

  const coords = toCoords(points, width, height)

  return (
    <svg
      viewBox={`0 0 ${width} ${height}`}
      preserveAspectRatio="none"
      className="w-full overflow-visible"
      style={{ height }}
      aria-hidden="true"
    >
      {smooth ? (
        <path
          d={toSmoothPath(coords)}
          fill="none"
          stroke={color}
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      ) : (
        <polyline
          points={coords.map((point) => `${point.x},${point.y}`).join(' ')}
          fill="none"
          stroke={color}
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      )}
    </svg>
  )
}
