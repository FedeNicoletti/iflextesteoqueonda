"use client";
import * as React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { ChevronRight } from "lucide-react";

type Props = {
  onSubmit: (data: { exerciseType: string }) => void;
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

export function Step5ExerciseType({ onSubmit }: Props) {
  const options = [
    { emoji: "❤️‍🔥", title: "Cardiovascular", description: "Improves heart health and endurance", value: "cardio" },
    { emoji: "🏋️‍♂️", title: "Strength training", description: "Builds muscle and strenght", value: "strength" },
    { emoji: "🤸", title: "Flexibility", description: "Enhances range of motion and mobility", value: "flexibility" },
    { emoji: "🏃‍♀️", title: "Functional training", description: "Enhances everyday movement and balance", value: "functional" },
    { emoji: "⏱️", title: "HIIT", description: "Hight-intensity intervals for fat loss and endurance", value: "hiit" },
    { emoji: "🏀", title: "Sports", description: "Improve performance in sports with oriented workouts", value: "sports" },
  ];

  return (
    <div className="flex flex-col items-center w-full">
      <h2 className="text-3xl text-white mb-10 text-center font-semibold">
        What type of exercises do you prefer?
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full">
        {options.map((opt) => (
          <OptionCard
            key={opt.value}
            emoji={opt.emoji}
            title={opt.title}
            description={opt.description}
            onClick={() => onSubmit({ exerciseType: opt.value })}
          />
        ))}
      </div>
    </div>
  );
}