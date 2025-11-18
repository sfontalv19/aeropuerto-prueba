"use client";

import { useAirports } from "@/hooks/useAirports";

// Input controlado que actualiza el filtro global de aeropuertos.

export default function AirportsSearch() {
  const { search, setSearch } = useAirports();

  return (
    <div
      className="flex flex-col sm:flex-row items-center gap-4 w-full justify-center animate-fade-up"
      style={{ animationDelay: "150ms" }}
    >
      <input
        type="text"
        placeholder="Buscar aeropuertos..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="
          w-full sm:w-[650px]
          px-6 py-3 text-base
          rounded-lg border border-theme
          bg-white dark:bg-[#2A2A2A]
          text-slate-800 dark:text-white
          placeholder-[#006FEE]
          focus:outline-none focus:border-[#006FEE]
          transition duration-300
          focus:scale-105 focus:shadow-[0_0_35px_rgba(0,111,238,0.25)]
        "
      />

      <button
        className="
          flex items-center justify-center gap-3
          px-8 py-3 text-white font-semibold rounded-lg text-base
          bg-gradient-to-r from-[#006AFF] to-[#00F9FF]
          hover:opacity-90 transition duration-200
          shadow-lg
          min-w-[160px]
          hover:-translate-y-0.5 focus-visible:scale-105
        "
        type="button"
      >
        <img
          src="/lupa.png"
          alt="Buscar"
          style={{ width: "34px", height: "34px" }}
        />
        Buscar
      </button>
    </div>
  );
}
