"use client";

import Image from "next/image";
import Link from "next/link";
import { useAirports } from "@/hooks/useAirports";

export default function AirportCards() {
    const { airports, loading, error, page, setPage } = useAirports();

    // Loading state
    if (loading) {
        return (
            <p className="text-blue-400 font-medium animate-pulse text-center mt-6">
                Cargando aeropuertos...
            </p>
        );
    }

    // Error state
    if (error) {
        return (
            <p className="text-red-500 font-medium text-center mt-6">
                Error: {error}
            </p>
        );
    }

    // No results
    if (!airports || airports.length === 0) {
        return (
            <p className="text-gray-300 text-center mt-6">
                No se encontraron aeropuertos
            </p>
        );
    }

    return (
        <div className="mt-8 w-full">

            {/* CARDS GRID */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full">

                {airports.map((airport) => (
                    <Link
                        key={airport.id}
                        href={`/airports/${airport.iata_code}`}
                        className="block w-full no-underline"
                    >
                        <div
                            className="
                                w-full flex rounded-xl overflow-hidden 
                                border border-[#2EA9FF]/30
                                bg-gradient-to-r from-[#0B1D3A] to-[#162B4A]
                                hover:border-[#2EA9FF]
                                hover:shadow-[0_0_18px_3px_rgba(46,169,255,0.6)]
                                transition-all duration-300
                                min-h-[160px] cursor-pointer
                            "
                        >

                            {/* LEFT CONTENT */}
                            <div className="flex flex-col justify-center gap-2 p-5 w-1/2 z-10">
                                <h2 className="text-white font-semibold text-lg leading-tight">
                                    {airport.airport_name}
                                </h2>

                                <p className="text-gray-300 text-sm">
                                    {airport.city && airport.country_name
                                        ? `${airport.city}, ${airport.country_name}`
                                        : airport.country_name}
                                </p>

                                <span className="mt-1 text-3xl font-bold text-[#35D1FF] uppercase tracking-wide">
                                    {airport.iata_code || "N/A"}
                                </span>
                            </div>

                            {/* RIGHT SIDE - BACKGROUND + ICON */}
                            <div className="relative w-1/2">

                                {/* ICON */}
                                <div className="absolute top-4 right-4 z-20">
                                    <Image
                                        src="/aviation.png"
                                        alt="Airplane Icon"
                                        width={36}
                                        height={36}
                                    />
                                </div>

                                {/* BACKGROUND IMAGE */}
                                <Image
                                    src="/aviatior.png"
                                    alt="Plane Background"
                                    fill
                                    className="object-cover opacity-30"
                                    sizes="50vw"
                                />
                            </div>
                        </div>
                    </Link>
                ))}
            </div>

            {/* PAGINATION */}
            <div className="flex justify-center gap-4 mt-8">
                <button
                    onClick={() => setPage(Math.max(1, page - 1))}
                    disabled={page === 1}
                    className="
                        px-4 py-2 rounded-md text-white
                        bg-gray-600 disabled:bg-gray-500/30
                        hover:bg-gray-500
                        transition-all
                    "
                >
                    Anterior
                </button>

                <span className="text-white font-semibold py-2">
                    Página {page}
                </span>

                <button
                    onClick={() => setPage(page + 1)}
                    className="
                        px-4 py-2 rounded-md text-white
                        bg-blue-600 hover:bg-blue-500
                        transition-all
                    "
                >
                    Siguiente
                </button>
            </div>
        </div>
    );
}
