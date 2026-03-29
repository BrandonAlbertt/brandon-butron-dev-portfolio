'use client'

import { use } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { ArrowLeft, Github, ExternalLink } from 'lucide-react'

// Datos de proyectos - Los mismos que se usan en ProjectsGrid
// Se importan directamente aquí para mostrar los detalles del proyecto seleccionado
const projectsData = [
  {
    id: 1,
    title: "E-commerce API Platform",
    description: "RESTful API built with Java and Spring Boot for managing products, orders, and inventory. Includes JWT authentication and rate limiting.",
    image: "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=500&h=300&fit=crop",
    technologies: ["Java", "Spring Boot", "REST APIs", "MariaDB", "JWT"],
    github: "https://github.com",
    demo: "https://demo.example.com",
    video: "https://youtube.com"
  },
  {
    id: 2,
    title: "React Dashboard Application",
    description: "Real-time analytics dashboard with interactive charts. Features user authentication, data visualization, and responsive design.",
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=500&h=300&fit=crop",
    technologies: ["React", "JavaScript", "Tailwind CSS", "APIs", "Docker"],
    github: "https://github.com",
    demo: "https://demo.example.com",
    video: "https://youtube.com"
  },
  {
    id: 3,
    title: "Microservices Architecture",
    description: "Distributed system with multiple microservices communicating via message queues. Deployed on Docker containers with Kubernetes orchestration.",
    image: "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=500&h=300&fit=crop",
    technologies: ["Java", "Docker", "Git", "Linux", "REST APIs"],
    github: "https://github.com",
    demo: "https://demo.example.com",
    video: "https://youtube.com"
  },
  {
    id: 4,
    title: "IoT Sensor Network",
    description: "Raspberry Pi and Arduino-based IoT system for environmental monitoring. Collects data from multiple sensors and visualizes trends.",
    image: "https://images.unsplash.com/photo-1581092918056-0c4c3acd3789?w=500&h=300&fit=crop",
    technologies: ["Raspberry Pi", "Arduino", "Python", "JavaScript", "Google Cloud"],
    github: "https://github.com",
    demo: "https://demo.example.com",
    video: "https://youtube.com"
  },
  {
    id: 5,
    title: "Cloud Database Migration",
    description: "Designed and executed migration of legacy databases to Cassandra for improved scalability. Includes data validation and optimization.",
    image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=500&h=300&fit=crop",
    technologies: ["Cassandra", "MariaDB", "Linux", "Google Cloud", "Docker"],
    github: "https://github.com",
    demo: "https://demo.example.com",
    video: "https://youtube.com"
  },
  {
    id: 6,
    title: "Mobile Chat Application",
    description: "Cross-platform mobile chat app built with React Native. Features real-time messaging, file sharing, and user authentication.",
    image: "https://images.unsplash.com/photo-1611532736579-6b16e2b50449?w=500&h=300&fit=crop",
    technologies: ["React", "JavaScript", "REST APIs", "MariaDB", "Docker"],
    github: "https://github.com",
    demo: "https://demo.example.com",
    video: "https://youtube.com"
  },
  {
    id: 7,
    title: "Linux System Administration",
    description: "Automated infrastructure setup using shell scripts and configuration management. Implemented security hardening and monitoring solutions.",
    image: "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=500&h=300&fit=crop",
    technologies: ["Linux", "Git", "Docker", "Java", "REST APIs"],
    github: "https://github.com",
    demo: "https://demo.example.com",
    video: "https://youtube.com"
  },
  {
    id: 8,
    title: "Machine Learning Pipeline",
    description: "Data preprocessing and ML model training pipeline with Python. Includes feature engineering, model evaluation, and deployment scripts.",
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=500&h=300&fit=crop",
    technologies: ["Python", "Google Cloud", "JavaScript", "REST APIs", "Docker"],
    github: "https://github.com",
    demo: "https://demo.example.com",
    video: "https://youtube.com"
  },
  {
    id: 9,
    title: "API Gateway Solution",
    description: "Centralized API gateway with request routing, authentication, and rate limiting. Built with Spring Boot and deployed on Kubernetes.",
    image: "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=500&h=300&fit=crop",
    technologies: ["Java", "Spring Boot", "REST APIs", "Docker", "Git"],
    github: "https://github.com",
    demo: "https://demo.example.com",
    video: "https://youtube.com"
  },
  {
    id: 10,
    title: "Web Performance Optimization",
    description: "Optimized frontend performance achieving 95+ Lighthouse scores. Implemented code splitting, lazy loading, and image optimization.",
    image: "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=500&h=300&fit=crop",
    technologies: ["React", "JavaScript", "HTML", "CSS", "Git"],
    github: "https://github.com",
    demo: "https://demo.example.com",
    video: "https://youtube.com"
  },
  {
    id: 11,
    title: "GraphQL Server Implementation",
    description: "Built a GraphQL API server with Apollo Server. Includes schema design, resolver functions, and subscription support for real-time data.",
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=500&h=300&fit=crop",
    technologies: ["JavaScript", "REST APIs", "MariaDB", "Docker", "Git"],
    github: "https://github.com",
    demo: "https://demo.example.com",
    video: "https://youtube.com"
  },
  {
    id: 12,
    title: "Data Visualization Platform",
    description: "Interactive data visualization tool with real-time charts and maps. Supports multiple data sources and custom dashboard creation.",
    image: "https://images.unsplash.com/photo-1581092918056-0c4c3acd3789?w=500&h=300&fit=crop",
    technologies: ["React", "JavaScript", "HTML", "CSS", "Google Cloud"],
    github: "https://github.com",
    demo: "https://demo.example.com",
    video: "https://youtube.com"
  }
]

