export default function SidebarNavItem({ tab, isActive, badge = 0, onSelect }) {
  const Icon = tab.icon

  return (
    <button
      type="button"
      onClick={() => onSelect(tab.id)}
      className={[
        'flex w-full items-center gap-3 rounded-[10px] cursor-pointer transition-colors',
        'h-10 px-[15px]',
        isActive
          ? 'bg-[#36393F] text-white shadow-[inset_3px_0_0_0_#0EA5A0]'
          : 'text-white/85 hover:bg-[#36393F]/60 hover:text-white',
      ].join(' ')}
    >
      <Icon
        className={`w-5 h-5 shrink-0 ${isActive ? 'text-teal' : ''}`}
        strokeWidth={isActive ? 2 : 1.75}
      />
      <span
        className={`flex-1 text-left text-[15px] truncate leading-none ${
          isActive ? 'font-semibold' : 'font-normal'
        }`}
      >
        {tab.label}
      </span>
      {badge > 0 ? (
        <span className="min-w-[18px] h-[18px] px-1 rounded-full bg-[#F97316] text-white text-[10px] font-bold flex items-center justify-center shrink-0">
          {badge}
        </span>
      ) : null}
    </button>
  )
}
