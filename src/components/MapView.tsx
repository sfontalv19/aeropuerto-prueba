"use client";

import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import L from "leaflet";

type MapProps = {
  lat: number;
  lon: number;
};

const icon = L.icon({
  iconUrl: "/aviation.png",
  iconSize: [30, 30],
  iconAnchor: [15, 30],
});

export default function MapComponent({ lat, lon }: MapProps) {
  return (
    <MapContainer
      center={[lat, lon]}
      zoom={11}
      scrollWheelZoom={false}
      className="w-full h-full"
    >
      <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
      <Marker position={[lat, lon]} icon={icon}>
        <Popup>Ubicación aproximada</Popup>
      </Marker>
    </MapContainer>
  );
}
