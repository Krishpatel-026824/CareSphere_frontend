import {
  CheckCircle2,
  ClipboardCheck,
  Layers,
  Pencil,
  PenLine,
  Pill,
  Plus,
  RefreshCw,
} from 'lucide-react'
import Button from '../Button'

const ORDER = [
  {
    id: 'New',
    step: '01',
    label: 'New',
    icon: Plus,
    copy: 'Write and sign first-time medicines',
    tone: 'border-teal/30 bg-[#E8F7F6]',
    iconTone: 'bg-teal text-white',
    valueTone: 'text-teal',
  },
  {
    id: 'Update',
    step: '02',
    label: 'Update',
    icon: Pencil,
    copy: 'Confirm dose or plan changes',
    tone: 'border-emerald-200 bg-emerald-50',
    iconTone: 'bg-emerald-600 text-white',
    valueTone: 'text-emerald-700',
  },
  {
    id: 'Refill',
    step: '03',
    label: 'Refill',
    icon: RefreshCw,
    copy: 'Renew ongoing prescriptions',
    tone: 'border-sky-200 bg-sky-50',
    iconTone: 'bg-sky-600 text-white',
    valueTone: 'text-sky-700',
  },
]

const WORK_STEPS = [
  {
    n: '1',
    title: 'Open a queue',
    body: 'Start with New, then Update, then Refill.',
    icon: Layers,
  },
  {
    n: '2',
    title: 'Select patient Rx',
    body: 'Pick one prescription card from the left list.',
    icon: Pill,
  },
  {
    n: '3',
    title: 'Review details',
    body: 'Check allergies, dose, frequency, and instructions.',
    icon: ClipboardCheck,
  },
  {
    n: '4',
    title: 'Sign and store',
    body: 'Sign moves the patient into the signed table.',
    icon: PenLine,
  },
]

export default function DoctorPrescribeStart({
  counts = {},
  total = 0,
  onStart,
  onOpenSigned,
}) {
  return (
    <section className="bg-white rounded-2xl border border-[#E6EBF1] shadow-sm overflow-hidden flex flex-col">
      <div className="px-5 sm:px-6 pt-5 pb-4 border-b border-[#E6EBF1] bg-[#F8FBFC] shrink-0">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          <div className="min-w-0">
            <div className="flex flex-wrap items-center gap-2.5">
              <h2 className="text-[22px] sm:text-[26px] font-bold text-navy tracking-tight leading-none">
                Write Rx
              </h2>
              <span className="inline-flex items-center rounded-full bg-navy text-white px-2.5 py-1 text-[11px] font-bold tabular-nums">
                {total} waiting
              </span>
            </div>
            <p className="text-[13px] sm:text-sm text-body-gray mt-2 leading-snug">
              Review each prescription, then sign. Signed patients are saved in the table.
            </p>
          </div>

          <div className="flex items-center gap-2.5 shrink-0">
            {onOpenSigned ? (
              <button
                type="button"
                onClick={onOpenSigned}
                className="h-11 px-4 rounded-xl border border-[#D5DEE8] bg-white text-[13px] font-semibold text-navy cursor-pointer hover:border-teal/40"
              >
                View signed table
              </button>
            ) : null}
            <Button onClick={onStart} className="!w-auto min-w-[150px] !min-h-11 px-5 !text-[14px]">
              Start process
            </Button>
          </div>
        </div>
      </div>

      <div className="p-5 sm:p-6 flex flex-col gap-4">
        <div className="shrink-0">
          <div className="flex items-center justify-between gap-2 mb-3">
            <p className="text-[14px] font-bold text-navy tracking-tight">Today’s Rx queues</p>
            <p className="text-[12px] font-semibold text-body-gray">Choose where to begin</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            {ORDER.map((item) => {
              const Icon = item.icon
              const count = counts[item.id] || 0
              return (
                <div
                  key={item.id}
                  className={`rounded-2xl border px-4 py-3.5 flex items-center justify-between gap-3 ${item.tone}`}
                >
                  <div className="flex items-center gap-3 min-w-0">
                    <span
                      className={`w-10 h-10 rounded-xl inline-flex items-center justify-center shrink-0 ${item.iconTone}`}
                    >
                      <Icon className="w-5 h-5" strokeWidth={2} />
                    </span>
                    <div className="min-w-0">
                      <p className="text-[10px] font-bold uppercase tracking-[0.12em] text-body-gray">
                        Step {item.step}
                      </p>
                      <p className="text-[16px] font-bold text-navy mt-0.5 tracking-tight leading-none">
                        {item.label}
                      </p>
                      <p className="text-[12px] font-medium text-body-gray mt-1 leading-snug truncate">
                        {item.copy}
                      </p>
                    </div>
                  </div>
                  <p className={`text-[28px] font-bold tabular-nums leading-none shrink-0 ${item.valueTone}`}>
                    {count}
                  </p>
                </div>
              )
            })}
          </div>
        </div>

        <div className="shrink-0 rounded-2xl border border-[#E6EBF1] bg-[#F8FAFC] p-4 sm:p-5">
          <p className="text-[14px] font-bold text-navy tracking-tight">How to work this page</p>
          <div className="mt-3.5 grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-3">
            {WORK_STEPS.map((step) => {
              const Icon = step.icon
              return (
                <div
                  key={step.n}
                  className="rounded-xl bg-white border border-[#E6EBF1] px-3.5 py-3 flex items-start gap-3"
                >
                  <span className="relative w-9 h-9 rounded-xl bg-[#E8F7F6] text-teal inline-flex items-center justify-center shrink-0">
                    <Icon className="w-4 h-4" strokeWidth={2} />
                    <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-teal text-white text-[9px] font-bold inline-flex items-center justify-center leading-none shadow-sm">
                      {step.n}
                    </span>
                  </span>
                  <div className="min-w-0 pt-0.5">
                    <p className="text-[13px] font-bold text-navy tracking-tight leading-tight">
                      {step.title}
                    </p>
                    <p className="text-[12px] text-body-gray mt-1 leading-snug">{step.body}</p>
                  </div>
                </div>
              )
            })}
          </div>
          <div className="mt-3.5 rounded-xl border border-teal/20 bg-[#E8F7F6] px-3.5 py-2.5 flex items-start gap-2.5">
            <CheckCircle2 className="w-4 h-4 text-teal shrink-0 mt-0.5" strokeWidth={2} />
            <p className="text-[12px] font-medium text-navy leading-relaxed">
              Tip: start with <span className="font-bold">New</span>, then finish{' '}
              <span className="font-bold">Update</span> and <span className="font-bold">Refill</span>.
              Use <span className="font-bold">View signed table</span> anytime to see signed patients.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
