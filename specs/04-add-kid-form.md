# SPEC 04 — Add kid form

> **Estado:** Implemented
> **Depende de:** SPEC 02
> **Fecha:** 2026-10-05
> **Objetivo:** Implementar la pantalla `/kids/new` para crear un niño desde un formulario fiel a `references/pantallas/agregar-nino.dc.html` y mostrarlo después en `/kids` usando persistencia local.

## Scope

**In:**

- Crear la ruta `/kids/new` basada en `references/pantallas/agregar-nino.dc.html`.
- Renderizar la pantalla como una tarjeta flotante centrada horizontalmente con margen superior sobre fondo cálido, bordes redondeados, sombra y spacing equivalente a la referencia.
- Mantener el copy visible en español.
- Implementar cabecera con enlace `Cancelar`, título `Agregar niño` y acción `Guardar`.
- Implementar campos controlados para `Nombre completo`, `Fecha de nacimiento`, `Sala`, `Alergias (etiquetas)` y `Notas médicas`.
- Validar al guardar que `Nombre completo`, `Fecha de nacimiento` y `Sala` estén completos.
- Validar que `Fecha de nacimiento` use formato básico `dd/mm/aaaa`.
- Implementar `Sala` como selector simple de un solo valor con opciones `Soles`, `Estrellas` y `Lunas`.
- Guardar niños creados localmente en `localStorage`.
- Mostrar en `/kids` los niños mock de SPEC 02 junto con los niños creados localmente.
- Permitir que una card de niño creado localmente navegue a `/kids/[id]`.
- Renderizar un perfil básico para niños creados localmente usando los datos disponibles del formulario.
- Conectar el botón `+ Agregar niño` de `/kids` para navegar a `/kids/new`.
- Mantener diseño responsive funcional sin overflow horizontal.

**Out of scope (para specs futuras):**

- Backend, API o persistencia en base de datos real.
- Edición de niños existentes.
- Cambiar el botón `Editar` de `/kids/[id]` para navegar a `/kids/new`.
- Subida de avatares o fotos de perfil.
- Vinculación real de padres.
- Validación avanzada de fecha, edad mínima, duplicados o reglas administrativas.
- Sincronización entre dispositivos o usuarios.

## Data model

Los niños creados desde `/kids/new` se guardan en `localStorage` con una clave versionada.

```ts
export const LOCAL_KIDS_STORAGE_KEY = "open-daycare:kids:v1";

export interface LocalKid {
  id: string;
  fullName: string;
  initial: string;
  birthDate: string;
  room: "Soles" | "Estrellas" | "Lunas";
  allergies: string;
  medicalNotes: string;
  createdAt: string;
}

export interface NewKidForm {
  fullName: string;
  birthDate: string;
  room: "Soles" | "Estrellas" | "Lunas" | "";
  allergies: string;
  medicalNotes: string;
}
```

Convenciones:

- `id` se genera al guardar y se usa para construir `/kids/[id]`.
- `initial` se deriva del primer caracter visible de `fullName`.
- `birthDate` se almacena como texto `dd/mm/aaaa`.
- `allergies` se almacena como texto separado por comas, tal como lo escribe el usuario.
- `medicalNotes` se almacena como texto libre.
- `/kids` combina los datos mock de SPEC 02 con los `LocalKid` de `localStorage`.
- El perfil de un `LocalKid` muestra placeholders para datos no capturados por este formulario, como padres vinculados o fecha de ingreso.

## Implementation plan

1. Crear un helper tipado para leer, escribir y mapear `LocalKid` desde `localStorage` sin romper renderizado inicial en servidor.
2. Crear `app/kids/new/page.tsx` como Client Component con el layout de tarjeta flotante de la referencia.
3. Implementar el formulario controlado con estado local, labels, placeholders y estilos fieles a `references/pantallas/agregar-nino.dc.html`.
4. Implementar validación de campos obligatorios y formato básico `dd/mm/aaaa` al presionar `Guardar`.
5. Implementar guardado en `localStorage` y navegación posterior a `/kids` cuando los datos sean válidos.
6. Actualizar `/kids` para cargar niños locales en cliente y renderizarlos junto con los niños mock existentes.
7. Actualizar la navegación del botón `+ Agregar niño` en `/kids` para apuntar a `/kids/new`.
8. Actualizar `/kids/[id]` para resolver primero niños mock y luego niños locales, renderizando perfil básico cuando el `id` pertenece a un `LocalKid`.
9. Ajustar responsive y estados visuales de error para que el formulario sea usable en mobile.
10. Verificar con `npm run lint`, `npx tsc --noEmit` y comparación visual contra `references/pantallas/agregar-nino.dc.html`.

