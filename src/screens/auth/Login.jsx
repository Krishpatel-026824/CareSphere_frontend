import { useState } from 'react'
import { Lock, Mail } from 'lucide-react'
import AuthBrandMark from '../../components/auth/AuthBrandMark'
import AuthCardLayout from '../../components/auth/AuthCardLayout'
import AuthInput from '../../components/auth/AuthInput'
import RoleToggle from '../../components/auth/RoleToggle'
import SocialAuthRow from '../../components/auth/SocialAuthRow'
import Button from '../../components/Button'
import { generateAuthSession } from '../../data/generators/authSessionGenerator'
import { AUTH_ROLE_DOCTOR, AUTH_ROLE_PATIENT, authRoleOptions } from '../../data/mocks/authRoles'

export default function Login({ onLogin, onSignUp, onForgotPassword }) {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [roleType, setRoleType] = useState(AUTH_ROLE_PATIENT)
  const isDoctor = roleType === AUTH_ROLE_DOCTOR

  function submitLogin() {
    onLogin(generateAuthSession(roleType, { email }))
  }

  return (
    <AuthCardLayout>
      <div className="animate-login-rise">
        <AuthBrandMark caption={isDoctor ? 'Clinic Workspace' : 'Health Dashboard'} />
      </div>

      <header className="mt-4 sm:mt-5 mb-4 sm:mb-5 text-center animate-login-rise-delay-1">
        <h1 className="font-display text-[24px] sm:text-[28px] font-bold text-navy leading-tight tracking-tight">
          Welcome back
        </h1>
        <p className="mt-1.5 text-[12px] sm:text-[13px] text-body-gray leading-snug px-1">
          {isDoctor
            ? 'Sign in to manage visits, patients, and clinic tools'
            : 'Sign in to continue your CareSphere health journey'}
        </p>
      </header>

      <div className="mb-4 animate-login-rise-delay-2">
        <p className="text-[11px] font-bold uppercase tracking-[0.12em] text-body-gray mb-2 px-0.5">
          Sign in as
        </p>
        <RoleToggle value={roleType} options={authRoleOptions} onChange={setRoleType} />
      </div>

      <form
        onSubmit={(e) => {
          e.preventDefault()
          submitLogin()
        }}
        className="flex flex-col gap-3.5 animate-login-rise-delay-3"
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

        <div className="flex justify-end -mt-1">
          <button
            type="button"
            onClick={onForgotPassword}
            className="border-none bg-transparent text-teal text-[13px] font-semibold cursor-pointer hover:opacity-80"
          >
            Forgot password?
          </button>
        </div>

        <Button type="submit" className="min-h-[48px] text-[15px] shadow-[0_10px_20px_-10px_rgba(14,165,160,0.65)]">
          Sign In
        </Button>
      </form>

      <div className="animate-login-rise-delay-4">
        <SocialAuthRow onGoogle={submitLogin} onApple={submitLogin} />

        {isDoctor ? (
          <p className="mt-5 text-center text-[12px] text-body-gray">
            Clinic access for CareSphere doctors and care teams.
          </p>
        ) : (
          <p className="mt-5 text-center text-sm text-body-gray">
            Don&apos;t have an account?{' '}
            <button
              type="button"
              onClick={onSignUp}
              className="border-none bg-transparent text-teal font-semibold cursor-pointer text-sm hover:opacity-80"
            >
              Sign Up
            </button>
          </p>
        )}
      </div>
    </AuthCardLayout>
  )
}
