export default function ProfileHero({ details, stats }) {
  return (
    <section className="rounded-3xl border border-[#E6EBF1] bg-white p-6 sm:p-7 shadow-[0_8px_30px_rgba(15,23,42,0.04)]">
      <div className="flex items-center gap-4">
        <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-teal overflow-hidden shrink-0 flex items-center justify-center text-white text-xl font-bold">
          {details.avatar ? (
            <img src={details.avatar} alt={details.name} className="w-full h-full object-cover" />
          ) : (
            details.initials
          )}
        </div>
        <div className="min-w-0 flex-1">
          <h2 className="text-xl sm:text-2xl font-bold text-navy tracking-tight leading-tight">
            {details.name}
          </h2>
          <p className="text-sm text-body-gray mt-1">{details.role}</p>
          <p className="text-xs text-[#9CA3AF] mt-1">{details.memberSince}</p>
        </div>
      </div>

      <div className="mt-6 grid grid-cols-3 gap-3 sm:gap-4">
        {stats.map((item) => (
          <div key={item.id} className="rounded-2xl bg-[#F1F5F9] px-3 py-4 sm:py-5 text-center">
            <p className="text-xl sm:text-[28px] font-bold text-navy tabular-nums leading-none">{item.value}</p>
            <p className="text-[11px] sm:text-xs text-body-gray mt-2">{item.label}</p>
          </div>
        ))}
      </div>
    </section>
  )
}
