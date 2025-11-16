"use client";

import Image from "next/image";
import { useAirportStore } from "@/store/airportStore";

export default function AirportInfoCard() {
  const { selectedAirport } = useAirportStore();

  if (!selectedAirport) {
    return (
      <p className="text-white text-center py-4">
        No hay información disponible
      </p>
    );
  }

  return (
    <div
      className="
        w-full bg-white/10 border border-white/20 rounded-xl overflow-hidden
        backdrop-blur-lg grid grid-cols-1 md:grid-cols-2
        animate-fadeIn
      "
    >
      {/* Columna Izquierda – Info */}
      <div className="p-8 flex flex-col gap-4">
        <h2 className="flex items-center gap-2 text-2xl font-bold">
          <Image
            src="/infoCircle.png"
            alt="info icon"
            width={24}
            height={24}
          />
          <span className="bg-gradient-to-r from-[#3DCBFF] to-[#367BFF] text-transparent bg-clip-text">
            Información General
          </span>
        </h2>

        <div className="space-y-2 text-lg">
          <p><b>Nombre:</b> {selectedAirport.airport_name || "No disponible"}</p>
          <p><b>Código IATA:</b> {selectedAirport.iata_code || "No disponible"}</p>
          <p><b>Código ICAO:</b> {selectedAirport.iacao_code || "No disponible"}</p>
          <p><b>País:</b> {selectedAirport.country_name || "No disponible"}</p>
          <p><b>Ciudad:</b> {selectedAirport.city || "No disponible"}</p>
          <p><b>Teléfono:</b> No disponible</p>
          <p><b>País:</b> {selectedAirport.country_name} ({selectedAirport.country_code})</p>

        </div>
      </div>

      {/* Columna Derecha – Imagen */}
      <div className="relative opacity-30 md:opacity-50 min-h-[220px]">
        <Image
          src="/aviatior.png"
          alt="airport"
          fill
          className="object-cover"
        />
      </div>
    </div>
  );
}
