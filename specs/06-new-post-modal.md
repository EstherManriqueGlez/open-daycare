# SPEC 06 — New post modal

> **Estado:** Approved
> **Depende de:** SPEC 01, SPEC 04
> **Fecha:** 2026-10-05
> **Objetivo:** Implementar la ruta modal `/posts/new` para crear una nueva publicación fiel a `references/pantallas/crear-publicacion.dc.html` y mostrarla arriba del feed usando persistencia local.

## Scope

**In:**

- Crear la ruta `/posts/new` como flujo de creación de publicación con apariencia de modal/card centrada.
- Replicar visualmente `references/pantallas/crear-publicacion.dc.html` con fondo cálido, tarjeta `#FBF4EC`, borde `#ECE0D0`, radio `24px`, sombra, header con `Cancelar`, título `Nueva publicación` y acción `Publicar`.
- Mantener copy visible en español y nombres de código en inglés.
- Conectar el botón `Nueva publicación` del sidebar desktop y del drawer mobile para navegar a `/posts/new`.
- Conectar el composer `Compartí un momento…` del feed para navegar a `/posts/new`.
- Renderizar los chips `PARA` usando todos los niños mock de la sala, niños creados localmente en SPEC 04 si existen, y la opción `Toda la sala`.
- Priorizar Mateo, Sofía y Benjamín al principio de la lista para mantener cercanía visual con la referencia.
- Iniciar la modal con Mateo seleccionado para calcar la referencia.
- Permitir seleccionar varios niños a la vez.
- Hacer que `Toda la sala` sea excluyente y deseleccione cualquier niño previamente seleccionado.
- Renderizar los chips `TIPO` de la referencia: `Comida`, `Siesta`, `Actividad`, `Logro`, `Ánimo`, `Foto` y `Anuncio`.
- Iniciar la modal con el contenido visual de la referencia, incluyendo descripción precargada y chips de tipo con estilos equivalentes.
- Implementar textarea controlado para `DESCRIPCIÓN`.
- Validar antes de publicar que exista un tipo seleccionado y que la descripción no esté vacía después de `trim()`.
- Guardar publicaciones válidas en `localStorage`.
- Volver a `/` al presionar `Cancelar` sin guardar.
- Volver a `/` después de publicar correctamente.
- Mostrar las publicaciones locales guardadas arriba de los posts mock del feed.
- Mapear `Actividad`, `Logro` y `Anuncio` a los tipos existentes del feed.
- Guardar y mostrar `Comida`, `Siesta`, `Ánimo` y `Foto` con estilos nuevos, sin depender de backend.
- Mantener la sección `FOTOS` como placeholder visual fiel a la referencia, con miniatura y botón `Agregar`, sin subir archivos reales.
- Mantener diseño responsive funcional sin overflow horizontal.

**Out of scope (para specs futuras):**

- Backend, API o base de datos real.
- Subida real de fotos, cámara, file picker o almacenamiento de imágenes.
- Edición de publicaciones existentes.
- Borradores o autoguardado.
- Confirmación antes de descartar cambios.
- Comentarios, reacciones o métricas funcionales para publicaciones nuevas.
- Filtros del feed por niño, tipo o sala.
- Permisos reales por rol o audiencia.
- Notificaciones a familias.
- Reordenamiento persistente de posts mock existentes.

## Data model

Las publicaciones creadas desde `/posts/new` se guardan en `localStorage` con una clave versionada independiente de los posts mock.

```ts
export const LOCAL_FEED_POSTS_STORAGE_KEY = "open-daycare:feed-posts:v1";

export type NewPostType =
  | "food"
  | "nap"
  | "activity"
  | "achievement"
  | "mood"
  | "photo"
  | "announcement";

export type NewPostAudience =
  | {
      kind: "kids";
      kids: Array<{
        kidId: string;
        kidName: string;
        kidInitial: string;
        avatarBg: string;
        avatarColor: string;
      }>;
    }
  | { kind: "room"; label: "Toda la sala" };

export interface LocalFeedPost {
  id: string;
  type: NewPostType;
  audience: NewPostAudience;
  description: string;
  hasPhotoPlaceholder: boolean;
  createdAt: string;
}

export interface NewPostForm {
  selectedAudience: NewPostAudience;
  selectedType: NewPostType;
  description: string;
}
```

Convenciones:

