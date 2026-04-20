# Tareas de Live Coding — Masterclass SDD

Estas tareas se implementan en los 3 proyectos para demostrar cómo mejora la calidad del output de la IA conforme le damos más contexto, estructura y herramientas.

| Proyecto | Contexto disponible |
|---|---|
| `weather-app/` | Nada — prompt crudo, sin reglas ni docs |
| `weather-app-2/` | Skills, Agents, AGENTS.md, CONTRIBUTING.md, README.md, copilot-instructions |
| `weather-app-3/` | Todo lo anterior + Speckit (constitution, specify, plan, tasks, implement) |

---

## Tarea 1: Historial de clima — últimos 7 días

**Qué pedir:**
En la página principal de clima (`Weather.jsx`), añadir una sección debajo del clima actual que muestre el historial de los últimos 7 días con temperatura máxima, mínima y código de clima por día.

**Qué observar en cada proyecto:**

| Aspecto | weather-app (crudo) | weather-app-2 (skills) | weather-app-3 (speckit) |
|---|---|---|---|
| ¿Usa la API correcta? | Puede inventar un endpoint | Skill de api-integration explica los parámetros | Spec define el endpoint y parámetros exactos |
| ¿Reutiliza getWeatherLabel? | Puede crear función duplicada | Skill lo menciona explícitamente | Plan identifica la reutilización |
| ¿Estilo de las cards de días? | Diseño arbitrario | Skill de styling mantiene coherencia | Spec define diseño antes de implementar |
| ¿Maneja loading y error? | Puede olvidar edge cases | Skill de react-components lo exige | Criterios de aceptación lo validan |

**Nota sobre la API:**
Open-Meteo soporta datos históricos con el endpoint `https://archive-api.open-meteo.com/v1/archive` o usando `past_days=7` en el endpoint de forecast. Ambos son válidos — lo interesante es ver si la IA elige bien sin que se lo digas.

**Prompt sugerido (para los 3):**
> En la página de clima actual, añade una sección debajo que muestre el historial del clima de los últimos 7 días. Para cada día, muestra: fecha (día de la semana), icono/label de clima, temperatura máxima y mínima. Usa la API de Open-Meteo. Muestra los datos en cards horizontales con scroll si no caben en pantalla.

---

## Tarea 2: Página de humedad

**Qué pedir:**
Crear una nueva página `/humedad` que muestre la humedad relativa actual y un historial de humedad de los últimos 7 días (o las próximas horas). Navegable desde la página principal.

**Qué observar en cada proyecto:**

| Aspecto | weather-app (crudo) | weather-app-2 (skills) | weather-app-3 (speckit) |
|---|---|---|---|
| ¿Crea Humidity.jsx + Humidity.css? | Estructura impredecible | Sigue el patrón de `src/pages/` | Spec y plan definen archivos |
| ¿Añade ruta en main.jsx? | Puede crear otro router | Agent lo sabe | Tasks lo desglosa |
| ¿Parámetros de API correctos? | Puede inventar | Skill de api-integration guía | Spec captura endpoint y parámetros |
| ¿Navegación entre páginas? | Puede no añadirla | Depende del prompt | Spec lo incluye como criterio |
| ¿Estilos consistentes con Weather? | Improbable | Skill de styling alinea | Constitution + spec aseguran coherencia |

**Prompt sugerido (para los 3):**
> Crea una nueva página en `/humedad` que muestre la humedad relativa actual y un historial por horas del día de hoy. Usa la API de Open-Meteo con el parámetro `hourly=relative_humidity_2m`. Añade navegación para ir y volver entre la página de clima y la de humedad. Sigue el mismo estilo visual que la página de clima.

---

## Tarea 3: Página de viento

**Qué pedir:**
Crear una nueva página `/viento` que muestre la velocidad y dirección del viento actual, más un historial por horas. Navegable desde las demás páginas.

**Qué observar en cada proyecto:**

| Aspecto | weather-app (crudo) | weather-app-2 (skills) | weather-app-3 (speckit) |
|---|---|---|---|
| ¿Estructura de archivos? | Impredecible | `src/pages/Wind.jsx` + `Wind.css` | Spec define todo |
| ¿Dirección del viento? | Puede olvidarla o mostrar grados crudos | Depende del prompt | Spec debería capturarlo |
| ¿Navegación consistente? | Puede crear nav distinta a la de humedad | Agent reutiliza patrones | Plan unifica navegación |
| ¿Datos de API correctos? | Puede inventar parámetros | Skill guía los parámetros básicos | Spec captura los exactos |

