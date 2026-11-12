'use client'

import { useState, useRef, useEffect } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import {
  Github,
  ExternalLink,
  Play,
  ChevronLeft,
  ChevronRight,
  ArrowRight,
} from 'lucide-react'
import projectsData from '@/data/projects.json'

interface Project {
  id: number
  title: string
  description: string
  image: string
  technologies: string[]
  github: string
  demo: string
  video: string
  category?: string
}

const categoryMap: Record<number, string> = {
  1: 'Microservicios',
  2: 'Web App',
  3: 'Multiplayer / C#',
  4: 'Hardware & OS',
  5: 'Enterprise Java',
}

export function ProjectsGrid() {
  const projects: Project[] = [...(projectsData as Project[])].sort(
    (a, b) => a.id - b.id
  )
  const [currentPage, setCurrentPage] = useState(0)
  const itemsPerPage = 4

  const totalPages = Math.ceil(projects.length / itemsPerPage)
  const currentProjects = projects.slice(
    currentPage * itemsPerPage,
    (currentPage + 1) * itemsPerPage
  )

  const handlePrev = () => {
    setCurrentPage((prev) => (prev > 0 ? prev - 1 : totalPages - 1))
  }

  const handleNext = () => {
    setCurrentPage((prev) => (prev < totalPages - 1 ? prev + 1 : 0))
  }

  return (
    <section
      id="projects"
      className="studio-panel rounded-2xl p-4 sm:p-6 lg:p-8 flex flex-col gap-5 lg:gap-6"
    >
      {/* Left-Aligned Header with Controls */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-border pb-5">
        <div className="space-y-1">
          <span className="text-xs font-mono font-medium text-primary">
            Proyectos
          </span>
          <h2 className="text-2xl sm:text-3xl font-bold tracking-[-0.02em] text-foreground">
            Mis últimos trabajos
          </h2>
          <p className="text-sm text-muted-foreground max-w-[65ch] leading-relaxed">
            Selección de proyectos en arquitectura backend, automatización con microservicios, aplicaciones web y sistemas en red.
          </p>
        </div>

        {/* Controls */}
        <div className="flex flex-wrap items-center gap-2.5 shrink-0">
          <a
            href="https://github.com/BrandonAlbertt"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 h-9 px-3.5 rounded-lg bg-background hover:bg-muted border border-border hover:border-primary/40 text-xs font-semibold text-foreground transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
          >
            <span>Ver todos en GitHub</span>
            <ArrowRight className="w-3.5 h-3.5 text-primary" />
          </a>

          {totalPages > 1 && (
            <div className="flex items-center gap-1.5">
              <span className="text-xs font-mono text-muted-foreground tabular-nums px-2">
                {currentPage + 1} / {totalPages}
              </span>
              <button
                type="button"
                onClick={handlePrev}
                className="w-9 h-9 rounded-lg bg-background hover:bg-muted border border-border hover:border-primary/40 flex items-center justify-center text-foreground transition-colors duration-200 active:scale-[0.98] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                aria-label="Proyectos anteriores"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <button
                type="button"
                onClick={handleNext}
                className="w-9 h-9 rounded-lg bg-background hover:bg-muted border border-border hover:border-primary/40 flex items-center justify-center text-foreground transition-colors duration-200 active:scale-[0.98] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                aria-label="Siguientes proyectos"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {currentProjects.map((project) => (
          <CyberProjectCard key={project.id} project={project} />
        ))}
      </div>

      {/* Pagination Indicators */}
      {totalPages > 1 && (
        <div className="flex items-center justify-center gap-2 pt-2">
          {Array.from({ length: totalPages }).map((_, index) => (
            <button
              key={index}
              type="button"
              onClick={() => setCurrentPage(index)}
              className={`h-2 rounded-full transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 ${
                currentPage === index
                  ? 'w-6 bg-primary'
                  : 'w-2 bg-border hover:bg-muted-foreground/60'
              }`}
              aria-label={`Ir a página ${index + 1} de ${totalPages}`}
              aria-current={currentPage === index ? 'page' : undefined}
            />
          ))}
        </div>
      )}
    </section>
  )
}

