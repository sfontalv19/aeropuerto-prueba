"use client";

import { useAirportStore } from "@/store/airportStore";
import { GlobeAltIcon, ClockIcon } from "@heroicons/react/24/outline";

export default function AirportZonaTime() {
  const airport = useAirportStore((state) => state.selectedAirport);

  if (!airport) return <p className="text-white">No hay información disponible</p>;

  // Simulación de hora local temporal
  const localTime = new Date().toLocaleString();

  return (
    <div className="mt-8 space-y-8 w-full max-w-6xl px-4 mx-auto">
      
      {/* CARD 1: Zona horaria */}
      <div className="relative overflow-hidden rounded-2xl border border-gray-500/30 bg-gradient-to-b from-white/10 to-white/5 backdrop-blur-md p-6 flex items-center">
        
        {/* FONDO IMAGEN */}
        <div
          className="absolute right-0 inset-y-0 w-1/3 opacity-40 bg-cover bg-center"
          style={{ backgroundImage: "url('/aviatior.png')" }}
        />

        <div className="relative z-10 w-2/3 text-white">
          <h2 className="flex items-center gap-2 text-2xl font-bold bg-gradient-to-r from-[#00A3FF] to-[#00F9FF] text-transparent bg-clip-text">
            <GlobeAltIcon className="h-7 w-7 text-[#00A3FF]" />
            Zona Horaria
          </h2>

          <div className="mt-5 space-y-2 text-lg">
            <p><span className="font-bold">Zona Horaria:</span> {airport.timezone || "No disponible"}</p>
            <p><span className="font-bold">GMT:</span> {airport.gmt}</p>
          </div>
        </div>
      </div>
      
      {/* CARD 2: Hora local */}
      <div className="relative overflow-hidden rounded-2xl border border-gray-500/30 bg-gradient-to-b from-white/10 to-white/5 backdrop-blur-md p-6 flex items-center">
        
        <div
          className="absolute right-0 inset-y-0 w-1/3 opacity-40 bg-cover bg-center"
          style={{ backgroundImage: "url('/aviatior.png')" }}
        />
        
        <div className="relative z-10 text-white">
          <h2 className="flex items-center gap-2 text-2xl font-bold bg-gradient-to-r from-[#00A3FF] to-[#00F9FF] text-transparent bg-clip-text">
            <ClockIcon className="h-7 w-7 text-[#00A3FF]" />
            Hora Local
          </h2>

          <p className="mt-5 text-lg">{localTime}</p>
        </div>
      </div>
    </div>
  );
}
