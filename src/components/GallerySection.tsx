import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'
import { Camera } from 'lucide-react'
import { t, type Lang } from '../data/translations'
import { GALLERY_IMAGES } from '../data/gallery'

interface Props {
  lang: Lang
}

export function GallerySection({ lang }: Props) {
  const ref = useRef<HTMLElement>(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })
  const tr = t[lang].gallery
  const base = import.meta.env.BASE_URL

  return (
    <section
      ref={ref}
      id="gallery"
      aria-labelledby="gallery-title"
      className="py-24 px-6 bg-surface/30"
    >
      <motion.h2
        id="gallery-title"
        className="section-title text-4xl sm:text-5xl text-center mb-12"
        initial={{ opacity: 0, y: 28 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.6 }}
      >
        {tr.title}
      </motion.h2>

      {GALLERY_IMAGES.length === 0 ? (
        <motion.div
          className="flex flex-col items-center justify-center gap-5 py-16 border border-dashed border-gray-800 rounded-3xl max-w-sm mx-auto"
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ delay: 0.2, duration: 0.6 }}
        >
          <Camera
            size={40}
            className="text-gold/30"
            aria-hidden="true"
          />
          <div className="text-center px-8">
            <h3 className="font-display text-xl tracking-wide text-ink/50 mb-2">
              {tr.emptyTitle}
            </h3>
            <p className="text-ink-subtle text-xs leading-relaxed">
              {tr.emptyBody}
            </p>
          </div>
          {/* Placeholder card row */}
          <div className="flex gap-3 mt-1" aria-hidden="true">
            {[0, 1, 2].map((i) => (
              <div
                key={i}
                className="w-14 h-14 rounded-xl border border-gray-800"
                style={{ background: 'rgba(201,160,32,0.04)' }}
              />
            ))}
          </div>
        </motion.div>
      ) : (
        <div
          className="overflow-x-auto pb-4 -mx-6 px-6"
          role="list"
          aria-label={tr.title}
        >
          <motion.div
            className="flex gap-4 w-max"
            initial={{ opacity: 0, x: 48 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7 }}
          >
            {GALLERY_IMAGES.map((src, i) => (
              <motion.div
                key={i}
                role="listitem"
                className="relative w-72 h-48 sm:w-96 sm:h-60 shrink-0 rounded-2xl overflow-hidden border border-gray-800"
                whileHover={{ scale: 1.02, borderColor: 'rgba(201,160,32,0.4)' }}
                transition={{ duration: 0.25 }}
              >
                <img
                  src={`${base}${src}`}
                  alt={`Momento ${i + 1}`}
                  className="w-full h-full object-cover"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
              </motion.div>
            ))}
          </motion.div>
        </div>
      )}
    </section>
  )
}
