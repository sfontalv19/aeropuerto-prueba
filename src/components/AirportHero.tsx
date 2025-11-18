"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

interface AirportHeroProps {
  onSearch?: (query: string) => void;
  showBackground?: boolean;
}

export default function AirportHero({ 
  onSearch, 
  showBackground = true 
}: AirportHeroProps) {
  // Hero reutilizable con buscador que puede delegar el submit o navegar por defecto.
  const router = useRouter();
  const [query, setQuery] = useState("");

  const handleSearch = () => {
    if (!query.trim()) return;
    
    if (onSearch) {
      onSearch(query); // ← Si viene prop, usarla
    } else {
      router.push(`/airports?search=${query}`); // ← Comportamiento por defecto
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') handleSearch();
  };

  return (
    <>
      {/* FONDO (opcional - reutilizable en otras páginas) */}
      {showBackground && (
        <>
          <div
            className="absolute inset-0 bg-cover bg-center bg-no-repeat"
            style={{ backgroundImage: "url('/fondo.png')" }}
          ></div>
          <div 
            className="absolute inset-0"
            style={{
              background: 'linear-gradient(180deg, rgba(17, 22, 56, 0.4) 10%, rgba(17, 22, 56, 0.4) 50%, rgba(2, 0, 48, 0.4) 10%)'
            }}
          ></div>
        </>
      )}

      {/* CONTENIDO PRINCIPAL */}
      <div className="relative z-10 flex flex-col items-center justify-center w-full">
        
        {/* TÍTULO */}
        <div className="animate-fade-up" style={{ animationDelay: "120ms" }}>
          <h1 
            className="gradient-text animate-gradient-flow text-[80.91px] leading-none font-black text-center mb-16"
            style={{
              fontFamily: 'Montserrat, sans-serif',
              position: 'relative',
              top: '-155px',
              width: '955px',
            }}
          >
            SkyConnect Explorer
          </h1>
        </div>

        {/* BÚSQUEDA */}
        <div
          className="flex flex-col items-center gap-4 mb-20 animate-fade-up"
          style={{ animationDelay: "260ms" }}
        >
          
          <input
            type="text"
            placeholder="Buscar aeropuertos..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyPress={handleKeyPress}
            className="bg-white rounded-[18.445px] shadow-[0_1.83px_3.66px_rgba(0,0,0,0.05)] text-gray-800 border-0 outline-none font-normal text-[20px] leading-[36.89px] placeholder-[#006FEE] transition-transform duration-300 focus:scale-105 focus:shadow-[0_0_35px_rgba(0,111,238,0.25)]"
            style={{
              fontFamily: 'Inter, sans-serif',
              width: '780px',
              height: '58.54px',
              top: '476px',
              left: '570px',
              padding: '0 20px'
            }}
          />
          
          <button
            onClick={handleSearch}
            className="text-white transition-all flex items-center justify-center gap-[15.6px] border hover:-translate-y-0.5 focus-visible:scale-105 animate-pulse-ring"
            style={{
              fontFamily: 'Inter, sans-serif',
              width: '240.5px',
              height: '52.6px',
              borderRadius: '10.4px',
              border: '1.3px solid #FFFFFF',
              padding: '7.8px 31.2px',
              background: 'linear-gradient(90deg, #006AFF 0%, #00FFE7 100%)',
              fontSize: '19.5px',
              fontWeight: '500',
              lineHeight: '36.4px'
            }}
          >
            <img 
              src="/lupa.png" 
              alt="Buscar"
              style={{ width: '31.2px', height: '31.2px' }}
            />
            <span>Buscar</span>
          </button>
        </div>
      </div>
    </>
  );
}
