# Masterclass Roadmap — 1 hora

**SDD + Live Coding Inteligente con OpenCode, GitHub Copilot & Speckit**

---

## 00:00 — 10:00 | Intro & Teoría SDD

1. ¿Qué es SDD y por qué importa?
2. Flujo mental: Spec → Agente → Código → Validación
3. Diferencia entre escribir código y dirigir un agente

> **Cómo enseñarlo:** Abre con una pregunta al público: *"¿Cuántas veces le dieron un prompt vago a Copilot y el resultado fue basura?"*. Desde ahí explica que el problema no es la IA, es la falta de spec. Muestra el flujo en una diapositiva simple (puede ser un diagrama de 4 cajas). Cierra la sección diciendo: *"Esto es lo que vamos a hacer en los próximos 50 minutos, paso a paso, empezando de lo más rudimentario hasta llegar a algo profesional."*

---

## 10:00 — 20:00 | Método manual: el prompt rudimentario

4. Pedir a la IA que genere un archivo `.md` con el plan de implementación de un feature
5. En el prompt, indicarle que **antes de actuar** revise la configuración del repo (estructura, dependencias, configs)
6. Luego pedirle que implemente lo descrito en el `.md` generado

> **Cómo enseñarlo:** Haz esto en vivo. Elige un feature simple (ej. un endpoint de health-check). Primero dile a la IA algo como: *"Revisa la estructura del repo y sus configuraciones, luego genera un archivo `plan.md` con los pasos para implementar X"*. Una vez generado el `.md`, dile: *"Ahora implementa lo que describe el plan"*. El resultado será funcional pero impreciso — puede ignorar convenciones del proyecto, usar patrones incorrectos o inventar cosas. **Ese es el punto.** Haz una pausa y pregunta al público: *"¿Ven el problema? La IA no conoce las reglas de nuestro repo."*

---

## 20:00 — 32:00 | Skills y Agents: dándole estructura a la IA

7. **Teoría:** ¿Qué son los Skills y los Agents?
   - **Skill:** conjunto de instrucciones especializadas que le dicen a la IA *cómo* hacer algo dentro de un contexto concreto (ej. "cuando generes un componente React en este repo, usa este patrón")
   - **Agent:** rol con un objetivo definido que orquesta el uso de herramientas y skills (ej. "agente de requerimientos", "agente de implementación")
8. Cómo los usan los distintos providers:
   - **OpenCode:** skills como archivos `.md` que se cargan como instrucciones, agents configurables
   - **GitHub Copilot:** instrucciones personalizadas vía `.github/copilot-instructions.md`, extensiones
   - **Claude Code:** archivos `CLAUDE.md` como contexto persistente, herramientas MCP
9. **Demo en vivo:** Crear dos agentes para el repo:
   - **Agente de requerimientos:** analiza el feature, genera specs estructuradas
   - **Agente de implementación:** recibe la spec y ejecuta con skills específicas del repo (patrones, estructura de archivos, convenciones)
10. Ejecutar el mismo feature con estos agentes y comparar con el resultado del método manual

> **Cómo enseñarlo:** Empieza con 5 min de teoría pura — explica skills vs agents con un diagrama simple. Muestra cómo cada provider los implementa (no hace falta demo de cada uno, basta con mencionarlo y mostrar un ejemplo de archivo de config). Luego entra al live coding: crea los dos agentes, asígnales skills relevantes al repo y corre el mismo feature. El resultado será mejor — más determinista, más alineado con las convenciones. Pero aún habrá fallos en casos complejos. Señálalo: *"Mejor, ¿verdad? Pero si el feature fuera más complejo, seguiríamos viendo problemas. ¿Qué nos falta?"*

---

## 32:00 — 42:00 | La documentación como contexto: CONTRIBUTING.md, docs y README

11. El problema: hay información del repo que no queremos repetir en cada prompt
    - Cómo correr el proyecto, cómo correr tests, convenciones de código, arquitectura, etc.
12. La solución: documentación bien escrita sirve tanto para humanos como para agentes de IA
    - `README.md` — qué es el proyecto, cómo arrancarlo, stack tecnológico
    - `CONTRIBUTING.md` — convenciones, flujo de trabajo, patrones, estructura de carpetas
    - `docs/` — arquitectura, decisiones técnicas, guías específicas
13. Demo: agregar/mejorar la documentación del repo y volver a ejecutar el agente de implementación

> **Cómo enseñarlo:** Muestra cómo sin esta documentación la IA tiene que adivinar convenciones. Luego añade o mejora el `CONTRIBUTING.md` con las reglas del repo en vivo (no tiene que ser perfecto, solo lo esencial). Vuelve a correr el agente y muestra cómo el resultado mejora porque ahora tiene contexto base. Remarca: *"Esto no es solo para la IA — si un dev nuevo entra a tu repo y no hay CONTRIBUTING.md, tiene el mismo problema. Buena documentación beneficia a humanos y agentes por igual."*

---

## 42:00 — 52:00 | El gran final: Speckit

14. Recap rápido del camino recorrido:
    - Método manual → frágil, impreciso
    - Skills + Agents → más estructura, más determinismo, pero requiere configuración manual
    - Documentación como contexto → mejora la base, pero sigue siendo artesanal
15. **Speckit** engloba todo lo anterior de forma integrada y eficiente:
    - Generación de specs estructuradas
    - Contexto del repo integrado automáticamente
    - Agentes y skills optimizados out-of-the-box
    - Flujo completo: Spec → Implementación → Validación
16. Demo final: ejecutar el mismo feature con Speckit y comparar con todos los intentos anteriores

> **Cómo enseñarlo:** Haz el recap en 1-2 minutos — repasa los pasos del camino mostrando brevemente cada resultado anterior. Luego presenta Speckit como la evolución natural: *"Todo lo que hicimos manualmente — el plan, los agentes, las skills, la documentación — Speckit lo integra en un flujo profesional."* Corre la demo final y muestra el resultado side-by-side con los anteriores. El contraste debería ser evidente. Cierra con: *"Empezamos con un prompt y un sueño. Terminamos con un sistema."*

---

## 52:00 — 57:00 | Reglas de oro del Live Coding con IA

17. 3 reglas de prompts que cambian el resultado
18. Cuándo intervenir y cuándo dejar correr al agente
19. Cómo mantener el contexto en sesiones largas

> **Cómo enseñarlo:** Presenta las 3 reglas de forma directa y rápida, con un ejemplo concreto de cada una (bueno vs malo). No te extiendas — el público ya vio la teoría aplicada en la demo. Este bloque es el cierre conceptual que conecta todo lo que vieron en vivo.

---

## 57:00 — 60:00 | Q&A

20. Preguntas abiertas

> **Cómo enseñarlo:** Deja los últimos 3 minutos solo para preguntas. Si no hay preguntas, lanza tú una provocación: *"¿Seguirían usando IA sin spec después de esto?"*

---

> **Distribución:** ~15 min teoría · ~45 min práctica en vivo
>
> **Arco narrativo:** Prompt rudimentario → Skills & Agents → Documentación como contexto → Speckit (de lo artesanal a lo profesional)
