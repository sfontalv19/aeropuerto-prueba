"use client";

import { useEffect } from "react";
import { useParams } from "next/navigation";
import AirportZonaTime from "@/components/AirportZonaTime";
import { useAirportStore } from "@/store/airportStore";
import AirportTabs from "@/components/AirportTabs";

export default function TimeZonePage() {
  const { iata } = useParams();
  const { selectedAirport, fetchAirportByIata, loading } = useAirportStore();

  useEffect(() => {
    // 👇 Solo hacer fetch si el aeropuerto no coincide
    if (iata && (!selectedAirport || selectedAirport.iata_code !== iata)) {
      fetchAirportByIata(iata as string);
    }
  }, [iata]); // 👈 Solo depender de iata

  if (loading) {
    return (
      <div className="relative min-h-screen w-full text-white bg-cover bg-center flex justify-center items-center" style={{ backgroundImage: "url('/fondo.png')" }}>
        <div className="absolute inset-0 bg-black/50"></div>
        <p className="relative z-10 text-xl animate-pulse">Cargando información...</p>
      </div>
    );
  }

  if (!selectedAirport) {
    return (
      <div className="relative min-h-screen w-full text-white bg-cover bg-center flex justify-center items-center" style={{ backgroundImage: "url('/fondo.png')" }}>
        <div className="absolute inset-0 bg-black/50"></div>
        <p className="relative z-10 text-xl">No se encontró información del aeropuerto</p>
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
      <div className="relative z-10 w-full max-w-[1200px] px-4 sm:px-6 flex flex-col items-center mt-20">
<div className="h-5"></div>
        {/* Airport Title */}
        <h1 className="text-4xl md:text-5xl font-bold text-center mb-8 bg-gradient-to-r from-[#3DCBFF] to-[#367BFF] text-transparent bg-clip-text tracking-wide">
          {selectedAirport.iata_code}
        </h1>
      <div className="h-6"></div>
        {/* Tabs */}
        <div className="w-full mb-10">
          <AirportTabs />
        </div>
    <div className="h-8"></div>
        {/* Time Cards */}
        <div className="w-full">
          <AirportZonaTime />
        </div>
      </div>
    </div>
  );
}
