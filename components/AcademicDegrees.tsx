'use client'

import { useState } from 'react'
import { Award, Calendar, Building2, FileCheck } from 'lucide-react'
import { DocumentModal, type DocumentData } from './DocumentModal'
import academicDegreesData from '@/data/titulos-academicos.json'

/**
 * COMPONENTE ACADEMIC DEGREES (TÍTULOS ACADÉMICOS)
 * ================================================
 * Ubicación: components/AcademicDegrees.tsx
 *
 * ¿Qué hace?
 * - Muestra documentos académicos formales
 * - Consume datos desde: data/TitulosAcademicos.json
 * - Al hacer clic en una tarjeta, abre un modal con el documento
 *
 * MODIFICACIÓN IMPORTANTE:
 * Antes este componente esperaba campos como:
 * - organization
 * - certificateLink
 * - certificateImage
 *
 * Pero tu JSON real usa:
 * - institution
 * - documentUrl
 * - previewImage
 *
 * Por eso se corrigieron las interfaces y el mapeo.
 */

/**
 * MODIFICACIÓN 1:
 * Esta interfaz ahora coincide EXACTAMENTE con tu JSON.
 *
 * Tu JSON tiene esta forma:
 * [
 *   {
 *     "id": 1,
 *     "title": "...",
 *     "institution": "...",
 *     "year": 2025,
 *     "status": "Disponible",
 *     "description": "...",
 *     "documentUrl": "...",
 *     "previewImage": "..."
 *   }
 * ]
 */
interface AcademicDegreeFromJson {
    id: number
    title: string
    institution: string
    year: number
    status?: string
    description?: string
    documentUrl: string
    previewImage?: string
}

/**
 * Esta interfaz representa los datos ya listos para usar
 * dentro del componente.
 *
 * En este caso es casi igual al JSON, pero la mantenemos
 * separada por orden y por si luego quieres personalizarla.
 */
interface AcademicDegree {
    id: number
    title: string
    institution: string
    year: number
    status: string
    description: string
    documentUrl: string
    previewImage?: string
}

/**
 * MODIFICACIÓN 2:
 * Tipamos correctamente el JSON importado.
 *
 * Antes el error aparecía porque intentabas usar propiedades
 * que no existían en tu JSON.
 */
const academicDegreesRaw: AcademicDegreeFromJson[] = academicDegreesData

/**
 * MODIFICACIÓN 3:
 * Mapeamos el JSON a la estructura final que usará la UI.
 *
 * Aquí ya usamos los nombres correctos:
 * - institution
 * - documentUrl
 * - previewImage
 *
 * También dejamos valores por defecto por si algún campo
 * opcional no viene en el JSON.
 */
const academicDegrees: AcademicDegree[] = academicDegreesRaw.map((item) => ({
    id: item.id,
    title: item.title,
    institution: item.institution,
    year: item.year,
    status: item.status ?? 'Disponible',
    description:
        item.description ??
        `Documento académico formal emitido por ${item.institution}.`,
    documentUrl: item.documentUrl,
    previewImage: item.previewImage,
}))

