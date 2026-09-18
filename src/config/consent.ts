export type ConsentStorage = 'localStorage' | 'cookie' | 'sessionStorage'

export interface ConsentConfig {
  storage: ConsentStorage
  key: string
  value: string
}

export const CONSENT_CONFIG_KEY = 'behavora_consent_config'

export const CONSENT_STORAGES: ConsentStorage[] = ['localStorage', 'cookie', 'sessionStorage']

export const DEFAULT_CONSENT_CONFIG: ConsentConfig = {
  storage: 'localStorage',
  key: 'behavora_consent',
  value: 'granted',
}

const isConsentStorage = (value: unknown): value is ConsentStorage =>
  value === 'localStorage' || value === 'cookie' || value === 'sessionStorage'

export const getConsentConfig = (): ConsentConfig => {
  if (typeof window === 'undefined') return DEFAULT_CONSENT_CONFIG

  try {
    const saved = localStorage.getItem(CONSENT_CONFIG_KEY)
    if (!saved) return DEFAULT_CONSENT_CONFIG

    const parsed = JSON.parse(saved)
    return {
      storage: isConsentStorage(parsed.storage) ? parsed.storage : DEFAULT_CONSENT_CONFIG.storage,
      key: typeof parsed.key === 'string' && parsed.key ? parsed.key : DEFAULT_CONSENT_CONFIG.key,
      value: typeof parsed.value === 'string' && parsed.value ? parsed.value : DEFAULT_CONSENT_CONFIG.value,
    }
  } catch {
    return DEFAULT_CONSENT_CONFIG
  }
}

export const saveConsentConfig = (config: ConsentConfig) => {
  localStorage.setItem(CONSENT_CONFIG_KEY, JSON.stringify(config))
}

const getCookie = (name: string): string | null => {
  const encodedName = encodeURIComponent(name)
  const match = document.cookie
    .split('; ')
    .find((row) => row.startsWith(`${encodedName}=`) || row.startsWith(`${name}=`))

  if (!match) return null

  const rawValue = match.slice(match.indexOf('=') + 1)
  try {
    return decodeURIComponent(rawValue)
  } catch {
    return rawValue
  }
}

const setCookie = (name: string, value: string) => {
  document.cookie = `${encodeURIComponent(name)}=${encodeURIComponent(value)}; path=/; SameSite=Lax`
}

const removeCookie = (name: string) => {
  document.cookie = `${encodeURIComponent(name)}=; path=/; max-age=0`
  document.cookie = `${name}=; path=/; max-age=0`
}

export const readStoredConsent = (storage: ConsentStorage, key: string): string | null => {
  try {
    if (storage === 'localStorage') return localStorage.getItem(key)
    if (storage === 'sessionStorage') return sessionStorage.getItem(key)
    return getCookie(key)
  } catch {
    return null
  }
}

export const writeStoredConsent = (storage: ConsentStorage, key: string, value: string) => {
  if (storage === 'localStorage') {
    localStorage.setItem(key, value)
    return
  }

  if (storage === 'sessionStorage') {
    sessionStorage.setItem(key, value)
    return
  }

  setCookie(key, value)
}

export const removeStoredConsent = (storage: ConsentStorage, key: string) => {
  if (storage === 'localStorage') {
    localStorage.removeItem(key)
    return
  }

  if (storage === 'sessionStorage') {
    sessionStorage.removeItem(key)
    return
  }

  removeCookie(key)
}
