"use client";
import { useAirportStore } from "@/store/airportStore";
import Image from "next/image";
import Link from "next/link";

// Lista las tarjetas de aeropuertos aplicando estados de carga/error antes de renderizar.

export default function AirportCards() {
  const { airports, loading, error, setSelectedAirport } = useAirportStore(); 

  if (loading) return <p className="text-blue-400 animate-pulse text-center mt-6">Cargando aeropuertos...</p>;
  if (error) return <p className="text-red-500 text-center mt-6">Error: {error}</p>;
  if (!airports.length) return <p className="text-gray-300 text-center mt-6">No se encontraron aeropuertos</p>;

  return (
    <div className="w-full max-w-7xl mx-auto">
      <div className="mt-12 grid grid-cols-1 lg:grid-cols-2 gap-10">
        {airports.map((airport, index) => (
          <Link 
            key={airport.id} 
            href={`/airports/${airport.iata_code}`}
            onClick={() => setSelectedAirport(airport)} //Guardar antes de navegar
            className="no-underline"
          >
            <div
              className="card-enter relative w-full max-w-[848px] h-[233px] rounded-[10px] p-[1px] bg-gradient-to-r from-[#0F68FF] to-[#05E2FF]"
              style={{ animationDelay: `${index * 80}ms` }}
            >
              <div className="flex h-full w-full rounded-[7px] overflow-hidden bg-[#0C1020]/95 dark:bg-[#0B1120]/95 border border-white/10">
                <div className="flex flex-col justify-between px-8 py-6 w-[420px] max-w-full">
                  <div className="space-y-2">
                    <h2 className="text-white text-[18px] font-semibold leading-tight">
                      {airport.airport_name}
                    </h2>
                    <p className="text-white/80 text-[15px]">
                      {airport.city_iata_code}, {airport.country_name}
                    </p>
                  </div>
                  <div className="flex items-end justify-between">
                    <span className="text-[42px] font-black tracking-wide text-transparent bg-clip-text bg-gradient-to-r from-[#00A6FF] to-[#00F9FF]">
                      {airport.iata_code}
                    </span>
                    <span className="h-px flex-1 ml-4 border-b border-white/20" />
                  </div>
                </div>

                <div className="relative flex-1 min-w-[398px]">
                  <Image
                    src="/aviatior.png"
                    alt="plane"
                    fill
                    className="object-cover opacity-70"
                  />
                  <div className="absolute inset-0 bg-gradient-to-l from-transparent via-[#030714]/70 to-[#030714]/85" />
                </div>
              </div>

              <div className="absolute top-4 right-4 w-11 h-11 rounded-full bg-gradient-to-r from-[#0F68FF] to-[#05E2FF] flex justify-center items-center shadow-lg">
                <Image src="/aviation.png" alt="plane icon" width={22} height={22} />
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
