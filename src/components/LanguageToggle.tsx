import { motion } from 'framer-motion'
import type { Lang } from '../data/translations'

interface Props {
  lang: Lang
  onToggle: (lang: Lang) => void
}

export function LanguageToggle({ lang, onToggle }: Props) {
  return (
    <div
      className="fixed top-4 right-4 z-50 flex items-center gap-0.5 bg-[#0a0a0a]/80 backdrop-blur-md border border-gray-800 rounded-full p-1"
      role="group"
      aria-label="Language selector"
    >
      {(['pt', 'en'] as Lang[]).map((l) => (
        <motion.button
          key={l}
          onClick={() => onToggle(l)}
          className={`px-3 py-1.5 rounded-full text-xs font-display tracking-widest transition-colors duration-200 cursor-pointer ${
            lang === l
              ? 'bg-gold text-black'
              : 'text-ink-muted hover:text-ink'
          }`}
          whileTap={{ scale: 0.9 }}
          aria-label={`Switch to ${l.toUpperCase()}`}
          aria-pressed={lang === l}
        >
          {l.toUpperCase()}
        </motion.button>
      ))}
    </div>
  )
}
