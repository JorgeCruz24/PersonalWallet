# ADR-003: Utilizar NestJS como backend modular

- **Estado:** Aceptada
- **Fecha:** 2026-11-13
- **Proyecto:** PersonalWallet

## Contexto
PersonalWallet necesita autenticación, autorización por espacio financiero, validación de datos, CRUD y agregaciones. El alcance no requiere servicios distribuidos.

## Decisión
Implementar una API REST en NestJS con TypeScript como monolito modular. Módulos iniciales sugeridos: `auth`, `users`, `wallets`, `categories` y `transactions`. Centralizar la conexión a Prisma mediante un módulo/servicio de infraestructura.

## Alternativas consideradas
- **Express puro:** menor sobrecarga, pero exige establecer manualmente estructura y convenciones.
- **Fastify puro:** buen rendimiento, aunque no es un factor decisivo para dos usuarios.
- **Microservicios:** complejidad operativa desproporcionada.

## Consecuencias
- **Ventajas:** módulos, inyección de dependencias, DTOs, guards y pruebas estructuradas.
- **Costos:** más archivos y convenciones que una API Express pequeña.

## Criterios de implementación
- Mantener controladores delgados y reglas de negocio en servicios.
- Validar entradas mediante DTOs y `ValidationPipe`.
- Exigir autenticación y comprobar membresía del `walletId` en el servidor en cada operación.
- No habilitar registro público; crear las dos cuentas mediante un procedimiento administrativo seguro.
- No exponer contraseñas, hashes, tokens ni cadenas de conexión en logs.
- Probar rutas autorizadas, no autorizadas y accesos entre espacios.

## Revisión de la decisión
Revisar si nuevas integraciones, volumen o requisitos de despliegue justifican separar servicios.

