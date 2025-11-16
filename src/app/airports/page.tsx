"use client";

import AirportPagination from "@/components/AirportPagination";
import AirportCards from "@/components/AirportCard";
import AirportsSearch from "@/components/AirportSearch";

export default function AirportsPage() {
  return (
    <div
      className="
        relative min-h-screen w-full flex flex-col items-center justify-start
        bg-cover bg-center bg-no-repeat text-white
      "
      style={{ backgroundImage: "url('/fondo.png')" }}
    >
      {/* Overlay oscuro */}
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" />

      {/* Contenedor principal */}
      <div className="relative z-10 w-full max-w-7xl px-4 md:px-10 pt-12 pb-20">

        {/* HEADER: Título + Buscador en una fila */}
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

          {/* Este debe ser el único contenedor del buscador */}
          <div className="wflex justify-end w-full md:w-auto">
            <AirportsSearch />
          </div>
        </div>

        {/* Cards con separación real */}
        <div className="mt-14 mb-16">
          <AirportCards />
        </div>


        <AirportPagination/>
      </div>
    </div>
  );
}
