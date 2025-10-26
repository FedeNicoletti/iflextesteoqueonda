"use client";
import * as React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { ChevronRight } from "lucide-react";

type Props = {
  onSubmit: (data: { goal: string }) => void;
};

// Usaremos el mismo OptionCard, pero en una grilla
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

export function Step3Goal({ onSubmit }: Props) {
  const options = [
    { emoji: "⚖️", title: "Lose weight", description: "Adopt a balanced diet to support your weight goals", value: "lose_weight" },
    { emoji: "💪", title: "Gain muscle", description: "Fuel your muscles with high-protein meals", value: "gain_muscle" },
    { emoji: "🥗", title: "Stay fit", description: "Maintain your fitness with a balanced and nutritious diet", value: "stay_fit" },
    { emoji: "🚀", title: "Improve performance", description: "Optimize your performance with energy-boosting foods", value: "performance" },
  ];

  return (
    <div className="flex flex-col items-center w-full">
      <h2 className="text-3xl text-white mb-10 text-center font-semibold">
        What is your main goal?
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full">
        {options.map((opt) => (
          <OptionCard
            key={opt.value}
            emoji={opt.emoji}
            title={opt.title}
            description={opt.description}
            onClick={() => onSubmit({ goal: opt.value })}
          />
        ))}
      </div>
      <p className="text-gray-500 mt-8 text-sm">Don't worry, you can change this later</p>
    </div>
  );
}