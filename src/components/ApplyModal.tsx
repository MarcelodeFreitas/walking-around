import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion'
import { X } from 'lucide-react'
import { t, type Lang } from '../data/translations'
import { buildWhatsAppUrl, type ApplicationFormData } from '../utils/whatsapp'

interface Props {
  lang: Lang
  isOpen: boolean
  onClose: () => void
}

const EMPTY_FORM: ApplicationFormData = {
  name: '',
  age: '',
  location: '',
  role: 'rider',
  motorcycle: '',
  yearsRiding: '',
  hasLicense: 'yes',
  howFound: '',
  knowsSomeone: '',
  about: '',
  rulesAccepted: false,
}

type FormErrors = Partial<Record<keyof ApplicationFormData, string>>

export function ApplyModal({ lang, isOpen, onClose }: Props) {
  const [form, setForm] = useState<ApplicationFormData>(EMPTY_FORM)
  const [errors, setErrors] = useState<FormErrors>({})
  const prefersReduced = useReducedMotion()
  const tr = t[lang].modal
  const closeButtonRef = useRef<HTMLButtonElement>(null)
  const firstErrorRef = useRef<HTMLElement | null>(null)

  // Focus the close button when modal opens
  useEffect(() => {
    if (isOpen) {
      setTimeout(() => closeButtonRef.current?.focus(), 50)
    }
  }, [isOpen])

  // Escape key closes modal
  useEffect(() => {
    if (!isOpen) return
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
    }
    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [isOpen, onClose])

  // Lock body scroll while modal is open
  useEffect(() => {
    document.body.style.overflow = isOpen ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [isOpen])

  function update<K extends keyof ApplicationFormData>(
    key: K,
    value: ApplicationFormData[K],
  ) {
    setForm((prev) => ({ ...prev, [key]: value }))
    if (errors[key]) {
      setErrors((prev) => ({ ...prev, [key]: undefined }))
    }
  }

  function validate(): boolean {
    const newErrors: FormErrors = {}
    const requiredText = [
      'name',
      'age',
      'location',
      'motorcycle',
      'yearsRiding',
      'howFound',
      'about',
    ] as const
    for (const field of requiredText) {
      if (!form[field].trim()) {
        newErrors[field] = tr.errors.required
      }
    }
    if (form.age.trim()) {
      const age = parseInt(form.age, 10)
      if (isNaN(age) || age < 14 || age > 99) {
        newErrors.age = tr.errors.ageInvalid
      }
    }
    if (!form.rulesAccepted) {
      newErrors.rulesAccepted = tr.errors.rulesRequired
    }
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!validate()) {
      // Focus first error field
      setTimeout(() => {
        const firstError = document.querySelector('[aria-invalid="true"]') as HTMLElement | null
        firstError?.focus()
      }, 50)
      return
    }
    const url = buildWhatsAppUrl(form, lang)
    window.open(url, '_blank', 'noopener,noreferrer')
    handleClose()
  }

  function handleClose() {
    onClose()
    // Reset after animation completes
    setTimeout(() => {
      setForm(EMPTY_FORM)
      setErrors({})
    }, 300)
  }

  const inputBase =
    'w-full bg-[#1a1a1a] border rounded-xl px-4 py-3 text-ink text-sm placeholder-ink-subtle outline-none transition-all duration-200 focus:ring-1'
  const inputClass = (field: keyof ApplicationFormData) =>
    `${inputBase} ${
      errors[field]
        ? 'border-red-500/70 focus:ring-red-500/40 focus:border-red-500'
        : 'border-gray-700/60 focus:ring-gold/40 focus:border-gold/50'
    }`

  void firstErrorRef

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            className="fixed inset-0 z-40 bg-black/75 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={handleClose}
            aria-hidden="true"
          />

          {/* Modal panel */}
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-labelledby="modal-title"
            className="fixed inset-x-0 bottom-0 z-50 sm:inset-0 sm:flex sm:items-center sm:justify-center sm:p-4"
            initial={
              prefersReduced ? { opacity: 0 } : { opacity: 0, y: '100%' }
            }
            animate={prefersReduced ? { opacity: 1 } : { opacity: 1, y: 0 }}
            exit={prefersReduced ? { opacity: 0 } : { opacity: 0, y: '100%' }}
            transition={{
              type: 'spring',
              damping: 28,
              stiffness: 220,
              mass: 0.8,
            }}
          >
            <div className="relative bg-[#111111] border border-gray-800 rounded-t-3xl sm:rounded-3xl w-full sm:max-w-2xl max-h-[92dvh] overflow-y-auto">

              {/* Gold top accent line */}
              <div
                className="absolute top-0 inset-x-0 h-px rounded-t-3xl"
                style={{
                  background: 'linear-gradient(to right, transparent, rgba(201,160,32,0.6), transparent)',
                }}
                aria-hidden="true"
              />

              {/* Header */}
              <div className="sticky top-0 z-10 bg-[#111111]/95 backdrop-blur-md border-b border-gray-800/60 px-6 py-4 flex items-center justify-between rounded-t-3xl">
                <div>
                  <h2
                    id="modal-title"
                    className="font-display text-2xl tracking-wider text-ink"
                  >
                    {tr.title}
                  </h2>
                  <p className="text-ink-subtle text-xs mt-0.5">
                    {tr.subtitle}
                  </p>
                </div>
                <button
                  ref={closeButtonRef}
                  onClick={handleClose}
                  className="p-2 rounded-full text-ink-subtle hover:text-ink hover:bg-white/5 transition-colors duration-200 cursor-pointer"
                  aria-label={lang === 'pt' ? 'Fechar' : 'Close'}
                >
                  <X size={20} />
                </button>
              </div>

              {/* Form */}
              <form
                onSubmit={handleSubmit}
                noValidate
                className="px-6 py-6 space-y-5"
                aria-label={tr.title}
              >
                {/* Name */}
                <div>
                  <label
                    className="block text-ink-muted text-xs mb-1.5 font-medium"
                    htmlFor="apply-name"
                  >
                    {tr.fields.name} <span className="text-gold" aria-hidden="true">*</span>
                  </label>
                  <input
                    id="apply-name"
                    type="text"
                    value={form.name}
                    onChange={(e) => update('name', e.target.value)}
                    className={inputClass('name')}
                    placeholder="João Silva"
                    autoComplete="name"
                    aria-required="true"
                    aria-invalid={errors.name ? 'true' : undefined}
                    aria-describedby={errors.name ? 'err-name' : undefined}
                  />
                  {errors.name && (
                    <p id="err-name" className="text-red-400 text-xs mt-1.5" role="alert">
                      {errors.name}
                    </p>
                  )}
                </div>

                {/* Age + Location */}
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label
                      className="block text-ink-muted text-xs mb-1.5 font-medium"
                      htmlFor="apply-age"
                    >
                      {tr.fields.age} <span className="text-gold" aria-hidden="true">*</span>
                    </label>
                    <input
                      id="apply-age"
                      type="number"
                      inputMode="numeric"
                      value={form.age}
                      onChange={(e) => update('age', e.target.value)}
                      className={inputClass('age')}
                      placeholder="28"
                      min="14"
                      max="99"
                      aria-required="true"
                      aria-invalid={errors.age ? 'true' : undefined}
                      aria-describedby={errors.age ? 'err-age' : undefined}
                    />
                    {errors.age && (
                      <p id="err-age" className="text-red-400 text-xs mt-1.5" role="alert">
                        {errors.age}
                      </p>
                    )}
                  </div>
                  <div>
                    <label
                      className="block text-ink-muted text-xs mb-1.5 font-medium"
                      htmlFor="apply-location"
                    >
                      {tr.fields.location} <span className="text-gold" aria-hidden="true">*</span>
                    </label>
                    <input
                      id="apply-location"
                      type="text"
                      value={form.location}
                      onChange={(e) => update('location', e.target.value)}
                      className={inputClass('location')}
                      placeholder="Lisboa"
                      aria-required="true"
                      aria-invalid={errors.location ? 'true' : undefined}
                      aria-describedby={errors.location ? 'err-location' : undefined}
                    />
                    {errors.location && (
                      <p id="err-location" className="text-red-400 text-xs mt-1.5" role="alert">
                        {errors.location}
                      </p>
                    )}
                  </div>
                </div>

                {/* Role */}
                <div>
                  <label
                    className="block text-ink-muted text-xs mb-1.5 font-medium"
                    htmlFor="apply-role"
                  >
                    {tr.fields.role}
                  </label>
                  <select
                    id="apply-role"
                    value={form.role}
                    onChange={(e) =>
                      update('role', e.target.value as ApplicationFormData['role'])
                    }
                    className={`${inputClass('role')} cursor-pointer`}
                  >
                    <option value="rider">{tr.fields.roleOptions.rider}</option>
                    <option value="passenger">{tr.fields.roleOptions.passenger}</option>
                    <option value="supporter">{tr.fields.roleOptions.supporter}</option>
                  </select>
                </div>

                {/* Motorcycle */}
                <div>
                  <label
                    className="block text-ink-muted text-xs mb-1.5 font-medium"
                    htmlFor="apply-motorcycle"
                  >
                    {tr.fields.motorcycle} <span className="text-gold" aria-hidden="true">*</span>
                  </label>
                  <input
                    id="apply-motorcycle"
                    type="text"
                    value={form.motorcycle}
                    onChange={(e) => update('motorcycle', e.target.value)}
                    className={inputClass('motorcycle')}
                    placeholder="Honda CB500F"
                    aria-required="true"
                    aria-invalid={errors.motorcycle ? 'true' : undefined}
                    aria-describedby={errors.motorcycle ? 'err-motorcycle' : undefined}
                  />
                  {errors.motorcycle && (
                    <p id="err-motorcycle" className="text-red-400 text-xs mt-1.5" role="alert">
                      {errors.motorcycle}
                    </p>
                  )}
                </div>

                {/* Years riding + License */}
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label
                      className="block text-ink-muted text-xs mb-1.5 font-medium"
                      htmlFor="apply-years"
                    >
                      {tr.fields.yearsRiding} <span className="text-gold" aria-hidden="true">*</span>
                    </label>
                    <input
                      id="apply-years"
                      type="number"
                      inputMode="numeric"
                      value={form.yearsRiding}
                      onChange={(e) => update('yearsRiding', e.target.value)}
                      className={inputClass('yearsRiding')}
                      placeholder="3"
                      min="0"
                      max="70"
                      aria-required="true"
                      aria-invalid={errors.yearsRiding ? 'true' : undefined}
                      aria-describedby={errors.yearsRiding ? 'err-years' : undefined}
                    />
                    {errors.yearsRiding && (
                      <p id="err-years" className="text-red-400 text-xs mt-1.5" role="alert">
                        {errors.yearsRiding}
                      </p>
                    )}
                  </div>
                  <div>
                    <label
                      className="block text-ink-muted text-xs mb-1.5 font-medium"
                      htmlFor="apply-license"
                    >
                      {tr.fields.hasLicense}
                    </label>
                    <select
                      id="apply-license"
                      value={form.hasLicense}
                      onChange={(e) =>
                        update(
                          'hasLicense',
                          e.target.value as ApplicationFormData['hasLicense'],
                        )
                      }
                      className={`${inputClass('hasLicense')} cursor-pointer`}
                    >
                      <option value="yes">{tr.fields.hasLicenseOptions.yes}</option>
                      <option value="no">{tr.fields.hasLicenseOptions.no}</option>
                    </select>
                  </div>
                </div>

                {/* How found */}
                <div>
                  <label
                    className="block text-ink-muted text-xs mb-1.5 font-medium"
                    htmlFor="apply-how-found"
                  >
                    {tr.fields.howFound} <span className="text-gold" aria-hidden="true">*</span>
                  </label>
                  <input
                    id="apply-how-found"
                    type="text"
                    value={form.howFound}
                    onChange={(e) => update('howFound', e.target.value)}
                    className={inputClass('howFound')}
                    placeholder={tr.fields.howFoundPlaceholder}
                    aria-required="true"
                    aria-invalid={errors.howFound ? 'true' : undefined}
                    aria-describedby={errors.howFound ? 'err-how-found' : undefined}
                  />
                  {errors.howFound && (
                    <p id="err-how-found" className="text-red-400 text-xs mt-1.5" role="alert">
                      {errors.howFound}
                    </p>
                  )}
                </div>

                {/* Knows someone (optional) */}
                <div>
                  <label
                    className="block text-ink-muted text-xs mb-1.5 font-medium"
                    htmlFor="apply-knows"
                  >
                    {tr.fields.knowsSomeone}
                  </label>
                  <input
                    id="apply-knows"
                    type="text"
                    value={form.knowsSomeone}
                    onChange={(e) => update('knowsSomeone', e.target.value)}
                    className={inputClass('knowsSomeone')}
                    placeholder={tr.fields.knowsSomeonePlaceholder}
                    autoComplete="off"
                  />
                </div>

                {/* About */}
                <div>
                  <label
                    className="block text-ink-muted text-xs mb-1.5 font-medium"
                    htmlFor="apply-about"
                  >
                    {tr.fields.about} <span className="text-gold" aria-hidden="true">*</span>
                  </label>
                  <textarea
                    id="apply-about"
                    value={form.about}
                    onChange={(e) => update('about', e.target.value)}
                    className={`${inputClass('about')} resize-none`}
                    rows={4}
                    placeholder={tr.fields.aboutPlaceholder}
                    aria-required="true"
                    aria-invalid={errors.about ? 'true' : undefined}
                    aria-describedby={errors.about ? 'err-about' : undefined}
                  />
                  {errors.about && (
                    <p id="err-about" className="text-red-400 text-xs mt-1.5" role="alert">
                      {errors.about}
                    </p>
                  )}
                </div>

                {/* Rules checkbox */}
                <div
                  className={`flex items-start gap-3 p-4 rounded-2xl border transition-colors duration-200 ${
                    errors.rulesAccepted
                      ? 'border-red-500/50 bg-red-500/5'
                      : 'border-gray-800 bg-surface/60'
                  }`}
                >
                  <input
                    id="apply-rules"
                    type="checkbox"
                    checked={form.rulesAccepted}
                    onChange={(e) => update('rulesAccepted', e.target.checked)}
                    className="mt-0.5 w-4 h-4 rounded cursor-pointer accent-gold shrink-0"
                    aria-required="true"
                    aria-invalid={errors.rulesAccepted ? 'true' : undefined}
                    aria-describedby={errors.rulesAccepted ? 'err-rules' : undefined}
                  />
                  <label
                    htmlFor="apply-rules"
                    className="text-ink-muted text-sm cursor-pointer leading-snug"
                  >
                    {tr.fields.rulesAccept}
                  </label>
                </div>
                {errors.rulesAccepted && (
                  <p id="err-rules" className="text-red-400 text-xs -mt-3" role="alert">
                    {errors.rulesAccepted}
                  </p>
                )}

                {/* Privacy note */}
                <p className="text-ink-subtle text-xs leading-relaxed italic px-1 border-l-2 border-gray-800 pl-3">
                  {tr.privacyNote}
                </p>

                {/* Submit */}
                <button type="submit" className="btn-gold w-full mt-2">
                  {tr.submit}
                </button>

                {/* Bottom padding for mobile */}
                <div className="h-2" aria-hidden="true" />
              </form>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}
