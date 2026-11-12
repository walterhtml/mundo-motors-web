// Mundo Motors · arma el sitio estático en public/ a partir de src/.
// Uso: node armar.js              → armado de prueba (páginas con noindex)
//      node armar.js --produccion → armado para publicar (falla si queda contenido de ejemplo)
// Sin dependencias: solo Node.
"use strict";
const fs = require("fs");
const path = require("path");
const crypto = require("crypto");

const PRODUCCION = process.argv.includes("--produccion");
// Decisión de Walter (11/11/2026): publicar aunque queden la oferta y los productos de ejemplo
const PERMITIR_EJEMPLO = process.argv.includes("--permitir-ejemplo");
const SRC = path.join(__dirname, "src");
const OUT = path.join(__dirname, "public");
const ZONA = "America/Argentina/Buenos_Aires";

const leer = (p) => fs.readFileSync(path.join(SRC, p), "utf8").replace(/\r\n/g, "\n");
const json = (p) => JSON.parse(leer(p));
const escribir = (p, t) => { fs.mkdirSync(path.dirname(path.join(OUT, p)), { recursive: true }); fs.writeFileSync(path.join(OUT, p), t); };
const huella = (t) => crypto.createHash("md5").update(t).digest("hex").slice(0, 8);
const esc = (v) => String(v).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
const hoy = () => new Date().toLocaleDateString("en-CA", { timeZone: ZONA }); // AAAA-MM-DD en Argentina
const avisos = [];

// ---------- Datos ----------
const local = json("datos/local.json");
const oferta = json("datos/oferta.json");
const resenas = json("datos/resenas.json");
const productos = json("datos/productos.json");
const preguntas = json("datos/preguntas.json");
const urlWhatsApp = (texto) => `https://wa.me/${local.whatsapp}?text=${encodeURIComponent(texto)}`;

// ---------- Limpieza y archivos que se copian tal cual ----------
fs.rmSync(OUT, { recursive: true, force: true });
fs.cpSync(path.join(SRC, "estaticos"), OUT, { recursive: true });

// CSS común en un solo archivo; cada página puede sumar el suyo (src/css/<nombre>.css)
const COMUNES = ["base.css", "pie.css", "sitio.css"];
const cssSitio = COMUNES.map((f) => leer("css/" + f)).join("\n");
escribir("css/sitio.css", cssSitio);
const jsSitio = leer("js/sitio.js");
escribir("js/sitio.js", jsSitio);
const version = { sitio_css: huella(cssSitio), sitio_js: huella(jsSitio) };

// ---------- Partes ----------
const partes = {};
for (const f of fs.readdirSync(path.join(SRC, "partes"))) partes[f.replace(/\.(html|svg)$/, "")] = leer("partes/" + f);

// ---------- Bloques armados desde los datos ----------
const MESES = ["enero", "febrero", "marzo", "abril", "mayo", "junio", "julio", "agosto", "septiembre", "octubre", "noviembre", "diciembre"];

function bloqueOferta() {
  if (!oferta.visible) return "";
  if (oferta.vence && oferta.vence < hoy()) { avisos.push(`La oferta venció el ${oferta.vence}: no se publica.`); return ""; }
  if (oferta.ejemplo) avisos.push("La oferta es de ejemplo (datos/oferta.json): reemplazarla antes de publicar.");
  const [, m, d] = (oferta.vence || "").split("-").map(Number);
  const nombre = `${oferta.titulo} ${oferta.titulo_destacado}`.trim();
  const vigencia = oferta.vence ? `
            <span><svg class="icono"><use href="#i-reloj"/></svg>Quedan <b data-dias>—</b> días</span>
            <span>Vigente hasta el ${d} de ${MESES[m - 1]}</span>` : "";
  return `  <section class="sec" aria-labelledby="h-oferta" data-oferta${oferta.vence ? ` data-vence="${esc(oferta.vence)}"` : ""} style="padding-bottom:0">
    <div class="contenedor" data-revelar>
      <article class="oferta fondo-oscuro">
        <div class="oferta__txt">
          <span class="oferta__tag">${esc(oferta.etiqueta || "Oferta")}</span>
          <h2 class="titulo" id="h-oferta">${esc(oferta.titulo)}${oferta.titulo_destacado ? ` <em>${esc(oferta.titulo_destacado)}</em>` : ""}</h2>
          <p class="lead">${esc(oferta.texto)}</p>
          <div class="oferta__meta">${vigencia}
          </div>
          <a class="btn btn--primario" data-wa="${esc(`Hola Mundo Motors, quiero consultar por la oferta: ${nombre}.`)}"><svg class="icono icono--relleno"><use href="#i-wa"/></svg>Consultar esta oferta</a>
        </div>
        <div class="oferta__foto"><img src="${esc(oferta.imagen)}" width="${oferta.imagen_ancho}" height="${oferta.imagen_alto}" alt="${esc(oferta.imagen_alt)}" loading="lazy" decoding="async"></div>
      </article>
    </div>
  </section>`;
}

