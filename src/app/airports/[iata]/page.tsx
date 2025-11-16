"use client";

import { useEffect } from "react";
import { useParams } from "next/navigation";
import { useAirportStore } from "@/store/airportStore";

import AirportInfoCard from "@/components/AiportInfoCard";
import AirportTabs from "@/components/AirportTabs";

export default function AirportDetailsPage() {
  const { iata } = useParams();
  const { selectedAirport, fetchAirportByIata } = useAirportStore();

  useEffect(() => {
    if (!selectedAirport || selectedAirport.iata_code !== iata) {
      fetchAirportByIata(iata as string);
    }
  }, [iata, selectedAirport]);

  if (!selectedAirport) {
    return (
      <div className="text-white text-center py-10">Cargando información...</div>
    );
  }

  return (
    <div
      className="
        relative min-h-screen w-full text-white px-6 md:px-14 pt-10
        bg-cover bg-center bg-no-repeat
      "
      style={{ backgroundImage: "url('/fondo.png')" }}
    >
      {/* Overlay oscuro */}
      <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" />

      {/* Contenido */}
      <div className="relative z-10 max-w-7xl mx-auto">
        
        {/* Título */}
        <h1
          className="
            text-center text-5xl font-extrabold mb-10
            bg-gradient-to-r from-[#3DCBFF] to-[#367BFF] text-transparent bg-clip-text
          "
        >
          {selectedAirport.airport_name}
        </h1>

        {/* Tabs */}
        <AirportTabs />

        {/* Card Información General */}
        <div className="mt-10">
          <AirportInfoCard/>
        </div>
      </div>
    </div>
  );
}
