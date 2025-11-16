import Image from "next/image";
import { useAirportStore } from "@/store/airportStore";

export default function AirportInfoCard() {
  const { selectedAirport } = useAirportStore();

  if (!selectedAirport) return null;

  return (
    <div
      className="
        w-full
        max-w-[1750px]
        h-[435px]
        rounded-lg
        border border-white/30
        bg-white/5
        backdrop-blur-md
        overflow-hidden
        grid grid-cols-1 md:grid-cols-2
        shadow-[0_4px_25px_rgba(0,0,0,0.45)]
      "
    >
      {/* LEFT COLUMN */}
      <div className="p-8 text-white">
        <h2 className="flex items-center gap-2 text-2xl font-bold mb-4">
          <img
            src= "/infoCircle.png"
            alt="Info icon"
            className="w-4 h-4"
            />
          <span className="bg-gradient-to-r from-[#3DCBFF] to-[#367BFF] text-transparent bg-clip-text">
            Información General
          </span>
        </h2>

        <div className="space-y-2 text-lg leading-relaxed">
          <p><b>Código IATA:</b> {selectedAirport?.iata_code ?? "No disponible"}</p>
          <p><b>Código ICAO:</b> {selectedAirport?.iacao_code ?? "No disponible"}</p>
          <p><b>País:</b> {selectedAirport?.country_name ?? "No disponible"}</p>
          <p><b>Ciudad IATA:</b> {selectedAirport?.city ?? "No disponible"}</p>
          <p><b>Teléfono:</b> {selectedAirport.phone || "No disponible"}</p>
        </div>
      </div>

      {/* RIGHT IMAGE */}
      <div className="relative w-full h-full">
        <Image
          src="/aviatior.png"
          alt="Airplane"
          fill
          className="object-cover brightness-90"
        />

        {/* Gradient overlay (Figma-style stronger on left side) */}
        <div className="absolute inset-0 bg-gradient-to-l from-transparent via-black/30 to-black/60"></div>
      </div>
    </div>
  );
}
