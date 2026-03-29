/**
 * COMPONENTE: CertificatesGrid
 * 
 * ¿QUÉ HACE?
 * Muestra una grilla de certificados con paginación automática.
 * Cada certificado muestra: imagen, título, organización, año y enlace.
 * 
 * ¿DÓNDE ESTÁN LOS DATOS?
 * Los datos de certificados están en 'certificatesData' (línea 17)
 * - Ubicación: components/CertificatesGrid.tsx
 * - Estructura: Array de objetos con id, title, organization, year, certificateLink, certificateImage
 * 
 * ¿CÓMO AGREGAR UN NUEVO CERTIFICADO?
 * 1. Busca 'const certificatesData: Certificate[] = [' en este archivo
 * 2. Agrega un nuevo objeto al final:
 *    {
 *      id: 11,
 *      title: "Nombre del Certificado",
 *      organization: "Nombre de la Organización",
 *      year: 2024,
 *      certificateLink: "https://link-al-certificado.com",
 *      certificateImage: "https://url-de-imagen.com"
 *    }
 * 3. El certificado aparecerá automáticamente
 * 
 * ¿QUÉ SUCEDE AL HACER CLIC EN UN CERTIFICADO?
 * Ahora lleva a una página dinámica (/certificates/[id])
 * que muestra la imagen ampliada y toda la información del certificado.
 */

'use client'

import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { ExternalLink, Award } from 'lucide-react'

// Interfaz que define la estructura de cada certificado
interface Certificate {
  id: number
  title: string
  organization: string
  year: number
  certificateLink: string
  certificateImage: string
}

const certificatesData: Certificate[] = [
  { id: 1, title: "Software Engineering Degree", organization: "Universidad Tecnológica del Perú (UTP)", year: 2025, certificateLink: "https://example.com/certificates/degree", certificateImage: "https://images.unsplash.com/photo-1553531088-a89dbb8416f7?w=500&h=300&fit=crop" },
  { id: 2, title: "Java Spring Boot Master", organization: "Udemy", year: 2023, certificateLink: "https://example.com/certificates/spring", certificateImage: "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=500&h=300&fit=crop" },
  { id: 3, title: "React Advanced Concepts", organization: "Coursera", year: 2024, certificateLink: "https://example.com/certificates/react", certificateImage: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=500&h=300&fit=crop" },
  { id: 4, title: "Docker & Kubernetes", organization: "Linux Academy", year: 2023, certificateLink: "https://example.com/certificates/docker", certificateImage: "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=500&h=300&fit=crop" },
  { id: 5, title: "AWS Solutions Architect", organization: "Amazon Web Services", year: 2024, certificateLink: "https://example.com/certificates/aws", certificateImage: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=500&h=300&fit=crop" },
  { id: 6, title: "Google Cloud Professional", organization: "Google Cloud", year: 2023, certificateLink: "https://example.com/certificates/gcp", certificateImage: "https://images.unsplash.com/photo-1581092918056-0c4c3acd3789?w=500&h=300&fit=crop" },
  { id: 7, title: "Git & GitHub Mastery", organization: "Pluralsight", year: 2022, certificateLink: "https://example.com/certificates/git", certificateImage: "https://images.unsplash.com/photo-1611532736579-6b16e2b50449?w=500&h=300&fit=crop" },
  { id: 8, title: "Full Stack Development", organization: "The Complete JavaScript Course", year: 2023, certificateLink: "https://example.com/certificates/fullstack", certificateImage: "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=500&h=300&fit=crop" },
  { id: 9, title: "Database Design & SQL", organization: "DataCamp", year: 2024, certificateLink: "https://example.com/certificates/database", certificateImage: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=500&h=300&fit=crop" },
  { id: 10, title: "Microservices Architecture", organization: "Linux Academy", year: 2024, certificateLink: "https://example.com/certificates/microservices", certificateImage: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=500&h=300&fit=crop" }
]

const CERTIFICATES_PER_PAGE = 9

export function CertificatesGrid() {
  const [currentPage, setCurrentPage] = useState(1)
  const certificates = certificatesData
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
          <h2 className="text-4xl md:text-5xl font-black mb-4 bg-gradient-to-r from-accent via-secondary to-primary bg-clip-text text-transparent animate-manga-shine">Certificaciones</h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto mb-2">Certificados y reconocimientos de cursos y formación completada</p>
          <div className="h-1 w-20 bg-gradient-to-r from-transparent via-secondary to-transparent mx-auto mt-6 animate-pulse" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {currentCertificates.map((certificate) => (
            <CertificateCard key={certificate.id} certificate={certificate} />
          ))}
        </div>

        {totalPages > 1 && (
          <div className="flex items-center justify-center gap-2 pt-8 border-t border-secondary/20">
            <button onClick={() => setCurrentPage(Math.max(1, currentPage - 1))} disabled={currentPage === 1} className="px-4 py-2 rounded-lg border border-secondary/30 text-foreground hover:bg-secondary/10 disabled:opacity-50 disabled:cursor-not-allowed transition-colors">Anterior</button>
            <div className="flex gap-2">
              {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                <button key={page} onClick={() => setCurrentPage(page)} className={`w-10 h-10 rounded-lg font-semibold transition-all duration-300 ${currentPage === page ? 'bg-secondary text-secondary-foreground shadow-lg shadow-secondary/50' : 'border border-secondary/30 text-foreground hover:bg-secondary/10'}`}>{page}</button>
              ))}
            </div>
            <button onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))} disabled={currentPage === totalPages} className="px-4 py-2 rounded-lg border border-secondary/30 text-foreground hover:bg-secondary/10 disabled:opacity-50 disabled:cursor-not-allowed transition-colors">Siguiente</button>
          </div>
        )}

        <div className="text-center mt-8 text-sm text-muted-foreground">Mostrando {startIndex + 1} - {Math.min(endIndex, certificates.length)} de {certificates.length} certificados</div>
      </div>
    </section>
  )
}

