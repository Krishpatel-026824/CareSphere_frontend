import { ArrowLeft } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import { PATHS } from '../routes/paths'

export default function BackHomeButton({ onClick, to = PATHS.home, iconOnly = false }) {
  const navigate = useNavigate()

  function handleClick() {
    if (onClick) {
      onClick()
      return
    }
    navigate(to)
  }

  return (
    <button
      type="button"
      onClick={handleClick}
      aria-label="Back to Home"
      className={
        iconOnly
          ? 'w-10 h-10 rounded-xl border border-border-gray bg-white text-navy inline-flex items-center justify-center cursor-pointer hover:border-teal hover:text-teal shrink-0'
          : 'inline-flex items-center gap-2 text-sm font-semibold text-teal cursor-pointer hover:opacity-70 w-fit'
      }
    >
      <ArrowLeft className={iconOnly ? 'w-5 h-5' : 'w-4 h-4'} strokeWidth={1.75} />
      {iconOnly ? null : 'Back to Home'}
    </button>
  )
}
