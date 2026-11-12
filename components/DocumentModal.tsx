'use client'

import { useEffect, useCallback, useState, useRef } from 'react'
import { createPortal } from 'react-dom'
import {
  X,
  ExternalLink,
  Download,
  Building2,
  Calendar,
  FileText,
  Maximize2,
  Minimize2,
  ZoomIn,
  ZoomOut,
  Loader2,
} from 'lucide-react'

export interface DocumentData {
  title: string
  institution: string
  year: number
  description: string
  documentUrl: string
  previewImage?: string
  previewImages?: string[]
}

interface DocumentModalProps {
  isOpen: boolean
  onClose: () => void
  document: DocumentData | null
}

const pdfPagesCache = new Map<string, string[]>()

/**
 * Universal PDF Renderer using pdfjs-dist.
 * Bypasses browser iframe restrictions and renders all pages sharp and scrollable.
 */
function PdfViewer({
  url,
  title,
  isZoomed,
}: {
  url: string
  title: string
  isZoomed: boolean
}) {
  const [pages, setPages] = useState<string[]>(() => pdfPagesCache.get(url) ?? [])
  const [loading, setLoading] = useState<boolean>(() => !pdfPagesCache.has(url))
  const [error, setError] = useState<boolean>(false)

  useEffect(() => {
    let isMounted = true
    const cached = pdfPagesCache.get(url)
    if (cached && cached.length > 0) {
      setPages(cached)
      setLoading(false)
      return
    }

    setLoading(true)
    setError(false)

    async function loadPdfPages() {
      try {
        const pdfjs = await import('pdfjs-dist')
        if (!pdfjs.GlobalWorkerOptions.workerSrc) {
          pdfjs.GlobalWorkerOptions.workerSrc = '/pdf.worker.min.mjs'
        }

        const cleanUrl = url.split('#')[0]
        const res = await fetch(cleanUrl)
        if (!res.ok) throw new Error(`HTTP ${res.status}`)
        const arrayBuffer = await res.arrayBuffer()
        const data = new Uint8Array(arrayBuffer)

        const loadingTask = pdfjs.getDocument({ data })
        const pdf = await loadingTask.promise
        const rendered: string[] = []

        for (let i = 1; i <= pdf.numPages; i++) {
          const page = await pdf.getPage(i)
          const viewport = page.getViewport({ scale: 1.8 })
          const canvas = document.createElement('canvas')
          canvas.width = Math.round(viewport.width)
          canvas.height = Math.round(viewport.height)
          const ctx = canvas.getContext('2d', { alpha: false })

          if (ctx) {
            ctx.fillStyle = '#ffffff'
            ctx.fillRect(0, 0, canvas.width, canvas.height)
            const renderTask = (page.render as unknown as (params: Record<string, unknown>) => { promise: Promise<unknown> })({
              canvas,
              canvasContext: ctx,
              viewport,
            })
            await renderTask.promise
            rendered.push(canvas.toDataURL('image/webp', 0.92))
          }
        }

        pdfPagesCache.set(url, rendered)

        if (isMounted) {
          setPages(rendered)
          setLoading(false)
        }
      } catch (err) {
        console.warn(`[DocumentModal] Error rendering PDF via pdfjs-dist for ${url}:`, err)
        if (isMounted) {
          setError(true)
          setLoading(false)
        }
      }
    }

    loadPdfPages()

    return () => {
      isMounted = false
    }
  }, [url])

  if (loading) {
    return (
      <div className="w-full h-full flex flex-col items-center justify-center p-8 gap-3 text-muted-foreground">
        <Loader2 className="w-7 h-7 text-primary animate-spin" />
        <span className="text-xs font-mono font-medium tracking-wide">
          Procesando documento PDF...
        </span>
      </div>
    )
  }

  if (error || pages.length === 0) {
    return (
      <div className="w-full h-full flex flex-col items-center justify-center p-6 text-center gap-4 text-muted-foreground bg-muted/20 rounded-xl border border-border">
        <div className="w-12 h-12 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center text-primary">
          <FileText className="w-6 h-6" />
        </div>
        <div className="max-w-md space-y-1">
          <p className="text-sm font-semibold text-foreground">
            {title}
          </p>
          <p className="text-xs text-muted-foreground leading-relaxed">
            La vista previa embebida no se pudo procesar en este navegador. Puedes abrir el documento original o descargarlo.
          </p>
        </div>
        <div className="flex flex-wrap items-center justify-center gap-2 mt-2">
          <a
            href={url}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-lg bg-primary text-primary-foreground text-xs font-semibold hover:bg-primary/90 transition-colors shadow-sm"
          >
            <ExternalLink className="w-3.5 h-3.5" />
            <span>Abrir PDF en pestaña</span>
          </a>
        </div>
      </div>
    )
  }

  return (
    <div className="w-full h-full overflow-y-auto p-2 sm:p-5 flex flex-col items-center gap-5 scrollbar-thin">
      {pages.map((pageDataUrl, index) => (
        <div
          key={index}
          className={`relative transition-all duration-300 rounded-lg shadow-xl border border-border/80 overflow-hidden bg-white shrink-0 ${
            isZoomed ? 'w-[140%] max-w-none sm:w-[130%]' : 'max-w-3xl w-full'
          }`}
        >
          <img
            src={pageDataUrl}
            alt={`${title} - Página ${index + 1}`}
            className="w-full h-auto block select-none pointer-events-none"
            loading={index === 0 ? 'eager' : 'lazy'}
          />

          {pages.length > 1 && (
            <span className="absolute bottom-2 right-2 px-2 py-0.5 rounded-md bg-black/75 text-white font-mono text-[11px] backdrop-blur-xs select-none shadow-md">
              Página {index + 1} de {pages.length}
            </span>
          )}
        </div>
      ))}
    </div>
  )
}

