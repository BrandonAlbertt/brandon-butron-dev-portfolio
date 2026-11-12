'use client'

import {
  Code,
  Layout,
  Server,
  Database,
  Gamepad2,
  Terminal,
  Cpu,
  Radio,
  Layers,
  Sparkles,
  ExternalLink,
} from 'lucide-react'
import skillsData from '@/data/skills.json'

interface SkillGroup {
  category: string
  items: string[]
}

const skills: SkillGroup[] = skillsData

const CORE_CATEGORIES = new Set(['Backend', 'Bases de Datos'])

const categoryIcons: Record<string, React.ElementType> = {
  'Programación': Code,
  Frontend: Layout,
  Backend: Server,
  'Bases de Datos': Database,
  'Desarrollo de Juegos': Gamepad2,
  'DevOps & Herramientas': Terminal,
  'Automatización & Integración': Cpu,
  'IoT & Electrónica': Radio,
  'Metodologías & Software': Layers,
}

export function Skills() {
  const totalTechnologies = skills.reduce((acc, group) => acc + group.items.length, 0)

  return (
    <section
      id="skills"
      className="studio-panel rounded-2xl p-6 sm:p-8 flex flex-col gap-6"
    >
      {/* Left-Aligned Header */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b border-border pb-5">
        <div className="space-y-1">
          <span className="text-xs font-mono font-medium text-primary">
            Stack Tecnológico
          </span>
          <h2 className="text-2xl sm:text-3xl font-bold tracking-[-0.02em] text-foreground">
            Habilidades Técnicas
          </h2>
          <p className="text-sm text-muted-foreground max-w-[65ch] leading-relaxed">
            Tecnologías aplicadas en proyectos reales, con foco principal en desarrollo backend, bases de datos y arquitectura modular.
          </p>
        </div>

        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-muted/60 border border-border text-xs font-mono text-muted-foreground tabular-nums shrink-0 self-start sm:self-auto">
          <span>{skills.length} áreas</span>
          <span aria-hidden="true">·</span>
          <span className="text-foreground font-semibold">{totalTechnologies} herramientas</span>
        </div>
      </div>

      {/* 9 Category Bento Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {skills.map((group) => {
          const Icon = categoryIcons[group.category] || Code
          const isCore = CORE_CATEGORIES.has(group.category)

          return (
            <div
              key={group.category}
              className={`group p-4 sm:p-5 rounded-xl border transition-colors duration-200 flex flex-col justify-between gap-4 ${
                isCore
                  ? 'bg-primary/[0.04] dark:bg-primary/[0.07] border-primary/35 hover:border-primary/60'
                  : 'bg-muted/30 hover:bg-muted/50 border-border hover:border-primary/30'
              }`}
            >
              <div>
                {/* Category Header */}
                <div className="flex items-start justify-between gap-2 mb-3.5">
                  <div className="flex items-center gap-2.5 min-w-0">
                    <div
                      className={`w-9 h-9 rounded-lg border flex items-center justify-center shrink-0 transition-colors duration-200 ${
                        isCore
                          ? 'bg-primary/15 border-primary/30 text-primary'
                          : 'bg-background border-border text-muted-foreground group-hover:text-primary'
                      }`}
                    >
                      <Icon className="w-4 h-4" />
                    </div>
                    <h3 className="text-sm font-semibold text-foreground leading-snug">
                      {group.category}
                    </h3>
                  </div>

                  {isCore && (
                    <span className="px-2 py-0.5 rounded-md bg-primary/10 border border-primary/25 text-xs font-mono font-medium text-primary shrink-0">
                      Core
                    </span>
                  )}
                </div>

                {/* Skills Pills */}
                <div className="flex flex-wrap gap-1.5">
                  {group.items.map((skill) => (
                    <span
                      key={skill}
                      className="px-2.5 py-1 rounded-lg bg-background border border-border text-xs font-medium text-foreground/90"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>

              {/* Footer Indicator */}
              <div className="pt-3 border-t border-border/80 flex items-center justify-between text-xs text-muted-foreground font-mono tabular-nums">
                <span>{group.items.length} tecnologías</span>
                <span
                  aria-hidden="true"
                  className={`w-1.5 h-1.5 rounded-full ${
                    isCore ? 'bg-primary' : 'bg-muted-foreground/40 group-hover:bg-primary'
                  } transition-colors`}
                />
              </div>
            </div>
          )
        })}
      </div>

      {/* Learning Banner */}
      <div className="p-4 rounded-xl bg-muted/40 border border-border flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div className="flex items-center gap-3 text-xs sm:text-sm text-muted-foreground">
          <div className="w-8 h-8 rounded-lg bg-primary/10 border border-primary/25 flex items-center justify-center text-primary shrink-0">
            <Sparkles className="w-4 h-4" />
          </div>
          <span className="leading-relaxed">
            En actualización continua en buenas prácticas backend, arquitectura limpia y automatización.
          </span>
        </div>

        <a
          href="https://github.com/BrandonAlbertt"
          target="_blank"
          rel="noopener noreferrer"
          className="shrink-0 h-9 px-3.5 rounded-lg bg-background hover:bg-muted border border-border hover:border-primary/40 text-xs font-semibold text-foreground inline-flex items-center justify-center gap-1.5 transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
        >
          <span>Actividad en GitHub</span>
          <ExternalLink className="w-3.5 h-3.5 text-primary" />
        </a>
      </div>
    </section>
  )
}
