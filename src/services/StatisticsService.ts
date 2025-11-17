// services/StatisticsService.ts
export class StatisticsService {
  private static BASE_URL = "http://api.aviationstack.com/v1";
  private static cachedAirplanes: any[] | null = null;
  private static cachedTaxes: any[] | null = null;

  static async getAirplanes(limit: number = 100) {
    if (this.cachedAirplanes) return this.cachedAirplanes;

    const accessKey = process.env.NEXT_PUBLIC_AVIATIONSTACK_KEY;
    const url = `${this.BASE_URL}/airplanes?access_key=${accessKey}&limit=${limit}`;

    const response = await fetch(url);
    if (!response.ok) throw new Error("Error fetching airplanes");

    const data = await response.json();
    if (data.error) throw new Error(data.error.message);

    this.cachedAirplanes = data.data;
    return data.data;
  }

  static async getTaxes(limit: number = 100) {
    if (this.cachedTaxes) return this.cachedTaxes;

    const accessKey = process.env.NEXT_PUBLIC_AVIATIONSTACK_KEY;
    const url = `${this.BASE_URL}/taxes?access_key=${accessKey}&limit=${limit}`;

    const response = await fetch(url);
    if (!response.ok) throw new Error("Error fetching taxes");

    const data = await response.json();
    if (data.error) throw new Error(data.error.message);

    this.cachedTaxes = data.data;
    return data.data;
  }

  // Procesar estadísticas de aviones
  static processAirplaneStats(airplanes: any[]) {
    // Contar tipos de aviones
    const typeCounts = airplanes.reduce((acc: any, plane: any) => {
      const type = plane.iata_type || "Desconocido";
      acc[type] = (acc[type] || 0) + 1;
      return acc;
    }, {});

    // Convertir a array y ordenar
    const topTypes = Object.entries(typeCounts)
      .map(([type, count]) => ({ type, count }))
      .sort((a: any, b: any) => b.count - a.count)
      .slice(0, 10);

    // Contar tipos de motores
    const engineCounts = airplanes.reduce((acc: any, plane: any) => {
      const engineType = plane.engines_type || "Desconocido";
      acc[engineType] = (acc[engineType] || 0) + 1;
      return acc;
    }, {});

    const engineTypes = Object.entries(engineCounts).map(([name, value]) => ({
      name,
      value
    }));

    return {
      topTypes,
      engineTypes,
      totalAirplanes: airplanes.length
    };
  }
}