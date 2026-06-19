import { useState } from 'react'
import { detectLanguage, persistLanguage } from './utils/language'
import type { Lang } from './data/translations'
import { Hero } from './components/Hero'
import { AboutSection } from './components/AboutSection'
import { HowItWorksSection } from './components/HowItWorksSection'
import { RulesSection } from './components/RulesSection'
import { GallerySection } from './components/GallerySection'
import { ApplyModal } from './components/ApplyModal'
import { ClosedGroupNotice } from './components/ClosedGroupNotice'
import { Footer } from './components/Footer'

export default function App() {
  const [lang, setLang] = useState<Lang>(detectLanguage)
  const [closedOpen, setClosedOpen] = useState(false)
  // Keep applyOpen wired for future reactivation — swap onApply below to open this instead
  const [applyOpen, setApplyOpen] = useState(false)

  function handleLangToggle(newLang: Lang) {
    setLang(newLang)
    persistLanguage(newLang)
  }

  void handleLangToggle // suppress unused warning until toggle is re-enabled

  return (
    <>
      <main>
        <Hero lang={lang} onApply={() => setClosedOpen(true)} />
        <AboutSection lang={lang} />
        <HowItWorksSection lang={lang} />
        <RulesSection lang={lang} />
        <GallerySection lang={lang} />
      </main>
      <Footer lang={lang} />
      <ClosedGroupNotice
        lang={lang}
        isOpen={closedOpen}
        onClose={() => setClosedOpen(false)}
      />
      <ApplyModal
        lang={lang}
        isOpen={applyOpen}
        onClose={() => setApplyOpen(false)}
      />
    </>
  )
}
