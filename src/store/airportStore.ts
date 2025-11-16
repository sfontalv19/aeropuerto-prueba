import { create } from "zustand";
import { ReactNode } from "react";
import { dummyAirports } from "@/services/dataDummy";


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
  local_time?:string
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
}

export const useAirportStore = create<AirportStore>((set, get) => ({
  airports: [],
  selectedAirport: null,
  aiportCache: {},
  loading: false,
  error: null,
  page: 1,
  search: "",
  totalPages: 0,
  totalResult: 0,
  

  setSearch: (value) => set({ search: value, page: 1 }),
  setPage: (value: number) => set({ page: value }),
  setSelectedAirport: (airport) => set({ selectedAirport: airport }),

  // =========================
  // Simulación de fetch
  // =========================
  fetchAirports: async () => {
    try {
      set({ loading: true, error: null });
      const { search, page } = get();

      // Filtrar localmente simulando API
      const filtered = dummyAirports.filter((a) =>
        a.airport_name.toLowerCase().includes(search.toLowerCase()) ||
        a.city.toLowerCase().includes(search.toLowerCase()) ||
        a.country_name.toLowerCase().includes(search.toLowerCase()) ||
        a.iata_code.toLowerCase().includes(search.toLowerCase())
      );

      // Paginación local simulada
      const pageSize = 10;
      const start = (page - 1) * pageSize;
      const paginated = filtered.slice(start, start + pageSize);

      set({ airports: paginated });
    } catch (err: any) {
      set({ error: err.message });
    } finally {
      set({ loading: false });
    }
  },

  fetchAirportByIata: async (iata: string) => {
    try {
      set({ loading: true, error: null });

      const { aiportCache } = get();

      // Si está cacheado evita calcular
      if (aiportCache[iata]) {
        set({ selectedAirport: aiportCache[iata] });
        return;
      }

      const airport = dummyAirports.find(a => a.iata_code.toLowerCase() === iata.toLowerCase());
      if (!airport) throw new Error("Aeropuerto no encontrado");

      set((state) => ({
        selectedAirport: airport,
        aiportCache: { ...state.aiportCache, [iata]: airport }
      }));

    } catch (err: any) {
      set({ error: err.message });
    } finally {
      set({ loading: false });
    }
  },
}));
