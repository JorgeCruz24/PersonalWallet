# Configuración de desarrollo local

**Estado:** pendiente de implementar y validar.

## Requisitos previstos

- Node.js en versión LTS compatible con las dependencias seleccionadas.
- npm.
- Docker y Docker Compose.
- Git.

## Pasos pendientes

1. Inicializar `apps/frontend` con Vue 3 + Vite + TypeScript.
2. Inicializar `apps/backend` con NestJS + TypeScript.
3. Crear `docker-compose.yml` para PostgreSQL local.
4. Configurar variables de entorno sin incluir secretos reales en Git.
5. Configurar Prisma y validar migraciones.
6. Documentar comandos reales de arranque, pruebas y compilación.

No usar datos financieros reales durante las pruebas iniciales.
