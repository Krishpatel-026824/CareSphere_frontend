import AppleIcon from './AppleIcon'
import GoogleIcon from './GoogleIcon'

export default function SocialAuthRow({ onGoogle, onApple }) {
  return (
    <>
      <div className="flex items-center gap-3 my-[22px]">
        <span className="flex-1 h-px bg-[#E5E7EB]" />
        <span className="text-xs text-body-gray">or continue with</span>
        <span className="flex-1 h-px bg-[#E5E7EB]" />
      </div>

      <div className="grid grid-cols-2 gap-3">
        <button
          type="button"
          onClick={onGoogle}
          className="inline-flex items-center justify-center gap-2 min-h-[46px] rounded-xl border border-[#E5E7EB] bg-white text-[13px] font-semibold text-navy cursor-pointer hover:bg-bg-gray"
        >
          <GoogleIcon />
          Google
        </button>
        <button
          type="button"
          onClick={onApple}
          className="inline-flex items-center justify-center gap-2 min-h-[46px] rounded-xl border border-[#E5E7EB] bg-white text-[13px] font-semibold text-navy cursor-pointer hover:bg-bg-gray"
        >
          <AppleIcon />
          Apple
        </button>
      </div>
    </>
  )
}
