# Bitácora del proyecto Ruta Andina

**Proyecto:** sitio web de Ruta Andina
**Tecnologías:** React, Vite, JSX, Material UI, Tailwind CSS y Supabase
**Hosting:** GitHub Pages
**Última actualización:** 12 de octubre de 2026

## Propósito de esta bitácora

Este documento registra las decisiones y los cambios solicitados durante el desarrollo, el uso de inteligencia artificial y los comandos principales para ejecutar, validar y publicar el sitio. Los textos, experiencias, precios, imágenes de marca y cambios funcionales fueron definidos o aprobados por el responsable del proyecto. La IA se utilizó como apoyo de ideación, implementación, revisión y resolución de problemas.

## Registro de cambios y uso de IA

1. **Catálogo de experiencias:** se prepararon cinco rutas de Bolivia —Uyuni y la Reserva Eduardo Abaroa, Sajama, Lago Titicaca, Valle de Luribay y Toro Toro— con descripción, duración, dificultad, altitud, tamaño de grupo e inclusiones. La IA ayudó a integrar los datos proporcionados en componentes React y a presentarlos en tarjetas y detalles.
2. **Presentación de la operadora:** se ajustaron textos de portada, misión, indicadores de trayectoria y navegación a partir de las indicaciones del responsable. También se retiraron elementos y enlaces que se pidió eliminar.
3. **Imágenes e identidad visual:** se conectaron imágenes originales de `.Mockups`, el logo de la agencia y el favicon. Posteriormente se usó `.Mockups/Bolivia.jpg` como imagen principal y se añadieron textos alternativos breves para las imágenes.
4. **Diseño adaptable e interacciones:** se implementaron y ajustaron el filtro de experiencias por dificultad, el menú adaptable, los detalles de cada ruta y el desplazamiento hacia la reserva. Se atendieron correcciones de espacio y tamaño del logo.
5. **Formulario y base de datos:** se conectó el formulario de reservas al cliente oficial de Supabase. La tabla `public.expedition_reservations` almacena las solicitudes; la migración activa RLS y permite a visitantes enviar registros, sin permitirles leer, editar o eliminar registros desde el cliente público.
6. **Colores y precios:** se aplicó la paleta solicitada (`#C86D51`, `#F4A935`, `#82C7E0` y negro), se diferenciaron fondos de secciones y se publicaron los precios por persona: Uyuni **800 Bs.**, Sajama **550 Bs.**, Titicaca **700 Bs.**, Luribay **550 Bs.** y Toro Toro **950 Bs.**
7. **SEO básico:** el documento HTML se configuró en español (`lang="es"`), con un título descriptivo y meta descripción.
8. **Publicación y verificación:** se regeneró el contenido de `docs/`, que es la carpeta que GitHub Pages sirve desde `main`. Se verificaron compilaciones, lint, respuestas HTTP públicas, bundles publicados y la disponibilidad del endpoint de reservas con validación de datos. La IA asistió con la revisión del código, diagnóstico de una hoja CSS faltante en Pages y comprobaciones de publicación.
9. **Corrección permanente del logo y la publicación:** se detectó que un CSS de producción había sido eliminado de `docs/` aunque `index.html` todavía lo solicitaba; al faltar los estilos, el logo se mostraba con sus dimensiones originales. El `.gitignore` ahora permite versionar las imágenes PNG/JPG de `.Mockups/` usadas por React, de modo que logo y rutas están disponibles al clonar el repositorio. El comando `npm.cmd run build:pages` compila, sincroniza Pages, valida los recursos referenciados y elimina únicamente archivos obsoletos del directorio de assets generado.

## Comandos para trabajar en el proyecto

Ejecutar desde la carpeta raíz del repositorio en Windows PowerShell:

### Instalar dependencias

```powershell
npm.cmd install
```

### Configurar Supabase localmente

1. Crear `.env.local` a partir de la plantilla:

```powershell
Copy-Item .env.example .env.local
```

2. Completar `.env.local` localmente con `VITE_SUPABASE_URL` y `VITE_SUPABASE_ANON_KEY`, copiadas desde la configuración del proyecto Supabase. No pegar claves privadas en el código, en GitHub ni en esta bitácora. La clave anon/publishable es pública por diseño y las políticas RLS deben proteger los datos.
3. Iniciar sesión y enlazar el proyecto con la CLI, si aún no está enlazado:

```powershell
supabase.cmd login
supabase.cmd link --project-ref <PROJECT_REF>
```

4. Revisar el estado de migraciones y aplicar las pendientes:

```powershell
supabase.cmd migration list --linked
supabase.cmd db push --linked
```

`db push` modifica la base de datos remota. Antes de ejecutarlo, revisar las migraciones pendientes y confirmar que se está conectado al proyecto correcto. El token de la CLI debe mantenerse local y tener solo los permisos requeridos.

### Ejecutar, validar y previsualizar

```powershell
npm.cmd run dev
npm.cmd run lint
npm.cmd run build
npm.cmd run preview
```

`dev` inicia Vite para desarrollo local. `lint` revisa el código fuente de `src/`; `build` genera la versión de producción en `dist/`; `build:pages` además actualiza `docs/` y valida sus referencias de recursos; `preview` sirve localmente esa versión compilada.

### Publicar en GitHub Pages

Pages publica la carpeta `docs/` de la rama `main`. Compilar y sincronizar el build con:

```powershell
npm.cmd run build:pages
```

Revisar los cambios antes de confirmar y subirlos:

```powershell
git status --short
git diff --check
git add src docs supabase index.html README.md BITACORA.md package.json package-lock.json
git commit -m "Describe el cambio realizado"
git push origin main
```

GitHub Pages construye y publica automáticamente los cambios de `docs/` en:

**Sitio público:** https://soydonsapo.github.io/ruta-andina/
**Repositorio:** https://github.com/soydonsapo/ruta-andina

## Seguridad y operación

- `.env.local` y los archivos temporales de enlace de Supabase no se deben subir al repositorio.
- No usar claves `service_role` en React ni en otros archivos entregados al navegador. El contenido Vite generado es público.
- Mantener RLS habilitado y limitar permisos al mínimo necesario. Para la tabla de reservas, el navegador solo necesita permiso de inserción.
- Las reservas se almacenan en Supabase; GitHub Pages sirve el sitio estático. Ninguno requiere que la laptop del responsable permanezca encendida.
- Revisar el estado del workflow/build de Pages y abrir la URL pública después de cada publicación.
