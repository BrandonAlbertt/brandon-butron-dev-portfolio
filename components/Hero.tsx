'use client'

import Image from 'next/image'
import Link from 'next/link'
import { ArrowRight, Linkedin, Youtube } from 'lucide-react'
import { GitHubReposDropdown } from './GitHubReposDropdown'

const scrollToSection = (sectionId: string) => {
  const element = document.getElementById(sectionId)
  element?.scrollIntoView({ behavior: 'smooth' })
}

export function Hero() {
  return (
    <section id="hero" className="relative min-h-screen flex items-center justify-center pt-20 pb-10 overflow-hidden">
      <div className="absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-gradient-to-br from-background via-primary/3 to-accent/3" />
        <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-gradient-to-br from-primary/30 to-primary/0 rounded-full blur-3xl opacity-50 animate-pulse" />
        <div className="absolute bottom-1/4 left-1/4 w-96 h-96 bg-gradient-to-tl from-accent/30 to-accent/0 rounded-full blur-3xl opacity-50 animate-pulse" />
        <div className="absolute top-1/2 left-1/3 w-64 h-64 bg-gradient-to-br from-secondary/20 to-secondary/0 rounded-full blur-3xl opacity-40 animate-manga-float" />
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="flex flex-col gap-8 justify-center">
            <div className="relative">
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-foreground mb-2 text-balance leading-tight">
                Brandon Alberto
                <br />
                <span className="bg-gradient-to-r from-primary via-accent to-secondary bg-clip-text text-transparent animate-manga-shine text-5xl sm:text-6xl lg:text-7xl">
                  Hualpa Butron
                </span>
              </h1>
              <div className="h-1 w-32 bg-gradient-to-r from-primary via-secondary to-accent mt-4 rounded-full" />
              <p className="text-xl sm:text-2xl bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent font-black mt-4">Software Engineer</p>
            </div>

            <p className="text-lg text-muted-foreground max-w-2xl leading-relaxed hover:text-foreground transition-colors">
              Ingeniero de software graduado enfocado en desarrollo backend, APIs escalables y sistemas robustos. Especializado en Java, REST APIs, microservicios y entornos Linux. Apasionado por el diseño de videojuegos.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-start">
              <button onClick={() => scrollToSection('projects')} className="group px-8 py-3 rounded-lg bg-gradient-to-r from-primary to-secondary text-primary-foreground font-bold hover:shadow-lg hover:shadow-primary/50 transition-all duration-300 flex items-center justify-center gap-2 relative overflow-hidden">
                <div className="absolute inset-0 bg-white/20 transform -skew-x-12 group-hover:translate-x-full transition-transform duration-300" />
                <span className="relative">Ver Proyectos</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform relative" />
              </button>
              <button onClick={() => scrollToSection('contact')} className="px-8 py-3 rounded-lg border-2 border-primary text-primary font-semibold hover:bg-primary/10 hover:shadow-lg hover:shadow-primary/30 transition-all duration-300 relative group overflow-hidden">
                <div className="absolute inset-0 bg-primary/0 group-hover:bg-primary/10 transition-colors" />
                <span className="relative">Contactar</span>
              </button>
            </div>

            <div className="flex gap-4 pt-4">
              <GitHubReposDropdown />
              <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="p-3 rounded-lg bg-card hover:bg-primary/20 text-foreground hover:text-primary transition-all duration-300 hover:shadow-lg hover:shadow-primary/20 hover:scale-110" aria-label="LinkedIn">
                <Linkedin className="w-6 h-6" />
              </a>
              <a href="https://youtube.com/@brandonhualpa" target="_blank" rel="noopener noreferrer" className="p-3 rounded-lg bg-card hover:bg-secondary/20 text-foreground hover:text-secondary transition-all duration-300 hover:shadow-lg hover:shadow-secondary/20 hover:scale-110" aria-label="YouTube">
                <Youtube className="w-6 h-6" />
              </a>
            </div>
          </div>

          <div className="hidden lg:flex flex-1 justify-end">
            <div className="relative w-72 h-72 rounded-2xl overflow-hidden border-4 border-transparent bg-gradient-to-br from-primary via-accent to-secondary p-1 shadow-2xl shadow-primary/50 animate-manga-float">
              <div className="relative w-full h-full rounded-2xl overflow-hidden border-4 border-background/80">
                <Image src="/profile.jpg" alt="Brandon Alberto Hualpa Butron" fill className="object-cover" priority />
              </div>
              <div className="absolute -top-2 -right-2 w-20 h-20 bg-gradient-to-bl from-secondary/60 to-transparent rounded-bl-3xl" />
              <div className="absolute -bottom-2 -left-2 w-20 h-20 bg-gradient-to-tr from-primary/60 to-transparent rounded-tr-3xl" />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
