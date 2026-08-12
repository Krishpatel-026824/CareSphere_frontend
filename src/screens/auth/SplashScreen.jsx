import { useEffect } from 'react'
import { Heart, Shield, Activity } from 'lucide-react'

export default function SplashScreen({ onNext }) {
  useEffect(() => {
    const timer = setTimeout(onNext, 2200)
    return () => clearTimeout(timer)
  }, [onNext])

  return (
    <div className="app-viewport w-full bg-navy flex flex-col items-center justify-center text-white relative overflow-hidden px-6">
      <div className="absolute inset-0 opacity-15 pointer-events-none" aria-hidden="true">
        <div className="absolute top-16 left-8 sm:top-20 sm:left-20 w-48 h-48 sm:w-72 sm:h-72 rounded-full bg-teal blur-3xl" />
        <div className="absolute bottom-16 right-8 sm:bottom-20 sm:right-20 w-56 h-56 sm:w-80 sm:h-80 rounded-full bg-teal blur-3xl" />
      </div>

      <div className="relative z-10 flex flex-col items-center gap-4 sm:gap-5 text-center">
        <div className="w-20 h-20 sm:w-24 sm:h-24 lg:w-28 lg:h-28 bg-teal rounded-3xl flex items-center justify-center shadow-lg shadow-teal/30">
          <Heart className="w-10 h-10 sm:w-12 sm:h-12 lg:w-14 lg:h-14 text-white" strokeWidth={1.6} />
        </div>
        <h1 className="font-display text-3xl sm:text-4xl lg:text-6xl font-bold tracking-tight">CareSphere</h1>
        <p className="text-sm sm:text-base lg:text-xl text-white/60 max-w-sm">Your Complete Health Companion</p>
      </div>

      <div className="absolute bottom-10 sm:bottom-16 flex gap-8 sm:gap-10 text-white/40">
        <Shield className="w-5 h-5 sm:w-6 sm:h-6" />
        <Activity className="w-5 h-5 sm:w-6 sm:h-6" />
        <Heart className="w-5 h-5 sm:w-6 sm:h-6" />
      </div>
    </div>
  )
}
