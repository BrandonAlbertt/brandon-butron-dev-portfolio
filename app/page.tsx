'use client'

import { useState, useEffect, useCallback } from 'react'
import { Terminal } from 'lucide-react'
import { Sidebar, WORKSPACE_NAV_ITEMS, type WorkspaceView } from '@/components/Sidebar'
import { DocumentModal } from '@/components/DocumentModal'
import { CvQuickButton } from '@/components/CvQuickButton'
import { CV_DOCUMENT } from '@/lib/cv-document'
import { Hero } from '@/components/Hero'
import { About } from '@/components/About'
import { CurrentGoals } from '@/components/CurrentGoals'
import { Skills } from '@/components/Skills'
import { ProjectsGrid } from '@/components/ProjectsGrid'
import { GitHub3DCube } from '@/components/GitHub3DCube'
import { CertificatesGrid } from '@/components/CertificatesGrid'
import { AcademicDegrees } from '@/components/AcademicDegrees'
import { Education } from '@/components/Education'
import { Contact } from '@/components/Contact'
import { Footer } from '@/components/Footer'

const HASH_TO_VIEW: Record<string, { view: WorkspaceView; subTarget?: string }> = {
  '#hero': { view: 'overview' },
  '#overview': { view: 'overview' },
  '#current-goals': { view: 'overview', subTarget: 'current-goals' },
  '#about': { view: 'about' },
  '#education': { view: 'about', subTarget: 'education' },
  '#academic-degrees': { view: 'about', subTarget: 'academic-degrees' },
  '#skills': { view: 'skills' },
  '#github-3d': { view: 'skills', subTarget: 'github-3d' },
  '#projects': { view: 'projects' },
  '#certificates': { view: 'certificates' },
  '#contact': { view: 'contact' },
}

const VIEW_TO_HASH: Record<WorkspaceView, string> = {
  overview: '#hero',
  about: '#about',
  skills: '#skills',
  projects: '#projects',
  certificates: '#certificates',
  contact: '#contact',
}

