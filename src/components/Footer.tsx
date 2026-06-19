import { t, type Lang } from '../data/translations'

interface Props {
  lang: Lang
}

export function Footer({ lang }: Props) {
  const tr = t[lang].footer

  return (
    <footer
      className="py-14 px-6 border-t border-gray-900 text-center"
      role="contentinfo"
    >
      <p
        className="font-display text-base sm:text-lg tracking-[0.2em] uppercase"
        style={{ color: 'rgba(201,160,32,0.65)' }}
      >
        {tr.tagline}
      </p>
      <p className="text-ink-subtle text-xs mt-3">
        © {new Date().getFullYear()} {tr.copyright}
      </p>
    </footer>
  )
}
