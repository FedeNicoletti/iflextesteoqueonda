import * as React from "react";

// Importar los nuevos widgets que crearemos a continuación
import { WidgetAssistantsList } from "@/components/widgets/WidgetAssistantsList";
import { WidgetClientsSummary } from "@/components/widgets/WidgetClientsSummary";
import { WidgetClientsActivity } from "@/components/widgets/WidgetClientsActivity";
import { WidgetActions } from "@/components/widgets/WidgetActions";

export default function CoachDashboardPage() {
  return (
    <div className="space-y-6">
      {/* Este es el grid principal del dashboard.
        - 3 columnas en total (col-span-3)
        - La columna de la izquierda (Asistentes) ocupa 2 tercios (col-span-2)
        - La columna de la derecha (Acciones) ocupa 1 tercio (col-span-1)
      */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* --- COLUMNA IZQUIERDA (2/3) --- */}
        <div className="lg:col-span-2 space-y-6">
          {/* Widget de Lista de Asistentes */}
          <WidgetAssistantsList />

          {/* Widget de Resumen de Clientes (Gráficos circulares) */}
          <WidgetClientsSummary />
          
          {/* Widget de Actividad de Clientes (Gráfico de barras) */}
          <WidgetClientsActivity />
        </div>

        {/* --- COLUMNA DERECHA (1/3) --- */}
        <div className="lg:col-span-1 space-y-6">
          {/* Widget de Acciones Rápidas (4 botones) */}
          <WidgetActions />
        </div>

      </div>
    </div>
  );
}