function CertificateCard({ certificate }: { certificate: Certificate }) {
  return (
    <Link href={`/certificates/${certificate.id}`} className="group h-full rounded-xl border-2 border-secondary/30 overflow-hidden bg-card hover:border-accent/70 transition-all duration-300 hover:shadow-2xl hover:shadow-accent/40 hover:-translate-y-2 flex flex-col relative animate-manga-scale-in hover:bg-gradient-to-br hover:from-secondary/5 hover:to-accent/5">
      <div className="absolute top-0 right-0 w-16 h-16 bg-gradient-to-bl from-accent/30 to-transparent rounded-bl-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10" />
      <div className="absolute bottom-0 left-0 w-16 h-16 bg-gradient-to-tr from-secondary/30 to-transparent rounded-tr-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10" />

      <div className="relative h-40 overflow-hidden bg-muted">
        <Image src={certificate.certificateImage} alt={certificate.title} fill className="object-cover group-hover:scale-125 transition-transform duration-500" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        <div className="absolute top-3 right-3 p-2 rounded-lg bg-gradient-to-br from-secondary/90 to-accent/80 backdrop-blur-sm border border-secondary/50 group-hover:border-accent/70 transition-all group-hover:scale-110">
          <Award className="w-5 h-5 text-white" />
        </div>
      </div>

      <div className="p-6 flex-1 flex flex-col gap-3 relative z-20">
        <div className="inline-flex w-fit px-3 py-1 rounded-full bg-gradient-to-r from-secondary/20 to-accent/20 border-2 border-secondary/40 text-secondary text-xs font-bold group-hover:border-accent/70 group-hover:text-accent transition-all">{certificate.year}</div>
        <h3 className="text-lg font-bold bg-gradient-to-r from-foreground to-secondary bg-clip-text text-transparent group-hover:from-accent group-hover:via-secondary group-hover:to-primary transition-all leading-tight">{certificate.title}</h3>
        <p className="text-sm text-muted-foreground flex-1 group-hover:text-foreground transition-colors">{certificate.organization}</p>
        <div className="flex items-center gap-2 text-secondary font-semibold text-sm group-hover:text-accent group-hover:translate-x-1 transition-all duration-300 border-t border-secondary/20 pt-3">Ver Certificado<ExternalLink className="w-4 h-4" /></div>
      </div>
    </Link>
  )
}
