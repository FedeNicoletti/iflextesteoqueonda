"use client";

import * as React from "react";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight, Pencil, MoveVertical, Plus } from "lucide-react"; // Añadir iconos dropdown
import { cn } from "@/lib/utils";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

export function Header() {
  const days = Array.from({ length: 18 }, (_, i) => i + 1);
  const activeDay = 4;

  return (
    // Usamos variables CSS para colores
    <header className="flex h-[72px] flex-shrink-0 items-center justify-between border-b border-[--border] bg-[--background] px-6"> {/* Fondo --background */}
      <h1 className="text-lg font-semibold text-[--foreground]"> {/* Título usa --foreground */}
        Dashboard
      </h1>

      <div className="flex flex-1 justify-center items-center gap-1">
        <Button variant="ghost" size="icon" className="text-[--muted-foreground] hover:text-[--foreground] h-8 w-8">
          <ChevronLeft className="w-4 h-4" />
        </Button>
        <div className="flex gap-1">
          {days.map((day) => (
            <Button
              key={day}
              variant={day === activeDay ? "default" : "ghost"}
              className={cn(
                "h-8 w-8 p-0 rounded-md text-xs font-medium",
                day === activeDay
                  ? "bg-[--primary] text-[--primary-foreground] hover:bg-[--primary]/90" // Botón activo usa --primary
                  : "text-[--muted-foreground] hover:bg-[--accent] hover:text-[--foreground]" // Botón inactivo usa --muted-foreground y hover --accent
              )}
            >
              {day}
            </Button>
          ))}
        </div>
        <Button variant="ghost" size="icon" className="text-[--muted-foreground] hover:text-[--foreground] h-8 w-8">
          <ChevronRight className="w-4 h-4" />
        </Button>
      </div>

      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            size="icon"
            className="rounded-full bg-[--primary] text-[--primary-foreground] hover:bg-[--primary]/90 h-10 w-10" // Botón lápiz usa --primary
          >
            <Pencil className="w-5 h-5" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent
          // Dropdown usa --popover y --border
          className="w-48 bg-[--popover] border-[--border] text-[--popover-foreground]"
        >
          <DropdownMenuItem className="cursor-pointer focus:bg-[--accent]"> {/* Hover/Focus usa --accent */}
             <MoveVertical className="mr-2 h-4 w-4 text-[--muted-foreground]" /> {/* Icono usa --muted-foreground */}
             <span className="text-sm">Arrange widgets</span>
          </DropdownMenuItem>
          <DropdownMenuItem className="cursor-pointer focus:bg-[--accent]">
             <Plus className="mr-2 h-4 w-4 text-[--muted-foreground]" />
             <span className="text-sm">Edit widgets</span>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </header>
  );
}