'use client'

import { ArrowRight, FileText, Code2, Award, GraduationCap } from 'lucide-react'
import { Hero3DDesk } from './Hero3DDesk'
import { GitHubReposDropdown } from './GitHubReposDropdown'
import type { WorkspaceView } from './Sidebar'
import academicDegreesData from '@/data/titulos-academicos.json'
import certificatesData from '@/data/certificates.json'

const academicDocsCount = academicDegreesData.filter((item) => Boolean(item.documentUrl)).length
const certificatesCount = certificatesData.length

interface HeroProps {
  onNavigate?: (view: WorkspaceView) => void
  onOpenCv?: () => void
}

const techPills = [
  {
    name: 'Python',
    icon: (
      <svg className="w-4 h-4 shrink-0" viewBox="0 0 24 24" aria-hidden="true">
        <path
          d="M11.914 0C5.82 0 6.2 2.656 6.2 2.656l.006 2.752h5.814v.826H3.9S0 5.79 0 11.932c0 6.14 3.404 5.925 3.404 5.925h2.032v-2.857s-.11-3.404 3.348-3.404h5.757v-.855s.174-2.857-2.626-2.857zm-1.802 1.706a1.002 1.002 0 1 1 0 2.004 1.002 1.002 0 0 1 0-2.004z"
          fill="#3776AB"
        />
        <path
          d="M12.086 24c6.094 0 5.714-2.656 5.714-2.656l-.006-2.752H11.98v-.826h8.12s3.9.444 3.9-5.698c0-6.14-3.404-5.925-3.404-5.925h-2.032v2.857s.11 3.404-3.348 3.404H9.46v.855s-.175 2.857 2.626 2.857zm1.802-1.706a1.002 1.002 0 1 1 0-2.004 1.002 1.002 0 0 1 0 2.004z"
          fill="#FFD438"
        />
      </svg>
    ),
  },
  {
    name: 'Java',
    icon: (
      <svg className="w-4 h-4 shrink-0" viewBox="0 0 24 24" aria-hidden="true">
        <path
          d="M8.86 16.32c0 .06.05.12.08.18 1.54.4 3.52.48 5.6.22.42-.05.85-.12 1.25-.2 0-.06-.05-.13-.08-.19-1.92-.3-4.91-.3-6.85-.01zm-.74 2.8c1.78.34 4.54.34 6.88-.02.43-.07.82-.15 1.18-.25 0-.06-.04-.13-.07-.19-1.85-.29-4.88-.33-6.83-.02-.45.07-.84.15-1.16.24v.24zm8.68-1.76c-.3.07-.63.14-.99.2 1.62.9 4.3 1.22 5.67.65.37-.15.52-.35.52-.57 0-.58-1.84-.8-5.2-.28zm-8.87-4.14c-.06.08-.09.17-.09.26 1.76.35 4.58.37 6.95.03.43-.06.84-.15 1.22-.24-.04-.08-.09-.16-.14-.24-1.96-.32-4.9-.34-6.85-.01-.4.07-.77.14-1.09.2zm11.45 6.93c-.45.05-.96.09-1.5.11-2.43.08-5.46-.08-7.96-.45-.48-.07-.9-.16-1.29-.26v.29c1.93.39 4.9.43 7.39.06.85-.13 1.62-.33 2.26-.6-.35.34-.89.6-1.57.77l1.67.08z"
          fill="#F89820"
        />
        <path
          d="M13.68 1.12c.5 1.09-.27 2.08-.94 2.94-.85 1.1-1.63 2.27-1.42 3.73.23 1.58 1.64 2.68 2.62 3.86 1.12 1.34 1.53 3.09 1.15 4.8-.08.35-.38.74-.69.9-.41.22-.96.22-1.34-.05-.41-.3-.48-.82-.57-1.28-.27-1.45-.63-2.9-1.51-4.06-.99-1.31-1.68-2.83-1.67-4.49 0-1.84.86-3.49 2.06-4.86.38-.44.82-.87 1.31-1.49z"
          fill="#5382A1"
        />
      </svg>
    ),
  },
  {
    name: 'Node.js',
    icon: (
      <svg className="w-4 h-4 shrink-0" viewBox="0 0 24 24" fill="#5FA04E" aria-hidden="true">
        <path d="M12 2.5a1.5 1.5 0 0 0-.75.2l-8.25 4.76a1.5 1.5 0 0 0-.75 1.3v9.52a1.5 1.5 0 0 0 .75 1.3l8.25 4.76c.46.27 1.04.27 1.5 0l8.25-4.76a1.5 1.5 0 0 0 .75-1.3V8.76a1.5 1.5 0 0 0-.75-1.3L12.75 2.7A1.5 1.5 0 0 0 12 2.5z" />
      </svg>
    ),
  },
  {
    name: 'React',
    icon: (
      <svg
        className="w-4 h-4 shrink-0"
        viewBox="0 0 24 24"
        fill="none"
        stroke="#0ea5e9"
        strokeWidth="1.8"
        aria-hidden="true"
      >
        <ellipse cx="12" cy="12" rx="10" ry="4.2" />
        <ellipse cx="12" cy="12" rx="10" ry="4.2" transform="rotate(60 12 12)" />
        <ellipse cx="12" cy="12" rx="10" ry="4.2" transform="rotate(120 12 12)" />
        <circle cx="12" cy="12" r="1.8" fill="#0ea5e9" />
      </svg>
    ),
  },
  {
    name: 'SQL',
    icon: (
      <svg
        className="w-4 h-4 shrink-0"
        viewBox="0 0 24 24"
        fill="none"
        stroke="#38BDF8"
        strokeWidth="2"
        aria-hidden="true"
      >
        <ellipse cx="12" cy="5" rx="9" ry="3" />
        <path d="M3 5v14c0 1.66 4.03 3 9 3s9-1.34 9-3V5" />
        <path d="M3 12c0 1.66 4.03 3 9 3s9-1.34 9-3" />
      </svg>
    ),
  },
]

