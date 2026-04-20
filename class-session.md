# Class Session — Guía detallada del instructor

**Masterclass: SDD + Live Coding Inteligente con OpenCode, GitHub Copilot & Speckit**
**App base para demos:** `weather-app/` (React + Vite, API Open-Meteo)

---

## Estrategia de ramas

Crear las siguientes ramas antes de la sesión para que el público pueda seguir cada fase:

| Rama | Contenido | Parte de la sesión |
|---|---|---|
| `main` | Estado inicial — weather-app funcional básica | Base |
| `session/skills-and-agents` | Skills (.md), agents configurados, demo del feature con agentes | 20:00 — 32:00 |
| `session/docs-and-context` | Todo lo anterior + `CONTRIBUTING.md`, `README.md` mejorado, docs de contexto | 32:00 — 42:00 |

> **Nota:** Las ramas no están creadas aún. Crearlas manualmente antes de la sesión siguiendo el orden de la masterclass.

---

## 00:00 — 10:00 | Intro & Teoría SDD

### Qué explicar

**SDD (Spec-Driven Development)** es la idea de que antes de escribir código (o pedirle a una IA que lo escriba), defines una especificación clara de qué quieres construir. Es el equivalente a darle un plano a un constructor en vez de decirle "hazme una casa bonita".

### Puntos clave a profundizar

1. **El problema real no es la IA, es el input.** La calidad del output es directamente proporcional a la calidad de la spec. Esto no es nuevo — es ingeniería de software básica, pero con IA se hace evidente de forma inmediata porque el feedback loop es instantáneo.

2. **El flujo mental: Spec → Agente → Código → Validación.**
   - **Spec:** documento que describe qué construir, con qué restricciones, y qué criterios de aceptación tiene.
   - **Agente:** la IA configurada con contexto y reglas que ejecuta la spec.
   - **Código:** el output generado.
   - **Validación:** verificar que el código cumple la spec (tests, revisión manual, linting).

3. **Dirigir vs escribir.** El cambio de mentalidad: pasas de ser el que escribe cada línea a ser el que define qué se escribe y valida el resultado. No es menos trabajo — es trabajo diferente. Y requiere más claridad mental, no menos.

### Cómo enseñarlo con weather-app

Abre la app en el navegador, muestra que es simple (muestra el clima actual). Luego pregunta: *"Si quisiera añadir un pronóstico de 5 días a esta app, ¿qué le dirían a la IA?"* Deja que el público responda. La mayoría dirá algo vago. Ese es tu punto de entrada.

---

## 10:00 — 20:00 | Método manual: el prompt rudimentario

### Qué explicar

Esta sección demuestra el enfoque "naive" — pedirle a la IA que haga algo sin estructura, solo con un prompt directo. El objetivo es que el resultado funcione pero sea impreciso, para que el contraste con las siguientes secciones sea evidente.

### Feature para la demo

**Pronóstico de 5 días** en la weather-app. Es perfecto porque:
- La API de Open-Meteo ya soporta `daily` forecast (no necesitas nueva API key)
- Requiere cambios en UI (nueva sección de cards por día)
- Requiere cambios en la lógica de fetch (nuevos parámetros)
- Hay decisiones de diseño que la IA tendrá que inventar si no le das spec

### Paso a paso de la demo

1. **Primer prompt (generar plan):**
   ```
   Revisa la estructura del repo weather-app y sus configuraciones.
   Genera un archivo plan.md con los pasos para añadir un pronóstico de 5 días.
   ```
   Deja que la IA genere el plan. Léelo con el público. Señala lo que está bien y lo que es genérico.

2. **Segundo prompt (implementar):**
   ```
   Implementa lo que describe plan.md
   ```
   Deja que ejecute. El resultado probablemente:
   - Funcionará técnicamente
   - No seguirá el patrón exacto de `Weather.jsx` (puede crear componentes de forma distinta)
   - Puede inventar estilos que no encajan con `Weather.css`
   - Puede no reutilizar `getWeatherLabel`

3. **Pausa y análisis:** Muestra el resultado y señala los problemas. No son bugs — es falta de contexto. La IA no sabe las convenciones del proyecto porque nadie se las dijo.

### Punto clave a remarcar

> "Esto es lo que pasa cuando usamos IA sin spec y sin contexto. Funciona, pero no es mantenible. Si otro dev (o la misma IA en otra sesión) toca este código, no hay garantía de consistencia."

---

## 20:00 — 32:00 | Skills y Agents: dándole estructura a la IA

### Qué explicar en profundidad

