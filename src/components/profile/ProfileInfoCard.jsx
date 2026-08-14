function groupInfoRows(rows, size = 3) {
  const groups = []
  for (let i = 0; i < rows.length; i += size) {
    groups.push(rows.slice(i, i + size))
  }
  return groups
}

export default function ProfileInfoCard({
  details,
  infoRows,
  fields,
  isEditing,
  draft,
  onChange,
  onSave,
  onCancel,
}) {
  return (
    <section className="rounded-3xl border border-[#E6EBF1] bg-white p-6 sm:p-7 shadow-[0_8px_30px_rgba(15,23,42,0.04)]">
      <h2 className="text-base font-bold text-navy">Personal details</h2>

      {isEditing ? (
        <form
          className="mt-5 grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4"
          onSubmit={(event) => {
            event.preventDefault()
            onSave()
          }}
        >
          {fields.map((field) => (
            <label key={field.id} className="flex flex-col gap-1.5">
              <span className="text-xs font-semibold text-body-gray">{field.label}</span>
              <input
                type={field.type}
                value={draft[field.id] || ''}
                onChange={(event) => onChange(field.id, event.target.value)}
                className="min-h-11 rounded-xl border border-[#E6EBF1] bg-[#F8FAFC] px-3 text-sm text-navy outline-none focus:border-teal"
              />
            </label>
          ))}
          <div className="sm:col-span-2 xl:col-span-3 flex gap-3 mt-2">
            <button
              type="button"
              onClick={onCancel}
              className="flex-1 min-h-11 rounded-xl border border-[#E6EBF1] bg-white text-sm font-semibold text-navy cursor-pointer hover:bg-[#F8FAFC]"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="flex-1 min-h-11 rounded-xl bg-teal text-white text-sm font-semibold cursor-pointer hover:bg-teal-dark"
            >
              Save changes
            </button>
          </div>
        </form>
      ) : (
        <div className="mt-5">
          {groupInfoRows(infoRows).map((group) => (
            <div
              key={group.map((row) => row.id).join('-')}
              className="grid grid-cols-1 sm:grid-cols-3 gap-x-8 gap-y-4 py-4 border-b border-[#E8EDF2]"
            >
              {group.map((row) => (
                <div key={row.id}>
                  <p className="text-xs text-body-gray">{row.label}</p>
                  <p className="text-sm font-semibold text-navy mt-1">{details[row.id] || '—'}</p>
                </div>
              ))}
            </div>
          ))}
        </div>
      )}
    </section>
  )
}
