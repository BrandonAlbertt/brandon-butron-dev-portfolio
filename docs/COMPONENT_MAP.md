# Mapa Detallado de Componentes
## Portafolio Profesional — Brandon Alberto Hualpa Butron

Este documento detalla la responsabilidad técnica, relaciones de importación, interfaces de propiedades (Props), hooks de estado y ciclo de vida de cada componente del sistema.

---

## 1. Tabla Resumen de Componentes Principales

| Componente | Ruta de Archivo | Modo de Renderizado | Estado / Hooks Clave | Componente Padre / Consumidor |
| :--- | :--- | :--- | :--- | :--- |
| **RootLayout** | `app/layout.tsx` | Server Component | `Geist`, `Geist_Mono` | Next.js Engine (Raíz) |
| **Home** | `app/page.tsx` | Client Component (`'use client'`) | `useState`, `useEffect`, `useCallback` | Next.js Engine (`/`) |
| **ProjectPage** | `app/projects/[id]/page.tsx` | Client Component (`'use client'`) | `use(params)`, `useState`, `useEffect`, `useRouter` | Next.js Engine (`/projects/[id]`) |
| **CertificatePage** | `app/certificates/[id]/page.tsx` | Client Component (`'use client'`) | `use(params)`, `useState`, `useEffect`, `useRouter` | Next.js Engine (`/certificates/[id]`) |
| **Sidebar** | `components/Sidebar.tsx` | Client Component (`'use client'`) | `useTheme`, `useState`, `useEffect` | `app/page.tsx`, `ProjectPage`, `CertificatePage` |
| **Hero** | `components/Hero.tsx` | Client Component (`'use client'`) | `useState` | `app/page.tsx` (Vista overview) |
| **Hero3DDesk** | `components/Hero3DDesk.tsx` | Client Component (`'use client'`) | `useEffect`, `useRef`, `useState` | `components/Hero.tsx` |
| **About** | `components/About.tsx` | Client Component (`'use client'`) | Ninguno (Estático puro) | `app/page.tsx` (Vista about) |
| **Education** | `components/Education.tsx` | Client Component (`'use client'`) | Ninguno | `app/page.tsx` (Vista about) |
| **AcademicDegrees** | `components/AcademicDegrees.tsx` | Client Component (`'use client'`) | `useState` (pestaña activa) | `app/page.tsx` (Vista about) |
| **Skills** | `components/Skills.tsx` | Client Component (`'use client'`) | `useState` (categoría seleccionada) | `app/page.tsx` (Vista skills) |
| **GitHub3DCube** | `components/GitHub3DCube.tsx` | Client Component (`'use client'`) | `useRef`, `useState`, `useEffect` | `app/page.tsx` (Vista skills) |
| **ProjectsGrid** | `components/ProjectsGrid.tsx` | Client Component (`'use client'`) | `useState` (paginación) | `app/page.tsx` (Vista projects) |
| **CertificatesGrid** | `components/CertificatesGrid.tsx` | Client Component (`'use client'`) | `useState` (paginación) | `app/page.tsx` (Vista certificates) |
| **CertificatePreview** | `components/CertificatePreview.tsx` | Client Component (`'use client'`) | `useState`, `useEffect` (pdfjs-dist worker) | `CertificatesGrid.tsx`, `CertificatePage` |
| **CvQuickButton** | `components/CvQuickButton.tsx` | Client Component (`'use client'`) | `useState` (modal abierto) | `app/page.tsx`, `ProjectPage`, `CertificatePage` |
| **DocumentModal** | `components/DocumentModal.tsx` | Client Component (`'use client'`) | `useState`, `useEffect`, `createPortal` | `CvQuickButton.tsx`, `app/page.tsx`, `AcademicDegrees.tsx` |
| **Contact** | `components/Contact.tsx` | Client Component (`'use client'`) | `useState` (campos de formulario) | `app/page.tsx` (Vista contact) |
| **Footer** | `components/Footer.tsx` | Client Component (`'use client'`) | Ninguno | `app/page.tsx` (Vista contact) |
| **WhatsAppFloatButton**| `components/WhatsAppFloatButton.tsx`| Client Component (`'use client'`) | `useState`, `useEffect` (visibilidad por scroll) | `app/layout.tsx` (Global) |

---

## 2. Ficha Técnica Individual por Componente

### 2.1. `app/page.tsx` (Studio View Controller)
* **Responsabilidad:** Orquestador central de la aplicación. Mapea la interacción del usuario entre 6 vistas dinámicas (`overview`, `about`, `skills`, `projects`, `certificates`, `contact`) mediante sincronización bidireccional entre la URL (`window.location.hash`), eventos de teclado (`1–6`) y atajos del menú lateral.
* **Imports Clave:** `Sidebar`, `Hero`, `About`, `CurrentGoals`, `Skills`, `ProjectsGrid`, `GitHub3DCube`, `CertificatesGrid`, `AcademicDegrees`, `Education`, `Contact`, `Footer`, `DocumentModal`, `CvQuickButton`.
* **Hooks Utilizados:**
  - `useState<WorkspaceView>('overview')`: Control de la vista activa en pantalla.
  - `useState<boolean>(false)`: Control de visibilidad del modal de CV.
  - `useCallback`: Memorización de las funciones de navegación y scroll compensatorio.
  - `useEffect`: Suscripción a eventos `hashchange` y `keydown` (atajos numéricos `1..6`).

---

