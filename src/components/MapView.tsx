"use client";

import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import { useEffect } from "react";

// 👇 Fix para el icono del marcador en Leaflet
const customIcon = new L.Icon({
  iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
  iconRetinaUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
  shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41],
});

interface MapViewProps {
  lat: number;
  lon: number;
  airportName?: string;
  iataCode?: string;
}

// Wrapper de Leaflet que renderiza un mapa centrado en el aeropuerto y muestra un popup con datos básicos.
export default function MapView({ lat, lon, airportName, iataCode }: MapViewProps) {
  
  //  Solución para el bug de tiles de Leaflet en SSR
  useEffect(() => {
    // Forzar re-render del mapa
    const timer = setTimeout(() => {
      window.dispatchEvent(new Event('resize'));
    }, 100);
    return () => clearTimeout(timer);
  }, []);

  return (
    <MapContainer
      center={[lat, lon]}
      zoom={13}
      scrollWheelZoom={true}
      style={{ height: "100%", width: "100%", zIndex: 0 }}
    >
      {/*  Usar OpenStreetMap (gratis, sin límites) */}
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      
      {/* 👇 Marcador en la ubicación del aeropuerto */}
      <Marker position={[lat, lon]} icon={customIcon}>
        <Popup>
          <div className="text-center">
            <p className="font-bold text-lg">{iataCode || "Aeropuerto"}</p>
            <p className="text-sm text-gray-600">{airportName || "Sin nombre"}</p>
            <p className="text-xs text-gray-500 mt-1">
              {lat.toFixed(4)}, {lon.toFixed(4)}
            </p>
          </div>
        </Popup>
      </Marker>
    </MapContainer>
  );
}
