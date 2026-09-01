import { Check, FlaskConical } from 'lucide-react'
import LabBookOptionsPicker from './LabBookOptionsPicker'
import { labCollectionOptions, labPriorityOptions } from './DoctorPatientLabsTabParts'

export default function LabBookTestCard({
  item,
  selected,
  locked,
  options,
  onToggle,
  onChangeOption,
}) {
  return (
    <div
      className={`rounded-xl border px-3 py-3 transition-colors ${
        locked
          ? 'border-[#E6EBF1] bg-[#F8FAFC]'
          : selected
            ? 'border-teal bg-[#E8F7F6]'
            : 'border-[#E6EBF1] bg-white'
      }`}
    >
      <button
        type="button"
        onClick={onToggle}
        disabled={locked}
        className={`w-full flex items-start gap-3 text-left ${locked ? 'cursor-default' : 'cursor-pointer'}`}
      >
        <span
          className={`w-5 h-5 mt-0.5 rounded-md border flex items-center justify-center shrink-0 ${
            locked
              ? 'bg-[#E8EEF4] border-[#E6EBF1] text-body-gray'
              : selected
                ? 'bg-teal border-teal text-white'
                : 'border-[#E6EBF1] bg-white'
          }`}
        >
          {selected ? <Check className="w-3 h-3" strokeWidth={3} /> : null}
        </span>

        <span className="w-11 h-11 rounded-xl overflow-hidden shrink-0 border border-[#E6EBF1] bg-white flex items-center justify-center">
          {item.image ? (
            <img src={item.image} alt="" className="w-full h-full object-cover" />
          ) : (
            <FlaskConical className="w-5 h-5 text-teal" strokeWidth={1.85} />
          )}
        </span>

        <span className="min-w-0 flex-1">
          <span className="flex flex-wrap items-center gap-2">
            <span className="text-sm font-bold text-navy">{item.title}</span>
            {item.turnaround ? (
              <span className="text-[10px] font-bold uppercase tracking-[0.06em] text-teal bg-teal-light px-2 py-0.5 rounded-full">
                {item.turnaround}
              </span>
            ) : null}
            {locked ? (
              <span className="text-[10px] font-bold text-emerald-700 bg-emerald-50 border border-emerald-200 px-2 py-0.5 rounded-full">
                Booked{item.orderedOn ? ` · ${item.orderedOn}` : ''}
              </span>
            ) : null}
          </span>
          {item.subtitle ? (
            <span className="text-xs text-body-gray block mt-1 leading-relaxed">{item.subtitle}</span>
          ) : null}
        </span>
      </button>

      {selected && !locked ? (
        <div className="pl-7">
          <LabBookOptionsPicker
            options={options}
            collectionOptions={labCollectionOptions}
            priorityOptions={labPriorityOptions}
            onChange={onChangeOption}
          />
        </div>
      ) : null}
    </div>
  )
}