function estrellas(n, etiqueta) {
  let s = "";
  for (let i = 1; i <= 5; i++) s += `<svg${i > Math.round(n) ? ' style="opacity:.3"' : ""}><use href="#i-estrella"/></svg>`;
  return `<span class="estrellas" role="img" aria-label="${esc(etiqueta)}">${s}</span>`;
}

// Avatar de la reseña: foto de su perfil de Google si se cargó, o iniciales sobre el color que le da Google
function avatar(r, ini) {
  if (r.foto) return `<img class="resena__foto" src="${esc(r.foto)}" width="96" height="96" alt="" loading="lazy" decoding="async">`;
  const estilo = /^#[0-9a-f]{6}$/i.test(r.color || "") ? ` style="background:${r.color};color:#fff"` : "";
  return `<span class="resena__ini" aria-hidden="true"${estilo}>${esc(ini)}</span>`;
}

function bloqueResenas() {
  // Sin nota no hay bloque. Sin reseñas cargadas, se muestra solo el resumen (nota, cantidad y enlace a Google).
  if (!resenas.nota || !resenas.cantidad || !resenas.url) return "";
  // Se pueden cargar todas las que se quieran: el Inicio muestra las 3 primeras (ordenar de la más reciente a la más antigua)
  const lista = (resenas.lista || []).slice(0, 3);
  if (resenas.ejemplo) avisos.push("Las reseñas son de ejemplo (datos/resenas.json): no se publican inventadas.");
  if (!lista.length) avisos.push("No hay reseñas cargadas (datos/resenas.json): el Inicio muestra solo la nota y la cantidad de Google.");
  // Carga manual: se actualizan una vez por mes copiándolas de la ficha de Google
  const dias = Math.floor((Date.parse(hoy()) - Date.parse(resenas.actualizado)) / 86400000);
  if (!(dias >= 0)) throw new Error("datos/resenas.json: «actualizado» tiene que ser una fecha AAAA-MM-DD");
  if (dias > 31) avisos.push(`Las reseñas se actualizaron hace ${dias} días (${resenas.actualizado}): copiar las nuevas de Google.`);
  const nota = String(resenas.nota).replace(".", ",");
  const items = lista.map((r, i) => {
    if (!r.autor || !r.texto || !(r.estrellas >= 1 && r.estrellas <= 5) || !/^\d{4}-\d{2}$/.test(r.fecha || "")) {
      throw new Error(`datos/resenas.json: la reseña ${i + 1} necesita autor, texto, estrellas (1 a 5) y fecha AAAA-MM`);
    }
    const [a, m] = r.fecha.split("-").map(Number);
    const mes = MESES[m - 1];
    const ini = r.autor.trim()[0].toUpperCase(); // una sola inicial, la del nombre
    return `          <li class="resena">${estrellas(r.estrellas, `${r.estrellas} de 5 estrellas`)}<p>${esc(r.texto)}</p><div class="resena__autor">${avatar(r, ini)}<div><b>${esc(r.autor)}</b><small><time datetime="${r.fecha}">${mes[0].toUpperCase() + mes.slice(1)} de ${a}</time></small></div></div></li>`;
  }).join("\n");
  return `  <section class="sec sec--gris" aria-labelledby="h-resenas">
    <div class="contenedor" data-revelar>
      <div class="cabecera"><div><span class="ante">Reseñas</span><h2 class="titulo" id="h-resenas">Nos califican <em>en Google</em></h2></div></div>
      <div class="resenas${lista.length ? "" : " resenas--resumen"}">
        <div class="resumen fondo-oscuro">
          <span class="google" role="img" aria-label="Google"><i class="g1">G</i><i class="g2">o</i><i class="g3">o</i><i class="g1">g</i><i class="g4">l</i><i class="g2">e</i></span>
          <p class="nota">${nota}<small>/ 5</small></p>
          ${estrellas(resenas.nota, `${nota} de 5 estrellas`)}
          <p>Promedio de ${esc(Number(resenas.cantidad).toLocaleString("es-AR"))} reseñas.</p>
          <a class="enlace" href="${esc(resenas.url)}" target="_blank" rel="noopener">Ver todas en Google <svg class="icono"><use href="#i-flecha"/></svg></a>
        </div>${lista.length ? `
        <ul class="resenas__lista">
${items}
        </ul>` : ""}
      </div>
    </div>
  </section>`;
}

