import { Droplets, MapPin, Phone, Pill, ShieldAlert, Stethoscope } from 'lucide-react'
import { clinicTaskBadgeStyles, clinicToolStatCopy } from '../../data/mocks/doctorClinicTools'
import Button from '../Button'

const RX_ACTIONS = {
  Refill: {
    title: 'Refill this prescription',
    body: 'Confirm ongoing therapy, then sign the refill.',
    cta: 'Sign refill',
  },
  Update: {
    title: 'Update dose / plan',
    body: 'Confirm the change, then sign the updated Rx.',
    cta: 'Sign update',
  },
  New: {
    title: 'Write new prescription',
    body: 'Confirm medicine details, then sign this new Rx.',
    cta: 'Sign new Rx',
  },
}

function DetailTile({ icon: Icon, label, value, tone = 'default' }) {
  if (!value) return null
  const tones = {
    default: 'bg-[#F4F7FA] text-teal',
    alert: 'bg-rose-50 text-rose-500',
  }

  return (
    <div className={`rounded-xl px-3 py-2.5 min-w-0 flex items-center gap-2.5 ${tones[tone] || tones.default}`}>
      <span className="w-8 h-8 rounded-lg bg-white flex items-center justify-center shrink-0 shadow-sm">
        <Icon className="w-3.5 h-3.5" strokeWidth={1.9} />
      </span>
      <div className="min-w-0">
        <p className="text-[10px] font-semibold uppercase tracking-[0.08em] text-body-gray leading-none">
          {label}
        </p>
        <p className="text-[13px] font-bold text-navy mt-1 leading-snug break-words">{value}</p>
      </div>
    </div>
  )
}

function SectionLabel({ step, title }) {
  return (
    <p className="text-[11px] font-bold uppercase tracking-[0.12em] text-body-gray mb-2">
      <span className="text-teal">Step {step}</span>
      <span className="mx-1.5 text-[#CBD5E1]">·</span>
      {title}
    </p>
  )
}

