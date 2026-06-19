import { useState } from 'react'
import { Hero } from './components/Hero'
import { AboutSection } from './components/AboutSection'
import { HowItWorksSection } from './components/HowItWorksSection'
import { RulesSection } from './components/RulesSection'
import { GallerySection } from './components/GallerySection'
import { ApplyModal } from './components/ApplyModal'
import { ClosedGroupNotice } from './components/ClosedGroupNotice'
import { Footer } from './components/Footer'

const lang = 'pt' as const

export default function App() {
  const [closedOpen, setClosedOpen] = useState(false)
  const [applyOpen, setApplyOpen] = useState(false)

  return (
    <>
      <main>
        <Hero lang={lang} onApply={() => setClosedOpen(true)} />
        <AboutSection lang={lang} />
        <GallerySection lang={lang} />
        <HowItWorksSection lang={lang} />
        <RulesSection lang={lang} />
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
