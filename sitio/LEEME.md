# Sitio de Mundo Motors

HTML estático generado con un script propio de Node, sin dependencias, y publicado en Cloudflare Workers con archivos estáticos. No lleva código de Worker. El diseño aprobado sigue en `../diseno/` como referencia.

## Estructura

```
sitio/
├── armar.js          genera public/ desde src/
├── wrangler.jsonc    configuración de Workers (URLs limpias: drop-trailing-slash)
├── src/
│   ├── paginas/      una página por archivo: datos (título, descripción, ruta…) + contenido de <main>
│   ├── partes/       documento, cabecera, pie, botón flotante, íconos y consulta rápida
│   ├── datos/        local.json (contacto y horarios), oferta.json (Inicio), resenas.json (Inicio),
│   │                 productos.json (Marcas, más vendidos), preguntas.json (Servicios, también arma el FAQPage)
│   ├── css/          base + pie + sitio → css/sitio.css; cada página suma el suyo (inicio.css, marcas.css…)
│   ├── js/sitio.js
│   └── estaticos/    se copia tal cual (img/)
└── public/           lo que se publica (se genera, no se versiona)
```

## Comandos

```
npm install          una vez
npm run dev          arma y levanta http://localhost:8787 con las mismas reglas que Cloudflare
npm run armar        solo arma public/ (con noindex)
npm run deploy       arma para publicar y sube; falla si queda contenido de ejemplo
```

## Reglas

- Los enlaces internos van sin extensión ni barra final: `/marcas`, no `marcas.html`.
- Los botones de WhatsApp se escriben `data-wa="mensaje"`: el armado los convierte en enlaces `wa.me` con el mensaje.
- Datos del local en `src/datos/local.json`: se usan en el pie, en «Dónde estamos» y en los datos estructurados.
- `"ejemplo": true` en `oferta.json`, `resenas.json` o `productos.json` marca contenido inventado. `npm run deploy` no publica mientras quede alguno.
- La consulta rápida de las páginas internas es `{{> consulta-rapida}}`; los `id` de sus campos llevan el `prefijo` de cada página.
- Cada página interna declara `nombre` (para las migas de los datos estructurados) y `prefijo`. `"faq": true` suma las preguntas frecuentes a los datos estructurados.

## Reseñas de Google (carga manual, una vez por mes)

Las reseñas no se leen de la API de Google: se copian a mano de la ficha del local en `src/datos/resenas.json`. Hay un recordatorio programado el 1.º de cada mes, y `npm run armar` avisa si pasaron más de 31 días desde la última actualización.

1. Abrir la ficha de Google del local (enlace en `"url"`).
2. Copiar la **nota** (por ejemplo, `4.8`, con punto) y la **cantidad** de reseñas.
3. Elegir reseñas reales y recientes, de la más nueva a la más antigua; el Inicio muestra las 3 primeras y las demás quedan guardadas. De cada una: nombre como aparece en Google, estrellas, mes y año (`"fecha": "2026-10"`) y el texto **sin modificar**. Si es muy larga, elegir otra; no se recorta ni se corrige.
4. Poner `"actualizado"` con la fecha del día (`AAAA-MM-DD`) y `"ejemplo": false`.
5. Correr `npm run armar`, revisar el Inicio y publicar.

Si `"lista"` queda vacía, el Inicio muestra solo la nota, la cantidad y el enlace a Google. Así quedó desde el 11/11/2026, hasta que se carguen reseñas.

No se inventan reseñas ni se editan textos. Se pueden elegir las que se muestran, pero la nota y la cantidad tienen que ser las que muestra Google ese día.
