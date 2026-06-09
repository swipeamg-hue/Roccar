# Presentación Interactiva SPA — Soluciones Singulares en Salud

Esta es una aplicación web interactiva de una sola página (Single Page Application - SPA) de diseño premium, adaptada para ofrecer las soluciones químicas profesionales de **Swipe** a las 5 áreas clave de **Soluciones Singulares en Salud**.

Este proyecto ha sido configurado como una plantilla modular y escalable para futuras presentaciones de soluciones químicas Swipe en el sector hospitalario y clínico.

---

## 💎 Características Premium

1. **Diseño Visual Inmersivo**:
   - Interfaz con modo oscuro inmersivo y estética premium.
   - Efectos **Glassmorphism** de última generación (paneles translúcidos con desenfoque de fondo y bordes brillantes).
   - Paleta de colores armoniosa y codificada de manera única para cada una de las 5 áreas de bioseguridad del hospital.
   - Logotipos y gráficos vectoriales nativos (SVG) para una nitidez pixel-perfect.

2. **Navegación de 5 Columnas Expansivas (Híbrida e Interactiva)**:
   - Inicialmente, la pantalla se divide equitativamente en 5 columnas verticales dinámicas.
   - **Hover**: Al pasar el cursor, la columna se expande y enfoca sutilmente mientras las otras se contraen y difuminan ligeramente.
   - **Click para Pantalla Completa**: Al hacer clic, la columna realiza una transición fluida en curva `cubic-bezier` para ocupar el 100% de la pantalla, revelando un panel de control técnico completo.
   - **Botón de Escape**: Botón flotante para salir de la pantalla completa y volver cómodamente al menú general.

3. **Catálogo Integrado por Áreas**:
   - **Quirófanos & UCI**: Desinfectante viricida (Swipol) en 30 segundos, esterilización química (Peracetic) y lavado antiséptico de manos (Hand Soap Foam).
   - **Lavandería Clínica**: Detergente terminal desinfectante (HLDH), blanqueador y desinfectante clorado pesado (HLDH System 3), y suavizante biodegradable (Soft).
   - **Habitaciones de Pacientes**: Prevención activa en puntos de alto contacto, control de pisos (Swipe Magic) y neutralización de olores (Sure Thing).
   - **Dietología & Cocina**: Inocuidad total con registro NSF A1 (Swipe Concentrado), removedor de cochambre gel (Grease) y detergente biodegradable lavaloza (Crystal).
   - **Sanitarios & Baños**: Limpiadores ácidos desincrustantes rápidos (Brite y Brite Gel) con total compatibilidad de tuberías y porcelana.

4. **Motores de Cálculo de Dosificación en Tiempo Real**:
   - Cada área cuenta con su propio simulador matemático:
     - *Quirófanos & UCI*: Calcula la dosificación exacta de desinfectantes clínicos según los metros cuadrados a tratar y la carga biológica.
     - *Lavandería Clínica*: Calcula la cantidad necesaria de detergente/suavizante según los kilogramos de blancos a lavar.
     - *Habitaciones*: Muestra el consumo diario de jabón/gel según la cantidad de dispensadores y frecuencia de uso.
     - *Dietología*: Despliega los protocolos específicos H paso a paso para desengrase o desinfección.
     - *Sanitarios*: Muestra la proporción exacta en mililitros de Brite/Swipol y agua limpia según el recipiente.

5. **Sistema de Cotización Personalizado ("Cotizador Soluciones Singulares en Salud")**:
   - Los tomadores de decisiones pueden agregar productos a una cotización de forma instantánea.
   - Una barra flotante en la parte inferior de la pantalla aparece con un contador dinámico.
   - Abre un modal con el desglose de productos y permite rellenar un formulario para procesar la cotización e interactuar con el departamento de compras.

---

## 🛠️ Estructura del Proyecto

El proyecto está diseñado bajo una filosofía de **cero dependencias (Vanilla Stack)**, garantizando tiempos de carga instantáneos de menos de 1 segundo:

```
Soluciones Singulares en Salud/
├── index.html              # Estructura principal y plantillas de modales
├── css/
│   ├── main.css            # Estilos globales, variables de color y fuentes
│   ├── sections.css        # Acordeón de 5 columnas y catálogo
│   └── components.css      # Calculadoras, modales, cotizador flotante
├── js/
│   ├── products.js         # Base de datos JSON de productos y fichas técnicas
│   ├── calculators.js      # Algoritmos de cálculo de dosificación química
│   └── app.js              # Controlador principal, transiciones y carrito
├── images/                 # Recursos gráficos, logotipos y fotos de producto
└── README.md               # Este documento
```

---

## 🚀 Despliegue a Producción (GitHub Pages)

Dado que es un proyecto puramente estático de alto rendimiento, se publica utilizando **GitHub Pages**:

- URL del proyecto: `https://swipeamg-hue.github.io/Soluciones-Singulares-en-Salud/`
- Para publicar cambios, simplemente realiza un commit y push a la rama principal (`main` o `master`).
