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

## Siguientes etapas

- [ ] Resumen financiero: tarjetas y gráfica por categoría con datos simulados.
- [ ] Registro de movimientos: formulario, validaciones y estado en Pinia.
- [ ] Historial y filtros: búsqueda, edición y eliminación lógica.
- [ ] Integración y pruebas: API NestJS, autenticación, autorización y persistencia.

Referencia: [diseño y criterios del dashboard](../ui/dashboard.md).
