# SPEC 05 — Link parent invitation

> **Estado:** Approved
> **Depende de:** SPEC 02, SPEC 04
> **Fecha:** 2026-10-05
> **Objetivo:** Implementar el flujo modal `/kids/[id]/link-parent` para invitar y vincular un padre a un niño, fiel a `references/pantallas/vincular-padre.dc.html`, usando persistencia local.

## Scope

**In:**

- Crear la ruta `/kids/[id]/link-parent` como flujo contextual de invitación para un niño existente.
- Renderizar la UI como una card/modal compacta centrada sobre fondo cálido, no como pantalla completa de aplicación.
- Replicar visualmente `references/pantallas/vincular-padre.dc.html` con tarjeta `#FBF4EC`, borde `#ECE0D0`, radio `24px`, sombra, header, botón cerrar, alerta informativa, campos, selector de parentesco, código de invitación y botón principal.
- Resolver dinámicamente el niño desde los datos mock de SPEC 02 o desde los niños locales de SPEC 04.
- Mostrar el subtítulo `a {nombre del niño}` usando el nombre real del niño resuelto.
- Implementar formulario controlado para `Nombre del padre/madre`, `Email` y `Parentesco`.
- Usar `Mamá` como parentesco seleccionado por defecto.
- Permitir seleccionar exactamente un parentesco entre `Mamá`, `Papá` y `Tutor/a`.
- Validar que nombre, email y parentesco estén completos antes de enviar.
- Validar email con formato básico suficiente para prototipo local.
- Generar localmente un código de invitación con formato visual equivalente a `7K4P9`.
- Guardar la invitación pendiente en `localStorage` al enviar.
- Bloquear invitaciones duplicadas si ya existe una invitación o padre vinculado con el mismo email para el mismo niño.
- Volver a `/kids/[id]` al cerrar la card/modal o después de enviar una invitación válida.
- Convertir el botón existente `Vincular otro padre` de `LinkedParentsCard` en enlace hacia `/kids/[id]/link-parent`.
- Mostrar las invitaciones locales pendientes dentro del card de padres vinculados del perfil del niño como estado `PENDIENTE`.
- Mantener copy visible en español y nombres de código en inglés.
- Mantener diseño responsive funcional sin overflow horizontal.

**Out of scope (para specs futuras):**

- Backend, API, emails reales o envío real de invitaciones.
- Activación real de la cuenta desde el código generado.
- Integrar el código generado con `/auth/activate-account`.
- Estados de invitación distintos de pendiente.
- Reenvío, cancelación o expiración real de invitaciones.
- Edición de padres vinculados existentes.
- Gestión de permisos reales para limitar el feed visible del padre.
- Cambiar el layout general del perfil del niño fuera del enlace al nuevo flujo.

## Data model

Las invitaciones de padres se guardan en `localStorage` con una clave versionada independiente de los niños locales.

```ts
export const LOCAL_PARENT_INVITATIONS_STORAGE_KEY = "open-daycare:parent-invitations:v1";

export type ParentRelationship = "Mamá" | "Papá" | "Tutor/a";

export interface LocalParentInvitation {
  id: string;
  kidId: string;
  parentName: string;
  parentEmail: string;
  relationship: ParentRelationship;
  invitationCode: string;
  status: "pending";
  createdAt: string;
}

export interface LinkParentForm {
  parentName: string;
  parentEmail: string;
  relationship: ParentRelationship;
}
```

Convenciones:

- `kidId` identifica al niño mock o local al que pertenece la invitación.
- `parentEmail` se normaliza con `trim().toLowerCase()` para detectar duplicados.
- `invitationCode` usa 5 caracteres alfanuméricos en mayúsculas para coincidir con la referencia visual.
- `status` queda fijo en `pending` en esta spec.
- Las invitaciones locales pendientes se mapean a `LinkedParent` con `statusLabel: "PENDIENTE"`.
- El color/avatar de invitaciones locales puede derivarse de la inicial del padre y usar tonos consistentes con el perfil existente.

## Implementation plan

1. Crear `app/_data/localParentInvitations.ts` con tipos, clave versionada, lectura segura de `localStorage`, escritura, creación de invitación, generación de código y detección de duplicados por `kidId` + email normalizado.
2. Crear un resolver reutilizable para obtener el niño por `id` desde mocks o desde niños locales sin romper renderizado inicial en servidor.
3. Crear `app/kids/[id]/link-parent/page.tsx` como Client Component con card/modal centrada y navegación de cierre hacia `/kids/[id]`.
4. Implementar el formulario controlado con los labels, placeholders, botones de parentesco, alerta informativa, bloque de código y botón `Enviar invitación` fieles a `references/pantallas/vincular-padre.dc.html`.
5. Implementar validación de campos obligatorios, email básico y duplicado local antes de guardar.
6. Generar el código de invitación y mostrarlo en la card de invitación usando el mismo tratamiento visual de la referencia.
7. Guardar una `LocalParentInvitation` válida en `localStorage` y navegar a `/kids/[id]` después del envío.
8. Actualizar `LinkedParentsCard` para recibir el `kidId` y convertir `Vincular otro padre` en enlace a `/kids/[id]/link-parent`.
9. Actualizar el perfil de niños mock y locales para combinar padres existentes con invitaciones locales pendientes del mismo `kidId`.
10. Ajustar estados vacíos y responsive para que la card/modal no genere overflow horizontal en mobile.
11. Verificar con `npm run lint`, `npx tsc --noEmit` y comparación visual contra `references/pantallas/vincular-padre.dc.html`.

