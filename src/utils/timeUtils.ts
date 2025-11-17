/**
 * Calcula la hora local basada en el timezone
 * @param timezone - Timezone IANA (ej: "America/New_York")
 * @returns Hora formateada (ej: "17/11/2025, 14:30:45")
 */
export function getLocalTime(timezone?: string): string {
  if (!timezone) return "No disponible";

  try {
    const now = new Date();
    const formatter = new Intl.DateTimeFormat('es-ES', {
      timeZone: timezone,
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      hour12: false
    });

    return formatter.format(now);
  } catch (error) {
    console.error('Error calculando hora local:', error);
    return "No disponible";
  }
}

/**
 * Formatea GMT para mostrar (ej: "-5" => "GMT-5")
 * @param gmt - Offset GMT (ej: "-5", "+3")
 */
export function formatGMT(gmt?: string): string {
  if (!gmt) return "No disponible";
  
  const num = parseFloat(gmt);
  if (isNaN(num)) return gmt;
  
  return `GMT${num >= 0 ? '+' : ''}${num}`;
}