**Prompt sugerido (para los 3):**
> Crea una nueva página en `/viento` que muestre la velocidad del viento actual (km/h) y la dirección del viento en grados y como punto cardinal (N, NE, E, etc.). Incluye un historial por horas del día de hoy con velocidad y dirección. Usa la API de Open-Meteo con los parámetros `current=wind_speed_10m,wind_direction_10m` y `hourly=wind_speed_10m,wind_direction_10m`. Añade navegación consistente con las demás páginas.

---

## Tarea 4: Modo oscuro / claro

**Qué pedir:**
Añadir un toggle de tema (oscuro/claro) que cambie los colores de toda la app. El toggle debe estar visible en todas las páginas y recordar la preferencia del usuario.

**Qué observar en cada proyecto:**

| Aspecto | weather-app (crudo) | weather-app-2 (skills) | weather-app-3 (speckit) |
|---|---|---|---|
| ¿Respeta CSS vanilla? | Puede meter CSS-in-JS o Tailwind | Debería respetar el skill de styling | Speckit fuerza la spec antes del código |
| ¿Dónde pone el toggle? | Puede inventar un layout nuevo | Debería seguir el patrón de components | Plan + tasks definen ubicación exacta |
| ¿Usa localStorage? | Puede olvidarlo | CONTRIBUTING.md no lo especifica — buen test | La spec debería capturarlo como criterio |
| ¿Paleta de colores consistente? | Probable que invente colores | Tiene la paleta en el skill de styling | Constitution + spec alinean la paleta |

**Prompt sugerido (para los 3):**
> Añade un toggle de modo oscuro/claro a la app. Debe estar visible en todas las páginas, cambiar los colores del fondo, cards y texto. La preferencia debe persistir entre sesiones usando localStorage. Respeta también la preferencia del sistema operativo como valor inicial (prefers-color-scheme).

---

## Tarea 5: Login con usuario y contraseña

**Qué pedir:**
Crear una página de login que pida usuario y contraseña. Las credenciales válidas son `admin` / `admin`. Si el login es correcto, redirigir a la app. Si no, mostrar error. La sesión debe persistir con localStorage. Todas las demás páginas deben estar protegidas — si no hay sesión, redirigir al login.

**Qué observar en cada proyecto:**

| Aspecto | weather-app (crudo) | weather-app-2 (skills) | weather-app-3 (speckit) |
|---|---|---|---|
| ¿Crea Login.jsx + Login.css? | Puede crear una estructura distinta | El agent sabe que cada página va en `src/pages/` con su `.css` | La spec define archivos antes de tocar código |
| ¿Añade la ruta en main.jsx? | Puede crear un router nuevo | Sabe que las rutas van en `main.jsx` | Tasks lo desglosa paso a paso |
| ¿Protege las rutas? | Puede olvidarlo o hacerlo parcialmente | El agent de requerimientos debería capturarlo | Criterios de aceptación lo fuerzan |
| ¿Estilos consistentes? | Probable que no coincidan con Weather | Skill de styling define la paleta | Constitution mantiene coherencia visual |
| ¿Contenido en español? | Puede mezclar idiomas | AGENTS.md especifica: UI en español, código en inglés | La spec hereda las reglas |

**Prompt sugerido (para los 3):**
> Crea una página de login en `/login` con campos de usuario y contraseña. Las credenciales válidas son usuario `admin` y contraseña `admin`. Si el login es correcto, guarda la sesión en localStorage y redirige a la página principal. Si falla, muestra un mensaje de error. Protege todas las demás rutas: si no hay sesión activa, redirigir a `/login`. Añade también un botón de cerrar sesión visible en las páginas protegidas.

---

## Cómo ejecutar en cada proyecto

### weather-app/ (prompt crudo)
Abre tu herramienta de IA y pega el prompt sugerido directamente. Sin más contexto.

### weather-app-2/ (skills + agents)
En OpenCode, invoca el agente de requerimientos primero:
```
@requirements [pega el prompt]
```
Luego pasa la spec al agente de implementación:
```
@implementation Implementa la spec que acaba de generar el agente de requerimientos
```
En Copilot, simplemente trabaja en el proyecto — las instrucciones de `.github/copilot-instructions.md` se cargan automáticamente.

### weather-app-3/ (speckit)
Sigue el flujo completo de Speckit:
```
/speckit.specify [describe el feature]
/speckit.plan [tech stack y decisiones]
/speckit.tasks
/speckit.implement
```
