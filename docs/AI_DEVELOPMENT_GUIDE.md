# Protocolo y Guía de Desarrollo para Agentes de IA
## Portafolio Profesional — Brandon Alberto Hualpa Butron

> **LECTURA OBLIGATORIA PARA CUALQUIER AGENTE DE IA (Claude, Cursor, Codex, Gemini, Antigravity, etc.) ANTES DE PROPONER O EJECUTAR CUALQUIER MODIFICACIÓN EN EL CÓDIGO FUENTE.**

---

## 1. El Decálogo Mandatorio del Agente (Reglas de Oro)

1. **Lectura Previa Obligatoria**: Antes de modificar una sola línea de código, lee `docs/PROJECT_ARCHITECTURE.md`, `docs/COMPONENT_MAP.md` y `docs/DATA_FLOW.md`.
2. **Inspección de la Realidad del Código**: Comprueba el código fuente real antes de proponer cambios. No asumas librerías, endpoints o comportamientos basados únicamente en nombres de archivos.
3. **Respeto a la Arquitectura Existente**: La aplicación utiliza Next.js 16 App Router con Turbopack y un diseño monolítico de estudio por vistas (`app/page.tsx`). No intentes desmantelar esta estructura.
4. **Cero Cambios Tecnológicos no Autorizados**: No migres a React Router, no instales Axios (se usa `fetch` nativo), no agregues Redux o Zustand (se usa estado React nativo) y no introduzcas frameworks CSS alternativos.
5. **Cero Dependencias Innecesarias**: No instales paquetes npm para tareas que puedan resolverse con utilidades estándar de React, TypeScript o Tailwind.
6. **Inmutabilidad del Diseño Visual**: No alteres tipografías, paletas de colores, márgenes, bordes, animaciones o estilos de "Precision Backend Studio" a menos que el usuario lo solicite explícitamente en su prompt.
7. **Prohibición de Refactorizaciones Oportunistas**: Si el usuario te pide corregir un texto o mover un botón, modifica **únicamente** ese elemento. No aproveches para "limpiar" o reorganizar componentes adyacentes.
8. **Compatibilidad Estricta de Componentes**: Mantén los contratos de tipos de Props. Si modificas un componente compartido (`CertificatePreview`, `Sidebar`, `DocumentModal`), verifica todos los lugares donde se importa.
9. **No Duplicar Funcionalidades**: Reutiliza las primitivas y componentes existentes en `components/` y `components/ui/` en lugar de crear nuevas versiones paralelas.
10. **Actualización Obligatoria de Documentación**: Si un cambio altera la estructura de datos o añade un componente clave, actualiza los documentos en `docs/`.
11. **Verificación Continua de Compilación**: Todo ciclo de trabajo debe culminar ejecutando `npx tsc --noEmit` y verificando que el código compila con 0 errores de TypeScript.
12. **Cero Suposiciones e Invenciones**: No agregues endpoints de backend, APIs simuladas ni conexiones a bases de datos que no existan.

---

## 2. Mapa Rápido: ¿Qué Archivo Consultar según la Tarea?

| Si la tarea del usuario trata sobre... | Archivos que DEBES consultar primero |
| :--- | :--- |
| **Agregar, mover o editar un Proyecto** | `data/projects.json`, `components/ProjectsGrid.tsx`, `app/projects/[id]/page.tsx` |
| **Agregar, mover o editar una Certificación** | `data/certificates.json`, `components/CertificatesGrid.tsx`, `app/certificates/[id]/page.tsx`, `components/CertificatePreview.tsx` |
| **Grados académicos, Bachiller o Título** | `data/titulos-academicos.json`, `components/AcademicDegrees.tsx`, `components/Education.tsx` |
| **Habilidades técnicas o Categorías del Stack** | `data/skills.json`, `components/Skills.tsx`, `components/GitHub3DCube.tsx` |
| **Navegación, Menú Lateral o Atajos (1–6)** | `components/Sidebar.tsx`, `app/page.tsx` (`WORKSPACE_NAV_ITEMS`, `HASH_TO_VIEW`) |
| **Documentos, Visor PDF o Modal del CV** | `components/DocumentModal.tsx`, `components/CvQuickButton.tsx`, `lib/cv-document.ts` |
| **Estilos globales, Colores o Tokens de Tema** | `app/globals.css`, `components/theme-provider.tsx` |

---

## 3. Convenciones de Programación y Estilo

### 3.1. Estética "Precision Backend Studio"
* **Bordes y Chasis**: Utiliza siempre bordes sutiles `border border-border hover:border-primary/40` con fondos `bg-card` o `bg-muted/30`.
* **Tipografía Técnica**: Emplea `font-mono` para números de ID, años, comandos, atajos de teclado y rutas (`tabular-nums` para que los números mantengan ancho fijo).
* **Etiquetas de Estado**: Usa combinaciones concéntricas como `px-2 py-0.5 rounded-md bg-background/90 border border-border text-xs font-mono`.

### 3.2. Ordenamiento de Datos por `"id"`
Si agregas o modificas registros en `data/projects.json` o `data/certificates.json`:
1. Asegúrate de asignar un `"id"` entero correlativo.
2. Comprueba que el componente que los consume aplique `.sort((a, b) => a.id - b.id)`.
3. Nunca asumas que el primer elemento del JSON es el que se mostrará primero: **el orden depende estrictamente del valor de `id`**.

### 3.3. Manejo de PDFs y Previsualizaciones
* Si agregas un PDF nuevo, colócalo en `public/documentos-pdf/certificados/`.
* Si no tiene imagen estática, deja `"certificateImage": ""` en el JSON.
* El componente `CertificatePreview.tsx` detectará automáticamente la ausencia de imagen y procesará la primera página del PDF en un `<canvas>` vía `pdfjs-dist`.

---

## 4. Comandos de Verificación para Agentes

Antes de dar por completada cualquier tarea, ejecuta en la terminal:

```bash
# Paso 1: Verificación estricta de TypeScript
npx tsc --noEmit

# Paso 2: Verificación de compilación en producción (Turbopack)
npm run build
```

> [!IMPORTANT]
> Si `npx tsc --noEmit` reporta algún error de tipado, resuélvelo antes de responder al usuario. Nunca ignores un error de compilación.

