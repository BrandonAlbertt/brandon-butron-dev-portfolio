/**
 * COMPONENTE: ProjectsGrid
 *
 * ¿QUÉ HACE?
 * Este componente muestra todos los proyectos del portfolio en una grilla
 * de tarjetas. Cada tarjeta incluye:
 * - Imagen
 * - Título
 * - Descripción
 * - Tecnologías
 * - Botones para GitHub, Demo y Video
 *
 * ¿DE DÓNDE VIENEN LOS PROYECTOS?
 * Los proyectos se cargan desde el archivo:
 *
 *    /data/projects.json
 *
 * Esto permite agregar o editar proyectos sin modificar el código.
 *
 * ¿CÓMO FUNCIONA?
 *
 * 1️⃣ Se importan los proyectos:
 *    import projectsData from '@/data/projects.json'
 *
 * 2️⃣ Se muestran solo 9 proyectos por página:
 *    const PROJECTS_PER_PAGE = 9
 *
 * 3️⃣ Se calcula qué proyectos mostrar según la página actual:
 *    const currentProjects = projects.slice(startIndex, endIndex)
 *
 * 4️⃣ Se crea una tarjeta por cada proyecto:
 *    currentProjects.map(project => <ProjectCard />)
 *
 * 5️⃣ Cada tarjeta muestra la información del proyecto:
 *    {project.title}
 *    {project.description}
 *    {project.image}
 *
 * 6️⃣ El botón "Video" abre la página de detalles del proyecto:
 *    /projects/{id}
 *
 * ¿CÓMO AGREGAR UN PROYECTO?
 * Solo agrega un nuevo objeto en:
 *
 *    /data/projects.json
 *
 * y aparecerá automáticamente en la grilla.
 */


'use client'

import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { Github, ExternalLink, Play, Zap } from 'lucide-react'

// IMPORTAMOS EL JSON
import projectsData from '@/data/projects.json'

// Interfaz de proyecto
interface Project {
  id: number
  title: string
  description: string
  image: string
  technologies: string[]
  github: string
  demo: string
  video: string
}

// proyectos por página
const PROJECTS_PER_PAGE = 9

export function ProjectsGrid() {

  const [currentPage, setCurrentPage] = useState(1)

  // ahora los proyectos vienen del JSON
  const projects = projectsData as Project[]

  const totalPages = Math.ceil(projects.length / PROJECTS_PER_PAGE)

  const startIndex = (currentPage - 1) * PROJECTS_PER_PAGE
  const endIndex = startIndex + PROJECTS_PER_PAGE

  const currentProjects = projects.slice(startIndex, endIndex)

  return (
    <section id="projects" className="py-20 relative overflow-hidden">

      <div className="absolute top-0 left-0 w-96 h-96 bg-secondary/10 rounded-full blur-3xl opacity-40 -translate-x-1/2 -translate-y-1/2" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-primary/10 rounded-full blur-3xl opacity-40 translate-x-1/2 translate-y-1/2" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">

        <div className="mb-16 text-center relative">

          <div className="h-1 w-20 bg-gradient-to-r from-transparent via-secondary to-transparent mx-auto mb-6 animate-pulse" />

          <h2 className="text-4xl md:text-5xl font-black mb-4 bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent animate-manga-shine">
            Proyectos Destacados
          </h2>

          <p className="text-muted-foreground text-lg max-w-2xl mx-auto mb-2">
            Explorar mi portfolio de proyectos y trabajos realizados
          </p>

          <div className="h-1 w-20 bg-gradient-to-r from-transparent via-primary to-transparent mx-auto mt-6 animate-pulse" />

        </div>

        {/* GRID */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">

          {currentProjects.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}

        </div>

        {/* PAGINACIÓN */}

        {totalPages > 1 && (

          <div className="flex items-center justify-center gap-2 pt-8 border-t border-primary/20">

            <button
              onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
              disabled={currentPage === 1}
              className="px-4 py-2 rounded-lg border border-primary/30 text-foreground hover:bg-primary/10 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              Anterior
            </button>

            <div className="flex gap-2">

              {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (

                <button
                  key={page}
                  onClick={() => setCurrentPage(page)}
                  className={`w-10 h-10 rounded-lg font-semibold transition-all duration-300 ${currentPage === page
                      ? 'bg-primary text-primary-foreground shadow-lg shadow-primary/50'
                      : 'border border-primary/30 text-foreground hover:bg-primary/10'
                    }`}
                >
                  {page}
                </button>

              ))}

            </div>

            <button
              onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
              disabled={currentPage === totalPages}
              className="px-4 py-2 rounded-lg border border-primary/30 text-foreground hover:bg-primary/10 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              Siguiente
            </button>

          </div>

        )}

        <div className="text-center mt-8 text-sm text-muted-foreground">

          Mostrando {startIndex + 1} - {Math.min(endIndex, projects.length)} de {projects.length} proyectos

        </div>

      </div>

    </section>
  )
}

