/**
 * COMPONENTE: ProjectsGrid
 * 
 * ¿QUÉ HACE?
 * Este componente muestra una grilla de proyectos con paginación automática.
 * Cada proyecto muestra: imagen, título, descripción, tecnologías y botones de acción.
 * 
 * ¿CÓMO FUNCIONA LA PAGINACIÓN?
 * - Muestra 9 proyectos por página (3 columnas × 3 filas)
 * - Si hay más de 9 proyectos, se crea una segunda página automáticamente
 * - Los botones de página aparecen abajo para navegar
 * 
 * ¿DÓNDE ESTÁN LOS DATOS?
 * Los datos de los proyectos están en la constante 'projectsData' (ver línea 19)
 * - Ubicación: components/ProjectsGrid.tsx (este archivo)
 * - Formato: Array de objetos con propiedades: id, title, description, image, technologies, github, demo, video
 * 
 * ¿CÓMO AGREGAR UN NUEVO PROYECTO?
 * 1. Busca 'const projectsData: Project[] = [' en este archivo
 * 2. Al final del array (antes del cierre ]) agrega un nuevo objeto:
 *    {
 *      id: 13,
 *      title: "Nombre del Proyecto",
 *      description: "Descripción detallada...",
 *      image: "URL de la imagen",
 *      technologies: ["Tech1", "Tech2", "Tech3"],
 *      github: "https://github.com/...",
 *      demo: "https://demo.com",
 *      video: "https://youtube.com/..."
 *    }
 * 3. El proyecto aparecerá automáticamente en la grilla
 * 
 * ¿QUÉ SUCEDE AL HACER CLIC EN "VIDEO"?
 * El botón Video ahora lleva a una página dinámica (/projects/[id])
 * que muestra los detalles completos del proyecto con el video embebido.
 */

'use client'

import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { Github, ExternalLink, Play, Zap } from 'lucide-react'

// Interfaz que define la estructura de cada proyecto
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

