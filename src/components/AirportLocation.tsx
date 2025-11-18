"use client";

import dynamic from "next/dynamic";
import Image from "next/image";
import { useAirportStore } from "@/store/airportStore";

// 👇 Cargamos Leaflet solo en cliente
const Map = dynamic(
  () => import("./MapView"),
  { 
    ssr: false,
    loading: () => (
      <div className="flex items-center justify-center h-full bg-gray-200/60 dark:bg-gray-800/50">
        <p className="text-theme-secondary dark:text-white/70 animate-pulse">Cargando mapa...</p>
      </div>
    )
  }
);

// Combina la ficha de ubicación con el mapa interactivo si existen coordenadas válidas.

export default function AirportLocation() {
  const { selectedAirport } = useAirportStore();

  // 👇 Usar datos REALES de la API
  const lat = selectedAirport?.latitude ? Number(selectedAirport.latitude) : null;
  const lon = selectedAirport?.longitude ? Number(selectedAirport.longitude) : null;
  const geoname = selectedAirport?.geoname_id ?? "No disponible";
  const airportName = selectedAirport?.airport_name ?? "Sin nombre";
  const iataCode = selectedAirport?.iata_code ?? "N/A";

  const hasValidCoords = lat !== null && lon !== null && !isNaN(lat) && !isNaN(lon);

  return (
    <div className="w-full flex flex-col items-center gap-6 mt-10">
      
      {/* === CARD INFO === */}
      <div
        className="
          w-full max-w-[1750px] h-[272px] rounded-[7px] border border-theme 
          overflow-hidden backdrop-blur-xl text-theme-primary dark:text-white
          bg-theme-card-alt dark:bg-gradient-to-r dark:from-[#3F495F] dark:to-[#0E1934]
          grid grid-cols-1 md:grid-cols-2
        "
      >
        {/* Left Content */}
        <div className="p-8 flex flex-col gap-3">
          <h2 className="flex items-center gap-2 text-[22px] font-semibold">
            <Image src="/locationIcon.png" alt="loc" width={26} height={26} />
            <span className="bg-gradient-to-r from-[#3DCBFF] to-[#367BFF] text-transparent bg-clip-text">
              Ubicación
            </span>
          </h2>

          <div className="text-lg space-y-2 text-theme-secondary dark:text-white">
            <p><b>Latitud:</b> {hasValidCoords ? lat : "No disponible"}</p>
            <p><b>Longitud:</b> {hasValidCoords ? lon : "No disponible"}</p>
            <p><b>ID Geoname:</b> {geoname}</p>
          </div>
        </div>

        {/* Right Image */}
        <div className="relative opacity-50">
          <Image 
            src="/aviatior.png" 
            alt="plane" 
            fill 
            className="object-cover brightness-110 dark:brightness-90" 
          />
        </div>
      </div>

      {/* === MAPA INTERACTIVO === */}
      <div
        className="
          w-full max-w-[1750px] h-[400px] rounded-[7px] border border-theme
          overflow-hidden shadow-2xl
        "
      >
        {hasValidCoords ? (
          <Map 
            lat={lat!} 
            lon={lon!} 
            airportName={airportName}
            iataCode={iataCode}
          />
        ) : (
          <div className="flex flex-col items-center justify-center h-full bg-gray-200/70 dark:bg-gray-800/50 text-theme-secondary dark:text-white/70">
            <svg 
              className="w-16 h-16 mb-4 opacity-50" 
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
            >
              <path 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                strokeWidth={2} 
                d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" 
              />
              <path 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                strokeWidth={2} 
                d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" 
              />
            </svg>
            <p className="text-lg">No hay coordenadas disponibles para este aeropuerto</p>
          </div>
        )}
      </div>
    </div>
  );
}
