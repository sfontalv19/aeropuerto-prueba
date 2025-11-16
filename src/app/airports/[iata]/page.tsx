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
        relative min-h-screen w-full text-white 
        bg-cover bg-center bg-no-repeat
      "
      style={{ backgroundImage: "url('/fondo.png')" }}
    >
      <div className="absolute inset-0 bg-black/50" />

      {/* CONTENT CONTAINER */}
      <div className="relative z-10 flex flex-col items-center w-full">

        {/* TITLE */}
        <h1 className="text-5xl font-extrabold mt-10 mb-6 bg-gradient-to-r from-[#3DCBFF] to-[#367BFF] text-transparent bg-clip-text">
          {iata?.toString().toUpperCase()}
        </h1>

        {/* NAVIGATION TABS */}
        <div className="w-full max-w-[1750px] px-6 mb-8">
          <AirportTabs />
        </div>

        {/* CARD — CENTERED BOX */}
        <div className="w-full max-w-[1750px] px-6 flex justify-center">
          <AirportInfoCard />
        </div>
      </div>
    </div>
  );
}