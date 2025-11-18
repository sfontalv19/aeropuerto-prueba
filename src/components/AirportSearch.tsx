"use client";

import { useAirports } from "@/hooks/useAirports";

// Input controlado que actualiza el filtro global de aeropuertos.

export default function AirportsSearch() {
    const { search, setSearch } = useAirports();

    return (
        <div className="flex items-center gap-3 w-full md:w-auto">
            
           {/* Input de búsqueda */}
{/* Input de búsqueda */}
<input
  type="text"
  placeholder="Buscar aeropuertos..."
  className="
    w-[700px]
    px-6 py-3 text-white
    bg-[#FFFFFF] rounded-lg
    border border-white/20
    focus:outline-none focus:border-[#006FEE]
    transition-all
    text-base
    placeholder-[#006FEE]
  "
/>

{/* Botón */}
<button
  className="
    flex items-center justify-center gap-3
    px-10 py-3 text-white font-semibold rounded-lg text-base
    bg-gradient-to-r from-[#006AFF] to-[#00F9FF]
    hover:opacity-90 transition-all
    shadow-lg
    min-w-[160px]
  "
>
  <img 
    src="/lupa.png" 
    alt="Buscar"
    style={{ width: '36.66px', height: '36.66px' }}
  />
    Buscar
    </button>
        </div>
    );
}
