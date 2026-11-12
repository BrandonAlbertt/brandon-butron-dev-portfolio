'use client'

import { useState } from 'react'
import {
  Mail,
  Linkedin,
  Github,
  Send,
  Youtube,
  MessageSquare,
  CheckCircle2,
  AlertCircle,
} from 'lucide-react'

interface FormErrors {
  name?: string
  email?: string
  message?: string
}

export function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: 'Oportunidad Laboral Backend',
    message: '',
  })
  const [errors, setErrors] = useState<FormErrors>({})
  const [submitted, setSubmitted] = useState(false)
  const [loading, setLoading] = useState(false)

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
    if (errors[name as keyof FormErrors]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }))
    }
  }

  const validate = (): FormErrors => {
    const nextErrors: FormErrors = {}
    if (!formData.name.trim()) {
      nextErrors.name = 'Ingresa tu nombre completo.'
    }
    if (!formData.email.trim()) {
      nextErrors.email = 'Ingresa tu correo electrónico.'
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email.trim())) {
      nextErrors.email = 'Ingresa un correo electrónico válido.'
    }
    if (!formData.message.trim()) {
      nextErrors.message = 'Escribe un mensaje con los detalles de tu consulta.'
    }
    return nextErrors
  }

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    const validationErrors = validate()
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors)
      return
    }

    setErrors({})
    setLoading(true)

    const messageBody = `Hola Brandon,%0D%0A%0D%0AMi nombre es ${encodeURIComponent(
      formData.name.trim()
    )} (${encodeURIComponent(formData.email.trim())}).%0D%0A%0D%0AMensaje:%0D%0A${encodeURIComponent(
      formData.message.trim()
    )}`

    window.location.href = `mailto:brandonbutron.ing.software@gmail.com?subject=${encodeURIComponent(
      formData.subject
    )}&body=${messageBody}`

    setTimeout(() => {
      setSubmitted(true)
      setLoading(false)
      setTimeout(() => setSubmitted(false), 6000)
    }, 600)
  }

  return (
    <section
      id="contact"
      className="studio-panel rounded-2xl p-6 sm:p-8 flex flex-col gap-6"
    >
      {/* Left-Aligned Header */}
      <div className="space-y-1 border-b border-border pb-5">
        <span className="text-xs font-mono font-medium text-primary">
          Comunicación Directa
        </span>
        <h2 className="text-2xl sm:text-3xl font-bold tracking-[-0.02em] text-foreground">
          Ponte en Contacto
        </h2>
        <p className="text-sm text-muted-foreground max-w-[65ch] leading-relaxed">
          ¿Tienes una vacante, propuesta de proyecto o consulta técnica? Estoy disponible para conectar y colaborar.
        </p>
      </div>

      {/* Contact Bento Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* LEFT: DIRECT CHANNELS */}
        <div className="lg:col-span-5 flex flex-col gap-3">
          {/* Email */}
          <a
            href="mailto:brandonbutron.ing.software@gmail.com"
            className="group p-4 rounded-xl bg-muted/30 hover:bg-muted/60 border border-border hover:border-primary/40 transition-colors duration-200 flex items-center gap-3.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
          >
            <div className="w-10 h-10 rounded-lg bg-primary/10 border border-primary/25 flex items-center justify-center shrink-0 text-primary">
              <Mail className="w-4 h-4" />
            </div>
            <div className="flex-1 min-w-0">
              <span className="text-xs text-muted-foreground font-mono">
                Correo Principal
              </span>
              <p className="text-sm font-semibold text-foreground group-hover:text-primary transition-colors truncate">
                brandonbutron.ing.software@gmail.com
              </p>
              <span className="text-xs text-muted-foreground">
                Respuesta directa por email
              </span>
            </div>
          </a>

          {/* LinkedIn */}
          <a
            href="https://linkedin.com/in/brandon-alberto-hualpa-butron-730a7a370"
            target="_blank"
            rel="noopener noreferrer"
            className="group p-4 rounded-xl bg-muted/30 hover:bg-muted/60 border border-border hover:border-primary/40 transition-colors duration-200 flex items-center gap-3.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
          >
            <div className="w-10 h-10 rounded-lg bg-primary/10 border border-primary/25 flex items-center justify-center shrink-0 text-primary">
              <Linkedin className="w-4 h-4" />
            </div>
            <div className="flex-1 min-w-0">
              <span className="text-xs text-muted-foreground font-mono">
                Red Profesional
              </span>
              <p className="text-sm font-semibold text-foreground group-hover:text-primary transition-colors truncate">
                Brandon Alberto Hualpa Butron
              </p>
              <span className="text-xs text-muted-foreground">
                Conectemos en LinkedIn
              </span>
            </div>
          </a>

          {/* WhatsApp Direct */}
          <a
            href="https://wa.me/51924516682?text=Hola%20Brandon,%20vi%20tu%20portafolio%20y%20me%20gustar%C3%ADa%20contactarte"
            target="_blank"
            rel="noopener noreferrer"
            className="group p-4 rounded-xl bg-muted/30 hover:bg-muted/60 border border-border hover:border-emerald-500/40 transition-colors duration-200 flex items-center gap-3.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
          >
            <div className="w-10 h-10 rounded-lg bg-emerald-500/10 border border-emerald-500/25 flex items-center justify-center shrink-0 text-emerald-600 dark:text-emerald-400">
              <MessageSquare className="w-4 h-4" />
            </div>
            <div className="flex-1 min-w-0">
              <span className="text-xs text-muted-foreground font-mono">
                Chat Inmediato
              </span>
              <p className="text-sm font-semibold text-foreground group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors font-mono tabular-nums">
                +51 924 516 682
              </p>
              <span className="text-xs text-emerald-600 dark:text-emerald-400 font-medium">
                WhatsApp Directo
              </span>
            </div>
          </a>

          {/* GitHub & YouTube Pair */}
          <div className="grid grid-cols-2 gap-3">
            <a
              href="https://github.com/BrandonAlbertt"
              target="_blank"
              rel="noopener noreferrer"
              className="group p-4 rounded-xl bg-muted/30 hover:bg-muted/60 border border-border hover:border-primary/40 text-center flex flex-col items-center justify-center gap-1.5 transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
            >
              <Github className="w-5 h-5 text-foreground group-hover:text-primary transition-colors" />
              <span className="text-xs font-semibold text-foreground">GitHub</span>
              <span className="text-xs font-mono text-muted-foreground">@BrandonAlbertt</span>
            </a>

            <a
              href="https://youtube.com/@brandonbytes?si=UFkq8JG7QV5AzhhU"
              target="_blank"
              rel="noopener noreferrer"
              className="group p-4 rounded-xl bg-muted/30 hover:bg-muted/60 border border-border hover:border-destructive/40 text-center flex flex-col items-center justify-center gap-1.5 transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
            >
              <Youtube className="w-5 h-5 text-destructive" />
              <span className="text-xs font-semibold text-foreground">YouTube</span>
              <span className="text-xs font-mono text-muted-foreground">@brandonbytes</span>
            </a>
          </div>
        </div>

        {/* RIGHT: INTERACTIVE CONTACT FORM */}
        <div className="lg:col-span-7">
          <div className="rounded-xl bg-muted/20 border border-border p-5 sm:p-6">
            <div className="mb-5">
              <h3 className="text-lg font-semibold text-foreground flex items-center gap-2">
                <span>Envíame un Mensaje</span>
                <span aria-hidden="true" className="w-2 h-2 rounded-full bg-primary" />
              </h3>
              <p className="text-xs text-muted-foreground mt-1">
                Completa los campos para abrir tu cliente de correo con el mensaje prellenado.
              </p>
            </div>

            <form onSubmit={handleSubmit} noValidate className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label
                    htmlFor="contact-name"
                    className="block text-xs font-medium text-foreground mb-1.5"
                  >
                    Nombre completo *
                  </label>
                  <input
                    id="contact-name"
                    type="text"
                    name="name"
                    required
                    value={formData.name}
                    onChange={handleChange}
                    aria-invalid={Boolean(errors.name)}
                    aria-describedby={errors.name ? 'contact-name-error' : undefined}
                    placeholder="Ej. Laura Mendoza"
                    className={`w-full h-10 px-3.5 rounded-xl bg-background border text-sm text-foreground placeholder:text-muted-foreground transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring ${
                      errors.name ? 'border-destructive' : 'border-border'
                    }`}
                  />
                  {errors.name && (
                    <p
                      id="contact-name-error"
                      className="mt-1.5 text-xs text-destructive flex items-center gap-1"
                    >
                      <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                      <span>{errors.name}</span>
                    </p>
                  )}
                </div>

                <div>
                  <label
                    htmlFor="contact-email"
                    className="block text-xs font-medium text-foreground mb-1.5"
                  >
                    Correo electrónico *
                  </label>
                  <input
                    id="contact-email"
                    type="email"
                    name="email"
                    required
                    value={formData.email}
                    onChange={handleChange}
                    aria-invalid={Boolean(errors.email)}
                    aria-describedby={errors.email ? 'contact-email-error' : undefined}
                    placeholder="nombre@empresa.com"
                    className={`w-full h-10 px-3.5 rounded-xl bg-background border text-sm text-foreground placeholder:text-muted-foreground transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring ${
                      errors.email ? 'border-destructive' : 'border-border'
                    }`}
                  />
                  {errors.email && (
                    <p
                      id="contact-email-error"
                      className="mt-1.5 text-xs text-destructive flex items-center gap-1"
                    >
                      <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                      <span>{errors.email}</span>
                    </p>
                  )}
                </div>
              </div>

              <div>
                <label
                  htmlFor="contact-subject"
                  className="block text-xs font-medium text-foreground mb-1.5"
                >
                  Motivo de contacto
                </label>
                <select
                  id="contact-subject"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  className="w-full h-10 px-3.5 rounded-xl bg-background border border-border text-sm text-foreground transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                >
                  <option value="Oportunidad Laboral Backend">
                    Oportunidad Laboral Backend (Junior / Practicante)
                  </option>
                  <option value="Proyecto Freelance / Consultoría">
                    Proyecto Freelance / Consultoría de Software
                  </option>
                  <option value="Automatización con APIs & Scripts">
                    Automatización con APIs & Scripts
                  </option>
                  <option value="Otro Motivo">Otro Asunto</option>
                </select>
              </div>

              <div>
                <label
                  htmlFor="contact-message"
                  className="block text-xs font-medium text-foreground mb-1.5"
                >
                  Mensaje *
                </label>
                <textarea
                  id="contact-message"
                  name="message"
                  required
                  rows={4}
                  value={formData.message}
                  onChange={handleChange}
                  aria-invalid={Boolean(errors.message)}
                  aria-describedby={errors.message ? 'contact-message-error' : undefined}
                  placeholder="Cuéntame sobre la propuesta, tecnologías requeridas o detalles del proyecto..."
                  className={`w-full px-3.5 py-2.5 rounded-xl bg-background border text-sm text-foreground placeholder:text-muted-foreground transition-colors resize-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring ${
                    errors.message ? 'border-destructive' : 'border-border'
                  }`}
                />
                {errors.message && (
                  <p
                    id="contact-message-error"
                    className="mt-1.5 text-xs text-destructive flex items-center gap-1"
                  >
                    <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                    <span>{errors.message}</span>
                  </p>
                )}
              </div>

              {submitted && (
                <div
                  role="status"
                  className="p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/25 text-emerald-700 dark:text-emerald-300 text-xs flex items-center gap-2"
                >
                  <CheckCircle2 className="w-4 h-4 shrink-0" />
                  <span>
                    Se abrió tu cliente de correo con el mensaje preparado para enviar a brandonbutron.ing.software@gmail.com.
                  </span>
                </div>
              )}

              <div className="pt-1 flex flex-col sm:flex-row gap-3">
                <button
                  type="submit"
                  disabled={loading}
                  className="flex-1 h-10 px-4 rounded-xl bg-primary hover:bg-primary/90 text-primary-foreground font-semibold text-sm flex items-center justify-center gap-2 transition-all duration-200 active:scale-[0.98] disabled:opacity-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                >
                  <Send className="w-4 h-4" />
                  <span>{loading ? 'Preparando correo...' : 'Enviar Mensaje'}</span>
                </button>

                <a
                  href={`https://wa.me/51924516682?text=${encodeURIComponent(
                    `Hola Brandon, me gustaría conversar sobre una oportunidad: ${formData.subject}`
                  )}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="h-10 px-4 rounded-xl bg-background hover:bg-muted border border-border hover:border-emerald-500/40 text-foreground font-semibold text-sm flex items-center justify-center gap-2 transition-all duration-200 active:scale-[0.98] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                >
                  <MessageSquare className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                  <span>Enviar por WhatsApp</span>
                </a>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  )
}
