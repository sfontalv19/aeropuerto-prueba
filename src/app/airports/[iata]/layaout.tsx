"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const tabs = [
  { label: "General", path: "" },
  { label: "Ubicación", path: "/locations" },
  { label: "Zona Horaria", path: "/time-zone" },
  { label: "Estadísticas", path: "/stats" },
];

export default function AirportDetailLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const basePath = pathname.split("/").slice(0, 3).join("/");

  return (
    <div className="min-h-screen bg-cover bg-center text-white"
         style={{ backgroundImage: "url('/fondo.png')" }}>
      
      {/* TITULO */}
      <h1 className="text-center text-5xl font-bold mt-8 bg-gradient-to-r from-[#00A6FF] to-[#00F9FF] text-transparent bg-clip-text">
        {decodeURIComponent(pathname.split("/")[2])}
      </h1>

      {/* TABS */}
      <div className="mt-6 mx-auto w-[80%] flex rounded-lg overflow-hidden bg-white/10 backdrop-blur-sm border border-white/10">
        {tabs.map((tab) => {
          const fullPath = `${basePath}${tab.path}`;
          const isActive = pathname === fullPath;

          return (
            <Link
              key={tab.label}
              href={fullPath}
              className={`w-full text-center py-3 font-semibold transition-all ${
                isActive
                  ? "bg-gradient-to-r from-[#00A6FF] to-[#00F9FF] text-black"
                  : "text-white hover:bg-white/10"
              }`}
            >
              {tab.label}
            </Link>
          );
        })}
      </div>

      {/* CONTENT */}
      <div className="mt-8 w-[85%] mx-auto">
        {children}
      </div>
    </div>
  );
}