export default function DoctorPrescribePanel({
  task,
  filterLabel,
  queueIndex = 1,
  queueTotal = 0,
  onComplete,
  onOpenPatient,
}) {
  if (!task) {
    return (
      <section className="bg-white rounded-2xl border border-[#E6EBF1] shadow-sm p-6 h-full min-h-0 flex items-center justify-center">
        <p className="text-sm text-body-gray text-center">
          Select a {filterLabel?.toLowerCase() || 'prescription'} item to review and sign.
        </p>
      </section>
    )
  }

  const badgeClass = clinicTaskBadgeStyles[task.badge] || clinicTaskBadgeStyles.New
  const action = RX_ACTIONS[task.badge] || {
    title: 'Complete this prescription',
    body: clinicToolStatCopy[task.badge]?.hint || 'Review and sign this prescription.',
    cta: 'Sign prescription',
  }
  const personBits = [task.ageLabel, task.gender].filter(Boolean).join(' · ')
  const allergyTone =
    task.allergies && !/none|not on file/i.test(task.allergies) ? 'alert' : 'default'

  return (
    <section className="bg-white rounded-2xl border border-[#E6EBF1] shadow-sm p-4 sm:p-5 flex flex-col gap-4 h-full min-h-0 overflow-y-auto scroll-y">
      <div className="rounded-2xl border border-teal/20 bg-[#E8F7F6]/70 px-3.5 py-3 shrink-0">
        <div className="flex items-center justify-between gap-2 flex-wrap">
          <p className="text-[11px] font-bold uppercase tracking-[0.12em] text-teal">
            Step 3–4 · Review & sign
          </p>
          <p className="text-[12px] font-semibold text-navy tabular-nums">
            {queueIndex}/{queueTotal || 1} in this queue
          </p>
        </div>
        <p className="text-[15px] font-bold text-navy mt-1 tracking-tight">{action.title}</p>
        <p className="text-[13px] text-body-gray mt-1 leading-relaxed">{action.body}</p>
      </div>

      <div className="flex items-start gap-3.5 shrink-0">
        <div className="w-14 h-14 rounded-2xl overflow-hidden shrink-0 bg-teal-light ring-2 ring-[#E8F7F6]">
          {task.avatar ? (
            <img src={task.avatar} alt="" className="w-full h-full object-cover object-top" />
          ) : null}
        </div>
        <div className="min-w-0 flex-1">
          <div className="flex items-center gap-2 flex-wrap">
            <h2 className="font-display text-xl font-bold text-navy truncate">{task.patientName}</h2>
            {task.badge ? (
              <span className={`text-[11px] font-semibold px-2.5 py-0.5 rounded-full shrink-0 ${badgeClass}`}>
                {task.badge}
              </span>
            ) : null}
          </div>
          {personBits ? <p className="text-sm text-body-gray mt-1">{personBits}</p> : null}
          <p className="text-sm font-semibold text-navy mt-1.5 truncate">{task.title}</p>
        </div>
      </div>

      <div className="shrink-0">
        <SectionLabel step={3} title="Check patient safety" />
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
          <DetailTile icon={Phone} label="Phone" value={task.phone} />
          <DetailTile icon={MapPin} label="City" value={task.city} />
          <DetailTile icon={Droplets} label="Blood group" value={task.bloodGroup} />
          <DetailTile icon={ShieldAlert} label="Allergies" value={task.allergies} tone={allergyTone} />
          <DetailTile icon={Stethoscope} label="Primary concern" value={task.primaryConcern} />
        </div>
      </div>

      <div className="shrink-0">
        <SectionLabel step={3} title="Confirm medicine" />
        <div className="rounded-2xl border border-teal/20 bg-[#E8F7F6]/60 p-3.5">
          <div className="flex items-center gap-2 mb-3">
            <span className="w-9 h-9 rounded-xl bg-white text-teal flex items-center justify-center shrink-0">
              <Pill className="w-4 h-4" strokeWidth={1.9} />
            </span>
            <div className="min-w-0">
              <p className="text-sm font-bold text-navy truncate">{task.title}</p>
              {task.subtitle ? (
                <p className="text-[12px] text-body-gray mt-0.5 truncate">{task.subtitle}</p>
              ) : null}
            </div>
          </div>
          <div className="grid grid-cols-2 gap-2">
            <DetailTile icon={Pill} label="Dose" value={task.dose} />
            <DetailTile icon={Pill} label="Frequency" value={task.frequency} />
            <DetailTile icon={Pill} label="Duration" value={task.duration} />
            <DetailTile icon={Stethoscope} label="Visit" value={task.visitLabel} />
          </div>
        </div>
      </div>

      {task.instructions ? (
        <div className="rounded-2xl bg-[#F8FAFC] border border-[#EAF0F5] px-4 py-3 shrink-0">
          <p className="text-[11px] font-bold uppercase tracking-[0.12em] text-teal">Instructions</p>
          <p className="text-sm text-navy mt-1.5 leading-relaxed">{task.instructions}</p>
        </div>
      ) : null}

      {task.planItems?.length ? (
        <div className="rounded-2xl bg-[#F8FAFC] border border-[#EAF0F5] px-4 py-3 shrink-0">
          <p className="text-[11px] font-bold uppercase tracking-[0.12em] text-teal">Counseling</p>
          <ul className="mt-2 flex flex-col gap-1.5">
            {task.planItems.map((item) => (
              <li key={item} className="text-[13px] font-medium text-navy leading-snug">
                · {item}
              </li>
            ))}
          </ul>
        </div>
      ) : null}

      <div className="shrink-0 mt-auto pt-1 flex flex-col gap-2">
        <p className="text-[11px] font-bold uppercase tracking-[0.12em] text-teal">
          Step 4 · Sign and move next
        </p>
        <Button onClick={() => onComplete?.(task)} className="w-full">
          {action.cta}
        </Button>
        <Button variant="secondary" onClick={() => onOpenPatient?.(task)} className="w-full">
          Open patient chart
        </Button>
      </div>
    </section>
  )
}
