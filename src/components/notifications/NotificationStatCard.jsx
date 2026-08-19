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
      className={`rounded-xl border px-3.5 py-3 flex items-center gap-3 text-left cursor-pointer transition-all w-full ${
        active
          ? 'bg-[#E8F6F5] border-teal/25 shadow-sm'
          : 'bg-white border-border-gray/80 shadow-[0_1px_6px_rgba(11,31,58,0.04)] hover:shadow-md'
      }`}
    >
      <div className={`w-9 h-9 rounded-lg ${iconWrap} ${iconColor} flex items-center justify-center shrink-0`}>
        <Icon className="w-[18px] h-[18px]" strokeWidth={1.75} />
      </div>
      <div className="min-w-0 flex-1">
        <p className="text-[11px] font-medium text-body-gray">{label}</p>
        <p className="text-[22px] font-bold text-navy leading-none mt-0.5">{count}</p>
        <p className="text-[10px] text-body-gray/80 mt-1">{sublabel}</p>
      </div>
    </button>
  )
}
