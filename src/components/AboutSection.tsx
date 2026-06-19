import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'
import { t, type Lang } from '../data/translations'

interface Props {
  lang: Lang
}

export function AboutSection({ lang }: Props) {
  const ref = useRef<HTMLElement>(null)
  const inView = useInView(ref, { once: true, margin: '-100px' })
  const tr = t[lang].about

  return (
    <section
      ref={ref}
      id="about"
      aria-labelledby="about-title"
      className="py-28 px-6"
    >
      <motion.div
        className="max-w-2xl mx-auto text-center"
        initial={{ opacity: 0, y: 48 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.7, ease: 'easeOut' }}
      >
        <div className="gold-divider" />

        <h2
          id="about-title"
          className="section-title text-4xl sm:text-5xl mb-6"
        >
          {tr.title}
        </h2>

        <p className="text-ink-muted text-base sm:text-lg leading-relaxed">
          {tr.body}
        </p>

        <div className="gold-divider" />
      </motion.div>
    </section>
  )
}
