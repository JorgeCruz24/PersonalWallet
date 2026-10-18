# ADR-001: Estructura del repositorio (Monorepo)

**Estado:** Aceptado

## Contexto

El proyecto **Personal Wallet** consta de al menos dos componentes principales: un frontend (aplicación web) y un backend (API). Se necesita definir cómo se estructurará el código fuente en el sistema de control de versiones para facilitar el desarrollo, despliegue y mantenimiento.

## Problema

¿Deberíamos separar el frontend y el backend en dos repositorios distintos o mantenerlos juntos en un único repositorio (monorepo)?

## Alternativas consideradas

1. **Multirepo (Dos repositorios independientes):**
   * Un repositorio dedicado exclusivamente para el proyecto de Vue (Frontend).
   * Un repositorio dedicado exclusivamente para el proyecto de NestJS (Backend).
2. **Monorepo (Un repositorio único):**
   * Mantener el frontend y el backend dentro del mismo repositorio bajo la estructura actual:
     ```text
     PersonalWallet/
     ├── frontend/       # Vue
     ├── backend/        # NestJS
     ├── docs/           # Documentación
     ├── docker-compose.yml
     ```

## Decisión tomada

Se ha decidido utilizar un enfoque de **Monorepo**, manteniendo tanto el código del frontend como del backend y la documentación en un solo repositorio unificado.

## Justificación

Para el tamaño inicial de este proyecto y asumiendo que el mismo equipo (o desarrollador individual) trabajará full-stack en las funcionalidades, el enfoque de monorepo ofrece ventajas significativas:
* **Facilidad de configuración local:** Permite tener un único archivo `docker-compose.yml` en la raíz para levantar ambos servicios y la base de datos con un solo comando.
* **Sincronización de cambios (Features / PRs):** Cuando una nueva funcionalidad requiere cambios tanto en el frontend como en la API, un monorepo permite enviar un solo Pull Request que contiene la funcionalidad completa, asegurando que las versiones del frontend y backend siempre coincidan y facilitando el code review.
* **Documentación centralizada:** La documentación arquitectónica (`docs/`) pertenece al sistema en su conjunto, por lo que tiene sentido que resida junto a todos los componentes que documenta.

## Consecuencias Positivas

* Menor fricción en el proceso de inducción (onboarding); clonar un solo repositorio provee todo el ecosistema.
* Cambios atómicos (Frontend y Backend en un mismo commit/PR).
* Gestión simplificada de herramientas como Docker Compose para el entorno de desarrollo.

## Consecuencias Negativas o Trade-offs

* **Tamaño del repositorio:** A largo plazo, el repositorio crecerá más rápido en tamaño.
* **Complejidad de CI/CD:** El pipeline de Integración/Despliegue Continuo deberá ser configurado para detectar qué carpetas cambiaron (ej. si solo cambió `frontend/`, solo compilar y desplegar el frontend) para evitar tareas redundantes.
* En equipos muy grandes y aislados (solo-frontend, solo-backend), los permisos y el ruido de notificaciones de commits pueden volverse un problema menor (no es el caso actual del proyecto).
