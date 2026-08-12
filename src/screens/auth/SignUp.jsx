import { useState } from 'react'
import { Eye, EyeOff, Mail, Lock, User, Phone } from 'lucide-react'
import Button from '../../components/Button'
import AuthLayout from '../../components/AuthLayout'

export default function SignUp({ onBack, onSignUp }) {
  const [form, setForm] = useState({ name: '', email: '', phone: '', password: '', confirmPassword: '' })
  const [showPassword, setShowPassword] = useState(false)
  const [agreed, setAgreed] = useState(false)

  const update = (key, val) => setForm({ ...form, [key]: val })

  const fields = [
    { key: 'name', label: 'Full Name', icon: User, type: 'text', placeholder: 'Enter your full name' },
    { key: 'email', label: 'Email', icon: Mail, type: 'email', placeholder: 'Enter your email' },
    { key: 'phone', label: 'Phone Number', icon: Phone, type: 'tel', placeholder: 'Enter your phone number' },
    { key: 'password', label: 'Password', icon: Lock, type: 'password', placeholder: 'Create a password' },
    { key: 'confirmPassword', label: 'Confirm Password', icon: Lock, type: 'password', placeholder: 'Confirm your password' },
  ]

  return (
    <AuthLayout
      title="Create Account"
      subtitle="Join CareSphere and take control of your health"
      onBack={onBack}
    >
      <div className="space-y-4">
        {fields.map(({ key, label, icon: Icon, type, placeholder }) => (
          <div key={key}>
            <label className="text-sm font-medium text-navy mb-1.5 block">{label}</label>
            <div className="flex items-center border border-border-gray rounded-xl px-4 py-3 focus-within:border-teal transition-colors">
              <Icon className="w-4 h-4 text-body-gray mr-3 shrink-0" />
              <input
                type={type === 'password' ? (showPassword ? 'text' : 'password') : type}
                placeholder={placeholder}
                value={form[key]}
                onChange={(e) => update(key, e.target.value)}
                className="flex-1 outline-none text-sm text-navy placeholder:text-body-gray/50 bg-transparent"
              />
              {type === 'password' && key === 'password' && (
                <button type="button" onClick={() => setShowPassword(!showPassword)} className="ml-2 cursor-pointer">
                  {showPassword ? <EyeOff className="w-4 h-4 text-body-gray" /> : <Eye className="w-4 h-4 text-body-gray" />}
                </button>
              )}
            </div>
          </div>
        ))}

        <label className="flex items-start gap-2 mt-2 cursor-pointer">
          <input type="checkbox" checked={agreed} onChange={(e) => setAgreed(e.target.checked)} className="mt-1 accent-teal" />
          <span className="text-xs text-body-gray">
            I agree to the <span className="text-teal font-medium">Terms of Service</span> and <span className="text-teal font-medium">Privacy Policy</span>
          </span>
        </label>

        <div className="pt-2 space-y-3">
          <Button onClick={onSignUp} disabled={!agreed}>Create Account</Button>
          <p className="text-center text-sm text-body-gray">
            Already have an account?{' '}
            <button onClick={onBack} className="text-teal font-semibold cursor-pointer">Sign In</button>
          </p>
        </div>
      </div>
    </AuthLayout>
  )
}
