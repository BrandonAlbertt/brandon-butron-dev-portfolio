'use client'

import { useState, useEffect } from 'react'
import { useTheme } from 'next-themes'
import {
  Home,
  User,
  Wrench,
  Briefcase,
  Award,
  Mail,
  Github,
  Linkedin,
  Youtube,
  Sun,
  Moon,
  Menu,
  X,
} from 'lucide-react'

export type WorkspaceView =
  | 'overview'
  | 'about'
  | 'skills'
  | 'projects'
  | 'certificates'
  | 'contact'

export interface WorkspaceNavItem {
  id: WorkspaceView
  name: string
  href: string
  shortcut: string
  description: string
  icon: React.ElementType
}

export const WORKSPACE_NAV_ITEMS: WorkspaceNavItem[] = [
  {
    id: 'overview',
    name: 'Inicio',
    href: '#hero',
    shortcut: '1',
    description: 'Resumen y disponibilidad',
    icon: Home,
  },
  {
    id: 'about',
    name: 'Sobre mí',
    href: '#about',
    shortcut: '2',
    description: 'Perfil, educación y grados',
    icon: User,
  },
  {
    id: 'skills',
    name: 'Stack & 3D',
    href: '#skills',
    shortcut: '3',
    description: 'Tecnologías y arquitectura',
    icon: Wrench,
  },
  {
    id: 'projects',
    name: 'Proyectos',
    href: '#projects',
    shortcut: '4',
    description: 'Trabajos y demostraciones',
    icon: Briefcase,
  },
  {
    id: 'certificates',
    name: 'Certificados',
    href: '#certificates',
    shortcut: '5',
    description: 'Credenciales oficiales UTP',
    icon: Award,
  },
  {
    id: 'contact',
    name: 'Contacto',
    href: '#contact',
    shortcut: '6',
    description: 'Canales y mensaje directo',
    icon: Mail,
  },
]

interface BrandMarkProps {
  ringClassName?: string
}

export function BrandMark({ ringClassName = 'ring-sidebar' }: BrandMarkProps) {
  return (
    <div className="relative w-10 h-10 shrink-0">
      <div className="w-10 h-10 rounded-xl bg-gradient-to-b from-primary/20 via-primary/5 to-transparent dark:from-blue-500/20 dark:via-slate-900 dark:to-slate-950 border border-primary/30 shadow-[inset_0_1px_0_0_rgba(255,255,255,0.15)] flex items-center justify-center transition-all duration-200 group-hover:border-primary/55 group-hover:shadow-[inset_0_1px_0_0_rgba(255,255,255,0.22),0_4px_14px_-4px_rgba(37,99,235,0.28)]">
        <svg
          viewBox="0 0 28 28"
          className="w-6 h-6"
          fill="none"
          aria-hidden="true"
        >
          {/* Technical hexagonal frame */}
          <polygon
            points="14,2.5 24.5,8.25 24.5,19.75 14,25.5 3.5,19.75 3.5,8.25"
            stroke="currentColor"
            strokeWidth="1.2"
            strokeLinejoin="round"
            className="text-primary/35"
          />
          {/* Terminal prompt chevron */}
          <path
            d="M6.75 11.25L9.25 14L6.75 16.75"
            stroke="currentColor"
            strokeWidth="1.8"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="text-primary"
          />
          {/* Monogram B */}
          <path
            d="M11.25 9.25V18.75M11.25 9.25H14.55C15.9 9.25 16.8 10.05 16.8 11.35C16.8 12.65 15.9 13.75 14.55 13.75H11.25M11.25 13.75H14.95C16.45 13.75 17.25 14.7 17.25 16.25C17.25 17.8 16.45 18.75 14.95 18.75H11.25"
            stroke="currentColor"
            strokeWidth="1.8"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="text-foreground"
          />
          {/* Console underscore cursor */}
          <path
            d="M18.5 18.75H21.75"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            className="text-accent"
          />
        </svg>
      </div>

      {/* Active status indicator (6px) */}
      <span
        aria-hidden="true"
        className={`absolute -bottom-0.5 -right-0.5 w-1.5 h-1.5 rounded-full bg-emerald-500 ring-2 ${ringClassName}`}
      />
    </div>
  )
}

