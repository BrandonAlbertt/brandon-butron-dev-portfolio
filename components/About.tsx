'use client'

import { useState, useRef, useEffect } from 'react'
import Image from 'next/image'
import { Server, Code2, Cpu, Sparkles, ArrowDown } from 'lucide-react'

const features = [
  {
    icon: Server,
    title: 'Backend Developer',
    description: 'APIs, bases de datos y microservicios',
  },
  {
    icon: Code2,
    title: 'Python & Java',
    description: 'Desarrollo de aplicaciones y servicios',
  },
  {
    icon: Cpu,
    title: 'Automatización',
    description: 'Scripts, flujos y eficiencia operativa',
  },
  {
    icon: Sparkles,
    title: 'Inteligencia Artificial',
    description: 'Integración aplicada a productos reales',
  },
]

export function About() {
  const cubeContainerRef = useRef<HTMLDivElement>(null)
  const [rotate, setRotate] = useState({ x: 0, y: 0 })
  const [isHovered, setIsHovered] = useState(false)
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false)

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)')
    setPrefersReducedMotion(mediaQuery.matches)

    const handleChange = (event: MediaQueryListEvent) => {
      setPrefersReducedMotion(event.matches)
      if (event.matches) {
        setRotate({ x: 0, y: 0 })
      }
    }

    mediaQuery.addEventListener('change', handleChange)
    return () => mediaQuery.removeEventListener('change', handleChange)
  }, [])

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (prefersReducedMotion || !cubeContainerRef.current) return
    const rect = cubeContainerRef.current.getBoundingClientRect()
    const x = e.clientX - rect.left - rect.width / 2
    const y = e.clientY - rect.top - rect.height / 2

    const rotateY = (x / (rect.width / 2)) * 9
    const rotateX = -(y / (rect.height / 2)) * 9

    setRotate({ x: rotateX, y: rotateY })
  }

  const handleMouseLeave = () => {
    setIsHovered(false)
    setRotate({ x: 0, y: 0 })
  }

  const scrollToEducation = () => {
    const el = document.getElementById('education')
    el?.scrollIntoView({ behavior: prefersReducedMotion ? 'auto' : 'smooth' })
  }

  const tiltScale = !prefersReducedMotion && isHovered ? 1.03 : 1

  return (
    <section
      id="about"
      className="studio-panel rounded-2xl p-6 sm:p-8 relative overflow-hidden"
    >
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
        {/* 1. LEFT: PROFILE PORTRAIT FRAME */}
        <div className="lg:col-span-3 flex justify-center items-center">
          <div
            ref={cubeContainerRef}
            onMouseMove={handleMouseMove}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={handleMouseLeave}
            className="group relative w-56 h-60 sm:w-60 sm:h-64 flex items-center justify-center select-none py-3"
            style={{ perspective: '1000px' }}
          >
            {/* Refined orbital rings behind the portrait */}
            <div
              aria-hidden="true"
              className="pointer-events-none absolute w-52 h-52 sm:w-56 sm:h-56 rounded-full border border-border/70 dark:border-border/60 transition-colors duration-300 group-hover:border-primary/30"
            />
            <div
              aria-hidden="true"
              className="pointer-events-none absolute w-44 h-44 sm:w-48 sm:h-48 rounded-full border border-dashed border-primary/20 dark:border-primary/25"
            />

            {/* Technical framing corner accents */}
            <span
              aria-hidden="true"
              className="pointer-events-none absolute top-2 left-2 w-2.5 h-2.5 border-t border-l border-primary/35 rounded-tl-xs"
            />
            <span
              aria-hidden="true"
              className="pointer-events-none absolute top-2 right-2 w-2.5 h-2.5 border-t border-r border-primary/35 rounded-tr-xs"
            />
            <span
              aria-hidden="true"
              className="pointer-events-none absolute bottom-2 left-2 w-2.5 h-2.5 border-b border-l border-primary/35 rounded-bl-xs"
            />
            <span
              aria-hidden="true"
              className="pointer-events-none absolute bottom-2 right-2 w-2.5 h-2.5 border-b border-r border-primary/35 rounded-br-xs"
            />

            {/* 3D Concentric Portrait Chassis */}
            <div
              className="relative rounded-2xl p-1.5 bg-gradient-to-b from-border/90 via-border/40 to-transparent dark:from-slate-700/70 dark:via-slate-800/40 dark:to-slate-900/80 border border-border/80 shadow-lg transition-all duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:border-primary/40"
              style={{
                transform: `rotateX(${rotate.x}deg) rotateY(${rotate.y}deg) scale(${tiltScale})`,
                transformStyle: 'preserve-3d',
              }}
            >
              {/* Top specular light line */}
              <span
                aria-hidden="true"
                className="pointer-events-none absolute inset-x-4 top-0 h-px bg-gradient-to-r from-transparent via-primary/50 to-transparent z-10"
              />

              {/* Inner Portrait Frame */}
              <div className="relative w-44 h-48 sm:w-48 sm:h-52 rounded-[14px] overflow-hidden bg-muted/50 dark:bg-slate-950 ring-1 ring-inset ring-black/5 dark:ring-white/10">
                <Image
                  src="/images/image_perfil/brandon_perfil.jpeg"
                  alt="Brandon Butrón — Ingeniero de Software"
                  fill
                  sizes="(max-width: 640px) 176px, 192px"
                  priority
                  className={`object-cover object-top pointer-events-none transition-[transform,filter] duration-500 ease-out group-hover:contrast-[1.03] ${
                    prefersReducedMotion ? '' : 'group-hover:scale-[1.03]'
                  }`}
                />

                {/* Subtle bottom contrast vignette */}
                <div
                  aria-hidden="true"
                  className="pointer-events-none absolute inset-x-0 bottom-0 h-14 bg-gradient-to-t from-slate-950/20 dark:from-slate-950/55 via-transparent to-transparent"
                />

                {/* Discreet diagonal reflection on hover */}
                <div
                  aria-hidden="true"
                  className={`pointer-events-none absolute inset-0 bg-gradient-to-tr from-transparent via-white/25 dark:via-white/15 to-transparent -translate-x-full opacity-0 transition-all duration-700 ease-out ${
                    prefersReducedMotion
                      ? ''
                      : 'group-hover:translate-x-full group-hover:opacity-100'
                  }`}
                />
              </div>

              {/* Compact Floating Identity Badge */}
              <div className="absolute -bottom-3 left-1/2 -translate-x-1/2 z-20 inline-flex items-center gap-1.5 backdrop-blur-md bg-background/85 border border-border px-2.5 py-1 rounded-full shadow-sm whitespace-nowrap">
                <span
                  className="w-1.5 h-1.5 rounded-full bg-emerald-500 shrink-0"
                  aria-hidden="true"
                />
                <span className="text-xs font-mono font-medium text-foreground">
                  Software Eng. · UTP
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* 2. CENTER: PROFILE SUMMARY */}
        <div className="lg:col-span-5 flex flex-col justify-center space-y-3.5">
          <div>
            <span className="text-xs font-mono font-medium text-primary">
              Sobre mí
            </span>
            <h2 className="text-2xl sm:text-3xl font-bold tracking-[-0.02em] text-foreground mt-1 leading-snug">
              Bachiller en Ingeniería de Software de la UTP
            </h2>
          </div>

          <p className="text-sm sm:text-base text-muted-foreground leading-relaxed max-w-[65ch]">
            Apasionado por el desarrollo backend, la automatización de procesos y el diseño de sistemas confiables que generen impacto real.
          </p>

          <p className="text-sm text-muted-foreground leading-relaxed max-w-[65ch]">
            Cuento con formación sólida en diseño e implementación de APIs REST, arquitectura modular, bases de datos relacionales y NoSQL, contenedores Docker y flujos de trabajo en Linux.
          </p>

          <div className="pt-1">
            <button
              type="button"
              onClick={scrollToEducation}
              className="inline-flex items-center gap-2 text-sm font-semibold text-primary hover:underline group transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring rounded-md"
            >
              <span>Ver formación y acreditación</span>
              <ArrowDown className="w-4 h-4 group-hover:translate-y-0.5 transition-transform" />
            </button>
          </div>
        </div>

        {/* 3. RIGHT: 4 TECHNICAL FOCUS ROWS */}
        <div className="lg:col-span-4 flex flex-col gap-2.5">
          {features.map((item) => {
            const Icon = item.icon
            return (
              <div
                key={item.title}
                className="flex items-center gap-3.5 px-3.5 py-3 rounded-xl bg-muted/40 hover:bg-muted/70 border border-border hover:border-primary/30 transition-all duration-200 group"
              >
                <div className="w-9 h-9 rounded-lg bg-primary/10 border border-primary/25 flex items-center justify-center shrink-0 text-primary transition-transform duration-200 group-hover:scale-105">
                  <Icon className="w-4 h-4" />
                </div>

                <div className="flex flex-col min-w-0">
                  <span className="text-sm font-semibold text-foreground leading-tight">
                    {item.title}
                  </span>
                  <span className="text-xs text-muted-foreground truncate mt-0.5">
                    {item.description}
                  </span>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
