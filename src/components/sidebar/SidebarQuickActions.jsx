export default function SidebarQuickActions({ actions = [], onActionClick }) {
  if (!actions.length) return null

  return (
    <>
      {actions.map((action) => {
        const Icon = action.icon
        return (
          <button
            key={action.id}
            type="button"
            onClick={() => onActionClick?.(action.key)}
            className="flex w-full items-center gap-3 rounded-[10px] cursor-pointer transition-colors h-10 px-[15px] text-white hover:bg-[#36393F]/60"
          >
            {Icon ? <Icon className="w-5 h-5 shrink-0" strokeWidth={1.75} /> : null}
            <span className="flex-1 text-left text-[15px] truncate font-normal leading-none">{action.label}</span>
          </button>
        )
      })}
    </>
  )
}
