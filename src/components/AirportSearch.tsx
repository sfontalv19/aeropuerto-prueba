"use client";

import { useAirports } from "@/hooks/useAirports";

// Input controlado que actualiza el filtro global de aeropuertos.

export default function AirportsSearch() {
  const { search, setSearch } = useAirports();

  return (
    <div className="flex items-center gap-4 w-full justify-center">
      <input
        type="text"
        placeholder="Buscar aeropuertos..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="
          w-[700px]
          px-6 py-3 text-base
          rounded-lg border border-white/20
          bg-white dark:bg-[#2A2A2A]
          text-slate-800 dark:text-white
          placeholder-[#006FEE]
          focus:outline-none focus:border-[#006FEE]
          transition-all
        "
      />

      <button
        className="
          flex items-center justify-center gap-3
          px-10 py-3 text-white font-semibold rounded-lg text-base
          bg-gradient-to-r from-[#006AFF] to-[#00F9FF]
          hover:opacity-90 transition-all
          shadow-lg
          min-w-[160px]
        "
        type="button"
      >
        <img
          src="/lupa.png"
          alt="Buscar"
          style={{ width: "36.66px", height: "36.66px" }}
        />
        Buscar
      </button>
    </div>
  );
}