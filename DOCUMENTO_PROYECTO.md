# Documento del proyecto web: Ruta Andina

**Nombre del proyecto:** Ruta Andina
**Tipo de proyecto:** sitio web informativo y formulario de solicitud de reserva
**Fecha:** octubre de 2026

## 1. Descripción

Ruta Andina es un sitio web para presentar expediciones y experiencias de turismo en Bolivia. Permite conocer información de cada ruta, comparar duración, dificultad y precio, y enviar una solicitud de reserva para que el equipo pueda dar seguimiento.

El sitio es público y está pensado para funcionar en teléfonos, tabletas y computadoras. Su contenido está en español y destaca el paisaje, la cultura y el turismo responsable en distintas regiones bolivianas.

## 2. Objetivos

- Presentar Ruta Andina y su enfoque de conexión respetuosa con los paisajes y culturas andinas.
- Dar a conocer un catálogo claro de expediciones y sus datos principales.
- Facilitar el contacto inicial con un formulario de solicitud de reserva.
- Guardar las solicitudes recibidas en Supabase.
- Ofrecer una experiencia web adaptable a distintos tamaños de pantalla y accesible desde una URL pública.

## 3. Público al que está dirigido

Personas interesadas en viajar por Bolivia y conocer sus paisajes, historia y cultura mediante expediciones guiadas. Incluye tanto a quienes buscan recorridos de dificultad fácil como a quienes prefieren caminatas, aventura y experiencias de mayor exigencia.

## 4. Catálogo de experiencias

Los precios indicados son los publicados en el sitio y corresponden a una persona.

| Experiencia | Duración | Dificultad | Precio |
|---|---|---|---:|
| Expedición Altiplánica Uyuni y Reserva Eduardo Abaroa | 3 días / 2 noches | Fácil | 800 Bs. |
| Circuito Cultural y Termal Sajama | 2 días / 1 noche | Fácil a medio | 550 Bs. |
| Travesía Sagrada del Lago e Imperio Inca | 3 días / 2 noches | Medio | 700 Bs. |
| Ruta de Sabores, Tradición y Viñedos de Luribay | 2 días / 1 noche o Full Day | Fácil | 550 Bs. |
| Expedición Jurásica y Espeleología en Toro Toro | 3 días / 2 noches | Exigente | 950 Bs. |

Al abrir los detalles de una experiencia se muestran una descripción, altitud, tamaño máximo de grupo e inclusiones. El catálogo también puede filtrarse por nivel de dificultad. Las fechas se proponen como fecha estimada en el formulario; el sitio no publica actualmente un calendario de salidas programadas.

## 5. Funcionamiento del formulario y Supabase

El formulario de solicitud pide nombre, correo electrónico, teléfono, fecha estimada, experiencia seleccionada y, de manera opcional, requerimientos alimenticios o de salud. Los campos obligatorios tienen validación de navegador. Mientras se envía la solicitud, el botón indica el estado de carga; al terminar, el sitio presenta un mensaje de éxito o de error.

La aplicación React usa el SDK oficial `@supabase/supabase-js` para insertar cada solicitud en `public.expedition_reservations`. La tabla almacena:

- Nombre completo
- Correo electrónico
- Teléfono
- Fecha estimada
- Identificador de la experiencia
- Requerimientos opcionales
- Fecha y hora de creación

La migración activa Row Level Security (RLS), valida los datos y permite insertar solicitudes desde el navegador. No permite a visitantes leer, modificar ni eliminar registros mediante la clave pública del sitio.

La URL de Supabase y la clave `anon`/publishable se configuran localmente en `.env.local` con las variables `VITE_SUPABASE_URL` y `VITE_SUPABASE_ANON_KEY`. La clave pública puede formar parte del bundle del navegador; no se debe usar ni publicar una clave `service_role` en el frontend.

## 6. Tecnologías

- **React y JSX:** interfaz y componentes reutilizables.
- **Vite:** servidor de desarrollo y compilación para producción.
- **Material UI (MUI):** componentes de formulario, navegación, tarjetas y mensajes de estado.
- **Tailwind CSS y CSS personalizado:** estilos, paleta de marca y adaptación a pantallas.
- **Supabase JavaScript SDK:** envío de solicitudes a la base de datos.
- **Supabase CLI y migraciones SQL:** enlace del proyecto y cambios versionados de la base de datos.
- **Git y GitHub:** control de versiones y repositorio del código fuente.
- **GitHub Pages:** alojamiento público del sitio estático.

## 7. Estructura y decisiones de implementación

- `index.html` es el único documento HTML de entrada y declara el idioma español.
- `src/main.jsx` configura React, Material UI y los estilos globales.
- `src/Site.jsx` contiene la navegación, portada, presentación, catálogo, detalles de rutas, formulario y pie de página.
- `src/lib/supabase.js` crea el cliente de Supabase a partir de las variables de entorno.
- `supabase/migrations/` contiene la migración SQL de la tabla y sus políticas de seguridad.
- `docs/` contiene el build publicado por GitHub Pages desde la rama `main`.

## 8. Adaptabilidad, accesibilidad y SEO

El diseño aplica estilos base para pantallas pequeñas y variantes para pantallas mayores. Los controles de Material UI permiten interacción por teclado; los campos tienen etiquetas, el botón del menú tiene un nombre accesible y las imágenes de portada y experiencias tienen texto alternativo. Las imágenes puramente decorativas pueden usar `alt` vacío.

El documento HTML declara `lang="es"`, un título descriptivo y una meta descripción. La página emplea una jerarquía de encabezados para organizar sus secciones.

Estas medidas cubren aspectos básicos de accesibilidad y SEO, pero no equivalen a una certificación WCAG ni a una auditoría completa con lectores de pantalla.

## 9. Publicación y enlaces de entrega

- **Sitio público:** https://soydonsapo.github.io/ruta-andina/
- **Repositorio del código fuente:** https://github.com/soydonsapo/ruta-andina
- **Bitácora de cambios y uso de IA:** [BITACORA.md](./BITACORA.md)

GitHub Pages sirve el contenido de `docs/` en la rama `main`. GitHub Pages aloja la interfaz web y Supabase recibe las solicitudes; no es necesario mantener encendida la computadora local para que ambos servicios estén disponibles.

## 10. Verificación

Antes de publicar cambios se usan los comandos `npm.cmd run lint` y `npm.cmd run build`. Se comprueba que la página pública y los recursos de producción carguen correctamente. La integración del formulario se ha comprobado contra el endpoint de Supabase y las validaciones de la base de datos; no se introduce una solicitud ficticia como parte de esa comprobación.
