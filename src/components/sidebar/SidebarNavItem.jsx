export default function SidebarNavItem({ tab, isActive, badge = 0, onSelect }) {
  const Icon = tab.icon

  return (
    <button
      type="button"
      onClick={() => onSelect(tab.id)}
      className={[
        'flex w-full items-center gap-3 rounded-[10px] cursor-pointer transition-colors',
        'h-10 px-[15px]',
        isActive ? 'bg-[#36393F] text-white' : 'text-white hover:bg-[#36393F]/60',
      ].join(' ')}
    >
      <Icon className="w-5 h-5 shrink-0" strokeWidth={1.75} />
      <span className="flex-1 text-left text-[15px] truncate font-normal leading-none">{tab.label}</span>
      {badge > 0 ? (
        <span className="min-w-[18px] h-[18px] px-1 rounded-full bg-[#F97316] text-white text-[10px] font-bold flex items-center justify-center shrink-0">
          {badge}
        </span>
      ) : null}
    </button>
  )
}
