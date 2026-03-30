'use client'

import Image from 'next/image'

/**
 * COMPONENTE ABOUT (ACERCA DE)
 * ===========================
 * Ubicación: components/About.tsx
 * 
 * ¿Qué hace?
 * - Muestra información profesional detallada
 * - Incluye descripción sobre experiencia
 * - Foto de perfil al lado del texto
 * - Listado de tecnologías principales
 * 
 * ¿Dónde están los estilos?
 * - Tailwind CSS clases (ver className)
 * - Fondo gradiente: from-primary/5 to-accent/5
 * 
 * ¿Cómo cambiar?
 * - Contenido texto: Modifica el <p> con la descripción
 * - Foto: Reemplaza la ruta en <Image src="/profile.jpg" />
 * - Tecnologías: Actualiza el array 'technologies'
 */

const technologies = [
  'Java',
  'JavaScript',
  'React',
  'REST APIs',
  'Docker',
  'Git',
  'Linux',
]

export function About() {
  return (
    <section
      id="about"
      className="py-20 bg-gradient-to-b from-transparent via-primary/5 to-accent/5"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="mb-16 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Acerca de Mí
            <span className="text-primary">.</span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Conoce más sobre mi experiencia y especialización
          </p>
        </div>

        {/* Content */}
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Image */}
          <div className="order-2 lg:order-1 flex justify-center">
            <div className="relative w-full max-w-md h-96 rounded-xl overflow-hidden border border-primary/30 shadow-2xl shadow-primary/20 hover:shadow-primary/40 transition-shadow duration-300">
              <Image
                src="/Profile.jpg"
                alt="Brandon Alberto Hualpa Butron"
                fill
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-primary/20 via-transparent to-transparent" />
            </div>
          </div>

          {/* Text Content */}
          <div className="order-1 lg:order-2 space-y-6">
            <div>
              <h3 className="text-2xl font-bold mb-4 text-foreground">
                Ingeniero de Software Egresado
              </h3>
              <p className="text-muted-foreground text-lg leading-relaxed mb-4">
                Soy egresado de Ingeniería de Software de la Universidad Tecnológica del Perú, con interés principal en el desarrollo backend y la construcción de APIs y sistemas escalables.
              </p>
              <p className="text-muted-foreground text-lg leading-relaxed mb-4">
                Durante mi formación académica he trabajado con tecnologías como Java, Spring Boot, Node.js y bases de datos relacionales y NoSQL. También tengo experiencia trabajando en entornos Linux y utilizando herramientas modernas de desarrollo como Docker y Git.
              </p>
              <p className="text-muted-foreground text-lg leading-relaxed mb-4">
                Me considero un desarrollador autodidacta, enfocado en mejorar continuamente mis habilidades técnicas y aprender nuevas tecnologías que me permitan construir soluciones eficientes y bien diseñadas.
              </p>
              <p className="text-muted-foreground text-lg leading-relaxed">
                Además del desarrollo de software, me interesa el diseño y desarrollo de videojuegos utilizando motores como Unity y Godot.
              </p>
            </div>

            {/* Technologies */}
            <div>
              <h4 className="text-sm font-semibold text-primary mb-4 uppercase tracking-wider">
                Tecnologías Principales
              </h4>
              <div className="grid grid-cols-2 gap-3">
                {technologies.map((tech) => (
                  <div
                    key={tech}
                    className="px-4 py-2 rounded-lg bg-card border border-primary/30 text-foreground hover:bg-primary/10 hover:border-primary/50 transition-all duration-300 text-center"
                  >
                    {tech}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
