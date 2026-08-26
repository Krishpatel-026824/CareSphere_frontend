export default function SidebarQuickActions({ actions = [], activeKey = '', onActionClick }) {
  if (!actions.length) return null

  return (
    <>
      {actions.map((action) => {
        const Icon = action.icon
        const isActive = activeKey === action.key
        return (
          <button
            key={action.id}
            type="button"
            onClick={() => onActionClick?.(action.key)}
            className={[
              'flex w-full items-center gap-3 rounded-[10px] cursor-pointer transition-colors',
              'h-10 px-[15px]',
              isActive
                ? 'bg-[#36393F] text-white shadow-[inset_3px_0_0_0_#0EA5A0]'
                : 'text-white hover:bg-[#36393F]/60',
            ].join(' ')}
          >
            {Icon ? (
              <Icon
                className={`w-5 h-5 shrink-0 ${isActive ? 'text-teal' : ''}`}
                strokeWidth={isActive ? 2 : 1.75}
              />
            ) : null}
            <span
              className={`flex-1 text-left text-[15px] truncate leading-none ${
                isActive ? 'font-semibold' : 'font-normal'
              }`}
            >
              {action.label}
            </span>
          </button>
        )
      })}
    </>
  )
}
