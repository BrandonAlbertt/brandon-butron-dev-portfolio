# GUÍA DE DESARROLLO - PORTAFOLIO DE BRANDON

## ESTRUCTURA DEL PROYECTO

```
/vercel/share/v0-project/
├── app/                          # Rutas de Next.js (cada carpeta es una ruta)
│   ├── layout.tsx               # Layout raíz (se aplica a todas las páginas)
│   ├── page.tsx                 # Página principal (/)
│   ├── globals.css              # Estilos globales y colores
│   ├── projects/                # Rutas dinámicas para proyectos
│   │   └── [id]/
│   │       └── page.tsx         # Página de detalle del proyecto
│   └── certificates/            # Rutas dinámicas para certificados
│       └── [id]/
│           └── page.tsx         # Página de detalle del certificado
├── components/                  # Componentes React reutilizables
│   ├── Navbar.tsx              # Barra de navegación
│   ├── Hero.tsx                # Sección principal
│   ├── About.tsx               # Sección acerca de
│   ├── Skills.tsx              # Habilidades técnicas
│   ├── ProjectsGrid.tsx        # Grid de proyectos
│   ├── CertificatesGrid.tsx    # Grid de certificados
│   ├── Education.tsx           # Información de educación
│   ├── Contact.tsx             # Formulario de contacto
│   ├── Footer.tsx              # Pie de página
│   ├── GitHub3DCube.tsx        # Cubo 3D de GitHub
│   ├── GitHubReposDropdown.tsx # Dropdown de repositorios
│   └── theme-provider.tsx      # Proveedor de tema (dark/light)
├── public/                      # Archivos estáticos
│   └── profile.jpg             # Foto de perfil
├── data/                        # Archivos JSON con datos
│   ├── projects.json           # Datos de proyectos
│   └── certificates.json       # Datos de certificados
└── package.json                # Dependencias del proyecto
```

## CÓMO FUNCIONAN LAS PÁGINAS DINÁMICAS

### Página de Proyecto (/projects/[id])
- **Archivo**: `app/projects/[id]/page.tsx`
- **Cómo funciona**: 
  1. El [id] en la URL es dinámico (ej: /projects/1, /projects/2)
  2. El componente ProjectsGrid hace clic en "Video" → lleva a `/projects/{id}`
  3. La página busca el proyecto en `projectsData` usando el ID
  4. Muestra: imagen, descripción, tecnologías, video embebido, enlaces

### Página de Certificado (/certificates/[id])
- **Archivo**: `app/certificates/[id]/page.tsx`
- **Cómo funciona**:
  1. Similar a proyectos, pero con certificados
  2. CertificatesGrid hace clic → lleva a `/certificates/{id}`
  3. Muestra: imagen ampliada, título, organización, año

## CÓMO AGREGAR UN NUEVO PROYECTO

### Paso 1: Abre el archivo de datos
Archivo: `components/ProjectsGrid.tsx` (línea ~19)

### Paso 2: Encuentra el array de proyectos
```javascript
const projectsData: Project[] = [
  { id: 1, title: "...", ... },
  { id: 2, title: "...", ... },
  // ... más proyectos
]
```

### Paso 3: Agrega un nuevo proyecto
Al final del array (antes del cierre `]`), agrega:

```javascript
{
  id: 13,  // Número único, incrementa desde el último
  title: "Nombre de tu Proyecto",
  description: "Descripción detallada del proyecto. Qué hace, tecnologías clave, impacto.",
  image: "https://url-de-imagen.com/imagen.jpg",
  technologies: ["Tech1", "Tech2", "Tech3", "Tech4"],
  github: "https://github.com/tuusuario/proyecto",
  demo: "https://demo-url.com",
  video: "https://youtube.com/embed/VIDEO_ID"
}
```

### Paso 4: El proyecto aparece automáticamente
- En la grilla de proyectos en la página principal
- Con paginación automática si hay más de 9 proyectos

## CÓMO AGREGAR UN NUEVO CERTIFICADO

### Paso 1: Abre el archivo de datos
Archivo: `components/CertificatesGrid.tsx` (línea ~17)

### Paso 2: Encuentra el array de certificados
```javascript
const certificatesData: Certificate[] = [
  { id: 1, title: "...", ... },
  // ... más certificados
]
```

### Paso 3: Agrega un nuevo certificado
```javascript
{
  id: 11,  // Número único
  title: "Nombre del Certificado",
  organization: "Nombre de la Organización o Plataforma",
  year: 2024,
  certificateLink: "https://link-para-verificar.com",
  certificateImage: "https://url-imagen-certificado.jpg"
}
```

## COLORES Y TEMAS

### Dónde están los colores
Archivo: `app/globals.css`

### Cómo cambiar colores
Busca estas secciones:
```css
:root {
  /* Light mode - tema claro */
  --primary: oklch(0.3 0.15 280);    /* Purple */
  --secondary: oklch(0.85 0.1 200);  /* Cyan */
  --accent: oklch(0.55 0.2 260);     /* Another purple */
}

.dark {
  /* Dark mode - tema oscuro */
  --primary: oklch(0.55 0.25 290);
  --secondary: oklch(0.5 0.28 20);
  --accent: oklch(0.65 0.3 200);
}
```

