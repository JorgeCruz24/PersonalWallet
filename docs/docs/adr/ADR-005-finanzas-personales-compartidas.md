# ADR-005: Separar finanzas personales y compartidas mediante wallets

- **Estado:** Aceptada
- **Fecha:** 2026-11-13
- **Proyecto:** PersonalWallet

## Contexto
Dos personas utilizarán PersonalWallet. Cada una necesita privacidad sobre sus ingresos y gastos personales, pero ambas deben consultar y editar movimientos del hogar. Los gastos compartidos se registrarán por su importe completo, sin reparto automático.

## Decisión
Usar `Wallet` como espacio financiero de tipo `PERSONAL` o `SHARED`. Relacionar usuarios y espacios mediante `WalletMember`. Inicialmente habrá dos wallets personales (una por usuario) y una compartida. Cada transacción y categoría pertenece a una wallet. `Transaction.userId` identifica al creador, no necesariamente al pagador.

## Alternativas consideradas
- **Campo `isShared` en cada movimiento:** parece simple, pero complica permisos y consultas.
- **Una tabla de movimientos por usuario:** dificulta la vista compartida y duplica lógica.
- **Una única wallet:** no separa privacidad personal.

## Consecuencias
- **Ventajas:** autorización clara, vistas independientes y posibilidad de agregar más espacios en el futuro.
- **Costos:** se requiere comprobar membresías en todas las operaciones y mantener consistencia entre categorías y wallets.

## Criterios de implementación
- Crear cuentas y wallets iniciales mediante seed seguro/idempotente, sin credenciales reales en Git.
- Solo integrantes autorizados pueden consultar o modificar una wallet.
- Impedir que la wallet personal de A sea accesible por B.
- El dashboard permite elegir vista personal o compartida; no sumar ambas vistas sin una indicación explícita.
- En la v1, no registrar deudas, porcentajes ni transferencias automáticas entre personas.
- No confiar en el `userId` enviado por el cliente: obtener identidad desde la sesión autenticada.

## Revisión de la decisión
Revisar al incorporar repartos, aportaciones por persona, más integrantes o movimientos entre wallets.

