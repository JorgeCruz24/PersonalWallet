# Arquitectura general

**Estado:** propuesta inicial, pendiente de implementación.

- Frontend SPA: Vue 3 + TypeScript + Vite.
- API REST: NestJS, monolito modular.
- Persistencia: PostgreSQL mediante Prisma.
- Autenticación: por definir implementación exacta; sin registro público.
- Autorización: membresía por `Wallet` validada en cada operación.

Flujo: navegador → API NestJS → Prisma → PostgreSQL.

Módulos previstos: `auth`, `users`, `wallets`, `categories`, `transactions`, `reports`.


## Organización prevista del frontend

El código del frontend se organizará en `apps/frontend/src/`, conforme a [ADR-001](../adr/ADR-001-monorepo.md) y [ADR-002](../adr/ADR-002-vue3.md). Esta estructura es una propuesta para la implementación inicial; no representa archivos ni funcionalidades ya implementados.

```text
apps/frontend/src/
├── assets/
├── components/
│   ├── layout/
│   │   ├── AppHeader.vue
│   │   └── WalletSelector.vue
│   ├── dashboard/
│   │   ├── SummaryCard.vue
│   │   ├── ExpenseDonutChart.vue
│   │   ├── QuickTransactionForm.vue
│   │   └── RecentTransactions.vue
│   └── transactions/
│       └── TransactionForm.vue
├── layouts/
│   └── MainLayout.vue
├── views/
│   ├── DashboardView.vue
│   ├── TransactionsView.vue
│   └── CategoriesView.vue
├── stores/
│   ├── wallet.store.ts
│   └── transaction.store.ts
├── services/
│   └── transactions.service.ts
├── mocks/
│   └── transactions.ts
├── types/
│   ├── wallet.ts
│   └── transaction.ts
├── router/
│   └── index.ts
├── App.vue
└── main.ts
```

### Responsabilidades por carpeta

| Carpeta o archivo | Responsabilidad prevista |
| --- | --- |
| `assets/` | Recursos estáticos, como imágenes y estilos. |
| `components/layout/` | Elementos de navegación y contexto: encabezado con usuario autenticado y selector de wallet personal o compartida. |
| `components/dashboard/` | Tarjetas de ingresos, gastos y balance; gráfica de gastos por categoría; registro rápido e historial reciente. |
| `components/transactions/TransactionForm.vue` | Formulario reutilizable para crear y editar movimientos. El registro rápido reutilizará este formulario para mantener consistentes los campos y validaciones. |
| `layouts/MainLayout.vue` | Estructura visual común de las pantallas principales, con encabezado, selector de wallet y contenido de la vista. |
| `views/` | Pantallas asociadas a rutas. Coordinan componentes y estado para dashboard, movimientos y categorías. |
| `stores/wallet.store.ts` | Estado compartido de wallets disponibles para el usuario y wallet seleccionada. |
| `stores/transaction.store.ts` | Estado compartido de movimientos, filtros y estados de carga y error asociados a su consulta y modificación. |
| `services/transactions.service.ts` | Acceso a movimientos mediante una interfaz tipada; encapsula el uso inicial de datos simulados y, posteriormente, las llamadas HTTP a la API. |
| `mocks/transactions.ts` | Datos ficticios para desarrollar la interfaz antes de conectar el backend; nunca datos financieros reales. |
| `types/` | Tipos TypeScript de wallets y movimientos usados por vistas, componentes, stores y servicios. |
| `router/index.ts` | Definición de rutas y asociación con vistas y layout. Las protecciones de navegación mejoran la experiencia; la autorización corresponde al backend. |
| `App.vue` | Componente raíz que aloja la navegación de la aplicación. |
| `main.ts` | Inicialización de Vue y registro de Pinia, Vue Router y estilos globales. |

Los componentes usarán Composition API y `<script setup lang="ts">`. El estado local permanecerá en cada componente; Pinia se utilizará cuando varias partes de la interfaz necesiten compartirlo.

### Flujo de datos y separación de responsabilidades

Flujo previsto: vista o formulario → acción del store → servicio de movimientos → datos simulados o API NestJS. El store expondrá el estado resultante a las vistas y componentes; las llamadas HTTP no se realizarán directamente desde componentes visuales.

Al cambiar de wallet, se actualizarán movimientos, tarjetas y gráfica para el espacio seleccionado, sin mostrar datos de la wallet anterior mientras se carga la nueva consulta. Los filtros por mes deberán aplicarse de forma consistente a los resultados del dashboard.

La estructura cubre las pantallas iniciales de finanzas. La vista de acceso y la integración de autenticación se incorporarán cuando se defina su implementación; su ausencia en este árbol no elimina ese requisito.

### Reglas para la implementación

- Mostrar importes exclusivamente en MXN, con formato `es-MX`. Evitar aritmética monetaria con `number` de punto flotante; los totales definitivos se calcularán en el backend con precisión decimal.
- Mantener separados los datos de cada wallet según [ADR-005](../adr/ADR-005-finanzas-personales-compartidas.md). El selector solo ofrecerá espacios autorizados y no realizará reparto automático de gastos.
- Excluir movimientos con `deletedAt` de consultas normales, balances y gráficas, también durante la fase con mocks, conforme a [ADR-006](../adr/ADR-006-soft-delete.md).
- Mostrar estados claros de carga, error y confirmación, y adaptar las pantallas a móvil y escritorio.
- Mantener las validaciones del formulario como ayuda al usuario. El backend validará entradas, autenticación y autorización en cada operación.
- Utilizar los mocks únicamente durante el desarrollo inicial. Al conectar la API, sustituir su uso dentro del servicio y conservar la separación entre acceso a datos y presentación.

La composición y los criterios de aceptación del dashboard se detallan en la [especificación de UI](../ui/dashboard.md).
