import { useState } from 'react'
import { Lock, Mail, Phone, User } from 'lucide-react'
import AuthBrandMark from '../../components/auth/AuthBrandMark'
import AuthCardLayout from '../../components/auth/AuthCardLayout'
import AuthInput from '../../components/auth/AuthInput'
import Button from '../../components/Button'

export default function SignUp({ onBack, onSignUp }) {
  const [form, setForm] = useState({ name: '', email: '', phone: '', password: '', confirmPassword: '' })
  const [showPassword, setShowPassword] = useState(false)
  const [agreed, setAgreed] = useState(false)

  const update = (key, val) => setForm({ ...form, [key]: val })

  return (
    <AuthCardLayout compact>
      <button
        type="button"
        onClick={onBack}
        className="text-teal text-sm font-semibold cursor-pointer hover:opacity-80"
      >
        ← Back
      </button>

      <div className="mt-4">
        <AuthBrandMark compact />
      </div>

      <header className="mt-5 mb-5 text-center">
        <h1 className="font-display text-[26px] font-bold text-navy leading-tight tracking-tight">Create Account</h1>
        <p className="mt-1.5 text-sm text-body-gray">Join CareSphere and take control of your health</p>
      </header>

      <form
        onSubmit={(e) => {
          e.preventDefault()
          if (agreed) onSignUp()
        }}
        className="flex flex-col gap-3"
      >
        <AuthInput
          id="signup-name"
          label="Full Name"
          icon={User}
          placeholder="Enter your full name"
          value={form.name}
          onChange={(e) => update('name', e.target.value)}
          autoComplete="name"
        />
        <AuthInput
          id="signup-email"
          label="Email"
          icon={Mail}
          type="email"
          placeholder="Enter your email"
          value={form.email}
          onChange={(e) => update('email', e.target.value)}
          autoComplete="email"
        />
        <AuthInput
          id="signup-phone"
          label="Phone Number"
          icon={Phone}
          type="tel"
          placeholder="Enter your phone number"
          value={form.phone}
          onChange={(e) => update('phone', e.target.value)}
          autoComplete="tel"
        />
        <AuthInput
          id="signup-password"
          label="Password"
          icon={Lock}
          type="password"
          placeholder="Create a password"
          value={form.password}
          onChange={(e) => update('password', e.target.value)}
          autoComplete="new-password"
          showPassword={showPassword}
          onTogglePassword={() => setShowPassword((v) => !v)}
        />
        <AuthInput
          id="signup-confirm"
          label="Confirm Password"
          icon={Lock}
          type="password"
          placeholder="Confirm your password"
          value={form.confirmPassword}
          onChange={(e) => update('confirmPassword', e.target.value)}
          autoComplete="new-password"
        />

        <label className="flex items-start gap-2.5 mt-0.5 cursor-pointer">
          <input
            type="checkbox"
            checked={agreed}
            onChange={(e) => setAgreed(e.target.checked)}
            className="mt-0.5 accent-teal w-4 h-4 cursor-pointer"
          />
          <span className="text-xs text-body-gray leading-relaxed">
            I agree to the <span className="text-teal font-semibold">Terms of Service</span> and{' '}
            <span className="text-teal font-semibold">Privacy Policy</span>
          </span>
        </label>

        <Button type="submit" disabled={!agreed} className="min-h-[50px] text-[15px] mt-1">
          Create Account
        </Button>
      </form>

      <p className="mt-5 text-center text-sm text-body-gray">
        Already have an account?{' '}
        <button type="button" onClick={onBack} className="text-teal font-semibold cursor-pointer hover:opacity-80">
          Sign In
        </button>
      </p>
    </AuthCardLayout>
  )
}
