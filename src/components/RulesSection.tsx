import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'
import { Check } from 'lucide-react'
import { t, type Lang } from '../data/translations'

interface Props {
  lang: Lang
}

export function RulesSection({ lang }: Props) {
  const ref = useRef<HTMLElement>(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })
  const tr = t[lang].rules

  return (
    <section
      ref={ref}
      id="rules"
      aria-labelledby="rules-title"
      className="py-24 px-6"
    >
      <div className="section-container">
        <motion.div
          className="carbon-bg rounded-3xl border border-gray-800 p-8 sm:p-12"
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <h2
            id="rules-title"
            className="section-title text-4xl sm:text-5xl text-center mb-4"
          >
            {tr.title}
          </h2>

          <p className="text-ink-muted text-sm text-center mb-10 max-w-lg mx-auto leading-relaxed">
            {tr.intro}
          </p>

          <ul className="space-y-5" role="list">
            {tr.items.map((rule, i) => (
              <motion.li
                key={i}
                className="flex items-start gap-4"
                initial={{ opacity: 0, x: -24 }}
                animate={inView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.4, delay: 0.15 + i * 0.07 }}
              >
                <span
                  className="mt-0.5 flex items-center justify-center w-5 h-5 rounded-full shrink-0"
                  style={{ background: 'rgba(201,160,32,0.15)' }}
                  aria-hidden="true"
                >
                  <Check size={12} className="text-gold" />
                </span>
                <span className="text-ink-muted text-sm leading-relaxed">
                  {rule}
                </span>
              </motion.li>
            ))}
          </ul>
        </motion.div>
      </div>
    </section>
  )
}
