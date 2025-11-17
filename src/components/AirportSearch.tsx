"use client";

import { useAirports } from "@/hooks/useAirports";

// Input controlado que actualiza el filtro global de aeropuertos.

export default function AirportsSearch() {
    const { search, setSearch } = useAirports();

    return (
        <div className="flex items-center gap-3 w-full md:w-auto">
            
            {/* Input con ancho fijo parecido al Figma */}
            <input
                type="text"
                placeholder="Buscar aeropuertos..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="
                  w-[780px] max-w-full px-6 py-2.5
                  bg-white/15 border border-white/25 
                  rounded-full text-gray-200 placeholder-gray-400
                  focus:outline-none focus:border-[#00F9FF] 
                  transition-colors
                "
            />

            {/* Botón */}
            <button
                className="
                  px-5 py-2.5 text-white font-medium rounded-lg
                  bg-gradient-to-r from-[#006AFF] to-[#00F9FF]
                  hover:opacity-90 transition-all
                "
            >
                Buscar
            </button>
        </div>
    );
}
