# 🚀 Portafolio Web Profesional Cyber-Tech 3D
### Brandon Alberto Hualpa Butron — Backend Developer & Software Engineer

Portafolio web interactivo de alto rendimiento desarrollado con **Next.js 16**, **React 19**, **TypeScript** y **Tailwind CSS v4**. Presenta una estética tecnológica **Cyber-Tech 3D** (azul marino profundo, iluminación azul eléctrico, cian y violeta), sistema de doble tema (Dark/Light Mode), escenas tridimensionales interactivas, navegación persistente con ScrollSpy y visor integrado de constancias y certificados de la Universidad Tecnológica del Perú (UTP).

---

## 📋 Requisitos Previos (¿Qué se necesita?)

Antes de instalar y ejecutar el proyecto, asegúrate de tener instalado en tu sistema:

1. **Node.js**: Versión **18.18.0** o superior (se recomienda **Node.js 20 LTS** o superior).
   - Verifica tu versión con: `node -v`
2. **Gestor de paquetes**: `npm` (incluido por defecto con Node.js), `pnpm` o `yarn`.
   - Verifica tu versión con: `npm -v`
3. **Git**: Para clonar el repositorio desde GitHub.
   - Verifica tu versión con: `git -v`
4. **Navegador web moderno**: Chrome, Edge, Firefox, Brave o Safari con soporte para WebGL y CSS 3D Transforms.

---

## 📥 Cómo Descargar y Clonar el Proyecto

### Opción 1: Clonar mediante Git (Recomendado)
Abre tu terminal o consola de comandos y ejecuta:

```bash
git clone https://github.com/BrandonAlbertt/brandon-butron-dev-portfolio.git
cd brandon-butron-dev-portfolio
```

