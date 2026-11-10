# Contenido inventado en las maquetas de Inicio

Maquetas vigentes, todas del 09/11/2026:

- `a-premium-2.html`: versión automotriz, **la elegida por Walter el 09/11, con el pie 1 · Claro**. Ya tiene la primera ronda de ajustes.
- `a-base.html`: la opción A con las correcciones de Walter (referencia).
- `a-premium-1.html`: versión editorial (referencia).

Las versiones anteriores están en `descartadas/`, incluida la Premium 2 antes de los ajustes (`a-premium-2-v1.html`).

Por pedido de Walter, el contenido que faltaba se inventó en lugar de dejar marcadores. Todo lo de esta lista hay que reemplazarlo o validarlo con el cliente antes de publicar.

## Hay que reemplazarlo sí o sí

| Qué | Dónde | Texto en la maqueta | Con qué se reemplaza |
|---|---|---|---|
| **Oferta del banner** | Bloque 3 | *Amortiguadores en 3 cuotas sin interés.* Llevando el juego completo, el kit de fuelles y topes va de regalo. Vigente hasta el 30/11/2026. | La primera oferta real del cliente. Si no hay, el banner arranca oculto. |
| **Reseñas de Google** | Bloque 9 | Nota 4,8, 136 reseñas y tres reseñas: Martín S., Valeria A. y Jorge C. | Las reales de la ficha de Google del local. **No se publican inventadas.** |

**Testimonios:** Walter los sacó de todo el sitio el 09/11 y se quitaron de `mapa-de-sitio.md`. Los 5 testimonios inventados quedan solo en las versiones de `descartadas/`.

## Hay que verificarlo

| Qué | Dónde | Situación |
|---|---|---|
| **Teléfono fijo (0341) 432-8098** | Pie | Sale del cartel viejo de la fachada. Walter tiene los datos de contacto: confirmar. |
| **Instagram «Mundo Motors Arg»** | Pie | El nombre sale de las piezas de Instagram. Falta el enlace (usuario) de la cuenta. |
| **Mapa** | Bloque 10 | En la Premium 2 es `img/mapa-local.svg`, una ilustración propia con el norte arriba. Las calles salen de la captura de Google Maps que pasó Walter, que estaba girada 180°: Montevideo, Av. Pellegrini, Lavalle y Bv. Avellaneda. Las manzanas y los lotes son esquemáticos y la calle al este de Lavalle va sin nombre. El local está del lado sur de Pellegrini, pasando Lavalle, a un tercio de la cuadra. El enlace abre la búsqueda en Google Maps: para publicar, usar el enlace de la ficha del local. `a-base` y la Premium 1 siguen con el mapa anterior (`img/mapa.svg`). |
| **Foto de Nuestra historia** | Bloque 7 | Es una captura de Google Street View. Supuse que es el primer local, en San Nicolás 1268, y así lo dice el epígrafe: confirmarlo. Para publicarla hay que revisar las condiciones de uso de Google o reemplazarla por una foto propia del archivo del cliente. |
| **Foto de Talleres** | Bloque 8 | Walter pidió cambiarla sin decir por cuál. Elegí la del pasillo del depósito (`20.32.10`), con un vendedor buscando una pieza. |
| **Logos de marcas de autos** | Bloque 4 | En la Premium 2 van los 9 logos vectoriales, en un solo color (blanco en Renault y Chevrolet, azul en el resto), con el nombre en texto. Salen de Simple Icons 16.37.0 (dibujo CC0; las marcas son de sus fabricantes). Validar con el cliente, o cambiarlos por los archivos oficiales si los consigue. La aclaración «No somos concesionarios ni distribuidores oficiales» tiene que seguir junto a los logos. |
| **Fotos** | Todo el sitio | Son de celular, de 960 a 1200 px de ancho. La de la portada (961 px) se estira un poco en pantallas grandes. Conviene conseguir originales en mayor resolución. |

## Textos redactados (no son datos, pero el cliente debería leerlos)

- **Portada:** *Hace más de 20 años que ayudamos a encontrar el repuesto correcto. Originales y primeras marcas para Renault, Chevrolet y las principales marcas del mercado.*
- **Títulos de sección:**
  - *Detrás de cada repuesto hay un equipo* (sale de la estrategia de marca).
  - *Tu taller no puede esperar*.
  - *Lo que mejor conocemos*.
