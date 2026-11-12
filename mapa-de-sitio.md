# Mapa de sitio — Mundo Motors (ex Mundo Renault)

Etapa 1 de 4 (Mapa de sitio → Diseño → Desarrollo → Integración con servidor).
Fuentes: `contexto/servicio-vendido.md`, `contexto/datos-confirmados.md`, `contexto/preguntas-cliente.docx`, `contexto/minuta-cliente-2026-11-6.md`, `contexto/contexto-de-otro-agente.md` y el manual de marca.
Última revisión: 09/11/2026, con las correcciones de Walter y la minuta del 06/11.
**Estado: confirmado por Walter el 09/11/2026.** Etapa 1 cerrada; sigue Diseño.

**Objetivo del sitio:** que quien busca un repuesto entienda en segundos que Mundo Motors, el ex Mundo Renault, lo puede resolver y termine consultando por WhatsApp o yendo al local.
**Conversión principal:** consulta por WhatsApp con marca, modelo, año, motor y repuesto.
**Reglas de contenido:** sin precios · fotos reales · hablar de vos · no prometer stock sin confirmar · no presentarse como distribuidor oficial · no mostrar condiciones de garantía (minuta 06/11) · **atar siempre el nombre a Mundo Renault**.

## Estructura

```
mundomotors.com.ar
├── Inicio            /
│   └── sección: Oferta (banner)
├── Quiénes Somos     /quienes-somos
├── Marcas            /marcas
│   └── sección: Productos más vendidos (3)
└── Servicios         /servicios
    ├── #envios
    ├── #talleres
    ├── #pagos
    └── #preguntas-frecuentes

mundorenault.com.ar  →  redirección 301 a mundomotors.com.ar
```

**URLs (Walter, 10/11/2026):** sin barra final ni extensión: `https://mundomotors.com.ar/`, `/quienes-somos`, `/marcas` y `/servicios`. Las variantes con barra (`/marcas/`) o con `.html` redirigen a la URL limpia. Así van también los enlaces internos, el `canonical` y el `sitemap.xml`.

## Mundo Renault en todo el sitio

El nombre nuevo siempre va atado al anterior, que se define como **Mundo Renault**. Fórmula fija: **Mundo Motors, ex Mundo Renault** (en textos largos: *antes Mundo Renault*).
No va en el encabezado ni en la portada de Inicio (decisión de Walter, 09/11).

