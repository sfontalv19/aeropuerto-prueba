import { paginate, searchByKeys } from "@/utils/standardRequestsMethods";

// Servicio que centraliza las llamadas al API de AviationStack y maneja una caché simple en memoria.
export class AirportService {
    private static BASE_URL = "http://api.aviationstack.com/v1"
    private static cachedAirports: any[] | null = null; //  Caché en memoria

    // Obtiene aeropuertos con filtros locales (search/paginación) aprovechando la caché para evitar múltiples requests.
    static async getAirports(search: string, page: number = 1){
        const accessKey = process.env.NEXT_PUBLIC_AVIATIONSTACK_KEY;

        //  Si ya hay datos en caché, usarlos
        if (this.cachedAirports) {
            let airports = this.cachedAirports;

            if(search){
                airports = searchByKeys(airports ?? [], ["airport_name", "iata_code"], search);
            }

            airports = paginate(airports ?? [], page, 10)?.data;
            return airports;
        }

        //  Si NO hay caché, hacer el request
        const url = `${this.BASE_URL}/airports?access_key=${accessKey}&limit=1000`;
        const response = await fetch(url);

        if (!response.ok) {
            throw new Error("Error fetching airports");
        }

        const data = await response.json();
        if (data.error){
            throw new Error(data.error.message);
        }

        //  Guardar en caché
        this.cachedAirports = data.data;

        let airports = this.cachedAirports;

        if(search){
            airports = searchByKeys(airports ?? [], ["airport_name", "iata_code"], search);
        }

        airports = paginate(airports ?? [], page, 10)?.data;
        return airports;
    }

    // Recupera un aeropuerto específico por ID buscando primero en caché y luego en el endpoint dedicado.
    static async getAirportById(id: string){
        const accessKey = process.env.NEXT_PUBLIC_AVIATIONSTACK_KEY;

        //  Buscar primero en caché
        if (this.cachedAirports) {
            const airport = this.cachedAirports.find(a => a.id === id);
            if (airport) return airport;
        }

        const url = `${this.BASE_URL}/airports?access_key=${accessKey}&id=${id}`;
        const response = await fetch(url);

        if (!response.ok){
            throw new Error("error fetching airport details");
        } 
        
        const data = await response.json();
        if (data.error){
            throw new Error(data.error.message);
        }
        
        return data.data?.[0];
    }

    //  Método opcional para limpiar caché si es necesario
    static clearCache() {
        this.cachedAirports = null;
    }
}