export function Hero({ onNavigate, onOpenCv }: HeroProps) {
  const navigateTo = (view: WorkspaceView, fallbackId: string) => {
    if (onNavigate) {
      onNavigate(view)
      return
    }
    document.getElementById(fallbackId)?.scrollIntoView({ behavior: 'smooth' })
  }

  const handleOpenCv = () => {
    if (onOpenCv) {
      onOpenCv()
      return
    }
    window.open(
      '/documentos-pdf/cv/Brandon_Alberto_Hualpa_Butron-CV.pdf',
      '_blank',
      'noopener,noreferrer'
    )
  }

  return (
    <section
      id="hero"
      className="studio-panel rounded-2xl p-4 sm:p-6 lg:p-10 relative z-20"
    >
      {/* Decorative Studio Grid (clipped to rounded corners without clipping dropdowns) */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 overflow-hidden rounded-2xl"
      >
        <div className="studio-grid-overlay absolute inset-0 opacity-60" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8 lg:gap-10 items-center relative z-10">
        {/* LEFT COLUMN */}
        <div className="lg:col-span-7 flex flex-col gap-4 sm:gap-5 justify-center">
          {/* Greeting Pill */}
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/25 text-primary text-xs font-medium w-fit max-w-full">
            <span>Hola, soy Brandon</span>
            <span aria-hidden="true">·</span>
            <span className="font-mono truncate">Bachiller en Ingeniería de Software</span>
          </div>

          {/* Main Headline */}
          <div className="space-y-1">
            <h1 className="text-3xl sm:text-4xl lg:text-6xl font-bold tracking-[-0.03em] leading-[1.08] lg:leading-[1.06] text-foreground">
              Desarrollador{' '}
              <span className="block bg-gradient-to-r from-slate-950 via-blue-700 to-cyan-700 dark:from-white dark:via-slate-200 dark:to-slate-400 bg-clip-text text-transparent">
                Backend
              </span>
            </h1>
          </div>

          {/* Subtitle */}
          <p className="text-sm sm:text-base text-muted-foreground max-w-[65ch] leading-relaxed">
            Construyo soluciones digitales con código limpio, APIs escalables, automatización e inteligencia artificial.
          </p>

          {/* Tech Badges */}
          <div className="flex flex-wrap items-center gap-2">
            {techPills.map((tech) => (
              <div
                key={tech.name}
                className="flex items-center gap-2 px-2.5 sm:px-3 py-1.5 rounded-lg bg-muted/60 border border-border text-xs font-medium text-foreground"
              >
                {tech.icon}
                <span>{tech.name}</span>
              </div>
            ))}
          </div>

          {/* Call To Action Buttons */}
          <div className="flex flex-col space-y-3 sm:space-y-0 sm:flex-row sm:flex-wrap sm:items-center sm:gap-3 pt-1">
            <button
              type="button"
              onClick={() => navigateTo('projects', 'projects')}
              className="group w-full sm:w-auto min-h-[44px] sm:min-h-0 sm:h-10 px-4 rounded-xl bg-primary hover:bg-primary/90 text-primary-foreground font-semibold text-sm flex items-center justify-center gap-2 transition-all duration-200 active:scale-[0.98] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
            >
              <span>Ver proyectos</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
            </button>

            <button
              type="button"
              onClick={handleOpenCv}
              className="w-full sm:w-auto min-h-[44px] sm:min-h-0 sm:h-10 px-4 rounded-xl bg-background hover:bg-muted text-foreground border border-border hover:border-primary/40 font-semibold text-sm transition-all duration-200 active:scale-[0.98] flex items-center justify-center gap-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
            >
              <span>Ver / Descargar CV</span>
              <FileText className="w-4 h-4 text-primary" />
            </button>

            <GitHubReposDropdown />
          </div>

          {/* Stat Counters Row */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 sm:gap-3 pt-4 border-t border-border">
            <button
              type="button"
              onClick={() => navigateTo('projects', 'projects')}
              className="flex items-center gap-3 p-3 rounded-xl bg-muted/40 hover:bg-muted/70 border border-border text-left transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
            >
              <div className="w-9 h-9 rounded-lg bg-primary/10 border border-primary/25 flex items-center justify-center text-primary shrink-0">
                <Code2 className="w-4 h-4" />
              </div>
              <div className="flex flex-col">
                <span className="text-base font-bold text-foreground tabular-nums leading-tight">
                  5+
                </span>
                <span className="text-xs text-muted-foreground font-medium">Proyectos</span>
              </div>
            </button>

            <button
              type="button"
              onClick={() => navigateTo('certificates', 'certificates')}
              className="flex items-center gap-3 p-3 rounded-xl bg-muted/40 hover:bg-muted/70 border border-border text-left transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
            >
              <div className="w-9 h-9 rounded-lg bg-primary/10 border border-primary/25 flex items-center justify-center text-primary shrink-0">
                <Award className="w-4 h-4" />
              </div>
              <div className="flex flex-col">
                <span className="text-base font-bold text-foreground tabular-nums leading-tight">
                  {certificatesCount}
                </span>
                <span className="text-xs text-muted-foreground font-medium">Certificados</span>
              </div>
            </button>

            <button
              type="button"
              onClick={() => navigateTo('about', 'academic-degrees')}
              className="flex items-center gap-2.5 sm:gap-3 p-3 rounded-xl bg-muted/40 hover:bg-muted/70 border border-border text-left transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
            >
              <div className="w-9 h-9 rounded-lg bg-primary/10 border border-primary/25 flex items-center justify-center text-primary shrink-0">
                <GraduationCap className="w-4 h-4" />
              </div>
              <div className="flex flex-col min-w-0">
                <span className="text-base font-bold text-foreground tabular-nums leading-tight">
                  {academicDocsCount}
                </span>
                <span className="text-xs text-muted-foreground font-medium leading-tight">
                  Documentos académicos
                </span>
              </div>
            </button>
          </div>
        </div>

        {/* RIGHT COLUMN: 3D Developer Desk Scene */}
        <div className="lg:col-span-5 flex justify-center items-center">
          <Hero3DDesk />
        </div>
      </div>
    </section>
  )
}
