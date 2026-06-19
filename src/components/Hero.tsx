import { motion, useReducedMotion } from 'framer-motion'
import { t, type Lang } from '../data/translations'

interface Props {
  lang: Lang
  onApply: () => void
}

export function Hero({ lang, onApply }: Props) {
  const prefersReduced = useReducedMotion()
  const tr = t[lang].hero
  const logoSrc = `${import.meta.env.BASE_URL}assets/wa-logo.jpeg`
  const videoSrc = `${import.meta.env.BASE_URL}assets/hero-bg.mp4`

  return (
    <section
      className="relative min-h-dvh flex flex-col items-center justify-center overflow-hidden bg-[#0A0A0A]"
      aria-label="Walking Around — Hero"
    >
      {/* Video background — hidden for reduced-motion, static bg-[#0A0A0A] shows instead */}
      {!prefersReduced && (
        <video
          className="absolute inset-0 w-full h-full object-cover"
          src={videoSrc}
          autoPlay
          muted
          loop
          playsInline
          aria-hidden="true"
        />
      )}

      {/* Gradient overlay — darkens edges, preserves cinematic feel */}
      <div
        className="absolute inset-0 pointer-events-none"
        aria-hidden="true"
        style={{
          background:
            'linear-gradient(to bottom, rgba(0,0,0,0.52) 0%, rgba(0,0,0,0.28) 40%, rgba(0,0,0,0.28) 60%, rgba(10,10,10,0.82) 100%)',
        }}
      />

      {/* Centre radial glow behind logo */}
      <div
        className="absolute inset-0 pointer-events-none"
        aria-hidden="true"
        style={{
          background:
            'radial-gradient(ellipse 50% 40% at 50% 46%, rgba(201,160,32,0.10) 0%, transparent 70%)',
        }}
      />

      {/* Logo */}
      <motion.div
        className="relative z-10 animate-glow-pulse rounded-full"
        initial={prefersReduced ? {} : { opacity: 0, scale: 0.78 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
      >
        <img
          src={logoSrc}
          alt="Walking Around — We Ride Together, We're Family"
          className="w-52 h-52 xs:w-64 xs:h-64 sm:w-72 sm:h-72 md:w-80 md:h-80 rounded-full object-cover"
          width={320}
          height={320}
          fetchPriority="high"
        />
      </motion.div>

      {/* Tagline */}
      <motion.p
        className="relative z-10 mt-8 max-w-sm sm:max-w-md text-center text-ink-muted text-base sm:text-lg leading-relaxed px-8"
        initial={prefersReduced ? {} : { opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: 'easeOut', delay: 0.75 }}
      >
        {tr.tagline}
      </motion.p>

      {/* CTA */}
      <motion.div
        className="relative z-10 mt-10"
        initial={prefersReduced ? {} : { opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: 'easeOut', delay: 1.05 }}
      >
        <button onClick={onApply} className="btn-gold">
          {tr.cta}
        </button>
      </motion.div>

      {/* Scroll indicator */}
      <motion.button
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 z-10 cursor-pointer group"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.8, duration: 0.8 }}
        aria-label="Scroll para baixo"
        onClick={() => document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' })}
      >
        <span className="font-display tracking-[0.3em] text-xs text-gold/70 group-hover:text-gold transition-colors duration-300">
          SCROLL
        </span>
        <div className="relative flex flex-col items-center">
          <motion.svg
            className="w-6 h-6 text-gold/50 group-hover:text-gold/80 transition-colors duration-300"
            fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24"
            aria-hidden="true"
            animate={prefersReduced ? {} : { y: [0, 6, 0], opacity: [0.5, 1, 0.5] }}
            transition={{ repeat: Infinity, duration: 1.6, ease: 'easeInOut' }}
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="m19 9-7 7-7-7" />
          </motion.svg>
          <motion.svg
            className="w-6 h-6 text-gold/25 group-hover:text-gold/50 transition-colors duration-300 -mt-3"
            fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24"
            aria-hidden="true"
            animate={prefersReduced ? {} : { y: [0, 6, 0], opacity: [0.2, 0.6, 0.2] }}
            transition={{ repeat: Infinity, duration: 1.6, ease: 'easeInOut', delay: 0.25 }}
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="m19 9-7 7-7-7" />
          </motion.svg>
        </div>
      </motion.button>
    </section>
  )
}