- **Por qué elegirnos (versiones premium):** *Buscamos, preparamos y controlamos cada pedido para que llegue donde tiene que llegar.* Sale del concepto del reel institucional.
- **Talleres:** *Sabemos que un auto parado es plata.*
- **Rubros:** bajadas de cada especialidad, por ejemplo *Kits completos con correa, tensor y bomba de agua*.
- **Chevrolet:** *Toda la línea desde 2015* (sale de la historia que contó el cliente).

## Páginas internas (09/11/2026)

`quienes-somos.html`, `marcas.html` y `servicios.html` siguen la línea de la Premium 2. Comparten con el Inicio `css/sitio.css`. Se arman desde sus plantillas en `diseno/fuentes-paginas/`: el encabezado, el pie, los íconos y el botón flotante salen del Inicio. Si esas partes cambian en el Inicio, o si se edita una plantilla, se vuelven a armar con:

```
node diseno/fuentes-paginas/armar-paginas.js diseno/inicio quienes-somos.html marcas.html servicios.html
```

Los cambios de contenido de una página interna van en su plantilla, no en el HTML armado.

| Página | Qué | Situación |
|---|---|---|
| Quiénes somos | **Foto del equipo** | La foto grupal está pendiente. Va una real del equipo en el mostrador (`20.31.05`). |
| Quiénes somos | **Textos de la línea de tiempo y del cambio de nombre** | Redactados a partir del mapa de sitio: *proyecto familiar*, *sumamos personas y capacitación*, *el cambio lo pidieron nuestros clientes*. El cliente debería leerlos. |
| Quiénes somos | **Foto de 2015** | Usa la fachada con el cartel viejo (`fachada-cartel`). Confirmar que es Av. Pellegrini 3971. |
| Marcas | **Qué incluye la línea completa** | Inventado: motor y distribución, embragues, suspensión, frenos, encendido y filtros, accesorios. |
| Marcas | **Productos más vendidos** | Inventados: kit de distribución Dexco para Renault 1.6 8v, amortiguadores originales Chevrolet para Onix y Prisma, bujías NGK. La imagen es una ilustración del rubro hasta tener la foto de cada producto. |
| Marcas | **Marcas de repuestos** | Van como texto. Faltan los logos de Motrio, NGK, Hutchinson y Dexco (y los de Renault y Chevrolet Original); conviene pedírselos al cliente. |
| Marcas | **Botones de Renault y Chevrolet** | Dicen «Consultar por Renault» y «Consultar por Chevrolet»: «Consultar repuestos Chevrolet» no entraba en un renglón a 360 px. |
| Servicios | **Venta online** | Dice *Comprá en el mostrador o hacé tu pedido sin moverte de tu casa o del taller*. Falta que el cliente defina qué incluye. |
| Servicios | **Preguntas frecuentes** | 9 preguntas redactadas por mí, con datos estructurados `FAQPage`. El cliente las tiene que validar. |
| Servicios | **Foto de Talleres** | La misma del Inicio (parece generada con IA). |

## Decisiones de diseño a validar

- **Verde de WhatsApp:** el botón del encabezado y el flotante usan `#0F8443` con texto blanco (contraste 4,8:1). El verde clásico de WhatsApp (`#25D366`) con texto blanco da 2:1 y no se lee bien. El resto de los botones de WhatsApp siguen en naranja.
- **Encabezado:** entre 961 y 1180 px de ancho, el botón dice solo «WhatsApp» para que entre en un renglón.

## Datos que no son inventados

Salen de `preguntas-cliente.docx`, el mapa de sitio y las piezas de Instagram:

- Dirección, horarios y WhatsApp.
- Historia: 2006 en San Nicolás 1268 → 2015 en Av. Pellegrini 3971.
- Las 9 marcas, con línea completa en Renault y Chevrolet.
- 3 cuotas sin interés, medios de pago y Factura A.
- Envíos: cadetería en Rosario y alrededores, encomienda al resto del país.
- Condiciones para talleres: cuenta corriente, precios por volumen, atención prioritaria y envíos al taller.
- Rubros especialistas y slogan.
