"use client";
import { useAirportStore } from "@/store/airportStore";
import Image from "next/image";
import Link from "next/link";

export default function AirportCards() {
  const { airports, loading, error, setSelectedAirport } = useAirportStore(); 

  if (loading) return <p className="text-blue-400 animate-pulse text-center mt-6">Cargando aeropuertos...</p>;
  if (error) return <p className="text-red-500 text-center mt-6">Error: {error}</p>;
  if (!airports.length) return <p className="text-gray-300 text-center mt-6">No se encontraron aeropuertos</p>;

  return (
    <div className="w-full max-w-7xl mx-auto">
      <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-8">
        {airports.map((airport) => (
          <Link 
            key={airport.id} 
            href={`/airports/${airport.iata_code}`}
            onClick={() => setSelectedAirport(airport)} //Guardar antes de navegar
            className="no-underline"
          >
            <div className="group relative w-full h-[235px] rounded-lg overflow-hidden cursor-pointer border border-white/20 bg-[#0B1120]/80 backdrop-blur-md hover:border-[#00F9FF]/40 hover:scale-[1.01] transition-all duration-300">
              
              <div className="grid grid-cols-[60%_40%] h-full">
                <div className="p-6 flex flex-col justify-between">
                  <div>
                    <h2 className="text-white font-bold text-[17px] leading-tight">{airport.airport_name}</h2>
                    <p className="text-gray-300 text-sm mt-1">
                      {airport.city_iata_code}, {airport.country_name}
                    </p>
                  </div>
                  <div className="mb-4">
                    <span className="text-4xl font-black text-[#00D9FF] uppercase tracking-wide">{airport.iata_code}</span>
                  </div>
                </div>

                <div className="relative w-full h-full">
                  <Image
                    src="/aviatior.png"
                    alt="plane"
                    fill
                    className="object-cover opacity-40 group-hover:opacity-50 transition-all duration-300"
                  />
                </div>
              </div>

              <div className="absolute top-4 right-4 w-10 h-10 rounded-full border border-white/40 bg-white/10 backdrop-blur-lg flex justify-center items-center">
                <Image src="/aviation.png" alt="plane icon" width={20} height={20} />
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}