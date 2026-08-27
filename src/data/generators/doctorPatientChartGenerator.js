import {
  doctorLabTasksMock,
  doctorNoteTasksMock,
  doctorPrescribeTasksMock,
} from '../mocks/doctorClinicTools'
import { doctorPatientsMock } from '../mocks/doctorPatients'
import { labTestsMock } from '../mocks/labTests'
import { pharmacyItemsMock } from '../mocks/quickActions'
import { generateCatalogLabReport, generateDoctorLabReport } from './doctorLabReportsGenerator'
import { resolveMedicineImage } from './medicineImageResolver'

function countAbnormal(parameters = []) {
  return parameters.filter((row) => row.status === 'High' || row.status === 'Low').length
}

function parseDoseFromName(name = '') {
  const match = String(name).match(/(\d+\s?(?:mg|mcg|ml|g|K))/i)
  return match ? match[1].replace(/\s+/g, '') : '—'
}

function parseUseFor(subtitle = '', category = '') {
  const fromSubtitle = String(subtitle).split('•')[0].trim()
  if (fromSubtitle) return fromSubtitle

  const byCategory = {
    analgesics: 'Fever & pain',
    cetirizines: 'Allergy',
    allergies: 'Allergy & cold',
    antibiotics: 'Infection',
    metformins: 'Blood sugar',
    syrups: 'Cough & fever',
    fluids: 'Rehydration',
    others: 'As advised',
  }
  return byCategory[category] || 'As advised'
}

export function generatePatientPrescriptions(patientId) {
  const fromTasks = doctorPrescribeTasksMock
    .filter((item) => item.patientId === patientId)
    .map((item) => ({
      id: item.id,
      name: item.title,
      badge: item.badge || 'Previous',
      dose: item.dose,
      frequency: item.frequency,
      duration: item.duration,
      visitLabel: item.visitLabel,
      instructions: item.instructions,
      subtitle: item.subtitle,
      useFor: item.subtitle,
      image: resolveMedicineImage(item.title),
    }))

  if (fromTasks.length) return fromTasks

  const seedIds = ['med-1', 'med-8', 'med-14']
  return seedIds
    .map((id, index) => {
      const item = pharmacyItemsMock.find((med) => med.id === id)
      if (!item) return null
      const dose = parseDoseFromName(item.name)
      return {
        id: `prev-rx-${patientId}-${id}`,
        name: item.name,
        badge: 'Previous',
        dose: dose === '—' ? '1 tablet' : dose,
        frequency: index === 0 ? 'As needed' : 'Once daily',
        duration: index === 2 ? 'Ongoing' : '7 days',
        visitLabel: index === 0 ? '12 Mar 2026' : '08 Nov 2025',
        instructions: `Continue ${item.name} as previously advised.`,
        subtitle: parseUseFor(item.subtitle, item.category),
        useFor: parseUseFor(item.subtitle, item.category),
        image: item.image || resolveMedicineImage(item.name, item.id),
      }
    })
    .filter(Boolean)
}

export function generatePatientMedicines() {
  return pharmacyItemsMock.map((item) => {
    const parts = String(item.subtitle || '').split('•').map((part) => part.trim())
    return {
      id: item.id,
      name: item.name,
      pack: parts[1] || '',
      dose: parseDoseFromName(item.name),
      frequency: /syrup|ml|gel|spray|cream|drops/i.test(item.subtitle || item.name)
        ? 'As directed'
        : 'Once daily',
      useFor: parseUseFor(item.subtitle, item.category),
      category: item.category,
      image: item.image || resolveMedicineImage(item.name, item.id),
    }
  })
}

export function generatePatientLabCatalog() {
  return labTestsMock.map((test) => ({
    id: test.id,
    title: test.name,
    subtitle: test.description,
    turnaround: test.turnaround,
    price: test.price,
    image: test.thumbnail,
  }))
}

export function generatePatientLabReports(patientId) {
  const patient = doctorPatientsMock.find((item) => item.id === patientId)
  if (!patient) return []

  const fromTasks = doctorLabTasksMock
    .filter((task) => task.patientId === patientId)
    .map((task) => {
      const report = generateDoctorLabReport(task, patient)
      if (!report) {
        return {
          id: `lab-${task.id}`,
          title: task.title,
          dateLabel: task.visitLabel?.split('·')[0]?.trim() || '—',
          status: task.badge === 'Review' ? 'Ready for review' : 'Verified',
          badge: task.badge,
          abnormalCount: 0,
          subtitle: task.subtitle,
        }
      }
      return {
        id: report.id,
        title: task.title,
        dateLabel: report.dateLabel,
        status: report.status,
        badge: task.badge,
        abnormalCount: countAbnormal(report.parameters),
        subtitle: task.subtitle,
        report,
      }
    })

  if (fromTasks.length) return fromTasks

  const seedIds = ['lab-1', 'lab-2', 'lab-4']
  const dates = ['12 Mar 2026', '08 Nov 2025', '20 Jun 2025']

  return seedIds
    .map((id, index) => {
      const test = labTestsMock.find((item) => item.id === id)
      if (!test) return null
      const report = generateCatalogLabReport(test, patient, {
        id: `prev-${patientId}-${id}`,
        dateLabel: dates[index] || dates[0],
        status: 'Verified',
      })
      return {
        id: report.id,
        title: test.name,
        dateLabel: report.dateLabel,
        status: report.status,
        badge: 'Review',
        abnormalCount: countAbnormal(report.parameters),
        subtitle: test.description,
        image: test.thumbnail,
        report,
      }
    })
    .filter(Boolean)
}

export function generatePatientAuditLog(patientId, visits = []) {
  const prescriptions = generatePatientPrescriptions(patientId)
  const labs = generatePatientLabReports(patientId)
  const notes = doctorNoteTasksMock.filter((item) => item.patientId === patientId)

  const rows = [
    ...visits.map((visit, index) => ({
      id: `audit-visit-${visit.id || index}`,
      at: `${visit.dateLabel || '—'} · ${visit.timeLabel || ''}`.trim(),
      action: `Visit ${visit.status || 'updated'}`,
      detail: visit.room || visit.prepNote || 'Clinic visit',
      actor: 'Dr. James Carter',
      type: 'visit',
    })),
    ...prescriptions.map((item) => ({
      id: `audit-rx-${item.id}`,
      at: item.visitLabel || '—',
      action: `Rx ${item.badge}`,
      detail: `${item.name} · ${item.dose}`,
      actor: 'Dr. James Carter',
      type: 'rx',
    })),
    ...labs.map((item) => ({
      id: `audit-lab-${item.id}`,
      at: item.dateLabel || '—',
      action: `Lab ${item.status}`,
      detail: item.title,
      actor: 'CareSphere Diagnostics',
      type: 'lab',
    })),
    ...notes.map((item) => ({
      id: `audit-note-${item.id}`,
      at: item.visitLabel || '—',
      action: item.statusLabel || 'Note',
      detail: item.title,
      actor: item.author || 'Dr. James Carter',
      type: 'note',
    })),
  ]

  return rows
}

export function generateDoctorPatientChart(patient, visits = []) {
  if (!patient) {
    return { prescriptions: [], medicines: [], labs: [], labCatalog: [], audit: [], visits: [] }
  }

  return {
    prescriptions: generatePatientPrescriptions(patient.id),
    medicines: generatePatientMedicines(),
    labs: generatePatientLabReports(patient.id),
    labCatalog: generatePatientLabCatalog(),
    audit: generatePatientAuditLog(patient.id, visits),
    visits,
  }
}
