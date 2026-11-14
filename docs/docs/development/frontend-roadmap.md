# Roadmap del frontend

## Etapa 1 — Layout y navegación

**Estado:** validada el 2026-11-14.

- [x] MainLayout responsive y AppHeader con identidad simulada.
- [x] WalletSelector tipado con estado compartido en Pinia.
- [x] DashboardView y ruta /dashboard; redirección desde la raíz.
- [x] Wallet personal del usuario de demostración y wallet compartida.
- [x] Comprobación de ida y vuelta entre wallets, sin selección de IDs desconocidos.
- [x] ESLint, type-check, build y prueba unitaria.
- [x] Dos pruebas E2E en Chromium: escritorio (1440 px) y móvil (390 px), con navegación, recarga, selector y comprobación de desbordamiento horizontal.

La selección es temporal y se restablece al recargar. Las opciones de navegación futuras se muestran como «Próximamente». No hay autenticación real ni llamadas HTTP. La prueba en móvil usa un viewport de Chromium; Firefox, WebKit y dispositivos físicos no se han validado.

## Etapa 2 — Modelos, datos simulados y stores

**Estado:** validada el 2026-11-14.

- [x] Interfaces User, Wallet, WalletMember, Category y Transaction.
- [x] Dos usuarios, tres wallets, cuatro membresías y categorías por espacio.
- [x] Ingresos y gastos de octubre y noviembre de 2026, incluido un movimiento eliminado.
- [x] Wallets accesibles derivadas de la membresía de Jorge; rechazo de la wallet de Ana e IDs desconocidos.
- [x] Store de movimientos activos de la wallet seleccionada, actualizado mediante el selector existente.
- [x] Lista temporal en DashboardView, conservando el layout y sin implementar gráficas ni formulario.
- [x] ESLint, type-check, build y siete pruebas unitarias correctos.
- [x] Dos E2E correctos en Chromium: escritorio y móvil.

Los importes se conservan como cadenas decimales; solo se convierten para presentación mediante Intl.NumberFormat en MXN, sin cálculos financieros. Las fechas de movimientos usan YYYY-MM-DD y se presentan en UTC para evitar cambios de día.

Todo permanece en memoria, sin HTTP, persistencia local ni autenticación real. Las comprobaciones de membresía del frontend son una simulación; la autorización real corresponderá al backend. La lista incluye todos los meses; el filtrado mensual y los balances siguen pendientes.

La ejecución E2E general también intentó Firefox y WebKit: cuatro casos no pudieron iniciar porque sus navegadores no están instalados. No se validaron esos motores.

## Siguientes etapas

- [ ] Resumen financiero: tarjetas y gráfica por categoría con datos simulados.
- [ ] Registro de movimientos: formulario, validaciones y estado en Pinia.
- [ ] Historial y filtros: búsqueda, edición y eliminación lógica.
- [ ] Integración y pruebas: API NestJS, autenticación, autorización y persistencia.

Referencia: [diseño y criterios del dashboard](../ui/dashboard.md).

## Ajuste visual de la etapa 1

- [x] Layout y navegación adaptados a la captura de Figma facilitada por el usuario.
- [x] Revisión de capturas de escritorio y móvil; selector y navegación validados con Chromium.
- [x] ESLint, type-check, build y pruebas unitarias correctos tras la adaptación.

Diferencias y limitaciones documentadas en la especificación del dashboard. El resumen financiero continúa pendiente; la etapa 2 agrega una lista temporal de movimientos.
