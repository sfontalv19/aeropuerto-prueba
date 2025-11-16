import Image from "next/image";
import { useAirportStore } from "@/store/airportStore";

export default function AirportZonaTime() {
  const { selectedAirport } = useAirportStore();

  const timeZone = selectedAirport?.timezone ?? "Pacific/Tahiti";
  const gmt = selectedAirport?.gmt ?? "-10";
  const localTime = selectedAirport?.local_time ?? "19/2/2025, 8:47:51";

  return (
    <div className="w-full flex flex-col items-center gap-8 mt-8">

      {/* CARD 1 - ZONA HORARIA (272px) */}
      <div
        className="flex justify-between items-center relative text-white"
        style={{
          width: "1748px",
          height: "272px",
          borderRadius: "7px",
          border: "1px solid #3F495F",
          background: "linear-gradient(90deg, #3F495F 0%, #0E1934 100%)",
          overflow: "hidden",
        }}
      >
        {/* Left side */}
        <div className="pl-10 pt-9 flex flex-col gap-3 w-1/2">
          <h2 className="flex items-center gap-3 text-2xl font-semibold text-[#3DCBFF]">
            <Image src="/global.png" alt="global icon" width={28} height={28} />
            Zona Horaria
          </h2>

          <p><b>Zona Horaria:</b> {timeZone}</p>
          <p><b>GMT:</b> {gmt}</p>
        </div>

        {/* Right image */}
        <div className="w-1/2 h-full relative">
          <Image
            src="/aviatior.png"
            alt="airport plane"
            fill
            className="object-cover opacity-60"
          />
        </div>
      </div>

      {/* CARD 2 - HORA LOCAL (227px) */}
      <div
        className="flex justify-between items-center relative text-white"
        style={{
          width: "1748px",
          height: "227px",
          borderRadius: "7px",
          border: "1px solid #3F495F",
          background: "linear-gradient(90deg, #3F495F 0%, #0E1934 100%)",
          overflow: "hidden",
        }}
      >
        {/* Left side */}
        <div className="pl-10 pt-8 flex flex-col gap-3 w-1/2">
          <h2 className="flex items-center gap-3 text-2xl font-semibold text-[#3DCBFF]">
            <Image src="/ClockCircle.png" alt="clock icon" width={28} height={28} />
            Hora Local
          </h2>

          <p className="text-lg">{localTime}</p>
        </div>

        {/* Right image */}
        <div className="w-1/2 h-full relative">
          <Image
            src="/aviatior.png"
            alt="airport plane"
            fill
            className="object-cover opacity-60"
          />
        </div>
      </div>
    </div>
  );
}
