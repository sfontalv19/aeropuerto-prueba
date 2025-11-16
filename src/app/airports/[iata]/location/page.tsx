"use client";

import { useEffect } from "react";
import { useParams } from "next/navigation";
import { useAirportStore } from "@/store/airportStore";
import AirportTabs from "@/components/AirportTabs";
import AirportLocation from "@/components/AirportLocation";

export default function LocationPage() {
  const { iata } = useParams();
  const { selectedAirport, fetchAirportByIata, loading, error } = useAirportStore();

  useEffect(() => {
    if (!selectedAirport || selectedAirport.iata_code !== iata) {
      fetchAirportByIata(iata as string);
    }
  }, [iata, selectedAirport]);

  if (loading) {
    return <p className="text-white text-center mt-6">Cargando información...</p>;
  }

  if (error) {
    return <p className="text-red-400 text-center mt-6">{error}</p>;
  }

  if (!selectedAirport) {
    return <p className="text-gray-300 text-center mt-6">No hay información disponible</p>;
  }

 return (
     <div
       className="relative min-h-screen w-full text-white bg-cover bg-center bg-no-repeat flex justify-center"
       style={{ backgroundImage: "url('/fondo.png')" }}
     >
       {/* Overlay */}
       <div className="absolute inset-0 bg-black/50"></div>
 
       {/* Contenedor centrado */}
       <div className="relative z-10 w-full max-w-[1750px] px-6 flex flex-col items-center mt-[80px]">
 
         {/* Airport Title */}
         <h1 className="text-4xl md:text-5xl font-bold text-center mb-8 bg-gradient-to-r from-[#3DCBFF] to-[#367BFF] text-transparent bg-clip-text">
           {selectedAirport.iata_code || iata}
         </h1>
 
         {/* Tabs */}
         <AirportTabs />
 
         {/* Time Cards */}
         <AirportLocation />
       </div>
     </div>
   );
}
