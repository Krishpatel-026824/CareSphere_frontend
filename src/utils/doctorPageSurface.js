export function getDoctorPageSurface(pathname = '') {
  if (pathname.startsWith('/doctor/schedule')) return 'page-surface page-surface--schedule'
  if (pathname.startsWith('/doctor/patients')) return 'page-surface page-surface--patients'
  if (pathname.startsWith('/doctor/messages')) return 'page-surface page-surface--messages'
  if (pathname.startsWith('/doctor/profile')) return 'page-surface page-surface--profile'
  if (
    pathname.startsWith('/doctor/lab-reports') ||
    pathname.startsWith('/doctor/tools') ||
    pathname.startsWith('/doctor/consult')
  ) {
    return 'page-surface page-surface--tools'
  }
  return 'page-surface page-surface--home'
}