// Página dinámica que muestra los detalles de un proyecto
// Recibe el ID del proyecto desde la URL (ej: /projects/1)
// Usa React.use() para unwrap los params que es una Promise en Next.js 16
export default function ProjectPage({ params }: { params: Promise<{ id: string }> }) {
  // Unwrap params usando React.use() - necesario en Next.js 16
  const { id } = use(params)
  const projectId = parseInt(id)
  
  // Busca el proyecto en los datos usando el ID de la URL
  const project = projectsData.find(p => p.id === projectId)

  // Si el proyecto no existe, muestra un mensaje de error
  if (!project) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold mb-4">Proyecto no encontrado</h1>
          <p className="text-muted-foreground mb-8">El proyecto que buscas no existe</p>
          <Link href="/" className="text-primary hover:underline">Volver a inicio</Link>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background pt-24 pb-20">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Botón volver atrás */}
        <Link href="/#projects" className="inline-flex items-center gap-2 text-primary hover:text-accent transition-colors mb-8">
          <ArrowLeft className="w-4 h-4" />
          Volver a proyectos
        </Link>

        {/* Título del proyecto */}
        <h1 className="text-5xl font-black mb-8 bg-gradient-to-r from-primary via-accent to-secondary bg-clip-text text-transparent">
          {project.title}
        </h1>

        {/* Imagen del proyecto */}
        <div className="relative w-full h-96 rounded-xl overflow-hidden border-2 border-accent/30 mb-12 shadow-2xl shadow-primary/20">
          <div className="relative w-full h-full">
            <Image
              src={project.image}
              alt={project.title}
              fill
              className="object-cover"
            />
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-12">
          {/* Contenido principal */}
          <div className="lg:col-span-2 space-y-8">
            {/* Descripción */}
            <div>
              <h2 className="text-2xl font-bold mb-4">Descripción</h2>
              <p className="text-lg text-muted-foreground leading-relaxed">
                {project.description}
              </p>
            </div>

            {/* Video embebido */}
            <div>
              <h2 className="text-2xl font-bold mb-4">Video del Proyecto</h2>
              <div className="aspect-video rounded-lg overflow-hidden border-2 border-accent/30">
                <iframe
                  width="100%"
                  height="100%"
                  src={project.video}
                  title={`Video de ${project.title}`}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  className="w-full h-full"
                />
              </div>
            </div>
          </div>

          {/* Sidebar con información */}
          <div className="space-y-8">
            {/* Tecnologías */}
            <div className="p-6 rounded-xl border-2 border-primary/30 bg-card">
              <h3 className="text-xl font-bold mb-4">Tecnologías</h3>
              <div className="flex flex-wrap gap-2">
                {project.technologies.map(tech => (
                  <span key={tech} className="px-3 py-1 rounded-full bg-primary/20 border border-primary/40 text-primary text-sm font-semibold">
                    {tech}
                  </span>
                ))}
              </div>
            </div>

            {/* Enlaces */}
            <div className="space-y-3">
              <a
                href={project.github}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 p-3 rounded-lg bg-primary/10 hover:bg-primary/20 text-primary border border-primary/30 hover:border-primary/60 transition-all font-semibold"
              >
                <Github className="w-5 h-5" />
                Ver en GitHub
              </a>
              <a
                href={project.demo}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 p-3 rounded-lg bg-accent/10 hover:bg-accent/20 text-accent border border-accent/30 hover:border-accent/60 transition-all font-semibold"
              >
                <ExternalLink className="w-5 h-5" />
                Ver Demo
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
