# 🌌 Rick & Morty Multiverse Portal (Next.js SSG + ISR + CSR)

Aplicación web moderna y de alto rendimiento desarrollada con **Next.js 16 (App Router)**, **TypeScript** y **Tailwind CSS**, consumiendo la [API oficial de Rick and Morty](https://rickandmortyapi.com/documentation/#character).

---

## 🚀 Características Principales

### 1. 🏠 Catálogo Principal (SSG + Lazy Loading)
- **Static Site Generation (SSG):** Peticiones con `cache: 'force-cache'` para generar el HTML estático en el servidor.
- **Lazy Loading de Imágenes:** Integración con `next/image` con carga bajo demanda (`loading="lazy"`), optimizando el ancho de banda y métricas web vitales (LCP/CLS).
- **Diseño Holográfico:** Tarjetas de personajes con indicadores de estado en vivo (Alive, Dead, unknown) y efectos de resplandor neón esmeralda.

### 2. 🔍 Búsqueda Dimensional en Tiempo Real (CSR)
- **Client Side Rendering (CSR):** Manejo de reactividad con los hooks `useState` y `useEffect`.
- **Filtros Simultáneos:**
  - 📝 **Nombre:** Búsqueda textual reactiva con *debounce* (350ms).
  - 💓 **Estado:** Vivo (Alive), Muerto (Dead), Desconocido (Unknown).
  - 🧬 **Tipo:** Subespecie o tipo genético (ej. Clone, Parasite, Robot).
  - 🚻 **Género:** Femenino, Masculino, Sin Género, Desconocido.
- **Control de Excepciones:** Manejo visual elegante ante 0 coincidencias (código 404 de la API).

### 3. 🧬 Ficha Detallada del Personaje (Rutas Dinámicas + ISR)
- **Ruta Dinámica:** `/character/[id]`
- **`generateStaticParams`:** Pre-renderizado estático en tiempo de compilación.
- **Incremental Static Regeneration (ISR):** Revalidación automática cada **10 días** ($864\,000$ segundos):
  ```ts
  export const revalidate = 864000;
  ```
- **Mapeo Integral de Campos:**
  - Identificador, Nombre, Estado, Especie, Tipo, Género.
  - Origen y Ubicación actual con enlaces.
  - Fecha de registro en base de datos.
  - Lista interactiva completa de apariciones en episodios (`episode[]`).

### 4. 🛡️ Manejadores de Convención de Next.js
- **Error Handler (`src/app/error.tsx`):** Client Component con Error Boundary y botón para reintentar la renderización (`reset()`).
- **NotFound Handler (`src/app/not-found.tsx`):** Página 404 personalizada con temática espacial.

---

## 🛠️ Tecnologías Utilizadas

- **Framework:** Next.js 16.4 (Turbopack + App Router)
- **Librería UI:** React 19
- **Lenguaje:** TypeScript 5
- **Estilos:** Tailwind CSS v4 (@tailwindcss/turbopack)
- **Iconografía:** React Icons (Ionicons 5)
- **API:** [The Rick and Morty API](https://rickandmortyapi.com/)

---

## 📦 Instalación y Ejecución Local

1. **Clonar el repositorio:**
   ```bash
   git clone <URL_DE_TU_REPOSITORIO>
   cd next-ssg-isr-app
   ```

2. **Instalar dependencias:**
   ```bash
   npm install
   ```

3. **Iniciar en modo desarrollo:**
   ```bash
   npm run dev
   ```
   Abre [http://localhost:3000](http://localhost:3000) en tu navegador.

4. **Compilar para producción:**
   ```bash
   npm run build
   ```

5. **Levantar el servidor de producción:**
   ```bash
   npm start
   ```

---

## ☁️ Despliegue en Vercel

1. Sube este proyecto a tu repositorio de GitHub.
2. Ingresa a [Vercel](https://vercel.com/) e inicia sesión con GitHub.
3. Importa el repositorio del proyecto.
4. Presiona **Deploy**. Vercel configurará automáticamente el build con Next.js y Turbopack.
