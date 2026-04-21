# Feature Specification: Historial del Clima (7 Días)

**Feature Branch**: `001-weather-history`  
**Created**: 2026-04-21  
**Status**: Draft  
**Input**: User description: "En la página de clima actual, añade una sección debajo que muestre el historial del clima de los últimos 7 días. Para cada día, muestra: fecha (día de la semana), icono/label de clima, temperatura máxima y mínima. Usa la API de Open-Meteo. Muestra los datos en cards horizontales con scroll si no caben en pantalla."

## User Scenarios & Testing *(mandatory)*

### User Story 1 - Ver historial de 7 días en la página de clima (Priority: P1)

El usuario visita la página de clima actual y, debajo de la información del día de hoy, ve una sección con el historial meteorológico de los últimos 7 días. Cada día se muestra en una card individual con la fecha formateada como día de la semana, un icono o etiqueta que describe las condiciones climáticas, y las temperaturas máxima y mínima del día.

**Why this priority**: Es la funcionalidad principal solicitada. Sin esto, no hay feature.

**Independent Test**: Se puede verificar visitando la página de clima y confirmando que aparecen 7 cards con datos históricos correctos debajo del clima actual.

**Acceptance Scenarios**:

1. **Given** el usuario está en la página de clima actual con una ubicación válida, **When** la página carga completamente, **Then** se muestra una sección de historial con exactamente 7 cards, una por cada día de los últimos 7 días.
2. **Given** el historial se ha cargado correctamente, **When** el usuario observa una card, **Then** ve el nombre del día de la semana, un icono o etiqueta descriptiva del clima, la temperatura máxima y la temperatura mínima de ese día.
3. **Given** la pantalla no es lo suficientemente ancha para mostrar las 7 cards, **When** el usuario interactúa con la sección de historial, **Then** puede hacer scroll horizontal para ver todas las cards.

---

### User Story 2 - Gestión de estados de carga y error (Priority: P2)

Mientras los datos del historial se están obteniendo, el usuario ve un indicador de carga. Si la obtención de datos falla, se muestra un mensaje de error claro.

**Why this priority**: Necesario para una experiencia de usuario robusta, pero secundario a la visualización de datos.

**Independent Test**: Se puede probar simulando una conexión lenta o sin conexión y verificando que se muestran los estados de carga y error respectivamente.

**Acceptance Scenarios**:

1. **Given** la página de clima se está cargando, **When** los datos del historial aún no han llegado, **Then** se muestra un indicador de carga en la sección de historial.
2. **Given** la obtención de datos del historial falla, **When** se produce un error de red o de la API, **Then** se muestra un mensaje de error descriptivo al usuario en la sección de historial.

---

### Edge Cases

- Que sucede si la API de Open-Meteo no devuelve datos para alguno de los 7 días (datos incompletos)?
- Como se comporta la sección si la ubicación del usuario no está disponible o es inválida?
- Que sucede si el usuario cambia de ubicación mientras los datos del historial se están cargando?

## Requirements *(mandatory)*

### Functional Requirements

- **FR-001**: El sistema DEBE mostrar una sección de historial de 7 días debajo de la información del clima actual en la página de clima.
- **FR-002**: El sistema DEBE mostrar para cada día: el nombre del día de la semana (ej. "Lunes"), un icono o etiqueta descriptiva del clima, la temperatura máxima y la temperatura mínima.
- **FR-003**: Los datos DEBEN obtenerse de la API de Open-Meteo utilizando los datos meteorológicos históricos de los últimos 7 días naturales (sin incluir hoy).
- **FR-004**: Las cards DEBEN mostrarse en una disposición horizontal con scroll cuando no quepan en el ancho de pantalla disponible.
- **FR-005**: El sistema DEBE mostrar un indicador de carga mientras se obtienen los datos del historial.
- **FR-006**: El sistema DEBE mostrar un mensaje de error si la obtención de datos del historial falla.
- **FR-007**: La sección de historial DEBE usar la misma ubicación que utiliza la sección de clima actual.
- **FR-008**: Las fechas DEBEN mostrarse en español.

### Key Entities

- **Día Histórico**: Representa un día del historial, con fecha, condición climática (código/etiqueta), temperatura máxima y temperatura mínima.
- **Historial Semanal**: Colección de 7 días históricos obtenidos de la API, asociados a una ubicación geográfica específica.

## Success Criteria *(mandatory)*

### Measurable Outcomes

- **SC-001**: El usuario puede ver los datos meteorológicos de los 7 días anteriores en menos de 3 segundos tras cargar la página.
- **SC-002**: Cada card muestra correctamente los 4 datos requeridos: día de la semana, icono/etiqueta del clima, temperatura máxima y temperatura mínima.
- **SC-003**: En pantallas donde las 7 cards no caben, el usuario puede hacer scroll horizontal para acceder a todas ellas.
- **SC-004**: El 100% de los estados de error muestran un mensaje comprensible al usuario.

## Assumptions

- La página de clima actual ya existe y funciona correctamente con una ubicación definida.
- Los "últimos 7 días" se refiere a los 7 días naturales anteriores al día actual (sin incluir hoy).
- Los iconos o etiquetas del clima se derivan del código de condición meteorológica proporcionado por la API (weather code).
- El historial se obtiene en la misma petición o en una petición separada usando la misma ubicación que el clima actual.
- No se requiere persistencia local de los datos del historial; se obtienen cada vez que se carga la página.
