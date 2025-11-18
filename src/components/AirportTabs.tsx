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

  const activeIndex = tabs.findIndex(
    (tab) => pathname === tab.path || pathname.startsWith(`${tab.path}/`)
  );

  const indicatorStyle = {
    width: `calc(${100 / tabs.length}% - 0px)`,
    transform: `translateX(${(activeIndex < 0 ? 0 : activeIndex) * 100}%)`,
  };

  return (
    <div className="flex w-full justify-center mt-8 mb-8 pb-8 animate-fade-up" style={{ animationDelay: "180ms" }}>
      <div
        className="relative w-full rounded-[7px] border border-theme backdrop-blur-lg p-1 flex shadow-[0_15px_45px_rgba(0,0,0,0.35)] overflow-hidden"
        style={{
          maxWidth: "1750px",
          minHeight: "78px",
          backgroundColor: "var(--tab-bg)",
        }}
      >
        <div
          className="absolute top-1 bottom-1 left-1 rounded-[14px] transition-transform duration-300 ease-out"
          style={{
            ...indicatorStyle,
            backgroundImage:
              "linear-gradient(90deg, var(--accent-start), var(--accent-end))",
          }}
        />
        {tabs.map((tab) => {
          const isActive =
            pathname === tab.path || pathname.startsWith(`${tab.path}/`);

          return (
            <Link
              key={tab.label}
              href={tab.path}
              className={`
                relative flex-1 flex items-center justify-center text-sm font-semibold rounded-[14px] px-4 py-3 transition-all duration-200
              `}
              style={
                isActive
                  ? {
                      color: "#fff",
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