## Acceptance criteria

- [x] `/kids/new` renderiza una tarjeta flotante centrada horizontalmente y visualmente fiel a `references/pantallas/agregar-nino.dc.html`.
- [x] La pantalla usa fondo cálido, tarjeta `#FBF4EC`, bordes redondeados, sombra, tipografía Fredoka/Nunito y spacing equivalente a la referencia.
- [x] `Cancelar` navega a `/kids` sin guardar datos.
- [x] `Guardar` valida `Nombre completo`, `Fecha de nacimiento` y `Sala` antes de guardar.
- [x] `Fecha de nacimiento` muestra error si no cumple el formato básico `dd/mm/aaaa`.
- [x] `Sala` permite seleccionar exactamente una opción entre `Soles`, `Estrellas` y `Lunas`.
- [x] `Alergias (etiquetas)` y `Notas médicas` son opcionales y se guardan si el usuario los completa.
- [x] Al guardar datos válidos, se crea un `LocalKid` en `localStorage` bajo `open-daycare:kids:v1`.
- [x] Después de guardar, la app navega a `/kids`.
- [x] El niño creado aparece en `/kids` junto con los niños mock existentes.
- [x] La card del niño creado localmente navega a `/kids/[id]`.
- [x] `/kids/[id]` renderiza un perfil básico para un niño creado localmente usando nombre, sala, fecha de nacimiento, alergias y notas médicas.
- [x] El botón `Editar` de `/kids/[id]` no se cambia para apuntar a `/kids/new`.
- [x] En mobile, el formulario no genera overflow horizontal y conserva jerarquía visual legible.
- [x] `npm run lint` termina sin errores.
- [x] `npx tsc --noEmit` termina sin errores.

## Decisions

- **Sí:** dejar la spec en `Draft`. El usuario la aprobará manualmente después de revisarla.
- **Sí:** usar `/kids/new` para crear niños. Mantiene rutas en inglés y copy visible en español.
- **Sí:** guardar altas locales en `localStorage`. Permite que el niño aparezca en `/kids` sin backend.
- **Sí:** usar clave versionada `open-daycare:kids:v1`. Facilita migraciones futuras si cambia el formato.
- **Sí:** combinar niños mock y niños locales en `/kids`. Conserva la pantalla existente de SPEC 02 y agrega el nuevo comportamiento.
- **Sí:** permitir perfil básico para niños locales. Evita cards sin destino y mantiene la navegación de SPEC 02.
- **Sí:** validar fecha solo con formato básico `dd/mm/aaaa`. La validación calendario completa queda fuera de esta spec.
- **Sí:** implementar `Sala` como selector simple de un solo valor. La referencia muestra una sala, no selección múltiple.
- **No:** apuntar `Editar` a `/kids/new`. Crear y editar son flujos distintos.
- **No:** backend o base de datos real. Esta spec solo necesita persistencia local.
- **No:** agregar campos extra para padres, avatar o fecha de ingreso. No aparecen en la referencia de agregar niño.

## Risks

| Riesgo | Mitigación |
| --- | --- |
| La referencia usa HTML inline y la app usa componentes/Tailwind. | Priorizar equivalencia visual de layout, color, tipografía, spacing y jerarquía. |
| `localStorage` solo existe en cliente. | Leer y escribir datos locales desde Client Components o efectos seguros para navegador. |
| El listado `/kids` puede renderizar primero solo mocks y luego hidratar niños locales. | Aceptar hidratación cliente para datos locales y evitar depender de esos datos durante SSR. |
| El perfil existente puede requerir campos que `LocalKid` no tiene. | Renderizar placeholders claros para padres, ingreso u otros datos no capturados. |
| Validar solo formato de fecha permite fechas no reales. | Registrar la validación avanzada como fuera de scope. |

## What is **not** in this spec

- Backend, API o base de datos real.
- Edición de niños existentes.
- Reutilizar `/kids/new` como pantalla de edición.
- Validación avanzada de fechas o reglas administrativas.
- Padres vinculados reales.
- Avatares personalizados o subida de fotos.
- Sincronización entre usuarios o dispositivos.

Cada uno de esos, si llega, va en su propia spec.