interface SidebarProps {
  activeView?: WorkspaceView
  onSelectView?: (view: WorkspaceView) => void
}

export function Sidebar({ activeView, onSelectView }: SidebarProps) {
  const [internalView, setInternalView] = useState<WorkspaceView>('overview')
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const { theme, setTheme, resolvedTheme } = useTheme()
  const [mounted, setMounted] = useState(false)

  const currentView = activeView ?? internalView
  const activeItem =
    WORKSPACE_NAV_ITEMS.find((item) => item.id === currentView) ?? WORKSPACE_NAV_ITEMS[0]

  const isDark = mounted
    ? resolvedTheme === 'dark' || (!resolvedTheme && theme === 'dark') || theme === 'dark'
    : true

  const toggleTheme = () => {
    setTheme(isDark ? 'light' : 'dark')
  }

  useEffect(() => {
    setMounted(true)
  }, [])

  useEffect(() => {
    if (!mobileMenuOpen) return

    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setMobileMenuOpen(false)
      }
    }

    window.addEventListener('keydown', handleEscape)
    return () => window.removeEventListener('keydown', handleEscape)
  }, [mobileMenuOpen])

  const handleSelect = (item: WorkspaceNavItem) => {
    if (onSelectView) {
      onSelectView(item.id)
    } else {
      setInternalView(item.id)
      const targetId = item.href.replace('#', '')
      document.getElementById(targetId)?.scrollIntoView({ behavior: 'smooth' })
    }
    setMobileMenuOpen(false)
  }

  return (
    <>
      {/* DESKTOP SIDEBAR (Visible en lg y superior) */}
      <aside className="hidden lg:flex fixed left-0 top-0 bottom-0 w-64 z-50 flex-col justify-between bg-sidebar/95 backdrop-blur-xl border-r border-sidebar-border px-4 py-5 select-none transition-colors duration-300">
        {/* Header / Brand */}
        <div>
          <button
            type="button"
            onClick={() => handleSelect(WORKSPACE_NAV_ITEMS[0])}
            className="w-full flex items-center gap-3 p-2 rounded-xl text-left group mb-6 transition-colors duration-200 hover:bg-muted/70 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-sidebar"
          >
            <BrandMark />

            <div className="flex flex-col min-w-0">
              <span className="text-sidebar-foreground font-semibold text-sm tracking-tight truncate group-hover:text-primary transition-colors duration-200">
                Brandon Butron
              </span>
              <span className="text-xs font-mono text-muted-foreground truncate">
                Backend Developer
              </span>
            </div>
          </button>

          <div className="px-2.5 mb-2 flex items-center justify-between">
            <span className="text-xs font-medium text-muted-foreground">Workspace</span>
            <span className="text-xs font-mono text-muted-foreground">1–6</span>
          </div>

          {/* Navigation Views */}
          <nav className="flex flex-col gap-1" aria-label="Vistas del portafolio">
            {WORKSPACE_NAV_ITEMS.map((item) => {
              const Icon = item.icon
              const isActive = currentView === item.id

              return (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => handleSelect(item)}
                  aria-current={isActive ? 'page' : undefined}
                  className={`flex items-center justify-between gap-2.5 px-3 py-2.5 rounded-xl text-sm transition-all duration-200 text-left w-full group relative active:scale-[0.99] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-sidebar ${
                    isActive
                      ? 'bg-sidebar-accent text-sidebar-accent-foreground border border-primary/25 font-semibold'
                      : 'text-muted-foreground hover:text-sidebar-foreground hover:bg-muted/70 border border-transparent font-medium'
                  }`}
                >
                  {isActive && (
                    <span
                      aria-hidden="true"
                      className="absolute left-0 top-2 bottom-2 w-0.5 bg-primary rounded-r-full"
                    />
                  )}

                  <span className="flex items-center gap-2.5 min-w-0">
                    <Icon
                      strokeWidth={1.75}
                      className={`w-4 h-4 shrink-0 transition-colors duration-200 ${
                        isActive
                          ? 'text-primary'
                          : 'text-muted-foreground group-hover:text-sidebar-foreground'
                      }`}
                    />
                    <span className="truncate">{item.name}</span>
                  </span>

                  <kbd
                    className={`font-mono text-xs px-1.5 py-0.5 rounded border transition-colors duration-200 ${
                      isActive
                        ? 'bg-background/80 border-primary/25 text-primary'
                        : 'bg-muted/50 border-border text-muted-foreground group-hover:text-sidebar-foreground'
                    }`}
                  >
                    {item.shortcut}
                  </kbd>
                </button>
              )
            })}
          </nav>
        </div>

        {/* Footer / Socials & Theme Toggle */}
        <div className="pt-4 border-t border-sidebar-border flex flex-col gap-3">
          <div className="flex items-center justify-between px-1">
            <a
              href="https://github.com/BrandonAlbertt"
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 rounded-lg text-muted-foreground hover:text-sidebar-foreground hover:bg-muted/80 transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
              aria-label="GitHub"
            >
              <Github className="w-4 h-4" />
            </a>
            <a
              href="https://linkedin.com/in/brandon-alberto-hualpa-butron-730a7a370"
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 rounded-lg text-muted-foreground hover:text-primary hover:bg-primary/10 transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
              aria-label="LinkedIn"
            >
              <Linkedin className="w-4 h-4" />
            </a>
            <a
              href="https://youtube.com/@brandonbytes?si=UFkq8JG7QV5AzhhU"
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 rounded-lg text-muted-foreground hover:text-destructive hover:bg-destructive/10 transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
              aria-label="YouTube"
            >
              <Youtube className="w-4 h-4" />
            </a>
            <a
              href="mailto:brandonbutron.ing.software@gmail.com"
              className="p-2 rounded-lg text-muted-foreground hover:text-primary hover:bg-primary/10 transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
              aria-label="Correo"
            >
              <Mail className="w-4 h-4" />
            </a>
          </div>

          {mounted && (
            <div className="flex items-center justify-between px-3 py-2 rounded-xl bg-muted/60 border border-border">
              <span className="flex items-center gap-2 text-xs text-muted-foreground font-medium">
                {isDark ? (
                  <Moon className="w-3.5 h-3.5 text-primary" />
                ) : (
                  <Sun className="w-3.5 h-3.5 text-amber-500" />
                )}
                <span>{isDark ? 'Tema oscuro' : 'Tema claro'}</span>
              </span>

              <button
                type="button"
                role="switch"
                aria-checked={isDark}
                onClick={toggleTheme}
                aria-label="Cambiar tema"
                className="relative inline-flex h-5 w-9 shrink-0 cursor-pointer rounded-full border border-border bg-background transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-sidebar"
              >
                <span
                  className={`pointer-events-none inline-block h-4 w-4 transform rounded-full bg-primary shadow-xs transition-transform duration-200 ease-[cubic-bezier(0.22,1,0.36,1)] mt-px ${
                    isDark ? 'translate-x-4' : 'translate-x-0.5'
                  }`}
                />
              </button>
            </div>
          )}
        </div>
      </aside>

      {/* MOBILE HEADER BAR (Visible en móviles y tablets <lg) */}
      <header className="lg:hidden sticky top-0 z-50 w-full bg-sidebar/95 backdrop-blur-xl border-b border-sidebar-border px-4 py-2.5 shadow-xs transition-colors duration-300">
        <div className="flex items-center justify-between gap-3">
          <button
            type="button"
            onClick={() => handleSelect(WORKSPACE_NAV_ITEMS[0])}
            className="group flex items-center gap-2.5 min-h-[44px] py-0.5 pr-2 text-left rounded-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
          >
            <BrandMark />
            <div className="flex flex-col">
              <span className="text-sidebar-foreground font-semibold text-sm leading-tight">
                Brandon Butron
              </span>
              <span className="text-xs font-mono text-muted-foreground leading-tight">
                {activeItem.name}
              </span>
            </div>
          </button>

          <div className="flex items-center gap-2 shrink-0">
            {mounted && (
              <button
                type="button"
                onClick={toggleTheme}
                className="w-10 h-10 inline-flex items-center justify-center rounded-xl bg-muted/70 border border-border text-muted-foreground hover:text-sidebar-foreground transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                aria-label="Cambiar tema"
              >
                {isDark ? (
                  <Moon className="w-4 h-4 text-primary" />
                ) : (
                  <Sun className="w-4 h-4 text-amber-500" />
                )}
              </button>
            )}

            <button
              type="button"
              onClick={() => setMobileMenuOpen((prev) => !prev)}
              aria-expanded={mobileMenuOpen}
              className="w-10 h-10 inline-flex items-center justify-center rounded-xl bg-muted/70 border border-border text-sidebar-foreground transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
              aria-label={mobileMenuOpen ? 'Cerrar menú' : 'Abrir menú'}
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile Dropdown Drawer */}
        {mobileMenuOpen && (
          <nav
            aria-label="Navegación móvil"
            className="mt-2.5 p-2.5 rounded-2xl border border-border backdrop-blur-xl bg-background/90 shadow-2xl space-y-1.5 max-h-[calc(100vh-5rem)] overflow-y-auto workspace-view-enter"
          >
            {WORKSPACE_NAV_ITEMS.map((item) => {
              const Icon = item.icon
              const isActive = currentView === item.id

              return (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => handleSelect(item)}
                  aria-current={isActive ? 'page' : undefined}
                  className={`flex items-center justify-between gap-3 w-full min-h-[44px] px-3.5 py-2.5 rounded-xl text-sm transition-colors duration-200 text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring ${
                    isActive
                      ? 'bg-sidebar-accent text-sidebar-accent-foreground font-semibold border border-primary/30'
                      : 'text-foreground/85 hover:bg-muted/70 hover:text-foreground border border-transparent'
                  }`}
                >
                  <span className="flex items-center gap-3 min-w-0">
                    <Icon strokeWidth={1.75} className={`w-4 h-4 shrink-0 ${isActive ? 'text-primary' : 'text-muted-foreground'}`} />
                    <span className="truncate">{item.name}</span>
                  </span>
                  <span className="text-xs text-muted-foreground truncate shrink-0 max-w-[48%] text-right">
                    {item.description}
                  </span>
                </button>
              )
            })}

            {/* Mobile Socials */}
            <div className="pt-2 mt-2 border-t border-border flex items-center justify-around">
              <a
                href="https://github.com/BrandonAlbertt"
                target="_blank"
                rel="noopener noreferrer"
                className="min-w-[44px] min-h-[44px] inline-flex items-center justify-center rounded-xl text-muted-foreground hover:text-foreground hover:bg-muted/60 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                aria-label="GitHub"
              >
                <Github className="w-5 h-5" />
              </a>
              <a
                href="https://linkedin.com/in/brandon-alberto-hualpa-butron-730a7a370"
                target="_blank"
                rel="noopener noreferrer"
                className="min-w-[44px] min-h-[44px] inline-flex items-center justify-center rounded-xl text-muted-foreground hover:text-primary hover:bg-primary/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                aria-label="LinkedIn"
              >
                <Linkedin className="w-5 h-5" />
              </a>
              <a
                href="https://youtube.com/@brandonbytes?si=UFkq8JG7QV5AzhhU"
                target="_blank"
                rel="noopener noreferrer"
                className="min-w-[44px] min-h-[44px] inline-flex items-center justify-center rounded-xl text-muted-foreground hover:text-destructive hover:bg-destructive/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                aria-label="YouTube"
              >
                <Youtube className="w-5 h-5" />
              </a>
              <a
                href="mailto:brandonbutron.ing.software@gmail.com"
                className="min-w-[44px] min-h-[44px] inline-flex items-center justify-center rounded-xl text-muted-foreground hover:text-primary hover:bg-primary/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                aria-label="Email"
              >
                <Mail className="w-5 h-5" />
              </a>
            </div>
          </nav>
        )}
      </header>
    </>
  )
}
