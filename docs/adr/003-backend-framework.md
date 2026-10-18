# ADR-003: Elección de NestJS como framework Backend

**Estado:** Aceptado

## Contexto

La aplicación web **Personal Wallet** requiere una API robusta y bien estructurada para manejar las reglas de negocio, la validación de transacciones financieras, el cálculo de presupuestos y la persistencia de datos. El stack tecnológico general estará basado en JavaScript/TypeScript, por lo que se requiere elegir un framework de Node.js.

## Necesidades del Backend

* Fuerte tipado (TypeScript) para evitar errores comunes en el manejo de estructuras financieras.
* Arquitectura predecible y escalable.
* Facilidad para construir APIs REST (o potencialmente GraphQL a futuro).
* Herramientas integradas para inyección de dependencias (DI) y testabilidad.

## Alternativas consideradas

* **Express.js (puro):** Minimalista, altamente flexible y el estándar de facto. Sin embargo, no impone ninguna arquitectura, lo que puede llevar a un código desorganizado ("spaghetti code") en proyectos que crecen, requiriendo decisiones de arquitectura manuales constantes.
* **Fastify:** Excelente rendimiento y validación por esquema, pero requiere configurar una arquitectura personalizada al igual que Express.
* **NestJS:** Framework altamente opinado, construido sobre Express/Fastify, que utiliza TypeScript nativamente y provee una arquitectura orientada a módulos inspirada en Angular.

## Decisión

Se ha decidido utilizar **NestJS** como el framework base para el desarrollo del Backend.

## Justificación

* **Arquitectura Modular y Opinada:** NestJS obliga (o facilita fuertemente) a estructurar el código en Controladores, Servicios y Módulos. Esto asegura de entrada la "separación de responsabilidades" y facilita la mantenibilidad del código.
* **Inyección de Dependencias (DI):** Su contenedor de DI nativo desacopla la lógica de negocio, lo que permite inyectar fácilmente implementaciones reales o mocks durante los tests.
* **TypeScript First:** Ofrece decoradores avanzados y un soporte de primer nivel para tipado estricto, reduciendo drásticamente los errores en tiempo de ejecución.
* **Testabilidad:** Promueve y facilita arquitecturas limpias y provee utilidades (testing module) que hacen que las pruebas unitarias y e2e sean naturales.

## Consecuencias

* **Positivas:** Código altamente estructurado y ordenado desde el día 1; excelente soporte para TypeScript; fácil escalabilidad al agregar nuevos módulos de negocio (ej. un módulo para "Categorías", otro para "Transacciones").
* **Negativas / Trade-offs:** La curva de aprendizaje inicial es más alta en comparación con un script simple de Express. Hay más "boilerplate" y ceremonias al crear nuevos archivos, aunque las herramientas de CLI (`nest generate`) mitigan gran parte de este problema.
