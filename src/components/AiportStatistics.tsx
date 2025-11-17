"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { BarChart, Bar, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import { StatisticsService } from "@/services/StatisticsService";

export default function AirportStatistics() {
  const [stats, setStats] = useState<any>(null);
  const [taxes, setTaxes] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function loadStats() {
      try {
        setLoading(true);
        
        const [airplanes, taxesData] = await Promise.all([
          StatisticsService.getAirplanes(100),
          StatisticsService.getTaxes(100)
        ]);

        const processedStats = StatisticsService.processAirplaneStats(airplanes);
        
        setStats(processedStats);
        setTaxes(taxesData.slice(0, 8));

      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }

    loadStats();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <p className="text-blue-400 text-xl animate-pulse">Cargando estadísticas...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <p className="text-red-400 text-xl">Error: {error}</p>
      </div>
    );
  }

  if (!stats) return null;

  const COLORS = ['#00D9FF', '#367BFF', '#3DCBFF', '#00B4D8', '#0096C7'];

  return (
    <div className="w-full flex flex-col items-center gap-8 mt-10">
      
      {/* === CARD 1: Resumen General === */}
      <div
        className="
          w-full max-w-[1750px] h-[272px] rounded-[7px] border border-white/20 
          overflow-hidden backdrop-blur-xl text-white
          bg-gradient-to-r from-[#3F495F] to-[#0E1934]
          grid grid-cols-1 md:grid-cols-2
          shadow-[0_4px_25px_rgba(0,0,0,0.45)]
        "
      >
        {/* Left Content */}
        <div className="p-8 flex flex-col">
          <h2 className="flex items-center gap-2 text-[22px] font-semibold mb-6">
            <Image src="/infoCircle.png" alt="stats icon" width={26} height={26} />
            <span className="bg-gradient-to-r from-[#3DCBFF] to-[#367BFF] text-transparent bg-clip-text">
              Resumen General
            </span>
          </h2>

          <div className="space-y-3 text-[17px] leading-relaxed">
            <p>
              <b className="text-white/90">Total de Aviones:</b>{" "}
              <span className="text-white font-bold">{stats.totalAirplanes}</span>
            </p>
            <p>
              <b className="text-white/90">Tipos de Aeronaves:</b>{" "}
              <span className="text-white font-bold">{stats.topTypes.length}</span>
            </p>
            <p>
              <b className="text-white/90">Tipos de Motores:</b>{" "}
              <span className="text-white font-bold">{stats.engineTypes.length}</span>
            </p>
          </div>
        </div>

        {/* Right Image */}
        <div className="relative w-full h-full">
          <Image
            src="/aviatior.png"
            alt="Airplane"
            fill
            className="object-cover brightness-90"
          />
          <div className="absolute inset-0 bg-gradient-to-l from-transparent via-black/30 to-black/60"></div>
        </div>
      </div>

      {/* === CARD 2: Gráfico de Tipos de Aeronaves === */}
      <div
        className="
          w-full max-w-[1750px] min-h-[450px] rounded-[7px] border border-white/20 
          overflow-hidden backdrop-blur-xl text-white
          bg-gradient-to-r from-[#3F495F] to-[#0E1934]
          shadow-[0_4px_25px_rgba(0,0,0,0.45)]
        "
      >
        <div className="p-8">
          <h2 className="flex items-center gap-2 text-[22px] font-semibold mb-6">
            <span className="text-2xl"></span>
            <span className="bg-gradient-to-r from-[#3DCBFF] to-[#367BFF] text-transparent bg-clip-text">
              Top 10 Tipos de Aeronaves
            </span>
          </h2>

          <div className="bg-black/20 rounded-lg p-4">
            <ResponsiveContainer width="100%" height={350}>
              <BarChart data={stats.topTypes}>
                <CartesianGrid strokeDasharray="3 3" stroke="#ffffff20" />
                <XAxis 
                  dataKey="type" 
                  stroke="#fff" 
                  angle={-15} 
                  textAnchor="end" 
                  height={100}
                  style={{ fontSize: '12px' }}
                />
                <YAxis stroke="#fff" />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: '#1a2332', 
                    border: '1px solid #00D9FF', 
                    borderRadius: '8px',
                    color: '#fff'
                  }}
                  labelStyle={{ color: '#00D9FF' }}
                />
                <Bar dataKey="count" fill="#00D9FF" radius={[8, 8, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>



    </div>
  );
}