// Productos más vendidos (Marcas): solo los visibles; sin ninguno, no hay sección ni botón en la portada
const productosVisibles = (productos.productos || []).filter((p) => p.visible);

function bloqueProductos() {
  if (!productosVisibles.length) { avisos.push("No hay productos visibles (datos/productos.json): Marcas sale sin «Más vendidos»."); return ""; }
  if (productos.ejemplo) avisos.push("Los productos más vendidos son de ejemplo (datos/productos.json): reemplazarlos antes de publicar.");
  const items = productosVisibles.map((p) => `        <li class="producto">
          <div class="producto__img">${p.promocion ? `<span class="producto__promo">${esc(p.promocion)}</span>` : ""}<img src="${esc(p.imagen)}" width="${p.imagen_ancho}" height="${p.imagen_alto}" alt="${esc(p.imagen_alt)}" loading="lazy" decoding="async"></div>
          <div class="producto__txt">
            <span class="producto__marca">${esc(p.marca)}</span>
            <h3>${esc(p.nombre)}</h3>
            <p class="producto__uso"><b>Para:</b> ${esc(p.aplicacion)}</p>
            <a class="btn btn--primario" data-wa="${esc(`Hola Mundo Motors, quiero consultar por este producto: ${p.nombre} (${p.marca}).`)}"><svg class="icono icono--relleno"><use href="#i-wa"/></svg>Consultar este producto</a>
          </div>
        </li>`).join("\n");
  return `  <section class="sec sec--gris" id="mas-vendidos" aria-labelledby="h-productos">
    <div class="contenedor" data-revelar>
      <div class="cabecera">
        <div><span class="ante">Más vendidos</span><h2 class="titulo" id="h-productos">Los más pedidos <em>del mes</em></h2></div>
        <p class="lead">Una selección que actualizamos todos los meses. Consultá disponibilidad por WhatsApp.</p>
      </div>
      <ul class="productos">
${items}
      </ul>
    </div>
  </section>`;
}

// Preguntas frecuentes (Servicios): la misma fuente arma la lista y los datos estructurados FAQPage
function bloquePreguntas() {
  return (preguntas.preguntas || []).map((q) => {
    const enlace = q.enlace ? ` <a href="${esc(q.enlace.href)}">${esc(q.enlace.texto)}</a>.` : "";
    return `        <details><summary>${esc(q.pregunta)}<svg class="icono"><use href="#i-mas"/></svg></summary><p>${esc(q.respuesta)}${enlace}</p></details>`;
  }).join("\n");
}

function bloqueInstagram() {
  if (!local.instagram_url) { avisos.push("Falta el enlace de Instagram (datos/local.json): no se muestra en el pie."); return ""; }
  return `<li><svg class="icono"><use href="#i-ig"/></svg><a href="${esc(local.instagram_url)}" target="_blank" rel="noopener">Instagram · ${esc(local.instagram_texto)}</a></li>`;
}

