import { create } from "zustand";
import { AirportService } from "@/services/airports.services";
import { ReactNode } from "react";


export interface Airport{
    geoname_id: string;
    country_code: ReactNode;
    gmt: number;
    id: string;
    airport_name: string;
    iata_code: string;
    iacao_code: string;
    country_name: string;
    city: string;
    latitude: number;
    longitude: number;
    timezone: number;
}

// app start valor 
interface AirportStore {
    airports: Airport[];
    selectedAirport: Airport | null;
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
  loading: false,
  error: null,
  page: 1,
  search: "",

  setSearch: (value) => set({ search: value, page: 1 }),
  setPage: (value: number) => set({ page: value }),
  setSelectedAirport: (airport) => set({ selectedAirport: airport }),

  fetchAirports: async () => {
    try {
      set({ loading: true, error: null });

      const { page, search } = get();

  

      const airports = await AirportService.getAirports(search, page);

      set({ airports });
    } catch (err: any) {
      set({ error: err.message });
    } finally {
      set({ loading: false });
    }
  },

  fetchAirportByIata: async (iata: string) => {
  try {
    set({ loading: true, error: null });
    const airport = await AirportService.getAirportById(iata);
    set({ selectedAirport: airport });
  } catch (err: any) {
    set({ error: err.message });
  } finally {
    set({ loading: false });
  }
},

}));