export function AcademicDegrees() {
    const [selectedDocument, setSelectedDocument] = useState<DocumentData | null>(null)
    const [isModalOpen, setIsModalOpen] = useState(false)

    /**
     * MODIFICACIÓN 4:
     * Cuando haces clic en una tarjeta, enviamos al modal
     * la información correcta del documento.
     *
     * También se envía previewImage para mostrar una vista previa
     * si tu modal la soporta.
     */
    const handleCardClick = (degree: AcademicDegree) => {
        setSelectedDocument({
            title: degree.title,
            institution: degree.institution,
            year: degree.year,
            description: degree.description,
            documentUrl: degree.documentUrl,
            previewImage: degree.previewImage,
        })
        setIsModalOpen(true)
    }

    const handleCloseModal = () => {
        setIsModalOpen(false)
        setSelectedDocument(null)
    }

    return (
        <section id="academic-degrees" className="py-20 relative overflow-hidden">
            {/* Fondo decorativo superior izquierdo */}
            <div className="absolute top-0 left-0 w-96 h-96 bg-primary/10 rounded-full blur-3xl opacity-40 -translate-x-1/2 -translate-y-1/2" />

            {/* Fondo decorativo inferior derecho */}
            <div className="absolute bottom-0 right-0 w-96 h-96 bg-accent/10 rounded-full blur-3xl opacity-40 translate-x-1/2 translate-y-1/2" />

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                {/* Encabezado de la sección */}
                <div className="mb-16 text-center relative">
                    <div className="h-1 w-20 bg-gradient-to-r from-transparent via-primary to-transparent mx-auto mb-6 animate-pulse" />

                    <h2 className="text-4xl md:text-5xl font-black mb-4 bg-gradient-to-r from-primary via-accent to-secondary bg-clip-text text-transparent animate-manga-shine">
                        Títulos Académicos
                    </h2>

                    <p className="text-muted-foreground text-lg max-w-2xl mx-auto mb-2">
                        Documentos académicos formales y logros oficiales
                    </p>

                    <div className="h-1 w-20 bg-gradient-to-r from-transparent via-accent to-transparent mx-auto mt-6 animate-pulse" />
                </div>

                {/* Grid de tarjetas */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-5xl mx-auto">
                    {academicDegrees.map((degree) => (
                        <AcademicDegreeCard
                            key={degree.id}
                            degree={degree}
                            onClick={() => handleCardClick(degree)}
                        />
                    ))}
                </div>
            </div>

            {/* Modal del documento */}
            <DocumentModal
                isOpen={isModalOpen}
                onClose={handleCloseModal}
                document={selectedDocument}
            />
        </section>
    )
}

function AcademicDegreeCard({
    degree,
    onClick,
}: {
    degree: AcademicDegree
    onClick: () => void
}) {
    return (
        <div
            onClick={onClick}
            className="group relative rounded-2xl overflow-hidden bg-card border-2 border-primary/40 hover:border-primary transition-all duration-500 hover:shadow-2xl hover:shadow-primary/30 hover:-translate-y-2 cursor-pointer"
        >
            {/* Efecto brillo al pasar el mouse */}
            <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-accent/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

            {/* Barra superior decorativa */}
            <div className="h-1.5 w-full bg-gradient-to-r from-primary via-accent to-secondary" />

            {/* Contenido interno de la tarjeta */}
            <div className="relative p-6 space-y-5">
                {/* Icono y estado */}
                <div className="flex items-start justify-between">
                    <div className="p-3 rounded-xl bg-gradient-to-br from-primary/20 to-accent/20 border border-primary/30 group-hover:border-primary/50 transition-colors">
                        <Award className="w-7 h-7 text-primary" />
                    </div>

                    <span className="px-3 py-1.5 rounded-full bg-gradient-to-r from-accent/20 to-primary/20 border border-accent/40 text-accent text-xs font-bold flex items-center gap-1.5">
                        <FileCheck className="w-3.5 h-3.5" />
                        {degree.status}
                    </span>
                </div>

                {/* Título */}
                <h3 className="text-xl font-bold text-foreground group-hover:text-primary transition-colors leading-tight">
                    {degree.title}
                </h3>

                {/* Institución */}
                <div className="flex items-center gap-2 text-muted-foreground">
                    <Building2 className="w-4 h-4 text-primary/70" />
                    <span className="text-sm font-medium">{degree.institution}</span>
                </div>

                {/* Año */}
                <div className="flex items-center gap-2 text-muted-foreground">
                    <Calendar className="w-4 h-4 text-accent/70" />
                    <span className="text-sm font-medium">{degree.year}</span>
                </div>

                {/* Descripción */}
                <p className="text-sm text-muted-foreground leading-relaxed border-t border-primary/20 pt-4">
                    {degree.description}
                </p>

                {/* Botón visual */}
                <div className="inline-flex items-center justify-center gap-2 w-full px-5 py-3 rounded-xl bg-gradient-to-r from-primary to-accent text-primary-foreground font-bold group-hover:shadow-lg group-hover:shadow-primary/50 transition-all duration-300 relative overflow-hidden">
                    <div className="absolute inset-0 bg-white/20 transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-500" />
                    <span className="relative">Ver documento</span>
                </div>
            </div>

            {/* Esquinas decorativas */}
            <div className="absolute top-0 right-0 w-16 h-16 bg-gradient-to-bl from-primary/20 to-transparent rounded-bl-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            <div className="absolute bottom-0 left-0 w-16 h-16 bg-gradient-to-tr from-accent/20 to-transparent rounded-tr-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        </div>
    )
}