import { healthOverviewCardsMock, healthOverviewVisibleCount } from '../mocks/home'

export function generateHealthOverviewData() {
  return {
    cards: healthOverviewCardsMock,
    visibleCount: healthOverviewVisibleCount,
  }
}
