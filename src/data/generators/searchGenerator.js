import { doctorsMock } from '../mocks/doctors'
import { popularSpecialtiesMock, recentSearchesMock } from '../mocks/search'

export function generateSearchData() {
  return {
    recentSearches: recentSearchesMock,
    popularSpecialties: popularSpecialtiesMock,
    recommendedDoctors: doctorsMock,
  }
}
