# Modelo de datos v1

**Estado:** diseño aprobado conceptualmente; migraciones aún pendientes de validar.

| Entidad | Propósito |
| --- | --- |
| `User` | Cuenta autorizada |
| `Wallet` | Espacio personal o compartido |
| `WalletMember` | Relación entre usuarios y espacios, con rol |
| `Category` | Categoría de ingreso o gasto por espacio |
| `Transaction` | Movimiento financiero, creador, fecha, importe y soft delete |

## Relaciones

- `User` 1:N `WalletMember` N:1 `Wallet`.
- `Wallet` 1:N `Category`.
- `Wallet` 1:N `Transaction`.
- `User` 1:N `Transaction` como creador.
- `Category` 1:N `Transaction`.

## Reglas

- MXN exclusivamente; importe `Decimal(14,2)` y mayor que cero.
- `Transaction.deletedAt` nulo significa activo; fecha definida significa eliminado.
- Movimientos compartidos sin reparto automático.
- Validar que usuario y categoría pertenezcan al espacio del movimiento.
- Un usuario no puede consultar datos personales de otro.
- El backend debe comprobar membresía en cada operación.

## Pendiente

Validar el esquema Prisma definitivo, restricciones SQL, claves foráneas y migraciones contra PostgreSQL real. Evaluar una restricción que impida inconsistencias entre `Transaction.type` y `Category.type`.
