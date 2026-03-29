'use client'

import { useState, useRef, useEffect } from 'react'
import { Github, ExternalLink, ChevronDown, Star, GitFork } from 'lucide-react'

/**
 * COMPONENTE GITHUB REPOS DROPDOWN
 * ================================
 * Ubicación: components/GitHubReposDropdown.tsx
 * 
 * ¿Qué hace?
 * - Muestra un dropdown con los repositorios de GitHub
 * - Animación 3D con rotación suave
 * - Enlaces directos a cada repositorio
 * - Información de estrellas y forks
 * 
 * ¿Cómo personalizar?
 * - Modifica el array 'repos' con tus repositorios
 * - Actualiza los URLs de GitHub
 * - Cambia los nombres y descripciones
 */

interface Repository {
  name: string
  description: string
  url: string
  stars?: number
  forks?: number
  language?: string
  color?: string
}

const repos: Repository[] = [
  {
    name: 'Backend API Framework',
    description: 'Framework REST API escalable con Java y Spring Boot',
    url: 'https://github.com/brandon-hualpa/backend-api-framework',
    stars: 234,
    forks: 45,
    language: 'Java',
    color: '#F89820'
  },
  {
    name: 'Linux System Tools',
    description: 'Herramientas de administración de sistemas Linux',
    url: 'https://github.com/brandon-hualpa/linux-tools',
    stars: 156,
    forks: 23,
    language: 'Python',
    color: '#3776AB'
  },
  {
    name: 'Database Optimization',
    description: 'Scripts y técnicas de optimización de bases de datos',
    url: 'https://github.com/brandon-hualpa/db-optimization',
    stars: 89,
    forks: 12,
    language: 'SQL',
    color: '#336791'
  },
  {
    name: 'Microservices Architecture',
    description: 'Patrón de arquitectura de microservicios',
    url: 'https://github.com/brandon-hualpa/microservices-arch',
    stars: 445,
    forks: 78,
    language: 'Java',
    color: '#F89820'
  },
  {
    name: 'Docker Compose Setup',
    description: 'Configuraciones Docker para desarrollo local',
    url: 'https://github.com/brandon-hualpa/docker-setup',
    stars: 312,
    forks: 56,
    language: 'YAML',
    color: '#2496ED'
  },
  {
    name: 'RESTful API Testing',
    description: 'Suite de testing para APIs REST con Postman y Jest',
    url: 'https://github.com/brandon-hualpa/api-testing',
    stars: 178,
    forks: 34,
    language: 'JavaScript',
    color: '#F7DF1E'
  }
]

export function GitHubReposDropdown() {
  const [isOpen, setIsOpen] = useState(false)
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null)
  const dropdownRef = useRef<HTMLDivElement>(null)

  // Cerrar dropdown cuando se haga clic fuera
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  return (
    <div className="relative inline-block" ref={dropdownRef}>
      {/* Main Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="group px-6 py-3 rounded-lg bg-card border border-accent/30 text-foreground font-semibold hover:border-accent/60 hover:bg-accent/5 transition-all duration-300 hover:shadow-lg hover:shadow-accent/40 flex items-center gap-2"
      >
        <Github className="w-5 h-5 text-accent" />
        <span>Mis Repositorios</span>
        <ChevronDown className={`w-5 h-5 transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`} />
      </button>

      {/* Dropdown Menu */}
      {isOpen && (
        <div className="absolute top-full left-0 mt-3 w-96 bg-card border border-accent/30 rounded-xl shadow-2xl shadow-accent/20 overflow-hidden z-50 animate-in fade-in-50 slide-in-from-top-2">
          {/* Header */}
          <div className="bg-gradient-to-r from-primary/20 to-accent/20 px-6 py-4 border-b border-accent/30">
            <h3 className="font-bold text-foreground flex items-center gap-2">
              <Github className="w-5 h-5 text-accent" />
              Repositorios Destacados
            </h3>
            <p className="text-xs text-muted-foreground mt-1">{repos.length} repositorios disponibles</p>
          </div>

          {/* Repos List */}
          <div className="max-h-96 overflow-y-auto">
            {repos.map((repo, index) => (
              <a
                key={index}
                href={repo.url}
                target="_blank"
                rel="noopener noreferrer"
                onMouseEnter={() => setHoveredIndex(index)}
                onMouseLeave={() => setHoveredIndex(null)}
                className="group/repo px-6 py-4 border-b border-accent/10 hover:bg-accent/10 transition-all duration-300 block cursor-pointer relative overflow-hidden"
              >
                {/* Fondo con efecto manga */}
                <div className="absolute inset-0 bg-gradient-to-r from-primary/0 via-primary/5 to-accent/0 opacity-0 group-hover/repo:opacity-100 transition-opacity duration-300" />

                {/* Contenido */}
                <div className="relative z-10">
                  {/* Título y lenguaje */}
                  <div className="flex items-start justify-between mb-2">
                    <h4 className="font-bold text-foreground group-hover/repo:text-accent transition-colors">
                      {repo.name}
                    </h4>
                    <ExternalLink className="w-4 h-4 text-muted-foreground group-hover/repo:text-accent opacity-0 group-hover/repo:opacity-100 transition-all transform group-hover/repo:translate-x-0.5" />
                  </div>

                  {/* Descripción */}
                  <p className="text-sm text-muted-foreground mb-3 group-hover/repo:text-foreground/80 transition-colors">
                    {repo.description}
                  </p>

                  {/* Stats */}
                  <div className="flex items-center gap-4 text-xs text-muted-foreground">
                    {repo.language && (
                      <div className="flex items-center gap-1">
                        <div
                          className="w-2 h-2 rounded-full"
                          style={{ backgroundColor: repo.color }}
                        />
                        <span>{repo.language}</span>
                      </div>
                    )}
                    {repo.stars !== undefined && (
                      <div className="flex items-center gap-1">
                        <Star className="w-3.5 h-3.5" />
                        <span>{repo.stars}</span>
                      </div>
                    )}
                    {repo.forks !== undefined && (
                      <div className="flex items-center gap-1">
                        <GitFork className="w-3.5 h-3.5" />
                        <span>{repo.forks}</span>
                      </div>
                    )}
                  </div>
                </div>

                {/* Manga-style accent line */}
                <div className="absolute bottom-0 left-0 h-0.5 w-0 bg-gradient-to-r from-primary to-accent group-hover/repo:w-full transition-all duration-300" />
              </a>
            ))}
          </div>

          {/* Footer */}
          <div className="bg-card/50 px-6 py-3 border-t border-accent/30">
            <a
              href="https://github.com/brandon-hualpa"
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm text-accent hover:text-accent/80 font-semibold transition-colors flex items-center gap-1"
            >
              Ver todos los repositorios
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </div>
        </div>
      )}

      {/* Estilos de animación manga */}
      <style jsx>{`
        @keyframes mangaPulse {
          0%, 100% {
            box-shadow: 0 0 15px rgba(139, 92, 246, 0.3);
          }
          50% {
            box-shadow: 0 0 25px rgba(139, 92, 246, 0.6);
          }
        }

        .group:hover {
          animation: mangaPulse 2s ease-in-out infinite;
        }
      `}</style>
    </div>
  )
}