// Datos estructurados: el comercio (con su nombre anterior) y el sitio
function jsonld(pagina) {
  const d = local.dominio;
  const negocio = {
    "@type": "AutoPartsStore",
    "@id": d + "/#negocio",
    name: local.nombre,
    alternateName: local.nombre_anterior,
    slogan: local.lema,
    description: "Repuestos automotor multimarca en Rosario. Especialistas en Renault y Chevrolet. Antes Mundo Renault.",
    url: d + "/",
    logo: d + "/img/logo-mundo-motors.png",
    image: d + "/img/mostrador-marcas.webp",
    telephone: "+" + local.whatsapp,
    foundingDate: local.fundacion,
    address: { "@type": "PostalAddress", streetAddress: local.direccion, addressLocality: local.ciudad, addressRegion: local.provincia, addressCountry: local.pais },
    hasMap: local.mapa_url,
    areaServed: { "@type": "City", name: local.ciudad },
    openingHoursSpecification: local.horarios_schema.map((h) => ({ "@type": "OpeningHoursSpecification", dayOfWeek: h.dias, opens: h.abre, closes: h.cierra })),
    paymentAccepted: "Efectivo, transferencia, tarjetas de crédito, QR",
    currenciesAccepted: "ARS",
  };
  if (local.instagram_url) negocio.sameAs = [local.instagram_url];
  const sitio = { "@type": "WebSite", "@id": d + "/#sitio", url: d + "/", name: local.nombre, alternateName: local.nombre_anterior, inLanguage: "es-AR", publisher: { "@id": d + "/#negocio" } };
  const web = { "@type": pagina.faq ? ["WebPage", "FAQPage"] : "WebPage", "@id": pagina.url + "#pagina", url: pagina.url, name: pagina.titulo, description: pagina.descripcion, inLanguage: "es-AR", isPartOf: { "@id": d + "/#sitio" }, about: { "@id": d + "/#negocio" } };
  if (pagina.faq) {
    web.mainEntity = preguntas.preguntas.map((q) => ({ "@type": "Question", name: q.pregunta, acceptedAnswer: { "@type": "Answer", text: q.respuesta } }));
  }
  const grafo = [negocio, sitio, web];
  if (pagina.ruta !== "/") {
    web.breadcrumb = { "@id": pagina.url + "#migas" };
    grafo.push({ "@type": "BreadcrumbList", "@id": pagina.url + "#migas", itemListElement: [
      { "@type": "ListItem", position: 1, name: "Inicio", item: d + "/" },
      { "@type": "ListItem", position: 2, name: pagina.nombre, item: pagina.url },
    ] });
  }
  const datos = JSON.stringify({ "@context": "https://schema.org", "@graph": grafo }).replace(/</g, "\\u003c");
  return `<script type="application/ld+json">${datos}</script>`;
}

