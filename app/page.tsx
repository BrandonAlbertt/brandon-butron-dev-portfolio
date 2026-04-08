/**
 * PÁGINA PRINCIPAL
 * ===============
 * Ubicación: app/page.tsx
 * 
 * ¿Qué hace?
 * - Importa y renderiza todos los componentes principales
 * - Estructura general del sitio
 * - Navegación entre secciones
 * 
 * ¿Cómo está organizada?
 * 1. Navbar - Navegación superior
 * 2. Hero - Sección principal
 * 3. About - Acerca de mí
 * 4. Skills - Habilidades técnicas
 * 5. ProjectsGrid - Grid de proyectos con paginación
 * 6. CertificatesGrid - Grid de certificados con paginación
 * 7. Education - Información de educación
 * 8. Contact - Formulario de contacto
 * 9. Footer - Pie de página
 * 
 * ¿Cómo agregar una nueva sección?
 * 1. Crea un nuevo componente en components/MiComponente.tsx
 * 2. Importa el componente: import { MiComponente } from '@/components/MiComponente'
 * 3. Agrega el componente en el orden deseado
 * 
 * ¿Cómo cambiar el orden de las secciones?
 * - Simplemente reorganiza el orden de los componentes renderizados
 * - El Navbar siempre debe estar primero
 * - El Footer siempre debe estar al final
 */

import { Navbar } from '@/components/Navbar'
import { Hero } from '@/components/Hero'
import { About } from '@/components/About'
import { Skills } from '@/components/Skills'
import { ProjectsGrid } from '@/components/ProjectsGrid'
import { GitHub3DCube } from '@/components/GitHub3DCube'
import { CertificatesGrid } from '@/components/CertificatesGrid'
import { AcademicDegrees } from '@/components/AcademicDegrees'
import { Education } from '@/components/Education'
import { Contact } from '@/components/Contact'
import { Footer } from '@/components/Footer'

import { CurrentGoals } from '@/components/CurrentGoals'

export default function Home() {
  return (
    <main className="relative min-h-screen w-full overflow-x-hidden">
      {/* Navbar - Always visible */}
      <Navbar />

      {/* Sections */}
      <Hero />
      <About />
      <CurrentGoals />
      <Skills />
      <ProjectsGrid />
      <section id="github-3d" className="py-20 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <GitHub3DCube />
        </div>
      </section>
      <CertificatesGrid />
      <AcademicDegrees />
      <Education />
      <Contact />

      {/* Footer */}
      <Footer />
    </main>
  )
}
