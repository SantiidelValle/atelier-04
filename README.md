# ATELIER / 04 — catálogo editorial

Primera versión estática del catálogo. Está hecha con HTML, CSS y JavaScript puro, por lo que se puede desplegar directamente en Vercel sin configurar un servidor.

## Cómo probarla

Abrí `index.html` en el navegador. No hay dependencias ni instalación requerida.

## Cómo desplegarla en Vercel

1. Subí la carpeta `atelier-catalogo` a un repositorio de GitHub, o importala directamente desde Vercel.
2. Seleccioná esa carpeta como proyecto.
3. Dejá el framework preset como `Other` y el build command vacío.
4. Publicá el proyecto.

## Dónde agregar las fotos reales

Los productos están definidos en `script.js`, dentro del array `products`. Las fotos reales están en `assets/products/` y cada ficha con galería usa el campo `images` con tres rutas.

Las fichas reales tienen un precio base de `$U 3.000`. El selector de moneda también muestra dólares usando una tasa de referencia editable en `script.js`: `USD_UYU_RATE = 40`.

## Carrito y WhatsApp

La ficha permite seleccionar talle `XS`, `S`, `M`, `L`, `XL` o `XXL`, agregar productos al carrito, aplicar el código demo `ATELIER10` (10%) y preparar el pedido para WhatsApp.

El número de WhatsApp ya está configurado en `script.js` como `59892809934`, en formato internacional y sin `+`, espacios ni guiones.

El nombre `ATELIER / 04` es provisional y se puede cambiar desde `index.html`.
