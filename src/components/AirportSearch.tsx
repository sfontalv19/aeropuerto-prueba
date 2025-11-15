"use client";

import { useAirports } from "@/hooks/useAirports";

export default function AirportsSearch() {
    const { search, setSearch } = useAirports();

    return(
        <div className="mb-6">
            <input
            type = "text"
            placeholder="Buscar aeropuerto por nombre o codigo"
            value={search}
            onChange={(e) => 
                setSearch(e.target.value)
            }
            className="w-full p-3 border border-gray-300 rounded-lg shadow-sm 
                        focus:outline-none focus:ring-2 focus:ring-blue-500"
        />            
        </div>
    )
}