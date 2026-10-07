export const TRACK_URL_KEY = 'behavora_track_url'

// Empty means the widget uses its default endpoint built from data-api-url
export const getTrackUrl = (): string => {
  if (typeof window === 'undefined') return ''

  try {
    return localStorage.getItem(TRACK_URL_KEY) ?? ''
  } catch {
    return ''
  }
}

export const saveTrackUrl = (url: string) => {
  const value = url.trim()
  if (!value) {
    localStorage.removeItem(TRACK_URL_KEY)
  } else {
    localStorage.setItem(TRACK_URL_KEY, value)
  }
}