export function DocumentModal({ isOpen, onClose, document }: DocumentModalProps) {
  const [mounted, setMounted] = useState(false)
  const [isFullscreen, setIsFullscreen] = useState(false)
  const [isZoomed, setIsZoomed] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  const handleClose = useCallback(() => {
    setIsFullscreen(false)
    setIsZoomed(false)
    onClose()
  }, [onClose])

  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        handleClose()
      }
    },
    [handleClose]
  )

  useEffect(() => {
    if (!isOpen) return

    const previousOverflow = window.document.body.style.overflow
    window.document.body.style.overflow = 'hidden'
    window.addEventListener('keydown', handleKeyDown)

    return () => {
      window.document.body.style.overflow = previousOverflow
      window.removeEventListener('keydown', handleKeyDown)
    }
  }, [isOpen, handleKeyDown])

  useEffect(() => {
    setIsZoomed(false)
  }, [document?.documentUrl])

  if (!mounted || !isOpen || !document) return null

  const normalizedUrl = document.documentUrl.split('#')[0]
  const previewImages =
    document.previewImages && document.previewImages.length > 0
      ? document.previewImages
      : null
  const isPdf = !previewImages && normalizedUrl.toLowerCase().endsWith('.pdf')
  const imageSrc = !isPdf && !previewImages ? document.previewImage || document.documentUrl : undefined

  const modalContent = (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="document-modal-title"
      className={`fixed inset-0 z-[200] flex items-center justify-center bg-background/80 backdrop-blur-md motion-reduce:backdrop-blur-none ${
        isFullscreen ? 'p-0' : 'p-3 sm:p-6'
      }`}
      onClick={handleClose}
    >
      {/* Strictly Centered Modal Frame */}
      <div
        className={`relative bg-card text-card-foreground border border-border shadow-2xl flex flex-col overflow-hidden transition-[width,height,border-radius] duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] motion-reduce:transition-none ${
          isFullscreen
            ? 'w-screen max-w-none h-[100dvh] rounded-none'
            : 'w-full max-w-5xl h-[90dvh] sm:h-[90vh] max-h-[850px] rounded-2xl'
        }`}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Window Top Control Bar */}
        <div className="flex items-center justify-between gap-3 px-4 sm:px-6 py-3 border-b border-border bg-muted/50 shrink-0">
          <div className="flex items-center gap-3 min-w-0 flex-1">
            <div className="w-8 h-8 rounded-lg bg-primary/10 border border-primary/25 flex items-center justify-center shrink-0 text-primary">
              <FileText className="w-4 h-4" />
            </div>

            <div className="min-w-0 flex-1">
              <div className="flex items-center gap-2">
                <h2
                  id="document-modal-title"
                  className="text-sm sm:text-base font-bold tracking-[-0.01em] text-foreground truncate"
                >
                  {document.title}
                </h2>
                <span className="hidden md:inline-flex items-center px-2 py-0.5 rounded-md bg-background border border-border font-mono text-[10px] font-medium text-muted-foreground shrink-0">
                  {isPdf ? 'PDF' : 'ASSET'}
                </span>
              </div>

              <div className="flex flex-wrap items-center gap-x-3 gap-y-0.5 text-[11px] sm:text-xs text-muted-foreground mt-0.5">
                <span className="inline-flex items-center gap-1 truncate">
                  <Building2 className="w-3 h-3 text-primary shrink-0" />
                  <span className="truncate">{document.institution}</span>
                </span>

                <span className="inline-flex items-center gap-1 font-mono tabular-nums shrink-0">
                  <Calendar className="w-3 h-3 text-primary shrink-0" />
                  <span>{document.year}</span>
                </span>
              </div>
            </div>
          </div>

          {/* Window Actions: Zoom / Fullscreen / Close */}
          <div className="flex items-center gap-1.5 sm:gap-2 shrink-0">
            <button
              type="button"
              onClick={() => setIsZoomed((prev) => !prev)}
              aria-label={isZoomed ? 'Ajustar a la ventana' : 'Ampliar zoom'}
              aria-pressed={isZoomed}
              className="inline-flex h-9 sm:h-8 items-center gap-1.5 px-2.5 rounded-lg bg-background hover:bg-muted text-foreground border border-border hover:border-primary/40 text-xs font-semibold transition-colors cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
            >
              {isZoomed ? (
                <>
                  <ZoomOut className="w-3.5 h-3.5 text-primary" />
                  <span className="hidden sm:inline">Ajustar</span>
                </>
              ) : (
                <>
                  <ZoomIn className="w-3.5 h-3.5 text-primary" />
                  <span className="hidden sm:inline">Zoom</span>
                </>
              )}
            </button>

            <button
              type="button"
              onClick={() => setIsFullscreen((prev) => !prev)}
              aria-label={
                isFullscreen ? 'Salir de pantalla completa' : 'Expandir a pantalla completa'
              }
              aria-pressed={isFullscreen}
              className="hidden sm:inline-flex h-8 items-center gap-1.5 px-2.5 rounded-lg bg-background hover:bg-muted text-foreground border border-border hover:border-primary/40 text-xs font-semibold transition-colors cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
            >
              {isFullscreen ? (
                <>
                  <Minimize2 className="w-3.5 h-3.5 text-primary" />
                  <span className="hidden md:inline">Restaurar</span>
                </>
              ) : (
                <>
                  <Maximize2 className="w-3.5 h-3.5 text-primary" />
                  <span className="hidden md:inline">Pantalla completa</span>
                </>
              )}
            </button>

            <button
              type="button"
              onClick={handleClose}
              className="inline-flex h-9 w-9 sm:h-8 sm:w-8 items-center justify-center rounded-lg bg-background hover:bg-muted text-muted-foreground hover:text-foreground border border-border hover:border-primary/40 transition-colors shrink-0 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
              aria-label="Cerrar modal"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Compact Description Strip */}
        <div className="hidden sm:block px-6 py-2 border-b border-border bg-muted/20 shrink-0">
          <p className="text-xs text-muted-foreground leading-relaxed truncate">
            {document.description}
          </p>
        </div>

        {/* Flexible Content Viewer */}
        <div
          className={`flex-1 min-h-0 relative flex items-center justify-center bg-muted/30 p-2 sm:p-4 ${
            (imageSrc || previewImages) && isZoomed ? 'overflow-auto' : 'overflow-hidden'
          }`}
        >
          {previewImages ? (
            <div className="w-full h-full overflow-y-auto p-2 sm:p-5 flex flex-col items-center gap-5 scrollbar-thin">
              {previewImages.map((pageSrc, index) => (
                <div
                  key={index}
                  className={`relative transition-all duration-300 rounded-lg shadow-xl border border-border/80 overflow-hidden bg-white shrink-0 ${
                    isZoomed ? 'w-[140%] max-w-none sm:w-[130%]' : 'max-w-3xl w-full'
                  }`}
                >
                  <img
                    src={pageSrc}
                    alt={`${document.title} - Página ${index + 1}`}
                    className="w-full h-auto block select-none pointer-events-none"
                    loading={index === 0 ? 'eager' : 'lazy'}
                  />

                  {previewImages.length > 1 && (
                    <span className="absolute bottom-2 right-2 px-2 py-0.5 rounded-md bg-black/75 text-white font-mono text-[11px] backdrop-blur-xs select-none shadow-md">
                      Página {index + 1} de {previewImages.length}
                    </span>
                  )}
                </div>
              ))}
            </div>
          ) : isPdf ? (
            <div className="w-full h-full rounded-xl overflow-hidden border border-border bg-muted/20 dark:bg-slate-950 flex items-center justify-center">
              <PdfViewer
                url={document.documentUrl}
                title={document.title}
                isZoomed={isZoomed}
              />
            </div>
          ) : imageSrc ? (
            <div
              className={`w-full h-full rounded-xl border border-border bg-background flex items-center justify-center p-2 sm:p-3 ${
                isZoomed ? 'overflow-auto' : 'overflow-hidden'
              }`}
            >
              <img
                src={imageSrc}
                alt={`Vista previa de ${document.title}`}
                onClick={() => setIsZoomed((prev) => !prev)}
                className={`transition-transform duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] motion-reduce:transition-none ${
                  isZoomed
                    ? 'w-[140%] max-w-none sm:w-[130%] h-auto object-contain cursor-zoom-out'
                    : 'object-contain w-full h-full cursor-zoom-in'
                }`}
              />
            </div>
          ) : (
            <div className="w-full h-full rounded-xl border border-border bg-background flex items-center justify-center text-center p-6 text-sm text-muted-foreground">
              No se pudo mostrar la vista previa del documento.
            </div>
          )}
        </div>

        {/* Fixed Bottom Actions */}
        <div className="flex flex-col sm:flex-row gap-2 sm:gap-3 px-4 sm:px-6 py-3 border-t border-border bg-muted/40 shrink-0">
          <a
            href={document.documentUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full sm:flex-1 min-h-[44px] sm:min-h-0 sm:h-10 inline-flex items-center justify-center gap-2 px-4 rounded-xl bg-primary hover:bg-primary/90 text-primary-foreground font-semibold text-sm transition-all duration-200 active:scale-[0.98] motion-reduce:transition-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
          >
            <ExternalLink className="w-4 h-4" />
            <span>Ver documento en pestaña</span>
          </a>

          <a
            href={document.documentUrl}
            download
            className="w-full sm:flex-1 min-h-[44px] sm:min-h-0 sm:h-10 inline-flex items-center justify-center gap-2 px-4 rounded-xl bg-background hover:bg-muted border border-border hover:border-primary/40 text-foreground font-semibold text-sm transition-all duration-200 active:scale-[0.98] motion-reduce:transition-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
          >
            <Download className="w-4 h-4 text-primary" />
            <span>{isPdf ? 'Descargar PDF' : 'Descargar documento'}</span>
          </a>
        </div>
      </div>
    </div>
  )

  return createPortal(modalContent, window.document.body)
}
