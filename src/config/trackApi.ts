export type TrackApiVersion = 'v1' | 'v2'

export const TRACK_API_VERSION_KEY = 'behavora_track_api_version'

// v1 is the widget's default when data-track-api-version is not set on the script tag
export const DEFAULT_TRACK_API_VERSION: TrackApiVersion = 'v1'

export const getTrackApiVersion = (): TrackApiVersion => {
  if (typeof window === 'undefined') return DEFAULT_TRACK_API_VERSION

  try {
    return localStorage.getItem(TRACK_API_VERSION_KEY) === 'v2' ? 'v2' : DEFAULT_TRACK_API_VERSION
  } catch {
    return DEFAULT_TRACK_API_VERSION
  }
}

export const saveTrackApiVersion = (version: TrackApiVersion) => {
  if (version === DEFAULT_TRACK_API_VERSION) {
    localStorage.removeItem(TRACK_API_VERSION_KEY)
  } else {
    localStorage.setItem(TRACK_API_VERSION_KEY, version)
  }
}
