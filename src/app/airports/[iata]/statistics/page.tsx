// app/airports/[iata]/statistics/page.tsx
"use client";

import { useEffect } from "react";
import { useParams } from "next/navigation";
import { useAirportStore } from "@/store/airportStore";
import AirportTabs from "@/components/AirportTabs";
import AirportStatistics from "@/components/AiportStatistics";

export default function StatisticsPage() {
  const { iata } = useParams();
  const { selectedAirport, fetchAirportByIata, loading } = useAirportStore();

  useEffect(() => {
    if (iata && (!selectedAirport || selectedAirport.iata_code !== iata)) {
      fetchAirportByIata(iata as string);
    }
  }, [iata]);

  return (
    <div
      className="relative min-h-screen w-full text-theme-primary dark:text-white bg-cover bg-center bg-no-repeat flex justify-center"
      style={{ backgroundImage: "url('/fondo.png')" }}
    >
      <div className="absolute inset-0 theme-overlay"></div>

      <div className="relative z-10 w-full max-w-[1200px] px-4 sm:px-6 flex flex-col items-center mt-20">
        <div className="h-3"></div>
        <h1 className="text-4xl md:text-5xl font-bold text-center mb-8 bg-gradient-to-r from-[#3DCBFF] to-[#367BFF] text-transparent bg-clip-text tracking-wide">
          {selectedAirport?.iata_code || selectedAirport?.iata_code || "Estadísticas"}
        </h1>
        <div className="h-6"></div>
        <div className="w-full mb-10">
          <AirportTabs />
        </div>
        <div className="h-8"></div>
        <div className="w-full">
          <AirportStatistics />
        </div>
      </div>
    </div>
  );
}
