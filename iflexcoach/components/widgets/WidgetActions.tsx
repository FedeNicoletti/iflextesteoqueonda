"use client";
import * as React from "react";
// Usaremos Divs y Botones
import { Button } from "@/components/ui/button";
import { ChevronRight } from "lucide-react";

const ActionButton = ({ emoji, text }: { emoji: string; text: string }) => (
  // CAMBIO: Estilos exactos del botón del diseño
  <Button 
    variant="ghost" 
    className="w-full justify-between h-16 p-4 bg-gray-800/60 border border-gray-700 hover:bg-gray-700/60 rounded-lg"
  >
    <div className="flex items-center gap-3"> {/* CAMBIO: Gap */}
      <span className="text-3xl">{emoji}</span> {/* CAMBIO: Tamaño emoji */}
      <span className="text-white font-medium text-base">{text}</span> {/* CAMBIO: Estilo texto */}
    </div>
    <ChevronRight className="w-5 h-5 text-gray-500" /> {/* CAMBIO: Color */}
  </Button>
);

export function WidgetActions() {
  return (
    // CAMBIO: El contenedor no necesita fondo ni borde
    <div className="space-y-4"> {/* CAMBIO: Espaciado */}
      <ActionButton emoji="💪" text="New program" />
      <ActionButton emoji="🎯" text="New challenge" />
      <ActionButton emoji="🥗" text="New plan" />
      <ActionButton emoji="📚" text="New course" />
    </div>
  );
}