| Dónde | Cómo aparece |
|---|---|
| Inicio, franja propia | Bloque *De Mundo Renault a Mundo Motors* (ver Inicio #7). |
| Quiénes Somos | Historia completa del cambio de nombre (ver página 2). |
| Marcas, bloque Renault | *Desde 2006, cuando abrimos como Mundo Renault.* |
| Servicios, preguntas frecuentes | *¿Mundo Motors es el mismo Mundo Renault?* y *¿Son concesionario oficial de Renault?* |
| Pie (todas las páginas) | *Antes Mundo Renault*, bien visible junto al logo y no como línea escondida. |
| SEO | Título y descripción de Inicio y Quiénes Somos con *ex Mundo Renault*. Datos estructurados con `alternateName: "Mundo Renault"`. Redirección 301 de `mundorenault.com.ar`. |
| Aclaración legal | *Mundo Renault fue nuestro nombre comercial anterior. No somos concesionario ni distribuidor oficial de Renault.* |

## Elementos comunes a todas las páginas

**Encabezado**
- Logo primario, sin mención al nombre anterior.
- Menú: Inicio · Quiénes Somos · Marcas · Servicios.
- Botón destacado (naranja): *Consultar por WhatsApp*.

**Botón flotante de WhatsApp** (sobre todo en celular).

**Bloque de consulta rápida** (componente reutilizable)
- Campos: marca · modelo · año · motor · repuesto.
- Al enviar abre WhatsApp con el mensaje armado. No guarda datos en el sitio.

**Pie**
- Logo, *Antes Mundo Renault* y slogan: *Tu aliado en repuestos automotor*.
- Dirección (Av. Pellegrini 3971, Rosario), mapa (imagen que lleva a Google Maps), horarios, WhatsApp, teléfono e Instagram.
- Medios de pago y "Factura A".
- Menú repetido.
- Aclaración legal corta.

---

## 1. Inicio — `/`

**Búsqueda objetivo:** repuestos automotor Rosario · repuestos multimarca Rosario · Mundo Renault Rosario.

| # | Bloque | Contenido | Acción |
|---|---|---|---|
| 1 | **Portada** | Título tentativo: *Repuestos automotor multimarca en Rosario*. Slogan, más de 20 años, originales y primeras marcas. Sin mención al nombre anterior. Foto real del local o el mostrador. | Consultar por WhatsApp |
| 2 | **Consultá tu repuesto** | Bloque de consulta rápida. *Decinos qué auto tenés y qué buscás; te ayudamos a encontrarlo.* | Enviar a WhatsApp |
| 3 | **Oferta (banner)** | Banner ancho para publicar una oferta: imagen, título, texto corto y vigencia. Lo carga el cliente; si no hay oferta, se oculta. Sin precio. | Consultar esta oferta (WhatsApp con el nombre de la oferta) |
| 4 | **Marcas que trabajamos** | Los 9 logos. Renault y Chevrolet marcados como *línea completa*. | Ver marcas |
| 5 | **Especialistas en** | Los rubros con los que quieren que los identifiquen: distribución, embragues, tapas de cilindro, amortiguadores, pastillas y discos de freno. | Consultar |
| 6 | **Por qué elegirnos** | Stock completo · asesoramiento · originales y primeras marcas · financiación en 3 cuotas · envíos · más de 20 años. | — |
| 7 | **De Mundo Renault a Mundo Motors** | Franja corta: *Mismo equipo, mismo local, más marcas.* Años 2006 → hoy. Foto real del local. | Conocé nuestra historia (→ Quiénes Somos) |
| 8 | **Para talleres y mecánicos** | Franja corta: cuenta corriente, precios por volumen, atención prioritaria. | Soy mecánico (WhatsApp) |
| 9 | **Reseñas de Google** | Se **muestran en la web**: nota promedio, cantidad de reseñas y varias reseñas con nombre, estrellas y texto. Abajo, enlace secundario *Ver todas en Google*. | Ver todas en Google |
| 10 | **Dónde estamos** | **Imagen del mapa clickeable** que abre la ficha del local en Google Maps. Al lado: dirección, horarios y *Vení al local o escribinos.* | Cómo llegar (Google Maps) · WhatsApp |

## 2. Quiénes Somos — `/quienes-somos`

**Búsqueda objetivo:** Mundo Motors Rosario · Mundo Renault Rosario.

| # | Bloque | Contenido |
|---|---|---|
| 1 | **Portada** | Título tentativo: *De Mundo Renault a Mundo Motors: más de 20 años en repuestos*. Bajada: *No cambiamos quiénes somos. Evolucionamos.* |
| 2 | **Nuestra historia** | Línea de tiempo: **2006**, apertura en San Nicolás 1268 como Mundo Renault, proyecto familiar fundado por Luis Ángel Jorge · **2015**, mudanza a Av. Pellegrini 3971 y suma de la línea completa Chevrolet · **crecimiento**, equipo especializado · **hoy**, Mundo Motors: especialistas en Renault y Chevrolet y repuestos de mecánica multimarca. |
| 3 | **Por qué ahora somos Mundo Motors** | El cambio lo pidieron los clientes: incorporaron líneas multimarca y se capacitaron para ser referentes. Mismo equipo, mismo local, la línea completa de Renault y Chevrolet de siempre. |
| 4 | **Cómo trabajamos** | Prioridad a lo original. Política de primeras marcas para respetar la calidad de fábrica. Asesoramiento para dar con la pieza correcta. |
| 5 | **Nuestro equipo** | Foto grupal con título y bajada. *Pendiente: el cliente manda la foto más adelante.* |
| 6 | **Cierre** | Bloque de consulta rápida. |

## 3. Marcas — `/marcas`

**Búsqueda objetivo:** repuestos Renault Rosario · repuestos Chevrolet Rosario · repuestos [marca] Rosario.

| # | Bloque | Contenido |
|---|---|---|
| 1 | **Portada** | Título tentativo: *Repuestos para Renault, Chevrolet y las principales marcas*. Bajada: *Más marcas. Más opciones. La misma confianza.* |
| 2 | **Especialistas en Renault y Chevrolet** | Línea completa de las dos marcas. Bloque destacado, con un ancla por marca (`#renault`, `#chevrolet`). En Renault: *Desde 2006, cuando abrimos como Mundo Renault.* |
| 3 | **Mecánica multimarca** | Fiat · Ford · Toyota · Nissan · Citroën · Peugeot · Volkswagen. Repuestos de mecánica para todas. |
| 4 | **Marcas de repuestos** | Renault Original · Chevrolet Original · Motrio · NGK · Hutchinson · Dexco. |
| 5 | **Productos más vendidos** | **3 tarjetas**: foto, nombre, marca, aplicación y promoción si hay. Sin precio. Las actualiza el cliente una vez por mes. Cada tarjeta con botón *Consultar este producto* (WhatsApp con el nombre del producto). |
| 6 | **Originales y alternativos** | Trabajan los dos según el artículo. Priorizan lo original y las alternativas son de primera línea. |
| 7 | **Aclaración** | Línea chica: *Comercializamos repuestos de estas marcas. No somos concesionarios ni distribuidores oficiales. Mundo Renault fue nuestro nombre comercial anterior. Las marcas pertenecen a sus respectivos dueños.* |
| 8 | **Cierre** | *¿No ves tu marca o tu modelo? Consultanos.* Bloque de consulta rápida. |

## 4. Servicios — `/servicios`

**Búsqueda objetivo:** repuestos con envío Rosario · repuestos para talleres Rosario.

| # | Bloque | Contenido |
|---|---|---|
| 1 | **Portada** | Título tentativo: *Te ayudamos a encontrar el repuesto correcto*. |
| 2 | **Qué hacemos** | Asesoramiento · presupuestos sin cargo · búsqueda de repuestos a pedido · venta en el local y online · retiro en el local · envíos. |
| 3 | **Cómo consultar** | Tres pasos: 1) marca, modelo, año y motor · 2) qué repuesto necesitás · 3) te respondemos con disponibilidad y opciones. Bloque de consulta rápida. |
| 4 | **Envíos** `#envios` | Rosario y alrededores con cadetería. Resto del país por encomienda. |
| 5 | **Talleres y mecánicos** `#talleres` | Cuenta corriente · precios diferenciales por volumen · atención prioritaria · envíos al taller. Botón propio de WhatsApp con el mensaje *Soy taller/mecánico*. |
| 6 | **Medios de pago** `#pagos` | Efectivo · transferencia · tarjetas de crédito · QR. 3 cuotas sin interés con tarjetas bancarizadas (vigencia mensual). Factura A. |
| 7 | **Preguntas frecuentes** `#preguntas-frecuentes` | Se redactan a partir de las respuestas del cliente y él las valida. Incluir: *¿Mundo Motors es el mismo Mundo Renault?* (sí: mismo equipo y mismo local) · *¿Son concesionario oficial de Renault?* (no) · *No hacemos colocación ni reparaciones*. |

