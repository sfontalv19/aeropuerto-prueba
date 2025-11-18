"use client";

import { useEffect } from "react";
import { useAirportStore } from "@/store/airportStore";
import AirportPagination from "@/components/AirportPagination";
import AirportCards from "@/components/AirportCard";
import AirportsSearch from "@/components/AirportSearch";

export default function AirportsPage() {
  const { fetchAirports, search, page } = useAirportStore(); // 👈 Agregar search y page

  useEffect(() => {
    fetchAirports();
  }, [search, page]); // 👈 Re-ejecutar cuando cambien search o page

  return (
    <div
      className="
        relative min-h-screen w-full flex flex-col items-center justify-start
        bg-cover bg-center bg-no-repeat text-theme-primary dark:text-white
      "
      style={{ backgroundImage: "url('/fondo.png')" }}
    >
      <div
        className="absolute inset-0 backdrop-blur-sm"
        style={{ backgroundColor: "var(--surface-overlay)" }}
      />
<div className="h-6"></div>
      <div className="relative z-10 w-full max-w-7xl px-4 md:px-10 pt-12 pb-20">
        <div
          className="
            w-full flex flex-col gap-6
            md:flex-row md:items-center md:justify-between
          "
        >
            
          <h1
            className="
              text-3xl md:text-4xl font-extrabold tracking-tight select-none whitespace-nowrap
              bg-gradient-to-r from-[#006AFF] to-[#00F9FF] text-transparent bg-clip-text
            "
          >
            SkyConnect Explorer
          </h1>

          <div className="flex justify-end w-full md:w-auto">
            <AirportsSearch />
          </div>
        </div>
        <div className="h-10"></div>
        <div className="mt-14 mb-16">
          <AirportCards />
        </div>
        <div className="h-10"></div>
        <AirportPagination />
      </div>
    </div>
  );
}
