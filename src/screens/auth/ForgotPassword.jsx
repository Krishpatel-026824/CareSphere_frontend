import { useState } from 'react'
import { KeyRound, Mail } from 'lucide-react'
import AuthBrandMark from '../../components/auth/AuthBrandMark'
import AuthCardLayout from '../../components/auth/AuthCardLayout'
import AuthInput from '../../components/auth/AuthInput'
import Button from '../../components/Button'

export default function ForgotPassword({ onBack, onSubmit }) {
  const [email, setEmail] = useState('')
  const [sent, setSent] = useState(false)

  function handleSubmit(e) {
    e.preventDefault()
    setSent(true)
    setTimeout(() => onSubmit?.(), 2000)
  }

  return (
    <AuthCardLayout>
      <AuthBrandMark />

      {sent ? (
        <div className="mt-7 text-center">
          <div className="w-16 h-16 bg-teal-light rounded-full flex items-center justify-center mb-5 mx-auto">
            <KeyRound className="w-8 h-8 text-teal" strokeWidth={1.75} />
          </div>
          <h1 className="font-display text-[28px] font-bold text-navy leading-tight tracking-tight">Check your email</h1>
          <p className="mt-2 text-sm text-body-gray leading-relaxed">
            We&apos;ve sent a password reset link to <span className="font-semibold text-navy">{email}</span>.
          </p>
          <div className="mt-8">
            <Button onClick={onBack} className="min-h-[50px] text-[15px]">
              Back to Login
            </Button>
          </div>
        </div>
      ) : (
        <>
          <header className="mt-7 mb-6 text-center">
            <h1 className="font-display text-[28px] font-bold text-navy leading-tight tracking-tight">Forgot password</h1>
            <p className="mt-2 text-sm text-body-gray">Enter your email to receive a reset link</p>
          </header>

          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <AuthInput
              id="forgot-email"
              label="Email Address"
              icon={Mail}
              type="email"
              placeholder="Enter your registered email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              autoComplete="email"
            />
            <Button type="submit" className="min-h-[50px] text-[15px] mt-1">
              Send Reset Link
            </Button>
          </form>

          <p className="mt-6 text-center text-sm text-body-gray">
            Remember your password?{' '}
            <button type="button" onClick={onBack} className="text-teal font-semibold cursor-pointer hover:opacity-80">
              Sign In
            </button>
          </p>
        </>
      )}
    </AuthCardLayout>
  )
}
