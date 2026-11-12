'use client'

import { Briefcase, CheckCircle2, ArrowRight, MessageSquare } from 'lucide-react'
import type { WorkspaceView } from './Sidebar'

interface CurrentGoalsProps {
  onNavigate?: (view: WorkspaceView) => void
}

const focusItems = [
  'APIs REST',
  'Java & Spring Boot',
  'Node.js',
  'Python',
  'Bases de Datos',
  'Docker & Linux',
]

export function CurrentGoals({ onNavigate }: CurrentGoalsProps) {
  const handleContact = () => {
    if (onNavigate) {
      onNavigate('contact')
      return
    }
    document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <section
      id="current-goals"
      className="studio-panel rounded-2xl p-4 sm:p-6 border-l-2 border-l-primary"
    >
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 lg:gap-6">
        <div className="space-y-3 max-w-3xl">
          <div className="flex flex-wrap items-center gap-2.5 sm:gap-3">
            <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/25 text-emerald-700 dark:text-emerald-300 text-xs font-medium">
              <span className="w-2 h-2 rounded-full bg-emerald-500" />
              <span>Disponible para contratación inmediata</span>
            </span>
            <h2 className="text-lg sm:text-xl font-semibold tracking-tight text-foreground">
              Lo que busco actualmente
            </h2>
          </div>

          <p className="text-sm text-muted-foreground leading-relaxed max-w-[65ch]">
            Busco oportunidades como{' '}
            <strong className="font-semibold text-foreground">
              Backend Developer Junior o Practicante
            </strong>
            , preparado para aportar en desarrollo backend, diseño de APIs, bases de datos y automatización dentro de equipos de ingeniería.
          </p>

          <div className="flex flex-wrap gap-2 pt-0.5">
            {focusItems.map((item) => (
              <span
                key={item}
                className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-muted/60 border border-border text-xs font-medium text-foreground"
              >
                <CheckCircle2 className="w-3.5 h-3.5 text-primary shrink-0" />
                <span>{item}</span>
              </span>
            ))}
          </div>
        </div>

        {/* Direct Action Buttons */}
        <div className="flex flex-col sm:flex-row lg:flex-col gap-2.5 w-full sm:w-auto shrink-0">
          <button
            type="button"
            onClick={handleContact}
            className="w-full sm:w-auto min-h-[44px] sm:min-h-0 sm:h-10 px-4 rounded-xl bg-primary hover:bg-primary/90 text-primary-foreground font-semibold text-sm flex items-center justify-center gap-2 transition-all duration-200 active:scale-[0.98] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
          >
            <Briefcase className="w-4 h-4" />
            <span>Contactar para vacante</span>
            <ArrowRight className="w-4 h-4" />
          </button>

          <a
            href="https://wa.me/51924516682?text=Hola%20Brandon,%20vi%20tu%20portafolio%20y%20me%20gustar%C3%ADa%20conversar%20sobre%20una%20oportunidad%20laboral"
            target="_blank"
            rel="noopener noreferrer"
            className="w-full sm:w-auto min-h-[44px] sm:min-h-0 sm:h-10 px-4 rounded-xl bg-background hover:bg-muted border border-border hover:border-primary/40 text-foreground font-semibold text-sm flex items-center justify-center gap-2 transition-all duration-200 active:scale-[0.98] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
          >
            <MessageSquare className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
            <span>Escribir por WhatsApp</span>
          </a>
        </div>
      </div>
    </section>
  )
}
