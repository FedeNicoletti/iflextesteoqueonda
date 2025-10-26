"use client";
import * as React from "react";
// Usamos Divs
import {
  ChartConfig,
  ChartContainer,
} from "@/components/ui/chart";
import { Bar, BarChart, XAxis, YAxis } from "recharts"; // Quitamos CartesianGrid
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils"; // Importar cn

const chartData = [
  // ... (mismos datos)
  { client: "C1", days: 33, avatar: "/avatars/c1.png" },
  { client: "C2", days: 26, avatar: "/avatars/c2.png" },
  { client: "C3", days: 23, avatar: "/avatars/c3.png" },
  { client: "C4", days: 23, avatar: "/avatars/c4.png" },
  { client: "C5", days: 23, avatar: "/avatars/c5.png" },
  { client: "C6", days: 12, avatar: "/avatars/c6.png" },
  { client: "C7", days: 7, avatar: "/avatars/c7.png" },
];

const chartConfig = {
  days: {
    label: "Days Logged",
    color: "hsl(195, 90%, 50%)", // CAMBIO: Color Cyan del diseño
  },
} satisfies ChartConfig;

// Componente Tick sigue igual
const CustomTick = ({ x, y, payload }: any) => { /* ... */ };

export function WidgetClientsActivity() {
  return (
    // CAMBIO: Usamos div con estilos específicos
    <div className="bg-gray-800/60 border border-gray-700 rounded-lg p-6">
      {/* CAMBIO: Header con link */}
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-semibold text-white">Clients</h2>
        <button className="flex items-center text-cyan-400 hover:text-cyan-300 text-sm">
          View All <ChevronRight className="w-4 h-4 ml-1" />
        </button>
      </div>
      {/* CAMBIO: Contenedor del gráfico */}
      <div className="h-32 w-full"> {/* Altura fija */}
        <ChartContainer config={chartConfig} className="w-full h-full">
          {/* CAMBIO: Quitamos margin, usamos BarChart props */}
          <BarChart 
            data={chartData} 
            margin={{ top: 5, right: 0, left: 0, bottom: 5 }} // Margen para que quepan avatares
            barCategoryGap={8} // Espacio entre barras (ajustar)
          >
            {/* CAMBIO: Quitamos CartesianGrid */}
            <XAxis
              dataKey="client"
              tickLine={false}
              axisLine={false}
              tickMargin={8} // Margen ajustado
              tick={<CustomTick />} 
              interval={0} // Mostrar todos los ticks
            />
            {/* CAMBIO: El YAxis necesita un width aunque esté oculto */}
            <YAxis hide={true} domain={[0, 40]} width={0} /> 
            <Bar 
              dataKey="days" 
              fill="var(--color-days)" 
              radius={[4, 4, 0, 0]} 
              // CAMBIO: Ancho de barra fijo (ajustar)
              barSize={10} 
            />
          </BarChart>
        </ChartContainer>
      </div>
      <div className="flex items-center gap-1.5 text-xs text-gray-400 mt-4"> {/* CAMBIO: Estilos */}
        <span className="h-1.5 w-1.5 rounded-full bg-[hsl(var(--chart-1))]" />
        <span>Workout days logged</span>
      </div>
    </div>
  );
}