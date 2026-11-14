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
- [x] Gráfica por categoría con datos simulados (Etapa 4).
- [x] Registro de movimientos: formulario, validaciones y estado en Pinia (Etapa 5).
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

## Etapa 4 — Gastos por categoría

**Estado:** validada el 2026-11-14.

- [x] `useExpensesByCategory.ts`: agrupa gastos activos por `categoryId`, suma centavos enteros seguros y calcula porcentajes sobre el total.
- [x] `ExpenseDonutChart.vue`: Chart.js y vue-chartjs, total al centro, colores estables por ID, leyenda accesible, porcentajes e importes MXN y tooltips.
- [x] Integración en `DashboardView.vue` con los mismos movimientos filtrados del resumen; sin nuevos filtros ni HTTP.
- [x] Estado vacío sin canvas cuando no hay gastos, incluso en periodos con ingresos.
- [x] Gastos compartidos completos; exclusión de eliminados y separación de wallets.
- [x] ESLint sin correcciones automáticas, type-check, build y 20 pruebas unitarias correctos.
- [x] Dos E2E Chromium (1440 y 390 px): renderizado real del canvas, wallet, mes, año, estado vacío, importes, ausencia de errores JavaScript y desbordamiento horizontal.

Archivos: composable y componente anteriores, DashboardView, `expensesByCategory.spec.ts`, adaptación de las pruebas App/financialSummary con sustituto de canvas para JSDOM y ampliación de `e2e/vue.spec.ts`. Se declararon las dependencias de desarrollo ya utilizadas por `eslint.config.js`, ausentes en package.json. Chart.js y vue-chartjs ya estaban instalados al comenzar.

Los mocks actuales tienen una categoría de gasto por wallet accesible; las pruebas cubren múltiples categorías y porcentajes fraccionarios. Los porcentajes se presentan con hasta un decimal y pueden sumar 99.9 % o 100.1 % por redondeo visual; los importes y el total permanecen exactos en centavos. Una categoría sin metadatos se conserva por ID como «Categoría no disponible», sin perder su importe.

Sin registro, edición, HTTP, cambios de backend ni commits. Firefox y WebKit no se validaron en esta etapa.

## Etapa 5 — Registro de movimientos

**Estado:** validada el 2026-11-14.

- [x] `CreateTransactionInput` separado del registro: no admite identidad, wallet ni auditoría.
- [x] `TransactionForm.vue` integrado debajo de la gráfica, conservando el layout y componentes existentes.
- [x] Ingresos y gastos en la wallet seleccionada; creador obtenido del usuario simulado.
- [x] Categorías filtradas por wallet y tipo; selección limpiada al cambiar cualquiera de ellos.
- [x] Validaciones en el store: wallet accesible, categoría compatible, importe positivo con máximo dos decimales, fecha de calendario válida y descripción no vacía.
- [x] Importes como cadenas decimales normalizadas a dos decimales, sin redondear; cálculos mediante centavos enteros. Máximo de 12 dígitos enteros compatible con el contrato Decimal(14,2).
- [x] ID UUID, createdAt/updatedAt generados y deletedAt/deletedById en null.
- [x] Fecha inicial local YYYY-MM-DD; timestamps de auditoría ISO independientes de la fecha del movimiento.
- [x] Mensajes de error y confirmación; limpieza del formulario después del registro.
- [x] Resumen y gráfica reactivos según wallet y periodo; gastos compartidos completos.
- [x] ESLint sin correcciones automáticas, type-check y build correctos.
- [x] 49 pruebas unitarias correctas (29 nuevas), incluidas validaciones, aislamiento entre instancias de Pinia, fechas, identidad y rechazo de acceso ajeno.
- [x] Cuatro E2E Chromium correctos: dashboard y registro en 1440 y 390 px. Ingresos y gastos en ambas wallets, categorías, importes inválidos, confirmación, totales, gráfica, recarga sin persistencia y ausencia de desbordamiento horizontal. Capturas revisadas.

Archivos creados:
- `apps/frontend/src/components/TransactionForm.vue`.
- `apps/frontend/src/utils/date.ts`.
- `apps/frontend/src/__tests__/transactionRegistration.spec.ts`.
- `apps/frontend/e2e/transaction-registration.spec.ts`.

Archivos modificados:
- `apps/frontend/src/types/transaction.ts`: contrato de creación y fechas de auditoría.
- `apps/frontend/src/stores/transaction.store.ts`: estado reactivo por instancia y addTransaction.
- `apps/frontend/src/mocks/transactions.ts`: fechas de auditoría de los registros simulados.
- `apps/frontend/src/views/DashboardView.vue`: integración del formulario.
- Este roadmap y `docs/docs/ui/dashboard.md`: alcance y validación.

Los registros permanecen únicamente en memoria y se pierden al recargar. La lista temporal existente refleja los registros nuevos; no se implementa un historial nuevo, edición ni eliminación. No hay HTTP, persistencia local, cambios de backend/Prisma, nuevas dependencias ni commits. La autorización frontend es simulada y deberá aplicarse también en el backend futuro. Firefox y WebKit no se validaron en esta etapa.
