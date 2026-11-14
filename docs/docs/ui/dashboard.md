# Dashboard — PersonalWallet

**Versión:** 1.0  
**Estado:** Diseño aprobado; layout, datos simulados y resumen mensual implementados
**Tecnología:** Vue 3 + TypeScript + Tailwind CSS

## Objetivo

Permitir que los dos usuarios autorizados consulten sus ingresos, gastos y balance mensual, administrando por separado sus finanzas personales y compartidas.

## Diseño de referencia

- Herramienta: Figma
- Estado: Diseño aprobado
- Archivo: [PersonalWallet — Dashboard]([URL_DE_FIGMA](https://www.figma.com/make/HP1IpXT0Lh64VTupMvSQ07/Control-de-Finanzas-en-Pareja?t=fiioWEqvJdFvQsOh-1))
- Captura: ./images/image.png

## Componentes principales

| Componente | Responsabilidad |
|---|---|
| AppHeader | Logo y usuario autenticado |
| WalletSelector | Cambiar entre finanzas personales y compartidas |
| SummaryCard | Mostrar ingresos, gastos y balance |
| ExpenseDonutChart | Mostrar gastos por categoría |
| QuickTransactionForm | Registrar ingresos y gastos |
| RecentTransactions | Consultar, buscar y administrar movimientos |

## Reglas funcionales

1. El usuario puede alternar entre su wallet personal y la compartida.
2. El mes seleccionado determina el periodo de consulta.
3. Los ingresos, gastos y balance se calculan según la wallet y el mes.
4. El formulario registra el movimiento en la wallet seleccionada.
5. El usuario autenticado se identifica automáticamente.
6. Los importes se muestran exclusivamente en MXN.
7. Los movimientos eliminados lógicamente no aparecen en los resultados ni en los totales.
8. El filtro por persona solo aparece en finanzas compartidas.
9. Los movimientos pueden editarse y eliminarse, previa autorización.
10. La interfaz debe adaptarse a escritorio y móvil.

## Elementos excluidos de v1

- Frase promocional en el encabezado.
- Integración con Telegram.
- Selector manual de persona en el formulario.
- Columna de origen del movimiento.
- Reparto automático de gastos compartidos.

## Criterios de aceptación

- Cambiar de wallet actualiza tarjetas, gráfica e historial.
- Cambiar de mes actualiza los resultados.
- Se pueden registrar ingresos y gastos con validaciones.
- La búsqueda filtra movimientos por descripción.
- Los movimientos se pueden editar y eliminar lógicamente.
- La interfaz funciona correctamente en dispositivos móviles.
- Las pruebas pertinentes pasan sin errores.

## Implementación

La primera versión del frontend utilizará datos simulados y Pinia. Posteriormente se conectará a la API NestJS, donde se aplicarán las reglas de autenticación y autorización.

## Referencias

- ADR-002: Vue 3.
- ADR-003: NestJS.
- ADR-005: Finanzas personales y compartidas.
- ADR-006: Eliminación lógica.


## Avance de implementación

La primera etapa incorpora MainLayout, AppHeader, WalletSelector y DashboardView, con navegación a /dashboard y wallets simuladas en Pinia. El resumen financiero, el formulario, las gráficas, el historial y la autenticación siguen pendientes. El selector cambia el contexto visible; todavía no existen consultas ni movimientos que actualizar.


## Adaptación visual desde captura

El layout y la navegación se adaptaron a la captura compartida por el usuario de la [propuesta de Figma](https://www.figma.com/make/HP1IpXT0Lh64VTupMvSQ07/Control-de-Finanzas-en-Pareja).

- Encabezado superior de 65 px, barra lateral clara de 227 px en escritorio, opción activa verde, avatares simulados de Jorge y Ana y fondo con degradados suaves.
- Saludo contextual: «Hola, Jorge» en finanzas personales y «Hola, equipo» en compartidas.
- Selector de wallet conservado como requisito funcional, aunque no se muestra en la captura. La selección sigue en memoria con Pinia y comienza en «Mis finanzas».
- En móvil, el menú se desplaza horizontalmente y el selector se coloca debajo del saludo.

### Diferencias y límites de esta etapa

La referencia se interpretó visualmente desde una captura, sin medidas, tokens, fuentes ni assets exportados de Figma. Se utiliza la fuente local disponible (Inter, Segoe UI o Arial) y una colección pequeña de iconos SVG aproximados en LayoutIcon; no se garantiza coincidencia exacta de tipografía ni iconografía.

Las tarjetas, gráfica, presupuesto, meta de ahorro, formulario, controles de mes y acciones flotantes de la captura quedan pendientes. El área central muestra el contexto de la wallet y un aviso de futuras funciones. No se implementa el selector de persona del formulario, excluido por los requisitos de v1.

Validación: ESLint, type-check y build correctos; una prueba unitaria y dos E2E en Chromium (1440 × 900 y 390 × 844) correctas. Se inspeccionaron las capturas generadas para comparar el layout con la referencia y se verificó la ausencia de desbordamiento horizontal. Las capturas se generan en test-results y no se versionan.

## Etapa 2: datos y estado

Se reutilizan el selector y el layout de la etapa 1. Pinia deriva las wallets accesibles de las membresías del usuario simulado (Jorge): su wallet personal y la compartida. La wallet personal de Ana existe en los mocks, pero se rechaza al intentar seleccionarla.

DashboardView incorpora una lista temporal de movimientos activos de la wallet elegida, con ingresos y gastos de varios meses, fechas e importes en MXN. Los movimientos con deletedAt definido quedan excluidos. Se conserva el diseño anterior; no se implementan tarjetas, gráficas, formulario, filtros mensuales ni acciones de edición.

Los datos y la selección permanecen en memoria, sin HTTP ni persistencia local. La autenticación y autorización reales siguen pendientes del backend. Para los contratos frontend se utilizan cadenas decimales en los importes.

Validación: ESLint, type-check, build y siete pruebas unitarias correctos; dos E2E en Chromium correctos (escritorio y móvil). Firefox y WebKit no pudieron ejecutarse por falta de sus navegadores instalados.
## Etapa 3: resumen financiero

SummaryCard muestra ingresos, gastos y balance en MXN según la wallet, el mes y el año seleccionados. Conserva la paleta verde/rojo/violeta y los bordes redondeados de la referencia; las tarjetas se apilan en móvil. Los selectores tienen etiquetas accesibles y las tarjetas anuncian sus cambios mediante aria-live.

useFinancialSummary deriva los resultados de Pinia sin HTTP. Los importes se convierten desde cadenas decimales a centavos enteros antes de sumar; el balance es ingresos menos gastos del periodo, sin arrastre de meses previos. Se excluyen movimientos con deletedAt y otras wallets. Los gastos compartidos se cuentan completos, independientemente del creador.

El periodo inicia en el mes actual del dispositivo y se mantiene al cambiar de wallet. Se filtran también los movimientos de demostración; los periodos vacíos muestran ceros y un mensaje claro. La comparación de fechas YYYY-MM-DD no convierte zonas horarias.

Validación: ESLint, type-check, build y 13 pruebas unitarias correctos; dos E2E Chromium (escritorio y móvil) correctos, con revisión de capturas y sin desbordamiento horizontal. Totales de ambas wallets y cambios de mes/año cubiertos por pruebas. Véase el [roadmap](../development/frontend-roadmap.md#etapa-3--resumen-financiero) para archivos y totales.

Las descripciones de etapas anteriores se conservan como historial. Las tarjetas y controles de periodo ya están implementados; gráficas, presupuesto, metas, formularios, edición y autenticación real siguen pendientes.

## Etapa 4: gráfica de gastos por categoría

Se agrega ExpenseDonutChart debajo del resumen, conservando el layout y los controles de wallet, mes y año. La dona muestra total al centro, leyenda con colores por ID, porcentajes y montos MXN; en móvil la leyenda se coloca debajo. Los tooltips incluyen nombre, importe y porcentaje. La leyenda ofrece el mismo detalle en texto accesible.

useExpensesByCategory recibe el mismo periodo filtrado del resumen financiero. Solo suma EXPENSE activos, agrupa por categoryId y conserva centavos enteros; los gastos compartidos se consideran completos. El total coincide con la tarjeta de gastos. Si no hay gastos se muestra «No hay gastos activos en este periodo para esta wallet», sin dibujar un canvas vacío.

Los porcentajes se calculan sobre el total y se muestran con hasta un decimal; el redondeo de presentación puede producir una suma distinta de 100 %. Los colores permanecen estables al cambiar de periodo. Se mantiene el fallback «Categoría no disponible» para metadatos ausentes, conservando el ID y el importe.

Validación: ESLint, type-check, build, 20 pruebas unitarias y dos E2E Chromium (escritorio y móvil) correctos. Se verifican cambios de wallet/mes/año, canvas real, estado vacío, separación de espacios y ausencia de desbordamiento horizontal. La referencia enlazada es un archivo Figma Make; la adaptación visual utiliza la captura local documentada. No se implementan formularios, edición ni conexión con el backend.
