# 🌤️ Weather Frontend — Módulo 3

Proyecto educativo desarrollado para el **Módulo 3** del Bootcamp FrontEnd Trainee SENCE 2025.  
Esta versión refactoriza la **interfaz de la App de Clima** del Módulo 2, enfocándose en **estilos, layout y modularización CSS** usando **SASS, BEM y Bootstrap**.

---

## Descripción

Aplicación de clima que muestra información básica de 10 ciudades principales del mundo. Maneja datos ficticios (mock data) para mostrar temperatura, estado del tiempo, humedad, viento y un pronóstico semanal simulado. La interfaz está pensada para ser clara, accesible y responsiva, con una temática invernal y navideña (nieve y detalles visuales).

## Metodología de estilos

Se utilizó la metodología BEM (Bloque, Elemento, Modificador) para mantener los nombres de clases claros y consistentes en toda la app. Esto facilita el mantenimiento y la escalabilidad del CSS.

## 🚀 Características Principales (MVP)

- Página Home con grilla de ciudades usando **mock data**.
- Cards con información de clima: icono, temperatura, estado y humedad.
- Vista Detalle con información ampliada de la ciudad.
- Navbar y Footer consistentes en todas las páginas.
- Barra de busqueda modular que filtra ciudad a medida que se escribe descartando el resto
- Layout **responsivo**:
  - Móvil (≤420px): cards apiladas.
  - Desktop (≥1024px): varias cards por fila con espaciado coherente.
- **Decoración navideña**: nieve, reno corriendo y Papá Noel interactivo.
- Uso de **SASS con parciales, variables y mixins** para modularizar los estilos.

---

## Estructura SASS

El código SASS está modularizado en parciales principales que se organizan así:

_variables.scss: Variables globales como colores, tamaños y fuentes.

_mixins.scss: Mixins reutilizables para animaciones y estilos repetitivos.

_animations.scss: Animaciones personalizadas para efectos como nieve.

_header.scss y _footer.scss: Estilos específicos para header y footer.

_place-card.scss: Estilos para las tarjetas de ciudades (cards) que muestran información del clima.

_search.scss: Estilos para la zona y barra de búsqueda, asegurando funcionalidad y diseño consistente.

_main.scss: Archivo principal que importa todos los parciales y compila el CSS final.

## 📋 Requisitos del Proyecto

- Mantener la funcionalidad mínima de Módulo 2.
- Rediseñar la interfaz aplicando **BEM** y metodologías de organización de estilos.
- Modularizar CSS con **SASS** (`_variables.scss`, `_mixins.scss`, `_animations.scss`, `_header.scss`, `_footer.scss`, `_place-card.scss`).
- Utilizar el **grid de Bootstrap** y al menos dos componentes (navbar, cards, botones, etc.).
- Control de versiones con **Git/GitHub** (commits descriptivos, README actualizado).

---

## 🗂️ Estructura del Proyecto



weather/
│
├── index.html                      # Archivo principal HTML
│
├── Assets/                        # Recursos y datos del proyecto
│   ├── cities/                   # Imágenes de íconos de ciudades
│   ├── screenshots/              # Capturas de pantalla para vista previa
│   │   ├── detalle.png
│   │   └── home.png
│   └── cities.js                 # Datos mock de ciudades y lógica JS
│
├── css/                         # CSS compilado generado por SASS
│   ├── main.css
│   └── main.css.map
│
├── scss/                        # Archivos fuente SASS organizados en módulos
│   ├── base/                    # Variables, mixins y animaciones globales
│   │   ├── _animations.scss
│   │   ├── _mixins.scss
│   │   └── _variables.scss
│   ├── components/              # Componentes reutilizables de la interfaz
│   │   ├── _place-card.scss    # Estilos para las tarjetas de ciudades
│   │   └── _search.scss        # Estilos para la barra y zona de búsqueda
│   ├── layout/                 # Estructura global: header y footer
│   │   ├── _footer.scss
│   │   └── _header.scss
│   └── main.scss               # Archivo principal que importa todos los parciales
│
└── README.md                   # Documentación y descripción del proyecto



---

## 🧠 ¿Qué hace la aplicación?

- Permite seleccionar una ciudad desde la **Home**.
- Al hacer clic, muestra su información detallada con temperatura, humedad y pronóstico semanal simulado.
- Los estilos y animaciones (nieve, reno, Papá Noel) se implementan mediante **SASS y mixins**.
- Todo se carga desde **datos locales**, no desde una API.

---

## 🛠️ Tecnologías Utilizadas

- **HTML5 semántico**
- **Bootstrap 4/5** (grid, utilidades y componentes)
- **SASS** (variables, mixins, parciales)
- **JavaScript Vanilla** (DOM + eventos)
- **Git y GitHub** para control de versiones

---

## 🏞️ Vista Previa del Proyecto

**Home**

![Home](assets/screenshots/home.png)

**Detalle de Ciudad**

![Detalle](assets/screenshots/detalle_card.png)

---

## Nota importante sobre @import y @use

Actualmente el proyecto usa @import en los archivos SASS para importar parciales (variables, mixins, componentes, etc.).

Aunque Sass recomienda migrar a @use para modularizar mejor y evitar conflictos, en este proyecto mantendremos @import para evitar romper estilos o funcionalidades, ya que cambiar a @use puede requerir reorganizar variables y mixins.

En próximas mejoras, se explorará y migraré a @use para aprovechar sus ventajas.

## 📬 Autora

Proyecto realizado por **Christel Vial** (con soporte de IA) para el **Módulo 3** del Bootcamp FrontEnd Trainee SENCE 2025.

---

## 📌 Repositorio

[https://github.com/christelita/weather-frontend-m3](https://github.com/christelita/weather-frontend-m3)
