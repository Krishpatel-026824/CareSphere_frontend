import CareSphereLogo from '../brand/CareSphereLogo'

export default function AuthBrandMark({ compact = false, caption = 'Health Dashboard' }) {
  return (
    <div className="w-full flex justify-center">
      <CareSphereLogo
        variant="light"
        size={compact ? 'sm' : 'md'}
        caption={caption}
        className="animate-brand-pulse-wrap"
      />
    </div>
  )
}
