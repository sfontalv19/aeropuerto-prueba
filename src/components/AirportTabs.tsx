"use client";

import Link from "next/link";
import { useParams, usePathname } from "next/navigation";

// Navegación entre secciones del detalle usando la ruta dinámica actual como base.

export default function AirportTabs() {
  const params = useParams<{ iata: string }>();
  const iata = params.iata.toString();
  const pathname = usePathname();

  const tabs = [
    { label: "General", path: `/airports/${iata}` },
    { label: "Ubicación", path: `/airports/${iata}/location` },
    { label: "Zona Horaria", path: `/airports/${iata}/timeZone` },
    { label: "Estadísticas", path: `/airports/${iata}/statistics` },
  ];

  return (
    <div className="flex w-full justify-center ">
      <div
        className="w-full rounded-[7px] bg-[#414b63]/70 border border-white/15 backdrop-blur-lg p-1 flex gap-1 shadow-[0_15px_45px_rgba(0,0,0,0.35)]"
        style={{ maxWidth: "1750px", minHeight: "78px" }}
      >
        {tabs.map((tab) => {
          const isActive =  pathname === tab.path
         

          return (
            <Link
              key={tab.label}
              href={tab.path}
              className={`
                flex-1 flex items-center justify-center text-sm font-semibold rounded-[14px] px-4 py-3 transition-all duration-200
                ${
                  isActive
                    ? "bg-gradient-to-r from-[#1D8BFF] to-[#00E2C9] text-white shadow-[0_10px_25px_rgba(0,0,0,0.25)]"
                    : "text-white/70 hover:text-white"
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
