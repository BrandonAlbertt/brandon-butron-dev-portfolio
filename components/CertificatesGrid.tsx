'use client'

import { useState } from 'react'
import Link from 'next/link'
import { ArrowUpRight, CheckCircle2, FileText } from 'lucide-react'
import { CertificatePreview, hasValidCertificateLink } from './CertificatePreview'
import certificatesData from '@/data/certificates.json'

interface Certificate {
  id: number
  title: string
  organization: string
  year: number
  certificateLink: string
  certificateImage?: string
}

const CERTIFICATES_PER_PAGE = 6

export function CertificatesGrid() {
  const [currentPage, setCurrentPage] = useState(1)
  const certificates: Certificate[] = [...(certificatesData as Certificate[])].sort(
    (a, b) => a.id - b.id
  )

  const totalPages = Math.ceil(certificates.length / CERTIFICATES_PER_PAGE)
  const startIndex = (currentPage - 1) * CERTIFICATES_PER_PAGE
  const endIndex = startIndex + CERTIFICATES_PER_PAGE
  const currentCertificates = certificates.slice(startIndex, endIndex)

  return (
    <section
      id="certificates"
      className="studio-panel rounded-2xl p-4 sm:p-6 lg:p-8 flex flex-col gap-5 lg:gap-6"
    >
      {/* Left-Aligned Header */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b border-border pb-5">
        <div className="space-y-1">
          <span className="text-xs font-mono font-medium text-primary">
            Certificaciones
          </span>
          <h2 className="text-2xl sm:text-3xl font-bold tracking-[-0.02em] text-foreground">
            Certificados y Logros
          </h2>
          <p className="text-sm text-muted-foreground max-w-[65ch] leading-relaxed">
            Certificados oficiales y acreditaciones técnicas emitidos por diversas instituciones académicas y tecnológicas reconocidas (UNI, UTP y más).
          </p>
        </div>

        <span className="inline-flex items-center px-3 py-1.5 rounded-lg bg-muted/60 border border-border text-xs font-mono text-foreground font-semibold tabular-nums shrink-0 self-start sm:self-auto">
          {certificates.length} certificados
        </span>
      </div>

      {/* Certificates Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {currentCertificates.map((cert) => {
          const hasPdf = hasValidCertificateLink(cert.certificateLink)
          return (
            <article
            key={cert.id}
            className="group flex flex-col h-full rounded-2xl bg-card border border-border hover:border-primary/40 transition-colors duration-300 overflow-hidden shadow-xs"
          >
            {/* Concentric Technical Preview Chassis */}
            <div className="p-1.5 bg-gradient-to-b from-muted/70 via-muted/30 to-transparent dark:from-slate-800/60 dark:via-slate-900/40 dark:to-slate-950/60 border-b border-border">
              <div className="relative h-40 sm:h-44 w-full rounded-[10px] overflow-hidden bg-background/85 dark:bg-slate-950 border border-border/80 ring-1 ring-inset ring-black/5 dark:ring-white/10">
                <CertificatePreview
                  title={cert.title}
                  certificateImage={cert.certificateImage}
                  certificateLink={cert.certificateLink}
                  mode="cover"
                  imageClassName="group-hover:scale-[1.03] transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)]"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                />

                {/* Technical Verification Badge */}
                <div className="absolute top-2 left-2 z-10 inline-flex items-center gap-1.5 px-2 py-0.5 rounded-md bg-background/90 border border-border text-xs font-mono font-medium text-foreground backdrop-blur-md tabular-nums shadow-xs">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
                  <span>VERIFIED · {cert.year}</span>
                </div>

                {/* Credential ID Tag */}
                <span className="absolute top-2 right-2 z-10 inline-flex items-center px-2 py-0.5 rounded-md bg-background/90 border border-border text-xs font-mono text-muted-foreground backdrop-blur-md tabular-nums shadow-xs">
                  #{cert.id}
                </span>
              </div>
            </div>

            {/* Info Container */}
            <div className="p-4 sm:p-5 flex-1 flex flex-col justify-between gap-4">
              <div className="space-y-1.5">
                <h3
                  title={cert.title}
                  className="text-sm sm:text-[15px] font-semibold text-foreground group-hover:text-primary transition-colors leading-snug text-balance min-h-[2.6rem] flex items-start"
                >
                  {cert.title}
                </h3>

                <p className="text-xs font-mono text-muted-foreground truncate" title={cert.organization}>
                  {cert.organization}
                </p>
              </div>

              {/* Actions */}
              <div className="flex items-center gap-2 pt-3 border-t border-border">
                <Link
                  href={`/certificates/${cert.id}`}
                  className={`${
                    hasPdf ? 'flex-1' : 'w-full'
                  } min-h-[44px] sm:min-h-0 sm:h-9 px-3 rounded-lg bg-primary/10 hover:bg-primary/15 text-primary border border-primary/25 flex items-center justify-center gap-1.5 text-xs font-semibold transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring`}
                >
                  <span>Inspeccionar</span>
                  <ArrowUpRight className="w-3.5 h-3.5 shrink-0 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </Link>

                {hasPdf && (
                  <a
                    href={cert.certificateLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="min-h-[44px] sm:min-h-0 sm:h-9 px-3 rounded-lg bg-background hover:bg-muted text-foreground border border-border hover:border-primary/40 flex items-center justify-center gap-1.5 text-xs font-semibold transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                    title="Abrir PDF original"
                  >
                    <FileText className="w-3.5 h-3.5 shrink-0" />
                    <span>PDF</span>
                  </a>
                )}
              </div>
            </div>
          </article>
        )})}
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex items-center justify-center gap-2 pt-2">
          {Array.from({ length: totalPages }).map((_, i) => {
            const page = i + 1
            const isActive = currentPage === page
            return (
              <button
                key={page}
                type="button"
                onClick={() => setCurrentPage(page)}
                aria-current={isActive ? 'page' : undefined}
                aria-label={`Página ${page} de certificados`}
                className={`w-9 h-9 rounded-lg text-xs font-semibold font-mono tabular-nums transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring ${
                  isActive
                    ? 'bg-primary text-primary-foreground'
                    : 'bg-background border border-border text-muted-foreground hover:text-foreground hover:bg-muted'
                }`}
              >
                {page}
              </button>
            )
          })}
        </div>
      )}
    </section>
  )
}
