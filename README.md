# Una aventura para Saanmai 🌼

Landing del 21 de septiembre con jardín pixel art, cinco flores coleccionables, galería y carta. HTML, CSS y JavaScript sin dependencias, fuentes externas ni compilación. Las ilustraciones SVG son locales.

## Ver la página

Abre `index.html` en tu navegador. También funciona como sitio estático en GitHub Pages; `index.html` es la portada. No se ha publicado ningún cambio automáticamente.

## Personalizar

1. Abre `config.js`.
2. Cambia `nickname` (actualmente Saanmai) y `sender` por sus nombres o apodos.
3. Guarda tres fotos en `assets/`, por ejemplo `recuerdo-1.jpg`.
4. En cada elemento de `memories`, cambia `image` por la ruta de tu foto (`./assets/recuerdo-1.jpg`), `alt` por una descripción y los campos `date`, `title` y `text` por tus recuerdos.
5. Edita los párrafos de `letter`. Los datos entre corchetes son ejemplos que debes reemplazar.

Conserva comillas y comas del archivo. Los textos se muestran como texto plano; no necesitan etiquetas HTML. Puedes usar JPG, PNG, WebP o SVG. Las fotos se recortan visualmente al centro para mantener el tamaño de las tarjetas.

Para cambiar el texto principal, edita `index.html`. Para colores y diseño, edita `style.css`. Las variables de color están al principio del archivo. Si quieres cambiar también la versión sin JavaScript, actualiza los textos de respaldo en `index.html`.

## Imagen de fondo

Guarda tu imagen como `assets/background.png` o cambia `background.image` en `config.js` por su ruta. También funciona con nombres que contienen espacios. El fondo se centra y cubre la pantalla; puede recortarse según su proporción.

Usa `background.overlay` para ajustar la capa oscura: `0` muestra la imagen original y `1` la oscurece completamente. El valor inicial es `0.75` para mantener el texto legible. Si la ruta está vacía o la imagen no carga, se conserva el fondo oscuro.

## Interacción

Cada flor se recoge una sola vez por partida. Al recoger las cinco, aparece el ramo con opciones para leer la carta o reiniciar. La carta también se puede abrir directamente al final de la página. El progreso se reinicia al recargar. Se puede jugar con teclado (Tab y Enter/Espacio) y cerrar la sorpresa con Escape. Se respeta la preferencia de movimiento reducido.
