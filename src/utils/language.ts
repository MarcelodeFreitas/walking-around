import type { Lang } from '../data/translations'

const STORAGE_KEY = 'wa-lang'

export function detectLanguage(): Lang {
  const stored = localStorage.getItem(STORAGE_KEY)
  if (stored === 'pt' || stored === 'en') return stored
  const browser = (navigator.language || navigator.languages?.[0] || 'pt').toLowerCase()
  return browser.startsWith('en') ? 'en' : 'pt'
}

export function persistLanguage(lang: Lang): void {
  localStorage.setItem(STORAGE_KEY, lang)
}
