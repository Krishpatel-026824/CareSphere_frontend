export default function SemiGauge({
  percent = 70,
  color = '#0EA5A0',
  trackColor = '#E8EEF4',
  size = 112,
  strokeWidth = 10,
  children,
}) {
  const width = size
  const height = size * 0.62
  const r = (size - strokeWidth) / 2
  const cx = size / 2
  const cy = size / 2
  const circumference = Math.PI * r
  const clamped = Math.max(0, Math.min(100, percent))
  const dash = (clamped / 100) * circumference

  return (
    <div className="relative inline-flex items-end justify-center" style={{ width, height }}>
      <svg width={width} height={height} viewBox={`0 0 ${size} ${height}`} className="overflow-visible" aria-hidden="true">
        <path
          d={`M ${strokeWidth / 2} ${cy} A ${r} ${r} 0 0 1 ${size - strokeWidth / 2} ${cy}`}
          fill="none"
          stroke={trackColor}
          strokeWidth={strokeWidth}
          strokeLinecap="round"
        />
        <path
          d={`M ${strokeWidth / 2} ${cy} A ${r} ${r} 0 0 1 ${size - strokeWidth / 2} ${cy}`}
          fill="none"
          stroke={color}
          strokeWidth={strokeWidth}
          strokeLinecap="round"
          strokeDasharray={`${dash} ${circumference}`}
        />
      </svg>
      <div className="absolute inset-x-0 bottom-0 flex flex-col items-center justify-end pb-0.5">{children}</div>
    </div>
  )
}
