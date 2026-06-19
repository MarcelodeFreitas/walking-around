import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'
import { Lock } from 'lucide-react'
import { t, type Lang } from '../data/translations'

interface Props {
  lang: Lang
}

export function HowItWorksSection({ lang }: Props) {
  const ref = useRef<HTMLElement>(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })
  const tr = t[lang].howItWorks

  return (
    <section
      ref={ref}
      id="how-it-works"
      aria-labelledby="how-title"
      className="py-24 px-6 bg-surface/40"
    >
      <div className="section-container">
        <motion.h2
          id="how-title"
          className="section-title text-4xl sm:text-5xl text-center mb-14"
          initial={{ opacity: 0, y: 32 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          {tr.title}
        </motion.h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          {tr.steps.map((step, i) => (
            <motion.div
              key={i}
              className="card-premium relative overflow-hidden"
              initial={{ opacity: 0, y: 36 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: i * 0.1 }}
            >
              {/* Ghost step number */}
              <span
                className="absolute top-3 right-4 font-display text-6xl leading-none select-none pointer-events-none"
                style={{ color: 'rgba(201,160,32,0.12)' }}
                aria-hidden="true"
              >
                {String(i + 1).padStart(2, '0')}
              </span>

              {/* Gold accent bar */}
              <div
                className="absolute top-0 left-0 w-1 h-full rounded-l-2xl"
                style={{
                  background:
                    'linear-gradient(to bottom, #C9A020, rgba(201,160,32,0.2))',
                }}
                aria-hidden="true"
              />

              <div className="pl-4">
                <h3 className="font-display text-2xl tracking-wide text-ink mb-2 pr-10">
                  {step.title}
                </h3>
                <p className="text-ink-muted text-sm leading-relaxed">
                  {step.body}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Private group notice */}
        <motion.div
          className="mt-10 flex items-start gap-3 max-w-lg mx-auto text-center justify-center"
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ delay: 0.55, duration: 0.6 }}
        >
          <Lock
            size={14}
            className="text-gold/60 shrink-0 mt-0.5"
            aria-hidden="true"
          />
          <p className="text-ink-subtle text-xs leading-relaxed">
            {tr.privateNote}
          </p>
        </motion.div>
      </div>
    </section>
  )
}
