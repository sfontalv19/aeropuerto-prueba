"use client";

import Link from "next/link";
import { useParams, usePathname } from "next/navigation";

export default function AirportTabs() {
  const { iata } = useParams();                    // obtiene el código desde la URL
  const pathname = usePathname();                 // saber qué tab está activa

  const tabs = [
    { label: "General", path: `/airports/${iata}` },
    { label: "Ubicación", path: `/airports/${iata}/location` },
    { label: "Zona Horaria", path: `/airports/${iata}/timeZone` },
    { label: "Estadísticas", path: `/airports/${iata}/statistics` },
  ];

  return (
    <div className="flex justify-center mt-6">
      <div className="flex w-full max-w-4xl bg-[#FFFFFF14] rounded-lg overflow-hidden backdrop-blur-sm border border-white/10">
        {tabs.map((tab) => {
          const isActive = pathname === tab.path;

          return (
            <Link
              key={tab.label}
              href={tab.path}
              className={`
                flex-1 py-3 text-sm font-medium text-center transition-all
                ${isActive
                  ? "bg-gradient-to-r from-[#3C7CFF] to-[#00E2C9] text-white shadow-md"
                  : "text-gray-300 hover:bg-white/10"
                }
              `}
            >
              {tab.label}
            </Link>
          );
        })}
      </div>
    </div>
  );
}
