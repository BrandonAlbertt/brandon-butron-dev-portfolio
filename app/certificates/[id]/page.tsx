'use client'

import Image from 'next/image'
import Link from 'next/link'
import { ArrowLeft, Award, Calendar, Building2 } from 'lucide-react'
import { use } from 'react'

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

export default function CertificatePage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params)
  const certificateId = parseInt(id)
  const certificate = certificatesData.find(c => c.id === certificateId)

  if (!certificate) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-foreground mb-4">Certificado no encontrado</h1>
          <Link href="/" className="text-primary hover:underline">
            Volver al inicio
          </Link>
        </div>
      </div>
    )
  }

  return (
    <main className="min-h-screen bg-background py-20">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Back Button */}
        <Link href="/#certificates" className="inline-flex items-center gap-2 text-primary hover:text-accent mb-8 transition-colors">
          <ArrowLeft className="w-5 h-5" />
          <span>Volver a Certificados</span>
        </Link>

        {/* Certificate Container */}
        <div className="rounded-2xl border-2 border-accent/30 overflow-hidden bg-card hover:border-secondary/70 transition-all duration-300 hover:shadow-2xl hover:shadow-secondary/40 hover:bg-gradient-to-br hover:from-primary/5 hover:to-accent/5">
          {/* Header with Manga Effects */}
          <div className="relative">
            <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-bl from-secondary/20 to-transparent rounded-bl-3xl opacity-40" />
            <div className="absolute bottom-0 left-0 w-20 h-20 bg-gradient-to-tr from-primary/20 to-transparent rounded-tr-3xl opacity-40" />

            {/* Certificate Image */}
            <div className="relative w-full h-96">
              <Image
                src={certificate.certificateImage}
                alt={certificate.title}
                fill
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
              
              {/* Award Icon */}
              <div className="absolute top-6 right-6 p-3 rounded-lg bg-gradient-to-br from-secondary/90 to-accent/80 border border-secondary/50">
                <Award className="w-6 h-6 text-white" />
              </div>
            </div>
          </div>

          {/* Content */}
          <div className="p-12 relative z-10">
            {/* Year Badge */}
            <div className="inline-flex px-4 py-2 rounded-full bg-gradient-to-r from-secondary/20 to-accent/20 border-2 border-secondary/40 text-secondary font-bold mb-6">
              <Calendar className="w-4 h-4 mr-2" />
              {certificate.year}
            </div>

            {/* Title */}
            <h1 className="text-4xl md:text-5xl font-black bg-gradient-to-r from-primary via-accent to-secondary bg-clip-text text-transparent mb-4">
              {certificate.title}
            </h1>

            {/* Organization */}
            <div className="flex items-center gap-3 mb-8 text-lg text-muted-foreground">
              <Building2 className="w-5 h-5 text-accent" />
              <span className="text-xl font-semibold">{certificate.organization}</span>
            </div>

            {/* Divider */}
            <div className="h-1 w-32 bg-gradient-to-r from-primary via-secondary to-accent rounded-full mb-8" />

            {/* View Certificate Button */}
            <div className="flex flex-col sm:flex-row gap-4">
              <a
                href={certificate.certificateLink}
                target="_blank"
                rel="noopener noreferrer"
                className="px-8 py-3 rounded-lg bg-gradient-to-r from-primary to-secondary text-primary-foreground font-bold hover:shadow-lg hover:shadow-primary/50 transition-all flex items-center justify-center gap-2"
              >
                <span>Ver Certificado Original</span>
              </a>
              <Link
                href="/#certificates"
                className="px-8 py-3 rounded-lg border-2 border-primary text-primary font-semibold hover:bg-primary/10 transition-all"
              >
                Volver a Certificados
              </Link>
            </div>
          </div>
        </div>

        {/* Related Certificates Section */}
        <div className="mt-20">
          <h2 className="text-2xl md:text-3xl font-bold mb-8">Otros Certificados</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {certificatesData
              .filter(c => c.id !== certificate.id)
              .slice(0, 3)
              .map(cert => (
                <Link
                  key={cert.id}
                  href={`/certificates/${cert.id}`}
                  className="group rounded-xl border-2 border-accent/30 overflow-hidden bg-card hover:border-secondary/70 transition-all duration-300 hover:shadow-xl hover:shadow-secondary/30 hover:-translate-y-1"
                >
                  <div className="relative h-40 overflow-hidden bg-muted">
                    <Image
                      src={cert.certificateImage}
                      alt={cert.title}
                      fill
                      className="object-cover group-hover:scale-110 transition-transform duration-300"
                    />
                  </div>
                  <div className="p-4">
                    <h3 className="text-sm font-bold text-foreground group-hover:text-accent transition-colors mb-2">
                      {cert.title}
                    </h3>
                    <p className="text-xs text-muted-foreground">{cert.organization}</p>
                    <p className="text-xs text-secondary font-semibold mt-2">{cert.year}</p>
                  </div>
                </Link>
              ))}
          </div>
        </div>
      </div>
    </main>
  )
}
