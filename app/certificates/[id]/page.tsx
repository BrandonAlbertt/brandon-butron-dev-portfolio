/*
====================================================
EXPLICACIÓN GENERAL DEL ARCHIVO (Next.js + TypeScript)
====================================================

Este archivo crea una página dinámica en Next.js que muestra
los detalles de un certificado específico.

Las rutas funcionan así:

/certificates/1
/certificates/2
/certificates/3

El número corresponde al "id" de un certificado guardado en:

/data/certificates.json

----------------------------------------------------
1. IMPORTACIONES
----------------------------------------------------

Se importan herramientas necesarias para la página:

import Image from 'next/image'
import Link from 'next/link'
import certificatesData from '@/data/certificates.json'

Image
Muestra imágenes optimizadas en Next.js.

Link
Permite navegar entre páginas sin recargar el sitio.

certificatesData
Importa todos los certificados desde el archivo JSON.


----------------------------------------------------
2. INTERFACE (TypeScript)
----------------------------------------------------

interface Certificate {
  id: number
  title: string
  organization: string
  year: number
  certificateLink: string
  certificateImage: string
}

Define la estructura que debe tener cada certificado.
TypeScript usa esto para evitar errores y validar datos.


----------------------------------------------------
3. OBTENER EL ID DE LA URL
----------------------------------------------------

export default function CertificatePage({ params })

Next.js envía automáticamente el parámetro de la URL.

Ejemplo:
/certificates/3

const { id } = use(params)
const certificateId = parseInt(id)

Se obtiene el id de la URL y se convierte a número.


----------------------------------------------------
4. BUSCAR EL CERTIFICADO EN EL JSON
----------------------------------------------------

const certificates: Certificate[] = certificatesData

const certificate = certificates.find(
  c => c.id === certificateId
)

Se busca dentro del JSON el certificado que tenga
el mismo id que el de la URL.


----------------------------------------------------
5. MANEJO DE ERROR
----------------------------------------------------

if (!certificate) {
  return <h1>Certificado no encontrado</h1>
}

Si el id no existe en el JSON se muestra un mensaje
de error.


----------------------------------------------------
6. MOSTRAR LOS DATOS
----------------------------------------------------

Se muestran los datos del certificado:

<Image src={certificate.certificateImage} />

{certificate.title}
{certificate.organization}
{certificate.year}

También se incluye un botón para ver el certificado:

<a href={certificate.certificateLink}>


----------------------------------------------------
7. MOSTRAR OTROS CERTIFICADOS
----------------------------------------------------

certificates
  .filter(c => c.id !== certificate.id)
  .slice(0,3)

Esto hace que se muestren solo 3 certificados
diferentes al actual para seguir navegando.


----------------------------------------------------
RESUMEN
----------------------------------------------------

1. El usuario entra a:
/certificates/{id}

2. Next.js obtiene el id de la URL

3. Se busca el certificado en certificates.json

4. Se muestran sus datos en la página

5. También se muestran otros certificados relacionados

Para agregar nuevos certificados solo se edita:

/data/certificates.json
====================================================
*/
'use client'

import Image from 'next/image'
import Link from 'next/link'
import { ArrowLeft, Award, Calendar, Building2 } from 'lucide-react'
import { use } from 'react'

import certificatesData from '@/data/certificates.json'

interface Certificate {
  id: number
  title: string
  organization: string
  year: number
  certificateLink: string
  certificateImage: string
}

export default function CertificatePage({ params }: { params: Promise<{ id: string }> }) {

  const { id } = use(params)

  const certificateId = parseInt(id)

  // usamos el JSON
  const certificates: Certificate[] = certificatesData

  const certificate = certificates.find(c => c.id === certificateId)

  if (!certificate) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-foreground mb-4">
            Certificado no encontrado
          </h1>

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
        <Link
          href="/#certificates"
          className="inline-flex items-center gap-2 text-primary hover:text-accent mb-8 transition-colors"
        >
          <ArrowLeft className="w-5 h-5" />
          <span>Volver a Certificados</span>
        </Link>

        {/* Certificate Container */}
        <div className="rounded-2xl border-2 border-accent/30 overflow-hidden bg-card hover:border-secondary/70 transition-all duration-300 hover:shadow-2xl hover:shadow-secondary/40">

          {/* Image */}
          <div className="relative w-full h-[300px] md:h-[500px] lg:h-[600px] bg-black/20">

            <Image
              src={certificate.certificateImage}
              alt={certificate.title}
              fill
              className="object-contain"
            />

            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />

            <div className="absolute top-6 right-6 p-3 rounded-lg bg-gradient-to-br from-secondary/90 to-accent/80 border border-secondary/50">
              <Award className="w-6 h-6 text-white" />
            </div>

          </div>

          {/* Content */}
          <div className="p-12">

            {/* Year */}
            <div className="inline-flex px-4 py-2 rounded-full bg-gradient-to-r from-secondary/20 to-accent/20 border-2 border-secondary/40 text-secondary font-bold mb-6">
              <Calendar className="w-4 h-4 mr-2" />
              {certificate.year}
            </div>

            {/* Title */}
            <h1 className="text-4xl md:text-5xl font-black mb-4">
              {certificate.title}
            </h1>

            {/* Organization */}
            <div className="flex items-center gap-3 mb-8 text-lg text-muted-foreground">
              <Building2 className="w-5 h-5 text-accent" />
              <span className="text-xl font-semibold">
                {certificate.organization}
              </span>
            </div>

            {/* Buttons */}
            <div className="flex flex-col sm:flex-row gap-4">

              <a
                href={certificate.certificateLink}
                target="_blank"
                rel="noopener noreferrer"
                className="px-8 py-3 rounded-lg bg-gradient-to-r from-primary to-secondary text-primary-foreground font-bold hover:shadow-lg transition-all"
              >
                Ver Certificado Original
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

        {/* Otros certificados */}
        <div className="mt-20">

          <h2 className="text-2xl md:text-3xl font-bold mb-8">
            Otros Certificados
          </h2>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">

            {certificates
              .filter(c => c.id !== certificate.id)
              .slice(0, 3)
              .map(cert => (

                <Link
                  key={cert.id}
                  href={`/certificates/${cert.id}`}
                  className="group rounded-xl border-2 border-accent/30 overflow-hidden bg-card hover:border-secondary/70 transition-all duration-300 hover:shadow-xl hover:-translate-y-1"
                >

                  <div className="relative h-40">

                    <Image
                      src={cert.certificateImage}
                      alt={cert.title}
                      fill
                      className="object-cover group-hover:scale-110 transition-transform duration-300"
                    />

                  </div>

                  <div className="p-4">

                    <h3 className="text-sm font-bold mb-2">
                      {cert.title}
                    </h3>

                    <p className="text-xs text-muted-foreground">
                      {cert.organization}
                    </p>

                    <p className="text-xs text-secondary font-semibold mt-2">
                      {cert.year}
                    </p>

                  </div>

                </Link>

              ))}

          </div>

        </div>

      </div>

    </main>
  )
}
