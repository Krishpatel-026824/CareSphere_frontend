import { useState } from 'react'
import { Eye, EyeOff, Heart, Lock, Mail } from 'lucide-react'
import Button from '../../components/Button'

function GoogleIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 18 18" aria-hidden="true">
      <path fill="#4285F4" d="M17.64 9.2c0-.637-.057-1.251-.164-1.84H9v3.481h4.844a4.14 4.14 0 0 1-1.796 2.716v2.259h2.908c1.702-1.567 2.684-3.875 2.684-6.615Z" />
      <path fill="#34A853" d="M9 18c2.43 0 4.467-.806 5.956-2.184l-2.908-2.259c-.806.54-1.837.86-3.048.86-2.344 0-4.328-1.584-5.036-3.711H.957v2.332A8.997 8.997 0 0 0 9 18Z" />
      <path fill="#FBBC05" d="M3.964 10.706A5.41 5.41 0 0 1 3.682 9c0-.593.102-1.17.282-1.706V4.962H.957A8.996 8.996 0 0 0 0 9c0 1.452.348 2.827.957 4.038l3.007-2.332Z" />
      <path fill="#EA4335" d="M9 3.58c1.321 0 2.508.454 3.44 1.345l2.582-2.58C13.463.891 11.426 0 9 0A8.997 8.997 0 0 0 .957 4.962L3.964 7.294C4.672 5.163 6.656 3.58 9 3.58Z" />
    </svg>
  )
}

function AppleIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M16.365 1.43c0 1.14-.42 2.2-1.24 3.02-.9.9-2.05 1.42-3.22 1.33-.09-1.2.4-2.4 1.2-3.24.9-.94 2.2-1.5 3.26-1.56ZM20.7 17.4c-.55 1.26-.82 1.82-1.54 2.94-.99 1.5-2.39 3.37-4.13 3.39-1.55.02-1.95-1.02-4.06-1.01-2.1.01-2.55 1.03-4.1 1.01-1.74-.02-3.07-1.7-4.06-3.2C.58 17.5-.64 12.6 1.5 9.28c1.05-1.63 2.7-2.66 4.55-2.69 1.69-.03 3.29 1.14 4.06 1.14.77 0 2.62-1.41 4.42-1.2.75.03 2.86.3 4.21 2.28-3.68 2.02-3.09 7.28.96 8.59Z" />
    </svg>
  )
}

