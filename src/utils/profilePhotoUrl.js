const RANDOMUSER_PORTRAIT =
  /^https?:\/\/randomuser\.me\/api\/portraits\/(?:thumb\/|med\/)?(men|women)\/(\d+)\.jpg$/i

const PROFILE_PHOTO_PX = 400

function resolveRandomuserPortrait(gender, id) {
  return `https://i.pravatar.cc/${PROFILE_PHOTO_PX}?u=caresphere-${gender}-${id}`
}

/** High-resolution URL for inline avatars (e.g. 7 cm profile photos). */
export function getProfilePhotoDisplayUrl(src) {
  if (!src || typeof src !== 'string') return src

  const match = src.match(RANDOMUSER_PORTRAIT)
  if (match) {
    const [, gender, id] = match
    return resolveRandomuserPortrait(gender, id)
  }

  return src
}

/** Best-quality URL for lightbox preview (no upscaling beyond source). */
export function getProfilePhotoPreviewUrl(src) {
  if (!src || typeof src !== 'string') return src

  const match = src.match(RANDOMUSER_PORTRAIT)
  if (match) {
    const [, gender, id] = match
    return resolveRandomuserPortrait(gender, id)
  }

  return src
}
