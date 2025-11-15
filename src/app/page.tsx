"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function HomePage() {
  const router = useRouter();
  const [query, setQuery] = useState("");

  const handleSearch = () => {
    if (!query.trim()) return;
    router.push(`/airports?search=${query}`);
  };

  return (
    <main
      className="h-screen bg-cover bg-center flex flex-col items-center justify-center"
      style={{ backgroundImage: "url('/fondo.png')" }}
    >
      <h1 className="text-4xl md:text-6xl font-bold text-white drop-shadow-lg mb-10">
        SkyConnect Explorer
      </h1>

      <div className="flex gap-3 w-full max-w-xl px-6">
        <input
          type="text"
          placeholder="Buscar aeropuertos..."
          className="flex-1 p-3 rounded-full text-black shadow-lg outline-none"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />

        <button
          onClick={handleSearch}
          className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-full shadow-lg font-semibold"
        >
          Buscar
        </button>
      </div>
    </main>
  );
}
