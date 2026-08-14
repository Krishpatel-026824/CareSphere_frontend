export default function NotificationStatCard({
  label,
  count,
  sublabel,
  icon: Icon,
  iconWrap,
  iconColor,
  active,
  onClick,
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`rounded-2xl border px-5 py-5 flex items-center gap-4 text-left cursor-pointer transition-all w-full ${
        active
          ? 'bg-[#E8F6F5] border-teal/25 shadow-sm'
          : 'bg-white border-border-gray/80 shadow-[0_1px_8px_rgba(11,31,58,0.04)] hover:shadow-md'
      }`}
    >
      <div className={`w-12 h-12 rounded-xl ${iconWrap} ${iconColor} flex items-center justify-center shrink-0`}>
        <Icon className="w-[22px] h-[22px]" strokeWidth={1.75} />
      </div>
      <div className="min-w-0 flex-1">
        <p className="text-sm font-medium text-body-gray">{label}</p>
        <p className="text-[32px] font-bold text-navy leading-none mt-1">{count}</p>
        <p className="text-xs text-body-gray/80 mt-1.5">{sublabel}</p>
      </div>
    </button>
  )
}
