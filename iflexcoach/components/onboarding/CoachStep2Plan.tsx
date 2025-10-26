"use client";
import * as React from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge";
import { Check } from "lucide-react";

type Props = {
  onSubmit: (data: { plan: string; trial: boolean }) => void;
};

export function CoachStep2Plan({ onSubmit }: Props) {
  const [plan, setPlan] = React.useState("1_athlete");
  const [trial, setTrial] = React.useState(true);

  const plans = [
    { id: "1_athlete", title: "1 Athlete", price: "$9.99" },
    { id: "5_athletes", title: "Up to 5 Athletes", price: "$17.99" },
    { id: "15_athletes", title: "Up to 15 Athletes", price: "$34.99" },
    { id: "25_athletes", title: "Up to 25 Athletes", price: "$44.99", badge: "50% OFF" },
    { id: "35_athletes", title: "Up to 35 Athletes", price: "$59.99" },
  ];

  const features = [
    "Track Client Progress", "In-Person & Virtual Sessions",
    "Assign Personalized Content", "Access Performance Insights",
    "Boost Engagement & Retention",
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({ plan, trial });
  };

  return (
    <div className="flex flex-col md:flex-row items-center justify-center w-full gap-16">
      {/* Columna Izquierda (Features) */}
      <div className="flex-1 text-center md:text-left">
        <span className="text-7xl">🚀</span>
        <h2 className="text-3xl text-white my-4 font-semibold">
          Power Up Your Coaching!
        </h2>
        <ul className="space-y-3">
          {features.map((feature) => (
            <li key={feature} className="flex items-center gap-2 text-gray-300">
              <Check className="w-5 h-5 text-cyan-400" />
              {feature}
            </li>
          ))}
        </ul>
      </div>

      {/* Columna Derecha (Planes) */}
      <div className="flex-1 w-full">
        <form onSubmit={handleSubmit}>
          <RadioGroup value={plan} onValueChange={setPlan} className="space-y-4">
            {plans.map((p) => (
              <Label
                key={p.id}
                htmlFor={p.id}
                className={`flex items-center justify-between p-4 rounded-lg cursor-pointer border-2 transition-all 
                  ${plan === p.id ? 'border-cyan-400 bg-gray-800' : 'border-gray-700 bg-gray-900'}
                `}
              >
                <div className="flex items-center space-x-3">
                  <RadioGroupItem value={p.id} id={p.id} />
                  <span className="text-white text-lg">{p.title}</span>
                  {p.badge && (
                    <Badge className="bg-orange-500 text-white">{p.badge}</Badge>
                  )}
                </div>
                <span className="text-white font-semibold text-lg">
                  {p.price}<span className="text-sm font-normal text-gray-400">/month</span>
                </span>
              </Label>
            ))}
          </RadioGroup>

          <div className="flex items-center justify-between mt-6">
            <Label htmlFor="trial-switch" className="text-white text-lg">
              14-Days Free Trial
            </Label>
            <Switch
              id="trial-switch"
              checked={trial}
              onCheckedChange={setTrial}
              className="data-[state=checked]:bg-cyan-400"
            />
          </div>

          <Button
            type="submit"
            className="w-full bg-cyan-400 text-black font-bold text-lg hover:bg-cyan-500 mt-8"
            size="lg"
          >
            Confirm
          </Button>
          <p className="text-gray-500 mt-4 text-sm text-center">Don't worry, you can change this later</p>
        </form>
      </div>
    </div>
  );
}