function CyberProjectCard({ project }: { project: Project }) {
  const cardRef = useRef<HTMLDivElement>(null)
  const [rotate, setRotate] = useState({ x: 0, y: 0 })
  const [isHovered, setIsHovered] = useState(false)
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false)

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)')
    setPrefersReducedMotion(mediaQuery.matches)

    const handleChange = (event: MediaQueryListEvent) => {
      setPrefersReducedMotion(event.matches)
      if (event.matches) setRotate({ x: 0, y: 0 })
    }

    mediaQuery.addEventListener('change', handleChange)
    return () => mediaQuery.removeEventListener('change', handleChange)
  }, [])

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (prefersReducedMotion || !cardRef.current) return
    const rect = cardRef.current.getBoundingClientRect()
    const x = e.clientX - rect.left - rect.width / 2
    const y = e.clientY - rect.top - rect.height / 2

    const rotateY = (x / (rect.width / 2)) * 3.5
    const rotateX = -(y / (rect.height / 2)) * 3.5

    setRotate({ x: rotateX, y: rotateY })
  }

  const handleMouseLeave = () => {
    setIsHovered(false)
    setRotate({ x: 0, y: 0 })
  }

  const categoryLabel = project.category || categoryMap[project.id] || 'Desarrollo'
  const scale = !prefersReducedMotion && isHovered ? 1.01 : 1

  return (
    <article
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={handleMouseLeave}
      className="group relative cursor-pointer h-full flex flex-col rounded-xl bg-muted/25 dark:bg-muted/30 border border-border hover:border-primary/40 transition-all duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] overflow-hidden"
      style={{
        transform: prefersReducedMotion
          ? 'none'
          : `perspective(1000px) rotateX(${rotate.x}deg) rotateY(${rotate.y}deg) scale(${scale})`,
        transformStyle: 'preserve-3d',
      }}
    >
      {/* Top Image Container (clean surface without muddy black gradient) */}
      <div className="relative h-40 sm:h-44 w-full bg-muted overflow-hidden border-b border-border">
        <Image
          src={project.image}
          alt={project.title}
          fill
          className="object-cover object-top group-hover:scale-[1.03] transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)]"
        />

        {/* Category Badge Pill */}
        <div className="absolute top-2.5 left-2.5 z-10">
          <span className="px-2.5 py-1 rounded-lg bg-background/90 border border-border text-xs font-medium text-foreground backdrop-blur-md shadow-xs">
            {categoryLabel}
          </span>
        </div>
      </div>

      {/* Content Container */}
      <div className="p-4 flex-1 flex flex-col justify-between gap-3.5">
        <div className="space-y-1.5">
          <h3 className="text-base font-semibold text-foreground group-hover:text-primary transition-colors line-clamp-1">
            {project.title}
          </h3>

          <p className="text-xs text-muted-foreground leading-relaxed line-clamp-2">
            {project.description}
          </p>
        </div>

        {/* Tech tags */}
        <div className="flex flex-wrap gap-1.5">
          {project.technologies.slice(0, 3).map((tech) => (
            <span
              key={tech}
              className="px-2 py-0.5 rounded-md bg-background border border-border text-xs font-medium text-muted-foreground"
            >
              {tech}
            </span>
          ))}
          {project.technologies.length > 3 && (
            <span className="px-2 py-0.5 rounded-md bg-primary/10 border border-primary/25 text-xs font-mono font-medium text-primary tabular-nums">
              +{project.technologies.length - 3}
            </span>
          )}
        </div>

        {/* Action Buttons */}
        <div className="flex items-center gap-2 pt-3 border-t border-border">
          {project.github && project.github !== '#' && (
            <a
              href={project.github}
              target="_blank"
              rel="noopener noreferrer"
              className="relative z-20 flex-1 min-h-[40px] sm:min-h-0 sm:h-8 px-2 rounded-lg bg-background hover:bg-muted text-foreground border border-border hover:border-primary/40 flex items-center justify-center gap-1.5 text-xs font-semibold transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
              title="Ver código en GitHub"
            >
              <Github className="w-3.5 h-3.5 shrink-0" />
              <span>GitHub</span>
            </a>
          )}

          {project.demo && project.demo !== '#' && (
            <a
              href={project.demo}
              target="_blank"
              rel="noopener noreferrer"
              className="relative z-20 flex-1 min-h-[40px] sm:min-h-0 sm:h-8 px-2 rounded-lg bg-background hover:bg-muted text-foreground border border-border hover:border-primary/40 flex items-center justify-center gap-1.5 text-xs font-semibold transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
              title="Abrir Demo"
            >
              <ExternalLink className="w-3.5 h-3.5 shrink-0" />
              <span>Demo</span>
            </a>
          )}

          <Link
            href={`/projects/${project.id}`}
            className="flex-1 min-h-[40px] sm:min-h-0 sm:h-8 px-2 rounded-lg bg-primary/10 hover:bg-primary/15 text-primary border border-primary/25 flex items-center justify-center gap-1.5 text-xs font-semibold transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring after:content-[''] after:absolute after:inset-0 after:z-[15]"
            title="Ver detalle y video del proyecto"
          >
            <Play className="w-3.5 h-3.5 shrink-0" />
            <span>Detalle</span>
          </Link>
        </div>
      </div>
    </article>
  )
}
