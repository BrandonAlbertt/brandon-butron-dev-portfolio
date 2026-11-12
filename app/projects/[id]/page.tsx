'use client'

import { use, useCallback, useEffect, useRef, useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import {
  ArrowLeft,
  ArrowRight,
  ArrowUpRight,
  ExternalLink,
  Github,
  Image as ImageIcon,
  Layers,
  Play,
  Youtube,
} from 'lucide-react'
import { Sidebar, WORKSPACE_NAV_ITEMS, type WorkspaceView } from '@/components/Sidebar'
import { CvQuickButton } from '@/components/CvQuickButton'
import projectsData from '@/data/projects.json'

interface Project {
  id: number
  title: string
  category?: string
  description: string
  image: string
  technologies: string[]
  github: string
  demo: string
  video: string
}

function getCleanEmbedUrl(rawUrl: string): string {
  if (!rawUrl || rawUrl === '#') return ''
  try {
    const url = new URL(rawUrl)
    url.searchParams.set('rel', '0')
    url.searchParams.set('modestbranding', '1')
    return url.toString()
  } catch {
    return rawUrl
  }
}

function getYouTubeWatchUrl(rawUrl: string): string {
  if (!rawUrl || rawUrl === '#') return ''
  try {
    const url = new URL(rawUrl)
    if (url.pathname.includes('/embed/')) {
      const videoId = url.pathname.split('/embed/')[1]?.split('/')[0]
      if (videoId) {
        return `https://www.youtube.com/watch?v=${videoId}`
      }
    }
    return url.toString()
  } catch {
    return rawUrl
  }
}

export default function ProjectPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params)
  const router = useRouter()
  const projectId = parseInt(id, 10)
  const projects: Project[] = [...(projectsData as Project[])].sort(
    (a, b) => a.id - b.id
  )
  const currentIndex = projects.findIndex((p) => p.id === projectId)
  const project = currentIndex >= 0 ? projects[currentIndex] : undefined

  const prevProject = currentIndex > 0 ? projects[currentIndex - 1] : null
  const nextProject =
    currentIndex >= 0 && currentIndex < projects.length - 1
      ? projects[currentIndex + 1]
      : null

  const hasGithub = Boolean(project?.github && project.github !== '#')
  const hasDemo = Boolean(project?.demo && project.demo !== '#')
  const hasVideo = Boolean(project?.video && project.video !== '#')

  const [activeMedia, setActiveMedia] = useState<'video' | 'preview'>(
    hasVideo ? 'video' : 'preview'
  )
  const mediaConsoleRef = useRef<HTMLElement>(null)

  // Reset active media tab when switching between projects
  useEffect(() => {
    setActiveMedia(hasVideo ? 'video' : 'preview')
  }, [projectId, hasVideo])

  const handleSelectView = useCallback(
    (view: WorkspaceView) => {
      const matched = WORKSPACE_NAV_ITEMS.find((item) => item.id === view)
      router.push(`/${matched?.href ?? '#hero'}`)
    },
    [router]
  )

  // Keyboard navigation: 1-6 workspace shortcuts & ArrowLeft / ArrowRight between projects
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
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

      const matchedView = WORKSPACE_NAV_ITEMS.find((item) => item.shortcut === event.key)
      if (matchedView) {
        event.preventDefault()
        handleSelectView(matchedView.id)
        return
      }

      if (event.key === 'ArrowLeft' && prevProject) {
        event.preventDefault()
        router.push(`/projects/${prevProject.id}`)
      } else if (event.key === 'ArrowRight' && nextProject) {
        event.preventDefault()
        router.push(`/projects/${nextProject.id}`)
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [prevProject, nextProject, router, handleSelectView])

  const handleFocusVideo = () => {
    if (!hasVideo) return
    setActiveMedia('video')
    mediaConsoleRef.current?.scrollIntoView({ behavior: 'smooth', block: 'nearest' })
  }

  if (!project) {
    return (
      <div className="relative min-h-screen bg-background text-foreground transition-colors duration-300 overflow-x-clip">
        <div
          className="studio-grid-overlay fixed inset-0 pointer-events-none opacity-40"
          aria-hidden="true"
        />
        <Sidebar activeView="projects" onSelectView={handleSelectView} />

        <div className="lg:pl-64 flex flex-col min-h-screen w-full transition-all duration-300">
          <div className="flex-1 flex flex-col items-center justify-center p-6 relative z-10">
            <div className="studio-panel p-8 rounded-2xl text-center max-w-md w-full">
              <p className="text-xs font-mono uppercase tracking-wider text-muted-foreground mb-2">
                Error 404 · Recurso no encontrado
              </p>
              <h1 className="text-2xl font-bold tracking-tight text-foreground mb-3">
                Proyecto no encontrado
              </h1>
              <p className="text-sm text-muted-foreground mb-6 leading-relaxed">
                El proyecto solicitado no existe o no se encuentra disponible en el catálogo actual.
              </p>
              <Link
                href="/#projects"
                className="inline-flex h-10 items-center justify-center gap-2 px-5 rounded-xl bg-primary text-primary-foreground text-sm font-semibold hover:bg-primary/90 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
              >
                <ArrowLeft className="w-4 h-4" />
                Volver a proyectos
              </Link>
            </div>
          </div>
        </div>
      </div>
    )
  }

  const otherProjects = projects.filter((p) => p.id !== project.id).slice(0, 3)
  const cleanEmbedUrl = hasVideo ? getCleanEmbedUrl(project.video) : ''
  const watchUrl = hasVideo ? getYouTubeWatchUrl(project.video) : ''

  return (
    <div className="relative min-h-screen bg-background text-foreground transition-colors duration-300 overflow-x-clip">
      <div
        className="studio-grid-overlay fixed inset-0 pointer-events-none opacity-35"
        aria-hidden="true"
      />
      <Sidebar activeView="projects" onSelectView={handleSelectView} />

      <div className="lg:pl-64 flex flex-col min-h-screen w-full transition-all duration-300">
        {/* Top Workspace Bar */}
        <header className="lg:sticky lg:top-0 z-30 h-14 border-b border-border bg-background/85 backdrop-blur-md">
        <div className="max-w-7xl mx-auto h-full px-4 sm:px-6 lg:px-8 flex items-center justify-between gap-3">
          {/* Left: Return link & breadcrumb */}
          <div className="flex items-center gap-3 min-w-0">
            <Link
              href="/#projects"
              className="inline-flex h-9 items-center gap-1.5 sm:gap-2 px-2.5 sm:px-3 rounded-lg border border-border bg-card text-xs font-medium text-foreground hover:border-primary/40 hover:bg-muted/60 transition-colors shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
            >
              <ArrowLeft className="w-3.5 h-3.5 text-primary" />
              <span className="sm:hidden">Volver</span>
              <span className="hidden sm:inline">Volver a proyectos</span>
            </Link>

            <nav
              aria-label="Ruta del proyecto"
              className="hidden md:flex items-center gap-1.5 text-xs font-mono text-muted-foreground truncate tabular-nums"
            >
              <span>brandonbutron.dev</span>
              <span aria-hidden="true">/</span>
              <span>Proyectos</span>
              <span aria-hidden="true">/</span>
              <span className="text-foreground font-medium">#{project.id}</span>
            </nav>
          </div>

          {/* Right: Project Pagination + CV */}
          <div className="flex items-center gap-2 shrink-0">
            <div
              className="inline-flex items-center rounded-lg border border-border bg-card p-0.5"
              role="group"
              aria-label="Navegación entre proyectos"
            >
              {prevProject ? (
                <Link
                  href={`/projects/${prevProject.id}`}
                  aria-label={`Proyecto anterior: ${prevProject.title}`}
                  title="Anterior (←)"
                  className="inline-flex h-8 w-8 items-center justify-center rounded-md text-foreground hover:bg-muted/70 hover:text-primary transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                >
                  <ArrowLeft className="w-3.5 h-3.5" />
                </Link>
              ) : (
                <span
                  aria-disabled="true"
                  className="inline-flex h-8 w-8 items-center justify-center rounded-md text-muted-foreground/40 cursor-not-allowed"
                >
                  <ArrowLeft className="w-3.5 h-3.5" />
                </span>
              )}

              <span className="px-2.5 text-xs font-mono text-muted-foreground tabular-nums select-none">
                <strong className="text-foreground font-semibold">{currentIndex + 1}</strong> /{' '}
                {projects.length}
              </span>

              {nextProject ? (
                <Link
                  href={`/projects/${nextProject.id}`}
                  aria-label={`Siguiente proyecto: ${nextProject.title}`}
                  title="Siguiente (→)"
                  className="inline-flex h-8 w-8 items-center justify-center rounded-md text-foreground hover:bg-muted/70 hover:text-primary transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                >
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              ) : (
                <span
                  aria-disabled="true"
                  className="inline-flex h-8 w-8 items-center justify-center rounded-md text-muted-foreground/40 cursor-not-allowed"
                >
                  <ArrowRight className="w-3.5 h-3.5" />
                </span>
              )}
            </div>

            <CvQuickButton />
          </div>
        </div>
      </header>

      {/* Project Engineering & Video Showcase Console */}
      <main className="relative z-10 flex-1 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-6 lg:py-8 space-y-5 lg:space-y-6">
        {/* 2-Column Bento Split View */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 lg:gap-6 items-start">
          {/* LEFT COLUMN (lg:col-span-8): Unified Media Console + Architecture Description */}
          <div className="lg:col-span-8 space-y-4 sm:space-y-5">
            {/* Unified Media Chassis */}
            <section
              ref={mediaConsoleRef}
              aria-label="Consola multimedia del proyecto"
              className="studio-panel rounded-2xl overflow-hidden"
            >
              {/* Window Top Bar */}
              <div className="px-3 py-2 sm:px-4 sm:py-2.5 border-b border-border bg-muted/40 flex flex-wrap items-center justify-between gap-2.5 sm:gap-3">
                <div className="flex items-center gap-3 min-w-0">
                  <div className="hidden sm:flex items-center gap-1.5 shrink-0" aria-hidden="true">
                    <span className="w-2.5 h-2.5 rounded-full bg-border dark:bg-slate-700" />
                    <span className="w-2.5 h-2.5 rounded-full bg-border dark:bg-slate-700" />
                    <span className="w-2.5 h-2.5 rounded-full bg-primary/70" />
                  </div>
                  <span className="text-xs font-mono text-muted-foreground truncate">
                    MEDIA_STREAM <span className="text-primary/70">//</span>{' '}
                    {activeMedia === 'video' && hasVideo ? 'YOUTUBE_DEMO' : 'PROJECT_PREVIEW'}
                  </span>
                </div>

                {/* Mode Switcher Tabs (only when video exists) */}
                {hasVideo && (
                  <div
                    role="tablist"
                    aria-label="Modo de visualización multimedia"
                    className="inline-flex items-center rounded-lg border border-border bg-card p-0.5 gap-0.5"
                  >
                    <button
                      type="button"
                      role="tab"
                      aria-selected={activeMedia === 'video'}
                      onClick={() => setActiveMedia('video')}
                      className={`inline-flex h-7 items-center gap-1.5 px-2.5 rounded-md text-xs font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring ${
                        activeMedia === 'video'
                          ? 'bg-primary text-primary-foreground shadow-xs'
                          : 'text-muted-foreground hover:text-foreground hover:bg-muted/60'
                      }`}
                    >
                      <Play className="w-3 h-3" />
                      <span>Video Demo</span>
                    </button>

                    <button
                      type="button"
                      role="tab"
                      aria-selected={activeMedia === 'preview'}
                      onClick={() => setActiveMedia('preview')}
                      className={`inline-flex h-7 items-center gap-1.5 px-2.5 rounded-md text-xs font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring ${
                        activeMedia === 'preview'
                          ? 'bg-primary text-primary-foreground shadow-xs'
                          : 'text-muted-foreground hover:text-foreground hover:bg-muted/60'
                      }`}
                    >
                      <ImageIcon className="w-3 h-3" />
                      <span>Vista Previa</span>
                    </button>
                  </div>
                )}
              </div>

              {/* Single Concentric Viewport (aspect-video) */}
              <div className="relative p-1.5 sm:p-2 lg:p-3 bg-muted/25 dark:bg-slate-950/45">
                <div className="relative rounded-xl p-1 sm:p-1.5 bg-gradient-to-b from-border/90 via-border/40 to-transparent dark:from-slate-700/70 dark:via-slate-800/40 dark:to-slate-900/80 border border-border/80 shadow-md">
                  <span
                    aria-hidden="true"
                    className="pointer-events-none absolute inset-x-6 top-0 h-px bg-gradient-to-r from-transparent via-primary/50 to-transparent z-10"
                  />

                  <div className="relative w-full aspect-video rounded-[10px] overflow-hidden bg-background dark:bg-slate-950 ring-1 ring-inset ring-black/5 dark:ring-white/10">
                    {activeMedia === 'video' && hasVideo ? (
                      <iframe
                        src={cleanEmbedUrl}
                        title={`Video demostrativo de ${project.title}`}
                        className="w-full h-full"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                      />
                    ) : (
                      <Image
                        src={project.image}
                        alt={project.title}
                        fill
                        className="object-cover"
                        priority
                        sizes="(max-width: 1024px) 100vw, 820px"
                      />
                    )}
                  </div>
                </div>
              </div>

              {/* Player Footer Strip */}
              {hasVideo && (
                <div className="px-3 sm:px-4 py-2 border-t border-border bg-muted/25 flex flex-wrap items-center justify-between gap-2 text-xs">
                  <span className="font-mono text-muted-foreground">
                    {activeMedia === 'video'
                      ? 'Reproductor embebido 16:9 activo'
                      : 'Captura de portada del proyecto'}
                  </span>

                  <a
                    href={watchUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 font-medium text-primary hover:underline rounded focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                  >
                    <Youtube className="w-3.5 h-3.5" />
                    <span>Ver en mi canal de YouTube</span>
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </a>
                </div>
              )}
            </section>

            {/* Architecture & Description Panel */}
            <section className="studio-panel rounded-2xl p-4 sm:p-5 lg:p-6">
              <h2 className="text-sm sm:text-base font-semibold text-foreground mb-2.5 flex items-center gap-2.5">
                <span className="w-1 h-4 bg-primary rounded-full" aria-hidden="true" />
                <span>Arquitectura y Descripción</span>
              </h2>
              <p className="text-sm sm:text-base text-muted-foreground leading-relaxed max-w-[65ch] text-pretty whitespace-pre-line">
                {project.description}
              </p>
            </section>
          </div>

          {/* RIGHT COLUMN (lg:col-span-4): Sticky Technical Project Inspector */}
          <aside className="lg:col-span-4 studio-panel rounded-2xl p-4 sm:p-6 space-y-5 lg:sticky lg:top-20">
            {/* Integrated Header */}
            <div className="space-y-3">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-primary/10 border border-primary/25 text-xs font-mono font-medium text-primary">
                  <Layers className="w-3.5 h-3.5 shrink-0" />
                  <span>{project.category ?? 'Proyecto de Ingeniería'}</span>
                </span>
                <span className="inline-flex items-center px-2 py-0.5 rounded-md bg-muted/60 border border-border text-xs font-mono text-muted-foreground tabular-nums">
                  ID #{project.id}
                </span>
              </div>

              <h1 className="text-xl sm:text-2xl font-bold tracking-[-0.02em] text-foreground leading-snug text-balance">
                {project.title}
              </h1>
            </div>

            {/* Immediate Primary Actions */}
            <div className="space-y-2.5">
              {hasDemo && (
                <a
                  href={project.demo}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full min-h-[44px] sm:min-h-0 sm:h-10 inline-flex items-center justify-center gap-2 px-4 bg-primary hover:bg-primary/90 text-primary-foreground rounded-xl text-sm font-semibold transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
                >
                  <ExternalLink className="w-4 h-4" />
                  <span>Abrir Demo en Vivo</span>
                </a>
              )}

              {hasGithub && (
                <a
                  href={project.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full min-h-[44px] sm:min-h-0 sm:h-10 inline-flex items-center justify-center gap-2 px-4 bg-muted/50 hover:bg-muted text-foreground border border-border hover:border-primary/40 rounded-xl text-sm font-semibold transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                >
                  <Github className="w-4 h-4" />
                  <span>Ver Código en GitHub</span>
                </a>
              )}

              {hasVideo && (
                <button
                  type="button"
                  onClick={handleFocusVideo}
                  className="w-full min-h-[44px] sm:min-h-0 sm:h-10 inline-flex items-center justify-center gap-2 px-4 bg-primary/10 hover:bg-primary/15 text-primary border border-primary/25 rounded-xl text-sm font-semibold transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                >
                  <Play className="w-4 h-4" />
                  <span>
                    {activeMedia === 'video' ? 'Video Demostrativo Activo' : 'Ver Video Demostrativo'}
                  </span>
                </button>
              )}

              {!hasDemo && !hasGithub && !hasVideo && (
                <p className="text-xs text-muted-foreground leading-relaxed">
                  Repositorio privado o entorno corporativo sin enlaces públicos habilitados.
                </p>
              )}
            </div>

            {/* Stack & Specifications */}
            <div className="pt-4 border-t border-border space-y-3">
              <div className="flex items-center justify-between gap-2">
                <h2 className="text-xs font-mono font-semibold text-muted-foreground uppercase tracking-wider">
                  Stack & Especificaciones
                </h2>
                <span className="text-xs font-mono text-primary bg-primary/10 border border-primary/20 px-2 py-0.5 rounded-md tabular-nums">
                  {project.technologies.length}
                </span>
              </div>

              <div className="flex flex-wrap gap-1.5">
                {project.technologies.map((tech, idx) => (
                  <span
                    key={idx}
                    className="px-2.5 py-1 rounded-lg border border-border bg-muted/50 text-xs font-mono text-foreground"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          </aside>
        </div>

        {/* Compact Other Projects Navigator */}
        {otherProjects.length > 0 && (
          <section className="space-y-3 pt-1">
            <div className="flex items-center justify-between gap-2">
              <h2 className="text-sm sm:text-base font-semibold text-foreground flex items-center gap-2">
                <Layers className="w-4 h-4 text-primary" />
                <span>Otros Proyectos</span>
              </h2>
              <span className="text-xs font-mono text-muted-foreground tabular-nums">
                {otherProjects.length} sugeridos · Usa ← / →
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {otherProjects.map((other) => {
                const otherHasVideo = Boolean(other.video && other.video !== '#')
                return (
                  <Link
                    key={other.id}
                    href={`/projects/${other.id}`}
                    className="group studio-panel rounded-2xl p-3 flex items-center gap-3.5 hover:border-primary/40 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                  >
                    <div className="relative w-16 h-14 rounded-xl overflow-hidden bg-muted/40 border border-border shrink-0">
                      <Image
                        src={other.image}
                        alt={other.title}
                        fill
                        className="object-cover transition-transform duration-300 group-hover:scale-[1.04]"
                        sizes="64px"
                      />
                    </div>

                    <div className="min-w-0 flex-1">
                      <h3 className="text-sm font-semibold text-foreground group-hover:text-primary transition-colors truncate">
                        {other.title}
                      </h3>
                      <div className="flex items-center gap-2 mt-1">
                        <span className="text-xs font-mono text-muted-foreground tabular-nums">
                          #{other.id}
                        </span>
                        {otherHasVideo && (
                          <span className="inline-flex items-center gap-1 px-1.5 py-0.5 rounded bg-primary/10 border border-primary/20 text-xs font-mono text-primary">
                            <Play className="w-2.5 h-2.5" />
                            <span>Video Demo</span>
                          </span>
                        )}
                      </div>
                    </div>

                    <ArrowUpRight className="w-4 h-4 text-muted-foreground group-hover:text-primary group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all shrink-0" />
                  </Link>
                )
              })}
            </div>
          </section>
        )}
        </main>
      </div>
    </div>
  )
}
