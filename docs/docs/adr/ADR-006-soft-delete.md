# ADR-006: Implementar eliminación lógica de movimientos

- **Estado:** Aceptada
- **Fecha:** 2026-11-13
- **Proyecto:** PersonalWallet

## Contexto
Los movimientos financieros pueden eliminarse por error. Se requiere poder ocultarlos del historial sin perder inmediatamente el registro, conservando la posibilidad de restauración.

## Decisión
Aplicar soft delete a `Transaction` mediante `deletedAt` (nullable) y `deletedById` (nullable). Al eliminar, actualizar estos campos en vez de ejecutar `DELETE`. Excluir movimientos eliminados del historial, dashboard, reportes y saldos. No aplicar soft delete automáticamente a todas las demás tablas.

## Alternativas consideradas
- **Eliminación física:** sencilla, pero no permite recuperar errores.
- **Tabla de archivo:** separa registros, pero duplica flujos y complica consultas.
- **Auditoría completa de eventos:** más trazabilidad, pero innecesaria para el MVP.

## Consecuencias
- **Ventajas:** recuperación y trazabilidad básica de eliminaciones.
- **Costos:** cada consulta debe filtrar `deletedAt: null`; requiere definir restauración y política de retención.

## Criterios de implementación
- Establecer `deletedAt` y `deletedById` en una operación autorizada.
- Usar condiciones de actualización que impidan eliminar dos veces un registro activo; devolver 404 o un error de dominio apropiado si ya no está activo.
- Filtrar `deletedAt: null` en todas las consultas y agregaciones ordinarias.
- Restaurar únicamente si el usuario tiene acceso a la wallet y el registro fue eliminado.
- No usar `delete`/`deleteMany` sobre transacciones en rutas de negocio.
- Probar que un gasto eliminado deja de afectar el balance y vuelve a afectarlo al restaurarlo.
- Aclarar que soft delete no sustituye respaldos ni constituye auditoría inmutable.

## Revisión de la decisión
Revisar al definir políticas de retención, exportación de datos o borrado definitivo solicitado por usuarios.