### Formato okLCH
- Primer número: Luminancia (0=negro, 1=blanco)
- Segundo número: Saturación (0=gris, 0.3+=color vibrante)
- Tercer número: Ángulo (0-360°) que define el color

## NAVEGACIÓN Y SCROLL

### Cómo funciona la navegación
- Navbar tiene botones que hacen scroll suave a las secciones
- Cada sección tiene un `id` (ej: `id="projects"`)
- El botón ejecuta: `scrollToSection('projects')`

### Agregar una nueva sección
1. Crea un nuevo componente en `components/MiSeccion.tsx`
2. Importa en `app/page.tsx`
3. Agrega `<MiSeccion />`
4. Agrega `id="mi-seccion"` al componente raíz
5. Crea un botón en Navbar que llame a `scrollToSection('mi-seccion')`

## FOTO DE PERFIL

### Dónde cambiarla
Archivo: `public/profile.jpg`

### Cómo reemplazarla
1. Coloca una nueva imagen JPG en `public/profile.jpg`
2. O cambia el nombre y actualiza la ruta en `components/Hero.tsx`
3. La imagen debe ser cuadrada (ideal: 300x300px o mayor)

## DARK MODE

### Cómo funciona
- Por defecto activa el tema oscuro
- El usuario puede cambiar en el Navbar
- Se guarda en localStorage

### Cómo cambiar el tema por defecto
Archivo: `app/layout.tsx`
```javascript
<ThemeProvider attribute="class" defaultTheme="dark" enableSystem>
```
Cambia `defaultTheme="dark"` a `defaultTheme="light"`

## ESTILOS CON TAILWIND

### Clases principales usadas
```jsx
// Colores
bg-primary              // Fondo con color primario
text-primary            // Texto con color primario
border-primary          // Borde con color primario
hover:bg-primary/20     // Fondo con 20% opacidad

// Espaciado
p-6                     // Padding 6 unidades
m-4                     // Margin 4 unidades
gap-4                   // Espacio entre flex items

// Layout
flex                    // Flexbox
grid grid-cols-3       // Grid 3 columnas
relative                // Position relative (necesario para images con fill)

// Animaciones personalizadas
animate-manga-shine     // Brillo deslizante
animate-manga-pulse     // Pulso suave
animate-manga-float     // Flotación
```

## COMPONENTES PRINCIPALES

### Hero.tsx
- Sección principal con nombre, foto, descripción
- Botones de "Ver Proyectos" y "Contactar"
- Redes sociales y dropdown de GitHub

### ProjectsGrid.tsx
- Muestra 9 proyectos por página
- Paginación automática
- Cada proyecto lleva a /projects/[id]

### Skills.tsx
- Habilidades organizadas por categoría
- Incluye: Programación, Frontend, Backend, Bases de Datos, Desarrollo de Juegos, DevOps, etc.

### Contact.tsx
- Formulario de contacto con validación
- Enlaces a email, LinkedIn, YouTube

## CÓMO EJECUTAR LOCALMENTE

```bash
# Instalar dependencias
npm install

# Ejecutar servidor de desarrollo
npm run dev

# Abrir en navegador
# http://localhost:3000
```

## DEPLOYMENT

El sitio está listo para deployar en Vercel:
```bash
# Simplemente conecta tu repositorio en https://vercel.com
# Vercel compilará y deployará automáticamente
```

## ESTRUCTURA DE RUTAS

```
/ ........................ Página principal (todos los componentes)
/projects/1 .............. Detalle del proyecto 1
/projects/2 .............. Detalle del proyecto 2
/projects/[id] ........... Detalle dinámico de cualquier proyecto
/certificates/1 ......... Detalle del certificado 1
/certificates/[id] ...... Detalle dinámico de cualquier certificado
```

## PREGUNTAS FRECUENTES

**¿Cómo cambio el título del sitio?**
Edita `app/layout.tsx`, busca `title:` en metadata

**¿Cómo agrego una nueva sección completa?**
1. Crea `components/MiSeccion.tsx`
2. Importa en `app/page.tsx`
3. Agrega `<MiSeccion />`
4. Actualiza Navbar si es necesario

**¿Por qué no veo los cambios?**
Reinicia el servidor `npm run dev` o limpia caché del navegador (Ctrl+Shift+Delete)

**¿Cómo cambio los colores rápidamente?**
Edita `app/globals.css`, cambia los valores `oklch()` en `:root` o `.dark`

**¿Dónde guardo las imágenes?**
En la carpeta `public/`. Luego usa `/nombre-imagen.jpg` en el código

---

**Última actualización**: 2024
**Framework**: Next.js 16
**Estilos**: Tailwind CSS v4
**Tema**: Dark/Light Mode automático
