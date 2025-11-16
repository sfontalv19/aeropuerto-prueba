"use client";

import Link from "next/link";
import { useParams, usePathname } from "next/navigation";

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
    <div className="flex w-full justify-center mt-10">
      <div className="w-full max-w-[1750px] h-[78px] bg-[#3F495F] bg-opacity-50 border border-white/10 rounded-lg backdrop-blur-md flex overflow-hidden">
        {tabs.map((tab) => {
          const isActive =
            pathname === tab.path ||
            pathname.startsWith(tab.path + "/");

          return (
            <Link
              key={tab.label}
              href={tab.path}
              className={`
                flex-1 flex items-center justify-center text-sm font-semibold transition-all
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
