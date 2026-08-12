import { useState } from 'react'
import { Mail, KeyRound } from 'lucide-react'
import Button from '../../components/Button'
import AuthLayout from '../../components/AuthLayout'

export default function ForgotPassword({ onBack, onSubmit }) {
  const [email, setEmail] = useState('')
  const [sent, setSent] = useState(false)

  const handleSubmit = () => {
    setSent(true)
    setTimeout(() => onSubmit?.(), 2000)
  }

  if (sent) {
    return (
      <AuthLayout title="Check Your Email" subtitle="We've sent you a password reset link" onBack={onBack}>
        <div className="text-center">
          <div className="w-20 h-20 bg-teal-light rounded-full flex items-center justify-center mb-6 mx-auto">
            <KeyRound className="w-10 h-10 text-teal" />
          </div>
          <p className="text-body-gray text-sm leading-relaxed mb-8">
            We've sent a password reset link to <span className="font-semibold text-navy">{email}</span>. Please check your inbox.
          </p>
          <Button onClick={onBack}>Back to Login</Button>
        </div>
      </AuthLayout>
    )
  }

  return (
    <AuthLayout title="Forgot Password" subtitle="Enter your email to receive a reset link" onBack={onBack}>
      <div className="w-16 h-16 bg-teal-light rounded-full flex items-center justify-center mx-auto mb-8">
        <Mail className="w-8 h-8 text-teal" />
      </div>

      <div className="mb-8">
        <label className="text-sm font-medium text-navy mb-1.5 block">Email Address</label>
        <div className="flex items-center border border-border-gray rounded-xl px-4 py-3.5 focus-within:border-teal transition-colors">
          <Mail className="w-4 h-4 text-body-gray mr-3" />
          <input
            type="email"
            placeholder="Enter your registered email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="flex-1 outline-none text-sm text-navy placeholder:text-body-gray/50 bg-transparent"
          />
        </div>
      </div>

      <Button onClick={handleSubmit}>Send Reset Link</Button>

      <p className="text-center text-sm text-body-gray mt-6">
        Remember your password?{' '}
        <button onClick={onBack} className="text-teal font-semibold cursor-pointer">Sign In</button>
      </p>
    </AuthLayout>
  )
}
