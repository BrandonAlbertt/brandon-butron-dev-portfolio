'use client'

import { useState } from 'react'
import { Mail, Linkedin, Github, Send, Youtube } from 'lucide-react'

/**
 * COMPONENTE CONTACT (CONTACTO)
 * ============================
 * Ubicación: components/Contact.tsx
 * 
 * ¿Qué hace?
 * - Muestra sección de contacto
 * - Incluye formulario de contacto
 * - Enlaces de redes sociales
 * - Información de correo electrónico
 * 
 * ¿Dónde están los estilos?
 * - Tailwind CSS clases
 * - Grid layout responsive
 * 
 * ¿Cómo cambiar los emails/redes sociales?
 * - Busca las URLs en los links <a>
 * - Reemplaza "https://linkedin.com" con tu URL real
 * - Reemplaza "https://github.com" con tu URL real
 * - Reemplaza el email en el atributo href="mailto:"
 */

export function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  })
  const [submitted, setSubmitted] = useState(false)
  const [loading, setLoading] = useState(false)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setLoading(true)

    // Simular envío del formulario
    setTimeout(() => {
      setSubmitted(true)
      setFormData({ name: '', email: '', message: '' })
      setLoading(false)
      setTimeout(() => setSubmitted(false), 5000)
    }, 1000)
  }

  return (
    <section
      id="contact"
      className="py-20 relative"
    >
      {/* Background Effects */}
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute bottom-1/3 right-1/4 w-96 h-96 bg-accent/10 rounded-full blur-3xl opacity-20 animate-pulse" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="mb-16 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Ponte en Contacto
            <span className="text-accent">.</span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            ¿Tienes una pregunta o proyecto en mente? Conectemos y hagamos algo extraordinario juntos
          </p>
        </div>

        {/* Contact Grid */}
        <div className="grid lg:grid-cols-2 gap-12 mb-16">
          {/* Contact Info */}
          <div className="space-y-8">
            {/* Email */}
            <div className="group p-6 rounded-xl border border-accent/30 bg-card hover:border-accent/60 hover:bg-accent/5 transition-all duration-300 hover:shadow-lg hover:shadow-accent/40">
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 w-12 h-12 rounded-lg bg-accent/20 border border-accent/30 flex items-center justify-center group-hover:scale-110 transition-transform">
                  <Mail className="w-6 h-6 text-accent" />
                </div>
                <div className="flex-1">
                  <h3 className="text-lg font-bold text-foreground mb-2">Email</h3>
                  <a
                    href="mailto:brandon@example.com"
                    className="text-accent hover:text-accent/80 transition-colors font-semibold"
                  >
                    brandonbutron.ing.software@gmail.com
                  </a>
                  <p className="text-sm text-muted-foreground mt-1">
                    Te responderé lo antes posible
                  </p>
                </div>
              </div>
            </div>

            {/* LinkedIn */}
            <div className="group p-6 rounded-xl border border-accent/30 bg-card hover:border-accent/60 hover:bg-accent/5 transition-all duration-300 hover:shadow-lg hover:shadow-accent/40">
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 w-12 h-12 rounded-lg bg-accent/20 border border-accent/30 flex items-center justify-center group-hover:scale-110 transition-transform">
                  <Linkedin className="w-6 h-6 text-accent" />
                </div>
                <div className="flex-1">
                  <h3 className="text-lg font-bold text-foreground mb-2">LinkedIn</h3>
                  <a
                    href="https://linkedin.com/in/brandon-alberto-hualpa-butron-730a7a370"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-accent hover:text-accent/80 transition-colors font-semibold"
                  >
                    Visita mi perfil
                  </a>
                  <p className="text-sm text-muted-foreground mt-1">
                    Conecta conmigo profesionalmente
                  </p>
                </div>
              </div>
            </div>

            {/* GitHub */}
            <div className="group p-6 rounded-xl border border-accent/30 bg-card hover:border-accent/60 hover:bg-accent/5 transition-all duration-300 hover:shadow-lg hover:shadow-accent/40">
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 w-12 h-12 rounded-lg bg-accent/20 border border-accent/30 flex items-center justify-center group-hover:scale-110 transition-transform">
                  <Github className="w-6 h-6 text-accent" />
                </div>
                <div className="flex-1">
                  <h3 className="text-lg font-bold text-foreground mb-2">GitHub</h3>
                  <a
                    href="https://github.com/BrandonAlbertt"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-accent hover:text-accent/80 transition-colors font-semibold"
                  >
                    Ver mis repositorios
                  </a>
                  <p className="text-sm text-muted-foreground mt-1">
                    Explora mis proyectos de código abierto
                  </p>
                </div>
              </div>
            </div>

            {/* YouTube */}
            <div className="group p-6 rounded-xl border border-accent/30 bg-card hover:border-accent/60 hover:bg-accent/5 transition-all duration-300 hover:shadow-lg hover:shadow-accent/40">
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 w-12 h-12 rounded-lg bg-accent/20 border border-accent/30 flex items-center justify-center group-hover:scale-110 transition-transform">
                  <Youtube className="w-6 h-6 text-accent" />
                </div>
                <div className="flex-1">
                  <h3 className="text-lg font-bold text-foreground mb-2">YouTube</h3>
                  <a
                    href="https://youtube.com/@brandonbytes?si=UFkq8JG7QV5AzhhU"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-accent hover:text-accent/80 transition-colors font-semibold"
                  >
                    Suscribete a mi canal
                  </a>
                  <p className="text-sm text-muted-foreground mt-1">
                    Tutoriales y contenido técnico
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="p-8 rounded-xl border-2 border-accent/30 bg-card hover:border-secondary/60 transition-all duration-300 hover:shadow-lg hover:shadow-secondary/40 hover:bg-gradient-to-br hover:from-primary/5 hover:to-accent/5 animate-manga-scale-in relative overflow-hidden">
            {/* Manga corner accent */}
            <div className="absolute top-0 right-0 w-16 h-16 bg-gradient-to-bl from-secondary/20 to-transparent rounded-bl-3xl opacity-0 hover:opacity-100 transition-opacity duration-300" />
            {submitted ? (
              <div className="flex flex-col items-center justify-center h-full gap-4 relative z-10">
                <div className="w-16 h-16 rounded-full bg-gradient-to-br from-secondary/30 to-accent/30 border-2 border-secondary flex items-center justify-center animate-manga-pulse">
                  <Send className="w-8 h-8 text-secondary" />
                </div>
                <h3 className="text-xl font-bold text-foreground">¡Mensaje enviado!</h3>
                <p className="text-muted-foreground text-center">
                  Gracias por contactarme. Me pondré en contacto pronto.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6 relative z-10">
                {/* Name */}
                <div>
                  <label className="block text-sm font-semibold text-foreground mb-2">
                    Nombre
                  </label>
                  <input disabled
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 rounded-lg bg-background border border-primary/30 text-foreground placeholder-muted-foreground focus:outline-none focus:border-primary/60 focus:ring-2 focus:ring-primary/20 transition-all"
                    placeholder="Tu nombre"
                  />
                </div>

                {/* Email */}
                <div>
                  <label className="block text-sm font-semibold text-foreground mb-2">
                    Email
                  </label>
                    <input disabled
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 rounded-lg bg-background border border-primary/30 text-foreground placeholder-muted-foreground focus:outline-none focus:border-primary/60 focus:ring-2 focus:ring-primary/20 transition-all"
                    placeholder="tu@email.com"
                  />
                </div>

                {/* Message */}
                <div>
                  <label className="block text-sm font-semibold text-foreground mb-2">
                    Mensaje
                  </label>
                  <textarea disabled
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows={5}
                    className="w-full px-4 py-3 rounded-lg bg-background border border-primary/30 text-foreground placeholder-muted-foreground focus:outline-none focus:border-primary/60 focus:ring-2 focus:ring-primary/20 transition-all resize-none"
                    placeholder="Cuéntame sobre tu proyecto..."
                  />
                </div>

                {/* Submit Button */}
                <button  disabled
                  type="submit"
                  //disabled={loading}
                  className="w-full px-6 py-3 rounded-lg bg-gradient-to-r from-secondary to-accent text-accent-foreground font-bold hover:shadow-xl hover:shadow-secondary/50 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 relative overflow-hidden group"
                >
                  {/* Manga shine effect */}
                  <div className="absolute inset-0 bg-white/0 group-hover:bg-white/20 transform -skew-x-12 group-hover:translate-x-full transition-all duration-500" />
                  
                  {loading ? (
                    <>
                      <div className="w-5 h-5 rounded-full border-2 border-accent-foreground/30 border-t-accent-foreground animate-spin relative" />
                      <span className="relative">Enviando...</span>
                    </>
                  ) : (
                    <>
                      <Send className="w-5 h-5 relative" />
                      <span className="relative">Enviar Mensaje</span>
                    </>
                  )}
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}
