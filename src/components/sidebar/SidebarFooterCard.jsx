export default function SidebarFooterCard({ onClick, children }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="w-full flex items-center gap-3 rounded-2xl bg-[#2B2F33] hover:bg-[#32363B] px-3 py-2.5 text-left cursor-pointer transition-colors border border-white/5"
    >
      {children}
    </button>
  )
}
