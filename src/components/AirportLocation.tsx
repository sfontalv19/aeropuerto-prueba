"use client";

import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import Image from "next/image";
import { useAirportStore } from "@/store/airportStore";
import L from "leaflet";

// Ícono personalizado (opcional para pegar al diseño)
const markerIcon = L.icon({
  iconUrl: "/markerAirport.png",
  iconSize: [30, 30],
  iconAnchor: [15, 30],
});

export default function AirportLocation() {
  const { selectedAirport } = useAirportStore();

  if (!selectedAirport) return null;

  const lat = Number(selectedAirport.latitude);
  const lon = Number(selectedAirport.longitude);

  return (
    <div className="w-full flex flex-col gap-4">

      {/* CARD con info */}
      <div className="w-full bg-white/10 border border-white/20 rounded-xl overflow-hidden backdrop-blur-lg 
        grid grid-cols-1 md:grid-cols-2 animate-fadeIn"
      >
        {/* Izquierda */}
        <div className="p-6 flex flex-col gap-3">
          <h2 className="flex items-center gap-2 text-2xl font-bold">
            <Image src="/locationIcon.png" alt="icon" width={26} height={26} />
            <span className="bg-gradient-to-r from-[#3DCBFF] to-[#367BFF] text-transparent bg-clip-text">
              Ubicación
            </span>
          </h2>

          <p><b>Latitud:</b> {lat}</p>
          <p><b>Longitud:</b> {lon}</p>
          <p><b>ID Geoname:</b> {selectedAirport.geoname_id || "No disponible"}</p>
        </div>

        {/* Imagen derecha */}
        <div className="relative opacity-30 md:opacity-50">
          <Image src="/aviatior.png" alt="airport" fill className="object-cover" />
        </div>
      </div>

      {/* MAPA */}
      <div className="w-full h-[350px] md:h-[450px] rounded-xl overflow-hidden border border-white/20 shadow-lg">
        <MapContainer 
          center={[lat, lon]} 
          zoom={11} 
          scrollWheelZoom={false}
          className="w-full h-full z-10"
        >
          <TileLayer
            attribution='&copy; <a href="https://openstreetmap.org">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />

          <Marker position={[lat, lon]} icon={markerIcon}>
            <Popup>
              <b>{selectedAirport.airport_name}</b> <br />
              {selectedAirport.city}, {selectedAirport.country_name}
            </Popup>
          </Marker>
        </MapContainer>
      </div>
    </div>
  );
}
