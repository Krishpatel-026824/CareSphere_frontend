import AppleIcon from './AppleIcon'
import GoogleIcon from './GoogleIcon'

export default function SocialAuthRow({ onGoogle, onApple }) {
  return (
    <>
      <div className="flex items-center gap-2 sm:gap-3 my-4 sm:my-5">
        <span className="flex-1 h-px bg-[#E5E7EB]" />
        <span className="text-[11px] sm:text-xs text-body-gray whitespace-nowrap">or continue with</span>
        <span className="flex-1 h-px bg-[#E5E7EB]" />
      </div>

      <div className="grid grid-cols-2 gap-2 sm:gap-3">
        <button
          type="button"
          onClick={onGoogle}
          className="inline-flex items-center justify-center gap-1.5 sm:gap-2 min-h-[44px] sm:min-h-[46px] rounded-xl border border-[#E5E7EB] bg-white text-[12px] sm:text-[13px] font-semibold text-navy cursor-pointer hover:bg-bg-gray"
        >
          <GoogleIcon />
          <span className="truncate">Google</span>
        </button>
        <button
          type="button"
          onClick={onApple}
          className="inline-flex items-center justify-center gap-1.5 sm:gap-2 min-h-[44px] sm:min-h-[46px] rounded-xl border border-[#E5E7EB] bg-white text-[12px] sm:text-[13px] font-semibold text-navy cursor-pointer hover:bg-bg-gray"
        >
          <AppleIcon />
          <span className="truncate">Apple</span>
        </button>
      </div>
    </>
  )
}
