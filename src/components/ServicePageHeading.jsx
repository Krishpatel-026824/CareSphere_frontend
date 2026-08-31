export default function ServicePageHeading({ icon: Icon, tone, title, subtitle, className = 'mt-3' }) {
  return (
    <div className={`flex flex-col gap-2 ${className}`}>
      <div className="flex items-center gap-3.5 min-w-0">
        <div className={`w-14 h-14 rounded-2xl flex items-center justify-center shrink-0 ${tone}`}>
          {Icon ? <Icon className="w-7 h-7" strokeWidth={1.75} /> : null}
        </div>
        <h1 className="font-display text-[32px] sm:text-[36px] font-bold text-navy tracking-tight leading-none min-w-0">
          {title}
        </h1>
      </div>
      {subtitle ? <p className="text-sm text-body-gray leading-snug">{subtitle}</p> : null}
    </div>
  )
}