#### Skills (5 min de teoría)

Un **skill** es un conjunto de instrucciones especializadas que le dan a la IA contexto sobre *cómo* hacer algo en tu proyecto específico. No es un prompt genérico — es conocimiento codificado del repo.

**Ejemplos concretos para weather-app:**
- "Cuando crees un componente nuevo, sigue el patrón de `Weather.jsx`: estado con `useState`, fetch en `useEffect`, misma estructura de JSX con clases CSS"
- "Los estilos van en un archivo `.css` separado en la misma carpeta, no uses CSS-in-JS ni inline styles"
- "Las labels de clima usan la función `getWeatherLabel` que mapea WMO codes a español con emojis"
- "La app usa React Router v7 con rutas definidas en `main.jsx`"

**Cómo se implementan según el provider:**

| Provider | Mecanismo | Ubicación |
|---|---|---|
| **OpenCode** | Archivos `.md` cargados como skills | Configuración de OpenCode |
| **GitHub Copilot** | `.github/copilot-instructions.md` | Raíz del repo |
| **Claude Code** | `CLAUDE.md` | Raíz del repo |

#### Agents (5 min de teoría)

Un **agent** es un rol con un objetivo definido. Mientras un skill dice *cómo*, un agent dice *qué hacer* y *con qué objetivo*. Un agent puede usar múltiples skills.

**Dos agents para la demo:**

1. **Agente de requerimientos:**
   - Objetivo: analizar un feature request y generar una spec estructurada
   - No escribe código — solo spec
   - Output: documento con scope, criterios de aceptación, archivos afectados, dependencias

2. **Agente de implementación:**
   - Objetivo: recibir una spec y ejecutarla
   - Usa skills del repo para mantener consistencia
   - Output: código que cumple la spec y sigue las convenciones

### Demo en vivo

1. Crear los skills como archivos `.md` en el repo (o en la config del provider que uses)
2. Configurar los dos agents
3. Ejecutar el **mismo feature** (pronóstico 5 días) pero esta vez:
   - Primero el agente de requerimientos genera la spec
   - Luego el agente de implementación ejecuta usando los skills
4. Comparar el resultado con el método manual — debería ser más consistente con el código existente

### Punto clave a remarcar

> "Con skills y agents, la IA deja de adivinar. Tiene reglas claras y roles definidos. Pero todavía hay información que falta — cómo correr el proyecto, cómo testear, la arquitectura general. Eso es documentación."

### Rama: `session/skills-and-agents`

Esta rama debe contener:
- Los archivos de skills creados durante la demo
- La configuración de agents
- El resultado de la implementación con agents
- El `plan.md` o spec generado por el agente de requerimientos

---

## 32:00 — 42:00 | Documentación como contexto

### Qué explicar en profundidad

La documentación del repo no es solo para humanos — es contexto que la IA puede consumir automáticamente. Un `CONTRIBUTING.md` bien escrito elimina la necesidad de repetir convenciones en cada prompt.

#### Qué debe tener cada archivo

**`README.md` de weather-app** (actualmente vacío — perfecto para la demo):
- Qué es la app y qué hace
- Stack: React 19 + Vite 8 + React Router 7
- Cómo instalar: `npm install`
- Cómo correr: `npm run dev`
- API utilizada: Open-Meteo (sin API key)
- Estructura de carpetas breve

**`CONTRIBUTING.md`:**
- Convenciones de código (functional components, hooks, no class components)
- Estructura de archivos (pages en `src/pages/`, cada page con su `.css`)
- Patrones a seguir (estado con `useState`, efectos con `useEffect`, no state managers externos)
- Flujo de trabajo: branch → implementar → revisar → merge
- Cómo añadir una nueva página: crear componente en `src/pages/`, añadir ruta en `main.jsx`, estilos en archivo separado

### Demo en vivo

1. Mostrar que `weather-app/README.md` está vacío — la IA no tiene contexto base
2. Escribir el README en vivo (no tiene que ser perfecto, 20-30 líneas)
3. Escribir un CONTRIBUTING.md con las convenciones
4. Volver a ejecutar el agente de implementación con el mismo feature
5. Mostrar cómo el resultado mejora porque ahora tiene contexto base que no tenía antes

### Punto clave a remarcar

> "Si un dev nuevo entra a tu repo sin CONTRIBUTING.md, tiene el mismo problema que la IA: tiene que adivinar convenciones. Buena documentación es buena ingeniería, con o sin IA."

### Rama: `session/docs-and-context`

