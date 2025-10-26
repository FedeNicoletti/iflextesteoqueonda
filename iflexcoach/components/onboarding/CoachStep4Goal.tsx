"use client";
import * as React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { ChevronRight } from "lucide-react";

type Props = {
  onSubmit: (data: { coachGoal: string }) => void;
};

// Componente genérico para las tarjetas
const OptionCard = ({ emoji, title, description, onClick }: {
  emoji: string;
  title: string;
  description: string;
  onClick: () => void;
}) => (
  <Card
    onClick={onClick}
    className="bg-gray-800/80 border-gray-700 text-white cursor-pointer hover:bg-gray-700/80 transition-colors h-full"
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

export function CoachStep4Goal({ onSubmit }: Props) {
  const options = [
    { emoji: "🤝", title: "Coach clients", description: "Guide and train individuals or teams", value: "coach_clients" },
    { emoji: "🏋️‍♂️", title: "Training Guidance", description: "Train individuals or teams", value: "training_guidance" },
    { emoji: "🎓", title: "Nutrition Guidance", description: "Create valuable nutrition information for users", value: "nutrition_guidance" },
    { emoji: "🏆", title: "Set a Challenge", description: "Organize group fitness challenges to boost motivation", value: "set_challenge" },
  ];

  return (
    <div className="flex flex-col items-center w-full max-w-3xl">
      <h2 className="text-3xl text-white mb-10 text-center font-semibold">
        What is your goal?
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full">
        {options.map((opt) => (
          <OptionCard
            key={opt.value}
            emoji={opt.emoji}
            title={opt.title}
            description={opt.description}
            onClick={() => onSubmit({ coachGoal: opt.value })}
          />
        ))}
      </div>
      <p className="text-gray-500 mt-8 text-sm">Don't worry, you can change this later</p>
    </div>
  );
}