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
import './globals.css'

// Importar fuente Geist desde Google Fonts
const _geist = Geist({ subsets: ["latin"] });
const _geistMono = Geist_Mono({ subsets: ["latin"] });

// Metadatos de la página (SEO - aparece en Google, redes sociales, etc.)
export const metadata: Metadata = {
  title: 'Brandon Alberto Hualpa Butron - Software Engineer',
  description: 'Professional portfolio of a Software Engineering graduate focused on backend development, APIs, and scalable systems.',
  generator: 'v0.app',
  icons: {
    icon: [
      {
        url: '/icon-light-32x32.png',
        media: '(prefers-color-scheme: light)',
      },
      {
        url: '/icon-dark-32x32.png',
        media: '(prefers-color-scheme: dark)',
      },
      {
        url: '/icon.svg',
        type: 'image/svg+xml',
      },
    ],
    apple: '/apple-icon.png',
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
    // HTML raíz con soporte para dark mode
    <html lang="en" suppressHydrationWarning>
      {/* Body con fuente global y antialiasing para mejor renderizado */}
      <body className="font-sans antialiased">
        {/* 
          ThemeProvider permite cambiar entre dark/light mode
          - attribute="class" = usa la clase 'dark' en el elemento HTML
          - defaultTheme="dark" = tema oscuro por defecto
          - enableSystem = respeta preferencias del sistema operativo del usuario
        */}
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem>
          {/* Aquí se renderiza el contenido de cada página */}
          {children}
        </ThemeProvider>
        
        {/* Analytics de Vercel para rastrear visitantes */}
        <Analytics />
      </body>
    </html>
  )
}