export default function Home() {
  const [activeView, setActiveView] = useState<WorkspaceView>('overview')
  const [isCvModalOpen, setIsCvModalOpen] = useState(false)

  const scrollToSubTarget = useCallback((subTarget?: string) => {
    const prefersReduced =
      typeof window !== 'undefined' &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches

    if (subTarget) {
      requestAnimationFrame(() => {
        const element = document.getElementById(subTarget)
        if (element) {
          element.scrollIntoView({ behavior: prefersReduced ? 'auto' : 'smooth' })
        }
      })
      return
    }

    window.scrollTo({ top: 0, behavior: prefersReduced ? 'auto' : 'smooth' })
  }, [])

  const applyHashRoute = useCallback(
    (hash: string) => {
      const normalized = hash.toLowerCase()
      const mapped = HASH_TO_VIEW[normalized]
      if (!mapped) return

      setActiveView(mapped.view)
      scrollToSubTarget(mapped.subTarget)
    },
    [scrollToSubTarget]
  )

  const handleSelectView = useCallback(
    (view: WorkspaceView) => {
      setActiveView(view)
      const nextHash = VIEW_TO_HASH[view]
      if (typeof window !== 'undefined' && window.location.hash !== nextHash) {
        window.history.replaceState(null, '', nextHash)
      }
      scrollToSubTarget()
    },
    [scrollToSubTarget]
  )

  useEffect(() => {
    if (window.location.hash) {
      applyHashRoute(window.location.hash)
    }

    const handleHashChange = () => {
      applyHashRoute(window.location.hash)
    }

    window.addEventListener('hashchange', handleHashChange)
    return () => window.removeEventListener('hashchange', handleHashChange)
  }, [applyHashRoute])

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (isCvModalOpen) return
      if (event.metaKey || event.ctrlKey || event.altKey) return

      const target = event.target as HTMLElement | null
      if (
        target &&
        (target.tagName === 'INPUT' ||
          target.tagName === 'TEXTAREA' ||
          target.tagName === 'SELECT' ||
          target.isContentEditable)
      ) {
        return
      }

      const matchedItem = WORKSPACE_NAV_ITEMS.find((item) => item.shortcut === event.key)
      if (matchedItem) {
        event.preventDefault()
        handleSelectView(matchedItem.id)
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [handleSelectView, isCvModalOpen])

  const activeMeta =
    WORKSPACE_NAV_ITEMS.find((item) => item.id === activeView) ?? WORKSPACE_NAV_ITEMS[0]

  return (
    <div className="relative min-h-screen bg-background text-foreground transition-colors duration-300 overflow-x-hidden">
      {/* Persistent Navigation: Fixed Sidebar on Desktop, Sticky Header on Mobile */}
      <Sidebar activeView={activeView} onSelectView={handleSelectView} />

      {/* Main Workspace Area */}
      <div className="lg:pl-64 flex flex-col min-h-screen w-full transition-all duration-300">
        {/* Top Workspace Bar */}
        <div className="lg:sticky lg:top-0 z-30 h-14 border-b border-border bg-background/85 backdrop-blur-md">
          <div className="max-w-7xl mx-auto h-full px-4 sm:px-6 lg:px-8 flex items-center justify-between gap-4">
            <div className="flex items-center gap-2.5 min-w-0">
              <Terminal className="w-4 h-4 text-primary shrink-0" />
              <div className="flex items-center gap-1.5 text-xs sm:text-sm font-mono truncate">
                <span className="text-muted-foreground">brandonbutron.dev</span>
                <span className="text-muted-foreground/60">/</span>
                <span className="font-semibold text-foreground">{activeMeta.name}</span>
              </div>
              <span className="hidden md:inline text-xs text-muted-foreground border-l border-border pl-2.5 truncate">
                {activeMeta.description}
              </span>
            </div>

            <div className="flex items-center gap-3 shrink-0">
              <div className="hidden sm:inline-flex items-center gap-2 px-2.5 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/25 text-xs font-medium text-emerald-700 dark:text-emerald-300">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                <span>Disponible · Backend Junior</span>
              </div>

              <span className="hidden xl:inline-flex items-center gap-1 text-xs font-mono text-muted-foreground">
                Atajos <kbd className="px-1.5 py-0.5 rounded bg-muted border border-border">1–6</kbd>
              </span>

              <CvQuickButton onClick={() => setIsCvModalOpen(true)} />
            </div>
          </div>
        </div>

        {/* Dynamic Workspace View Container */}
        <main id="workspace-content" className="flex-1 w-full">
          <div
            key={activeView}
            className="workspace-view-enter max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 lg:py-8"
          >
            {activeView === 'overview' && (
              <div className="space-y-6">
                <Hero onNavigate={handleSelectView} onOpenCv={() => setIsCvModalOpen(true)} />
                <CurrentGoals onNavigate={handleSelectView} />
              </div>
            )}

            {activeView === 'about' && (
              <div className="space-y-6">
                <About />
                <Education />
                <AcademicDegrees />
              </div>
            )}

            {activeView === 'skills' && (
              <div className="grid grid-cols-1 xl:grid-cols-12 gap-6 items-start">
                <div className="xl:col-span-8">
                  <Skills />
                </div>
                <aside
                  id="github-3d"
                  className="xl:col-span-4 studio-panel rounded-2xl p-6 xl:sticky xl:top-20"
                >
                  <GitHub3DCube />
                </aside>
              </div>
            )}

            {activeView === 'projects' && <ProjectsGrid />}

            {activeView === 'certificates' && <CertificatesGrid />}

            {activeView === 'contact' && (
              <div className="space-y-6">
                <Contact />
                <Footer onNavigate={handleSelectView} />
              </div>
            )}
          </div>
        </main>
      </div>

      <DocumentModal
        isOpen={isCvModalOpen}
        onClose={() => setIsCvModalOpen(false)}
        document={CV_DOCUMENT}
      />
    </div>
  )
}
