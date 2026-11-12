'use client'

import { GraduationCap, Calendar, MapPin, CheckCircle2 } from 'lucide-react'

const specializationAreas = [
  'Backend',
  'APIs REST',
  'Bases de Datos',
  'Linux',
  'Cloud',
  'DevOps & Docker',
]

export function Education() {
  return (
    <section
      id="education"
      className="studio-panel rounded-2xl p-6 sm:p-7 h-full flex flex-col justify-between gap-6"
    >
      <div className="space-y-5">
        {/* Header */}
        <div className="flex items-start justify-between gap-4">
          <div className="flex items-start gap-3.5">
            <div className="w-11 h-11 rounded-xl bg-primary/10 border border-primary/25 flex items-center justify-center shrink-0 text-primary">
              <GraduationCap className="w-5 h-5" />
            </div>

            <div>
              <span className="text-xs font-mono font-medium text-primary">
                Formación Profesional
              </span>
              <h2 className="text-xl sm:text-2xl font-bold tracking-[-0.02em] text-foreground mt-0.5">
                Ingeniería de Software
              </h2>
              <p className="text-sm font-medium text-muted-foreground">
                Universidad Tecnológica del Perú (UTP) · Lima Centro
              </p>
            </div>
          </div>

          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/25 text-emerald-700 dark:text-emerald-300 text-xs font-medium shrink-0">
            <CheckCircle2 className="w-3.5 h-3.5" />
            <span>Bachiller</span>
          </span>
        </div>

        {/* Metadata Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <div className="flex items-center gap-3 p-3 rounded-xl bg-muted/40 border border-border">
            <Calendar className="w-4 h-4 text-primary shrink-0" />
            <div>
              <p className="text-xs text-muted-foreground">Período de estudio</p>
              <p className="text-sm font-semibold font-mono tabular-nums text-foreground">
                2019 – 2025
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3 p-3 rounded-xl bg-muted/40 border border-border">
            <MapPin className="w-4 h-4 text-primary shrink-0" />
            <div>
              <p className="text-xs text-muted-foreground">Ubicación</p>
              <p className="text-sm font-semibold text-foreground">Lima, Perú</p>
            </div>
          </div>
        </div>

        {/* Summary */}
        <p className="text-sm text-muted-foreground leading-relaxed max-w-[65ch] pt-3 border-t border-border">
          Carrera universitaria completada en Ingeniería de Software, con base sólida en desarrollo backend, modelado de datos, redes, sistemas operativos, arquitectura de microservicios y despliegue de soluciones escalables.
        </p>
      </div>

      {/* Focus Areas Chips */}
      <div className="space-y-2 pt-3 border-t border-border">
        <span className="text-xs font-mono font-medium text-muted-foreground">
          Áreas de especialización
        </span>
        <div className="flex flex-wrap gap-2">
          {specializationAreas.map((area) => (
            <span
              key={area}
              className="px-2.5 py-1 rounded-lg bg-muted/60 border border-border text-xs font-medium text-foreground"
            >
              {area}
            </span>
          ))}
        </div>
      </div>
    </section>
  )
}
