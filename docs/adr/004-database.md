# ADR-004: Elección de base de datos

**Estado:** Aceptado

## Contexto

La aplicación **Personal Wallet** maneja datos financieros críticos (ingresos, gastos, usuarios, saldos). Estos datos poseen relaciones lógicas claras (por ejemplo, una transacción pertenece a una categoría y a un usuario). Se necesita una tecnología de persistencia de datos capaz de asegurar la integridad y fiabilidad de la información.

## Requisitos de persistencia

* Garantizar la integridad de los datos financieros.
* Soporte para transacciones (ACID) para evitar estados inconsistentes (ej. descontar saldo pero no registrar la transacción por un error).
* Flexibilidad para ejecutar consultas complejas de reportes (sumatorias por mes, agrupaciones por categoría).

## Alternativas consideradas

* **MongoDB (NoSQL):** Excelente para flexibilidad de esquemas y prototipado rápido, pero manejar relaciones bidireccionales y transacciones complejas requeridas en temas financieros suele ser más trabajoso y menos seguro desde el motor.
* **MySQL:** Base de datos relacional sólida y muy popular, cubre la mayoría de necesidades.
* **PostgreSQL:** Base de datos relacional avanzada, altamente compatible con los estándares SQL, con tipos de datos muy ricos, excelente concurrencia y un comprobado historial de fiabilidad en entornos que manejan datos financieros.

## Decisión

Se ha decidido utilizar **PostgreSQL** como el motor principal de base de datos relacional.

El motor de base de datos se ejecutará localmente en desarrollo mediante **Docker Compose**, y los datos persistirán utilizando un volumen de Docker (`volumes`).

## Justificación

* **Modelo Relacional Natural:** El dominio financiero de la aplicación tiene una estructura altamente relacional y tabular, ideal para SQL.
* **Integridad (ACID):** PostgreSQL asegura transaccionalidad total, lo que es vital al escribir rutinas que muevan o registren saldos.
* **Tipos de datos avanzados:** Soporte robusto para tipos numéricos exactos (esenciales para moneda) y columnas JSONB por si se necesita guardar metadatos variables en el futuro.
* **Desarrollo con Docker:** Ejecutar la base de datos vía `docker-compose.yml` garantiza que el entorno de desarrollo sea consistente, efímero (si se desea) y fácil de configurar sin instalar PostgreSQL de forma nativa en cada máquina.

## Consecuencias Positivas

* Estricta integridad de los datos financieros gracias a las constraints, claves foráneas y transaccionalidad de PostgreSQL.
* Entorno de desarrollo determinista y limpio al utilizar Docker Compose con volúmenes definidos para persistir el trabajo entre reinicios.

## Trade-offs

* Requerirá tener conocimientos básicos de Docker para levantar el entorno de desarrollo local.
* Las migraciones de esquemas (modificar columnas o tablas existentes en el futuro) requieren un manejo estructurado, algo que herramientas ORM deberán ayudar a gestionar.
