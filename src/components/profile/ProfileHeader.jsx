import { PencilLine, UserRound } from 'lucide-react'

export default function ProfileHeader({ onEdit, isEditing }) {
  return (
    <header className="shrink-0 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
      <div className="min-w-0 flex items-center gap-3">
        <div className="w-11 h-11 sm:w-12 sm:h-12 rounded-2xl bg-teal text-white flex items-center justify-center shrink-0 shadow-sm">
          <UserRound className="w-6 h-6 sm:w-7 sm:h-7" strokeWidth={1.75} />
        </div>
        <div className="min-w-0">
          <h1 className="text-[24px] sm:text-[28px] lg:text-[32px] font-bold text-navy tracking-tight leading-none">
            Profile
          </h1>
          <p className="text-sm text-body-gray mt-1.5">Manage your account and care preferences</p>
        </div>
      </div>

      <button
        type="button"
        onClick={onEdit}
        disabled={isEditing}
        className="inline-flex items-center justify-center gap-2 self-start sm:self-auto min-h-10 sm:min-h-11 px-4 sm:px-5 rounded-full bg-teal text-white text-sm font-semibold cursor-pointer hover:bg-teal-dark disabled:opacity-50 disabled:cursor-not-allowed shrink-0 transition-colors shadow-sm"
      >
        <PencilLine className="w-4 h-4" strokeWidth={2} />
        Edit profile
      </button>
    </header>
  )
}
