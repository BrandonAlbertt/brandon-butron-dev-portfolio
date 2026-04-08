'use client'

import { useEffect, useRef } from 'react'
import { Github, Code2, Zap } from 'lucide-react'

/**
 * COMPONENTE GITHUB 3D CUBE
 * =========================
 * Ubicación: components/GitHub3DCube.tsx
 * 
 * ¿Qué hace?
 * - Crea un cubo 3D interactivo con CSS 3D
 * - Rota automáticamente en 3D
 * - Muestra información de GitHub en cada cara
 * - Efecto manga con colores vibrantes
 * 
 * ¿Cómo personalizar?
 * - Modifica los colores en el CSS
 * - Cambia el contenido de las caras del cubo
 * - Ajusta la velocidad de rotación
 */

export function GitHub3DCube() {
  const cubeRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const cube = cubeRef.current
    if (!cube) return

    let rotationX = 0
    let rotationY = 0
    let mouseX = 0
    let mouseY = 0

    const handleMouseMove = (e: MouseEvent) => {
      const rect = cube.getBoundingClientRect()
      mouseX = (e.clientX - rect.left - rect.width / 2) / rect.width
      mouseY = (e.clientY - rect.top - rect.height / 2) / rect.height
    }

    const animate = () => {
      rotationX += mouseY * 0.3
      rotationY += mouseX * 0.3
      rotationX += 0.1
      rotationY += 0.15

      cube.style.transform = `rotateX(${rotationX}deg) rotateY(${rotationY}deg)`
      requestAnimationFrame(animate)
    }

    document.addEventListener('mousemove', handleMouseMove)
    const animationId = requestAnimationFrame(animate)

    return () => {
      document.removeEventListener('mousemove', handleMouseMove)
      cancelAnimationFrame(animationId)
    }
  }, [])

  return (
    <div className="flex flex-col items-center gap-8 relative">
      {/* Background Effects */}
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-secondary/20 rounded-full blur-3xl opacity-40 animate-pulse" />
        <div className="absolute bottom-1/4 left-1/4 w-96 h-96 bg-primary/20 rounded-full blur-3xl opacity-40 animate-pulse" />
      </div>

      {/* 3D Scene Container */}
      <div className="perspective h-80 w-80 flex items-center justify-center relative z-10">
        <div
          ref={cubeRef}
          className="relative w-56 h-56"
          style={{
            transformStyle: 'preserve-3d',
            transition: 'transform 0.1s ease-out'
          }}
        >
          {/* Front Face - Repositorios */}
          <div
            className="absolute w-56 h-56 flex items-center justify-center border-2 border-primary/50 rounded-lg bg-gradient-to-br from-primary/30 via-primary/10 to-transparent backdrop-blur-sm"
            style={{
              transform: 'translateZ(112px)',
              backfaceVisibility: 'hidden'
            }}
          >
            <div className="text-center">
              <Github className="w-16 h-16 mx-auto mb-4 text-primary" />
              <h3 className="text-xl font-bold text-foreground mb-2">Repositorios</h3>
              <p className="text-sm text-muted-foreground">6+ proyectos activos</p>
            </div>
          </div>

          {/* Back Face - Código */}
          <div
            className="absolute w-56 h-56 flex items-center justify-center border-2 border-accent/50 rounded-lg bg-gradient-to-br from-accent/30 via-accent/10 to-transparent backdrop-blur-sm"
            style={{
              transform: 'rotateY(180deg) translateZ(112px)',
              backfaceVisibility: 'hidden'
            }}
          >
            <div className="text-center">
              <Code2 className="w-16 h-16 mx-auto mb-4 text-accent" />
              <h3 className="text-xl font-bold text-foreground mb-2">Código Limpio</h3>
              <p className="text-sm text-muted-foreground">Java, Python, JavaScript</p>
            </div>
          </div>

          {/* Right Face - Performance */}
          <div
            className="absolute w-56 h-56 flex items-center justify-center border-2 border-secondary/50 rounded-lg bg-gradient-to-br from-secondary/30 via-secondary/10 to-transparent backdrop-blur-sm"
            style={{
              transform: 'rotateY(90deg) translateZ(112px)',
              backfaceVisibility: 'hidden'
            }}
          >
            <div className="text-center">
              <Zap className="w-16 h-16 mx-auto mb-4 text-secondary" />
              <h3 className="text-xl font-bold text-foreground mb-2">Performance</h3>
              <p className="text-sm text-muted-foreground">APIs escalables</p>
            </div>
          </div>

          {/* Left Face - Backend */}
          <div
            className="absolute w-56 h-56 flex items-center justify-center border-2 border-primary/40 rounded-lg bg-gradient-to-br from-primary/20 via-primary/5 to-transparent backdrop-blur-sm"
            style={{
              transform: 'rotateY(-90deg) translateZ(112px)',
              backfaceVisibility: 'hidden'
            }}
          >
            <div className="text-center">
              <Code2 className="w-16 h-16 mx-auto mb-4 text-primary/80" />
              <h3 className="text-xl font-bold text-foreground mb-2">Backend</h3>
              <p className="text-sm text-muted-foreground">Sistemas robustos</p>
            </div>
          </div>

          {/* Top Face */}
          <div
            className="absolute w-56 h-56 flex items-center justify-center border-2 border-accent/40 rounded-lg bg-gradient-to-br from-accent/20 via-accent/5 to-transparent backdrop-blur-sm"
            style={{
              transform: 'rotateX(90deg) translateZ(112px)',
              backfaceVisibility: 'hidden'
            }}
          >
            <div className="text-center">
              <span className="text-6xl font-black text-gradient bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                3D
              </span>
            </div>
          </div>

          {/* Bottom Face */}
          <div
            className="absolute w-56 h-56 flex items-center justify-center border-2 border-primary/30 rounded-lg bg-gradient-to-br from-primary/15 via-primary/5 to-transparent backdrop-blur-sm"
            style={{
              transform: 'rotateX(-90deg) translateZ(112px)',
              backfaceVisibility: 'hidden'
            }}
          >
            <div className="text-center text-muted-foreground">
              <p className="text-sm font-semibold">Mueve el mouse</p>
              <p className="text-xs">para rotar el cubo</p>
            </div>
          </div>
        </div>
      </div>

      {/* Info Text */}
      <div className="text-center max-w-sm">
        <h3 className="text-2xl font-bold text-foreground mb-2">Vista 3D de mi Portafolio</h3>
        <p className="text-muted-foreground">
          Representación visual de mis habilidades y proyectos en un entorno tridimensional.
        </p>
      </div>

      {/* Estilos CSS 3D */}
      <style jsx>{`
        .perspective {
          perspective: 1200px;
        }

        .bg-gradient-to-br {
          background-image: linear-gradient(135deg, var(--tw-gradient-stops));
        }

        @supports (backdrop-filter: blur(1px)) {
          .backdrop-blur-sm {
            backdrop-filter: blur(4px);
          }
        }
      `}</style>
    </div>
  )
}
