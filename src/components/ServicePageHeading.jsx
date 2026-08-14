export default function ServicePageHeading({ icon: Icon, tone, title, subtitle, className = 'mt-3' }) {
  return (
    <div className={`flex items-center gap-3.5 ${className}`}>
      <div className={`w-14 h-14 rounded-2xl flex items-center justify-center shrink-0 ${tone}`}>
        {Icon ? <Icon className="w-7 h-7" strokeWidth={1.75} /> : null}
      </div>
      <div className="min-w-0">
        <h1 className="text-[32px] sm:text-[36px] font-bold text-navy tracking-tight leading-none">{title}</h1>
        {subtitle ? <p className="text-sm text-body-gray mt-2">{subtitle}</p> : null}
      </div>
    </div>
  )
}
