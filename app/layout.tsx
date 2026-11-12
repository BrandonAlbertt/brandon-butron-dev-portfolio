/**
 * ARCHIVO: app/layout.tsx
 * 
 * ¿QUÉ ES ESTE ARCHIVO?
 * Este es el layout raíz de Next.js. Se aplica a TODAS las páginas del sitio.
 * 
 * ¿QUÉ HACE?
 * - Define la estructura HTML base (html, body)
 * - Importa estilos globales (globals.css)
 * - Configura las fuentes (Geist - fuente principal)
 * - Configura el proveedor de tema (dark/light mode)
 * - Agrega Analytics de Vercel para seguimiento
 * 
 * ¿CÓMO CAMBIAR METADATOS (SEO)?
 * Edita la sección 'metadata' abajo:
 * - title: Título que aparece en la pestaña del navegador y en Google
 * - description: Descripción que aparece en resultados de búsqueda
 * 
 * ¿CÓMO ACTIVAR/DESACTIVAR DARK MODE?
 * La línea: defaultTheme="dark" establece el tema por defecto
 * Cambia a: defaultTheme="light" para tema claro como defecto
 * 
 * ¿DÓNDE SE IMPORTAN LAS FUENTES?
 * Líneas 2-3: Se importan desde Google Fonts (Geist)
 * Línea 39: Se aplica la fuente a todo el sitio con className="font-sans"
 * 
 * ¿CÓMO CAMBIAR LA FUENTE?
 * 1. Reemplaza "Geist" por otra fuente de Google Fonts
 * 2. Ejemplo: import { Roboto } from 'next/font/google'
 *    const roboto = Roboto({ weight: '400', subsets: ["latin"] })
 * 3. Usa roboto.className en lugar de _geist.className
 * 
 * ESTRUCTURA DE CARPETAS
 * El archivo globals.css está en: app/globals.css
 * El ThemeProvider está en: components/theme-provider.tsx
 */

import type { Metadata } from 'next'
import { Geist, Geist_Mono } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import { ThemeProvider } from '@/components/theme-provider'
import { WhatsAppFloatButton } from '@/components/WhatsAppFloatButton'
import './globals.css'

// Importar fuentes Geist desde Google Fonts y exponerlas como variables CSS
const geistSans = Geist({
  subsets: ['latin'],
  variable: '--font-geist-sans',
})
const geistMono = Geist_Mono({
  subsets: ['latin'],
  variable: '--font-geist-mono',
})

// Metadatos de la página (SEO técnico para Google, OpenGraph y Twitter en español)
export const metadata: Metadata = {
  metadataBase: new URL('https://brandonbutron.dev'),
  title: {
    default: 'Brandon Alberto Hualpa Butron | Bachiller en Ingeniería de Software',
    template: '%s | Brandon Alberto Hualpa Butron',
  },
  description:
    'Portafolio profesional de Brandon Alberto Hualpa Butron, Bachiller en Ingeniería de Software enfocado en desarrollo backend, APIs, desarrollo web full-stack y sistemas escalables.',
  keywords: [
    'Brandon Alberto Hualpa Butron',
    'Brandon Hualpa',
    'Brandon Butron',
    'Bachiller en Ingeniería de Software',
    'Desarrollo Backend',
    'Backend Developer',
    'Full Stack',
    'Next.js',
    'TypeScript',
    'React',
    'Portafolio',
  ],
  authors: [{ name: 'Brandon Alberto Hualpa Butron', url: 'https://brandonbutron.dev' }],
  creator: 'Brandon Alberto Hualpa Butron',
  icons: {
    icon: [
      { url: '/favicon.ico', sizes: 'any' },
      { url: '/icon-96x96.png', sizes: '96x96', type: 'image/png' },
      { url: '/icon-192x192.png', sizes: '192x192', type: 'image/png' },
      { url: '/icon.svg', type: 'image/svg+xml' },
    ],
    apple: [
      { url: '/apple-icon.png', sizes: '180x180', type: 'image/png' },
    ],
  },
  openGraph: {
    type: 'website',
    locale: 'es_PE',
    url: 'https://brandonbutron.dev',
    siteName: 'Brandon Alberto Hualpa Butron — Portafolio',
    title: 'Brandon Alberto Hualpa Butron | Bachiller en Ingeniería de Software',
    description:
      'Portafolio profesional de Brandon Alberto Hualpa Butron, Bachiller en Ingeniería de Software enfocado en desarrollo backend, APIs, desarrollo web full-stack y sistemas escalables.',
    images: [
      {
        url: '/icon-192x192.png',
        width: 192,
        height: 192,
        alt: 'Brandon Alberto Hualpa Butron Monograma',
      },
    ],
  },
  twitter: {
    card: 'summary',
    title: 'Brandon Alberto Hualpa Butron | Bachiller en Ingeniería de Software',
    description:
      'Portafolio profesional de Brandon Alberto Hualpa Butron, Bachiller en Ingeniería de Software enfocado en desarrollo backend, APIs, desarrollo web full-stack y sistemas escalables.',
    images: ['/icon-192x192.png'],
  },
}

/**
 * COMPONENTE RAÍZ
 * ===============
 * Este es el layout que envuelve TODAS las páginas del sitio.
 * Cualquier código aquí se ejecuta en todas las páginas.
 */
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html
      lang="es"
      className={`${geistSans.variable} ${geistMono.variable}`}
      suppressHydrationWarning
    >
      <body className="font-sans antialiased bg-background text-foreground selection:bg-primary/20 selection:text-foreground">
        {/*
          ThemeProvider permite cambiar entre dark/light mode
          - attribute="class" = usa la clase 'dark' en el elemento HTML
          - defaultTheme="dark" = tema oscuro por defecto
        */}
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem={false}>
          {children}

          {/* Botón flotante de WhatsApp - visible en todas las páginas */}
          <WhatsAppFloatButton />
        </ThemeProvider>

        {/* Analytics de Vercel para rastrear visitantes */}
        <Analytics />
      </body>
    </html>
  )
}
