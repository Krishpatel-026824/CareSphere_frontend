import { Heart, PencilLine } from 'lucide-react'

export default function ProfileHeader({ onEdit, isEditing }) {
  return (
    <header className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
      <div className="flex items-center gap-3.5 min-w-0">
        <div className="w-12 h-12 rounded-2xl bg-teal text-white flex items-center justify-center shrink-0">
          <Heart className="w-6 h-6 fill-white" strokeWidth={1.5} />
        </div>
        <div className="min-w-0">
          <p className="text-[11px] font-semibold tracking-[0.18em] uppercase text-teal">CareSphere</p>
          <h1 className="text-[26px] sm:text-[30px] lg:text-[32px] font-bold text-navy tracking-tight leading-none mt-1">
            Profile
          </h1>
          <p className="text-sm text-body-gray mt-1.5">Your account and care preferences</p>
        </div>
      </div>

      <button
        type="button"
        onClick={onEdit}
        disabled={isEditing}
        className="inline-flex items-center justify-center gap-2 self-start min-h-11 px-5 rounded-full bg-teal text-white text-sm font-semibold cursor-pointer hover:bg-teal-dark disabled:opacity-50 disabled:cursor-not-allowed shrink-0"
      >
        <PencilLine className="w-4 h-4" strokeWidth={2} />
        Edit profile
      </button>
    </header>
  )
}
