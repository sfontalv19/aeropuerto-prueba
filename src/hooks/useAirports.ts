import { useEffect } from "react";
import { useAirportStore } from "@/store/airportStore";

export function useAirports () {
    const {
        airports,
        loading,
        error,
        page,
        search,
        fetchAirports,
        setPage,
        setSearch

    } = useAirportStore();

    // cada vez que cambiemos page o search, recargamos la lista

    useEffect(() => {
        fetchAirports();

    }, [page, search])

    return {
        airports,
        loading,
        error,
        page,
        search,
        fetchAirports,
        setPage,
        setSearch
    }
}