# Feature Specification: Toggle de Modo Oscuro/Claro

**Feature Branch**: `001-dark-mode-toggle`  
**Created**: 2026-04-21  
**Status**: Draft  
**Input**: User description: "Añade un toggle de modo oscuro/claro a la app. Debe estar visible en todas las páginas, cambiar los colores del fondo, cards y texto. La preferencia debe persistir entre sesiones usando localStorage. Respeta también la preferencia del sistema operativo como valor inicial (prefers-color-scheme)."

## User Scenarios & Testing *(mandatory)*

### User Story 1 - Cambiar entre modo oscuro y claro manualmente (Priority: P1)

El usuario ve un control (toggle) siempre visible en la interfaz, sin importar en qué página se encuentre. Al activarlo, la apariencia de toda la app cambia inmediatamente: fondo, cards, texto y demás elementos visuales se adaptan al modo seleccionado (oscuro o claro).

**Why this priority**: Es la funcionalidad central de la feature. Sin el toggle visible y funcional, no hay valor entregado.

**Independent Test**: Se puede verificar navegando a cualquier página y alternando el toggle; los colores deben cambiar visualmente de forma inmediata.

**Acceptance Scenarios**:

1. **Given** la app está en modo claro, **When** el usuario activa el toggle, **Then** el fondo, las cards y el texto cambian a los colores del modo oscuro de forma inmediata, sin recarga de página.
2. **Given** la app está en modo oscuro, **When** el usuario activa el toggle, **Then** el fondo, las cards y el texto cambian a los colores del modo claro de forma inmediata.
3. **Given** el usuario está en cualquier página de la app, **When** busca el toggle de tema, **Then** lo encuentra visible en una ubicación consistente (en el header).

---

### User Story 2 - Persistencia de la preferencia entre sesiones (Priority: P2)

El usuario selecciona un modo (oscuro o claro) y cierra el navegador. Al volver a abrir la app, la preferencia anterior se mantiene automáticamente sin necesidad de volver a configurarla.

**Why this priority**: Sin persistencia, el usuario tendría que cambiar el modo cada vez que visita la app, lo cual genera frustración.

**Independent Test**: Seleccionar modo oscuro, cerrar y reabrir la app; debe iniciar en modo oscuro.

**Acceptance Scenarios**:

1. **Given** el usuario seleccionó modo oscuro y cerró la app, **When** vuelve a abrir la app, **Then** la app inicia en modo oscuro.
2. **Given** el usuario seleccionó modo claro y cerró la app, **When** vuelve a abrir la app, **Then** la app inicia en modo claro.
3. **Given** el usuario nunca ha seleccionado un modo manualmente, **When** abre la app por primera vez, **Then** la app NO usa un valor almacenado previamente (se respeta el valor inicial del sistema operativo).

---

### User Story 3 - Respetar la preferencia del sistema operativo como valor inicial (Priority: P3)

Cuando un usuario visita la app por primera vez (sin preferencia almacenada), la app detecta la configuración del sistema operativo y aplica el modo correspondiente automáticamente.

**Why this priority**: Mejora la experiencia inicial al evitar que el usuario tenga que configurar algo que ya definió a nivel de sistema.

**Independent Test**: Sin preferencia almacenada, con el SO configurado en modo oscuro, la app debe iniciar en modo oscuro.

**Acceptance Scenarios**:

1. **Given** no hay preferencia almacenada y el SO está en modo oscuro, **When** el usuario abre la app, **Then** la app se muestra en modo oscuro.
2. **Given** no hay preferencia almacenada y el SO está en modo claro, **When** el usuario abre la app, **Then** la app se muestra en modo claro.
3. **Given** hay una preferencia almacenada (por selección manual previa), **When** el usuario abre la app, **Then** la preferencia almacenada tiene prioridad sobre la del SO.

---

### Edge Cases

- ¿Qué sucede si el navegador no soporta la detección de preferencia del SO? La app debe usar modo claro como fallback.
- ¿Qué sucede si el usuario borra el almacenamiento local del navegador? La app debe volver a detectar la preferencia del SO.
- ¿Qué sucede si el usuario cambia la preferencia del SO mientras la app está abierta y no tiene preferencia almacenada? Se asume que no es necesario reaccionar en tiempo real; se aplica al próximo inicio de la app.

## Requirements *(mandatory)*

### Functional Requirements

- **FR-001**: El sistema DEBE mostrar un toggle de modo oscuro/claro visible en todas las páginas de la app, ubicado en el header.
- **FR-002**: El sistema DEBE cambiar inmediatamente los colores del fondo, cards y texto al alternar el toggle, sin recargar la página.
- **FR-003**: El sistema DEBE persistir la preferencia del usuario (oscuro/claro) entre sesiones del navegador.
- **FR-004**: El sistema DEBE detectar la preferencia de esquema de color del sistema operativo del usuario y aplicarla como valor inicial cuando no exista preferencia almacenada.
- **FR-005**: La preferencia almacenada manualmente DEBE tener prioridad sobre la preferencia del sistema operativo.
- **FR-006**: El sistema DEBE usar modo claro como fallback si no puede detectar la preferencia del SO y no hay preferencia almacenada.
- **FR-007**: El toggle DEBE reflejar visualmente el estado actual del tema (indicar si está activo el modo oscuro o claro).

### Key Entities

- **Preferencia de tema**: Representa la selección del usuario (oscuro o claro). Se almacena localmente en el navegador. Tiene prioridad sobre la preferencia del SO.
- **Preferencia del SO**: Configuración de esquema de color del sistema operativo del usuario. Se usa como valor inicial cuando no existe preferencia almacenada.

## Success Criteria *(mandatory)*

### Measurable Outcomes

- **SC-001**: El usuario puede cambiar entre modo oscuro y claro en menos de 1 segundo (el cambio visual es inmediato al interactuar con el toggle).
- **SC-002**: El 100% de las páginas de la app muestran el toggle de modo y responden al cambio de tema.
- **SC-003**: La preferencia del usuario se mantiene correctamente tras cerrar y reabrir la app en el 100% de los casos.
- **SC-004**: Usuarios con SO en modo oscuro ven la app en modo oscuro en su primera visita, sin intervención manual.

## Assumptions

- El toggle se ubica en el header (componente Layout) para garantizar visibilidad en todas las páginas.
- La app solo necesita dos modos: oscuro y claro (no modo "auto" como tercera opción explícita).
- No es necesario reaccionar en tiempo real a cambios de la preferencia del SO mientras la app está abierta.
- Modo claro es el fallback por defecto cuando no hay información disponible.
- Los colores específicos de cada modo se definirán durante la fase de implementación, siguiendo las instrucciones de estilo activas del proyecto.
