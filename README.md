# Healthy Recipe Finder

Encuentra recetas saludables personalizadas según tu despensa y preferencias dietéticas. Proyecto hecho con React 19, TypeScript, TailwindCSS y la API de Google Gemini.

## Objetivo

Healthy Recipe Finder te permite encontrar recetas saludables adaptadas a los ingredientes que tienes y a tus restricciones dietéticas, integrando inteligencia artificial para sugerencias personalizadas.

## Cómo usar

1. **Instala dependencias**
   ```bash
   npm install
   ```

2. **Agrega tu clave de Gemini API**
   - Crea un archivo `.env` en la raíz:
     ```
     VITE_GEMINI_API_KEY=tu_clave_aqui
     ```

3. **Desarrolla localmente**
   ```bash
   npm run dev
   ```

4. **Construye para producción**
   ```bash
   npm run build
   ```

5. **Publica en GitHub Pages**
   ```bash
   npm run deploy
   ```
   El sitio estará disponible en:
   [https://ramirosmith.github.io/healthy-recipe-finder/](https://ramirosmith.github.io/healthy-recipe-finder/)

## Stack

- React 19 + TypeScript
- TailwindCSS
- Vite
- Google Gemini API (modelo gemini-2.5-flash)
- Persistencia con localStorage

## Estructura

- `/src/components` – Componentes reutilizables (Header, RecipeCard, etc.)
- `/src/views` – Vistas principales (Gestión de Despensa, Búsqueda de Recetas)
- `/src/services` – Integraciones externas (Gemini API)
- `/src/hooks` – Custom hooks como `useLocalStorage`
- `/src/constants.ts` – Listas y valores fijos
- `/src/types.ts` – Modelos de datos TypeScript

## Licencia

MIT
