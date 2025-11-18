"use client";

import { useAirportStore } from "@/store/airportStore";
import AirportInfoCard from "@/components/AirportInfoCard";
import AirportTabs from "@/components/AirportTabs";
import { useEffect } from "react";
import { useParams } from "next/navigation";

export default function AirportDetailPage() {
  const { iata } = useParams();
  const { fetchAirportByIata } = useAirportStore();

  useEffect(() => {
    if (iata) fetchAirportByIata(iata.toString());
  }, [iata]);

  return (
    <div
      className="
        relative min-h-screen w-full text-theme-primary dark:text-white
        bg-cover bg-center bg-no-repeat
      "
      style={{ backgroundImage: "url('/fondo.png')" }}
    >
      <div className="absolute inset-0 theme-overlay" />

      {/* CONTENT CONTAINER */}
      <div className="relative z-10 flex flex-col items-center w-full px-4 sm:px-6">
        <div className="h-5"></div>
        {/* TITLE */}
        <h1 className="text-4xl md:text-5xl font-extrabold mt-12 mb-8 bg-gradient-to-r from-[#3DCBFF] to-[#367BFF] text-transparent bg-clip-text tracking-wide">
          {iata?.toString().toUpperCase()}
        </h1>
        <div className="h-6"></div>
        {/* NAVIGATION TABS */}
        <div className="w-full max-w-[1200px] pb-16">
          <AirportTabs />
        </div>
        <div className="h-8"></div>
        {/* CARD — CENTERED BOX */}
        <div className="w-full max-w-[1200px] flex justify-center mt-15">
          <AirportInfoCard />
        </div>
      </div>
    </div>
  );
}
