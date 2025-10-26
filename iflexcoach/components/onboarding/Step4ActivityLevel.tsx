"use client";
import * as React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { ChevronRight } from "lucide-react";

type Props = {
  onSubmit: (data: { activityLevel: string }) => void;
};

// Mismo OptionCard
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

export function Step4ActivityLevel({ onSubmit }: Props) {
  const options = [
    { emoji: "🛋️", title: "Sedentary", description: "Little to no physical activity", value: "sedentary" },
    { emoji: "🚶", title: "Lightly active", description: "Occasional light exercise or movement (2-3 days per week)", value: "light" },
    { emoji: "🏃", title: "Moderately active", description: "Regular or moderate physical activity (4-5 days per week)", value: "moderate" },
    { emoji: "🏋️", title: "Very active", description: "Frequent intense workouts or physical activity (6-7 days per week)", value: "very_active" },
    { emoji: "🏅", title: "Professional athlete", description: "Highly trained (6-7 days per week)", value: "athlete" },
  ];

  return (
    <div className="flex flex-col items-center w-full">
      <h2 className="text-3xl text-white mb-10 text-center font-semibold">
        What is your physical activity level?
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full">
        {options.map((opt) => (
          <OptionCard
            key={opt.value}
            emoji={opt.emoji}
            title={opt.title}
            description={opt.description}
            onClick={() => onSubmit({ activityLevel: opt.value })}
          />
        ))}
      </div>
    </div>
  );
}