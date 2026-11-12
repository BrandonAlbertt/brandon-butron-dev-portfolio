'use client'

import { use, useCallback, useEffect, useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import {
  ArrowLeft,
  ArrowRight,
  ArrowUpRight,
  Award,
  Building2,
  Calendar,
  CheckCircle2,
  Download,
  ExternalLink,
  FileCode2,
  Maximize2,
  X,
} from 'lucide-react'
import { Sidebar, WORKSPACE_NAV_ITEMS, type WorkspaceView } from '@/components/Sidebar'
import { CvQuickButton } from '@/components/CvQuickButton'
import {
  CertificatePreview,
  hasValidCertificateImage,
  hasValidCertificateLink,
} from '@/components/CertificatePreview'
import certificatesData from '@/data/certificates.json'

interface Certificate {
  id: number
  title: string
  organization: string
  year: number
  certificateLink: string
  certificateImage?: string
}

export default function CertificatePage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params)
  const router = useRouter()
  const certificateId = parseInt(id, 10)
  const certificates: Certificate[] = [...(certificatesData as Certificate[])].sort(
    (a, b) => a.id - b.id
  )
  const currentIndex = certificates.findIndex((c) => c.id === certificateId)
  const certificate = currentIndex >= 0 ? certificates[currentIndex] : undefined

  const prevCertificate = currentIndex > 0 ? certificates[currentIndex - 1] : null
  const nextCertificate =
    currentIndex >= 0 && currentIndex < certificates.length - 1
      ? certificates[currentIndex + 1]
      : null

  const [isLightboxOpen, setIsLightboxOpen] = useState(false)

  const handleSelectView = useCallback(
    (view: WorkspaceView) => {
      const matched = WORKSPACE_NAV_ITEMS.find((item) => item.id === view)
      router.push(`/${matched?.href ?? '#hero'}`)
    },
    [router]
  )

  // Keyboard navigation: 1-6 workspace shortcuts, ArrowLeft / ArrowRight between certificates, Escape to close lightbox
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (isLightboxOpen) {
        if (event.key === 'Escape') {
          setIsLightboxOpen(false)
        }
        return
      }

      if (event.metaKey || event.ctrlKey || event.altKey) return

      const target = event.target as HTMLElement | null
      if (
        target &&
        (target.tagName === 'INPUT' ||
          target.tagName === 'TEXTAREA' ||
          target.tagName === 'SELECT' ||
          target.isContentEditable)
      ) {
        return
      }

      const matchedView = WORKSPACE_NAV_ITEMS.find((item) => item.shortcut === event.key)
      if (matchedView) {
        event.preventDefault()
        handleSelectView(matchedView.id)
        return
      }

      if (event.key === 'ArrowLeft' && prevCertificate) {
        event.preventDefault()
        router.push(`/certificates/${prevCertificate.id}`)
      } else if (event.key === 'ArrowRight' && nextCertificate) {
        event.preventDefault()
        router.push(`/certificates/${nextCertificate.id}`)
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [isLightboxOpen, prevCertificate, nextCertificate, router, handleSelectView])

  if (!certificate) {
    return (
      <div className="relative min-h-screen bg-background text-foreground transition-colors duration-300 overflow-x-clip">
        <div
          className="studio-grid-overlay fixed inset-0 pointer-events-none opacity-40"
          aria-hidden="true"
        />
        <Sidebar activeView="certificates" onSelectView={handleSelectView} />

        <div className="lg:pl-64 flex flex-col min-h-screen w-full transition-all duration-300">
          <div className="flex-1 flex flex-col items-center justify-center p-6 relative z-10">
            <div className="studio-panel p-8 rounded-2xl text-center max-w-md w-full">
              <p className="text-xs font-mono uppercase tracking-wider text-muted-foreground mb-2">
                Error 404 · Certificado no encontrado
              </p>
              <h1 className="text-2xl font-bold tracking-tight text-foreground mb-3">
                Certificado no encontrado
              </h1>
              <p className="text-sm text-muted-foreground mb-6 leading-relaxed">
                El certificado solicitado no existe o fue removido del registro actual.
              </p>
              <Link
                href="/#certificates"
                className="inline-flex h-10 items-center justify-center gap-2 px-5 rounded-xl bg-primary text-primary-foreground text-sm font-semibold hover:bg-primary/90 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
              >
                <ArrowLeft className="w-4 h-4" />
                Volver a certificados
              </Link>
            </div>
          </div>
        </div>
      </div>
    )
  }

  const otherCertificates = certificates.filter((c) => c.id !== certificate.id).slice(0, 3)
  const hasImage = hasValidCertificateImage(certificate.certificateImage)
  const hasPdf = hasValidCertificateLink(certificate.certificateLink)
  const assetFileName = hasImage && certificate.certificateImage
    ? (certificate.certificateImage.split('/').pop() ?? `certificate-${certificate.id}.jpg`)
    : (certificate.certificateLink?.split('/').pop() ?? `certificate-${certificate.id}.pdf`)
  const pdfFileName =
    certificate.certificateLink?.split('/').pop() ?? `certificate-${certificate.id}.pdf`
  const cleanPdfUrl = hasPdf ? certificate.certificateLink.split('#')[0] : ''
  const pdfEmbedSrc = hasPdf
    ? `${cleanPdfUrl}#toolbar=0&navpanes=0&scrollbar=0&view=FitH`
    : ''

  return (
    <div className="relative min-h-screen bg-background text-foreground transition-colors duration-300 overflow-x-clip">
      <div
        className="studio-grid-overlay fixed inset-0 pointer-events-none opacity-35"
        aria-hidden="true"
      />
      <Sidebar activeView="certificates" onSelectView={handleSelectView} />

      <div className="lg:pl-64 flex flex-col min-h-screen w-full transition-all duration-300">
        {/* Top Workspace Bar */}
        <header className="lg:sticky lg:top-0 z-30 h-14 border-b border-border bg-background/85 backdrop-blur-md">
        <div className="max-w-7xl mx-auto h-full px-4 sm:px-6 lg:px-8 flex items-center justify-between gap-3">
          {/* Left: Return link & breadcrumb */}
          <div className="flex items-center gap-3 min-w-0">
            <Link
              href="/#certificates"
              className="inline-flex h-9 items-center gap-1.5 sm:gap-2 px-2.5 sm:px-3 rounded-lg border border-border bg-card text-xs font-medium text-foreground hover:border-primary/40 hover:bg-muted/60 transition-colors shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
            >
              <ArrowLeft className="w-3.5 h-3.5 text-primary" />
              <span className="sm:hidden">Volver</span>
              <span className="hidden sm:inline">Volver a certificados</span>
            </Link>

            <nav
              aria-label="Ruta del certificado"
              className="hidden md:flex items-center gap-1.5 text-xs font-mono text-muted-foreground truncate tabular-nums"
            >
              <span>brandonbutron.dev</span>
              <span aria-hidden="true">/</span>
              <span>Certificados</span>
              <span aria-hidden="true">/</span>
              <span className="text-foreground font-medium">#{certificate.id}</span>
            </nav>
          </div>

          {/* Right: Quick Pagination + CV */}
          <div className="flex items-center gap-2 shrink-0">
            <div
              className="inline-flex items-center rounded-lg border border-border bg-card p-0.5"
              role="group"
              aria-label="Navegación entre certificados"
            >
              {prevCertificate ? (
                <Link
                  href={`/certificates/${prevCertificate.id}`}
                  aria-label={`Certificado anterior: ${prevCertificate.title}`}
                  title="Anterior (←)"
                  className="inline-flex h-8 w-8 items-center justify-center rounded-md text-foreground hover:bg-muted/70 hover:text-primary transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                >
                  <ArrowLeft className="w-3.5 h-3.5" />
                </Link>
              ) : (
                <span
                  aria-disabled="true"
                  className="inline-flex h-8 w-8 items-center justify-center rounded-md text-muted-foreground/40 cursor-not-allowed"
                >
                  <ArrowLeft className="w-3.5 h-3.5" />
                </span>
              )}

              <span className="px-2.5 text-xs font-mono text-muted-foreground tabular-nums select-none">
                <strong className="text-foreground font-semibold">{currentIndex + 1}</strong> /{' '}
                {certificates.length}
              </span>

              {nextCertificate ? (
                <Link
                  href={`/certificates/${nextCertificate.id}`}
                  aria-label={`Siguiente certificado: ${nextCertificate.title}`}
                  title="Siguiente (→)"
                  className="inline-flex h-8 w-8 items-center justify-center rounded-md text-foreground hover:bg-muted/70 hover:text-primary transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                >
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              ) : (
                <span
                  aria-disabled="true"
                  className="inline-flex h-8 w-8 items-center justify-center rounded-md text-muted-foreground/40 cursor-not-allowed"
                >
                  <ArrowRight className="w-3.5 h-3.5" />
                </span>
              )}
            </div>

            <CvQuickButton />
          </div>
        </div>
      </header>

      {/* Credential Inspector Console */}
      <main className="relative z-10 flex-1 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-6 lg:py-8 space-y-5 lg:space-y-6">
        {/* 2-Column Bento Split View */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 lg:gap-6 items-start">
          {/* LEFT COLUMN (lg:col-span-8): Technical Document Preview */}
          <section
            aria-label="Visor de certificado"
            className="lg:col-span-8 studio-panel rounded-2xl overflow-hidden"
          >
            {/* Window Top Bar */}
            <div className="px-3 py-2 sm:px-4 sm:py-2.5 border-b border-border bg-muted/40 flex items-center justify-between gap-2.5 sm:gap-3">
              <div className="flex items-center gap-3 min-w-0">
                <div className="hidden sm:flex items-center gap-1.5 shrink-0" aria-hidden="true">
                  <span className="w-2.5 h-2.5 rounded-full bg-border dark:bg-slate-700" />
                  <span className="w-2.5 h-2.5 rounded-full bg-border dark:bg-slate-700" />
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-500/70" />
                </div>
                <span className="text-xs font-mono text-muted-foreground truncate">
                  DOCUMENT_PREVIEW <span className="text-primary/70">//</span> VERIFIED_ASSET
                </span>
              </div>

              <div className="flex items-center gap-2.5 shrink-0">
                <span className="hidden sm:inline text-xs font-mono text-muted-foreground tabular-nums">
                  {assetFileName} · {certificate.year}
                </span>
                <button
                  type="button"
                  onClick={() => setIsLightboxOpen(true)}
                  className="inline-flex h-7 items-center gap-1.5 px-2.5 rounded-lg border border-border bg-card hover:bg-muted text-xs font-medium text-foreground hover:border-primary/40 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                >
                  <Maximize2 className="w-3.5 h-3.5 text-primary" />
                  <span>Ampliar</span>
                </button>
              </div>
            </div>

            {/* Concentric Technical Frame */}
            <div className="relative p-1.5 sm:p-3 lg:p-5 bg-muted/25 dark:bg-slate-950/45">
              <div
                className="studio-grid-overlay absolute inset-0 pointer-events-none opacity-35"
                aria-hidden="true"
              />

              <div className="relative rounded-xl p-1 sm:p-1.5 bg-gradient-to-b from-border/90 via-border/40 to-transparent dark:from-slate-700/70 dark:via-slate-800/40 dark:to-slate-900/80 border border-border/80 shadow-md">
                {/* Specular Top Edge Highlight */}
                <span
                  aria-hidden="true"
                  className="pointer-events-none absolute inset-x-6 top-0 h-px bg-gradient-to-r from-transparent via-primary/50 to-transparent z-10"
                />

                <button
                  type="button"
                  onClick={() => setIsLightboxOpen(true)}
                  aria-label={`Ampliar vista de ${certificate.title}`}
                  className="group relative block w-full h-[280px] sm:h-[360px] lg:h-[440px] rounded-[10px] overflow-hidden bg-background dark:bg-slate-950 ring-1 ring-inset ring-black/5 dark:ring-white/10 cursor-zoom-in focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                >
                  <CertificatePreview
                    title={certificate.title}
                    certificateImage={certificate.certificateImage}
                    certificateLink={certificate.certificateLink}
                    mode="contain"
                    priority
                    sizes="(max-width: 1024px) 100vw, 760px"
                    imageClassName="p-1.5 sm:p-3 lg:p-4 group-hover:scale-[1.015] transition-transform duration-300"
                  />
                </button>
              </div>
            </div>
          </section>

          {/* RIGHT COLUMN (lg:col-span-4): Accreditation Inspector Panel */}
          <aside className="lg:col-span-4 studio-panel rounded-2xl p-4 sm:p-6 space-y-5">
            <div className="space-y-3">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-emerald-500/10 border border-emerald-500/25 text-xs font-mono font-medium text-emerald-600 dark:text-emerald-400">
                  <CheckCircle2 className="w-3.5 h-3.5 shrink-0" />
                  <span>Certificación Oficial Verificada</span>
                </span>
                <span className="inline-flex items-center px-2 py-0.5 rounded-md bg-muted/60 border border-border text-xs font-mono text-muted-foreground tabular-nums">
                  ID #{certificate.id}
                </span>
              </div>

              <h1 className="text-xl sm:text-2xl font-bold tracking-[-0.02em] text-foreground leading-snug text-balance">
                {certificate.title}
              </h1>
            </div>

            {/* Technical Spec Table */}
            <dl className="divide-y divide-border rounded-xl border border-border bg-muted/25">
              <div className="px-3.5 py-3 flex items-start justify-between gap-3">
                <dt className="inline-flex items-center gap-2 text-xs text-muted-foreground shrink-0">
                  <Building2 className="w-3.5 h-3.5 text-primary" />
                  <span>Entidad Emisora</span>
                </dt>
                <dd className="text-xs font-medium text-foreground text-right">
                  {certificate.organization}
                </dd>
              </div>

              <div className="px-3.5 py-3 flex items-center justify-between gap-3">
                <dt className="inline-flex items-center gap-2 text-xs text-muted-foreground shrink-0">
                  <Calendar className="w-3.5 h-3.5 text-primary" />
                  <span>Año de Emisión</span>
                </dt>
                <dd className="text-xs font-mono font-semibold text-foreground tabular-nums">
                  {certificate.year}
                </dd>
              </div>

              <div className="px-3.5 py-3 flex items-center justify-between gap-3">
                <dt className="inline-flex items-center gap-2 text-xs text-muted-foreground shrink-0">
                  <FileCode2 className="w-3.5 h-3.5 text-primary" />
                  <span>Formato</span>
                </dt>
                <dd className="text-xs font-mono text-foreground">
                  {hasPdf ? 'PDF / Certificado Digital' : 'Certificado Digital (Imagen)'}
                </dd>
              </div>

              <div className="px-3.5 py-3 flex items-center justify-between gap-3">
                <dt className="inline-flex items-center gap-2 text-xs text-muted-foreground shrink-0">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" />
                  <span>Estado</span>
                </dt>
                <dd className="inline-flex items-center gap-1.5 text-xs font-mono font-medium text-emerald-600 dark:text-emerald-400">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" aria-hidden="true" />
                  <span>Verificado</span>
                </dd>
              </div>
            </dl>

            {/* Action Buttons */}
            {hasPdf ? (
              <div className="space-y-2.5 pt-1">
                <a
                  href={certificate.certificateLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full min-h-[44px] sm:min-h-0 sm:h-10 inline-flex items-center justify-center gap-2 px-4 bg-primary hover:bg-primary/90 text-primary-foreground font-semibold rounded-xl text-sm transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
                >
                  <ExternalLink className="w-4 h-4" />
                  <span>Abrir PDF Original</span>
                </a>

                <a
                  href={certificate.certificateLink}
                  download={pdfFileName}
                  className="w-full min-h-[44px] sm:min-h-0 sm:h-10 inline-flex items-center justify-center gap-2 px-4 bg-muted/50 hover:bg-muted border border-border hover:border-primary/40 text-foreground font-semibold rounded-xl text-sm transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                >
                  <Download className="w-4 h-4 text-primary" />
                  <span>Descargar Copia PDF</span>
                </a>
              </div>
            ) : (
              <div className="space-y-2.5 pt-1">
                <button
                  type="button"
                  onClick={() => setIsLightboxOpen(true)}
                  className="w-full min-h-[44px] sm:min-h-0 sm:h-10 inline-flex items-center justify-center gap-2 px-4 bg-primary hover:bg-primary/90 text-primary-foreground font-semibold rounded-xl text-sm transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background cursor-pointer"
                >
                  <Maximize2 className="w-4 h-4" />
                  <span>Ampliar Imagen Completa</span>
                </button>

                {hasImage && certificate.certificateImage && (
                  <a
                    href={certificate.certificateImage}
                    download={certificate.certificateImage.split('/').pop() ?? 'certificado.webp'}
                    className="w-full min-h-[44px] sm:min-h-0 sm:h-10 inline-flex items-center justify-center gap-2 px-4 bg-muted/50 hover:bg-muted border border-border hover:border-primary/40 text-foreground font-semibold rounded-xl text-sm transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                  >
                    <Download className="w-4 h-4 text-primary" />
                    <span>Descargar Imagen</span>
                  </a>
                )}
              </div>
            )}
          </aside>
        </div>

        {/* Compact Other Certificates Navigator */}
        {otherCertificates.length > 0 && (
          <section className="space-y-3 pt-1">
            <div className="flex items-center justify-between gap-2">
              <h2 className="text-sm sm:text-base font-semibold text-foreground flex items-center gap-2">
                <Award className="w-4 h-4 text-primary" />
                <span>Otras Certificaciones</span>
              </h2>
              <span className="text-xs font-mono text-muted-foreground tabular-nums">
                {otherCertificates.length} sugeridas · Usa ← / →
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {otherCertificates.map((other) => (
                <Link
                  key={other.id}
                  href={`/certificates/${other.id}`}
                  className="group studio-panel rounded-2xl p-3 flex items-center gap-3.5 hover:border-primary/40 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                >
                  <div className="relative w-16 h-14 rounded-xl overflow-hidden bg-muted/40 border border-border shrink-0">
                    <CertificatePreview
                      title={other.title}
                      certificateImage={other.certificateImage}
                      certificateLink={other.certificateLink}
                      mode="contain"
                      sizes="64px"
                    />
                  </div>

                  <div className="min-w-0 flex-1">
                    <h3
                      title={other.title}
                      className="text-sm font-semibold text-foreground group-hover:text-primary transition-colors line-clamp-2 leading-snug"
                    >
                      {other.title}
                    </h3>
                    <p
                      title={`${other.organization} · ${other.year}`}
                      className="text-xs font-mono text-muted-foreground tabular-nums truncate mt-0.5"
                    >
                      {other.organization} · {other.year}
                    </p>
                  </div>

                  <ArrowUpRight className="w-4 h-4 text-muted-foreground group-hover:text-primary group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all shrink-0" />
                </Link>
              ))}
            </div>
          </section>
        )}
      </main>

      {/* Lightbox Modal for Fullscreen Document View */}
      {isLightboxOpen && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label={`Vista ampliada de ${certificate.title}`}
          onClick={() => setIsLightboxOpen(false)}
          className="fixed inset-0 z-50 bg-background/85 backdrop-blur-md flex items-center justify-center p-4 sm:p-8"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="studio-panel rounded-2xl w-full max-w-5xl overflow-hidden shadow-2xl flex flex-col max-h-[90vh]"
          >
            <div className="px-4 py-3 border-b border-border bg-muted/40 flex items-center justify-between gap-3">
              <div className="flex items-center gap-2 min-w-0">
                <span className="text-xs font-mono text-primary font-semibold shrink-0">
                  #{certificate.id}
                </span>
                <span className="text-xs sm:text-sm font-semibold text-foreground truncate">
                  {certificate.title}
                </span>
              </div>

              <button
                type="button"
                onClick={() => setIsLightboxOpen(false)}
                aria-label="Cerrar vista ampliada"
                className="inline-flex h-8 w-8 items-center justify-center rounded-lg border border-border bg-card text-foreground hover:bg-muted hover:border-primary/40 transition-colors shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="relative w-full h-[72vh] bg-muted/30 dark:bg-slate-950 p-3 sm:p-6 flex items-center justify-center">
              <CertificatePreview
                title={certificate.title}
                certificateImage={certificate.certificateImage}
                certificateLink={certificate.certificateLink}
                mode="contain"
                sizes="(max-width: 1200px) 95vw, 1024px"
                imageClassName="p-2 sm:p-4"
              />
            </div>
          </div>
        </div>
      )}
      </div>
    </div>
  )
}
