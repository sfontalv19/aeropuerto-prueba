"use client";

import AirportsSearch from "@/components/AirportSearch";
import AirportTable from "@/components/AirportTable";


export default function AirportsPAge() {
    return(
        <main className="min-h-screen p-6 max-w-4x1 mx-auto">
            <h1 className="text-3x1 font-bold mb-6"> Listado de Aeropuertos</h1>
           {/* 🔍 Buscador */}

           <AirportsSearch/>

           {/* table */}

           <AirportTable/>
           
        </main>

    )
}