function ProjectCard({ project }: { project: Project }) {

  return (

    <div className="group h-full rounded-xl border-2 border-accent/30 overflow-hidden bg-card hover:border-secondary/70 transition-all duration-300 hover:shadow-2xl hover:shadow-secondary/40 hover:-translate-y-2 flex flex-col relative animate-manga-scale-in hover:bg-gradient-to-br hover:from-primary/5 hover:to-accent/5">

      <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-bl from-secondary/20 to-transparent rounded-bl-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10" />

      <div className="absolute bottom-0 left-0 w-20 h-20 bg-gradient-to-tr from-primary/20 to-transparent rounded-tr-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10" />

      <div className="relative h-48 overflow-hidden bg-muted">

        <Image
          src={project.image}
          alt={project.title}
          fill
          className="object-cover group-hover:scale-125 transition-transform duration-500"
        />

        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

        <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-20">

          <Zap className="w-5 h-5 text-secondary fill-secondary" />

        </div>

      </div>

      <div className="p-6 flex-1 flex flex-col gap-4 relative z-20">

        <h3 className="text-lg font-bold bg-gradient-to-r from-foreground to-primary bg-clip-text text-transparent group-hover:from-secondary group-hover:via-primary group-hover:to-accent transition-all duration-300">
          {project.title}
        </h3>

        <p className="text-sm text-muted-foreground leading-relaxed flex-1 group-hover:text-foreground transition-colors">
          {project.description}
        </p>

        <div className="flex flex-wrap gap-2">

          {project.technologies.slice(0, 3).map((tech) => (

            <span
              key={tech}
              className="px-3 py-1 text-xs rounded-full bg-gradient-to-r from-primary/20 to-accent/20 border-2 border-primary/40 text-primary font-bold hover:border-secondary/60 hover:text-secondary transition-all duration-300"
            >
              {tech}
            </span>

          ))}

          {project.technologies.length > 3 && (

            <span className="px-3 py-1 text-xs rounded-full bg-gradient-to-r from-primary/20 to-accent/20 border-2 border-primary/40 text-primary font-bold">

              +{project.technologies.length - 3}

            </span>

          )}

        </div>

        <div className="flex gap-2 pt-4 border-t border-primary/20">

          <a
            href={project.github}
            target="_blank"
            rel="noopener noreferrer"
            className="flex-1 p-2 rounded-lg bg-primary/10 hover:bg-primary/30 text-primary border-2 border-primary/30 hover:border-primary/70 transition-all duration-300 flex items-center justify-center gap-1 font-bold text-xs"
          >

            <Github className="w-4 h-4" />

            GitHub

          </a>

          <a
            href={project.demo}
            target="_blank"
            rel="noopener noreferrer"
            className="flex-1 p-2 rounded-lg bg-accent/10 hover:bg-accent/30 text-accent border-2 border-accent/30 hover:border-accent/70 transition-all duration-300 flex items-center justify-center gap-1 font-bold text-xs"
          >

            <ExternalLink className="w-4 h-4" />

            Demo

          </a>

          <Link
            href={`/projects/${project.id}`}
            className="flex-1 p-2 rounded-lg bg-secondary/10 hover:bg-secondary/30 text-secondary border-2 border-secondary/30 hover:border-secondary/70 transition-all duration-300 flex items-center justify-center gap-1 font-bold text-xs"
          >

            <Play className="w-4 h-4" />

            Video

          </Link>

        </div>

      </div>

    </div>

  )

}