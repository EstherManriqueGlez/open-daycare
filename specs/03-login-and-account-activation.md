# SPEC 03 — Pantallas de Login y Activación de Cuenta

> **Estado:** Implemented
> **Depende de:** SPEC 01
> **Fecha:** 2026-10-05
> **Objetivo:** Implementar las pantallas de inicio de sesión (`/auth/login`) y activación de cuenta (`/auth/activate-account`) basadas en `references/pantallas/login.dc.html` y `references/pantallas/activar-cuenta.dc.html`, eliminando el selector de rol en login y añadiendo interactividad en formularios.

## Scope

**In:**

- Página de login en `app/auth/login/page.tsx` basada en `references/pantallas/login.dc.html`:
  - Panel izquierdo decorativo con gradiente cálido (`#F6A98E` a `#EC7E62`), logo OpenDayCare, texto institucional y badge `GUARDERÍA · SALA SOLES`.
  - Panel derecho con título `Iniciar sesión`, subtítulo, campos de **Email** y **Contraseña**, enlace `¿Olvidaste tu contraseña?`, botón `Iniciar sesión` (redirige a `/`), y enlace inferior `¿Te invitó la guardería? Activá tu cuenta` (apunta a `/auth/activate-account`).
  - **Nota:** Se elimina la sección de selección de rol ("INGRESO COMO" / Personal / Familia).
- Página de activación de cuenta en `app/auth/activate-account/page.tsx` basada en `references/pantallas/activar-cuenta.dc.html`:
  - Contenedor centrado con icono decorativo, título `Bienvenida a OpenDayCare` y descripción.
  - Tarjeta de invitación del niño (`Mateo · Sala Soles` con avatar inicial `M` en tonos celestes).
  - Campos de formulario para **Código de invitación** (`7K4P9`), **Email** (`lucia.fernandez@gmail.com`) y **Crear contraseña**.
  - Checkbox interactivo de autorización de fotos.
  - Botón `Activar mi cuenta` y enlace para `Iniciar sesión` (`/auth/login`).
- Estilos visuales con paleta cálida, fuentes Fredoka + Nunito, y componentes responsive.
- Estado local (`useState`) en ambas páginas para inputs controlados y checkbox interactivo de fotos.

**Out of scope (para specs futuras):**
- Autenticación real con backend, JWT, sesiones o base de datos.
- Recuperación funcional de contraseña.
- Las otras 11 pantallas restantes del catálogo de diseño.

## Data model

Estado local de React (`useState`) en los componentes de página para gestionar los valores de los inputs (`email`, `password`, `code`, `photoConsent`).

## Implementation plan

1. **Crear página de Login (`app/auth/login/page.tsx`).** Layout de dos columnas sin selector de rol, con inputs controlados y enlaces hacia `/` y `/auth/activate-account`.
2. **Crear página de Activación de cuenta (`app/auth/activate-account/page.tsx`).** Formulario centrado con tarjeta de invitación, inputs, checkbox toggle de autorización y enlaces hacia `/auth/login` y `/`.
3. **Verificación y enlace.** Conectar correctamente `/auth/login`, `/auth/activate-account` y el feed principal (`/`).

## Acceptance criteria

- [x] `/auth/login` renderiza la pantalla de inicio de sesión sin los botones de selector de rol (Personal/Familia), mostrando email, contraseña, botón de login y enlace de activación.
- [x] `/auth/activate-account` renderiza la pantalla de activación con el código de invitación, tarjeta de Mateo, campos de formulario y checkbox interactivo de autorización de fotos.
- [x] Los inputs de ambas pantallas son interactivos y permiten escritura mediante estado local (`useState`).
- [x] El enlace de activación en `/auth/login` navega a `/auth/activate-account`, y el enlace de inicio de sesión en `/auth/activate-account` navega a `/auth/login`.
- [x] Ambas páginas replican fielmente la paleta cálida, fuentes (Fredoka/Nunito) y espaciados de los archivos `.dc.html`.

## Decisions

- **Yes:** Eliminar el selector de rol en `/login` para simplificar al login estándar de email y contraseña.
- **Yes:** Usar estado local (`useState`) para inputs y el checkbox de fotos para permitir interactividad en el prototipo.
- **No:** Implementar llamadas a API de autenticación real (fuera de alcance en esta fase).

## What is **not** in this spec

- Backend authentication and session handling.
- Password reset flow.
- Remaining 11 screens of the daycare app.
