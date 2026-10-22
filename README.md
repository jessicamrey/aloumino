# Aloumiño · Web

Web estática de **Aloumiño**, velas artesanales y ecológicas hechas a mano en Galicia.
Está hecha solo con HTML, CSS y JavaScript (sin dependencias ni compilación), lista para publicarse gratis en **GitHub Pages**.

## Páginas

| Archivo | Sección |
| --- | --- |
| `index.html` | Inicio |
| `tienda.html` | Tienda online (filtros por categoría, ficha de producto y pedido) |
| `historia.html` | Nuestra historia |
| `personalizados.html` | Personalizados y regalos |
| `talleres.html` | Talleres y experiencias |
| `colaboraciones.html` | Colaboraciones para tiendas y profesionales |
| `eventos.html` | Eventos y empresas |
| `diario.html` | Diario de Aloumiño (blog) |
| `contacto.html` | Contacto |
| `faq.html` | Preguntas frecuentes |
| `404.html` | Página de error |

La cabecera y el pie de página se generan desde `assets/js/main.js`, así que el menú se cambia en un único sitio (array `NAV`).

## Cómo editar

### Datos de contacto y redes
Edita `assets/js/config.js`: correo, Instagram, TikTok, WhatsApp (opcional) y endpoint del formulario. Si dejas un campo vacío (`""`), ese enlace se oculta en toda la web.

### Productos
Edita `assets/js/products.js`. Cada producto es un bloque con nombre, categoría, colecciones, precio (`null` = «a consultar»), aroma, descripción, fotos y opciones de personalización. Las instrucciones están al principio del archivo.

- Para que aparezca en la portada: `featured: true`.
- Para mostrarlo como «Próximamente»: `status: "soon"`.
- Enlace directo a un producto: `tienda.html?p=ID_DEL_PRODUCTO`.
- Enlace directo a una categoría: `tienda.html?cat=ramos`.

### Fotografías
Guarda las fotos en `assets/img/` (recomendado: JPG de unos 900–1200 px de lado y menos de 200 KB) y referencia la ruta en el producto o en la página correspondiente.

### Colores y tipografía
Están definidos como variables al principio de `assets/css/styles.css` (`:root`).

## Pedidos y formularios

No hay pago online: la clienta añade productos a «Tu pedido» (se guarda en su navegador) y envía una **solicitud de pedido** desde el formulario de contacto. Después se confirma disponibilidad, envío y forma de pago por correo o WhatsApp.

Los formularios funcionan de dos maneras:

1. **Sin configurar** (`formEndpoint: ""`): abren el programa de correo de la persona con el mensaje ya redactado.
2. **Recomendado – Formspree** (gratis hasta 50 envíos/mes): crea una cuenta en <https://formspree.io>, crea un formulario con tu correo y copia la URL (`https://formspree.io/f/xxxxxxx`) en `formEndpoint`. Los mensajes llegarán directamente a tu bandeja de entrada.

## Publicar en GitHub Pages

1. Sube todos los archivos a la rama `main` del repositorio.
2. En GitHub: **Settings → Pages → Build and deployment → Source: Deploy from a branch**, rama `main`, carpeta `/ (root)` → **Save**.
3. En un par de minutos la web estará en `https://<usuario>.github.io/aloumino/`.

**Dominio propio** (p. ej. `aloumino.com`): añádelo en *Settings → Pages → Custom domain* y configura los DNS que indica GitHub. En ese caso, cambia en `404.html` las rutas `/aloumino/` por `/`.

## Probar en local

Desde la carpeta del proyecto:

```bash
npx http-server -p 8000
# o
python -m http.server 8000
```

y abre <http://localhost:8000>.
