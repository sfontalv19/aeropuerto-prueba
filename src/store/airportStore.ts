import { create } from "zustand";
import { ReactNode } from "react";
import { AirportService } from "@/services/airports.services"; // 👈 Importar tu servicio

// ===== Interfaces =====
export interface Airport {
  geoname_id?: string;
  country_code?: ReactNode;
  gmt?: number;
  id: string | number;
  airport_name?: string;
  iata_code?: string;
  iacao_code?: string;
  country_name?: string;
  city?: string;
  latitude?: number;
  longitude?: number;
  timezone?: number;
  phone?: string;
  local_time?: string;
}

interface AirportStore {
  airports: Airport[];
  selectedAirport: Airport | null;
  aiportCache: Record<string, Airport>;
  loading: boolean;
  error: string | null;
  page: number;
  search: string;

  setSearch: (value: string) => void;
  setPage: (value: number) => void;
  setSelectedAirport: (airport: Airport) => void;

  fetchAirports: () => Promise<void>;
  fetchAirportByIata: (iata: string) => Promise<void>;
  fetchAirportById: (id: string) => Promise<void>; // 👈 Agregado
}

export const useAirportStore = create<AirportStore>((set, get) => ({
  airports: [],
  selectedAirport: null,
  aiportCache: {},
  loading: false,
  error: null,
  page: 1,
  search: "",

  setSearch: (value) => set({ search: value, page: 1 }),
  setPage: (value) => set({ page: value }),
  setSelectedAirport: (airport) => set({ selectedAirport: airport }),

  // 🔥 CONECTADO A TU API
  fetchAirports: async () => {
    try {
      set({ loading: true, error: null });

      const { search, page } = get();
      
      // 👇 Usar tu servicio
      const airports = await AirportService.getAirports(search, page);

      set({ airports: airports || [] });

    } catch (err: any) {
      set({ error: err.message, airports: [] });
    } finally {
      set({ loading: false });
    }
  },

  // 🔥 BUSCAR POR IATA (usa búsqueda general y filtra)
  fetchAirportByIata: async (iata: string) => {
    try {
      set({ loading: true, error: null });

      const { aiportCache } = get();
      
      // Revisar caché primero
      if (aiportCache[iata]) {
        set({ selectedAirport: aiportCache[iata] });
        return;
      }

      // 👇 Buscar usando tu servicio (búsqueda general)
      const airports = await AirportService.getAirports(iata, 1);
      
      // Filtrar el que coincida exactamente con IATA
      const airport = airports?.find(
        (a: Airport) => a.iata_code?.toLowerCase() === iata.toLowerCase()
      );

      if (!airport) throw new Error("Aeropuerto no encontrado");

      set((state) => ({
        selectedAirport: airport,
        aiportCache: { ...state.aiportCache, [iata]: airport }
      }));

    } catch (err: any) {
      set({ error: err.message, selectedAirport: null });
    } finally {
      set({ loading: false });
    }
  },

  // 🔥 BUSCAR POR ID (nuevo método)
  fetchAirportById: async (id: string) => {
    try {
      set({ loading: true, error: null });

      const { aiportCache } = get();
      
      // Revisar caché primero
      if (aiportCache[id]) {
        set({ selectedAirport: aiportCache[id] });
        return;
      }

      // 👇 Usar tu método específico por ID
      const airport = await AirportService.getAirportById(id);

      if (!airport) throw new Error("Aeropuerto no encontrado");

      set((state) => ({
        selectedAirport: airport,
        aiportCache: { ...state.aiportCache, [id]: airport }
      }));

    } catch (err: any) {
      set({ error: err.message, selectedAirport: null });
    } finally {
      set({ loading: false });
    }
  },
}));