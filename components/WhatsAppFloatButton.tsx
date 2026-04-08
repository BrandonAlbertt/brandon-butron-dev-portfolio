/**
 * ARCHIVO: components/WhatsAppFloatButton.tsx
 * 
 * ¿QUÉ ES ESTE COMPONENTE?
 * Un botón flotante de WhatsApp que aparece fijo en la esquina inferior derecha.
 * Permite a los visitantes contactarte directamente por WhatsApp con un mensaje precargado.
 * 
 * ¿CÓMO FUNCIONA?
 * - Usa el enlace wa.me para abrir WhatsApp Web o la app móvil
 * - El mensaje viene precargado y listo para enviar
 * - Se abre en una nueva pestaña
 * 
 * PERSONALIZACIÓN RÁPIDA:
 * - Número de WhatsApp: Línea 35 (WHATSAPP_NUMBER)
 * - Mensaje automático: Línea 38 (WHATSAPP_MESSAGE)
 * - Posición del botón: Línea 56 (bottom-6 right-6)
 * - Tamaño del botón: Línea 56 (w-14 h-14)
 * - Color del botón: Línea 58 (bg-[#25D366])
 */

'use client'

import { MessageCircle } from 'lucide-react'

export function WhatsAppFloatButton() {
    // ============================================
    // CONFIGURACIÓN - EDITAR AQUÍ
    // ============================================

    /**
     * NÚMERO DE WHATSAPP
     * Formato: código de país + número sin espacios ni guiones
     * Ejemplo Perú: 51999999999 (51 = código de Perú)
     * Ejemplo México: 521234567890 (52 = código de México)
     */
    const WHATSAPP_NUMBER = '51924516682'

    /**
     * MENSAJE AUTOMÁTICO
     * Este texto aparecerá precargado cuando el visitante abra WhatsApp.
     * Puedes usar %20 para espacios o simplemente escribir el texto normal.
     */
    const WHATSAPP_MESSAGE = 'Hola Brandon, vi tu portafolio y me gustaría contactarte'

    // ============================================
    // FIN DE CONFIGURACIÓN
    // ============================================

    // Construir el enlace de WhatsApp
    const whatsappUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(WHATSAPP_MESSAGE)}`

    return (
        /**
         * POSICIÓN DEL BOTÓN
         * - bottom-6 = 1.5rem desde abajo (cambiar número para subir/bajar)
         * - right-6 = 1.5rem desde la derecha (cambiar número para mover horizontalmente)
         * - Para mover a la izquierda: cambiar "right-6" por "left-6"
         * 
         * TAMAÑO DEL BOTÓN
         * - w-14 h-14 = 3.5rem (56px) de ancho y alto
         * - Para más grande: w-16 h-16
         * - Para más pequeño: w-12 h-12
         */
        <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Contactar por WhatsApp"
            className="
        fixed bottom-6 right-6 z-50
        w-14 h-14
        flex items-center justify-center
        rounded-full
        bg-[#25D366]
        text-white
        shadow-lg shadow-[#25D366]/30
        hover:bg-[#20BD5A]
        hover:scale-110
        hover:shadow-xl hover:shadow-[#25D366]/40
        active:scale-95
        transition-all duration-300 ease-out
        group
      "
        >
            {/* 
        ICONO DE WHATSAPP
        Usando MessageCircle de Lucide como alternativa limpia.
        Tamaño: w-7 h-7 (1.75rem)
      */}
            <svg
                viewBox="0 0 24 24"
                className="w-7 h-7 fill-current group-hover:scale-105 transition-transform"
                aria-hidden="true"
            >
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
            </svg>

            {/* 
        EFECTO DE PULSO (ANIMACIÓN)
        Círculo que se expande detrás del botón para llamar la atención.
        Para desactivar: eliminar este div completo.
      */}
            <span className="absolute inset-0 rounded-full bg-[#25D366] animate-ping opacity-20 pointer-events-none" />
        </a>
    )
}
