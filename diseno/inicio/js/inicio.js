/* Mundo Motors · comportamiento común de las maquetas de Inicio
   - Consulta rápida: arma el mensaje y abre WhatsApp (no guarda datos)
   - Enlaces de WhatsApp con mensaje según el origen
   - Banner de oferta: se oculta solo al vencer
   - Carrusel de testimonios
   - Menú del celular */
(function () {
  "use strict";

  var WA = "5493417028284"; // 341 7028 284

  function urlWhatsApp(texto) {
    return "https://wa.me/" + WA + "?text=" + encodeURIComponent(texto);
  }

  /* Enlaces con mensaje armado: <a data-wa="Hola, ..."> */
  document.querySelectorAll("[data-wa]").forEach(function (a) {
    var msj = a.getAttribute("data-wa") || "Hola Mundo Motors, quiero hacer una consulta.";
    a.href = urlWhatsApp(msj);
    a.target = "_blank";
    a.rel = "noopener";
  });

  /* Consulta rápida */
  document.querySelectorAll("form[data-consulta]").forEach(function (form) {
    var error = form.querySelector(".form-error") || form.parentElement.querySelector(".form-error");
    form.addEventListener("submit", function (e) {
      e.preventDefault();
      var d = new FormData(form);
      var v = function (k) { return String(d.get(k) || "").trim(); };
      if (!v("marca") || !v("repuesto")) {
        if (error) error.textContent = "Completá al menos la marca y el repuesto que buscás.";
        (v("marca") ? form.elements.repuesto : form.elements.marca).focus();
        return;
      }
      if (error) error.textContent = "";
      var lineas = ["Hola Mundo Motors, quiero consultar por un repuesto:"];
      [["marca", "Marca"], ["modelo", "Modelo"], ["anio", "Año"], ["motor", "Motor"], ["repuesto", "Repuesto"]].forEach(function (c) {
        if (v(c[0])) lineas.push("• " + c[1] + ": " + v(c[0]));
      });
      window.open(urlWhatsApp(lineas.join("\n")), "_blank", "noopener");
    });
  });

  /* Oferta con vigencia: data-vence="AAAA-MM-DD" (incluye ese día) */
  document.querySelectorAll("[data-oferta]").forEach(function (el) {
    var vence = el.getAttribute("data-vence");
    if (!vence) return;
    var fin = new Date(vence + "T23:59:59-03:00");
    if (Date.now() > fin.getTime()) el.hidden = true;
  });

  /* Carrusel */
  document.querySelectorAll("[data-carrusel]").forEach(function (c) {
    var pista = c.querySelector(".carrusel__pista");
    var prev = c.querySelector("[data-prev]");
    var next = c.querySelector("[data-next]");
    var puntos = c.querySelector(".carrusel__puntos");
    var items = Array.prototype.slice.call(pista.children);
    if (puntos) {
      items.forEach(function () { puntos.appendChild(document.createElement("span")); });
    }
    function paso() {
      var a = items[0], b = items[1];
      return b ? b.offsetLeft - a.offsetLeft : pista.clientWidth;
    }
    function actualizar() {
      var max = pista.scrollWidth - pista.clientWidth - 2;
      if (prev) prev.disabled = pista.scrollLeft <= 2;
      if (next) next.disabled = pista.scrollLeft >= max;
      if (puntos) {
        var i = Math.round(pista.scrollLeft / paso());
        if (pista.scrollLeft >= max) i = items.length - 1;
        Array.prototype.forEach.call(puntos.children, function (p, j) { p.classList.toggle("activo", j === i); });
      }
    }
    if (prev) prev.addEventListener("click", function () { pista.scrollBy({ left: -paso(), behavior: "smooth" }); });
    if (next) next.addEventListener("click", function () { pista.scrollBy({ left: paso(), behavior: "smooth" }); });
    pista.addEventListener("scroll", function () { window.requestAnimationFrame(actualizar); }, { passive: true });
    window.addEventListener("resize", actualizar);
    actualizar();
  });

  /* Selector de versión del pie (solo maqueta).
     Las páginas con <html data-pie-fijo="1"> usan siempre ese pie (el elegido) y no guardan nada. */
  var pieFijo = document.documentElement.getAttribute("data-pie-fijo");
  var pieGuardado = pieFijo || new URLSearchParams(location.search).get("pie");
  if (!pieGuardado) { try { pieGuardado = localStorage.getItem("mm-pie"); } catch (e) {} }
  function ponerPie(n) {
    document.documentElement.setAttribute("data-pie", n);
    document.querySelectorAll("[data-pie-set]").forEach(function (b) {
      b.setAttribute("aria-pressed", String(b.getAttribute("data-pie-set") === n));
    });
    if (!pieFijo) { try { localStorage.setItem("mm-pie", n); } catch (e) {} }
  }
  ponerPie(/^[123]$/.test(pieGuardado || "") ? pieGuardado : "1");
  document.querySelectorAll("[data-pie-set]").forEach(function (b) {
    b.addEventListener("click", function () { ponerPie(b.getAttribute("data-pie-set")); });
  });

  /* Encabezado: marca cuando la página bajó */
  var cab = document.querySelector("[data-cab]");
  if (cab) {
    var marcar = function () { cab.classList.toggle("bajo", window.scrollY > 24); };
    window.addEventListener("scroll", marcar, { passive: true });
    marcar();
  }

  /* Aparición suave de secciones (respeta «reducir movimiento») */
  var revelar = document.querySelectorAll("[data-revelar]");
  if (revelar.length && "IntersectionObserver" in window && !window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
    document.documentElement.classList.add("revela");
    var io = new IntersectionObserver(function (entradas) {
      entradas.forEach(function (en) {
        if (en.isIntersecting) { en.target.classList.add("visible"); io.unobserve(en.target); }
      });
    }, { rootMargin: "0px 0px -8% 0px", threshold: 0.08 });
    revelar.forEach(function (el) { io.observe(el); });
  }

  /* Días que quedan de la oferta: <b data-dias> dentro de [data-oferta] */
  document.querySelectorAll("[data-oferta] [data-dias]").forEach(function (el) {
    var o = el.closest("[data-oferta]");
    var fin = new Date(o.getAttribute("data-vence") + "T23:59:59-03:00");
    el.textContent = Math.max(0, Math.ceil((fin - Date.now()) / 86400000));
  });

  /* Menú del celular */
  document.querySelectorAll("[data-menu-toggle]").forEach(function (btn) {
    var nav = document.getElementById(btn.getAttribute("aria-controls"));
    btn.addEventListener("click", function () {
      var abierto = btn.getAttribute("aria-expanded") === "true";
      btn.setAttribute("aria-expanded", String(!abierto));
      nav.classList.toggle("abierto", !abierto);
    });
  });
})();
