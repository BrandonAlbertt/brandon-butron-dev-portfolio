'use client'

import { Github, Linkedin, Youtube, Mail, Terminal } from 'lucide-react'
import { BrandMark, type WorkspaceView } from './Sidebar'

interface FooterProps {
  onNavigate?: (view: WorkspaceView) => void
}

const footerLinks: { label: string; view: WorkspaceView; fallbackId: string }[] = [
  { label: 'Inicio', view: 'overview', fallbackId: 'hero' },
  { label: 'Sobre mí', view: 'about', fallbackId: 'about' },
  { label: 'Stack & 3D', view: 'skills', fallbackId: 'skills' },
  { label: 'Proyectos', view: 'projects', fallbackId: 'projects' },
  { label: 'Certificados', view: 'certificates', fallbackId: 'certificates' },
  { label: 'Contacto', view: 'contact', fallbackId: 'contact' },
]

export function Footer({ onNavigate }: FooterProps) {
  const currentYear = new Date().getFullYear()

  const handleLinkClick = (view: WorkspaceView, fallbackId: string) => {
    if (onNavigate) {
      onNavigate(view)
      return
    }
    document.getElementById(fallbackId)?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <footer className="studio-panel rounded-2xl px-6 py-6 transition-colors duration-300">
      <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center justify-between pb-5 border-b border-border">
        {/* Brand */}
        <div className="md:col-span-5 flex items-center gap-3 group">
          <BrandMark ringClassName="ring-card" />
          <div>
            <h3 className="text-sm font-semibold text-foreground tracking-tight">
              Brandon Alberto Hualpa Butron
            </h3>
            <p className="text-xs text-muted-foreground font-mono">
              Backend Developer · Software Engineer UTP
            </p>
          </div>
        </div>

        {/* Quick Nav Links */}
        <nav
          aria-label="Navegación rápida del pie"
          className="md:col-span-4 flex flex-wrap gap-x-4 gap-y-2 text-xs font-medium text-muted-foreground justify-start md:justify-center"
        >
          {footerLinks.map((item) => (
            <button
              key={item.view}
              type="button"
              onClick={() => handleLinkClick(item.view, item.fallbackId)}
              className="hover:text-primary transition-colors rounded px-1 py-0.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
            >
              {item.label}
            </button>
          ))}
        </nav>

        {/* Social Links */}
        <div className="md:col-span-3 flex items-center justify-start md:justify-end gap-2">
          <a
            href="https://github.com/BrandonAlbertt"
            target="_blank"
            rel="noopener noreferrer"
            className="p-2 rounded-lg bg-muted/50 hover:bg-muted border border-border text-muted-foreground hover:text-foreground transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
            aria-label="GitHub"
          >
            <Github className="w-4 h-4" />
          </a>
          <a
            href="https://linkedin.com/in/brandon-alberto-hualpa-butron-730a7a370"
            target="_blank"
            rel="noopener noreferrer"
            className="p-2 rounded-lg bg-muted/50 hover:bg-muted border border-border text-muted-foreground hover:text-primary transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
            aria-label="LinkedIn"
          >
            <Linkedin className="w-4 h-4" />
          </a>
          <a
            href="https://youtube.com/@brandonbytes?si=UFkq8JG7QV5AzhhU"
            target="_blank"
            rel="noopener noreferrer"
            className="p-2 rounded-lg bg-muted/50 hover:bg-muted border border-border text-muted-foreground hover:text-destructive transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
            aria-label="YouTube"
          >
            <Youtube className="w-4 h-4" />
          </a>
          <a
            href="mailto:brandonbutron.ing.software@gmail.com"
            className="p-2 rounded-lg bg-muted/50 hover:bg-muted border border-border text-muted-foreground hover:text-primary transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
            aria-label="Correo"
          >
            <Mail className="w-4 h-4" />
          </a>
        </div>
      </div>

      {/* Bottom Copyright & Edition */}
      <div className="pt-4 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-muted-foreground">
        <p className="tabular-nums">
          © {currentYear} Brandon Butron. Todos los derechos reservados.
        </p>
        <div className="flex items-center gap-1.5 font-mono text-xs text-muted-foreground">
          <Terminal className="w-3.5 h-3.5 text-primary" />
          <span>Precision Backend Studio · Next.js & React</span>
        </div>
      </div>
    </footer>
  )
}
