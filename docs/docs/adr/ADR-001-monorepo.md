# ADR-001: Organizar PersonalWallet como monorepo

- **Estado:** Aceptada
- **Fecha:** 2026-11-13
- **Proyecto:** PersonalWallet

## Contexto
PersonalWallet requiere una aplicación Vue 3, una API NestJS, documentación y configuración local. El proyecto será mantenido inicialmente por un único desarrollador y tendrá dos usuarios finales.

## Decisión
Usar un único repositorio Git privado con `apps/frontend`, `apps/backend`, `docs/` y configuración compartida en la raíz. Cada aplicación conserva sus dependencias y scripts. No se requieren paquetes compartidos hasta que exista una necesidad real.

## Alternativas consideradas
- **Repositorios separados:** límites claros, pero más coordinación de cambios y documentación.
- **Un solo proyecto full-stack:** menos estructura, pero no respeta la elección explícita Vue 3 + NestJS.

## Consecuencias
- **Ventajas:** cambios coordinados, documentación centralizada, configuración uniforme y una sola revisión de código.
- **Costos:** CI y despliegue deben distinguir aplicaciones; evitar acoplamiento accidental entre módulos.

## Criterios de implementación
- Estructura inicial: `apps/frontend/`, `apps/backend/`, `docs/adr/`, `README.md`, `AGENTS.md`.
- Mantener `frontend` y `backend` como aplicaciones desplegables de forma independiente.
- No importar código fuente del backend directamente en el frontend.
- No introducir herramientas complejas de monorepo (Nx/Turborepo) sin una necesidad medible.

## Revisión de la decisión
Revisar si aparecen múltiples equipos, ciclos de publicación incompatibles o librerías compartidas que justifiquen cambiar la organización.
