'use client'

/**
 * COMPONENTE SKILLS (HABILIDADES)
 * ===============================
 * Ubicación: components/Skills.tsx
 * 
 * ¿Qué hace?
 * - Muestra las habilidades técnicas en tarjetas categorizadas
 * - Cada categoría tiene su propia sección
 * - Efectos de hover con brillo (glow effect)
 * - Diseño futurista con gradientes
 * 
 * ¿Dónde están los estilos?
 * - Tailwind CSS clases (ver className)
 * - Efecto glow: shadow-lg shadow-primary/50 y hover:shadow-lg hover:shadow-primary/80
 * - Fondo: bg-gradient-to-b
 * 
 * ¿Cómo agregar nuevas habilidades?
 * 1. Abre este archivo (components/Skills.tsx)
 * 2. Busca el array 'skills'
 * 3. Agrega un nuevo objeto con: { category: "Nombre", items: ["Habilidad1", "Habilidad2"] }
 * 4. La tarjeta se generará automáticamente
 * 
 * ¿Cómo cambiar los estilos de las tarjetas?
 * - Busca: className con "bg-card border border-primary"
 * - Modifica los colores en app/globals.css
 */

const skills = [
  {
    category: 'Programación',
    items: ['Java', 'JavaScript', 'Python', 'C#', 'SQL']
  },
  {
    category: 'Frontend',
    items: ['React', 'HTML', 'CSS', 'Tailwind CSS', 'TypeScript']
  },
  {
    category: 'Backend',
    items: ['REST APIs', 'Spring Boot', 'Express.js', 'Node.js', 'GraphQL']
  },
  {
    category: 'Bases de Datos',
    items: ['MariaDB', 'Cassandra', 'MongoDB', 'PostgreSQL', 'Firebase']
  },
  {
    category: 'Desarrollo de Juegos',
    items: ['Unity', 'Godot', 'C#', 'GDScript', 'Game Design']
  },
  {
    category: 'DevOps & Herramientas',
    items: ['Git', 'Docker', 'Linux', 'GitHub', 'Google Cloud', 'AWS']
  },
  {
    category: 'IoT & Electrónica',
    items: ['Raspberry Pi', 'Arduino', 'Sensores IoT', 'Embedded Systems']
  },
  {
    category: 'Otras Tecnologías',
    items: ['Microservicios', 'RabbitMQ', 'Kubernetes']
  }
]

export function Skills() {
  return (
    <section
      id="skills"
      className="py-20 relative"
    >
      {/* Background Effects */}
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute top-1/3 right-1/4 w-96 h-96 bg-accent/10 rounded-full blur-3xl opacity-20 animate-pulse" />
        <div className="absolute bottom-1/3 left-1/3 w-96 h-96 bg-primary/10 rounded-full blur-3xl opacity-20 animate-pulse" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="mb-16 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Habilidades Técnicas
            <span className="text-primary">.</span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Conjunto completo de tecnologías y herramientas con las que trabajo
          </p>
        </div>

        {/* Skills Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {skills.map((skillGroup, index) => (
            <div
              key={skillGroup.category}
              className="group relative p-6 rounded-xl border-2 border-primary/40 bg-card hover:border-secondary/60 hover:bg-gradient-to-br hover:from-primary/10 hover:to-accent/10 transition-all duration-300 hover:shadow-xl hover:shadow-secondary/40 hover:-translate-y-2 animate-manga-scale-in overflow-hidden"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              {/* Manga-style corner accent */}
              <div className="absolute top-0 right-0 w-12 h-12 bg-gradient-to-bl from-secondary/30 to-transparent rounded-bl-full opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <div className="absolute bottom-0 left-0 w-12 h-12 bg-gradient-to-tr from-primary/30 to-transparent rounded-tr-full opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

              {/* Category Title with Manga Effect */}
              <h3 className="text-lg font-bold bg-gradient-to-r from-primary via-accent to-secondary bg-clip-text text-transparent mb-4 group-hover:from-secondary group-hover:via-primary group-hover:to-accent transition-all duration-300 relative z-10">
                {skillGroup.category}
              </h3>

              {/* Skills Items */}
              <div className="space-y-3 relative z-10">
                {skillGroup.items.map((skill, itemIndex) => (
                  <div
                    key={skill}
                    className="flex items-center gap-3 text-foreground group/item cursor-default"
                    style={{ animationDelay: `${itemIndex * 0.05}s` }}
                  >
                    {/* Animated dot with manga style */}
                    <div className="relative flex items-center justify-center">
                      <div className="absolute w-2 h-2 rounded-full bg-gradient-to-r from-primary to-accent animate-pulse" />
                      <div className="w-1.5 h-1.5 rounded-full bg-gradient-to-r from-secondary to-primary group-hover/item:scale-150 transition-transform duration-300" />
                    </div>
                    <span className="text-sm font-semibold group-hover/item:text-accent transition-colors duration-200">
                      {skill}
                    </span>
                  </div>
                ))}
              </div>

              {/* Manga shine effect */}
              <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-white/0 via-white/5 to-white/0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none group-hover:animate-manga-shine" />
              
              {/* Border glow effect */}
              <div className="absolute inset-0 -z-10 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" style={{
                background: 'radial-gradient(circle at top right, rgba(239, 68, 68, 0.3), transparent)',
                filter: 'blur(10px)'
              }} />
            </div>
          ))}
        </div>

        {/* Additional Info */}
        <div className="mt-16 p-8 rounded-xl border border-accent/30 bg-gradient-to-r from-accent/5 to-primary/5">
          <div className="text-center">
            <p className="text-foreground text-lg mb-4">
              <span className="font-semibold">Certificaciones y Cursos:</span> He completado múltiples cursos 
              en desarrollo backend, cloud computing y arquitectura de software para mantenerme actualizado 
              con las últimas tendencias en la industria.
            </p>
            <div className="inline-block px-6 py-2 rounded-lg bg-primary/10 border border-primary/30 text-primary font-semibold">
              Siempre aprendiendo nuevas tecnologías
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
