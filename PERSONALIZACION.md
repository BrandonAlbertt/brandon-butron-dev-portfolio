# Guía de Personalización - Portfolio Manga

Este documento te guía sobre cómo personalizar tu portfolio con los nuevos componentes manga y 3D.

## 🎨 Nuevas Características

### 1. **Dropdown de Repositorios de GitHub** 
   - **Componente**: `components/GitHubReposDropdown.tsx`
   - **Ubicación**: Se muestra en el Hero section con un botón interactivo
   - **Características**:
     - Lista desplegable de repositorios
     - Información de estrellas y forks
     - Efecto manga con línea de borde animada
     - Información de lenguajes de programación

#### Cómo Personalizar:

```javascript
const repos: Repository[] = [
  {
    name: 'Nombre del Repositorio',
    description: 'Descripción breve del proyecto',
    url: 'https://github.com/tu-usuario/repo-name',
    stars: 100,           // Número de estrellas
    forks: 25,            // Número de forks
    language: 'Java',     // Lenguaje principal
    color: '#F89820'      // Color del lenguaje (hex)
  },
  // ... más repositorios
]
```

### 2. **Cubo 3D de GitHub**
   - **Componente**: `components/GitHub3DCube.tsx`
   - **Ubicación**: Entre la sección de Proyectos y Certificados
   - **Características**:
     - Cubo 3D interactivo que rota con el mouse
     - 6 caras con información diferente
     - Efectos de brillo manga
     - Función de animación automática

#### Cómo Personalizar:
   - Modifica los textos dentro de cada `<div>` con `style={{ transform: 'translateZ(...)' }}`
   - Cambia los colores primarios, secundarios y accent en `globals.css`
   - Ajusta la velocidad de rotación en el `useEffect` (valores `rotationX += 0.1` y `rotationY += 0.15`)

### 3. **Estilos Manga Globales**
   - **Ubicación**: `app/globals.css`
   - **Nuevas Clases**:
     - `.animate-manga-shine` - Efecto de brillo deslizante
     - `.animate-manga-pulse` - Pulso de borde
     - `.animate-manga-float` - Efecto flotante
     - `.animate-manga-scale-in` - Entrada con escala 3D
     - `.manga-card` - Tarjeta con estilo manga
     - `.manga-border` - Borde con glow

#### Ejemplo de Uso:
```html
<div class="group p-6 rounded-xl border-2 border-primary/40 animate-manga-scale-in hover:animate-manga-pulse">
  <!-- contenido -->
</div>
```

### 4. **YouTube en Contacto**
   - ✅ Agregado a `components/Contact.tsx`
   - Muestra: Enlace a YouTube channel
   - Icono: `<Youtube />` de lucide-react
   - URL configurable en el componente Contact

## 🎯 Colores del Sistema

El portfolio ahora usa colores más vibrantes y juveniles:

```css
/* Dark Mode (Predeterminado) */
--primary: oklch(0.55 0.25 290)      /* Púrpura vibrante */
--secondary: oklch(0.5 0.28 20)      /* Rojo/Naranja vivo */
--accent: oklch(0.65 0.3 200)        /* Cyan brillante */
```

Para cambiar estos colores, edita `app/globals.css` en la sección `.dark {}`

## 📝 Pasos Rápidos de Personalización

### Actualizar Repositorios de GitHub:
1. Abre `components/GitHubReposDropdown.tsx`
2. Busca `const repos: Repository[]`
3. Reemplaza los repositorios con los tuyos
4. Mantén la misma estructura del objeto

### Cambiar Color del Tema:
1. Abre `app/globals.css`
2. Busca la sección `.dark {`
3. Modifica los valores `oklch()`:
   - `--primary`: Color principal (púrpura = 280, rojo = 20)
   - `--secondary`: Segundo color (rojo = 20, naranja = 50)
   - `--accent`: Color de énfasis (cyan = 200, verde = 150)

### Agregar Nuevos Repositorios:
```javascript
{
  name: 'Mi Nuevo Proyecto',
  description: 'Descripción del proyecto',
  url: 'https://github.com/usuario/proyecto',
  stars: 42,
  forks: 10,
  language: 'TypeScript',
  color: '#3178C6'
}
```

## 🎬 Animaciones Disponibles

- `animate-fade-in` - Desvanecimiento suave
- `animate-slide-in-up` - Deslizamiento hacia arriba
- `animate-glow` - Efecto de brillo
- `animate-gradient` - Fondo con gradiente animado
- `animate-manga-shine` - Efecto de brillo manga
- `animate-manga-pulse` - Pulso de borde manga
- `animate-manga-float` - Flotación suave
- `animate-manga-scale-in` - Entrada con escala 3D

## 🌙 Dark Mode / Light Mode

El portfolio soporta ambos modos automáticamente. Los colores se ajustan según:
- `globals.css` `:root {}` para modo claro
- `globals.css` `.dark {}` para modo oscuro

## 📲 URLs a Actualizar

Busca y reemplaza estas URLs con las tuyas:
- `https://github.com/brandon-hualpa` → Tu GitHub
- `https://linkedin.com/in/brandon-hualpa` → Tu LinkedIn
- `https://youtube.com/@brandonhualpa` → Tu YouTube
- `brandon@example.com` → Tu email

## 💡 Consejos

1. **Performance**: Las animaciones 3D pueden ser pesadas en dispositivos móviles, considera reducir la complejidad
2. **Colores**: Prueba diferentes combinaciones en el panel de Diseño de v0
3. **Contenido**: Actualiza toda la información de GitHub antes de deployar
4. **Responsive**: El portfolio es mobile-first, prueba en diferentes tamaños

## 🚀 Siguiente Paso

Publica tu portfolio en Vercel usando el botón "Publish" en v0, y ¡comparte tu trabajo con el mundo!
