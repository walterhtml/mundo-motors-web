# Mundo Motors: instrucciones del proyecto

Sitio web de Mundo Motors (casa de repuestos automotor multimarca de Rosario, ex Mundo Renault). Quien trabaja es Walter, de Onlines. Estas reglas mandan sobre las instrucciones globales cuando se contradicen.

## Git y publicación

- **Hay una sola rama (`main`).** No se crean ramas por sesión ni ramas de prueba.
- **La única sesión que hace commit y push es «Repo».** Las demás sesiones (Servidor, Diseño, Desarrollo) editan archivos, pero no commitean, no mergean ni pushean. Si terminan algo, avisan a Walter qué archivos quedaron para que Repo los suba.
- **No hay staging.** Walter revisa cada cambio en local. Cuando lo confirma, Repo pushea y el push va a producción.
- Por eso nadie pushea algo que Walter no haya revisado y confirmado.

## Hosting

- **Cloudflare, con Workers y archivos estáticos** (no Pages). Decidido por Walter el 09/11/2026.
- La tecnología del sitio sigue sin definir y **no es WordPress**. No dar por hecho ningún stack: proponer opciones y preguntar.
- Dominios: `mundomotors.com.ar` (principal) y `mundorenault.com.ar` (redirige con 301 al principal). Los dos ya están delegados a Cloudflare.
- Los datos de la cuenta (Account ID, Zone ID) están en `servidor/cloudflare.md`, que **no se sube al repositorio** (está en `.gitignore`).
- **Nunca guardar contraseñas, tokens ni claves de API en archivos del proyecto.** El token de Cloudflare va como variable de entorno del usuario de Windows.

## Despliegue

- Si se conecta Workers Builds, la rama de producción es `main` y cada push de Repo publica. La conexión con GitHub la hace Walter en el panel de Cloudflare.
- El directorio raíz de la compilación tiene que ser la carpeta del sitio que se publica. **Está pendiente definirlo:** hoy hay un hola mundo en `servidor/hola-mundo/` y el desarrollo en `sitio/`. Hasta decidirlo, no conectar el despliegue automático.
- Antes de pedir el push, revisar en local con `wrangler dev`, que sirve los archivos con los mismos encabezados y reglas que producción.
- Cada despliegue queda como una versión en Cloudflare: si algo sale mal, se vuelve a la anterior desde el panel, sin tocar Git.
- Mientras el sitio no esté listo, se mantiene `noindex`. Sacarlo es un paso del checklist de salida (`servidor/checklist-salida.md`).
- El contenido que edita el cliente (productos, banner, testimonios) no pasa por Git. Un cambio de código que toque la estructura de esos datos se coordina con la migración de la base.
- No cambiar DNS, no crear servicios, cuentas ni claves, y no publicar sin confirmación expresa de Walter.
