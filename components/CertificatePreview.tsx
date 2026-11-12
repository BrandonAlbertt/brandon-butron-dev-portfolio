'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import { FileText } from 'lucide-react'

export function hasValidCertificateImage(image?: string | null): boolean {
  return Boolean(image && image.trim().length > 0 && image !== '#')
}

export function hasValidCertificateLink(link?: string | null): boolean {
  return Boolean(link && link.trim().length > 0 && link !== '#')
}

// In-memory cache so once page 1 of a PDF is rendered to WebP, it never re-renders
const pdfThumbnailsCache = new Map<string, string>()

interface CertificatePreviewProps {
  title: string
  certificateImage?: string
  certificateLink?: string
  mode?: 'cover' | 'contain'
  className?: string
  imageClassName?: string
  priority?: boolean
  sizes?: string
}

/**
 * Smart certificate preview component.
 * - If certificateImage is present, renders Next.js <Image>.
 * - If only certificateLink (PDF) exists, uses pdfjs-dist to render page 1 to an in-memory
 *   <canvas> and outputs a pure WebP <img> without iframe chrome, toolbars, or scrollbars.
 * - Displays a technical skeleton while processing.
 */
export function CertificatePreview({
  title,
  certificateImage,
  certificateLink,
  mode = 'cover',
  className = '',
  imageClassName = '',
  priority = false,
  sizes = '(max-width: 768px) 100vw, 50vw',
}: CertificatePreviewProps) {
  const hasImage = hasValidCertificateImage(certificateImage)
  const hasPdf = hasValidCertificateLink(certificateLink)
  const cleanPdfUrl = hasPdf && certificateLink ? certificateLink.split('#')[0] : ''

  const [pdfDataUrl, setPdfDataUrl] = useState<string | null>(() => {
    if (hasImage) return null
    return cleanPdfUrl ? pdfThumbnailsCache.get(cleanPdfUrl) ?? null : null
  })
  const [isLoadingPdf, setIsLoadingPdf] = useState<boolean>(() => {
    if (hasImage || !cleanPdfUrl) return false
    return !pdfThumbnailsCache.has(cleanPdfUrl)
  })

  useEffect(() => {
    if (hasImage || !cleanPdfUrl) {
      setIsLoadingPdf(false)
      return
    }

    const cached = pdfThumbnailsCache.get(cleanPdfUrl)
    if (cached) {
      setPdfDataUrl(cached)
      setIsLoadingPdf(false)
      return
    }

    let isMounted = true
    setIsLoadingPdf(true)

    async function renderPdfFirstPage() {
      try {
        const pdfjs = await import('pdfjs-dist')

        if (!pdfjs.GlobalWorkerOptions.workerSrc) {
          pdfjs.GlobalWorkerOptions.workerSrc = '/pdf.worker.min.mjs'
        }

        const res = await fetch(cleanPdfUrl)
        if (!res.ok) throw new Error(`HTTP ${res.status}`)
        const arrayBuffer = await res.arrayBuffer()
        const data = new Uint8Array(arrayBuffer)

        const loadingTask = pdfjs.getDocument({ data })
        const pdf = await loadingTask.promise
        const page = await pdf.getPage(1)

        // Render at 1.8x scale for sharp text and official seal rendering
        const viewport = page.getViewport({ scale: 1.8 })
        const canvas = document.createElement('canvas')
        canvas.width = Math.round(viewport.width)
        canvas.height = Math.round(viewport.height)
        const ctx = canvas.getContext('2d', { alpha: false })

        if (ctx) {
          // Fill pure white background behind the certificate
          ctx.fillStyle = '#ffffff'
          ctx.fillRect(0, 0, canvas.width, canvas.height)

          const renderTask = (page.render as unknown as (params: Record<string, unknown>) => { promise: Promise<unknown> })({
            canvas,
            canvasContext: ctx,
            viewport,
          })
          await renderTask.promise

          const dataUrl = canvas.toDataURL('image/webp', 0.92)
          pdfThumbnailsCache.set(cleanPdfUrl, dataUrl)

          if (isMounted) {
            setPdfDataUrl(dataUrl)
            setIsLoadingPdf(false)
          }
        }
      } catch (err) {
        console.warn(`[CertificatePreview] Error rendering first page for ${cleanPdfUrl}:`, err)
        if (isMounted) {
          setIsLoadingPdf(false)
        }
      }
    }

    renderPdfFirstPage()

    return () => {
      isMounted = false
    }
  }, [hasImage, cleanPdfUrl])

  // 1. Static Image provided
  if (hasImage && certificateImage) {
    return (
      <div className={`relative w-full h-full overflow-hidden ${className}`}>
        <Image
          src={certificateImage}
          alt={title}
          fill
          priority={priority}
          sizes={sizes}
          className={`${
            mode === 'cover' ? 'object-cover object-center' : 'object-contain p-1.5 sm:p-3'
          } ${imageClassName}`}
        />
      </div>
    )
  }

  // 2. Loading state for PDF page 1 extraction
  if (isLoadingPdf) {
    return (
      <div
        className={`relative w-full h-full flex flex-col justify-between p-3.5 bg-muted/40 overflow-hidden ${className}`}
        aria-label={`Cargando vista previa de ${title}`}
      >
        <div className="flex items-center justify-between">
          <div className="w-16 h-2 rounded bg-muted-foreground/15 animate-pulse" />
          <div className="w-8 h-2 rounded bg-muted-foreground/15 animate-pulse" />
        </div>
        <div className="flex flex-col items-center justify-center my-auto gap-2">
          <div className="w-9 h-9 rounded-lg bg-primary/10 border border-primary/20 flex items-center justify-center text-primary">
            <FileText className="w-4 h-4 animate-pulse" />
          </div>
          <span className="font-mono text-[10px] text-muted-foreground/60 tracking-wider uppercase">
            RENDER_PAGE_1
          </span>
        </div>
        <div className="w-2/3 h-2 rounded bg-muted-foreground/15 animate-pulse" />
      </div>
    )
  }

  // 3. Rendered WebP image of page 1
  if (pdfDataUrl) {
    return (
      <div className={`relative w-full h-full overflow-hidden bg-background ${className}`}>
        <img
          src={pdfDataUrl}
          alt={`Primera página de ${title}`}
          className={`w-full h-full ${
            mode === 'cover' ? 'object-cover object-center' : 'object-contain p-1.5 sm:p-3'
          } ${imageClassName}`}
        />
      </div>
    )
  }

  // 4. Fallback placeholder if neither exists or failed
  return (
    <div
      className={`relative w-full h-full flex flex-col items-center justify-center gap-2 p-4 text-center bg-muted/40 border border-border/80 ${className}`}
    >
      <div className="w-10 h-10 rounded-xl bg-primary/10 border border-primary/25 flex items-center justify-center text-primary">
        <FileText className="w-5 h-5" />
      </div>
      <p className="text-xs font-mono font-medium text-muted-foreground line-clamp-1 max-w-[85%]">
        {title}
      </p>
    </div>
  )
}