- `id` se genera al publicar y se usa como key estable al renderizar el feed.
- `createdAt` se guarda como ISO string y se usa para ordenar publicaciones locales de más nuevas a más antiguas.
- `selectedAudience` inicia con Mateo cuando existe en los datos mock.
- Si Mateo no existe por cambios futuros, el fallback es el primer niño disponible.
- `description` inicia con `Pintamos con témperas esta mañana. Mateo eligió el azul para todo y se concentró un montón.` para calcar la referencia.
- `hasPhotoPlaceholder` queda fijo en `true` en esta spec porque la sección de fotos es solo visual.
- `activity`, `achievement` y `announcement` se mapean a los estilos existentes del feed.
- `food`, `nap`, `mood` y `photo` agregan estilos visuales nuevos consistentes con los chips de la modal.
- Las publicaciones locales se convierten a la forma visual de `FeedPost` antes de pasarlas a `PostCard`.
- Las publicaciones locales usan `publishedByMe: true`, `hearts: 0` y `comments: 0`.
- Para audiencia de uno o más niños, el feed muestra `Para: familias de {nombres}`.
- Para audiencia de sala, el feed muestra `Para: toda la sala`.

## Implementation plan

1. Crear `app/_data/localFeedPosts.ts` con tipos, clave versionada, lectura segura de `localStorage`, escritura, creación de publicación y mapeo visual hacia el feed.
2. Extender los tipos y estilos del feed para soportar `food`, `nap`, `mood` y `photo` sin romper los posts mock existentes.
3. Crear un helper cliente para construir las opciones de audiencia desde todos los niños mock y los niños locales de SPEC 04, priorizando Mateo, Sofía y Benjamín.
4. Crear `app/posts/new/page.tsx` como Client Component con card/modal centrada y navegación de cierre hacia `/`.
5. Implementar el header de la modal con `Cancelar`, `Nueva publicación` y `Publicar` fiel a `references/pantallas/crear-publicacion.dc.html`.
6. Implementar los chips controlados de `PARA`, con Mateo seleccionado por defecto, selección múltiple de niños y soporte excluyente para `Toda la sala`.
7. Implementar los chips controlados de `TIPO` con los colores, radios, pesos y spacing de la referencia.
8. Implementar el textarea controlado con descripción precargada, placeholder `Contá cómo le fue hoy…` y validación de texto no vacío.
9. Implementar la sección `FOTOS` como placeholder visual con miniatura y botón `Agregar`, sin file picker.
10. Implementar `Publicar` para validar tipo y descripción, guardar en `localStorage` y navegar a `/`.
11. Actualizar `SidebarContent` para que `Nueva publicación` navegue a `/posts/new` en desktop y mobile.
12. Actualizar `Composer` para que sea un enlace o botón funcional hacia `/posts/new` y conserve el diseño del feed.
13. Actualizar `app/page.tsx` o un componente cliente del feed para cargar publicaciones locales y renderizarlas arriba de los posts mock.
14. Ajustar responsive para que la modal no genere overflow horizontal y mantenga jerarquía legible en mobile.
15. Verificar con `npm run lint`, `npx tsc --noEmit` y comparación visual contra `references/pantallas/crear-publicacion.dc.html`.

## Acceptance criteria

- [x] `/posts/new` renderiza una card/modal centrada visualmente fiel a `references/pantallas/crear-publicacion.dc.html`.
- [x] La ruta usa fondo cálido, tarjeta `#FBF4EC`, borde `#ECE0D0`, radio `24px`, sombra, tipografía Fredoka/Nunito y spacing equivalente a la referencia.
- [x] La ruta no renderiza `Sidebar`, `MobileNav` ni el layout completo del feed alrededor de la card/modal.
- [x] El header muestra `Cancelar`, `Nueva publicación` y `Publicar` con jerarquía visual equivalente a la referencia.
- [x] `Cancelar` navega a `/` sin guardar datos.
- [x] El botón `Nueva publicación` del sidebar desktop navega a `/posts/new`.
- [x] El botón `Nueva publicación` del drawer mobile navega a `/posts/new`.
- [x] El composer `Compartí un momento…` del feed navega a `/posts/new`.
- [x] La sección `PARA` muestra todos los niños mock de la sala.
- [x] La sección `PARA` muestra Mateo, Sofía y Benjamín primero cuando existen en los datos mock.
- [x] La sección `PARA` incluye niños creados localmente en SPEC 04 si existen.
- [x] La sección `PARA` incluye la opción `Toda la sala`.
- [x] Mateo aparece seleccionado por defecto al abrir la modal.
- [x] Los chips de niños permiten seleccionar varios niños a la vez.
- [x] Al seleccionar `Toda la sala`, se deseleccionan todos los niños previamente seleccionados.
- [x] Al seleccionar un niño después de `Toda la sala`, se deselecciona `Toda la sala` y queda seleccionado ese niño.
- [x] La sección `TIPO` muestra `Comida`, `Siesta`, `Actividad`, `Logro`, `Ánimo`, `Foto` y `Anuncio`.
- [x] Los chips de tipo conservan colores, radios, pesos y spacing equivalentes a la referencia.
- [x] El formulario inicia con la descripción precargada de la referencia.
- [x] El textarea permite editar la descripción.
- [x] `Publicar` muestra error y no guarda si no hay tipo seleccionado.
- [x] `Publicar` muestra error y no guarda si la descripción queda vacía después de `trim()`.
- [x] Al publicar datos válidos, se crea un `LocalFeedPost` en `localStorage` bajo `open-daycare:feed-posts:v1`.
- [x] Después de publicar correctamente, la app navega a `/`.
- [x] Las publicaciones locales aparecen arriba de los posts mock del feed.
- [x] Las publicaciones locales se ordenan de más nuevas a más antiguas.
- [x] Una publicación para uno o más niños muestra audiencia `Para: familias de {nombres}` en el feed.
- [x] Una publicación para `Toda la sala` muestra audiencia `Para: toda la sala` en el feed.
- [x] `Actividad`, `Logro` y `Anuncio` mantienen estilos compatibles con los posts existentes.
- [x] `Comida`, `Siesta`, `Ánimo` y `Foto` se muestran en el feed con badges legibles y consistentes con la paleta de la modal.
- [x] La sección `FOTOS` muestra miniatura placeholder y botón `Agregar` sin abrir file picker ni subir archivos.
- [x] En mobile, la modal no genera overflow horizontal y conserva jerarquía visual legible.
- [x] `npm run lint` termina sin errores.
- [x] `npx tsc --noEmit` termina sin errores.

