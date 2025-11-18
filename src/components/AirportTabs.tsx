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
    <div className="flex w-full justify-center mt-8 mb-8 pb-8">
      <div
        className="w-full rounded-[7px] border border-theme backdrop-blur-lg p-1 flex gap-1 shadow-[0_15px_45px_rgba(0,0,0,0.35)]"
        style={{
          maxWidth: "1750px",
          minHeight: "78px",
          backgroundColor: "var(--tab-bg)",
        }}
      >
        {tabs.map((tab) => {
          const isActive =
            pathname === tab.path || pathname.startsWith(`${tab.path}/`);

          return (
            <Link
              key={tab.label}
              href={tab.path}
              className={`
                flex-1 flex items-center justify-center text-sm font-semibold rounded-[14px] px-4 py-3 transition-all duration-200
              `}
              style={
                isActive
                  ? {
                      backgroundImage:
                        "linear-gradient(90deg, var(--accent-start), var(--accent-end))",
                      color: "#fff",
                      boxShadow: "0 10px 25px rgba(0,0,0,0.25)",
                    }
                  : { color: "var(--tab-text)" }
              }
            >
              {tab.label}
            </Link>
          );
        })}
      </div>
    </div>
  );
}
