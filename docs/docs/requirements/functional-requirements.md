# Requisitos funcionales v1

**Estado:** alcance MVP acordado; implementación pendiente.

| ID | Requisito | Criterio de aceptación |
| --- | --- | --- |
| PW-01 | Acceso privado | Solo las dos cuentas autorizadas pueden iniciar sesión. |
| PW-02 | Vistas separadas | Cada usuario ve su espacio personal y el compartido. |
| PW-03 | Registrar movimiento | Guardar ingreso/gasto con importe positivo MXN, fecha y categoría válida. |
| PW-04 | Consultar historial | Filtrar por fecha, tipo y categoría dentro de un espacio autorizado. |
| PW-05 | Editar movimiento | Actualizar movimientos permitidos y validar los nuevos datos. |
| PW-06 | Soft delete | Ocultar movimiento eliminado de listados y estadísticas sin borrarlo físicamente. |
| PW-07 | Resumen financiero | Calcular ingresos, gastos y balance por espacio y periodo. |
| PW-08 | Gráfica | Mostrar distribución de gastos por categoría. |
| PW-09 | Diseño responsive | Usar la aplicación desde móvil y escritorio. |
| PW-10 | Privacidad | Rechazar cualquier acceso a un espacio no autorizado. |

## Fuera de alcance del MVP

- Reparto automático de gastos.
- Integración bancaria.
- Registro público de usuarios.
- Soporte multimoneda.
- Automatización por WhatsApp.
