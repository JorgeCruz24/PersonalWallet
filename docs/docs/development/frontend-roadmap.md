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

- [x] Resumen financiero: tarjetas y filtro por mes y año (Etapa 3).
- [ ] Gráfica por categoría con datos simulados.
- [ ] Registro de movimientos: formulario, validaciones y estado en Pinia.
- [ ] Historial y filtros: búsqueda, edición y eliminación lógica.
- [ ] Integración y pruebas: API NestJS, autenticación, autorización y persistencia.

Referencia: [diseño y criterios del dashboard](../ui/dashboard.md).

## Ajuste visual de la etapa 1

- [x] Layout y navegación adaptados a la captura de Figma facilitada por el usuario.
- [x] Revisión de capturas de escritorio y móvil; selector y navegación validados con Chromium.
- [x] ESLint, type-check, build y pruebas unitarias correctos tras la adaptación.

Diferencias y limitaciones documentadas en la especificación del dashboard. El resumen financiero continúa pendiente; la etapa 2 agrega una lista temporal de movimientos.

## Etapa 3 — Resumen financiero

**Estado:** validada el 2026-11-14.

- [x] Conversión de cadenas decimales a centavos enteros y formato MXN.
- [x] Composable reactivo conectado a los stores existentes.
- [x] Tarjetas reutilizables de ingresos, gastos y balance del periodo.
- [x] Selección de mes y año, conservada al cambiar de wallet.
- [x] Exclusión de movimientos eliminados y de otras wallets; gastos compartidos completos.
- [x] Lista temporal filtrada por el mismo periodo y mensaje para periodos vacíos.
- [x] ESLint sin correcciones automáticas, type-check, build y 13 pruebas unitarias correctos.
- [x] Dos E2E en Chromium (1440 y 390 px), revisión de capturas y ausencia de desbordamiento horizontal.

El periodo inicial es el mes y año del dispositivo. Los años disponibles incluyen los años de movimientos activos de la wallet, el año actual y sus adyacentes, y el año seleccionado. El periodo permanece en memoria. Firefox y WebKit no se ejecutaron en esta etapa.

Totales verificados (MXN):

| Wallet | Periodo | Ingresos | Gastos | Balance |
| --- | --- | ---: | ---: | ---: |
| Personal de Jorge | Octubre 2026 | 25,000.00 | 185.50 | 24,814.50 |
| Personal de Jorge | Noviembre 2026 | 25,000.00 | 230.75 | 24,769.25 |
| Compartida | Octubre 2026 | 8,000.00 | 0.00 | 8,000.00 |
| Compartida | Noviembre 2026 | 0.00 | 1,450.25 | -1,450.25 |

Archivos creados en apps/frontend/src:
- utils/money.ts: conversión exacta, rechazo de formatos inválidos o centavos inseguros y formato MXN.
- composables/useFinancialSummary.ts: filtro por wallet/periodo y agregación en centavos.
- components/SummaryCard.vue: tarjeta tipada con variantes visuales.
- __tests__/financialSummary.spec.ts: dinero, ambas wallets, periodos, soft delete y conexión de controles con tarjetas.

Archivos modificados:
- apps/frontend/src/views/DashboardView.vue: tarjetas, controles y lista temporal del periodo.
- apps/frontend/src/__tests__/App.spec.ts: fecha fija para mantener reproducible el test con filtro mensual.
- docs/docs/ui/dashboard.md y este roadmap: alcance y resultados de la etapa.

No se agregaron dependencias. Gráficas, formularios, HTTP, persistencia y autenticación real permanecen pendientes.
