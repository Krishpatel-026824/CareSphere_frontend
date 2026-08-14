import { careCircleMembersMock } from '../mocks/careCircle'

export function generateCareCircleMembers() {
  return careCircleMembersMock.map((member) => ({ ...member }))
}
