"use client";

import { useAirports } from "@/hooks/useAirports";

export default function AirportPagination() {
  const { 
    page, 

    setPage,
    loading 
  } = useAirports();

  // Generar array de números de página visibles (máximo 3)
  const getVisiblePages = () => {
    const pages = [];
    const maxVisible = 3;
    
    let start = Math.max(1, page - Math.floor(maxVisible / 2));
    let end = Math.min(start + maxVisible - 1);
    
    if (end - start + 1 < maxVisible) {
      start = Math.max(1, end - maxVisible + 1);
    }
    
    for (let i = start; i <= end; i++) {
      pages.push(i);
    }
    
    return pages;
  };

  return (
    <div className="flex items-center justify-center gap-3 mt-8">
      {/* Botón Anterior */}
      <button
        onClick={() => setPage(page - 1)}
        disabled={loading}
        className="px-6 py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-medium 
                   rounded-lg disabled:opacity-50 disabled:cursor-not-allowed
                   disabled:bg-gray-400 transition-colors"
      >
        Anterior
      </button>

      {/* Números de página */}
      <div className="flex items-center gap-2">
        {getVisiblePages().map((pageNum) => (
          <button
            key={pageNum}
            onClick={() => setPage(pageNum)}
            disabled={loading}
            className={`
              min-w-[44px] h-11 px-4 rounded-lg font-medium transition-colors
              ${page === pageNum 
                ? 'bg-blue-700 text-white' 
                : 'bg-blue-600 text-white hover:bg-blue-700 '
              }
              disabled:opacity-50 disabled:cursor-not-allowed
            `}
          >
            {pageNum}
          </button>
        ))}
      </div>

      {/* Botón Siguiente */}
      <button
        onClick={() => setPage(page + 1)}
        disabled={loading}
        className="px-6 py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-medium 
                   rounded-lg disabled:opacity-50 disabled:cursor-not-allowed
                   disabled:bg-gray-400 transition-colors"
      >
        Siguiente
      </button>
    </div>
  );
}