"use client";

import { useAirports } from "@/hooks/useAirports";

export default function AirportTable() {
    const { airports,
            loading,
            error,
            page,
            setPage
          } = useAirports();

   // loading state
   
   if (loading) {
    return(
        <p className="text-blue-600 font-medium animate-pulse">
            Cargando los aeropuertos
        </p>
    );
   }
     // Error state
     
     if ( error) {
        return(
            <p className="text-red-600 font-medium">
                Error: {error}
            </p>
        );
     }

     // no results

     if (airports.length===0){
        return(
            <p className=" text-gray-500">
                no se encontraron aeropuertos
            </p>
        );
     }

     return(
        <div className="mt-6">
            <table className="w-full border-collapse shadow-sm">
                <thead>
                    <tr className="bg-gray-100 text-letf">
                        <th className="p-3 border">Nombrer</th>
                        <th className="p03 border">IATA</th>
                        <th className="p-3 border">ICAO</th>
                        <th className="p-3 border">Ciudad</th>
                        <th className="p-3 border">Pais</th>
                    </tr>
                </thead>

                <tbody>
                    {airports.map((airport)=> (
                        <tr key={airport.id }className="hover:bg-gray-50">
                            <td className="p-3 border">{airport.airport_name}</td>
                            <td className="p-3 border">{airport.iata_code}</td>
                            <td className="p-3 border">{airport.iacao_code}</td>
                            <td className="p-3 border">{airport.city}</td>
                            <td className="p-3 border">{airport.country_name}</td>
                        </tr>
                    ))}
                </tbody>
            </table>

            {/*pagination */}

            <div className="flex justify-between mt-4">
                <button
                onClick={()=> setPage(Math.max(1, page -1))}
                disabled= {page ===1}
                className="px4 py2 bg-gray-200 rounded  disabled:bg-gray-100"
                
                >
                    Anterior
                </button>
                <span className="px-4 py2 font-semibold">
                    pagina {page}
                    </span>    

                <button
                onClick={() => setPage (page +1)}
                className="px-4 py-2 bg-gray-200 rounded"

                > siguiente
                    </button>    

            </div>
        </div>
     )
}
