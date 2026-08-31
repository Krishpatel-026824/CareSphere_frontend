import CareSphereMark from './CareSphereMark'

const SIZES = {
  sm: {
    mark: 'w-10 h-10',
    word: 'text-[17px]',
    gap: 'gap-3',
    caption: 'text-[9px]',
    rule: 'w-10',
  },
  md: {
    mark: 'w-[52px] h-[52px]',
    word: 'text-[21px]',
    gap: 'gap-3.5',
    caption: 'text-[10px]',
    rule: 'w-12',
  },
  lg: {
    mark: 'w-16 h-16',
    word: 'text-[26px]',
    gap: 'gap-4',
    caption: 'text-[11px]',
    rule: 'w-14',
  },
  xl: {
    mark: 'w-[92px] h-[92px] sm:w-[100px] sm:h-[100px] lg:w-[112px] lg:h-[112px]',
    word: 'text-[40px] sm:text-[46px] lg:text-[52px]',
    gap: 'gap-5 sm:gap-6',
    caption: 'text-xs sm:text-sm',
    rule: 'w-20 sm:w-24',
  },
}

export default function CareSphereLogo({
  variant = 'light',
  size = 'md',
  layout = 'stack',
  showName = true,
  caption,
  className = '',
}) {
  const isDark = variant === 'dark'
  const isRow = layout === 'row'
  const s = SIZES[size] || SIZES.md
  const textPrimary = isDark ? 'text-white' : 'text-navy'

  const mark = (
    <span className={`${s.mark} shrink-0`}>
      <CareSphereMark className="w-full h-full" tone="solid" />
    </span>
  )

  const title = showName ? (
    <div className="text-center">
      <p className={`font-sans ${s.word} leading-none whitespace-nowrap ${textPrimary}`}>
        <span className="font-medium tracking-[0.02em]">Care</span>
        <span className="font-bold tracking-[0.01em]">Sphere</span>
      </p>
      {!isRow ? (
        <span
          className={`block mx-auto mt-2.5 h-[2px] rounded-full bg-gradient-to-r from-transparent via-teal to-transparent ${s.rule}`}
          aria-hidden="true"
        />
      ) : null}
    </div>
  ) : null

  const tagline = caption ? (
    <p
      className={`${s.caption} tracking-[0.16em] uppercase font-medium text-center ${
        isDark ? 'text-white/45' : 'text-body-gray'
      }`}
    >
      {caption}
    </p>
  ) : null

  return (
    <div
      className={`inline-flex ${
        isRow ? `flex-row items-center ${s.gap}` : `flex-col items-center ${s.gap}`
      } ${className}`}
      aria-label="CareSphere"
    >
      {mark}
      {title}
      {tagline}
    </div>
  )
}
