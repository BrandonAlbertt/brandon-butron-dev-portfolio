'use client'

import { GraduationCap, Calendar, MapPin } from 'lucide-react'

/**
 * COMPONENTE EDUCATION (EDUCACIÓN)
 * ================================
 * Ubicación: components/Education.tsx
 * 
 * ¿Qué hace?
 * - Muestra información de educación
 * - Incluye universidad, grado y años de estudio
 * - Diseño con iconos y timeline
 * - Estado actual: Graduado
 * 
 * ¿Dónde están los estilos?
 * - Tailwind CSS clases
 * - Colores: primary, accent, secondary
 * 
 * ¿Cómo cambiar?
 * - Información: Modifica los textos en el componente
 * - Estilos: Usa las clases Tailwind
 * - Iconos: Importados de lucide-react
 */

export function Education() {
  return (
    <section className="py-20 bg-gradient-to-b from-transparent via-primary/5 to-transparent">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="mb-16 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Educación
            <span className="text-primary">.</span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Formación académica y trayectoria educativa
          </p>
        </div>

        {/* Education Card */}
        <div className="max-w-2xl mx-auto">
          <div className="relative rounded-xl border border-primary/30 bg-card p-8 hover:border-primary/60 hover:shadow-lg hover:shadow-primary/40 transition-all duration-300">
            {/* Timeline Line */}
            <div className="absolute left-8 top-0 w-1 h-full bg-gradient-to-b from-primary via-primary to-transparent rounded-full opacity-30" />

            {/* Content */}
            <div className="space-y-6">
              {/* Header */}
              <div className="flex items-start gap-6">
                <div className="flex-shrink-0 w-16 h-16 rounded-lg bg-gradient-to-br from-primary/20 to-accent/20 border border-primary/30 flex items-center justify-center">
                  <GraduationCap className="w-8 h-8 text-primary" />
                </div>

                <div className="flex-1">
                  <h3 className="text-2xl font-bold text-foreground mb-1">
                   Ingeniería de Software
                  </h3>
                  <p className="text-lg text-primary font-semibold">
                    Universidad Tecnológica del Perú (UTP)
                  </p>
                </div>
              </div>

              {/* Details */}
              <div className="space-y-4 pl-22">
                {/* Years */}
                <div className="flex items-center gap-3">
                  <Calendar className="w-5 h-5 text-secondary" />
                  <div>
                    <p className="text-sm text-muted-foreground">Período de estudio</p>
                    <p className="font-semibold text-foreground">2019 - 2025</p>
                  </div>
                </div>

                {/* Location */}
                <div className="flex items-center gap-3">
                  <MapPin className="w-5 h-5 text-secondary" />
                  <div>
                    <p className="text-sm text-muted-foreground">Ubicación</p>
                    <p className="font-semibold text-foreground">Lima, Perú</p>
                  </div>
                </div>

                {/* Status */}
                <div className="flex items-center gap-3">
                  <div className="w-5 h-5 rounded-full bg-gradient-to-br from-accent to-primary flex items-center justify-center">
                    <div className="w-2 h-2 rounded-full bg-background" />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Estado</p>
                    <p className="font-semibold text-accent">Egresado</p>
                  </div>
                </div>
              </div>

              {/* Description */}
              <div className="pt-4 border-t border-primary/20">
                <p className="text-muted-foreground leading-relaxed">
                  Carrera académica completada exitosamente en Ingeniería de Software. Durante mis años 
                  de estudio adquirí conocimientos sólidos en programación, arquitectura de sistemas, 
                  desarrollo web, bases de datos y tecnologías en la nube. 
                  Mi formación me preparó para enfrentar desafíos complejos en desarrollo de software 
                  y construir soluciones escalables.
                </p>
              </div>

              {/* Focus Areas */}
              <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                {['Backend', 'APIs', 'Bases de Datos', 'Linux', 'Cloud', 'DevOps'].map((area) => (
                  <div
                    key={area}
                    className="px-3 py-2 rounded-lg bg-primary/10 border border-primary/30 text-center text-sm font-medium text-foreground hover:bg-primary/20 transition-colors"
                  >
                    {area}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
