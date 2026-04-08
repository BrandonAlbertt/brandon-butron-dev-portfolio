'use client'

import { useEffect, useCallback } from 'react'
import { X, ExternalLink, Download, Building2, Calendar, FileText } from 'lucide-react'

/**
 * COMPONENTE DOCUMENT MODAL (REUTILIZABLE)
 * ========================================
 * Ubicación: components/DocumentModal.tsx
 * 
 * ¿Qué hace?
 * - Muestra un modal con preview de PDF
 * - Incluye información del documento
 * - Botones para ver en nueva pestaña y descargar
 * 
 * ¿Cómo usarlo?
 * - Importar el componente
 * - Pasar las props: isOpen, onClose, document
 */

export interface DocumentData {
    title: string
    institution: string
    year: number
    description: string
    documentUrl: string

    // MODIFICADO:
    // Campo opcional para usar una imagen miniatura si luego quieres
    // mostrar preview visual alternativo.
    previewImage?: string
}

interface DocumentModalProps {
    isOpen: boolean
    onClose: () => void
    document: DocumentData | null
}

export function DocumentModal({ isOpen, onClose, document }: DocumentModalProps) {
    // Cerrar con ESC
    const handleKeyDown = useCallback(
        (e: KeyboardEvent) => {
            if (e.key === 'Escape') {
                onClose()
            }
        },
        [onClose]
    )

    useEffect(() => {
        if (!isOpen) return

        // MODIFICADO:
        // Guardamos el overflow anterior para restaurarlo correctamente
        const previousOverflow = window.document.body.style.overflow
        window.document.body.style.overflow = 'hidden'
        window.addEventListener('keydown', handleKeyDown)

        return () => {
            window.document.body.style.overflow = previousOverflow
            window.removeEventListener('keydown', handleKeyDown)
        }
    }, [isOpen, handleKeyDown])

    if (!isOpen || !document) return null

    return (
        <div
            className="fixed inset-0 z-[200] flex items-center justify-center p-4 sm:p-6"
            onClick={onClose}
        >
            {/* Overlay */}
            <div className="absolute inset-0 bg-background/80 backdrop-blur-sm" />

            {/* Modal */}
            <div
                className="relative w-full max-w-4xl max-h-[90vh] bg-card border-2 border-primary/30 rounded-2xl shadow-2xl shadow-primary/20 overflow-hidden flex flex-col animate-in fade-in-0 zoom-in-95 duration-300"
                onClick={(e) => e.stopPropagation()}
            >
                {/* Header */}
                <div className="flex items-start justify-between gap-4 p-5 sm:p-6 border-b border-primary/20 bg-gradient-to-r from-primary/10 via-accent/5 to-secondary/10">
                    <div className="flex-1 min-w-0">
                        <h2 className="text-xl sm:text-2xl font-bold text-foreground mb-2 flex items-center gap-2">
                            <FileText className="w-6 h-6 text-primary flex-shrink-0" />
                            <span className="truncate">{document.title}</span>
                        </h2>

                        <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-sm text-muted-foreground">
                            <div className="flex items-center gap-1.5">
                                <Building2 className="w-4 h-4 text-primary/70" />
                                <span>{document.institution}</span>
                            </div>

                            <div className="flex items-center gap-1.5">
                                <Calendar className="w-4 h-4 text-accent/70" />
                                <span>{document.year}</span>
                            </div>
                        </div>
                    </div>

                    {/* Close button */}
                    <button
                        onClick={onClose}
                        className="p-2 rounded-lg hover:bg-muted/80 text-muted-foreground hover:text-foreground transition-colors flex-shrink-0"
                        aria-label="Cerrar modal"
                    >
                        <X className="w-5 h-5" />
                    </button>
                </div>

                {/* Description */}
                <div className="px-5 sm:px-6 py-4 border-b border-primary/10 bg-muted/30">
                    <p className="text-sm text-muted-foreground leading-relaxed">
                        {document.description}
                    </p>
                </div>

                {/* Preview */}
                <div className="flex-1 min-h-0 p-4 sm:p-6 bg-muted/20">
                    <div className="w-full h-full min-h-[300px] sm:min-h-[400px] rounded-xl overflow-hidden border border-primary/20 shadow-inner bg-background">
                        {/* 
              MODIFICADO:
              Si quieres forzar miniatura en el futuro, ya está preparado.
              Por ahora seguirá mostrando el PDF.
            */}
                        {document.documentUrl.toLowerCase().endsWith('.pdf') ? (
                            <iframe
                                src={`${document.documentUrl}#toolbar=0&navpanes=0&scrollbar=1`}
                                className="w-full h-full min-h-[300px] sm:min-h-[400px]"
                                title={`Preview de ${document.title}`}
                            />
                        ) : document.previewImage ? (
                            <img
                                src={document.previewImage}
                                alt={`Vista previa de ${document.title}`}
                                className="w-full h-full object-contain"
                            />
                        ) : (
                            <div className="w-full h-full min-h-[300px] sm:min-h-[400px] flex items-center justify-center text-center p-6 text-muted-foreground">
                                No se pudo mostrar la vista previa del documento.
                            </div>
                        )}
                    </div>
                </div>

                {/* Footer with buttons */}
                <div className="flex flex-col sm:flex-row gap-3 p-5 sm:p-6 border-t border-primary/20 bg-gradient-to-r from-muted/50 to-muted/30">
                    <a
                        href={document.documentUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex-1 inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-gradient-to-r from-primary to-accent text-primary-foreground font-bold hover:shadow-lg hover:shadow-primary/50 transition-all duration-300 group relative overflow-hidden"
                    >
                        <div className="absolute inset-0 bg-white/20 transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-500" />
                        <ExternalLink className="w-4 h-4 relative" />
                        <span className="relative">Ver documento</span>
                    </a>

                    <a
                        href={document.documentUrl}
                        download
                        className="flex-1 inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl border-2 border-primary text-primary font-bold hover:bg-primary/10 hover:shadow-lg hover:shadow-primary/30 transition-all duration-300"
                    >
                        <Download className="w-4 h-4" />
                        <span>Descargar</span>
                    </a>
                </div>
            </div>
        </div>
    )
}