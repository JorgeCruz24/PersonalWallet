# Arquitectura general

**Estado:** propuesta inicial, pendiente de implementación.

- Frontend SPA: Vue 3 + TypeScript + Vite.
- API REST: NestJS, monolito modular.
- Persistencia: PostgreSQL mediante Prisma.
- Autenticación: por definir implementación exacta; sin registro público.
- Autorización: membresía por `Wallet` validada en cada operación.

Flujo: navegador → API NestJS → Prisma → PostgreSQL.

Módulos previstos: `auth`, `users`, `wallets`, `categories`, `transactions`, `reports`.