const projectsData: Project[] = [
  { id: 1, title: "E-commerce API Platform", description: "RESTful API built with Java and Spring Boot for managing products, orders, and inventory. Includes JWT authentication and rate limiting.", image: "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=500&h=300&fit=crop", technologies: ["Java", "Spring Boot", "REST APIs", "MariaDB", "JWT"], github: "https://github.com", demo: "https://demo.example.com", video: "https://youtube.com" },
  { id: 2, title: "React Dashboard Application", description: "Real-time analytics dashboard with interactive charts. Features user authentication, data visualization, and responsive design.", image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=500&h=300&fit=crop", technologies: ["React", "JavaScript", "Tailwind CSS", "APIs", "Docker"], github: "https://github.com", demo: "https://demo.example.com", video: "https://youtube.com" },
  { id: 3, title: "Microservices Architecture", description: "Distributed system with multiple microservices communicating via message queues. Deployed on Docker containers with Kubernetes orchestration.", image: "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=500&h=300&fit=crop", technologies: ["Java", "Docker", "Git", "Linux", "REST APIs"], github: "https://github.com", demo: "https://demo.example.com", video: "https://youtube.com" },
  { id: 4, title: "IoT Sensor Network", description: "Raspberry Pi and Arduino-based IoT system for environmental monitoring. Collects data from multiple sensors and visualizes trends.", image: "https://images.unsplash.com/photo-1581092918056-0c4c3acd3789?w=500&h=300&fit=crop", technologies: ["Raspberry Pi", "Arduino", "Python", "JavaScript", "Google Cloud"], github: "https://github.com", demo: "https://demo.example.com", video: "https://youtube.com" },
  { id: 5, title: "Cloud Database Migration", description: "Designed and executed migration of legacy databases to Cassandra for improved scalability. Includes data validation and optimization.", image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=500&h=300&fit=crop", technologies: ["Cassandra", "MariaDB", "Linux", "Google Cloud", "Docker"], github: "https://github.com", demo: "https://demo.example.com", video: "https://youtube.com" },
  { id: 6, title: "Mobile Chat Application", description: "Cross-platform mobile chat app built with React Native. Features real-time messaging, file sharing, and user authentication.", image: "https://images.unsplash.com/photo-1611532736579-6b16e2b50449?w=500&h=300&fit=crop", technologies: ["React", "JavaScript", "REST APIs", "MariaDB", "Docker"], github: "https://github.com", demo: "https://demo.example.com", video: "https://youtube.com" },
  { id: 7, title: "Linux System Administration", description: "Automated infrastructure setup using shell scripts and configuration management. Implemented security hardening and monitoring solutions.", image: "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=500&h=300&fit=crop", technologies: ["Linux", "Git", "Docker", "Java", "REST APIs"], github: "https://github.com", demo: "https://demo.example.com", video: "https://youtube.com" },
  { id: 8, title: "Machine Learning Pipeline", description: "Data preprocessing and ML model training pipeline with Python. Includes feature engineering, model evaluation, and deployment scripts.", image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=500&h=300&fit=crop", technologies: ["Python", "Google Cloud", "JavaScript", "REST APIs", "Docker"], github: "https://github.com", demo: "https://demo.example.com", video: "https://youtube.com" },
  { id: 9, title: "API Gateway Solution", description: "Centralized API gateway with request routing, authentication, and rate limiting. Built with Spring Boot and deployed on Kubernetes.", image: "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=500&h=300&fit=crop", technologies: ["Java", "Spring Boot", "REST APIs", "Docker", "Git"], github: "https://github.com", demo: "https://demo.example.com", video: "https://youtube.com" },
  { id: 10, title: "Web Performance Optimization", description: "Optimized frontend performance achieving 95+ Lighthouse scores. Implemented code splitting, lazy loading, and image optimization.", image: "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=500&h=300&fit=crop", technologies: ["React", "JavaScript", "HTML", "CSS", "Git"], github: "https://github.com", demo: "https://demo.example.com", video: "https://youtube.com" },
  { id: 11, title: "GraphQL Server Implementation", description: "Built a GraphQL API server with Apollo Server. Includes schema design, resolver functions, and subscription support for real-time data.", image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=500&h=300&fit=crop", technologies: ["JavaScript", "REST APIs", "MariaDB", "Docker", "Git"], github: "https://github.com", demo: "https://demo.example.com", video: "https://youtube.com" },
  { id: 12, title: "Data Visualization Platform", description: "Interactive data visualization tool with real-time charts and maps. Supports multiple data sources and custom dashboard creation.", image: "https://images.unsplash.com/photo-1581092918056-0c4c3acd3789?w=500&h=300&fit=crop", technologies: ["React", "JavaScript", "HTML", "CSS", "Google Cloud"], github: "https://github.com", demo: "https://demo.example.com", video: "https://youtube.com" }
]

// Número de proyectos a mostrar por página
// Si cambias este número a 6, la grilla mostrará 6 proyectos por página (2x3)
// Si cambias a 12, mostrará 12 proyectos (3x4)
const PROJECTS_PER_PAGE = 9

export function ProjectsGrid() {
  // Estado para controlar qué página se está mostrando
  // currentPage = 1 muestra los primeros 9 proyectos
  // currentPage = 2 muestra los proyectos 10-18, etc.
  const [currentPage, setCurrentPage] = useState(1)
  const projects = projectsData
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
          <h2 className="text-4xl md:text-5xl font-black mb-4 bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent animate-manga-shine">Proyectos Destacados</h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto mb-2">Explorar mi portfolio de proyectos y trabajos realizados</p>
          <div className="h-1 w-20 bg-gradient-to-r from-transparent via-primary to-transparent mx-auto mt-6 animate-pulse" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {currentProjects.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>

        {totalPages > 1 && (
          <div className="flex items-center justify-center gap-2 pt-8 border-t border-primary/20">
            <button onClick={() => setCurrentPage(Math.max(1, currentPage - 1))} disabled={currentPage === 1} className="px-4 py-2 rounded-lg border border-primary/30 text-foreground hover:bg-primary/10 disabled:opacity-50 disabled:cursor-not-allowed transition-colors">Anterior</button>
            <div className="flex gap-2">
              {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                <button key={page} onClick={() => setCurrentPage(page)} className={`w-10 h-10 rounded-lg font-semibold transition-all duration-300 ${currentPage === page ? 'bg-primary text-primary-foreground shadow-lg shadow-primary/50' : 'border border-primary/30 text-foreground hover:bg-primary/10'}`}>{page}</button>
              ))}
            </div>
            <button onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))} disabled={currentPage === totalPages} className="px-4 py-2 rounded-lg border border-primary/30 text-foreground hover:bg-primary/10 disabled:opacity-50 disabled:cursor-not-allowed transition-colors">Siguiente</button>
          </div>
        )}

        <div className="text-center mt-8 text-sm text-muted-foreground">Mostrando {startIndex + 1} - {Math.min(endIndex, projects.length)} de {projects.length} proyectos</div>
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
        <Image src={project.image} alt={project.title} fill className="object-cover group-hover:scale-125 transition-transform duration-500" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-20">
          <Zap className="w-5 h-5 text-secondary fill-secondary" />
        </div>
      </div>

      <div className="p-6 flex-1 flex flex-col gap-4 relative z-20">
        <h3 className="text-lg font-bold bg-gradient-to-r from-foreground to-primary bg-clip-text text-transparent group-hover:from-secondary group-hover:via-primary group-hover:to-accent transition-all duration-300">{project.title}</h3>
        <p className="text-sm text-muted-foreground leading-relaxed flex-1 group-hover:text-foreground transition-colors">{project.description}</p>
        <div className="flex flex-wrap gap-2">
          {project.technologies.slice(0, 3).map((tech) => (
            <span key={tech} className="px-3 py-1 text-xs rounded-full bg-gradient-to-r from-primary/20 to-accent/20 border-2 border-primary/40 text-primary font-bold hover:border-secondary/60 hover:text-secondary transition-all duration-300">{tech}</span>
          ))}
          {project.technologies.length > 3 && (
            <span className="px-3 py-1 text-xs rounded-full bg-gradient-to-r from-primary/20 to-accent/20 border-2 border-primary/40 text-primary font-bold">+{project.technologies.length - 3}</span>
          )}
        </div>
        <div className="flex gap-2 pt-4 border-t border-primary/20">
          <a href={project.github} target="_blank" rel="noopener noreferrer" className="flex-1 p-2 rounded-lg bg-primary/10 hover:bg-primary/30 text-primary border-2 border-primary/30 hover:border-primary/70 transition-all duration-300 flex items-center justify-center gap-1 font-bold text-xs group/btn relative overflow-hidden">
            <div className="absolute inset-0 bg-white/10 group-hover/btn:translate-x-full transition-transform duration-500 -skew-x-12" />
            <Github className="w-4 h-4 relative" />
            <span className="relative">GitHub</span>
          </a>
          <a href={project.demo} target="_blank" rel="noopener noreferrer" className="flex-1 p-2 rounded-lg bg-accent/10 hover:bg-accent/30 text-accent border-2 border-accent/30 hover:border-accent/70 transition-all duration-300 flex items-center justify-center gap-1 font-bold text-xs group/btn relative overflow-hidden">
            <div className="absolute inset-0 bg-white/10 group-hover/btn:translate-x-full transition-transform duration-500 -skew-x-12" />
            <ExternalLink className="w-4 h-4 relative" />
            <span className="relative">Demo</span>
          </a>
          <Link href={`/projects/${project.id}`} className="flex-1 p-2 rounded-lg bg-secondary/10 hover:bg-secondary/30 text-secondary border-2 border-secondary/30 hover:border-secondary/70 transition-all duration-300 flex items-center justify-center gap-1 font-bold text-xs group/btn relative overflow-hidden">
            <div className="absolute inset-0 bg-white/10 group-hover/btn:translate-x-full transition-transform duration-500 -skew-x-12" />
            <Play className="w-4 h-4 relative" />
            <span className="relative">Video</span>
          </Link>
        </div>
      </div>
    </div>
  )
}
