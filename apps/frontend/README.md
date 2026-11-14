# Frontend de PersonalWallet

Vue 3 + TypeScript + Vite, Tailwind CSS 4, Vue Router y Pinia.

## Estado actual

Primera etapa: layout responsive, encabezado, navegación a `/dashboard` y selector de wallet personal o compartida con Pinia. La raíz y las rutas desconocidas redirigen al dashboard.

La sesión y las dos wallets disponibles son ficticias. La selección permanece en memoria y se restablece a «Mis finanzas» al recargar. No se incluyen datos de la wallet personal del otro usuario.

Pendientes: autenticación real, backend, llamadas HTTP, balances, formularios, gráficas e historial. Este prototipo no implementa control de acceso.

## Desarrollo local

Desde `apps/frontend`, con Node.js `^22.18.0 || >=24.12.0`:

```sh
npm ci
npm run dev
```

Abrir la URL local que muestre Vite y navegar a `/dashboard`.

## Validaciones

```sh
npx eslint .
npm run type-check
npm run build
npm run test:unit -- --run
npx playwright install chromium
npm run test:e2e -- --project=chromium
```

Las pruebas E2E verifican navegación, recarga, selección de wallet y ausencia de desbordamiento horizontal a 1440 y 390 píxeles. Para ejecutarlas sin ventana en PowerShell, después del build:

```powershell
$env:CI = '1'
npm run test:e2e -- --project=chromium
Remove-Item Env:CI
```

Consultar la [especificación del dashboard](../../docs/docs/ui/dashboard.md) y el [roadmap](../../docs/docs/development/frontend-roadmap.md).
