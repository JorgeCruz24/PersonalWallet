# ADR-002: Elección de Vue como framework Frontend

**Estado:** Aceptado

## Contexto

El proyecto **Personal Wallet** requiere una aplicación web (Frontend) interactiva y reactiva para que el usuario pueda registrar gastos, ver presupuestos y visualizar datos de forma dinámica. Se necesita seleccionar un framework o librería de JavaScript/TypeScript para construir esta interfaz.

## Necesidades del Frontend

* Creación de interfaces modulares basadas en componentes reutilizables.
* Reactividad eficiente para actualizar listas de transacciones o balances sin recargar la página.
* Curva de aprendizaje amigable o adaptada a las habilidades del equipo.
* Ecosistema maduro de herramientas (enrutamiento, manejo de estado).

## Alternativas consideradas

* **React:** Excelente ecosistema, muy popular, pero puede requerir configurar múltiples bibliotecas de terceros para tener una arquitectura base completa (estado, enrutamiento).
* **Angular:** Framework muy robusto y completo (con opinión fuerte sobre la arquitectura), pero con una curva de aprendizaje considerable y a veces percibido como excesivo (overkill) para aplicaciones pequeñas a medianas.
* **Vue:** Framework progresivo que equilibra la simplicidad con el poder, ofreciendo herramientas oficiales (Vue Router, Pinia) listas para usarse de manera integrada.

## Decisión

Se ha decidido utilizar **Vue** (versión 3) como el framework principal para el desarrollo del Frontend.

## Justificación técnica

Vue resulta altamente adecuado para este proyecto debido a que:
1. **Curva de adopción progresiva:** Permite estructurar rápidamente una aplicación sin boilerplate excesivo, ideal para iterar rápido en las primeras fases del proyecto.
2. **Reactividad transparente (Composition API):** En su versión 3, la Composition API ofrece una forma muy limpia y modular de abstraer lógica y mantener estados reactivos, lo que será muy útil para los formularios financieros y los gráficos.
3. **Ecosistema Oficial:** Vue cuenta con soluciones mantenidas oficialmente para enrutamiento y estado, lo que asegura que las herramientas principales se integren perfectamente y evolucionen a la par.

## Consecuencias

* **Positivas:** Desarrollo ágil, código limpio en componentes (SFC - Single File Components), buen rendimiento gracias a su Virtual DOM ligero.
* **Negativas / Trade-offs:** El ecosistema de librerías de terceros (ej. ciertos componentes complejos de UI de nicho) podría ser ligeramente menor comparado con la inmensidad del ecosistema de React, aunque sigue siendo muy amplio y suficiente para los requisitos de una wallet personal.
