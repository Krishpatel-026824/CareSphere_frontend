import { Heart } from 'lucide-react'

export default function CareSphereLogo({
  variant = 'light',
  size = 'md',
  showName = true,
  caption,
  className = '',
}) {
  const isDark = variant === 'dark'
  const sizes = {
    sm: { wrap: 'w-10 h-10', heart: 'w-5 h-5', glow: 'w-12 h-12', name: 'text-lg', gap: 'mt-2.5' },
    md: { wrap: 'w-14 h-14', heart: 'w-7 h-7', glow: 'w-16 h-16', name: 'text-[22px]', gap: 'mt-3' },
    lg: { wrap: 'w-16 h-16', heart: 'w-8 h-8', glow: 'w-[72px] h-[72px]', name: 'text-2xl', gap: 'mt-3.5' },
  }
  const s = sizes[size] || sizes.md

  return (
    <div className={`flex flex-col items-center text-center ${className}`}>
      <div className="relative flex items-center justify-center">
        <span
          className={`absolute ${s.glow} rounded-full blur-xl ${isDark ? 'bg-teal/25' : 'bg-teal/30'}`}
          aria-hidden="true"
        />
        <span
          className={`relative ${s.wrap} rounded-2xl flex items-center justify-center ${
            isDark
              ? 'bg-teal/15 ring-1 ring-teal/30'
              : 'bg-gradient-to-br from-teal to-teal-dark shadow-[0_10px_24px_-8px_rgba(14,165,160,0.55)]'
          }`}
        >
          <Heart
            className={`${s.heart} ${isDark ? 'text-teal fill-teal' : 'text-white fill-white'}`}
            strokeWidth={1.5}
          />
        </span>
      </div>
      {showName ? (
        <p
          className={`font-display ${s.name} font-bold tracking-tight leading-none ${s.gap} ${
            isDark ? 'text-white' : 'text-navy'
          }`}
        >
          CareSphere
        </p>
      ) : null}
      {caption ? (
        <p
          className={`mt-2 text-[10px] tracking-[0.2em] uppercase font-bold ${
            isDark ? 'text-teal-light/90' : 'text-teal'
          }`}
        >
          {caption}
        </p>
      ) : null}
    </div>
  )
}
