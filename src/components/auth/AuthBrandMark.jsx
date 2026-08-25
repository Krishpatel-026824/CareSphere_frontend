import CareSphereLogo from '../brand/CareSphereLogo'

export default function AuthBrandMark({ compact = false, caption = 'Health Dashboard' }) {
  return (
    <CareSphereLogo
      variant="light"
      size={compact ? 'sm' : 'md'}
      caption={caption}
      className="animate-brand-pulse-wrap"
    />
  )
}
