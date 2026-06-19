import type { Lang } from '../data/translations'

export interface ApplicationFormData {
  name: string
  age: string
  location: string
  role: 'rider' | 'passenger' | 'supporter'
  motorcycle: string
  yearsRiding: string
  hasLicense: 'yes' | 'no'
  howFound: string
  knowsSomeone: string
  about: string
  rulesAccepted: boolean
}

const ADMIN_PHONE = '351939910283'

const ROLE_LABELS: Record<Lang, Record<ApplicationFormData['role'], string>> = {
  pt: { rider: 'Motociclista', passenger: 'Pendura', supporter: 'Apoiante' },
  en: { rider: 'Rider', passenger: 'Passenger', supporter: 'Supporter' },
}

const LICENSE_LABELS: Record<Lang, Record<ApplicationFormData['hasLicense'], string>> = {
  pt: { yes: 'Sim', no: 'Não' },
  en: { yes: 'Yes', no: 'No' },
}

export function buildWhatsAppUrl(data: ApplicationFormData, lang: Lang): string {
  const role = ROLE_LABELS[lang][data.role]
  const license = LICENSE_LABELS[lang][data.hasLicense]
  const knowsSomeone = data.knowsSomeone.trim() || (lang === 'pt' ? 'Não' : 'No')

  const message =
    lang === 'pt'
      ? `Olá Romário! Gostava de me candidatar ao Walking Around.\n\nNome: ${data.name}\nIdade: ${data.age}\nLocalização: ${data.location}\nSou: ${role}\nMoto: ${data.motorcycle}\nAnos de experiência: ${data.yearsRiding}\nCarta de mota válida: ${license}\nComo conheci o grupo: ${data.howFound}\nConheço alguém no grupo: ${knowsSomeone}\nSobre mim: ${data.about}\nConfirmo que li e aceito as regras do grupo: Sim`
      : `Hello Romário! I would like to apply to join Walking Around.\n\nName: ${data.name}\nAge: ${data.age}\nLocation: ${data.location}\nI am a: ${role}\nMotorcycle: ${data.motorcycle}\nYears of riding: ${data.yearsRiding}\nValid motorcycle license: ${license}\nHow I found the group: ${data.howFound}\nDo I know someone in the group: ${knowsSomeone}\nAbout me: ${data.about}\nI confirm that I have read and accept the group rules: Yes`

  return `https://wa.me/${ADMIN_PHONE}?text=${encodeURIComponent(message)}`
}
