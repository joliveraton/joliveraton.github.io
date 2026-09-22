# Test Maestro y Oficial Albañil

Web estática preparada para GitHub Pages. El banco actual contiene **581 preguntas**:
- **248 de Maestro Albañil**.
- **333 de Oficial Albañil**.

El desplegable permite:
- Todos los exámenes.
- Solo Maestro Albañil.
- Solo Oficial Albañil.
- Un examen concreto mediante los grupos del desplegable.

## Funciones
- Pregunta aleatoria.
- Selección de respuesta.
- Corrección inmediata.
- Si fallas, muestra la respuesta correcta.
- No repetir preguntas hasta agotar el bloque.
- Estadísticas de aciertos, fallos y porcentaje.
- Memoria local del progreso mediante `localStorage`.
- Diseño adaptable a móvil.
- Sin servidor ni base de datos.

## GitHub Pages
1. Crea un repositorio en GitHub.
2. Sube `index.html`, `styles.css`, `app.js` y `questions.js`.
3. Ve a **Settings → Pages**.
4. Selecciona **Deploy from a branch**.
5. Elige la rama `main` y la carpeta `/ (root)`.
6. Guarda y abre la URL que te proporcione GitHub.

## Fuentes
Las preguntas y respuestas se han incorporado a partir de los cuestionarios y plantillas de respuestas de los documentos aportados. Las preguntas anuladas que aparecen como anuladas en las plantillas no se incluyen como preguntas puntuables.
