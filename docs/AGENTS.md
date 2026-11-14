# AGENTS.md — PersonalWallet

## Propósito

Instrucciones para agentes de IA que trabajen en este repositorio. PersonalWallet es una aplicación privada de finanzas personales y compartidas para dos usuarios. Prioriza simplicidad, privacidad, seguridad y mantenibilidad.

## Stack y arquitectura

- Frontend: Vue 3 + TypeScript + Vite; Pinia para estado compartido y Vue Router para navegación.
- Backend: NestJS + TypeScript; API REST organizada en módulos, controladores, servicios y DTOs.
- Persistencia: PostgreSQL + Prisma. Las migraciones versionadas son obligatorias para cambios de esquema.
- Mantener un monorepo con `apps/frontend` y `apps/backend`.
- No introducir microservicios, colas, servicios pagos ni dependencias importantes sin justificar la necesidad y solicitar aprobación.

## Reglas del dominio

- Dos cuentas autorizadas, sin registro público.
- Espacios personales separados y un espacio compartido.
- Un usuario no puede acceder a un espacio personal ajeno, incluso si modifica manualmente una URL o un ID.
- Ambos miembros autorizados pueden consultar y modificar movimientos del espacio compartido.
- Moneda única: MXN. Usar `Decimal` en Prisma y evitar aritmética monetaria con `number` de punto flotante.
- No dividir automáticamente gastos compartidos.
- Los movimientos se eliminan lógicamente con `deletedAt`; excluirlos de listados, búsquedas, balances y gráficas normales.
- Verificar que la categoría pertenece al mismo espacio y corresponde al tipo del movimiento.

## Seguridad

- Aplicar autenticación y autorización en el backend, nunca confiar únicamente en la interfaz.
- Obtener la identidad del usuario del contexto autenticado; no confiar en un `userId` arbitrario enviado por el cliente.
- Validar entradas con DTOs y reglas de dominio.
- No registrar en logs contraseñas, tokens, secretos ni datos financieros innecesarios.
- No crear endpoints públicos de registro ni habilitar acceso anónimo a datos.
- No subir `.env`, claves privadas ni datos reales al repositorio.
- No desplegar ni publicar la aplicación sin autorización explícita.

## Convenciones de implementación

- Usar TypeScript estricto; evitar `any` salvo justificación documentada.
- Controladores delgados; reglas de negocio en servicios.
- Mantener el acceso a datos en servicios/repositorios bien definidos, sin SQL disperso en controladores.
- Usar nombres consistentes en inglés para código y esquema; documentación en español.
- Mantener funciones pequeñas, manejo de errores claro y respuestas HTTP apropiadas.
- Evitar sobreingeniería: implementar primero el MVP.
- No agregar paquetes ni cambiar herramientas del stack sin explicar el motivo.

## Base de datos y migraciones

- Modificar `schema.prisma` y generar una migración versionada por cada cambio de esquema.
- No modificar migraciones que ya se hayan aplicado en entornos compartidos.
- Validar migraciones sobre una base de datos de desarrollo antes de declararlas listas.
- Aplicar restricciones de integridad en PostgreSQL cuando Prisma no pueda expresarlas.
- Revisar que las consultas filtren por espacio autorizado y `deletedAt: null`.
- No ejecutar borrados destructivos ni reinicializaciones de datos sin consentimiento.

## Pruebas y verificación

- Agregar pruebas de servicios para reglas de negocio y autorización.
- Probar acceso denegado a espacios personales de otros usuarios.
- Probar creación, consulta, edición y soft delete de movimientos.
- Verificar que movimientos eliminados no aparezcan en totales ni gráficas.
- Probar que importes no positivos y categorías de otro espacio sean rechazados.
- Ejecutar lint, pruebas y compilación cuando existan scripts; reportar claramente lo no ejecutado.

## Forma de trabajar

1. Revisar `README.md` y la documentación pertinente en `docs/` antes de modificar código.
2. Explicar brevemente el alcance y los archivos que se modificarán.
3. Hacer cambios pequeños y coherentes con la arquitectura existente.
4. Actualizar documentación y ADR cuando una decisión técnica importante cambie.
5. Informar archivos modificados, pruebas realizadas, resultados y pendientes.
6. Pedir confirmación antes de operaciones destructivas, servicios pagos, cambios de visibilidad o despliegues.

## Documentación

- `docs/requirements/functional-requirements.md`: requisitos y criterios de aceptación.
- `docs/architecture/overview.md`: arquitectura y límites de módulos.
- `docs/database/data-model.md`: entidades y restricciones.
- `docs/adr/`: decisiones arquitectónicas.
- `docs/development/setup.md`: instalación y ejecución local.

Si una instrucción entra en conflicto con la seguridad o privacidad del proyecto, detenerse y solicitar aclaración.

## UI development and documentation

- Antes de implementar una pantalla, consultar su especificación en `docs/ui/`.
- Utilizar las imágenes de `docs/ui/images/` como referencia visual.
- Mantener los componentes Vue pequeños, reutilizables y tipados.
- No considerar una funcionalidad terminada únicamente porque su interfaz está diseñada.
- Actualizar `docs/development/frontend-roadmap.md` al completar una fase.
- Si cambia el diseño aprobado, actualizar la especificación y la imagen de referencia cuando corresponda.
- No modificar decisiones arquitectónicas aceptadas sin revisar los ADR relevantes.


# Instrucciones para la documentación

## Reglas generales

- Redacta la documentación en español.
- Utiliza el formato Markdown.
- Mantén la documentación clara y concisa.
- No documentes funcionalidades planificadas como si ya estuvieran implementadas.

## Documentación de la interfaz de usuario (UI)

- Almacena las especificaciones de la interfaz de usuario en `docs/ui/`.
- Almacena las imágenes de diseño en `docs/ui/images/`.
- Haz referencia a las imágenes mediante rutas relativas.
- Incluye los requisitos funcionales y los criterios de aceptación.
- Actualiza las especificaciones de la interfaz de usuario cuando cambien los diseños.

## Documentación de decisiones arquitectónicas (ADR)

- Almacena las decisiones arquitectónicas en `docs/adr/`.
- Sigue el formato ADR existente.
- No sobrescribas las decisiones arquitectónicas ya aceptadas.
- Crea un nuevo ADR cuando sustituyas una decisión previamente aceptada.

## Seguimiento del desarrollo

- Actualiza las hojas de ruta (roadmaps) de desarrollo a medida que se completen los hitos.
- Registra las tareas pendientes y las limitaciones conocidas.
- Asegúrate de que la documentación sea coherente con el código real.