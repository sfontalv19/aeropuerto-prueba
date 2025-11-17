# SkyConnect Explorer

Aplicación construida con Next.js 16 y React 19 para consultar aeropuertos del API pública de AviationStack. Permite explorar aeropuertos por nombre o código IATA, revisar detalles generales, ubicación y zona horaria, así como visualizar estadísticas globales de aeronaves.

## Características principales
- **Búsqueda y paginación**: filtro reactivo por nombre o código, con paginado local sobre la data cacheada.
- **Detalle del aeropuerto**: pestañas para información general, ubicación con mapa interactivo (Leaflet), zona horaria y estadísticas.
- **Visualizaciones**: gráficos de Recharts para los tipos de aeronaves más comunes y resumen de flota.
- **Experiencia optimizada**: caché en memoria para respuestas del API, estado global con Zustand y componentes client-side desacoplados.
- **Pruebas unitarias**: Testing Library + Jest con mocks para dependencias de Next.js.

## Stack tecnológico
- [Next.js 16 (App Router)](https://nextjs.org/) sobre React 19.
- [Zustand](https://zustand-demo.pmnd.rs/) para el store global de aeropuertos.
- [Tailwind CSS v4](https://tailwindcss.com/) y estilos personalizados en `globals.css`.
- [Leaflet + React Leaflet](https://react-leaflet.js.org/) para los mapas.
- [Recharts](https://recharts.org/) para gráficas.
- [Jest 30](https://jestjs.io/) y Testing Library para pruebas unitarias.

## Requisitos previos
- Node.js 18.18+ (recomendado 20 LTS).
- npm 9+ (incluido con Node) o el gestor de paquetes de tu preferencia.
- Una clave válida para [AviationStack](https://aviationstack.com/) (`NEXT_PUBLIC_AVIATIONSTACK_KEY`).

## Configuración del entorno
1. **Instalar dependencias**
   ```bash
   npm install
   ```
2. **Variables de entorno**
   - Crea un archivo `.env` (ya incluido en el repo) con:
     ```
     NEXT_PUBLIC_AVIATIONSTACK_KEY=tu_api_key
     ```
   - Como la variable es `NEXT_PUBLIC_*`, estará disponible en cliente y servidor.
3. **Ejecutar el servidor de desarrollo**
   ```bash
   npm run dev
   ```
   Abre `http://localhost:3000` en el navegador.

## Scripts disponibles
| Script | Descripción |
| --- | --- |
| `npm run dev` | Levanta Next.js en modo desarrollo (hot reload). |
| `npm run build` | Compila la aplicación para producción. |
| `npm start` | Sirve la build previamente compilada. |
| `npm run test` | Ejecuta Jest en modo watch (usa `npx jest <pattern>` para una sola corrida). |

## Arquitectura y flujo de datos
- **Store global (`src/store/airportStore.ts`)**  
  Maneja la lista paginada, el aeropuerto seleccionado, estados de carga/error y caché en memoria (`aiportCache`). Provee `fetchAirports`, `fetchAirportByIata` y `fetchAirportById`.
- **Servicios (`src/services/`)**  
  `AirportService` y `StatisticsService` encapsulan las llamadas al API de AviationStack, agregan caché y exponen utilidades para paginación/búsqueda (`standardRequestsMethods.ts`).
- **Hooks**  
  `useAirports` sincroniza los controles de búsqueda/paginación con el store y dispara `fetchAirports` cuando cambian `page` o `search`.
- **Páginas (`src/app/`)**  
  - `/` muestra el `AirportHero`, un buscador que redirige a `/airports`.
  - `/airports` consume `useAirportStore` para listar aeropuertos (`AirportCard`), buscador (`AirportSearch`) y paginación.
  - `/airports/[iata]` y subrutas (`location`, `timeZone`, `statistics`) comparten tabs (`AirportTabs`) y cada pestaña monta sus componentes especializados (`AirportInfoCard`, `AirportLocation`, `AirportZonaTime`, `AirportStatistics`).
- **Componentes destacados**  
  - `AirportLocation` carga `MapView` dinámicamente para evitar SSR con Leaflet.  
  - `AirportZonaTime` actualiza la hora local cada segundo usando utilidades de `timeUtils`.  
  - `AirportStatistics` consume `StatisticsService` y dibuja gráficos con Recharts.

## Estructura de carpetas
```
src/
├─ app/                  # Rutas del App Router (home, listado y detalle por IATA)
├─ components/           # UI reutilizable (cards, tabs, mapas, hero, etc.)
├─ hooks/                # Hooks personalizados (useAirports)
├─ services/             # Lógica de acceso al API y procesamiento de datos
├─ store/                # Estado global con Zustand
├─ utils/                # Helpers de paginación/búsqueda y utilidades de tiempo
└─ __test__/             # Suites de Jest + Testing Library
__mocks__/               # Mocks para `next/image` y `next/link` en pruebas
```

## Dependencia externa (AviationStack)
- `/airports` (limit 1000) para obtener el catálogo que luego se filtra localmente.
- `/airplanes` y `/taxes` para alimentar las estadísticas.  
Las respuestas se cachean en memoria para evitar golpear el API en cada interacción y poder paginar localmente sin repetir requests.

## Pruebas
- Ejecuta todas las pruebas en modo interactivo:
  ```bash
  npm run test
  ```
- Para una corrida única, por ejemplo solo la suite de tarjetas:
  ```bash
  npx jest src/__test__/AirportCard.test.tsx --runInBand
  ```
Se proveen mocks en `__mocks__/` para `next/image` y `next/link`, y la suite actual valida los distintos estados de `AirportCard` (carga, error, vacíos, render y selección).

