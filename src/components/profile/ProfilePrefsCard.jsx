export default function ProfilePrefsCard({ prefs = [], onToggle }) {
  return (
    <section className="rounded-3xl border border-[#E6EBF1] bg-white p-6 sm:p-7 shadow-[0_8px_30px_rgba(15,23,42,0.04)]">
      <h2 className="text-base font-bold text-navy">Preferences</h2>
      <ul className="mt-4 flex flex-col gap-3">
        {prefs.map((item) => (
          <li key={item.id}>
            <button
              type="button"
              role="switch"
              aria-checked={item.on}
              aria-label={item.label}
              onClick={() => onToggle?.(item.id)}
              className="w-full flex items-center justify-between gap-3 rounded-2xl border border-[#E6EBF1] px-4 py-3.5 text-left cursor-pointer hover:border-teal/30"
            >
              <div className="min-w-0">
                <p className="text-sm font-semibold text-navy">{item.label}</p>
                <p className="text-[12px] text-body-gray mt-0.5">{item.hint}</p>
              </div>
              <span
                className={`relative h-6 w-11 shrink-0 rounded-full transition-colors ${
                  item.on ? 'bg-teal' : 'bg-[#D0D5DD]'
                }`}
              >
                <span
                  className={`absolute top-0.5 left-0.5 h-5 w-5 rounded-full bg-white shadow-sm pointer-events-none transition-transform ${
                    item.on ? 'translate-x-5' : 'translate-x-0'
                  }`}
                />
              </span>
            </button>
          </li>
        ))}
      </ul>
    </section>
  )
}
