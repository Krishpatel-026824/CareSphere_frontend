import { PencilLine } from 'lucide-react'

export default function ProfileHeader({ onEdit, isEditing }) {
  return (
    <header className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
      <div className="min-w-0">
        <p className="text-[11px] font-bold tracking-[0.2em] uppercase text-teal">CareSphere</p>
        <h1 className="text-[28px] sm:text-[32px] font-bold text-navy tracking-tight leading-none mt-1.5">
          Profile
        </h1>
        <p className="text-sm text-body-gray mt-2">Manage your account and care preferences</p>
      </div>

      <button
        type="button"
        onClick={onEdit}
        disabled={isEditing}
        className="inline-flex items-center justify-center gap-2 self-start min-h-11 px-5 rounded-full bg-teal text-white text-sm font-semibold cursor-pointer hover:bg-teal/90 disabled:opacity-50 disabled:cursor-not-allowed shrink-0 transition-all shadow-md shadow-teal/20"
      >
        <PencilLine className="w-4 h-4" strokeWidth={2} />
        Edit profile
      </button>
    </header>
  )
}
