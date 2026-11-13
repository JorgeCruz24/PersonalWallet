# PersonalWallet

Aplicación web privada para registrar, consultar y administrar sus ingresos y gastos personales o compartidos.

> Estado: planificación y configuración inicial. El código y el despliegue aún no están implementados.

## Objetivos

- Registrar ingresos y gastos en pesos mexicanos (MXN).
- Mantener espacios financieros personales y uno compartido, con vistas separadas.
- Consultar, filtrar y editar movimientos.
- Eliminar movimientos de forma lógica (*soft delete*) para permitir su recuperación.
- Visualizar balances y distribución de gastos por categoría.
- Permitir acceso exclusivamente a dos cuentas autorizadas.
- Ofrecer una interfaz adaptable a dispositivos móviles y escritorio.

## Tecnologías previstas

| Capa | Tecnología |
| --- | --- |
| Frontend | Vue 3, TypeScript, Vite |
| Estilos y estado | Tailwind CSS, Pinia, Vue Router |
| Gráficas | Chart.js |
| Backend | NestJS, TypeScript, API REST |
| Base de datos | PostgreSQL |
| ORM y migraciones | Prisma |
| Desarrollo local | Docker Compose |

## Reglas iniciales

- Los movimientos personales solo pueden consultarse y modificarse por su propietario.
- Los movimientos compartidos pueden consultarse y modificarse por ambos integrantes autorizados.
- Cada movimiento pertenece a un espacio financiero y tiene una categoría y un creador.
- Los gastos compartidos se registran por su importe completo, sin reparto automático.
- Los importes se almacenan con precisión decimal y solo se admite MXN.
- La eliminación de movimientos es lógica; los eliminados no participan en los balances ordinarios.
- No habrá registro público de usuarios.

## Organización prevista

```text
personal-wallet/
├── README.md
├── AGENTS.md
├── apps/
│   ├── frontend/
│   └── backend/
├── docs/
│   ├── README.md
│   ├── architecture/
│   ├── database/
│   ├── requirements/
│   ├── adr/
│   └── development/
└── docker-compose.yml
```

## Modelo de datos inicial

Cinco entidades principales: `User`, `Wallet`, `WalletMember`, `Category` y `Transaction`. El esquema Prisma y las migraciones deben verificarse antes de adoptarse como fuente de verdad. Consulta [docs/database/data-model.md](docs/database/data-model.md).

## Desarrollo local

La instalación todavía no está automatizada. Cuando se inicialicen las aplicaciones, documentaremos los requisitos de Node.js, Docker, variables de entorno y comandos de arranque en [docs/development/setup.md](docs/development/setup.md). No se deben inventar comandos de ejecución ni afirmar que las migraciones están probadas antes de validarlas.

## Documentación

Consulta el [índice de documentación](docs/README.md) para arquitectura, requisitos, modelo de datos, decisiones técnicas y configuración.

## Privacidad

Repositorio privado recomendado. Nunca subir credenciales, contraseñas, tokens, bases de datos reales ni archivos `.env`. El despliegue, si se realiza, debe proteger la aplicación con autenticación y HTTPS.

## Estado del proyecto

- [x] Alcance funcional inicial definido.
- [x] Stack seleccionado.
- [x] Decisiones iniciales de modelo de datos definidas.
- [ ] Inicializar monorepo y aplicaciones.
- [ ] Validar esquema Prisma y migraciones en PostgreSQL.
- [ ] Implementar autenticación y autorización.
- [ ] Implementar CRUD, dashboard y pruebas.
- [ ] Evaluar y configurar despliegue privado.
