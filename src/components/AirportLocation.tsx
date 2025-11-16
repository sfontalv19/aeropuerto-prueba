"use client";

import dynamic from "next/dynamic";
import Image from "next/image";
import { useAirportStore } from "@/store/airportStore";

// Cargamos Leaflet solo en cliente (para evitar window undefined)
const Map = dynamic<{ lat: number; lon: number }>(
  () => import("./MapView"),
  { ssr: false }
);

export default function AirportLocation() {
  const { selectedAirport } = useAirportStore();

  // Dummy values
  const lat = selectedAirport?.latitude ? Number(selectedAirport.latitude) : -17.05;
  const lon = selectedAirport?.longitude ? Number(selectedAirport.longitude) : -145.41667;
  const geoname = selectedAirport?.geoname_id ?? "6947726";

  const hasValidCoords = !isNaN(lat) && !isNaN(lon);

  return (
    <div className="w-full flex flex-col items-center gap-6 mt-10">
      
      {/* === CARD === */}
      <div
        className="
          w-[90%] max-w-[1750px] h-[272px] rounded-[7px] border border-white/20 
          overflow-hidden backdrop-blur-xl text-white
          bg-gradient-to-r from-[#3F495F] to-[#0E1934]
          grid grid-cols-1 md:grid-cols-2
        "
      >
        {/* Left Content */}
        <div className="p-6 flex flex-col gap-3">
          <h2 className="flex items-center gap-2 text-[22px] font-semibold">
            <Image src="/locationIcon.png" alt="loc" width={26} height={26} />
            <span className="bg-gradient-to-r from-[#3DCBFF] to-[#367BFF] text-transparent bg-clip-text">
              Ubicación
            </span>
          </h2>

          <p><b>Latitud:</b> {lat}</p>
          <p><b>Longitud:</b> {lon}</p>
          <p><b>ID Geoname:</b> {geoname}</p>
        </div>

        {/* Right Image */}
        <div className="relative opacity-50">
          <Image src="/aviatior.png" alt="plane" fill className="object-cover" />
        </div>
      </div>

      {/* === MAP === */}
      <div
        className="
          w-[90%] max-w-[1750px] h-[319px] rounded-[7px] border border-white/20
          overflow-hidden shadow-xl
        "
      >
        {hasValidCoords ? (
          <Map lat={lat} lon={lon} />
        ) : (
          <div className="flex items-center justify-center h-full text-white/70 text-lg">
            ❗ No hay coordenadas válidas
          </div>
        )}
      </div>
    </div>
  );
}
