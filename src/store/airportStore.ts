import { create } from "zustand";
import { ReactNode } from "react";
import { AirportService } from "@/services/airports.services"; //  Importar tu servicio

// ===== Interfaces =====
export interface Airport {
  geoname_id?: string;
  country_code?: ReactNode;
  gmt?: string;
  id: string | number;
  airport_name?: string;
  iata_code?: string;
  icao_code?: string;
  country_name?: string;
  city_iata_code?: string;
  latitude?: number;
  longitude?: number;
  timezone?: string;
  phone_number?: string;
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

// Store global que controla listado, aeropuerto seleccionado y caché en memoria.
export const useAirportStore = create<AirportStore>((set, get) => ({
  airports: [],
  selectedAirport: null,
  aiportCache: {},
  loading: false,
  error: null,
  page: 1,
  search: "",

  // Setters sincronizados con la UI (reinicia page al cambiar search).
  setSearch: (value) => set({ search: value, page: 1 }),
  setPage: (value) => set({ page: value }),
  setSelectedAirport: (airport) => set({ selectedAirport: airport }),

  //  Obtiene la página actual desde AirportService aplicando search/paginación.
  fetchAirports: async () => {
    try {
      set({ loading: true, error: null });

      const { search, page } = get();
      
      //  Usar tu servicio
      const airports = await AirportService.getAirports(search, page);

      set({ airports: airports || [] });

    } catch (err: any) {
      set({ error: err.message, airports: [] });
    } finally {
      set({ loading: false });
    }
  },

  // Busca en caché y, de no existir, consulta la API filtrando por IATA exacto.
  fetchAirportByIata: async (iata: string) => {
    try {
      set({ loading: true, error: null });

      const { aiportCache } = get();
      
      // Revisar caché primero
      if (aiportCache[iata]) {
        set({ selectedAirport: aiportCache[iata] });
        return;
      }

      //  Buscar usando tu servicio (búsqueda general)
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

  // Consulta directa por ID manteniendo el resultado en caché local.
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