---

## Requisitos que salen de este mapa

- **Contenido editable por el cliente**, sin tocar código:
  - **Productos más vendidos** (página Marcas): 3 tarjetas, una vez por mes. Foto, nombre, marca, aplicación, promoción, visible/oculto.
  - **Banner de oferta:** imagen, título, texto, fecha de fin de vigencia (se oculta solo al vencer) y visible/oculto.
- **Consulta rápida a WhatsApp** reutilizable, con mensaje armado según el origen (general, oferta, producto, taller).
- **Reseñas de Google en la web.** Dos caminos, a definir en desarrollo:
  - *Recomendado:* API de Google Places desde el servidor, con caché diaria. Se actualiza solo y muestra la nota real. Requiere la ficha de Google del local, su Place ID y una clave de API. Google entrega como máximo 5 reseñas y elige cuáles. Con la caché, el uso queda muy por debajo del cupo gratuito (a verificar al configurarlo).
  - *Alternativa:* carga manual de reseñas elegidas, con enlace a Google. Sin costo ni dependencia, pero se desactualiza.
- **Mapa como imagen** (captura con estilo de marca, liviana) con enlace a la ficha de Google Maps. Sin iframe: carga más rápido y no suma cookies de terceros.
- **Datos estructurados** de comercio local con `alternateName: "Mundo Renault"`.
- **Redirección** de `mundorenault.com.ar` en la etapa 4.

## Pendientes del cliente

- [ ] Detalle de los 3 productos destacados: foto, marca, aplicación y promoción.
- [ ] Primera oferta para el banner (o arranca oculto).
- [ ] Qué incluye "ventas online": ¿solo WhatsApp o también MercadoLibre u otra tienda?
- [ ] Foto grupal del equipo.
- [ ] Validar las preguntas frecuentes cuando estén redactadas.
- [ ] Ficha de Google del local: confirmar que existe y quién la administra (para las reseñas y el enlace del mapa).
- [ ] Dominio: en la minuta del 06/11 aparece que el dominio *"era de Sansar"* y que hay que arreglarlo ahora. Falta aclarar cuál dominio es y a nombre de quién está (es una transcripción automática y puede estar mal).
- [ ] Acceso a NIC.ar y estado de `mundorenault.com.ar` (si tiene web o mails activos).
- [ ] Fotos originales sin texto: las de `contexto/IMAGENES IG/` tienen diseño de Instagram encima.

**Resueltos en la minuta del 06/11:** garantía por falla (no se muestra).

**Cambios en la etapa de Diseño:**
- **Testimonios:** Walter los sacó de todo el sitio el 09/11/2026. La prueba social queda a cargo de las reseñas de Google.
- **Para talleres (Inicio #8):** el botón es *Soy mecánico* y va a WhatsApp. *Ver condiciones* se sacó (decisión de Walter, 09/11).
- **Aclaración de Marcas (Marcas #7):** no va en la página; queda solo la aclaración legal del pie (decisión de Walter, 11/11).

## Decisiones cerradas (09/11)

- **Contacto:** va en el pie. No hay página `/contacto/`; el sitio queda en 4 páginas. Se mantiene el bloque "Dónde estamos" de Inicio con el mapa clickeable.
- **Nombre anterior:** Mundo Renault.
- **Productos más vendidos:** van en la página Marcas, no en Inicio.