export default function Login({ onLogin, onSignUp, onForgotPassword }) {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)

  return (
    <div
      style={{
        minHeight: '100vh',
        minHeight: '100dvh',
        width: '100%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 'max(16px, env(safe-area-inset-top)) max(16px, env(safe-area-inset-right)) max(16px, env(safe-area-inset-bottom)) max(16px, env(safe-area-inset-left))',
        boxSizing: 'border-box',
        position: 'relative',
        overflow: 'auto',
        background: 'linear-gradient(145deg, #071A2F 0%, #0A3D45 52%, #0EA5A0 140%)',
      }}
    >
      {/* Soft atmosphere — fills the page behind the card */}
      <div
        aria-hidden="true"
        style={{
          position: 'absolute',
          inset: 0,
          pointerEvents: 'none',
          background:
            'radial-gradient(ellipse 70% 50% at 50% 40%, rgba(14,165,160,0.28), transparent 70%)',
        }}
      />

      <div
        className="animate-login-rise"
        style={{
          position: 'relative',
          zIndex: 1,
          width: '100%',
          maxWidth: 440,
          margin: '0 auto',
          background: '#FFFFFF',
          borderRadius: 20,
          boxShadow: '0 24px 60px rgba(7, 26, 47, 0.35)',
          overflow: 'hidden',
        }}
      >
        <div style={{ height: 4, background: 'linear-gradient(90deg, #0EA5A0, #0B857C, #071A2F)' }} />

        <div style={{ padding: 'clamp(24px, 5vw, 36px) clamp(18px, 4vw, 32px) clamp(24px, 4vw, 32px)' }}>
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginBottom: 28 }}>
            <div
              style={{
                width: 52,
                height: 52,
                borderRadius: '50%',
                background: '#0EA5A0',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                boxShadow: '0 8px 24px rgba(14,165,160,0.35)',
              }}
            >
              <Heart className="text-white" style={{ width: 22, height: 22 }} strokeWidth={1.6} />
            </div>
            <p
              className="font-display"
              style={{ marginTop: 14, fontSize: 22, fontWeight: 700, color: '#071A2F', letterSpacing: '-0.02em' }}
            >
              CareSphere
            </p>
            <p style={{ marginTop: 6, fontSize: 10, letterSpacing: '0.22em', textTransform: 'uppercase', color: '#0EA5A0', fontWeight: 600 }}>
              Health Dashboard
            </p>
          </div>

          <header style={{ marginBottom: 24, textAlign: 'center' }}>
            <h1
              className="font-display"
              style={{ fontSize: 28, fontWeight: 700, color: '#071A2F', lineHeight: 1.2, letterSpacing: '-0.02em' }}
            >
              Welcome back
            </h1>
            <p style={{ marginTop: 8, fontSize: 14, color: '#3D4A5C' }}>Sign in to continue your health journey</p>
          </header>

          <form
            onSubmit={(e) => {
              e.preventDefault()
              onLogin()
            }}
            style={{ display: 'flex', flexDirection: 'column', gap: 16 }}
          >
            <div>
              <label htmlFor="login-email" style={{ display: 'block', marginBottom: 6, fontSize: 13, fontWeight: 500, color: '#071A2F' }}>
                Email or mobile
              </label>
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 12,
                  minHeight: 50,
                  padding: '0 14px',
                  borderRadius: 12,
                  border: '1px solid #D0D9E3',
                  background: '#F3F7FA',
                }}
              >
                <Mail style={{ width: 18, height: 18, flexShrink: 0, color: '#3D4A5C' }} strokeWidth={1.75} />
                <input
                  id="login-email"
                  type="text"
                  placeholder="Enter email or mobile number"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  autoComplete="username"
                  style={{
                    flex: 1,
                    minWidth: 0,
                    border: 'none',
                    outline: 'none',
                    background: 'transparent',
                    fontSize: 14,
                    color: '#071A2F',
                    fontFamily: 'inherit',
                  }}
                />
              </div>
            </div>

            <div>
              <label htmlFor="login-password" style={{ display: 'block', marginBottom: 6, fontSize: 13, fontWeight: 500, color: '#071A2F' }}>
                Password
              </label>
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 12,
                  minHeight: 50,
                  padding: '0 14px',
                  borderRadius: 12,
                  border: '1px solid #D0D9E3',
                  background: '#F3F7FA',
                }}
              >
                <Lock style={{ width: 18, height: 18, flexShrink: 0, color: '#3D4A5C' }} strokeWidth={1.75} />
                <input
                  id="login-password"
                  type={showPassword ? 'text' : 'password'}
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  autoComplete="current-password"
                  style={{
                    flex: 1,
                    minWidth: 0,
                    border: 'none',
                    outline: 'none',
                    background: 'transparent',
                    fontSize: 14,
                    color: '#071A2F',
                    fontFamily: 'inherit',
                  }}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((v) => !v)}
                  aria-label={showPassword ? 'Hide password' : 'Show password'}
                  style={{
                    border: 'none',
                    background: 'transparent',
                    padding: 4,
                    cursor: 'pointer',
                    color: '#3D4A5C',
                    display: 'flex',
                  }}
                >
                  {showPassword ? <EyeOff style={{ width: 18, height: 18 }} strokeWidth={1.75} /> : <Eye style={{ width: 18, height: 18 }} strokeWidth={1.75} />}
                </button>
              </div>
            </div>

            <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
              <button
                type="button"
                onClick={onForgotPassword}
                style={{
                  border: 'none',
                  background: 'transparent',
                  color: '#0EA5A0',
                  fontSize: 13,
                  fontWeight: 600,
                  cursor: 'pointer',
                  fontFamily: 'inherit',
                }}
              >
                Forgot password?
              </button>
            </div>

            <Button type="submit" className="min-h-[50px] text-[15px]">
              Sign In
            </Button>
          </form>

          <div style={{ display: 'flex', alignItems: 'center', gap: 12, margin: '22px 0' }}>
            <span style={{ flex: 1, height: 1, background: '#D0D9E3' }} />
            <span style={{ fontSize: 12, color: '#3D4A5C' }}>or continue with</span>
            <span style={{ flex: 1, height: 1, background: '#D0D9E3' }} />
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
            <button
              type="button"
              onClick={onLogin}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: 8,
                minHeight: 46,
                borderRadius: 12,
                border: '1px solid #D0D9E3',
                background: '#FFFFFF',
                fontSize: 13,
                fontWeight: 600,
                color: '#071A2F',
                cursor: 'pointer',
                fontFamily: 'inherit',
              }}
            >
              <GoogleIcon />
              Google
            </button>
            <button
              type="button"
              onClick={onLogin}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: 8,
                minHeight: 46,
                borderRadius: 12,
                border: '1px solid #D0D9E3',
                background: '#FFFFFF',
                fontSize: 13,
                fontWeight: 600,
                color: '#071A2F',
                cursor: 'pointer',
                fontFamily: 'inherit',
              }}
            >
              <AppleIcon />
              Apple
            </button>
          </div>

          <p style={{ marginTop: 24, textAlign: 'center', fontSize: 14, color: '#3D4A5C' }}>
            Don&apos;t have an account?{' '}
            <button
              type="button"
              onClick={onSignUp}
              style={{
                border: 'none',
                background: 'transparent',
                color: '#0EA5A0',
                fontWeight: 600,
                cursor: 'pointer',
                fontFamily: 'inherit',
                fontSize: 14,
              }}
            >
              Sign Up
            </button>
          </p>
        </div>
      </div>
    </div>
  )
}
