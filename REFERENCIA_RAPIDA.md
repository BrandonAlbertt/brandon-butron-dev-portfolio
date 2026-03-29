# REFERENCIA RÁPIDA - PORTAFOLIO DE BRANDON

## CAMBIOS MÁS COMUNES

### Agregar un Proyecto
**Archivo**: `components/ProjectsGrid.tsx` (línea 19)

```javascript
{
  id: 13,
  title: "Mi Nuevo Proyecto",
  description: "Descripción del proyecto",
  image: "https://imagen.jpg",
  technologies: ["Tech1", "Tech2"],
  github: "https://github.com/...",
  demo: "https://demo.com",
  video: "https://youtube.com/..."
}
```

### Agregar un Certificado
**Archivo**: `components/CertificatesGrid.tsx` (línea 17)

```javascript
{
  id: 11,
  title: "Nombre del Certificado",
  organization: "Organización",
  year: 2024,
  certificateLink: "https://...",
  certificateImage: "https://imagen.jpg"
}
```

### Cambiar Colores
**Archivo**: `app/globals.css`

Busca `:root {` para tema claro o `.dark {` para tema oscuro

```css
--primary: oklch(0.55 0.25 290);    /* Color morado */
--secondary: oklch(0.5 0.28 20);    /* Color rojo/naranja */
--accent: oklch(0.65 0.3 200);      /* Color cyan */
```

### Cambiar Foto de Perfil
**Archivo**: `public/profile.jpg`

Reemplaza el archivo con tu nueva foto

### Cambiar Título del Sitio (SEO)
**Archivo**: `app/layout.tsx` (línea ~45)

```javascript
title: 'Tu Nuevo Título - Software Engineer',
description: 'Nueva descripción para Google',
```

### Cambiar Tema por Defecto
**Archivo**: `app/layout.tsx` (línea ~68)

```javascript
// Tema oscuro por defecto
<ThemeProvider attribute="class" defaultTheme="dark" enableSystem>

// O tema claro por defecto
<ThemeProvider attribute="class" defaultTheme="light" enableSystem>
```

## ARCHIVOS IMPORTANTES

| Archivo | Propósito | Notas |
|---------|-----------|-------|
| `app/page.tsx` | Página principal | Ensambla todos los componentes |
| `app/layout.tsx` | Template de todas las páginas | Coloca fuentes, tema, metadatos |
| `app/globals.css` | Estilos globales | Define colores, animaciones |
| `components/ProjectsGrid.tsx` | Grid de proyectos | Contiene datos de proyectos |
| `components/CertificatesGrid.tsx` | Grid de certificados | Contiene datos de certificados |
| `app/projects/[id]/page.tsx` | Página dinámica de proyecto | Muestra detalle con video |
| `app/certificates/[id]/page.tsx` | Página dinámica de certificado | Muestra certificado ampliado |
| `public/profile.jpg` | Foto de perfil | Reemplaza aquí |

## IDS DE SECCIONES (para navegación)

```
#hero ................ Sección principal
#about ............... Acerca de mí
#skills .............. Habilidades
#projects ............ Proyectos
#certificates ........ Certificados
#education ........... Educación
#contact ............. Contacto
```

## COMANDOS ÚTILES

```bash
# Instalar dependencias
npm install

# Ejecutar servidor local
npm run dev

# Compilar para producción
npm run build

# Iniciar versión de producción
npm run start
```

## FORMATO OKLCH PARA COLORES

El formato es: `oklch(L S H)`

- **L** (Luminancia): 0 (negro) a 1 (blanco)
  - 0.15 = muy oscuro
  - 0.55 = medio
  - 0.95 = muy claro

- **S** (Saturación): 0 (gris) a 0.37 (máximo)
  - 0 = gris puro
  - 0.15 = poco saturado
  - 0.3 = muy saturado

- **H** (Ángulo): 0-360°
  - 0 = rojo
  - 20 = naranja/rojo
  - 50 = amarillo
  - 120 = verde
  - 200 = cyan
  - 260 = púrpura
  - 320 = rosa

### Ejemplos de colores
```
Rojo: oklch(0.55 0.25 20)
Verde: oklch(0.6 0.2 120)
Azul: oklch(0.5 0.2 260)
Naranja: oklch(0.6 0.25 50)
Rosa: oklch(0.65 0.25 330)
```

## ESTRUCTURA DE UN PROYECTO

```javascript
{
  id: 1,                    // Número único (1, 2, 3...)
  title: "Nombre",          // Título mostrado
  description: "...",       // Descripción larga para la página de detalle
  image: "https://...",     // URL de imagen (500x300px ideal)
  technologies: ["A", "B"], // Array de tecnologías usadas
  github: "https://...",    // Link a GitHub
  demo: "https://...",      // Link a demostración
  video: "https://..."      // URL de video (YouTube embed)
}
```

## ESTRUCTURA DE UN CERTIFICADO

```javascript
{
  id: 1,                      // Número único
  title: "Nombre Certificado",
  organization: "Organización",
  year: 2024,                 // Año de obtención
  certificateLink: "https://...", // Link externo para verificación
  certificateImage: "https://..."  // URL imagen del certificado
}
```

## TAILWIND CLASES COMUNES

### Colores
```
bg-primary          - Fondo con color primario
text-primary        - Texto con color primario
border-primary      - Borde con color primario
hover:bg-primary/20 - Fondo con 20% opacidad en hover
```

### Espaciado
```
p-4                 - Padding 4 unidades
m-2                 - Margin 2 unidades
gap-6               - Espacio entre elementos (flex/grid)
```

### Tamaño
```
w-full              - Ancho 100%
h-96                - Alto 96 unidades (384px)
min-h-screen        - Mínimo alto de pantalla completa
```

### Posicionamiento
```
flex                - Contenedor flexbox
grid grid-cols-3    - Grid con 3 columnas
relative            - Position relative
absolute            - Position absolute
```

## ¿DÓNDE PUEDO CAMBIAR...?

| Qué cambiar | Dónde | Línea aprox |
|-------------|-------|-----------|
| Nombre/título sitio | `app/layout.tsx` | 45 |
| Descripción SEO | `app/layout.tsx` | 46 |
| Foto de perfil | `public/profile.jpg` | - |
| Colores principales | `app/globals.css` | 25-89 |
| Tema por defecto | `app/layout.tsx` | 68 |
| Proyectos | `components/ProjectsGrid.tsx` | 19 |
| Certificados | `components/CertificatesGrid.tsx` | 17 |
| Habilidades | `components/Skills.tsx` | 50 |

---

**Última actualización**: Marzo 2024
**Versión**: 1.0
