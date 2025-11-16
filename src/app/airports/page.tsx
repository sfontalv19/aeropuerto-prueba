
import AirportCards from "@/components/AirportCard";
import AirportHero from "@/components/AirportHero";

export default function AirportsPage() {
  return (
    <div
      className="  relative min-h-screen w-full flex flex-col items-center bg-cover bg-center bg-no-repeat text-white"   
    style={{ backgroundImage: "url('/fondo.png')" }} 
    >
      {/* Overlay oscuro */}
      <div className="absolute inset-0 bg-black/50 backdrop-blur-sm"></div>

      {/* Contenido visible */}
      <div className="relative z-10 w-full max-w-7xl pb-20">

        {/* HERO (título + buscador dentro del componente) */}
        <AirportHero />

        {/* Cards */}
        <div className="px-4 md:px-10 mt-10">
          <AirportCards />
        </div>
      </div>
    </div>
  );
}