## Acceptance criteria

- [ ] `/kids/[id]/link-parent` renderiza una card/modal centrada visualmente fiel a `references/pantallas/vincular-padre.dc.html`.
- [ ] La ruta no renderiza `Sidebar`, `MobileNav` ni el layout completo del perfil del niño.
- [ ] La card usa fondo cálido, tarjeta `#FBF4EC`, borde `#ECE0D0`, radio `24px`, sombra, tipografía Fredoka/Nunito y spacing equivalente a la referencia.
- [ ] El header muestra `Vincular padre` y el subtítulo `a {nombre del niño}` con el niño resuelto por `id`.
- [ ] El botón cerrar navega a `/kids/[id]` sin guardar datos.
- [ ] El formulario permite editar nombre, email y parentesco mediante estado local.
- [ ] `Mamá` aparece seleccionado por defecto.
- [ ] El selector de parentesco permite exactamente una opción entre `Mamá`, `Papá` y `Tutor/a`.
- [ ] `Enviar invitación` valida nombre, email y parentesco antes de guardar.
- [ ] El email muestra error si no cumple formato básico.
- [ ] Si ya existe un padre o invitación local con el mismo email para ese niño, se muestra error y no se guarda duplicado.
- [ ] Al enviar datos válidos, se crea una `LocalParentInvitation` en `localStorage` bajo `open-daycare:parent-invitations:v1`.
- [ ] El código generado tiene 5 caracteres alfanuméricos en mayúsculas y se muestra con tratamiento visual equivalente al bloque `CÓDIGO DE INVITACIÓN` de la referencia.
- [ ] Después de guardar, la app navega a `/kids/[id]`.
- [ ] En `/kids/[id]`, la invitación guardada aparece en `PADRES VINCULADOS` con estado `PENDIENTE`.
- [ ] El botón `Vincular otro padre` del perfil navega a `/kids/[id]/link-parent`.
- [ ] El flujo funciona para niños mock y para niños creados localmente en SPEC 04.
- [ ] En mobile, la card/modal no genera overflow horizontal y conserva jerarquía visual legible.
- [ ] `npm run lint` termina sin errores.
- [ ] `npx tsc --noEmit` termina sin errores.

## Decisions

- **Sí:** usar `/kids/[id]/link-parent` como ruta contextual. Mantiene rutas en inglés y el vínculo explícito con el perfil del niño.
- **Sí:** renderizar como card/modal centrada. La referencia muestra una tarjeta compacta y no una pantalla completa con navegación de aplicación.
- **Sí:** usar `localStorage`. Es consistente con SPEC 04 y permite ver invitaciones pendientes sin backend.
- **Sí:** usar clave versionada `open-daycare:parent-invitations:v1`. Facilita migraciones futuras si cambia el formato.
- **Sí:** soportar niños mock y locales. Evita que los niños creados localmente queden sin flujo de vinculación.
- **Sí:** conectar desde `Vincular otro padre`. Es el punto de entrada natural ya existente en el perfil.
- **Sí:** generar el código localmente. Mantiene el prototipo interactivo sin depender de servicios externos.
- **Sí:** usar `Mamá` por defecto. Replica la referencia visual.
- **Sí:** bloquear duplicados por email normalizado y niño. Evita múltiples invitaciones pendientes para el mismo adulto.
- **No:** enviar emails reales. Requiere backend o servicio externo y queda fuera de esta spec.
- **No:** integrar activación de cuenta con el código generado. Ese flujo pertenece a otra spec.
- **No:** implementar expiración real de 7 días. La referencia lo muestra como copy visual, pero no habrá job ni reloj persistente en esta spec.

## Risks

| Riesgo | Mitigación |
| --- | --- |
| La ruta parece una pantalla pero el diseño debe sentirse como modal. | No renderizar sidebar ni layout de app; centrar una card compacta sobre el fondo cálido. |
| `localStorage` solo existe en cliente. | Leer y escribir invitaciones desde Client Components o helpers seguros para navegador. |
| Los padres mock no tienen email visible. | Bloquear duplicados contra invitaciones locales por email y contra padres mock solo si se incorpora email en el modelo. |
| Niños locales se resuelven después de hidratar cliente. | Usar un estado de carga o resolución cliente que evite errores de SSR. |
| La expiración visual de 7 días puede parecer funcional. | Mantenerla como copy visual y documentar expiración real fuera de scope. |

## What is **not** in this spec

- Backend, API o envío real de correos.
- Activación real de cuentas con el código generado.
- Integración con `/auth/activate-account`.
- Expiración real de invitaciones.
- Reenvío o cancelación de invitaciones.
- Edición de padres vinculados.
- Permisos reales sobre el feed familiar.
- Convertir este flujo en pantalla completa con sidebar o navegación principal.

Cada uno de esos, si llega, va en su propia spec.