Esta rama debe contener todo lo de `session/skills-and-agents` más:
- `weather-app/README.md` completado
- `CONTRIBUTING.md` con convenciones del repo
- El resultado mejorado de la implementación con documentación como contexto

---

## 42:00 — 52:00 | El gran final: Speckit

### Qué explicar en profundidad

Speckit es la herramienta que integra todo lo que se hizo manualmente en las secciones anteriores:

| Lo que hicimos manual | Speckit lo hace... |
|---|---|
| Escribir un plan.md a mano | Genera specs estructuradas automáticamente |
| Crear skills como archivos .md | Tiene skills optimizados out-of-the-box |
| Configurar agents manualmente | Agents preconfigurados con roles claros |
| Escribir README/CONTRIBUTING | Integra contexto del repo automáticamente |

### Flujo de la demo

1. **Recap rápido (2 min):** Muestra los 3 resultados anteriores brevemente — prompt crudo, con agents, con docs. Usa screenshots o tabs del editor si preparaste los resultados de antemano.

2. **Speckit en acción (8 min):**
   - Instalar/configurar Speckit en el repo
   - Ejecutar el mismo feature (pronóstico 5 días)
   - Mostrar cómo Speckit genera la spec, usa contexto del repo, y ejecuta con agents optimizados
   - Resultado final: comparar side-by-side

3. **Cierre narrativo:** *"Empezamos con un prompt y un sueño. Terminamos con un sistema."*

### Punto clave a remarcar

> "Speckit no reemplaza el entendimiento — lo amplifica. Sigue necesitando que definas bien qué quieres. Pero elimina todo el boilerplate de configurar agents, skills y contexto cada vez."

---

## 52:00 — 57:00 | 3 reglas de oro del Live Coding con IA

### Regla 1: Sé específico en el qué, flexible en el cómo

- **Malo:** "Mejora la UI"
- **Bueno:** "Añade una sección de pronóstico de 5 días debajo del clima actual, usando cards horizontales con el día de la semana, icono de clima y temperatura máxima/mínima"
- **Explicación:** Define el resultado esperado con claridad. Deja que la IA decida detalles de implementación — pero si tienes convenciones, dáselas como skill.

### Regla 2: Intervén cuando el agente se desvía, no cuando va lento

- La tentación es interrumpir cuando la IA "piensa mucho" o genera código intermedio. No lo hagas.
- Intervén cuando: genera un archivo en el lugar incorrecto, usa un patrón que no quieres, o se va por una tangente.
- No intervenir cuando: está generando paso a paso, hace refactors intermedios, o tarda más de lo esperado.
- **Analogía:** Es como un dev junior — déjalo trabajar, pero revisa antes del merge.

### Regla 3: Resetea contexto en sesiones largas

- Las sesiones largas acumulan contexto que puede contradecirse.
- Cada ~30 min o cuando cambies de feature, considera empezar una sesión nueva.
- La documentación del repo (README, CONTRIBUTING) sirve como "memoria persistente" que sobrevive entre sesiones.
- **Esto conecta directamente con lo que vimos:** si el contexto está en archivos del repo, no se pierde al resetear la sesión.

---

## 57:00 — 60:00 | Q&A

### Si no hay preguntas

Lanza provocaciones:
- *"¿Seguirían usando IA sin spec después de esto?"*
- *"¿Cuántos tienen un CONTRIBUTING.md en su repo principal?"*
- *"¿Qué feature implementarían primero con este flujo cuando lleguen a casa?"*

### Preguntas frecuentes esperadas

- **"¿Funciona con otros lenguajes?"** — Sí, SDD es agnóstico. Skills y agents se adaptan al stack.
- **"¿Cuánto tiempo se pierde configurando esto?"** — La primera vez, 30-60 min. Después es reutilizable. Y el CONTRIBUTING.md ya lo deberías tener.
- **"¿Y si la IA ignora los skills?"** — Pasa. Por eso la validación es parte del flujo. Spec → Agente → Código → **Validación**.

---

## Checklist pre-sesión

- [ ] `weather-app` corriendo localmente (`npm run dev`)
- [ ] Rama `main` limpia con la app base
- [ ] Rama `session/skills-and-agents` preparada (o saber qué crear en vivo)
- [ ] Rama `session/docs-and-context` preparada (o saber qué crear en vivo)
- [ ] OpenCode / Copilot / herramienta de IA configurada y funcionando
- [ ] Speckit instalado y configurado
- [ ] Navegador abierto con la app para mostrar resultados
- [ ] Diagrama de flujo SDD preparado (Spec → Agente → Código → Validación)