// ---------- Plantillas ----------
// {{> parte}} incluye src/partes/parte.html · {{{x.y}}} inserta HTML · {{x.y}} inserta texto escapado
function valor(ctx, ruta, archivo) {
  const v = ruta.split(".").reduce((o, k) => (o == null ? undefined : o[k]), ctx);
  if (v === undefined) throw new Error(`${archivo}: no existe el dato {{${ruta}}}`);
  return v;
}
function render(t, ctx, archivo) {
  t = t.replace("{{{contenido}}}", () => ctx.contenido);
  t = t.replace(/\{\{>\s*([\w-]+)\s*\}\}/g, (_, n) => { if (!(n in partes)) throw new Error(`${archivo}: no existe la parte ${n}`); return partes[n]; });
  t = t.replace(/\{\{\{\s*([\w.]+)\s*\}\}\}/g, (_, r) => String(valor(ctx, r, archivo)));
  t = t.replace(/\{\{\s*([\w.]+)\s*\}\}/g, (_, r) => esc(valor(ctx, r, archivo)));
  return t;
}
const desescapar = (s) => s.replace(/&quot;/g, '"').replace(/&#39;/g, "'").replace(/&lt;/g, "<").replace(/&gt;/g, ">").replace(/&amp;/g, "&");

// ---------- Páginas ----------
const paginas = [];
const bloque = {
  oferta: bloqueOferta(),
  resenas: bloqueResenas(),
  instagram: bloqueInstagram(),
  productos: bloqueProductos(),
  productos_boton: productosVisibles.length ? '<a class="btn btn--vidrio btn--grande" href="#mas-vendidos">Más vendidos</a>' : "",
  preguntas: bloquePreguntas(),
};

for (const archivo of fs.readdirSync(path.join(SRC, "paginas")).filter((f) => f.endsWith(".html"))) {
  const fuente = leer("paginas/" + archivo);
  const m = fuente.match(/^<!--(\{[\s\S]*?\})-->\n?/);
  if (!m) throw new Error(`${archivo}: falta el bloque de datos <!--{ ... }--> al principio`);
  const meta = JSON.parse(m[1]);
  const pagina = { ...meta, url: local.dominio + meta.ruta };
  pagina.imagen = local.dominio + meta.imagen;
  pagina.robots = PRODUCCION ? "" : '<meta name="robots" content="noindex">';
  pagina.css = meta.css ? `<link rel="stylesheet" href="/css/${meta.css}.css?v=${huella(leer(`css/${meta.css}.css`))}">` : "";
  pagina.precarga = meta.precarga ? `<link rel="preload" as="image" href="${esc(meta.precarga)}" fetchpriority="high">` : "";
  pagina.jsonld = jsonld(pagina);
  if (meta.css) escribir(`css/${meta.css}.css`, leer(`css/${meta.css}.css`));

  let html = render(partes.documento, { local, pagina, bloque, version, anio: hoy().slice(0, 4), contenido: fuente.slice(m[0].length).trimEnd() }, archivo);

  // Menú: marca la página actual
  html = html.replace(new RegExp(`<a data-menu href="${meta.ruta.replace(/[/]/g, "\\/")}"`, "g"), `<a href="${meta.ruta}" aria-current="page"`).replace(/<a data-menu /g, "<a ");
  // Enlaces de WhatsApp: data-wa="mensaje" → enlace armado (funciona sin JavaScript y se puede rastrear)
  html = html.replace(/<a\b([^>]*?)\sdata-wa="([^"]*)"([^>]*)>/g, (_, a, msj, b) => `<a${a} href="${esc(urlWhatsApp(desescapar(msj)))}" target="_blank" rel="noopener"${b}>`);
  // Íconos decorativos: ocultos para lectores de pantalla
  html = html.replace(/<svg class="(icono[^"]*)"(?![^>]*aria-hidden)/g, '<svg class="$1" aria-hidden="true"');

  const salida = meta.ruta === "/" ? "index.html" : meta.ruta.replace(/^\//, "") + ".html";
  escribir(salida, html);
  paginas.push({ url: pagina.url, modificada: fs.statSync(path.join(SRC, "paginas", archivo)).mtime.toISOString().slice(0, 10), salida });
}

// ---------- sitemap.xml, robots.txt y _headers ----------
paginas.sort((a, b) => a.url.length - b.url.length);
escribir("sitemap.xml", `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${paginas.map((p) => `  <url><loc>${p.url}</loc><lastmod>${p.modificada}</lastmod></url>`).join("\n")}
</urlset>
`);
escribir("robots.txt", `User-agent: *
Allow: /

Sitemap: ${local.dominio}/sitemap.xml
`);
escribir("_headers", `/*
  X-Content-Type-Options: nosniff
  Referrer-Policy: strict-origin-when-cross-origin
  Permissions-Policy: camera=(), microphone=(), geolocation=(), payment=(), usb=()
  X-Frame-Options: DENY
  Content-Security-Policy: default-src 'self'; script-src 'self'; style-src 'self' 'unsafe-inline' https://fonts.googleapis.com; font-src https://fonts.gstatic.com; img-src 'self' data:; connect-src 'self'; frame-ancestors 'none'; base-uri 'self'; form-action 'self'; object-src 'none'; upgrade-insecure-requests

/css/*
  Cache-Control: public, max-age=31536000, immutable

/js/*
  Cache-Control: public, max-age=31536000, immutable

/img/*
  Cache-Control: public, max-age=604800
`);

// ---------- Resumen ----------
console.log(`Armado ${PRODUCCION ? "para publicar" : "de prueba (noindex)"} en public/: ${paginas.map((p) => p.salida).join(", ")}`);
for (const a of avisos) console.log("  ! " + a);
if (PRODUCCION && PERMITIR_EJEMPLO && avisos.length) console.log("  Se publica igual, con --permitir-ejemplo.");
if (PRODUCCION && !PERMITIR_EJEMPLO && (oferta.ejemplo && oferta.visible || resenas.ejemplo || productos.ejemplo && productosVisibles.length)) {
  console.error("No se publica: hay contenido de ejemplo. Reemplazalo en src/datos/ o poné \"visible\": false en la oferta.");
  process.exit(1);
}
