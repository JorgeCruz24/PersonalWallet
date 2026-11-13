# AGENTS.md — PersonalWallet

## Project overview

PersonalWallet es una aplicación web privada para administrar ingresos y gastos personales y compartidos de dos usuarios.

## Technology stack

- Frontend: Vue 3, Vite, TypeScript, Pinia y Tailwind CSS.
- Backend: NestJS y TypeScript.
- Database: PostgreSQL.
- ORM: Prisma.
- Architecture: monorepo con `apps/frontend` y `apps/backend`.

## General instructions

1. Consultar `README.md` para comprender el objetivo del proyecto.
2. Revisar los ADR relevantes en `docs/adr/` antes de realizar cambios arquitectónicos.
3. Mantener una arquitectura sencilla y modular. No introducir microservicios sin una decisión arquitectónica aprobada.
4. Utilizar TypeScript en frontend y backend.
5. No agregar dependencias innecesarias.
6. No modificar archivos ajenos a la tarea sin justificación.
7. No realizar commits, despliegues ni cambios de infraestructura sin autorización explícita.
8. Actualizar la documentación cuando cambie el comportamiento o la arquitectura.

## Business rules

- PersonalWallet permite únicamente dos usuarios autorizados.
- Cada usuario dispone de finanzas personales.
- Ambos usuarios pueden administrar un espacio financiero compartido.
- Los movimientos personales no deben ser accesibles por el otro usuario.
- La moneda es exclusivamente MXN.
- No se realiza reparto automático de gastos compartidos.
- Los movimientos utilizan eliminación lógica mediante `deletedAt`.
- Los movimientos eliminados no deben incluirse en consultas normales ni en balances.

## Backend rules

- Organizar NestJS mediante módulos, controladores y servicios.
- Utilizar Prisma ORM para acceder a PostgreSQL.
- Validar las entradas mediante DTOs.
- Comprobar autenticación y autorización en el backend.
- Nunca confiar exclusivamente en validaciones del frontend.
- Utilizar `Decimal` para cantidades monetarias.
- No exponer contraseñas, hashes ni información sensible.
- Crear pruebas para reglas de negocio y operaciones críticas.

## Frontend rules

- Utilizar Vue 3 con Composition API y `<script setup>`.
- Mantener componentes pequeños y reutilizables.
- Utilizar Pinia para estado compartido cuando sea necesario.
- Separar la comunicación HTTP de los componentes visuales.
- Crear interfaces responsive para escritorio y dispositivos móviles.
- Mostrar mensajes claros de error, carga y confirmación.

## Architecture decisions

Antes de implementar cambios relevantes, consultar:

- ADR-001: Monorepo.
- ADR-002: Vue 3.
- ADR-003: NestJS.
- ADR-004: PostgreSQL y Prisma.
- ADR-005: Finanzas personales y compartidas.
- ADR-006: Eliminación lógica.

Si una solicitud contradice un ADR aceptado, informar del conflicto y proponer una nueva decisión antes de modificar la arquitectura.

## Definition of done

Una tarea se considera terminada cuando:

- La implementación cumple los requisitos solicitados.
- Se respetan las reglas de negocio y autorización.
- Se ejecutan las pruebas pertinentes cuando están disponibles.
- No se introducen errores conocidos de compilación o tipado.
- Se actualiza la documentación cuando corresponde.
- Se informa qué archivos fueron modificados y qué validaciones se realizaron.
