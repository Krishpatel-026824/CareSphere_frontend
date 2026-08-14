export default function ProfileCareCircleCard({ members = [], title = 'Associated Care Circle Members' }) {
  return (
    <section className="rounded-3xl border border-[#E6EBF1] bg-white p-6 sm:p-7 shadow-[0_8px_30px_rgba(15,23,42,0.04)]">
      <h2 className="text-base font-bold text-navy">{title}</h2>
      <ul className="mt-5 grid grid-cols-1 sm:grid-cols-2 gap-x-10 gap-y-5">
        {members.map((member) => (
          <li key={member.id} className="flex items-center gap-3 min-w-0">
            <div className="w-10 h-10 rounded-full overflow-hidden shrink-0 bg-[#F1F5F9]">
              <img src={member.avatar} alt={member.name} className="w-full h-full object-cover object-[center_18%]" />
            </div>
            <p className="text-sm text-navy truncate">
              {member.role}: {member.name}
            </p>
          </li>
        ))}
      </ul>
    </section>
  )
}
