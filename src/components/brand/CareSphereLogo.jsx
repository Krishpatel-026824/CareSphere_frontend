import CareSphereMark from './CareSphereMark'

const SIZES = {
  sm: {
    mark: 'w-9 h-9',
    name: 'text-[17px]',
    caption: 'text-[9px]',
    stackGap: 'mt-2',
    rowGap: 'gap-2.5',
  },
  md: {
    mark: 'w-11 h-11',
    name: 'text-[20px]',
    caption: 'text-[10px]',
    stackGap: 'mt-2.5',
    rowGap: 'gap-3',
  },
  lg: {
    mark: 'w-14 h-14',
    name: 'text-[24px]',
    caption: 'text-[11px]',
    stackGap: 'mt-3',
    rowGap: 'gap-3',
  },
  xl: {
    mark: 'w-[88px] h-[88px] sm:w-28 sm:h-28',
    name: 'text-[34px] sm:text-5xl',
    caption: 'text-xs sm:text-sm',
    stackGap: 'mt-4 sm:mt-5',
    rowGap: 'gap-4',
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

  return (
    <div
      className={`${
        isRow ? `flex items-center ${s.rowGap} text-left` : 'flex flex-col items-center text-center'
      } ${className}`}
    >
      <span className={`${s.mark} shrink-0`}>
        <CareSphereMark className="w-full h-full" tone="solid" />
      </span>

      {showName || caption ? (
        <div className={isRow ? 'min-w-0' : undefined}>
          {showName ? (
            <p
              className={`font-display ${s.name} font-bold tracking-[-0.03em] leading-none ${
                !isRow ? s.stackGap : ''
              } ${isDark ? 'text-white' : 'text-navy'}`}
            >
              Care<span className={isDark ? 'text-teal-light' : 'text-teal'}>Sphere</span>
            </p>
          ) : null}
          {caption ? (
            <p
              className={`${showName ? 'mt-1.5' : ''} ${s.caption} tracking-[0.16em] uppercase font-semibold ${
                isDark ? 'text-white/55' : 'text-body-gray'
              }`}
            >
              {caption}
            </p>
          ) : null}
        </div>
      ) : null}
    </div>
  )
}
