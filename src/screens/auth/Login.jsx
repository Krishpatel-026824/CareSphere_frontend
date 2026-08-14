import { useState } from 'react'
import { Lock, Mail } from 'lucide-react'
import AuthBrandMark from '../../components/auth/AuthBrandMark'
import AuthCardLayout from '../../components/auth/AuthCardLayout'
import AuthInput from '../../components/auth/AuthInput'
import SocialAuthRow from '../../components/auth/SocialAuthRow'
import Button from '../../components/Button'

export default function Login({ onLogin, onSignUp, onForgotPassword }) {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)

  return (
    <AuthCardLayout>
      <AuthBrandMark />

      <header className="mt-7 mb-6 text-center">
        <h1 className="font-display text-[28px] font-bold text-navy leading-tight tracking-tight">Welcome back</h1>
        <p className="mt-2 text-sm text-body-gray">Sign in to continue your health journey</p>
      </header>

      <form
        onSubmit={(e) => {
          e.preventDefault()
          onLogin({ email, name: 'Krish' })
        }}
        className="flex flex-col gap-4"
      >
        <AuthInput
          id="login-email"
          label="Email or mobile"
          icon={Mail}
          placeholder="Enter email or mobile number"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          autoComplete="username"
        />
        <AuthInput
          id="login-password"
          label="Password"
          icon={Lock}
          type="password"
          placeholder="Enter your password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          autoComplete="current-password"
          showPassword={showPassword}
          onTogglePassword={() => setShowPassword((v) => !v)}
        />

        <div className="flex justify-end">
          <button
            type="button"
            onClick={onForgotPassword}
            className="border-none bg-transparent text-teal text-[13px] font-semibold cursor-pointer hover:opacity-80"
          >
            Forgot password?
          </button>
        </div>

        <Button type="submit" className="min-h-[50px] text-[15px]">
          Sign In
        </Button>
      </form>

      <SocialAuthRow onGoogle={() => onLogin({ name: 'Krish' })} onApple={() => onLogin({ name: 'Krish' })} />

      <p className="mt-6 text-center text-sm text-body-gray">
        Don&apos;t have an account?{' '}
        <button
          type="button"
          onClick={onSignUp}
          className="border-none bg-transparent text-teal font-semibold cursor-pointer text-sm hover:opacity-80"
        >
          Sign Up
        </button>
      </p>
    </AuthCardLayout>
  )
}
