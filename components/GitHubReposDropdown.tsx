'use client'

import { useState, useRef, useEffect } from 'react'
import { Github, ExternalLink, ChevronDown, Star, GitFork } from 'lucide-react'

interface GitHubRepo {
  id: number
  name: string
  description: string | null
  html_url: string
  stargazers_count: number
  forks_count: number
  language: string | null
  fork: boolean
  homepage: string | null
  pushed_at: string
}

function getLanguageColor(language: string | null): string {
  switch (language) {
    case 'Java':
      return '#F89820'
    case 'JavaScript':
      return '#F7DF1E'
    case 'TypeScript':
      return '#3178C6'
    case 'Python':
      return '#3776AB'
    case 'C#':
      return '#8A2BE2'
    case 'Kotlin':
      return '#A97BFF'
    case 'SQL':
      return '#336791'
    case 'HTML':
      return '#E34F26'
    case 'CSS':
      return '#1572B6'
    case 'Shell':
      return '#89E051'
    case 'Go':
      return '#00ADD8'
    case 'Rust':
      return '#DEA584'
    case 'PHP':
      return '#777BB4'
    case 'C++':
      return '#00599C'
    case 'C':
      return '#A8B9CC'
    case 'GDScript':
      return '#478CBF'
    case 'YAML':
      return '#CB171E'
    default:
      return '#6B7280'
  }
}

export function GitHubReposDropdown() {
  const [repos, setRepos] = useState<GitHubRepo[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [isOpen, setIsOpen] = useState(false)
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null)
  const dropdownRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false)
      }
    }

    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setIsOpen(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    document.addEventListener('keydown', handleEscape)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
      document.removeEventListener('keydown', handleEscape)
    }
  }, [])

  useEffect(() => {
    const fetchRepos = async () => {
      try {
        setIsLoading(true)
        setError(null)

        const response = await fetch('https://api.github.com/users/BrandonAlbertt/repos')
        if (!response.ok) {
          throw new Error('No se pudieron cargar los repositorios de GitHub')
        }

        const data: GitHubRepo[] = await response.json()
        const filteredAndSortedRepos = data
          .filter((repo) => !repo.fork)
          .sort(
            (a, b) =>
              new Date(b.pushed_at).getTime() - new Date(a.pushed_at).getTime()
          )

        setRepos(filteredAndSortedRepos)
      } catch (err) {
        console.error('Error al obtener repositorios:', err)
        setError('No se pudieron cargar los repositorios en este momento.')
      } finally {
        setIsLoading(false)
      }
    }

    fetchRepos()
  }, [])

  return (
    <div className="relative inline-block w-full sm:w-auto z-[100]" ref={dropdownRef}>
      <button
        type="button"
        onClick={() => setIsOpen((prev) => !prev)}
        aria-expanded={isOpen}
        aria-haspopup="menu"
        className="w-full sm:w-auto min-h-[44px] sm:min-h-0 sm:h-10 px-4 rounded-xl bg-background hover:bg-muted border border-border hover:border-primary/40 text-foreground text-sm font-semibold transition-all duration-200 active:scale-[0.98] flex items-center justify-center gap-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
      >
        <Github className="w-4 h-4 text-primary shrink-0" />
        <span>Repositorios</span>
        <ChevronDown
          className={`w-4 h-4 text-muted-foreground transition-transform duration-200 ${
            isOpen ? 'rotate-180' : ''
          }`}
        />
      </button>

      {isOpen && (
        <div
          role="menu"
          className="absolute top-full left-0 mt-2 w-full sm:w-[min(24rem,calc(100vw-4rem))] bg-popover text-popover-foreground border border-border ring-1 ring-border rounded-2xl shadow-2xl overflow-hidden z-[100] workspace-view-enter"
        >
          {/* Header */}
          <div className="bg-muted/50 px-4 py-3.5 border-b border-border flex items-center justify-between gap-2">
            <div>
              <h3 className="text-sm font-semibold text-foreground flex items-center gap-2">
                <Github className="w-4 h-4 text-primary" />
                <span>Repositorios de GitHub</span>
              </h3>
              <p className="text-xs text-muted-foreground mt-0.5 font-mono tabular-nums">
                {isLoading ? 'Sincronizando...' : `${repos.length} repositorios públicos`}
              </p>
            </div>
          </div>

          {/* Lista */}
          <div className="max-h-80 overflow-y-auto divide-y divide-border">
            {isLoading && (
              <div className="p-4 space-y-3" aria-label="Cargando repositorios">
                {[0, 1, 2].map((item) => (
                  <div key={item} className="space-y-2 animate-pulse">
                    <div className="h-4 w-1/2 rounded bg-muted" />
                    <div className="h-3 w-full rounded bg-muted/70" />
                  </div>
                ))}
              </div>
            )}

            {!isLoading && error && (
              <div className="px-4 py-6 text-center text-xs text-destructive">
                {error}
              </div>
            )}

            {!isLoading && !error && repos.length === 0 && (
              <div className="px-4 py-6 text-center text-xs text-muted-foreground">
                No se encontraron repositorios públicos.
              </div>
            )}

            {!isLoading &&
              !error &&
              repos.map((repo, index) => (
                <a
                  key={repo.id}
                  href={repo.html_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  role="menuitem"
                  onMouseEnter={() => setHoveredIndex(index)}
                  onMouseLeave={() => setHoveredIndex(null)}
                  className="group/repo block px-4 py-3.5 hover:bg-muted/60 transition-colors duration-200 focus-visible:outline-none focus-visible:bg-muted/80"
                >
                  <div className="flex items-start justify-between mb-1.5 gap-2">
                    <h4 className="text-sm font-semibold text-foreground group-hover/repo:text-primary transition-colors break-words">
                      {repo.name}
                    </h4>
                    <ExternalLink className="w-3.5 h-3.5 text-muted-foreground group-hover/repo:text-primary shrink-0 mt-0.5 transition-colors" />
                  </div>

                  <p className="text-xs text-muted-foreground mb-2.5 line-clamp-2 leading-relaxed">
                    {repo.description ?? 'Repositorio público en GitHub sin descripción.'}
                  </p>

                  <div className="flex items-center gap-3.5 text-xs text-muted-foreground flex-wrap font-mono tabular-nums">
                    {repo.language && (
                      <div className="flex items-center gap-1.5 font-sans">
                        <span
                          className="w-2 h-2 rounded-full"
                          style={{ backgroundColor: getLanguageColor(repo.language) }}
                        />
                        <span>{repo.language}</span>
                      </div>
                    )}

                    <div className="flex items-center gap-1">
                      <Star className="w-3.5 h-3.5" />
                      <span>{repo.stargazers_count}</span>
                    </div>

                    <div className="flex items-center gap-1">
                      <GitFork className="w-3.5 h-3.5" />
                      <span>{repo.forks_count}</span>
                    </div>

                    {hoveredIndex === index && (
                      <span className="ml-auto text-xs text-muted-foreground">
                        {new Date(repo.pushed_at).toLocaleDateString('es-PE')}
                      </span>
                    )}
                  </div>
                </a>
              ))}
          </div>

          {/* Footer */}
          <div className="bg-muted/40 px-4 py-2.5 border-t border-border">
            <a
              href="https://github.com/BrandonAlbertt?tab=repositories"
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs text-primary hover:underline font-semibold inline-flex items-center gap-1.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring rounded"
            >
              <span>Ver todos los repositorios</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </div>
        </div>
      )}
    </div>
  )
}
