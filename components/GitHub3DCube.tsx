'use client'

import { useEffect, useRef, useState } from 'react'
import { Github, Code2, Zap, Database, Terminal, Layers } from 'lucide-react'

const architectureSpecs = [
  { label: 'APIs & Runtime', value: 'Java · Spring · Node · Python' },
  { label: 'Persistencia', value: 'MySQL · SQLite · Cassandra' },
  { label: 'Infraestructura', value: 'Docker · Linux · Git' },
]

export function GitHub3DCube() {
  const cubeRef = useRef<HTMLDivElement>(null)
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false)

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)')
    setPrefersReducedMotion(mediaQuery.matches)

    const handleChange = (event: MediaQueryListEvent) => {
      setPrefersReducedMotion(event.matches)
    }

    mediaQuery.addEventListener('change', handleChange)
    return () => mediaQuery.removeEventListener('change', handleChange)
  }, [])

  useEffect(() => {
    const cube = cubeRef.current
    if (!cube) return

    if (prefersReducedMotion) {
      cube.style.transform = 'rotateX(-18deg) rotateY(28deg)'
      return
    }

    let rotationX = -16
    let rotationY = 24
    let mouseX = 0
    let mouseY = 0
    let animationId = 0

    const handleMouseMove = (e: MouseEvent) => {
      const rect = cube.getBoundingClientRect()
      mouseX = (e.clientX - rect.left - rect.width / 2) / Math.max(rect.width, 1)
      mouseY = (e.clientY - rect.top - rect.height / 2) / Math.max(rect.height, 1)
    }

    const animate = () => {
      rotationX += mouseY * 0.25 + 0.06
      rotationY += mouseX * 0.25 + 0.1

      if (cube) {
        cube.style.transform = `rotateX(${rotationX}deg) rotateY(${rotationY}deg)`
      }
      animationId = requestAnimationFrame(animate)
    }

    document.addEventListener('mousemove', handleMouseMove)
    animationId = requestAnimationFrame(animate)

    return () => {
      document.removeEventListener('mousemove', handleMouseMove)
      if (animationId) cancelAnimationFrame(animationId)
    }
  }, [prefersReducedMotion])

  const faceBaseClass =
    'absolute w-44 h-44 flex items-center justify-center rounded-xl border border-border bg-card/95 dark:bg-[#0f1624]/95 backdrop-blur-md shadow-sm dark:shadow-[0_0_24px_rgba(2,6,23,0.65)]'

  return (
    <div className="flex flex-col gap-5 select-none">
      {/* Header */}
      <div className="flex items-start justify-between gap-3 border-b border-border pb-4">
        <div>
          <span className="text-xs font-mono font-medium text-primary">
            Arquitectura 3D
          </span>
          <h3 className="text-lg font-bold tracking-[-0.01em] text-foreground mt-0.5">
            Especialidad Backend
          </h3>
        </div>
        <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-muted/60 border border-border text-xs font-mono text-muted-foreground">
          <Layers className="w-3.5 h-3.5 text-primary" />
          <span>3D</span>
        </span>
      </div>

      {/* Compact 3D Perspective Scene */}
      <div
        className="h-60 w-full rounded-xl bg-muted/30 border border-border flex items-center justify-center relative overflow-hidden"
        style={{ perspective: '1000px' }}
      >
        <div
          aria-hidden="true"
          className="studio-grid-overlay absolute inset-0 opacity-60 pointer-events-none"
        />

        <div
          ref={cubeRef}
          className="relative w-44 h-44"
          style={{
            transformStyle: 'preserve-3d',
            transition: prefersReducedMotion ? 'none' : 'transform 0.1s ease-out',
          }}
        >
          {/* Front Face - Repositorios */}
          <div
            className={`${faceBaseClass} border-primary/40`}
            style={{
              transform: 'translateZ(88px)',
              backfaceVisibility: 'hidden',
            }}
          >
            <div className="text-center p-3">
              <Github className="w-10 h-10 mx-auto mb-2 text-primary" />
              <p className="text-sm font-bold text-foreground">Repositorios</p>
              <p className="text-xs text-muted-foreground font-mono tabular-nums mt-0.5">
                6+ activos
              </p>
            </div>
          </div>

          {/* Back Face - Código Limpio */}
          <div
            className={faceBaseClass}
            style={{
              transform: 'rotateY(180deg) translateZ(88px)',
              backfaceVisibility: 'hidden',
            }}
          >
            <div className="text-center p-3">
              <Code2 className="w-10 h-10 mx-auto mb-2 text-primary" />
              <p className="text-sm font-bold text-foreground">Código Limpio</p>
              <p className="text-xs text-muted-foreground font-mono mt-0.5">
                Java · Python · TS
              </p>
            </div>
          </div>

          {/* Right Face - Performance */}
          <div
            className={faceBaseClass}
            style={{
              transform: 'rotateY(90deg) translateZ(88px)',
              backfaceVisibility: 'hidden',
            }}
          >
            <div className="text-center p-3">
              <Zap className="w-10 h-10 mx-auto mb-2 text-accent" />
              <p className="text-sm font-bold text-foreground">Performance</p>
              <p className="text-xs text-muted-foreground font-mono mt-0.5">
                APIs & Docker
              </p>
            </div>
          </div>

          {/* Left Face - Bases de Datos */}
          <div
            className={faceBaseClass}
            style={{
              transform: 'rotateY(-90deg) translateZ(88px)',
              backfaceVisibility: 'hidden',
            }}
          >
            <div className="text-center p-3">
              <Database className="w-10 h-10 mx-auto mb-2 text-primary" />
              <p className="text-sm font-bold text-foreground">Bases de Datos</p>
              <p className="text-xs text-muted-foreground font-mono mt-0.5">
                MySQL · Cassandra
              </p>
            </div>
          </div>

          {/* Top Face - BAH */}
          <div
            className={faceBaseClass}
            style={{
              transform: 'rotateX(90deg) translateZ(88px)',
              backfaceVisibility: 'hidden',
            }}
          >
            <div className="text-center p-3">
              <span className="text-3xl font-bold font-mono tracking-tight text-primary">
                BAH
              </span>
              <p className="text-xs text-muted-foreground font-mono mt-1">
                Backend Hub
              </p>
            </div>
          </div>

          {/* Bottom Face - Interacción */}
          <div
            className={faceBaseClass}
            style={{
              transform: 'rotateX(-90deg) translateZ(88px)',
              backfaceVisibility: 'hidden',
            }}
          >
            <div className="text-center p-3">
              <Terminal className="w-8 h-8 mx-auto mb-2 text-primary" />
              <p className="text-xs font-semibold text-foreground">Mueve el cursor</p>
              <p className="text-xs text-muted-foreground mt-0.5">para rotar</p>
            </div>
          </div>
        </div>
      </div>

      {/* Technical Architecture Sheet */}
      <div className="space-y-2">
        {architectureSpecs.map((spec) => (
          <div
            key={spec.label}
            className="flex items-center justify-between gap-3 px-3 py-2.5 rounded-xl bg-muted/40 border border-border text-xs"
          >
            <span className="text-muted-foreground font-medium shrink-0">
              {spec.label}
            </span>
            <span className="font-mono text-foreground font-medium text-right truncate">
              {spec.value}
            </span>
          </div>
        ))}
      </div>

      <p className="text-xs text-muted-foreground leading-relaxed">
        {prefersReducedMotion
          ? 'Vista isométrica fija respetando la preferencia de movimiento reducido.'
          : 'Mueve el cursor por la pantalla para inspeccionar cada capa de especialidad técnica.'}
      </p>
    </div>
  )
}
