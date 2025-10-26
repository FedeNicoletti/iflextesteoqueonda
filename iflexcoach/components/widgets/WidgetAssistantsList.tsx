"use client";
import * as React from "react";
// Usaremos Divs en lugar de Card para control total
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { ChevronRight, MessageSquare, Star, User } from "lucide-react";
import { cn } from "@/lib/utils";

const assistants = [
  // ... (los mismos datos)
  { name: "Emily Chen", status: "Online", lastActive: "Wednesday", clients: 30, rating: 4.8, icons: [MessageSquare, Star], avatar: "/avatars/emily.png" },
  { name: "Sophia Lee", status: "Online", lastActive: "Wednesday", clients: 40, rating: 4.7, icons: [Star], avatar: "/avatars/sophia.png" },
  { name: "Alex Morgan", status: "Offline", lastActive: "Wednesday", clients: 120, icons: [MessageSquare, User], rating: 4.6, avatar: "/avatars/alex.png" },
  { name: "Ryan Davis", status: "Online", lastActive: "Wednesday", clients: 150, icons: [MessageSquare, User], rating: 4.5, avatar: "/avatars/ryan.png" },
  { name: "David Kim", status: "Offline", lastActive: "Wednesday", clients: 30, icons: [Star], rating: 4.4, avatar: "/avatars/david.png" },
];

export function WidgetAssistantsList() {
  return (
    // CAMBIO: Usamos div con estilos específicos, no <Card>
    <div className="bg-gray-800/60 border border-gray-700 rounded-lg p-6">
      <h2 className="text-xl font-semibold text-white mb-4">Your assistant coaches</h2>
      <div className="space-y-3">
        {assistants.map((assistant) => (
          // CAMBIO: Estilos del item de lista
          <div key={assistant.name} className="flex items-center gap-4 px-4 py-3 rounded-lg hover:bg-gray-700/50 transition-colors cursor-pointer">
            <Avatar className="h-10 w-10">
              <AvatarImage src={assistant.avatar} alt={assistant.name} />
              <AvatarFallback className="bg-gray-600 text-sm">
                {assistant.name.split(' ').map(n => n[0]).join('')}
              </AvatarFallback>
            </Avatar>

            <div className="flex-1">
              <h3 className="font-medium text-white text-base">{assistant.name}</h3>
              <div className="flex items-center gap-1.5 text-xs text-gray-400">
                <span className={cn("h-1.5 w-1.5 rounded-full", assistant.status === "Online" ? "bg-green-500" : "bg-gray-500")} />
                <span>{assistant.status === "Online" ? "Active" : "Offline"}</span> {/* Texto del diseño */}
                <span>•</span>
                <span>Last time active on {assistant.lastActive}</span>
                <span>•</span>
                <span>{assistant.clients} clients</span>
              </div>
            </div>

            <div className="flex items-center gap-2"> {/* CAMBIO: Gap reducido */}
              {assistant.icons.map((Icon, index) => (
                // CAMBIO: Iconos más pequeños y color correcto
                <Icon key={index} className="w-4 h-4 text-gray-500" />
              ))}
              <span className="font-semibold text-white text-sm">{assistant.rating.toFixed(1)}</span>
              <Star className="w-4 h-4 text-yellow-500 fill-current" /> {/* CAMBIO: Estrella rellena */}
            </div>

            <ChevronRight className="w-5 h-5 text-gray-500 ml-2" /> {/* CAMBIO: Color y margen */}
          </div>
        ))}
      </div>
    </div>
  );
}