/* Mundo Motors · comportamiento común del sitio
   - Consulta rápida: arma el mensaje y abre WhatsApp (no guarda datos)
   - Oferta con vigencia: se oculta sola al vencer y cuenta los días que quedan
   - Encabezado que cambia al bajar, aparición suave de secciones y menú del celular
   Los enlaces de WhatsApp ya vienen armados en el HTML (los genera armar.js). */
(function () {
  "use strict";

  var WA = document.documentElement.getAttribute("data-wa") || "";

  function urlWhatsApp(texto) {
    return "https://wa.me/" + WA + "?text=" + encodeURIComponent(texto);
  }

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
      var origen = form.getAttribute("data-consulta");
      var lineas = [origen ? "Hola Mundo Motors, " + origen + ":" : "Hola Mundo Motors, quiero consultar por un repuesto:"];
      [["marca", "Marca"], ["modelo", "Modelo"], ["anio", "Año"], ["motor", "Motor"], ["repuesto", "Repuesto"]].forEach(function (c) {
        if (v(c[0])) lineas.push("• " + c[1] + ": " + v(c[0]));
      });
      window.open(urlWhatsApp(lineas.join("\n")), "_blank", "noopener");
    });
  });

  /* Oferta con vigencia: data-vence="AAAA-MM-DD" (incluye ese día, hora de Argentina).
     El HTML se arma sin la oferta si ya venció; esto cubre los días entre un armado y otro. */
  document.querySelectorAll("[data-oferta]").forEach(function (el) {
    var vence = el.getAttribute("data-vence");
    if (!vence) return;
    var fin = new Date(vence + "T23:59:59-03:00");
    if (Date.now() > fin.getTime()) { el.hidden = true; return; }
    el.querySelectorAll("[data-dias]").forEach(function (d) {
      d.textContent = Math.max(0, Math.ceil((fin - Date.now()) / 86400000));
    });
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

  /* Menú del celular: abre y cierra con el botón; Escape lo cierra y devuelve el foco */
  document.querySelectorAll("[data-menu-toggle]").forEach(function (btn) {
    var nav = document.getElementById(btn.getAttribute("aria-controls"));
    function poner(abierto) {
      btn.setAttribute("aria-expanded", String(abierto));
      nav.classList.toggle("abierto", abierto);
    }
    btn.addEventListener("click", function () { poner(btn.getAttribute("aria-expanded") !== "true"); });
    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape" && btn.getAttribute("aria-expanded") === "true") { poner(false); btn.focus(); }
    });
    nav.addEventListener("click", function (e) { if (e.target.closest("a")) poner(false); });
  });
})();
