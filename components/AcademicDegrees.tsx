'use client'

import { useState, useRef, type KeyboardEvent } from 'react'
import Image from 'next/image'
import {
  Award,
  Building2,
  Calendar,
  CheckCircle2,
  Clock,
  Download,
  Eye,
  FileCheck2,
  GraduationCap,
  Layers,
  Maximize2,
  ShieldCheck,
} from 'lucide-react'
import { DocumentModal, type DocumentData } from './DocumentModal'
import academicDegreesData from '@/data/titulos-academicos.json'

type CredentialKey = 'bachiller' | 'egresado' | 'titulo'

interface AcademicDegreeItem {
  id: number
  key: CredentialKey
  tabLabel: string
  badgeLabel: string
  degreeType: string
  title: string
  institution: string
  year: number
  status: string
  description: string
  documentUrl: string
  previewImage?: string
}

const credentials = academicDegreesData as AcademicDegreeItem[]

export function AcademicDegrees() {
  const [activeKey, setActiveKey] = useState<CredentialKey>('bachiller')
  const [selectedDocument, setSelectedDocument] = useState<DocumentData | null>(null)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const tabRefs = useRef<Array<HTMLButtonElement | null>>([])

  const activeCredential =
    credentials.find((item) => item.key === activeKey) ?? credentials[0]

  const respaldoCredential = credentials.find((item) => item.key === 'egresado')

  const openDocumentModal = (credential: AcademicDegreeItem) => {
    if (!credential.documentUrl) return
    setSelectedDocument({
      title: credential.title,
      institution: credential.institution,
      year: credential.year,
      description: credential.description,
      documentUrl: credential.documentUrl,
      previewImage: credential.previewImage || undefined,
    })
    setIsModalOpen(true)
  }

  const closeDocumentModal = () => {
    setIsModalOpen(false)
    setSelectedDocument(null)
  }

  const handleTabKeyDown = (e: KeyboardEvent<HTMLButtonElement>, index: number) => {
    if (e.key === 'ArrowRight') {
      e.preventDefault()
      const next = (index + 1) % credentials.length
      setActiveKey(credentials[next].key)
      tabRefs.current[next]?.focus()
    } else if (e.key === 'ArrowLeft') {
      e.preventDefault()
      const prev = (index - 1 + credentials.length) % credentials.length
      setActiveKey(credentials[prev].key)
      tabRefs.current[prev]?.focus()
    } else if (e.key === 'Home') {
      e.preventDefault()
      setActiveKey(credentials[0].key)
      tabRefs.current[0]?.focus()
    } else if (e.key === 'End') {
      e.preventDefault()
      const last = credentials.length - 1
      setActiveKey(credentials[last].key)
      tabRefs.current[last]?.focus()
    }
  }

  const hasDocument = Boolean(activeCredential.documentUrl)
  const isPdfDocument =
    hasDocument && activeCredential.documentUrl.toLowerCase().endsWith('.pdf')
  const isPdfOnly = isPdfDocument && !activeCredential.previewImage

  return (
    <section
      id="academic-degrees"
      className="studio-panel rounded-2xl p-4 sm:p-6 lg:p-8 space-y-6"
    >
      {/* Header + Segmented Tabs Control */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 pb-5 border-b border-border">
        <div className="space-y-1">
          <div className="inline-flex items-center gap-2 text-xs font-mono font-medium text-primary">
            <ShieldCheck className="w-3.5 h-3.5 shrink-0" />
            <span>Acreditación Académica</span>
          </div>
          <h2 className="text-xl sm:text-2xl font-bold tracking-[-0.02em] text-foreground">
            Bóveda de Grados y Títulos
          </h2>
          <p className="text-sm text-muted-foreground max-w-[65ch]">
            Registro oficial de grado académico, constancia de egreso y progreso hacia la titulación profesional.
          </p>
        </div>

        {/* 3-State Segmented Control */}
        <div
          role="tablist"
          aria-label="Estados de acreditación académica"
          className="inline-flex flex-col sm:flex-row w-full lg:w-auto p-1 rounded-xl bg-muted/70 border border-border gap-1"
        >
          {credentials.map((item, index) => {
            const isActive = item.key === activeKey
            return (
              <button
                key={item.key}
                ref={(el) => {
                  tabRefs.current[index] = el
                }}
                type="button"
                role="tab"
                id={`academic-tab-${item.key}`}
                aria-selected={isActive}
                aria-controls={`academic-panel-${item.key}`}
                tabIndex={isActive ? 0 : -1}
                onClick={() => setActiveKey(item.key)}
                onKeyDown={(e) => handleTabKeyDown(e, index)}
                className={`min-h-[44px] sm:min-h-0 px-3.5 py-2 rounded-lg text-xs sm:text-sm font-semibold transition-all duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] inline-flex items-center justify-between sm:justify-center gap-2 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background ${
                  isActive
                    ? 'bg-card text-foreground shadow-xs border border-border'
                    : 'text-muted-foreground hover:text-foreground hover:bg-background/50 border border-transparent'
                }`}
              >
                <span className="truncate">{item.tabLabel}</span>
                <span
                  className={`inline-flex items-center px-1.5 py-0.5 rounded-md font-mono text-[10px] font-medium shrink-0 ${
                    item.key === 'bachiller'
                      ? isActive
                        ? 'bg-emerald-500/15 text-emerald-700 dark:text-emerald-300 border border-emerald-500/25'
                        : 'bg-emerald-500/10 text-emerald-700 dark:text-emerald-400'
                      : item.key === 'egresado'
                        ? isActive
                          ? 'bg-primary/15 text-primary border border-primary/25'
                          : 'bg-muted text-muted-foreground'
                        : isActive
                          ? 'bg-amber-500/15 text-amber-700 dark:text-amber-300 border border-amber-500/25'
                          : 'bg-amber-500/10 text-amber-700 dark:text-amber-400'
                  }`}
                >
                  {item.key === 'bachiller'
                    ? 'Activo'
                    : item.key === 'egresado'
                      ? 'Respaldo'
                      : 'En curso'}
                </span>
              </button>
            )
          })}
        </div>
      </div>

      {/* Active Credential Panel */}
      <div
        key={activeCredential.key}
        role="tabpanel"
        id={`academic-panel-${activeCredential.key}`}
        aria-labelledby={`academic-tab-${activeCredential.key}`}
        className="workspace-view-enter"
      >
        {activeCredential.key === 'titulo' ? (
          <UpcomingTitlePanel credential={activeCredential} />
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 lg:gap-6 items-start">
            {/* LEFT COLUMN: SECURE DOCUMENT VISOR */}
            <div className="lg:col-span-7 studio-panel p-2 sm:p-3 rounded-2xl">
              {/* Technical Window Top Bar */}
              <div className="flex items-center justify-between gap-3 px-2.5 sm:px-3 py-2 mb-2 rounded-xl bg-muted/60 border border-border">
                <div className="flex items-center gap-2 min-w-0">
                  <span
                    className={`w-2 h-2 rounded-full shrink-0 ${
                      hasDocument ? 'bg-emerald-500' : 'bg-primary'
                    }`}
                    aria-hidden="true"
                  />
                  <span className="font-mono text-[11px] sm:text-xs font-medium text-muted-foreground truncate">
                    CREDENTIAL_VAULT // SECURE_ASSET
                  </span>
                </div>

                {hasDocument ? (
                  <button
                    type="button"
                    onClick={() => openDocumentModal(activeCredential)}
                    className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-background hover:bg-muted text-foreground border border-border hover:border-primary/40 text-xs font-semibold transition-colors cursor-pointer shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                  >
                    <Maximize2 className="w-3.5 h-3.5 text-primary" />
                    <span>Ampliar</span>
                  </button>
                ) : (
                  <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-md bg-emerald-500/10 border border-emerald-500/25 text-emerald-700 dark:text-emerald-300 font-mono text-[11px] font-medium shrink-0">
                    <CheckCircle2 className="w-3 h-3" />
                    <span>Verificado</span>
                  </span>
                )}
              </div>

              {/* Inner Document Frame */}
              {hasDocument ? (
                <button
                  type="button"
                  onClick={() => openDocumentModal(activeCredential)}
                  aria-label={`Abrir visor completo de ${activeCredential.title}`}
                  className="group relative w-full h-[280px] sm:h-[340px] lg:h-[380px] rounded-xl overflow-hidden bg-muted/40 border border-border flex items-center justify-center cursor-pointer transition-colors hover:border-primary/40 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                >
                  {activeCredential.previewImage ? (
                    <Image
                      src={activeCredential.previewImage}
                      alt={`Documento oficial de ${activeCredential.title}`}
                      fill
                      sizes="(max-width: 1024px) 100vw, 55vw"
                      className="object-contain p-2 sm:p-4 transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.015]"
                    />
                  ) : isPdfOnly ? (
                    <div className="relative w-full h-full overflow-hidden">
                      <iframe
                        src={`${activeCredential.documentUrl.split('#')[0]}#toolbar=0&navpanes=0&scrollbar=0&view=FitH`}
                        title={`Vista previa de ${activeCredential.title}`}
                        className="w-full h-full border-0 pointer-events-none"
                      />
                    </div>
                  ) : (
                    <div className="flex flex-col items-center justify-center gap-2 text-muted-foreground p-6">
                      <FileCheck2 className="w-10 h-10 text-primary" />
                      <span className="text-sm font-medium text-foreground">
                        {activeCredential.title}
                      </span>
                    </div>
                  )}

                  <span className="absolute bottom-3 right-3 inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg bg-background/90 backdrop-blur-md border border-border text-xs font-semibold text-foreground shadow-xs opacity-95 group-hover:border-primary/40 transition-all">
                    <Eye className="w-3.5 h-3.5 text-primary" />
                    <span>{isPdfDocument ? 'Inspeccionar PDF' : 'Inspeccionar diploma'}</span>
                  </span>
                </button>
              ) : (
                <div className="relative w-full h-[280px] sm:h-[340px] lg:h-[380px] rounded-xl overflow-hidden bg-muted/30 border border-border p-5 sm:p-8 flex flex-col justify-between">
                  {/* Subtle engineering grid */}
                  <div
                    aria-hidden="true"
                    className="pointer-events-none absolute inset-0 studio-grid-overlay opacity-40"
                  />

                  <div className="relative flex items-center justify-between gap-3">
                    <div className="w-11 h-11 rounded-xl bg-primary/10 border border-primary/25 flex items-center justify-center text-primary">
                      <GraduationCap className="w-5 h-5" />
                    </div>
                    <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-emerald-500/10 border border-emerald-500/25 text-emerald-700 dark:text-emerald-300 text-xs font-semibold">
                      <CheckCircle2 className="w-3.5 h-3.5" />
                      <span>{activeCredential.badgeLabel}</span>
                    </span>
                  </div>

                  <div className="relative space-y-2 max-w-md">
                    <p className="font-mono text-xs text-primary">
                      {activeCredential.degreeType} · UTP
                    </p>
                    <h3 className="text-lg sm:text-xl font-bold tracking-[-0.02em] text-foreground">
                      {activeCredential.title}
                    </h3>
                    <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
                      Grado académico otorgado. El archivo PDF escaneado se integrará directamente en este visor oficial para inspección en línea.
                    </p>
                  </div>

                  <div className="relative flex flex-wrap items-center justify-between gap-3 pt-3 border-t border-border/80">
                    <span className="font-mono text-xs tabular-nums text-muted-foreground">
                      REGISTRO // {activeCredential.year}
                    </span>

                    {respaldoCredential?.documentUrl && (
                      <button
                        type="button"
                        onClick={() => setActiveKey('egresado')}
                        className="inline-flex items-center gap-1.5 text-xs font-semibold text-primary hover:underline cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring rounded-md"
                      >
                        <FileCheck2 className="w-3.5 h-3.5" />
                        <span>Ver respaldo documental de egresado</span>
                      </button>
                    )}
                  </div>
                </div>
              )}
            </div>

            {/* RIGHT COLUMN: AUDIT METADATA PANEL */}
            <div className="lg:col-span-5 rounded-2xl border border-border bg-muted/20 p-4 sm:p-6 space-y-5">
              <div className="flex items-start justify-between gap-3">
                <div className="space-y-1">
                  <span className="font-mono text-xs font-medium text-primary">
                    Ficha de Auditoría
                  </span>
                  <h3 className="text-lg sm:text-xl font-bold tracking-[-0.02em] text-foreground">
                    {activeCredential.title}
                  </h3>
                </div>

                <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-emerald-500/10 border border-emerald-500/25 text-emerald-700 dark:text-emerald-300 text-xs font-semibold shrink-0">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  <span>{activeCredential.status}</span>
                </span>
              </div>

              {/* Tabular Metadata Definition List */}
              <dl className="divide-y divide-border rounded-xl border border-border bg-card/80 px-4">
                <div className="py-3 flex items-start justify-between gap-4">
                  <dt className="inline-flex items-center gap-2 text-xs font-medium text-muted-foreground shrink-0">
                    <Building2 className="w-3.5 h-3.5 text-primary" />
                    <span>Institución</span>
                  </dt>
                  <dd className="text-xs sm:text-sm font-semibold text-foreground text-right">
                    {activeCredential.institution}
                  </dd>
                </div>

                <div className="py-3 flex items-center justify-between gap-4">
                  <dt className="inline-flex items-center gap-2 text-xs font-medium text-muted-foreground shrink-0">
                    <Calendar className="w-3.5 h-3.5 text-primary" />
                    <span>Año de obtención</span>
                  </dt>
                  <dd className="font-mono text-xs sm:text-sm font-semibold tabular-nums text-foreground text-right">
                    {activeCredential.year}
                  </dd>
                </div>

                <div className="py-3 flex items-center justify-between gap-4">
                  <dt className="inline-flex items-center gap-2 text-xs font-medium text-muted-foreground shrink-0">
                    <Award className="w-3.5 h-3.5 text-primary" />
                    <span>Tipo de Grado</span>
                  </dt>
                  <dd className="text-xs sm:text-sm font-semibold text-foreground text-right">
                    {activeCredential.degreeType}
                  </dd>
                </div>
              </dl>

              <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
                {activeCredential.description}
              </p>

              {/* Action Buttons */}
              <div className="flex flex-col gap-2.5 pt-1">
                {hasDocument ? (
                  <>
                    <button
                      type="button"
                      onClick={() => openDocumentModal(activeCredential)}
                      className="w-full min-h-[44px] sm:min-h-0 sm:h-10 inline-flex items-center justify-center gap-2 px-4 rounded-xl bg-primary hover:bg-primary/90 text-primary-foreground text-sm font-semibold transition-all duration-200 active:scale-[0.98] cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
                    >
                      <Eye className="w-4 h-4" />
                      <span>Ver documento oficial</span>
                    </button>

                    <a
                      href={activeCredential.documentUrl}
                      download
                      className="w-full min-h-[44px] sm:min-h-0 sm:h-10 inline-flex items-center justify-center gap-2 px-4 rounded-xl bg-background hover:bg-muted border border-border hover:border-primary/40 text-foreground text-sm font-semibold transition-all duration-200 active:scale-[0.98] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
                    >
                      <Download className="w-4 h-4 text-primary" />
                      <span>{isPdfDocument ? 'Descargar PDF' : 'Descargar diploma'}</span>
                    </a>
                  </>
                ) : (
                  <>
                    <button
                      type="button"
                      disabled
                      aria-disabled="true"
                      className="w-full min-h-[44px] sm:min-h-0 sm:h-10 inline-flex items-center justify-center gap-2 px-4 rounded-xl bg-muted text-muted-foreground border border-border text-sm font-semibold opacity-70 cursor-not-allowed"
                    >
                      <Eye className="w-4 h-4" />
                      <span>Ver documento oficial (digitalización pendiente)</span>
                    </button>

                    <button
                      type="button"
                      disabled
                      aria-disabled="true"
                      className="w-full min-h-[44px] sm:min-h-0 sm:h-10 inline-flex items-center justify-center gap-2 px-4 rounded-xl bg-background text-muted-foreground border border-border text-sm font-semibold opacity-70 cursor-not-allowed"
                    >
                      <Download className="w-4 h-4" />
                      <span>Descargar PDF</span>
                    </button>
                  </>
                )}
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Document Preview Modal */}
      <DocumentModal
        isOpen={isModalOpen}
        onClose={closeDocumentModal}
        document={selectedDocument}
      />
    </section>
  )
}

function UpcomingTitlePanel({ credential }: { credential: AcademicDegreeItem }) {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 lg:gap-6 items-stretch">
      {/* Left Engineering Blueprint Chassis */}
      <div className="lg:col-span-7 studio-panel p-2 sm:p-3 rounded-2xl flex flex-col">
        <div className="flex items-center justify-between gap-3 px-2.5 sm:px-3 py-2 mb-2 rounded-xl bg-muted/60 border border-border">
          <div className="flex items-center gap-2 min-w-0">
            <span
              className="w-2 h-2 rounded-full bg-amber-500 animate-pulse shrink-0"
              aria-hidden="true"
            />
            <span className="font-mono text-[11px] sm:text-xs font-medium text-muted-foreground truncate">
              CREDENTIAL_VAULT // MILESTONE_TRACKER
            </span>
          </div>

          <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-lg bg-amber-500/10 border border-amber-500/25 text-amber-700 dark:text-amber-300 font-mono text-[11px] font-semibold shrink-0">
            <Clock className="w-3 h-3" />
            <span>Próximamente</span>
          </span>
        </div>

        <div className="relative flex-1 min-h-[260px] sm:min-h-[300px] rounded-xl overflow-hidden bg-muted/30 border border-border p-5 sm:p-7 flex flex-col justify-between">
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 studio-grid-overlay opacity-40"
          />

          <div className="relative flex flex-wrap items-center justify-between gap-3">
            <span className="inline-flex items-center gap-2 px-3 py-1 rounded-lg bg-primary/10 border border-primary/25 text-primary text-xs font-semibold">
              <Layers className="w-3.5 h-3.5" />
              <span>Meta Académica · Titulación</span>
            </span>

            <span className="font-mono text-xs tabular-nums text-muted-foreground">
              OBJETIVO // {credential.year}
            </span>
          </div>

          <div className="relative space-y-2.5 my-4 max-w-xl">
            <h3 className="text-xl sm:text-2xl font-bold tracking-[-0.02em] text-foreground">
              {credential.title}
            </h3>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Esta bóveda queda preparada para incorporar la acreditación oficial del Título Profesional de Ingeniero de Software, consolidando mi crecimiento técnico en diseño de arquitecturas backend robustas, automatización de procesos y sistemas en producción.
            </p>
          </div>

          <div className="relative grid grid-cols-1 sm:grid-cols-2 gap-3 pt-4 border-t border-border/80">
            <div className="rounded-lg bg-background/80 border border-border px-3 py-2.5">
              <p className="text-[11px] font-mono text-muted-foreground">Base completada</p>
              <p className="text-xs sm:text-sm font-semibold text-foreground mt-0.5">
                Egreso & Bachillerato UTP
              </p>
            </div>
            <div className="rounded-lg bg-background/80 border border-border px-3 py-2.5">
              <p className="text-[11px] font-mono text-muted-foreground">Enfoque actual</p>
              <p className="text-xs sm:text-sm font-semibold text-foreground mt-0.5">
                Arquitectura Backend & Cloud
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Right Column: Audit Metadata */}
      <div className="lg:col-span-5 rounded-2xl border border-border bg-muted/20 p-4 sm:p-6 flex flex-col justify-between gap-5">
        <div className="space-y-4">
          <div className="flex items-start justify-between gap-3">
            <div className="space-y-1">
              <span className="font-mono text-xs font-medium text-primary">
                Seguimiento de Hito
              </span>
              <h3 className="text-lg font-bold tracking-[-0.02em] text-foreground">
                Licenciatura Profesional
              </h3>
            </div>

            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-amber-500/10 border border-amber-500/25 text-amber-700 dark:text-amber-300 text-xs font-semibold shrink-0">
              <Clock className="w-3.5 h-3.5" />
              <span>{credential.status}</span>
            </span>
          </div>

          <dl className="divide-y divide-border rounded-xl border border-border bg-card/80 px-4">
            <div className="py-3 flex items-start justify-between gap-4">
              <dt className="inline-flex items-center gap-2 text-xs font-medium text-muted-foreground shrink-0">
                <Building2 className="w-3.5 h-3.5 text-primary" />
                <span>Institución</span>
              </dt>
              <dd className="text-xs sm:text-sm font-semibold text-foreground text-right">
                {credential.institution}
              </dd>
            </div>

            <div className="py-3 flex items-center justify-between gap-4">
              <dt className="inline-flex items-center gap-2 text-xs font-medium text-muted-foreground shrink-0">
                <Calendar className="w-3.5 h-3.5 text-primary" />
                <span>Proyección</span>
              </dt>
              <dd className="font-mono text-xs sm:text-sm font-semibold tabular-nums text-foreground text-right">
                {credential.year}
              </dd>
            </div>

            <div className="py-3 flex items-center justify-between gap-4">
              <dt className="inline-flex items-center gap-2 text-xs font-medium text-muted-foreground shrink-0">
                <Award className="w-3.5 h-3.5 text-primary" />
                <span>Tipo de Grado</span>
              </dt>
              <dd className="text-xs sm:text-sm font-semibold text-foreground text-right">
                {credential.degreeType}
              </dd>
            </div>
          </dl>

          <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
            {credential.description}
          </p>
        </div>

        <div className="rounded-xl border border-border bg-background/70 px-4 py-3 text-xs text-muted-foreground leading-relaxed">
          Espacio reservado en el registro académico para publicar el acta y diploma oficial al culminar el proceso de titulación.
        </div>
      </div>
    </div>
  )
}
