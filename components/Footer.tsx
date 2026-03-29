'use client'

import { Github, Linkedin, Youtube, Heart } from 'lucide-react'

/**
 * COMPONENTE FOOTER (PIE DE PÁGINA)
 * ===============================
 * Ubicación: components/Footer.tsx
 * 
 * ¿Qué hace?
 * - Muestra el pie de página
 * - Incluye enlaces de redes sociales
 * - Copyright y texto personalizado
 * 
 * ¿Cómo cambiar?
 * - Año: Modifica el año en el copyright
 * - Enlaces sociales: Actualiza las URLs en href
 * - Texto: Modifica el contenido de <p>
 */

export function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="relative border-t border-primary/20 bg-gradient-to-t from-background via-background to-transparent">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid md:grid-cols-3 gap-8 mb-8">
          {/* Brand */}
          <div className="text-center md:text-left">
            <h3 className="text-lg font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent mb-2">
              Brandon Hualpa
            </h3>
            <p className="text-muted-foreground text-sm">
              Software Engineer | Backend Developer | Tech Enthusiast
            </p>
          </div>

          {/* Quick Links */}
          <div className="text-center">
            <h4 className="font-semibold text-foreground mb-4">Enlaces Rápidos</h4>
            <div className="flex justify-center gap-6">
              <a href="#about" className="text-muted-foreground hover:text-primary transition-colors text-sm">
                Acerca de
              </a>
              <a href="#projects" className="text-muted-foreground hover:text-primary transition-colors text-sm">
                Proyectos
              </a>
              <a href="#contact" className="text-muted-foreground hover:text-primary transition-colors text-sm">
                Contacto
              </a>
            </div>
          </div>

          {/* Social Links */}
          <div className="text-center md:text-right">
            <h4 className="font-semibold text-foreground mb-4">Sígueme</h4>
            <div className="flex justify-center md:justify-end gap-4">
              <a
                href="https://github.com"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-lg bg-card border border-primary/30 text-foreground hover:bg-primary/20 hover:text-primary hover:border-primary/60 transition-all duration-300"
                aria-label="GitHub"
              >
                <Github className="w-5 h-5" />
              </a>
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-lg bg-card border border-primary/30 text-foreground hover:bg-primary/20 hover:text-primary hover:border-primary/60 transition-all duration-300"
                aria-label="LinkedIn"
              >
                <Linkedin className="w-5 h-5" />
              </a>
              <a
                href="https://youtube.com"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-lg bg-card border border-primary/30 text-foreground hover:bg-primary/20 hover:text-primary hover:border-primary/60 transition-all duration-300"
                aria-label="YouTube"
              >
                <Youtube className="w-5 h-5" />
              </a>
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-primary/20 py-8">
          {/* Message */}
          <p className="text-center text-muted-foreground text-sm mb-4">
            Construido con <span className="inline-flex items-center"><Heart className="w-4 h-4 mx-1 text-primary" /></span> usando React y tecnologías web modernas
          </p>

          {/* Copyright */}
          <div className="text-center text-xs text-muted-foreground/60">
            <p>
              © {currentYear} Brandon Alberto Hualpa Butron. Todos los derechos reservados.
            </p>
            <p className="mt-2">
              Diseñado y desarrollado por Brandon Hualpa
            </p>
          </div>
        </div>
      </div>
    </footer>
  )
}
