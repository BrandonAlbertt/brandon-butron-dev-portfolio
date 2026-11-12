'use client'

import { useState, useEffect, useRef } from 'react'
import Image from 'next/image'
import { ArrowRight, Sparkles } from 'lucide-react'

export function Hero3DDesk() {
  const containerRef = useRef<HTMLDivElement>(null)
  const [rotate, setRotate] = useState({ x: 0, y: 0 })
  const [isHovered, setIsHovered] = useState(false)
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false)
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)')
    setPrefersReducedMotion(mediaQuery.matches)

    const handleChange = (event: MediaQueryListEvent) => {
      setPrefersReducedMotion(event.matches)
      if (event.matches) {
        setRotate({ x: 0, y: 0 })
      }
    }

    mediaQuery.addEventListener('change', handleChange)
    return () => mediaQuery.removeEventListener('change', handleChange)
  }, [])

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (prefersReducedMotion || !containerRef.current) return
    const rect = containerRef.current.getBoundingClientRect()
    const x = e.clientX - rect.left - rect.width / 2
    const y = e.clientY - rect.top - rect.height / 2

    const rotateY = (x / (rect.width / 2)) * 6
    const rotateX = -(y / (rect.height / 2)) * 6

    setRotate({ x: rotateX, y: rotateY })
  }

  const handleMouseLeave = () => {
    setIsHovered(false)
    setRotate({ x: 0, y: 0 })
  }

  // Ambient particles canvas (respects prefers-reduced-motion)
  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    let animationFrameId = 0
    let width = (canvas.width = canvas.offsetWidth)
    let height = (canvas.height = canvas.offsetHeight)

    const handleResize = () => {
      if (!canvas) return
      width = canvas.width = canvas.offsetWidth
      height = canvas.height = canvas.offsetHeight
    }

    window.addEventListener('resize', handleResize)

    const particles = Array.from({ length: 20 }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      size: Math.random() * 1.8 + 0.8,
      speedY: Math.random() * 0.35 + 0.12,
      speedX: (Math.random() - 0.5) * 0.16,
      opacity: Math.random() * 0.45 + 0.2,
      hue: Math.random() > 0.4 ? 195 : 220,
    }))

    const drawParticles = () => {
      ctx.clearRect(0, 0, width, height)
      for (const p of particles) {
        if (!prefersReducedMotion) {
          p.y -= p.speedY
          p.x += p.speedX
          if (p.y < 0) {
            p.y = height
            p.x = Math.random() * width
          }
          if (p.x < 0) p.x = width
          if (p.x > width) p.x = 0
        }

        ctx.beginPath()
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2)
        ctx.fillStyle = `hsla(${p.hue}, 85%, 62%, ${p.opacity})`
        ctx.fill()
      }
    }

    const render = () => {
      drawParticles()
      if (!prefersReducedMotion) {
        animationFrameId = requestAnimationFrame(render)
      }
    }

    render()

    return () => {
      window.removeEventListener('resize', handleResize)
      if (animationFrameId) cancelAnimationFrame(animationFrameId)
    }
  }, [prefersReducedMotion])

  const tiltScale = !prefersReducedMotion && isHovered ? 1.015 : 1

  return (
    <div
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={handleMouseLeave}
      className="relative w-full max-w-sm sm:max-w-lg mx-auto aspect-[1.2/1] sm:aspect-[1.15/1] flex items-center justify-center select-none"
      style={{ perspective: '1200px' }}
    >
      {/* Restrained focal backlight */}
      <div
        aria-hidden="true"
        className="absolute inset-6 -z-10 rounded-full bg-primary/15 dark:bg-primary/20 blur-3xl pointer-events-none"
      />

      {/* 3D Tilt Viewport Frame (outer rounded-2xl = 16px, inner cards rounded-xl = 12px) */}
      <div
        className="relative w-full h-full rounded-2xl overflow-hidden border border-border bg-muted/50 dark:bg-[#0b1220] shadow-md dark:shadow-[0_20px_50px_-15px_rgba(2,6,23,0.85)] transition-transform duration-300 ease-[cubic-bezier(0.22,1,0.36,1)]"
        style={{
          transform: `rotateX(${rotate.x}deg) rotateY(${rotate.y}deg) scale(${tiltScale})`,
          transformStyle: 'preserve-3d',
        }}
      >
        {/* Main 3D Developer Desk Artwork */}
        <div className="relative w-full h-full">
          <Image
            src="/images/hero-developer-desk.png"
            alt="Espacio de trabajo 3D de Brandon Butron"
            fill
            className="object-cover object-center pointer-events-none"
            priority
          />

          {/* Subtle bottom contrast gradient */}
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950/60 via-transparent to-transparent pointer-events-none" />
        </div>

        {/* Floating "Code / Build / Improve" Widget */}
        <div
          className="absolute top-3 left-3 sm:top-4 sm:left-4 z-20 pointer-events-none transition-transform duration-300 ease-[cubic-bezier(0.22,1,0.36,1)]"
          style={{
            transform: prefersReducedMotion
              ? 'none'
              : `translateZ(30px) translate(${rotate.y * 1.2}px, ${-rotate.x * 1.2}px)`,
          }}
        >
          <div className="rounded-xl bg-background/90 dark:bg-[#0f172a]/85 backdrop-blur-md border border-border px-2.5 py-2 sm:px-3.5 sm:py-3 shadow-sm">
            <div className="flex flex-col gap-1 font-mono text-xs">
              <span className="text-primary font-semibold flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-primary" />
                Code
              </span>
              <span className="text-foreground/85 font-medium">Build</span>
              <span className="text-muted-foreground font-medium flex items-center justify-between gap-3">
                Improve
                <ArrowRight className="w-3.5 h-3.5 text-primary" />
              </span>
            </div>
          </div>
        </div>

        {/* Ambient Canvas Particles */}
        <canvas
          ref={canvasRef}
          aria-hidden="true"
          className="absolute inset-0 w-full h-full pointer-events-none z-10"
        />

        {/* Bottom Status Badge */}
        <div className="absolute bottom-2.5 right-2.5 sm:bottom-3 sm:right-3 z-20 flex items-center gap-1.5 sm:gap-2 px-2.5 py-1 sm:px-3 sm:py-1.5 rounded-xl bg-background/90 dark:bg-[#0f172a]/90 border border-border backdrop-blur-md text-xs font-mono text-foreground shadow-sm">
          <span className="w-2 h-2 rounded-full bg-emerald-500" />
          <span>System Active</span>
          <Sparkles className="w-3.5 h-3.5 text-primary" />
        </div>
      </div>
    </div>
  )
}
