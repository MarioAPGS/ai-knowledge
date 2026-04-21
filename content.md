# Conceptos clave: Agents, Skills y Speckit

---

## Agents (OpenCode)

Un agent es un **subagente especializado** que define un rol con permisos y comportamiento acotados. Vive en `.opencode/agents/<nombre>.md` con frontmatter YAML.

```yaml
---
description: "Analiza requerimientos y genera specs sin tocar código"
mode: plan
permission: read
---
```

Campos clave:
- **`description`** — Cuándo invocarlo (OpenCode lo usa para decidir si sugerirlo)
- **`mode`** — `plan` (solo razona) o `code` (puede editar archivos)
- **`permission`** — `read` (solo lectura) o `edit` (puede modificar)

El cuerpo del markdown es el **system prompt** del agente: le dice qué hacer, qué no hacer, qué archivos consultar, qué formato usar para su output.

Se invoca con `@nombre` en el chat:
```
@requirements Necesito una página de login con credenciales admin/admin
@implementation Implementa la spec que generó el agente de requerimientos
```

### Para qué sirve separar en agents

Sin agents, la IA hace todo en una sola conversación: analiza, decide, escribe código, y mezcla responsabilidades. Con agents separas **quién piensa** de **quién ejecuta**. Un agent de requerimientos no puede escribir código (permission: read), así que se concentra en la spec. Un agent de implementación no inventa requerimientos, solo sigue lo que le pasaron.

---

## Skills (OpenCode)

Una skill es un **bloque de conocimiento reutilizable** que la IA carga bajo demanda. Vive en `.opencode/skills/<nombre>/SKILL.md` con frontmatter YAML.

```yaml
---
name: api-integration
description: "Patrón de integración con la API de Open-Meteo"
---
```

El cuerpo del markdown contiene el conocimiento: patrones de código, convenciones, endpoints, paletas de colores, reglas de estilo — lo que sea que la IA necesite saber para hacer bien su trabajo.

Se carga automáticamente cuando OpenCode detecta que es relevante (por la `description`), o manualmente con `/skill api-integration`.

### Por qué las skills NO van dentro del agent

La tentación es meter todo el conocimiento directamente en el agent. Pero eso tiene 3 problemas:

**1. Contexto desperdiciado.** Si metes la paleta de colores, los endpoints de la API y las convenciones de componentes en el agent de implementación, ese contexto se carga SIEMPRE — aunque la tarea sea solo cambiar un texto. Las skills se cargan **solo cuando son relevantes**, ahorrando ventana de contexto.

**2. No se pueden compartir.** Si dos agents necesitan saber la paleta de colores (el de implementación y uno de revisión de código), tendrías que duplicar la información en ambos. Una skill es un recurso compartido que cualquier agent puede cargar.

**3. Mezcla de responsabilidades.** El agent define el **rol y las reglas de comportamiento** (qué puede hacer, cómo debe actuar). La skill define **conocimiento del dominio** (cómo funciona la API, qué colores usar). Son capas distintas:

| | Agent | Skill |
|---|---|---|
| Define | Rol, permisos, comportamiento | Conocimiento, patrones, convenciones |
| Se carga | Siempre (al invocarlo) | Bajo demanda (cuando es relevante) |
| Ejemplo | "Solo genera specs, no escribas código" | "La API de Open-Meteo usa estos parámetros..." |
| Equivalente | Un puesto de trabajo con su job description | Un manual de referencia en el estante |

Piensa en el agent como una **persona con un rol** y la skill como un **libro que consulta cuando lo necesita**. No le pegas la enciclopedia entera a la persona — le das acceso a la biblioteca.

---

# Cómo funciona Speckit

## Qué es

Speckit es una CLI (`specify`) que instala un **pipeline de Spec-Driven Development** directamente en tu repo. No es un servicio ni una dependencia de runtime — es un conjunto de **archivos estáticos** (templates, scripts bash, agents/commands para tu IA) que se generan con `specify init`.

