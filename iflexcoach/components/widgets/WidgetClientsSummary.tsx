"use client";
import * as React from "react";
// Usaremos Divs
import {
  ChartConfig,
  ChartContainer,
} from "@/components/ui/chart"; 
import { Pie, PieChart, Cell } from "recharts"; 
import { ChevronRight } from "lucide-react"; // Importar ChevronRight

const chartsData = [
  // CAMBIO: Colores del diseño
  { name: "Training", value: 45, total: 60, color: "hsl(195, 90%, 50%)" }, // Cyan
  { name: "Nutrition", value: 15, total: 60, color: "hsl(40, 90%, 60%)" },  // Naranja
  { name: "Expiring soon", value: 8, total: 60, color: "hsl(220, 10%, 60%)" }, // Gris
];

const DonutChart = ({ data, color }: { data: any, color: string }) => {
  const chartConfig = {
    value: { label: data.name, color: color },
  } satisfies ChartConfig;

  const chartData = [
    { name: "completed", value: data.value, fill: color },
    // CAMBIO: Fondo más oscuro
    { name: "remaining", value: data.total - data.value, fill: "hsl(220, 10%, 25%)" }, 
  ];

  return (
    <ChartContainer config={chartConfig} className="w-full h-28"> {/* CAMBIO: Altura ajustada */}
      <PieChart accessibilityLayer>
        <Pie
          data={chartData}
          dataKey="value"
          innerRadius={30} // CAMBIO: Más delgado
          outerRadius={45} // CAMBIO: Más delgado
          startAngle={90}
          endAngle={-270}
          paddingAngle={0}
          strokeWidth={0}
        >
          {chartData.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={entry.fill} />
          ))}
        </Pie>
        <text
          x="50%"
          y="50%"
          textAnchor="middle"
          dominantBaseline="middle"
          // CAMBIO: Estilo del texto central
          className="fill-white text-xl font-semibold" 
        >
          {data.value}/{data.total}
        </text>
      </PieChart>
    </ChartContainer>
  );
};

export function WidgetClientsSummary() {
  return (
    // CAMBIO: Usamos div con estilos específicos
    <div className="bg-gray-800/60 border border-gray-700 rounded-lg p-6">
      {/* CAMBIO: Header con link */}
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-semibold text-white">Clients</h2> {/* CAMBIO: Tamaño */}
        <button className="flex items-center text-cyan-400 hover:text-cyan-300 text-sm"> {/* CAMBIO: Estilo link */}
          View All <ChevronRight className="w-4 h-4 ml-1" />
        </button>
      </div>
      <div className="grid grid-cols-3 gap-4 text-center">
        {chartsData.map((chart) => (
          <div key={chart.name} className="flex flex-col items-center">
            <DonutChart data={chart} color={chart.color} />
            <div className="flex items-center gap-1.5 mt-1"> {/* CAMBIO: Gap y margen */}
              <span className="h-1.5 w-1.5 rounded-full" style={{ backgroundColor: chart.color }} />
              <span className="text-xs text-gray-400">{chart.name}</span> {/* CAMBIO: Tamaño texto */}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}