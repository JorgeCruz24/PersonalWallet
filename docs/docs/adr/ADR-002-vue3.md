# ADR-002: Utilizar Vue 3 para el frontend

- **Estado:** Aceptada
- **Fecha:** 2026-11-13
- **Proyecto:** PersonalWallet

## Contexto
La aplicación requiere una interfaz responsive para consultar saldos, registrar y editar ingresos y gastos, filtrar movimientos y mostrar una gráfica por categorías.

## Decisión
Usar Vue 3 con Composition API, TypeScript y Vite. Usar Vue Router para navegación y Pinia únicamente para estado compartido que lo requiera. El frontend consumirá la API REST de NestJS.

## Alternativas consideradas
- **React:** ecosistema amplio, pero implica cambiar de tecnología sin una ventaja determinante para este alcance.
- **Nuxt:** SSR y capacidades full-stack no son necesarias para un panel privado sin SEO.
- **Vue sin TypeScript:** inicio simple, pero menor seguridad de tipos en contratos y formularios.

## Consecuencias
- **Ventajas:** componentes reutilizables, experiencia SPA, curva de aprendizaje razonable y tipado.
- **Costos:** se debe administrar el estado de autenticación y las llamadas a la API; una SPA necesita una estrategia de hosting y rutas fallback.

## Criterios de implementación
- Crear vistas de acceso, dashboard, movimientos y categorías.
- Separar componentes visuales de llamadas HTTP en servicios/composables.
- Utilizar rutas protegidas como mejora de UX; la autorización real reside en NestJS.
- Mostrar MXN con `Intl.NumberFormat("es-MX", { style: "currency", currency: "MXN" })`.
- Considerar Tailwind CSS y Chart.js como elecciones de implementación, no dependencias arquitectónicas obligatorias.

## Revisión de la decisión
Revisar si el proyecto necesita SEO público, SSR o múltiples interfaces cliente.

