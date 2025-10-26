"use client";
import * as React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";

type Props = {
  onSubmit: (data: { role: "trainee" | "coach" }) => void;
};

export function Step1Role({ onSubmit }: Props) {
  // Como dijiste que el flujo es para "Trainee", 
  // haremos que el clic en "Coach" esté deshabilitado o te lleve a otro lado.
  // Por ahora, solo "Trainee" avanza.
 const handleSelect = (role: "trainee" | "coach") => {
  onSubmit({ role: role });
};

  return (
    <div className="flex flex-col items-center w-full max-w-md">
      <h2 className="text-3xl text-white mb-10 text-center font-semibold">
        What is your role?
      </h2>
      <div className="space-y-6 w-full">
        <RoleCard
          emoji="💪"
          title="I'm a Trainee"
          description="I want to track my train and improve my skills"
          onClick={() => handleSelect("trainee")}
        />
        <RoleCard
          emoji="🏆"
          title="I'm a Coach"
          description="I guide individuals or teams to help them achieve their goals"
          onClick={() => handleSelect("coach")}
        />
      </div>
    </div>
  );
}

// Componente reutilizable para las tarjetas de selección
const RoleCard = ({ emoji, title, description, onClick }: {
  emoji: string;
  title: string;
  description: string;
  onClick: () => void;
}) => (
  <Card
    onClick={onClick}
    className="bg-gray-800/80 border-gray-700 text-white cursor-pointer hover:bg-gray-700/80 transition-colors"
  >
    <CardContent className="p-6 flex items-center space-x-6">
      <span className="text-5xl">{emoji}</span>
      <div className="flex-1">
        <h3 className="text-xl font-semibold">{title}</h3>
        <p className="text-gray-400">{description}</p>
      </div>
      <ChevronRight className="w-6 h-6 text-gray-500" />
    </CardContent>
  </Card>
);