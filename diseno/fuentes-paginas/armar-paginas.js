// Uso: node armar-paginas.js <carpeta diseno/inicio> <archivo1.html> [archivo2.html ...]
// Arma las páginas internas a partir de su plantilla (en esta carpeta) y de las partes comunes del Inicio
// (a-premium-2.html): sprite de íconos, encabezado, pie y botón flotante. Así todas quedan iguales al Inicio.
// Marcadores en la plantilla: {{SPRITE}} {{BARRA}} {{CABECERA}} {{PIE}} {{WA}}
const fs = require("fs");
const path = require("path");
const [, , dir, ...archivos] = process.argv;
const home = fs.readFileSync(path.join(dir, "a-premium-2.html"), "utf8");

function parte(ini, fin) {
  const a = home.indexOf(ini);
  if (a < 0) throw new Error("No encontré en el Inicio: " + ini);
  const b = home.indexOf(fin, a);
  if (b < 0) throw new Error("No encontré el cierre de: " + ini);
  return home.slice(a, b + fin.length);
}

// Íconos que usan las páginas internas y no el Inicio
const extra = `
  <!-- Íconos de las páginas internas -->
  <symbol id="i-doc" viewBox="0 0 24 24"><path d="M6 3h9l4 4v14H6z"/><path d="M14 3v5h5M9 13h7M9 17h5"/></symbol>
  <symbol id="i-lupa" viewBox="0 0 24 24"><circle cx="11" cy="11" r="6.5"/><path d="M16 16l5 5"/></symbol>
  <symbol id="i-tienda" viewBox="0 0 24 24"><path d="M4 9l1.5-5h13L20 9"/><path d="M4 9h16v2.5a2.7 2.7 0 0 1-5.3 0 2.7 2.7 0 0 1-5.4 0A2.7 2.7 0 0 1 4 11.5z"/><path d="M5.5 14v7h13v-7M10 21v-4h4v4"/></symbol>
  <symbol id="i-caja" viewBox="0 0 24 24"><path d="M3 7.5L12 3l9 4.5v9L12 21l-9-4.5z"/><path d="M3 7.5l9 4.5 9-4.5M12 12v9"/></symbol>
  <symbol id="i-bujia" viewBox="0 0 24 24"><path d="M12 2v3"/><rect x="9" y="5" width="6" height="4" rx="1"/><path d="M10 9v3h4V9"/><rect x="8.5" y="12" width="7" height="5" rx="1"/><path d="M12 17v2.5M9.5 21.5h5"/></symbol>
  <symbol id="i-alerta" viewBox="0 0 24 24"><path d="M12 3.5l9.5 16.5h-19z"/><path d="M12 10v4.5M12 17.4v.2"/></symbol>
  <symbol id="i-mas" viewBox="0 0 24 24"><path d="M12 5v14M5 12h14"/></symbol>
  <symbol id="i-equipo" viewBox="0 0 24 24"><circle cx="9" cy="8" r="3.2"/><path d="M3 20c0-3.3 2.7-6 6-6s6 2.7 6 6"/><circle cx="17" cy="9" r="2.6"/><path d="M15.5 14.2A5 5 0 0 1 21 19"/></symbol>
  <symbol id="i-efectivo" viewBox="0 0 24 24"><rect x="2.5" y="6" width="19" height="12" rx="2"/><circle cx="12" cy="12" r="2.6"/><path d="M6 9.5v5M18 9.5v5"/></symbol>
  <symbol id="i-transfer" viewBox="0 0 24 24"><path d="M4 8h15l-3.5-3.5M20 16H5l3.5 3.5"/></symbol>
  <symbol id="i-qr" viewBox="0 0 24 24"><rect x="3" y="3" width="7" height="7" rx="1"/><rect x="14" y="3" width="7" height="7" rx="1"/><rect x="3" y="14" width="7" height="7" rx="1"/><path d="M14 14h3v3h-3zM18 18h3v3h-3zM14 20.5h2M20.5 14v2"/></symbol>
  <symbol id="i-info" viewBox="0 0 24 24"><circle cx="12" cy="12" r="9"/><path d="M12 11v6M12 7.6v.2"/></symbol>
`;

let sprite = parte('<svg width="0" height="0"', "</svg>");
sprite = sprite.replace(/<\/svg>$/, extra + "</svg>");
const cabecera = parte('<header class="cab" data-cab>', "</header>").replace(/ aria-current="page"/g, "");
const pie = parte('<footer class="pie">', "</footer>");
const wa = parte('<a class="wa-flotante"', "</a>");

const paginas = [["a-premium-2.html", "Inicio"], ["quienes-somos.html", "Quiénes somos"], ["marcas.html", "Marcas"], ["servicios.html", "Servicios"]];

for (const archivo of archivos) {
  let t = fs.readFileSync(path.join(__dirname, archivo), "utf8");
  const enlaces = paginas.map(([h, n]) => `<a href="${h}"${h === archivo ? ' aria-current="page"' : ""}>${n}</a>`).join("\n  ");
  const barra = `<nav class="maqueta-barra" aria-label="Páginas de la maqueta">\n  <span>Maqueta · Sitio</span>\n  <a href="index.html">Índice</a>\n  ${enlaces}\n</nav>`;
  const cab = cabecera.replace(`<a href="${archivo}">`, `<a href="${archivo}" aria-current="page">`);
  if (cab === cabecera) throw new Error("El menú no tiene enlace a " + archivo);
  for (const [marca, valor] of [["{{SPRITE}}", sprite], ["{{BARRA}}", barra], ["{{CABECERA}}", cab], ["{{PIE}}", pie], ["{{WA}}", wa]]) {
    if (!t.includes(marca)) throw new Error(`Falta ${marca} en ${archivo}`);
    t = t.replace(marca, () => valor);
  }
  fs.writeFileSync(path.join(dir, archivo), t);
  console.log("Armada", archivo);
}
