export function WaterTipIllustration() {
  return (
    <svg width="128" height="148" viewBox="0 0 110 130" fill="none" className="shrink-0 w-[128px] h-[148px]" aria-hidden="true">
      <circle cx="78" cy="68" r="42" fill="white" fillOpacity="0.08" />
      <path d="M78 18 C78 18 68 28 68 42 C68 52 72 58 78 58 C84 58 88 52 88 42 C88 28 78 18 78 18Z" fill="#60A5FA" />
      <path d="M58 62 H98 C96 108 92 118 78 118 C64 118 60 108 58 62Z" fill="white" fillOpacity="0.18" stroke="white" strokeOpacity="0.45" strokeWidth="1.5" />
      <path d="M61 72 H95 V108 C95 112 88 115 78 115 C68 115 61 112 61 108 V72Z" fill="#38BDF8" fillOpacity="0.85" />
      <circle cx="70" cy="88" r="2" fill="white" fillOpacity="0.55" />
      <circle cx="84" cy="84" r="2.2" fill="white" fillOpacity="0.5" />
      <ellipse cx="58" cy="118" rx="5" ry="2.5" fill="#4ADE80" fillOpacity="0.85" />
      <ellipse cx="96" cy="118" rx="5" ry="2.5" fill="#4ADE80" fillOpacity="0.85" />
    </svg>
  )
}

export function SleepTipIllustration() {
  return (
    <svg width="128" height="148" viewBox="0 0 110 130" fill="none" className="shrink-0 w-[128px] h-[148px]" aria-hidden="true">
      <circle cx="78" cy="68" r="42" fill="white" fillOpacity="0.08" />
      <path d="M86 38c-2 12-12 22-24 24 8 10 24 10 32 0 8-10 6-24-8-24z" fill="#C7D2FE" />
      <circle cx="58" cy="42" r="3" fill="white" fillOpacity="0.8" />
      <circle cx="96" cy="50" r="2" fill="white" fillOpacity="0.7" />
      <circle cx="90" cy="34" r="1.5" fill="white" fillOpacity="0.65" />
    </svg>
  )
}

export function WalkTipIllustration() {
  return (
    <svg width="128" height="148" viewBox="0 0 110 130" fill="none" className="shrink-0 w-[128px] h-[148px]" aria-hidden="true">
      <circle cx="78" cy="68" r="42" fill="white" fillOpacity="0.08" />
      <path d="M58 78c2-10 10-16 22-14 10 2 18 10 18 20 0 10-10 22-22 24-14 2-22-12-18-30z" fill="white" fillOpacity="0.2" />
      <path d="M62 92c8-2 28-4 34 6 2 4-2 10-10 12-12 2-24-2-28-8-2-4 0-8 4-10z" fill="#FDE68A" />
      <path d="M64 88c10-8 26-6 30 4" stroke="white" strokeOpacity="0.5" strokeWidth="2" />
    </svg>
  )
}

export function NutritionTipIllustration() {
  return (
    <svg width="128" height="148" viewBox="0 0 110 130" fill="none" className="shrink-0 w-[128px] h-[148px]" aria-hidden="true">
      <circle cx="78" cy="68" r="42" fill="white" fillOpacity="0.08" />
      <path d="M78 48c12 0 22 14 22 30 0 14-10 28-22 28s-22-14-22-28c0-16 10-30 22-30z" fill="#F87171" />
      <path d="M78 48c-4 8-2 18 6 22" stroke="#FECACA" strokeWidth="2" />
      <path d="M78 44c2-8 10-12 14-10-2 8-8 12-14 10z" fill="#4ADE80" />
    </svg>
  )
}

const illustrations = {
  water: WaterTipIllustration,
  sleep: SleepTipIllustration,
  walk: WalkTipIllustration,
  nutrition: NutritionTipIllustration,
}

export function TipIllustration({ type }) {
  const Illustration = illustrations[type] || WaterTipIllustration
  return <Illustration />
}
