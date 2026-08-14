import { expertiseIconMap } from '../mocks/expertiseIcons'

export function generateExpertiseChips(labels = []) {
  return labels.map((label) => ({
    label,
    icon: expertiseIconMap[label] || 'stethoscope',
  }))
}
