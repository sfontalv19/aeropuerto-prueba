"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { useAirportStore } from "@/store/airportStore";
import { getLocalTime, formatGMT } from "@/utils/timeUtils";

// Muestra zona horaria y hora local actualizada del aeropuerto seleccionado.

export default function AirportZonaTime() {
  const { selectedAirport } = useAirportStore();
  const [currentTime, setCurrentTime] = useState<string>("");

  const timeZone = selectedAirport?.timezone ?? "No disponible";
  const gmt = formatGMT(selectedAirport?.gmt);

  // 👇 Actualizar hora cada segundo
  useEffect(() => {
    if (!selectedAirport?.timezone) return;

    // Calcular hora inicial
    setCurrentTime(getLocalTime(selectedAirport.timezone));

    // Actualizar cada segundo
    const interval = setInterval(() => {
      setCurrentTime(getLocalTime(selectedAirport.timezone));
    }, 1000);

    return () => clearInterval(interval);
  }, [selectedAirport?.timezone]);

  return (
    <div className="w-full flex flex-col items-center gap-8 mt-8 px-4 sm:px-6 lg:px-10">

      {/* CARD 1 - ZONA HORARIA */}
      <div className="w-full max-w-[1200px] text-theme-primary dark:text-white rounded-xl border border-theme bg-theme-card shadow-[0_12px_35px_rgba(0,0,0,0.2)] dark:bg-gradient-to-r dark:from-[#3F495F]/80 dark:to-[#0E1934]/90 overflow-hidden flex flex-col md:flex-row">
        {/* Left side */}
        <div className="w-full md:w-1/2 p-6 md:p-10 flex flex-col gap-4">
          <h2 className="flex items-center gap-3 text-2xl font-semibold text-[#3DCBFF]">
            <Image src="/global.png" alt="global icon" width={28} height={28} />
            Zona Horaria
          </h2>

          <div className="space-y-2 text-[17px] leading-relaxed">
            <p><b>Zona Horaria:</b> {timeZone}</p>
            <p><b>GMT:</b> {gmt}</p>
          </div>
        </div>

        {/* Right image */}
        <div className="relative w-full md:w-1/2 h-48 md:h-auto min-h-[180px]">
          <Image
            src="/aviatior.png"
            alt="airport plane"
            fill
            className="object-cover opacity-70 dark:opacity-60"
          />
          <div className="absolute inset-0 bg-gradient-to-l from-transparent via-white/40 to-white/70 dark:via-black/30 dark:to-black/60" />
        </div>
      </div>

      {/* CARD 2 - HORA LOCAL */}
      <div className="w-full max-w-[1200px] text-theme-primary dark:text-white rounded-xl border border-theme bg-theme-card shadow-[0_12px_35px_rgba(0,0,0,0.2)] dark:bg-gradient-to-r dark:from-[#3F495F]/80 dark:to-[#0B1530]/90 overflow-hidden flex flex-col md:flex-row">
        {/* Left side */}
        <div className="w-full md:w-1/2 p-6 md:p-9 flex flex-col gap-4">
          <h2 className="flex items-center gap-3 text-2xl font-semibold text-[#3DCBFF]">
            <Image src="/ClockCircle.png" alt="clock icon" width={28} height={28} />
            Hora Local
          </h2>

          <p className="text-lg md:text-xl font-mono text-theme-primary dark:text-white/90">
            {currentTime || "Calculando..."}
          </p>
        </div>

        {/* Right image */}
        <div className="relative w-full md:w-1/2 h-40 md:h-auto min-h-[160px]">
          <Image
            src="/aviatior.png"
            alt="airport plane"
            fill
            className="object-cover opacity-70 dark:opacity-60"
          />
          <div className="absolute inset-0 bg-gradient-to-l from-transparent via-white/40 to-white/70 dark:via-black/30 dark:to-black/60" />
        </div>
      </div>
    </div>
  );
}
