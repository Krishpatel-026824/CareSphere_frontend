export default function SidebarFooterCard({ children, onClick }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="group w-full rounded-xl border border-[#3F3F3F] p-2 flex items-center gap-3 text-left cursor-pointer hover:bg-white/[0.04] transition-colors duration-200"
    >
      {children}
    </button>
  )
}