### 2.2. `components/Sidebar.tsx`
* **Responsabilidad:** Navegación persistente. En pantallas de escritorio (`lg:`) se muestra como un sidebar lateral fijo de 64 columnas (`w-64`) con el avatar, badges de estado, enlaces de navegación con atajos numéricos, selector de tema dark/light y redes sociales. En dispositivos móviles se adapta como un header compacto con menú desplegable.
* **Props:**
  ```typescript
  interface SidebarProps {
    activeView?: WorkspaceView
    onSelectView?: (view: WorkspaceView) => void
  }
  ```
* **Hooks:** `useTheme()` de `next-themes` para alternar la clase `.dark`, `useState` para el menú móvil.

---

### 2.3. `components/CertificatePreview.tsx`
* **Responsabilidad:** Componente de renderizado híbrido para certificaciones.
  - Si el certificado cuenta con imagen (`hasValidCertificateImage`), renderiza `next/image`.
  - Si el certificado carece de imagen estática pero tiene PDF (`hasValidCertificateLink`), importa dinámicamente el worker de `pdfjs-dist`, obtiene la página 1 (`pdf.getPage(1)`), la dibuja en un `<canvas>` oculto a escala 1.75 y genera un `dataUrl` WebP cacheado en memoria (`pdfThumbnailsCache`).
  - Renderiza un skeleton técnico pulsante mientras procesa el archivo.
* **Props:**
  ```typescript
  interface CertificatePreviewProps {
    title: string
    certificateImage?: string
    certificateLink?: string
    mode?: 'cover' | 'contain'
    className?: string
    imageClassName?: string
    priority?: boolean
    sizes?: string
  }
  ```
* **Exportaciones auxiliares:** `hasValidCertificateImage(image)` y `hasValidCertificateLink(link)`.

---

### 2.4. `components/CertificatesGrid.tsx`
* **Responsabilidad:** Presentación del catálogo de certificaciones en un grid responsivo de 1 a 3 columnas. Incluye ordenación ascendente estricta por `id`, paginación fija de 6 elementos por página, etiquetas de verificación técnica, chasis concéntrico y botones de inspección/apertura de PDF directo.
* **Datos consumidos:** `data/certificates.json`.
* **Componentes hijos:** `CertificatePreview`, `<Link>` a `/certificates/[id]`.

---

### 2.5. `components/ProjectsGrid.tsx`
* **Responsabilidad:** Presentación del catálogo de proyectos de software en un grid responsivo con soporte de tilt 3D sutil en hover (`handleMouseMove` con cálculo de rotación normalizada). Incluye ordenación ascendente por `id`, paginación de 4 elementos por vista, badges de categoría técnica y enlaces a demo, repositorio y consola de detalle.
* **Datos consumidos:** `data/projects.json`.
* **Componentes hijos:** `<Link>` a `/projects/[id]`.

---

### 2.6. `app/projects/[id]/page.tsx`
* **Responsabilidad:** Consola técnica de detalle de proyecto. Incluye:
  - Top Workspace Bar con migas de pan y paginador correlativo (`Anterior (←)` / `Siguiente (→)`).
  - Consola de medios interactiva de 2 pestañas: reproductor de video de YouTube (`activeMedia === 'video'`) o captura de pantalla de alta resolución (`activeMedia === 'preview'`).
  - Especificaciones de arquitectura: descripción en profundidad, tecnologías utilizadas, enlaces a repositorios y demostraciones en vivo.
  - Módulo inferior de proyectos relacionados.
* **Datos consumidos:** `data/projects.json`.

---

### 2.7. `app/certificates/[id]/page.tsx`
* **Responsabilidad:** Consola técnica de detalle de certificación. Incluye:
  - Visor principal en chasis concéntrico con `CertificatePreview`.
  - Atajos para ampliar a pantalla completa mediante modal Lightbox de alta definición.
  - Tabla de especificaciones técnicas: Entidad emisora, Año de emisión, Formato (`PDF / Certificado Digital` o `Certificado Digital (Imagen)`), Estado verificado.
  - Acciones principales: botones para abrir el PDF original / descargar copia, o botón para ampliar/descargar imagen en caso de certificados basados en WebP.
  - Navegador inferior de otras certificaciones.
* **Datos consumidos:** `data/certificates.json`.

---

### 2.8. `components/AcademicDegrees.tsx`
* **Responsabilidad:** Gestión visual de los grados y títulos universitarios de Brandon Hualpa. Implementa un sistema de pestañas interactivas para alternar entre:
  1. Grado de Bachiller en Ingeniería de Software.
  2. Constancia de Egresado oficial de la UTP.
  3. Título Profesional de Ingeniero de Software (En proceso).
* **Interacciones:** Permite abrir el documento oficial embebido mediante `DocumentModal`.
* **Datos consumidos:** `data/titulos-academicos.json`.

---

### 2.9. `components/GitHub3DCube.tsx`
* **Responsabilidad:** Elemento interactivo 3D que proyecta la experiencia técnica del desarrollador sobre las caras de un cubo en rotación constante.
* **Técnica:** Utiliza `transform-style: preserve-3d` con rotación matemática vinculada a la posición del cursor (`requestAnimationFrame`). Respeta automáticamente la preferencia de accesibilidad del sistema operativo (`prefers-reduced-motion: reduce`), fijando el cubo en una vista estática isométrica elegante.

---

### 2.10. `components/DocumentModal.tsx`
* **Responsabilidad:** Visor universal de documentos técnicos y PDF del portafolio.
* **Técnica:** Se monta mediante `createPortal` en el cuerpo del documento (`document.body`). Si el documento es un PDF, renderiza un `<iframe>` con parámetros técnicos `#toolbar=0&navpanes=0&scrollbar=0&view=FitH`. Si es una imagen, renderiza un visor ampliado con zoom y botón de descarga directa. Incluye controles de pantalla completa y cierre con la tecla `Escape`.

