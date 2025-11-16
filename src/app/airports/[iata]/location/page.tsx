"use client";

import { useEffect } from "react";
import { useParams } from "next/navigation";
import { useAirportStore } from "@/store/airportStore";
import AirportTabs from "@/components/AirportTabs";
import AirportLocation from "@/components/AirportLocation";

export default function LocationPage() {
  const { iata } = useParams();
  const { selectedAirport, fetchAirportByIata, loading, error } = useAirportStore();

  // 🔄 Trae solo si no existe o si cambió el IATA actual
  useEffect(() => {
    if (!selectedAirport || selectedAirport.iata_code !== iata) {
      fetchAirportByIata(iata as string);
    }
  }, [iata, selectedAirport]);

  // 🌀 Loading UI
  if (loading) {
    return <p className="text-white text-center mt-6">Cargando información...</p>;
  }

  // ❌ Error UI
  if (error) {
    return <p className="text-red-400 text-center mt-6">{error}</p>;
  }

  // 🔍 Data no encontrada
  if (!selectedAirport) {
    return <p className="text-gray-300 text-center mt-6">No hay información disponible</p>;
  }

  return (
    <div className="px-4 md:px-0 max-w-6xl mx-auto">
      <AirportTabs />
      <div className="mt-6">
        <AirportLocation />
      </div>
    </div>
  );
}
