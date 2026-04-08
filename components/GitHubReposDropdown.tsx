'use client'

import { useState, useRef, useEffect } from 'react'
import { Github, ExternalLink, ChevronDown, Star, GitFork } from 'lucide-react'

/**
 * COMPONENTE GITHUB REPOS DROPDOWN
 * ================================
 * Ubicación: components/GitHubReposDropdown.tsx
 *
 * ¿Qué hace?
 * - Muestra un dropdown con tus repositorios reales de GitHub
 * - Ya NO usa un array manual
 * - Consume la API pública de GitHub
 * - Mantiene el estilo visual de tu componente original
 *
 * API usada:
 * https://api.github.com/users/BrandonAlbertt/repos
 */

/**
 * MODIFICACIÓN 1:
 * Esta interfaz ahora representa la forma en la que
 * GitHub devuelve los repositorios.
 *
 * No necesitamos tipar todos los campos de la API,
 * solo los que realmente vamos a usar en el componente.
 */
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

/**
 * MODIFICACIÓN 2:
 * Función auxiliar para asignar un color aproximado según el lenguaje.
 * Esto reemplaza el color manual que antes estaba en el array.
 */
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
  /**
   * MODIFICACIÓN 3:
   * repos ahora viene desde la API, no desde un array fijo.
   */
  const [repos, setRepos] = useState<GitHubRepo[]>([])

  /**
   * MODIFICACIÓN 4:
   * Estados para controlar carga y error.
   */
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const [isOpen, setIsOpen] = useState(false)
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null)
  const dropdownRef = useRef<HTMLDivElement>(null)

  /**
   * MODIFICACIÓN 5:
   * Cerramos el dropdown cuando se hace clic fuera.
   * Esto ya lo tenías y se mantiene.
   */
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  /**
   * MODIFICACIÓN 6:
   * Aquí traemos los repos reales desde la API de GitHub.
   *
   * También:
   * - quitamos forks
   * - ordenamos por fecha de push más reciente
   * - guardamos el resultado en el estado
   */
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

        /**
         * MODIFICACIÓN 7:
         * Filtramos y ordenamos los repositorios.
         *
         * - !repo.fork => quita repos copiados/forkeados
         * - sort por pushed_at => muestra primero los más recientes
         */
        const filteredAndSortedRepos = data
          .filter((repo) => !repo.fork)
          .sort(
            (a, b) =>
              new Date(b.pushed_at).getTime() - new Date(a.pushed_at).getTime()
          )

        setRepos(filteredAndSortedRepos)
      } catch (err) {
        console.error('Error al obtener repositorios:', err)
        setError('No se pudieron cargar los repositorios.')
      } finally {
        setIsLoading(false)
      }
    }

    fetchRepos()
  }, [])

  return (
    <div className="relative inline-block" ref={dropdownRef}>
      {/* Botón principal */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="group px-6 py-3 rounded-lg bg-card border border-accent/30 text-foreground font-semibold hover:border-accent/60 hover:bg-accent/5 transition-all duration-300 hover:shadow-lg hover:shadow-accent/40 flex items-center gap-2"
      >
        <Github className="w-5 h-5 text-accent" />
        <span>Mis Repositorios</span>
        <ChevronDown
          className={`w-5 h-5 transition-transform duration-300 ${isOpen ? 'rotate-180' : ''
            }`}
        />
      </button>

      {/* Dropdown */}
      {isOpen && (
        <div className="absolute top-full left-0 mt-3 w-96 bg-card border border-accent/30 rounded-xl shadow-2xl shadow-accent/20 overflow-hidden z-50 animate-in fade-in-50 slide-in-from-top-2">
          {/* Header */}
          <div className="bg-gradient-to-r from-primary/20 to-accent/20 px-6 py-4 border-b border-accent/30">
            <h3 className="font-bold text-foreground flex items-center gap-2">
              <Github className="w-5 h-5 text-accent" />
              Repositorios de GitHub
            </h3>

            <p className="text-xs text-muted-foreground mt-1">
              {isLoading ? 'Cargando repositorios...' : `${repos.length} repositorios disponibles`}
            </p>
          </div>

          {/* Lista */}
          <div className="max-h-96 overflow-y-auto">
            {isLoading && (
              <div className="px-6 py-8 text-center text-sm text-muted-foreground">
                Cargando repositorios desde GitHub...
              </div>
            )}

            {!isLoading && error && (
              <div className="px-6 py-8 text-center text-sm text-red-400">
                {error}
              </div>
            )}

            {!isLoading && !error && repos.length === 0 && (
              <div className="px-6 py-8 text-center text-sm text-muted-foreground">
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
                  onMouseEnter={() => setHoveredIndex(index)}
                  onMouseLeave={() => setHoveredIndex(null)}
                  className="group/repo px-6 py-4 border-b border-accent/10 hover:bg-accent/10 transition-all duration-300 block cursor-pointer relative overflow-hidden"
                >
                  {/* Fondo con efecto */}
                  <div className="absolute inset-0 bg-gradient-to-r from-primary/0 via-primary/5 to-accent/0 opacity-0 group-hover/repo:opacity-100 transition-opacity duration-300" />

                  {/* Contenido */}
                  <div className="relative z-10">
                    {/* Título y link */}
                    <div className="flex items-start justify-between mb-2 gap-3">
                      <h4 className="font-bold text-foreground group-hover/repo:text-accent transition-colors break-words">
                        {repo.name}
                      </h4>

                      <ExternalLink className="w-4 h-4 text-muted-foreground group-hover/repo:text-accent opacity-0 group-hover/repo:opacity-100 transition-all transform group-hover/repo:translate-x-0.5 shrink-0" />
                    </div>

                    {/* Descripción */}
                    <p className="text-sm text-muted-foreground mb-3 group-hover/repo:text-foreground/80 transition-colors">
                      {repo.description ?? 'Repositorio público en GitHub sin descripción.'}
                    </p>

                    {/* Stats */}
                    <div className="flex items-center gap-4 text-xs text-muted-foreground flex-wrap">
                      {repo.language && (
                        <div className="flex items-center gap-1">
                          <div
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

                      {/* Info extra útil */}
                      <div className="text-[11px] text-muted-foreground/80">
                        {hoveredIndex === index
                          ? `Actualizado: ${new Date(repo.pushed_at).toLocaleDateString('es-PE')}`
                          : ''}
                      </div>
                    </div>
                  </div>

                  {/* Línea inferior animada */}
                  <div className="absolute bottom-0 left-0 h-0.5 w-0 bg-gradient-to-r from-primary to-accent group-hover/repo:w-full transition-all duration-300" />
                </a>
              ))}
          </div>

          {/* Footer */}
          <div className="bg-card/50 px-6 py-3 border-t border-accent/30">
            <a
              href="https://github.com/BrandonAlbertt?tab=repositories"
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

      {/* Estilos de animación */}
      <style jsx>{`
        @keyframes mangaPulse {
          0%,
          100% {
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