## Decisions

- **Sí:** usar `/posts/new` como ruta propia. Permite abrir la experiencia como modal visual y tener URL directa sin implementar routing interceptado.
- **Sí:** renderizar como card/modal centrada. La referencia muestra una tarjeta compacta, no una pantalla completa con navegación principal.
- **Sí:** conectar sidebar, drawer mobile y composer. Son las entradas naturales existentes para crear una publicación.
- **Sí:** usar `localStorage`. Es consistente con SPEC 04 y SPEC 05, y hace el flujo demostrable sin backend.
- **Sí:** usar clave versionada `open-daycare:feed-posts:v1`. Facilita migraciones futuras si cambia el formato.
- **Sí:** mostrar publicaciones nuevas arriba de todo. Permite validar inmediatamente que `Publicar` funcionó.
- **Sí:** iniciar con los valores visuales de la referencia. Prioriza calco visual de `crear-publicacion.dc.html` como pidió el usuario.
- **Sí:** validar tipo y descripción. Evita posts vacíos sin agregar validaciones que la referencia no sugiere.
- **Sí:** incluir todos los niños mock y niños locales. Permite publicar para cualquier niño de la sala y mantiene compatibilidad con SPEC 04.
- **Sí:** priorizar Mateo, Sofía y Benjamín en los chips. Mantiene cercanía con la referencia sin ocultar el resto de la sala.
- **Sí:** permitir selección múltiple de niños. El caso de uso real puede requerir publicar el mismo contenido para varias familias sin marcar toda la sala.
- **Sí:** hacer `Toda la sala` excluyente. Evita ambigüedad entre audiencia total y selección parcial de familias.
- **Sí:** mapear `Actividad`, `Logro` y `Anuncio` al feed existente. Reduce cambios innecesarios y conserva estilos ya implementados.
- **Sí:** agregar estilos para `Comida`, `Siesta`, `Ánimo` y `Foto`. La modal debe mostrar todos los tipos de la referencia y el feed debe poder renderizarlos.
- **No:** usar ruta interceptada de Next.js. Es más compleja que lo necesario para este prototipo y no fue requerida.
- **No:** subir fotos reales. El usuario eligió placeholder visual y la referencia no exige upload funcional.
- **No:** guardar borradores. Agrega modelo y estados que no aparecen en la referencia.
- **No:** pedir confirmación al cancelar. El usuario eligió volver a `/` directamente.

## Risks

| Riesgo | Mitigación |
| --- | --- |
| `localStorage` solo existe en cliente. | Leer y escribir publicaciones locales desde Client Components o helpers seguros para navegador. |
| El feed actual usa posts mock en servidor. | Cargar publicaciones locales en un componente cliente que combine locales + mocks sin romper SSR. |
| Agregar nuevos tipos puede romper estilos de `PostCard`. | Extender los mapas de labels y colores con cobertura exhaustiva de `NewPostType`. |
| La ruta modal puede parecer una pantalla completa. | No renderizar sidebar ni mobile nav en `/posts/new`; centrar una card compacta sobre el fondo cálido. |
| Los niños locales aparecen después de hidratar cliente. | Construir opciones de audiencia en cliente y mostrar fallback con niños mock mientras se cargan locales. |

## What is **not** in this spec

- Backend, API o base de datos real.
- Upload real de fotos, cámara o file picker.
- Edición de publicaciones existentes.
- Borradores o autoguardado.
- Confirmación al cancelar.
- Comentarios, reacciones o métricas funcionales.
- Filtros o búsqueda del feed.
- Permisos reales por audiencia.
- Notificaciones a familias.

Cada uno de esos, si llega, va en su propia spec.
