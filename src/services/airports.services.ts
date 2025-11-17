import { paginate, searchByKeys } from "@/utils/standardRequestsMethods";

export class AirportService {
    private static BASE_URL = "http://api.aviationstack.com/v1"

    static async getAirports(search: string, page: number =1){
        const accessKey = process.env.NEXT_PUBLIC_AVIATIONSTACK_KEY;

        const url = `${this.BASE_URL}/airports?access_key=${accessKey}&limit=50`;

        const response = await fetch(url)

        if (!response.ok) {
            throw new Error ( "Error fetching airports")
        }

        const data = await response.json();
        if (data.error){
            throw new Error (data.error.message)

        }

        let airports = data.data

        if(search){
            airports = searchByKeys(data.data,["airport_name","iata_code"],search)
        }

        airports = paginate(airports,page,10)?.data
        return airports
    }


    static async getAirportById(id: string){
        const accessKey = process.env.NEXT_PUBLIC_AVIATIONSTACK_KEY;

        const url = `${this.BASE_URL}/airports?access_key=${accessKey}&id=${id}`;

        const response = await fetch(url)

        if (!response.ok){
            throw new Error ("error fetching airport datails")

         } 
         const data = await response.json();
         if (data.error){
            throw new Error (data.error.message)
         }
         return data.data?.[0]

    }


}