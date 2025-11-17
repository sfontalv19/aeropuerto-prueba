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
    // 👇 Solo hacer fetch si el aeropuerto no coincide
    if (iata && (!selectedAirport || selectedAirport.iata_code !== iata)) {
      fetchAirportByIata(iata as string);
    }
  }, [iata]); // 👈 Solo depender de iata

  if (loading) {
    return (
      <div 
        className="relative min-h-screen w-full text-white bg-cover bg-center flex justify-center items-center"
        style={{ backgroundImage: "url('/fondo.png')" }}
      >
        <div className="absolute inset-0 bg-black/50"></div>
        <p className="relative z-10 text-xl animate-pulse">Cargando información del aeropuerto...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div 
        className="relative min-h-screen w-full text-white bg-cover bg-center flex justify-center items-center"
        style={{ backgroundImage: "url('/fondo.png')" }}
      >
        <div className="absolute inset-0 bg-black/50"></div>
        <p className="relative z-10 text-red-400 text-xl">Error: {error}</p>
      </div>
    );
  }

  if (!selectedAirport) {
    return (
      <div 
        className="relative min-h-screen w-full text-white bg-cover bg-center flex justify-center items-center"
        style={{ backgroundImage: "url('/fondo.png')" }}
      >
        <div className="absolute inset-0 bg-black/50"></div>
        <p className="relative z-10 text-gray-300 text-xl">No hay información disponible</p>
      </div>
    );
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
          {selectedAirport.iata_code || selectedAirport.iata_code || iata}
        </h1>

        {/* Tabs */}
        <AirportTabs />

        {/* Location Component */}
        <AirportLocation />
      </div>
    </div>
  );
}