import { useRef, useState } from 'react'
import { ShieldCheck } from 'lucide-react'
import AuthBrandMark from '../../components/auth/AuthBrandMark'
import AuthCardLayout from '../../components/auth/AuthCardLayout'
import Button from '../../components/Button'

export default function OtpVerification({ onBack, onVerify, email = 'user@example.com' }) {
  const [otp, setOtp] = useState(['', '', '', '', '', ''])
  const refs = useRef([])

  function handleChange(index, value) {
    if (!/^\d*$/.test(value)) return
    const next = [...otp]
    next[index] = value.slice(-1)
    setOtp(next)
    if (value && index < 5) refs.current[index + 1]?.focus()
  }

  function handleKeyDown(index, e) {
    if (e.key === 'Backspace' && !otp[index] && index > 0) {
      refs.current[index - 1]?.focus()
    }
  }

  return (
    <AuthCardLayout>
      <AuthBrandMark />

      <header className="mt-7 mb-6 text-center">
        <div className="w-14 h-14 bg-teal-light rounded-full flex items-center justify-center mb-4 mx-auto">
          <ShieldCheck className="w-7 h-7 text-teal" strokeWidth={1.75} />
        </div>
        <h1 className="font-display text-[28px] font-bold text-navy leading-tight tracking-tight">Verify your email</h1>
        <p className="mt-2 text-sm text-body-gray">Enter the 6-digit code sent to {email}</p>
      </header>

      <form
        onSubmit={(e) => {
          e.preventDefault()
          onVerify()
        }}
        className="flex flex-col items-center"
      >
        <div className="flex gap-2 sm:gap-3 mb-8">
          {otp.map((digit, i) => (
            <input
              key={i}
              ref={(el) => (refs.current[i] = el)}
              type="text"
              inputMode="numeric"
              maxLength={1}
              value={digit}
              onChange={(e) => handleChange(i, e.target.value)}
              onKeyDown={(e) => handleKeyDown(i, e)}
              className="w-11 h-12 sm:w-12 sm:h-14 text-center text-xl font-bold border border-[#E5E7EB] rounded-xl focus:border-teal outline-none text-navy bg-white"
            />
          ))}
        </div>

        <Button type="submit" className="min-h-[50px] text-[15px]">
          Verify & Continue
        </Button>
      </form>

      <p className="text-sm text-body-gray mt-6 text-center">
        Didn&apos;t receive the code?{' '}
        <button type="button" className="text-teal font-semibold cursor-pointer hover:opacity-80">
          Resend Code
        </button>
      </p>
      <p className="text-sm text-body-gray mt-3 text-center">
        <button type="button" onClick={onBack} className="text-teal font-semibold cursor-pointer hover:opacity-80">
          ← Back
        </button>
      </p>
    </AuthCardLayout>
  )
}
