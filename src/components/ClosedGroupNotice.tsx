import { useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { t } from '../data/translations'
import type { Lang } from '../data/translations'

interface Props {
  lang: Lang
  isOpen: boolean
  onClose: () => void
}

export function ClosedGroupNotice({ lang, isOpen, onClose }: Props) {
  const tr = t[lang].closed

  useEffect(() => {
    if (!isOpen) return
    const prev = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose() }
    window.addEventListener('keydown', onKey)
    return () => {
      document.body.style.overflow = prev
      window.removeEventListener('keydown', onKey)
    }
  }, [isOpen, onClose])

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            onClick={onClose}
            aria-hidden="true"
          />

          <div
            className="fixed inset-0 z-50 flex items-center justify-center p-6"
            role="dialog"
            aria-modal="true"
            aria-labelledby="closed-title"
            onClick={onClose}
          >
            <motion.div
              className="relative w-full max-w-md bg-surface rounded-2xl border border-gray-800 overflow-hidden"
              initial={{ opacity: 0, scale: 0.92, y: 24 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.94, y: 16 }}
              transition={{ type: 'spring', damping: 28, stiffness: 220 }}
              onClick={(e) => e.stopPropagation()}
            >
              {/* Gold top accent */}
              <div className="h-0.5 w-full bg-gradient-to-r from-transparent via-gold to-transparent" />

              <div className="p-8 text-center">
                {/* Icon */}
                <div className="mx-auto mb-6 w-16 h-16 rounded-full border border-gold/30 bg-gold/10 flex items-center justify-center">
                  <svg
                    className="w-8 h-8 text-gold"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth={1.5}
                    viewBox="0 0 24 24"
                    aria-hidden="true"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M16.5 10.5V6.75a4.5 4.5 0 1 0-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 0 0 2.25-2.25v-6.75a2.25 2.25 0 0 0-2.25-2.25H6.75a2.25 2.25 0 0 0-2.25 2.25v6.75a2.25 2.25 0 0 0 2.25 2.25Z"
                    />
                  </svg>
                </div>

                <h2
                  id="closed-title"
                  className="font-display tracking-wider text-2xl text-ink mb-4"
                >
                  {tr.title}
                </h2>

                <p className="text-ink-muted leading-relaxed mb-4">{tr.body}</p>

                <p className="text-sm text-ink-subtle italic mb-8">{tr.note}</p>

                <button
                  onClick={onClose}
                  className="btn-gold text-sm px-8 py-3"
                  autoFocus
                >
                  {tr.close}
                </button>
              </div>
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  )
}
