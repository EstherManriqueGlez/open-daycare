# SPEC 02 — Kids list and profile UI

> **Estado:** Approved
> **Depende de:** SPEC 01
> **Fecha:** 2026-10-04
> **Objetivo:** Implementar las pantallas `/kids` y `/kids/[id]` con interfaces y componentes fieles a `references/pantallas/ninos.dc.html` y `references/pantallas/perfil-nino.dc.html`.

## Scope

**In:**

- Crear la ruta `/kids` para el listado de niños.
- Crear la ruta `/kids/[id]` para el perfil de un niño.
- Implementar componentes reutilizables para listado, tarjeta de niño, perfil, alerta de notas/alergias, filas de datos y padres vinculados.
- Usar datos mock locales tipados en `app/_data/mock.ts`.
- Mantener copy visible en español.
- Usar nombres de rutas, archivos, variables y componentes en inglés.
- Adaptar el diseño a mobile de forma funcional: navegación móvil existente, cards en una columna y perfil apilado.
- Ajustar `Sidebar`/`MobileNav` para que el item activo se calcule por ruta.
- Mantener visibles los botones de pantallas futuras sin navegación real.

**Out of scope (para specs futuras):**

- Formularios reales para agregar o editar niños.
- Pantallas de resumen del día, vinculación de padres o creación de publicación.
- Backend, API, persistencia o autenticación.
- Búsqueda funcional o filtrado de niños.
- Estados de carga, error o vacío conectados a datos remotos.

## Data model

Se agregan datos mock tipados en `app/_data/mock.ts`.

```ts
export interface Kid {
  id: string;
  name: string;
  initial: string;
  ageLabel: string;
  room: string;
  birthDateLabel: string;
  admissionLabel: string;
  parentSummary: string;
  avatarBg: string;
  avatarColor: string;
  badge?: {
    label: string;
    variant: "allergy" | "link";
  };
  notes?: {
    title: string;
    text: string;
  };
  linkedParents: LinkedParent[];
}

export interface LinkedParent {
  id: string;
  name: string;
  initial: string;
  relationshipStatus: string;
  avatarBg: string;
  statusLabel: "ACTIVA" | "PENDIENTE";
}
```

Convenciones:

- Los `id` de niños se usan para construir `/kids/[id]`.
- Los datos internos usan nombres en inglés y la UI muestra etiquetas en español.
- No hay persistencia: todo vive en memoria dentro del mock local.

## Implementation plan

1. Crear `app/kids/page.tsx` con el layout base compartido: `Sidebar`, `MobileNav`, contenedor principal y título `Niños`.
2. Agregar el modelo mock tipado de niños y padres vinculados en `app/_data/mock.ts`.
3. Crear componentes de listado en `components/kids/`: `KidsHeader`, `KidsSearchBox`, `KidsSectionHeader`, `KidCard` y `KidsList`.
4. Conectar `/kids` al mock local y renderizar las 8 cards según `references/pantallas/ninos.dc.html`.
5. Crear `app/kids/[id]/page.tsx` para resolver el niño por `id` desde el mock local.
6. Crear componentes de perfil en `components/kids/`: `KidProfileHeader`, `KidNotesAlert`, `KidInfoCard`, `LinkedParentsCard` y `KidProfileActions`.
7. Conectar `/kids/[id]` al perfil de Mateo y reutilizar la estructura para cualquier niño mock.
8. Cambiar `Sidebar`/`MobileNav` para que los links reales funcionen y el item activo se determine por ruta.
9. Dejar botones fuera de alcance visibles sin destino real usando un estado deshabilitado accesible.
10. Ajustar responsive: `/kids` pasa de dos columnas a una columna en mobile, y `/kids/[id]` apila el panel lateral bajo el contenido principal.
11. Verificar con `npm run lint`, `npx tsc --noEmit` y comparación visual contra `references/pantallas/ninos.dc.html`, `references/pantallas/perfil-nino.dc.html` y sus screenshots.

## Acceptance criteria

- [x] `/kids` renderiza el listado `Niños` con encabezado, buscador visual, sección `SALA SOLES` y 8 niños mock.
- [x] `/kids` usa cards visualmente equivalentes a `references/pantallas/ninos.dc.html`.
- [x] Cada card de niño navega a `/kids/[id]`.
- [x] `/kids/[id]` renderiza el perfil con botón `Volver a Niños`, encabezado, alerta de alergias/notas, datos del niño, acción `Resumen del día` y padres vinculados.
- [x] El perfil de Mateo coincide visualmente con `references/pantallas/perfil-nino.dc.html`.
- [x] El menú lateral y móvil marcan `Niños` como activo en `/kids` y `/kids/[id]`.
- [x] Los botones fuera de alcance permanecen visibles pero no crean rutas nuevas ni formularios.
- [x] En mobile, el listado se muestra en una columna y el perfil se apila sin overflow horizontal.
- [x] `npm run lint` termina sin errores.
- [x] `npx tsc --noEmit` termina sin errores.

## Decisions

- **Sí:** rutas en inglés `/kids` y `/kids/[id]`. Evita nombres de páginas en español aunque el copy visible siga en español.
- **Sí:** páginas y componentes. Permite revisar pantallas navegables y reutilizar piezas visuales.
- **Sí:** mock local tipado en `app/_data/mock.ts`. Es suficiente para interfaz sin backend.
- **Sí:** navegación básica. Cards y volver deben funcionar; formularios futuros no entran.
- **Sí:** item activo por ruta. Evita pasar props manuales en cada página.
- **No:** búsqueda funcional. La spec pide interfaz y componentes, no comportamiento de filtrado.
- **No:** crear rutas futuras para agregar, editar, vincular padres o resumen del día. Esas pantallas requieren specs propias.
- **Sí:** validación visual contra referencias HTML/PNG. Las referencias son la fuente de verdad del diseño.

## Risks

| Riesgo | Mitigación |
| --- | --- |
| Las referencias usan HTML inline y la app usa Tailwind/componentes. | Priorizar equivalencia visual, spacing, tipografía, colores y jerarquía, no copiar inline styles literalmente. |
| El sidebar actual tiene navegación estática. | Actualizarlo para usar rutas reales y detectar item activo por pathname. |
| No hay referencia mobile exacta. | Hacer adaptación funcional conservando jerarquía visual y evitando overflow horizontal. |

## What is **not** in this spec

- Formularios de alta o edición de niños.
- Búsqueda funcional.
- Backend, persistencia o API.
- Pantallas de resumen del día, vincular padre o crear publicación.
- Autenticación o permisos.

Cada uno de esos, si llega, va en su propia spec.
