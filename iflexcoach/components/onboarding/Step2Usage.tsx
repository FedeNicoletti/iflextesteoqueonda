"use client";
import * as React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { ChevronRight } from "lucide-react";

type Props = {
  onSubmit: (data: { usage: string }) => void;
};

export function Step2Usage({ onSubmit }: Props) {
  const options = [
    { emoji: "💪", title: "For training", description: "I want to train, learn and track my progress", value: "training" },
    { emoji: "🍽️", title: "For nutrition", description: "I want to improve my diet, learn and track my progress", value: "nutrition" },
    { emoji: "❤️‍🩹", title: "Training and nutrition", description: "I want to improve my life quality by training and eating better", value: "all" },
  ];

  return (
    <div className="flex flex-col items-center w-full max-w-md">
      <h2 className="text-3xl text-white mb-10 text-center font-semibold">
        How do you want to use iFLEXCoach?
      </h2>
      <div className="space-y-6 w-full">
        {options.map((opt) => (
          <OptionCard
            key={opt.value}
            emoji={opt.emoji}
            title={opt.title}
            description={opt.description}
            onClick={() => onSubmit({ usage: opt.value })}
          />
        ))}
      </div>
      <p className="text-gray-500 mt-8 text-sm">Don't worry, you can change this later</p>
    </div>
  );
}

// Componente genérico para las tarjetas (lo usaremos mucho)
const OptionCard = ({ emoji, title, description, onClick }: {
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