"use client";
import { useState } from "react";

interface AirportHeroProps {
  onSearch?: (query: string) => void;
}

export default function AirportHero({ onSearch }: AirportHeroProps) {
  const [query, setQuery] = useState("");

  const handleSearch = () => {
    if (onSearch) onSearch(query);
  };

  return (
    <header
      className="
        w-full px-6 py-6 md:py-10
        bg-gradient-to-br from-[#071428] via-[#0B1D3A] to-[#0E1F3B]
        rounded-b-2xl
      "
    >
      {/* FLEX ROW EXACTO IGUAL AL FIGMA */}
      <div
        className="
          w-full flex flex-col md:flex-row
          items-center justify-between
          gap-6
        "
      >
        {/* Title */}
        <h1 className="text-4xl md:text-5xl font-extrabold leading-none">
          <span className="bg-gradient-to-r from-[#40CFFF] to-[#4493FF] text-transparent bg-clip-text">
            Sky
          </span>
          Connect{" "}
          <span className="bg-gradient-to-r from-[#40CFFF] to-[#4493FF] text-transparent bg-clip-text">
            Explorer
          </span>
        </h1>

        {/* Search Container */}
        <div className="flex items-center gap-3 w-full md:w-auto">
          <input
            type="text"
            placeholder="Buscar aeropuertos..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="
              w-full md:w-[520px] px-6 py-3
              rounded-full bg-white text-gray-700
              border border-white/40 shadow-inner
              focus:ring-2 focus:ring-[#38B6FF] focus:border-[#38B6FF]
              outline-none text-sm
            "
          />
          <button
            onClick={handleSearch}
            className="
              flex items-center gap-2 px-5 py-3
              rounded-lg text-white font-medium text-sm
              bg-gradient-to-r from-[#3C7CFF] to-[#00E2C9]
              border border-white/40 shadow-lg
              hover:brightness-110 transition-all
            "
          >
            🔍 Buscar
          </button>
        </div>
      </div>
    </header>
  );
}
