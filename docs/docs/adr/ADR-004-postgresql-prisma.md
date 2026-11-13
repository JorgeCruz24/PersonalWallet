# ADR-004: Utilizar PostgreSQL y Prisma ORM

- **Estado:** Aceptada
- **Fecha:** 2026-11-13
- **Proyecto:** PersonalWallet

## Contexto
El sistema necesita almacenar usuarios, espacios, membresías, categorías y movimientos con integridad referencial. Los importes requieren precisión decimal y la información debe persistir entre sesiones.

## Decisión
Utilizar PostgreSQL como base relacional y Prisma como ORM y gestor de migraciones. Definir el esquema en `apps/backend/prisma/schema.prisma`. Representar montos como `Decimal(14,2)` y manejar únicamente MXN en la versión inicial.

## Alternativas consideradas
- **MongoDB:** flexibilidad documental, pero el dominio es fuertemente relacional.
- **MySQL:** alternativa válida, sin ventaja clara frente a PostgreSQL para este proyecto.
- **SQL manual exclusivamente:** control total, pero mayor trabajo repetitivo en CRUD y migraciones.

## Consecuencias
- **Ventajas:** transacciones, restricciones, relaciones explícitas, migraciones versionadas y cliente tipado.
- **Costos:** adaptar configuración a la versión instalada de Prisma y usar SQL de migración para restricciones no expresables en Prisma.

## Criterios de implementación
- Tablas iniciales: `users`, `wallets`, `wallet_members`, `categories`, `transactions`.
- UUID como identificadores; índices para consultas por espacio y fecha.
- Agregar restricción `CHECK (amount > 0)` mediante migración SQL.
- Validar que categoría y movimiento pertenezcan al mismo espacio y que coincida el tipo ingreso/gasto.
- No almacenar un saldo derivado; calcularlo desde movimientos activos.
- Guardar secretos fuera del repositorio y establecer respaldo/restauración antes de producción.
- Validar todas las migraciones sobre una base PostgreSQL limpia antes del despliegue.

## Revisión de la decisión
Revisar si aparecen necesidades de múltiples monedas, sincronización bancaria o reportes que exijan modelos adicionales.

