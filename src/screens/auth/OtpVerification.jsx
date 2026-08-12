import { useState, useRef } from 'react'
import { ShieldCheck } from 'lucide-react'
import Button from '../../components/Button'
import AuthLayout from '../../components/AuthLayout'

export default function OtpVerification({ onBack, onVerify, email = 'user@example.com' }) {
  const [otp, setOtp] = useState(['', '', '', '', '', ''])
  const refs = useRef([])

  const handleChange = (index, value) => {
    if (!/^\d*$/.test(value)) return
    const next = [...otp]
    next[index] = value.slice(-1)
    setOtp(next)
    if (value && index < 5) refs.current[index + 1]?.focus()
  }

  const handleKeyDown = (index, e) => {
    if (e.key === 'Backspace' && !otp[index] && index > 0) {
      refs.current[index - 1]?.focus()
    }
  }

  return (
    <AuthLayout title="Verify Your Email" subtitle={`Enter the 6-digit code sent to ${email}`} onBack={onBack}>
      <div className="flex flex-col items-center">
        <div className="w-16 h-16 bg-teal-light rounded-full flex items-center justify-center mb-8">
          <ShieldCheck className="w-8 h-8 text-teal" />
        </div>

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
              className="w-11 h-12 sm:w-12 sm:h-14 text-center text-xl font-bold border-2 border-border-gray rounded-xl focus:border-teal outline-none text-navy"
            />
          ))}
        </div>

        <div className="w-full">
          <Button onClick={onVerify}>Verify & Continue</Button>
        </div>

        <p className="text-sm text-body-gray mt-6">
          Didn't receive the code?{' '}
          <button className="text-teal font-semibold cursor-pointer">Resend Code</button>
        </p>
      </div>
    </AuthLayout>
  )
}