## El init

```bash
specify init . --ai copilot --offline
# o
specify init . --ai opencode --offline
```

Solo permite **una integración por init**. Para tener ambas (como en weather-app-3), se hizo init con copilot y luego se copió `.opencode/command/` desde un init temporal con opencode.

El init crea 3 cosas:

### 1. `.specify/` — El cerebro del proyecto

- `init-options.json` — Config (IA elegida, tipo de numeración de ramas, versión)
- `memory/constitution.md` — Constitución del proyecto (empieza como template con `[PLACEHOLDERS]`, se llena con `/speckit.constitution`)
- `templates/` — 6 templates markdown (spec, plan, tasks, checklist, constitution, agent-file)
- `scripts/bash/` — 5 scripts que automatizan: crear feature branch, copiar templates, resolver rutas, actualizar contexto de agentes. El más grande (`update-agent-context.sh`, 837 líneas) soporta 25+ agentes de IA distintos.

### 2. Archivos de integración con la IA — 9 comandos/agentes

| Para Copilot | Para OpenCode |
|---|---|
| `.github/agents/speckit.*.agent.md` | `.opencode/command/speckit.*.md` |
| `.github/prompts/speckit.*.prompt.md` (thin triggers) | — |

Son el mismo contenido adaptado al formato de cada herramienta (frontmatter YAML distinto).

### 3. `.vscode/settings.json`

Habilita que Copilot sugiera los comandos speckit y auto-apruebe ejecución de los scripts.

## El pipeline (los 9 comandos)

```
/speckit.constitution   → Define reglas no negociables del proyecto
        ↓
/speckit.specify        → Descripción natural → spec.md + rama git + specs/<rama>/
        ↓
/speckit.clarify        → Hasta 5 preguntas de clarificación → actualiza spec
        ↓
/speckit.plan           → Plan de implementación (plan.md, research.md, data-model.md, contracts/)
        ↓
/speckit.checklist      → "Unit tests para requerimientos" — valida calidad de la spec
        ↓
/speckit.tasks          → Lista de tareas ordenadas por dependencia y user story
        ↓
/speckit.analyze        → Análisis read-only de consistencia entre todos los artefactos
        ↓
/speckit.implement      → Ejecuta las tareas fase por fase con tracking de progreso
        ↓
/speckit.taskstoissues  → Convierte tareas en GitHub Issues
```

## Cómo se conectan las piezas

Cuando ejecutas `/speckit.specify`, el comando:

1. Corre `create-new-feature.sh` → crea rama git (`003-mi-feature`), directorio `specs/003-mi-feature/`, copia `spec-template.md`
2. La IA llena el template con la descripción que le diste

Cuando ejecutas `/speckit.plan`:

1. Corre `setup-plan.sh` → copia `plan-template.md` al directorio del feature
2. Corre `update-agent-context.sh` → actualiza archivos de contexto para que la IA sepa del stack elegido
3. La IA genera el plan basándose en la spec + constitution

Cada comando siguiente (`tasks`, `implement`) usa `check-prerequisites.sh` para validar que los artefactos previos existen antes de continuar.

## Estructura de archivos generados

```
.specify/
├── init-options.json
├── memory/
│   └── constitution.md
├── scripts/bash/
│   ├── common.sh
│   ├── check-prerequisites.sh
│   ├── create-new-feature.sh
│   ├── setup-plan.sh
│   └── update-agent-context.sh
└── templates/
    ├── agent-file-template.md
    ├── checklist-template.md
    ├── constitution-template.md
    ├── plan-template.md
    ├── spec-template.md
    └── tasks-template.md

.github/
├── agents/speckit.*.agent.md       (9 agentes para Copilot)
└── prompts/speckit.*.prompt.md     (9 triggers para Copilot)

.opencode/
└── command/speckit.*.md            (9 comandos para OpenCode)

.vscode/
└── settings.json
```
