"use client";

import { useEffect } from "react";
import { useParams } from "next/navigation";
import AirportZonaTime from "@/components/AirportZonaTime";
import { useAirportStore } from "@/store/airportStore";
import AirportTabs from "@/components/AirportTabs";

export default function TimeZonePage() {
  const { iata } = useParams();
  const { selectedAirport, fetchAirportByIata } = useAirportStore();

  useEffect(() => {
    if (!selectedAirport || selectedAirport.iata_code !== iata) {
      fetchAirportByIata(iata as string);
    }
  }, [iata, selectedAirport]);

  if (!selectedAirport) {
    return <p className="text-white text-center mt-6">Cargando información...</p>;
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
          {selectedAirport.city || iata}
        </h1>

        {/* Tabs */}
        <AirportTabs />

        {/* Time Cards */}
        <AirportZonaTime />
      </div>
    </div>
  );
}