### Opción 2: Descargar como archivo ZIP
1. Ve al repositorio en GitHub: [github.com/BrandonAlbertt/brandon-butron-dev-portfolio](https://github.com/BrandonAlbertt/brandon-butron-dev-portfolio)
2. Haz clic en el botón verde **Code** y selecciona **Download ZIP**.
3. Descomprime el archivo en tu carpeta de preferencia y abre la terminal en esa ubicación.

---

## ⚡ Cómo Instalar y Ejecutar la Aplicación

### 1. Instalar las dependencias
Ejecuta en la raíz del proyecto:
```bash
npm install
```
*(o si usas pnpm: `pnpm install`)*

### 2. Iniciar el servidor de desarrollo
Inicia el entorno de desarrollo con Turbopack:
```bash
npm run dev
```

Una vez que la terminal indique que el servidor está listo, abre tu navegador en:
```
http://localhost:3000
```

### 3. Otros comandos útiles

| Comando | Descripción |
| :--- | :--- |
| `npm run dev` | Inicia el servidor de desarrollo local con recarga rápida (Turbopack). |
| `npx tsc --noEmit` | Valida que no existan errores de tipos en TypeScript. |
| `npm run build` | Genera la compilación optimizada para producción. |
| `npm run start` | Sirve la versión compilada de producción localmente. |
| `npm run lint` | Ejecuta el análisis de código con ESLint. |

---

## 🛠️ Tecnologías Utilizadas y Dónde se Usaron

A continuación se detalla cada tecnología y en qué parte específica del proyecto fue implementada:

| Tecnología | Versión | ¿Dónde y para qué se usó en el proyecto? |
| :--- | :--- | :--- |
| **Next.js** | `16.2.0` | **Núcleo y Enrutamiento**: App Router (`app/layout.tsx`, `app/page.tsx`), rutas dinámicas para detalles de proyectos (`app/projects/[id]`) y certificados (`app/certificates/[id]`), optimización automática de fuentes con `next/font/google` (Geist). |
| **React** | `19.2.4` | **Lógica de Componentes**: Estado reactivo, ciclo de vida (`useState`, `useEffect`, `useRef`), renderizado cliente (`'use client'`) en componentes interactivos y modales. |
| **TypeScript** | `5.7.3` | **Seguridad y Tipado Estático**: Definición de interfaces de datos (`data.d.ts`), contratos de props en componentes y verificación estricta de compilación sin errores. |
| **Tailwind CSS** | `v4.x` | **Estilos y Diseño Cyber-Tech**: Configuración en `app/globals.css`, sistema de tokens de color, breakpoints adaptativos móvil/desktop (`lg:`), efectos de brillo (`glow`), gradientes y regla `@variant dark` para modo oscuro. |
| **next-themes** | `0.4.6` | **Gestión de Temas (Dark / Light)**: Inyección del proveedor en `app/layout.tsx`, alternancia fluida de tema en `components/Sidebar.tsx` y persistencia en `localStorage`. |
| **Three.js** | `0.186.0` | **Escena y Partículas 3D**: Renderizado de partículas de fondo en canvas y soporte gráfico para la escena holográfica del desarrollador en `components/Hero3DDesk.tsx`. |
| **CSS 3D Transforms** | *Nativo* | **Perspectiva Tridimensional Interactiva**: Utilizado en el Cubo 3D de GitHub (`components/GitHub3DCube.tsx`) y en el cubo tecnológico de Sobre Mí (`components/About.tsx`), con rotación interactiva por mouse y touch. |
| **Lucide React** | `0.564.0` | **Iconografía Vectorial**: Iconos temáticos de navegación en `Sidebar.tsx`, tarjetas de habilidades (`Skills.tsx`), botones de contacto, visor PDF y enlaces a redes sociales. |
| **Radix UI** | `1.x` | **Primitivas UI Accesibles**: Modales accesibles (`@radix-ui/react-dialog`), tooltips y componentes base en `components/ui/*`. |
| **Canvas Confetti** | `1.9.4` | **Micro-Interacciones**: Disparo de confeti festivo interactivo al descargar el CV en la sección Hero (`components/Hero.tsx`). |
| **Vercel Analytics** | `1.6.1` | **Métricas y Rendimiento**: Monitoreo de visitantes y rendimiento web en producción dentro de `app/layout.tsx`. |

---

## 📂 Estructura Principal del Proyecto

```
brandon-butron-dev-portfolio/
├── app/                          # Enrutador de Next.js (App Router)
│   ├── globals.css              # Variables CSS de diseño Cyber-Tech y variantes de tema
│   ├── layout.tsx               # Layout raíz (fuentes Geist, ThemeProvider, botón WhatsApp)
│   ├── page.tsx                 # Página principal modular
│   ├── projects/[id]/page.tsx   # Vista de detalle individual de cada proyecto
│   └── certificates/[id]/page.tsx # Vista de detalle individual de cada certificado
├── components/                  # Componentes reutilizables de la interfaz
│   ├── Sidebar.tsx              # Barra lateral fija (Desktop) y Header pegajoso (Móvil)
│   ├── Hero.tsx                 # Hero con títulos, tech pills, contadores y CTA
│   ├── Hero3DDesk.tsx           # Escena gráfica 3D del escritorio de desarrollador
│   ├── About.tsx                # Sobre mí con Cubo 3D holográfico
│   ├── CurrentGoals.tsx         # Banner de disponibilidad Junior / Trainee
│   ├── Skills.tsx               # 9 categorías de habilidades técnicas
│   ├── ProjectsGrid.tsx         # Portafolio "Mis últimos trabajos" con tarjetas y carrusel
│   ├── GitHub3DCube.tsx         # Cubo 3D interactivo con rotación
│   ├── CertificatesGrid.tsx     # Tarjetas de certificados oficiales UTP
│   ├── AcademicDegrees.tsx      # Sección de Grados (Constancia de Egresado UTP)
│   ├── DocumentModal.tsx        # Modal con visor de PDF integrado para documentos oficiales
│   ├── Education.tsx            # Línea de tiempo académica UTP (2019 - 2025)
│   ├── Contact.tsx              # Formulario y canales de contacto directo
│   ├── Footer.tsx               # Pie de página Cyber-Tech
│   └── WhatsAppFloatButton.tsx  # Botón flotante persistente de WhatsApp
├── data/                        # Datos estructurados en formato JSON (Fácilmente editables)
│   ├── skills.json              # Lista de habilidades técnicas y categorías
│   ├── projects.json            # Proyectos con imágenes, demos, videos y repositorios
│   ├── certificates.json        # Certificados oficiales con enlaces a PDF e imágenes
│   └── titulos-academicos.json  # Grados académicos (Constancia de Egresado UTP)
├── docs/                        # Documentación técnica extendida
│   └── MANUAL_DE_DESARROLLO_Y_ARQUITECTURA.md  # Manual completo con mapas conceptuales Mermaid
└── public/                      # Archivos estáticos servidos directamente
    ├── documentos-pdf/          # PDFs descargables (CV, certificados, constancias)
    └── images/                  # Imágenes de proyectos, certificados y recursos gráficos
```

---

## ✏️ Cómo Personalizar el Contenido

No necesitas modificar código de TypeScript para actualizar tu portafolio:
- **Para agregar proyectos**: Edita [`data/projects.json`](data/projects.json) y coloca las imágenes en `public/images/proyectos/`.
- **Para agregar certificados**: Edita [`data/certificates.json`](data/certificates.json) y guarda los PDFs en `public/documentos-pdf/certificados/`.
- **Para actualizar habilidades**: Edita [`data/skills.json`](data/skills.json).
- **Para consultar diagramas y mapas conceptuales**: Revisa [`docs/MANUAL_DE_DESARROLLO_Y_ARQUITECTURA.md`](docs/MANUAL_DE_DESARROLLO_Y_ARQUITECTURA.md).

---

## 👤 Autor y Contacto

- **Desarrollador**: Brandon Alberto Hualpa Butron
- **Especialidad**: Egresado de Ingeniería de Software (UTP) · Backend Developer
- **LinkedIn**: [linkedin.com/in/brandon-alberto-hualpa-butron-730a7a370](https://linkedin.com/in/brandon-alberto-hualpa-butron-730a7a370)
- **GitHub**: [@BrandonAlbertt](https://github.com/BrandonAlbertt)
- **YouTube**: [@brandonbytes](https://youtube.com/@brandonbytes)
- **Correo**: [brandonbutron.ing.software@gmail.com](mailto:brandonbutron.ing.software@gmail.com)
- **WhatsApp**: [+51 924 516 682](https://wa.me/51924516682)
