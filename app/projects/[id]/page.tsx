
/*
Esta página muestra el detalle de un proyecto específico del portfolio.

Cómo funciona paso a paso:

1 -- Se importa el archivo con todos los proyectos:
   import projectsData from '@/data/projects.json'

2 -- La página recibe un ID desde la URL.
   Ejemplo:
   /projects/1
   /projects/5

   Ese ID se obtiene aquí:
   const { id } = use(params)

3 -- Convertimos el ID (que viene como texto) a número:
   const projectId = parseInt(id)

4 -- Buscamos dentro del JSON el proyecto que tenga ese ID:
   const project = projects.find(p => p.id === projectId)

   Básicamente significa:
   "Buscar el proyecto cuyo id sea igual al id de la URL".

5 -- Si no se encuentra el proyecto se muestra un mensaje:
   if (!project) { ... }

6 --  Si sí existe, se renderiza la página mostrando:
   - título → {project.title}
   - imagen → {project.image}
   - descripción → {project.description}
   - tecnologías → project.technologies.map(...)
   - video → {project.video}
   - enlaces → GitHub y Demo

En resumen:
La página usa el ID de la URL para buscar un proyecto dentro de
`projects.json` y mostrar todos sus detalles.
*/


'use client'

import { use } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { ArrowLeft, Github, ExternalLink } from 'lucide-react'

// IMPORTAR EL JSON
import projectsData from '@/data/projects.json'

// Tipado del proyecto
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

// Página dinámica que muestra los detalles de un proyecto
// Recibe el ID del proyecto desde la URL (ej: /projects/1)
export default function ProjectPage({ params }: { params: Promise<{ id: string }> }) {

  const { id } = use(params)
  const projectId = parseInt(id)

  // Convertimos el JSON al tipo Project[]
  const projects = projectsData as Project[]

  // Buscar proyecto por ID
  const project = projects.find(p => p.id === projectId)

  // Si no existe
  if (!project) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold mb-4">Proyecto no encontrado</h1>
          <p className="text-muted-foreground mb-8">El proyecto que buscas no existe</p>
          <Link href="/" className="text-primary hover:underline">
            Volver a inicio
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background pt-24 pb-20">

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Botón volver */}
        <Link
          href="/#projects"
          className="inline-flex items-center gap-2 text-primary hover:text-accent transition-colors mb-8"
        >
          <ArrowLeft className="w-4 h-4" />
          Volver a proyectos
        </Link>

        {/* Título */}
        <h1 className="text-5xl font-black mb-8 bg-gradient-to-r from-primary via-accent to-secondary bg-clip-text text-transparent">
          {project.title}
        </h1>

        {/* Imagen */}
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

          {/* CONTENIDO */}
          <div className="lg:col-span-2 space-y-8">

            {/* Descripción */}
            <div>
              <h2 className="text-2xl font-bold mb-4">
                Descripción
              </h2>

              <p className="text-lg text-muted-foreground leading-relaxed">
                {project.description}
              </p>
            </div>

            {/* Video */}
            <div>

              <h2 className="text-2xl font-bold mb-4">
                Video del Proyecto
              </h2>

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

          {/* SIDEBAR */}
          <div className="space-y-8">

            {/* Tecnologías */}
            <div className="p-6 rounded-xl border-2 border-primary/30 bg-card">

              <h3 className="text-xl font-bold mb-4">
                Tecnologías
              </h3>

              <div className="flex flex-wrap gap-2">

                {project.technologies.map((tech) => (

                  <span
                    key={tech}
                    className="px-3 py-1 rounded-full bg-primary/20 border border-primary/40 text-primary text-sm font-semibold"
                  >
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