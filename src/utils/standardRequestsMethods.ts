

export interface PaginationResult<T> {
    data: T[];
    total: number;
    page: number;
    perPage: number;
    totalPages: number;
    hasNextPage: boolean;
    hasPrevPage: boolean;
}

export function paginate<T>(
    list: T[],
    page: number = 1,
    perPage: number = 10
): PaginationResult<T> {
    
    const total = list.length;
    const totalPages = Math.ceil(total / perPage);
    
    // Ajustes de seguridad
    const validPage = Math.max(1, Math.min(page, totalPages || 1));

    const start = (validPage - 1) * perPage;
    const end = start + perPage;
    
    const data = list.slice(start, end);

    return {
        data,
        total,
        page: validPage,
        perPage,
        totalPages,
        hasNextPage: validPage < totalPages,
        hasPrevPage: validPage > 1
    };
}

// Metodo generico que filtra un array de objetos el atributo ingresado en key y valor.
export function searchByKeys<T>(
    list: T[],
    keys: Array<keyof T>,
    search: string
): T[] {
    if (!search.trim()) return list;

    const lowerSearch = search.toLowerCase();

    return list.filter(item =>
        keys.some(key => {
            const value = item[key];

            if (value == null) return false;

            const text = String(value).toLowerCase();

            return (
                text.includes(lowerSearch) ||     // contiene
                text.startsWith(lowerSearch) ||   // inicia con
                text.endsWith(lowerSearch)        // termina con
            );
        })
    );
}
