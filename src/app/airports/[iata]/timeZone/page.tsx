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
  }, [iata, selectedAirport, fetchAirportByIata]);

  if (!selectedAirport) {
    return <p className="text-white text-center mt-6">Cargando información...</p>;
  }

  return (
    <div className="w-full flex flex-col items-center mt-10">
      {/* Título aeropuerto */}
      <h1 className="text-4xl font-bold bg-gradient-to-r from-[#0084FF] to-[#00F9FF] bg-clip-text text-transparent mb-6">
        {selectedAirport.airport_name.split(" ")[0]}
      </h1>

      {/* Nav Tabs */}
      <AirportTabs />

      {/* Contenido Zona Horaria */}
      <div className="w-full max-w-6xl mt-6">
        <AirportZonaTime />
      </div>
    </div>
  );
}
