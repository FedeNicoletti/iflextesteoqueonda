"use client";
import * as React from "react";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";

type Props = {
  onSubmit: (data: { notifications: object }) => void;
};

const NotificationToggle = ({ id, title, description }: { id: string, title: string, description: string }) => (
  <div className="flex items-start space-x-4">
    <Switch defaultChecked id={id} className="data-[state=checked]:bg-cyan-400 mt-1" />
    <div className="flex-1">
      <Label htmlFor={id} className="text-lg font-semibold text-white">{title}</Label>
      <p className="text-gray-400">{description}</p>
    </div>
  </div>
);

export function Step7Notifications({ onSubmit }: Props) {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Aquí se recolectarían los valores de los toggles
    onSubmit({ notifications: {} });
  };

  return (
    <div className="flex flex-col items-center w-full max-w-lg">
      <h2 className="text-3xl text-white mb-10 text-center font-semibold">
        Personalize your notifications
      </h2>
      <form onSubmit={handleSubmit} className="w-full space-y-6">
        <NotificationToggle
          id="workouts"
          title="Workouts"
          description="Stay updated on your scheduled training sessions and personalized workout plans"
        />
        <NotificationToggle
          id="nutrition"
          title="Nutrition"
          description="Receive tips, meal reminders, and personalized nutrition updates to support your health goals"
        />
        <NotificationToggle
          id="messages"
          title="Messages"
          description="Receive alerts for new messages from your coach, friends and the app community"
        />
        <NotificationToggle
          id="reminders"
          title="Reminders"
          description="Get timely reminders for important tasks, such as upcoming workouts or goals"
        />
        <NotificationToggle
          id="updates"
          title="Updates"
          description="Be informed about the latest app updates, features and announcements"
        />
        
        <Button
          type="submit"
          className="w-full bg-cyan-400 text-black font-bold text-lg hover:bg-cyan-500 mt-8"
          size="lg"
        >
          Confirm
        </Button>
      </form>
      <p className="text-gray-500 mt-4 text-sm">Don't worry, you can change this later</p>
    </div>
  );
}