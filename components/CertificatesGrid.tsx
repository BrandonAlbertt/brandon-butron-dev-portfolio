/*
========================================
EXPLICACIÓN DE CertificatesGrid
========================================

Este componente muestra una lista de certificados
con paginación usando datos de:

/data/certificates.json

------------------------------------------------
1. DATOS
------------------------------------------------

import certificatesData from '@/data/certificates.json'

El JSON funciona como base de datos local con todos
los certificados.

TypeScript define su estructura:

interface Certificate {
  id: number
  title: string
  organization: string
  year: number
  certificateLink: string
  certificateImage: string
}

------------------------------------------------
2. PAGINACIÓN
------------------------------------------------

const [currentPage, setCurrentPage] = useState(1)

const startIndex = (currentPage - 1) * 9
const endIndex = startIndex + 9

const currentCertificates = certificates.slice(startIndex, endIndex)

Se muestran 9 certificados por página usando slice().

------------------------------------------------
3. RENDERIZADO
------------------------------------------------

{currentCertificates.map((certificate) => (
  <CertificateCard certificate={certificate} />
))}

Cada certificado se muestra como una tarjeta.

------------------------------------------------
4. NAVEGACIÓN
------------------------------------------------

<Link href={`/certificates/${certificate.id}`}>

Cada tarjeta lleva a una página dinámica con el detalle
del certificado.

------------------------------------------------
RESUMEN
------------------------------------------------

- Lee datos desde certificates.json
- Muestra certificados en páginas
- Renderiza tarjetas
- Permite navegar a /certificates/{id}

Para agregar certificados solo se edita el JSON.
========================================
*/



'use client'

import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { ExternalLink, Award } from 'lucide-react'

import certificatesData from '@/data/certificates.json'

// Interfaz que define la estructura de cada certificado
interface Certificate {
  id: number
  title: string
  organization: string
  year: number
  certificateLink: string
  certificateImage: string
}

const CERTIFICATES_PER_PAGE = 9

export function CertificatesGrid() {
  const [currentPage, setCurrentPage] = useState(1)

  // usamos el JSON
  const certificates: Certificate[] = certificatesData

  const totalPages = Math.ceil(certificates.length / CERTIFICATES_PER_PAGE)

  const startIndex = (currentPage - 1) * CERTIFICATES_PER_PAGE
  const endIndex = startIndex + CERTIFICATES_PER_PAGE

  const currentCertificates = certificates.slice(startIndex, endIndex)

  return (
    <section id="certificates" className="py-20 relative overflow-hidden">

      <div className="absolute top-0 right-0 w-96 h-96 bg-accent/10 rounded-full blur-3xl opacity-40 translate-x-1/2 -translate-y-1/2" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-secondary/10 rounded-full blur-3xl opacity-40 -translate-x-1/2 translate-y-1/2" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">

        <div className="mb-16 text-center relative">
          <div className="h-1 w-20 bg-gradient-to-r from-transparent via-accent to-transparent mx-auto mb-6 animate-pulse" />

          <h2 className="text-4xl md:text-5xl font-black mb-4 bg-gradient-to-r from-accent via-secondary to-primary bg-clip-text text-transparent animate-manga-shine">
            Certificaciones
          </h2>

          <p className="text-muted-foreground text-lg max-w-2xl mx-auto mb-2">
            Certificados y reconocimientos de cursos y formación completada
          </p>

          <div className="h-1 w-20 bg-gradient-to-r from-transparent via-secondary to-transparent mx-auto mt-6 animate-pulse" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">

          {currentCertificates.map((certificate) => (
            <CertificateCard
              key={certificate.id}
              certificate={certificate}
            />
          ))}

        </div>

        {totalPages > 1 && (

          <div className="flex items-center justify-center gap-2 pt-8 border-t border-secondary/20">

            <button
              onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
              disabled={currentPage === 1}
              className="px-4 py-2 rounded-lg border border-secondary/30 text-foreground hover:bg-secondary/10 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              Anterior
            </button>

            <div className="flex gap-2">

              {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (

                <button
                  key={page}
                  onClick={() => setCurrentPage(page)}
                  className={`w-10 h-10 rounded-lg font-semibold transition-all duration-300 ${currentPage === page
                      ? 'bg-secondary text-secondary-foreground shadow-lg shadow-secondary/50'
                      : 'border border-secondary/30 text-foreground hover:bg-secondary/10'
                    }`}
                >
                  {page}
                </button>

              ))}

            </div>

            <button
              onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
              disabled={currentPage === totalPages}
              className="px-4 py-2 rounded-lg border border-secondary/30 text-foreground hover:bg-secondary/10 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              Siguiente
            </button>

          </div>

        )}

        <div className="text-center mt-8 text-sm text-muted-foreground">
          Mostrando {startIndex + 1} - {Math.min(endIndex, certificates.length)} de {certificates.length} certificados
        </div>

      </div>

    </section>
  )
}

function CertificateCard({ certificate }: { certificate: Certificate }) {

  return (

    <Link
      href={`/certificates/${certificate.id}`}
      className="group h-full rounded-xl border-2 border-secondary/30 overflow-hidden bg-card hover:border-accent/70 transition-all duration-300 hover:shadow-2xl hover:shadow-accent/40 hover:-translate-y-2 flex flex-col relative animate-manga-scale-in hover:bg-gradient-to-br hover:from-secondary/5 hover:to-accent/5"
    >

      <div className="relative h-40 overflow-hidden bg-muted">

        <Image
          src={certificate.certificateImage}
          alt={certificate.title}
          fill
          className="object-cover group-hover:scale-125 transition-transform duration-500"
        />

        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

        <div className="absolute top-3 right-3 p-2 rounded-lg bg-gradient-to-br from-secondary/90 to-accent/80 backdrop-blur-sm border border-secondary/50 group-hover:border-accent/70 transition-all group-hover:scale-110">

          <Award className="w-5 h-5 text-white" />

        </div>

      </div>

      <div className="p-6 flex-1 flex flex-col gap-3 relative z-20">

        <div className="inline-flex w-fit px-3 py-1 rounded-full bg-gradient-to-r from-secondary/20 to-accent/20 border-2 border-secondary/40 text-secondary text-xs font-bold">
          {certificate.year}
        </div>

        <h3 className="text-lg font-bold bg-gradient-to-r from-foreground to-secondary bg-clip-text text-transparent leading-tight">
          {certificate.title}
        </h3>

        <p className="text-sm text-muted-foreground flex-1">
          {certificate.organization}
        </p>

        <div className="flex items-center gap-2 text-secondary font-semibold text-sm border-t border-secondary/20 pt-3">

          Ver Certificado

          <ExternalLink className="w-4 h-4" />

        </div>

      </div>

    </Link>

  )
}
