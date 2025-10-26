"use client";
import * as React from "react";
import { Button } from "@/components/ui/button";
import { User, ArrowRightLeft } from "lucide-react";

type Props = {
  onSubmit: (data: {}) => void; // Este submit finaliza el onboarding
};

export function Step9Connection({ onSubmit }: Props) {
  // Componente placeholder para la foto de perfil
  const ProfileAvatar = ({ name }: { name: string }) => (
    <div className="flex flex-col items-center space-y-2">
      <div className="w-24 h-24 rounded-full bg-gray-700 flex items-center justify-center border-2 border-gray-600">
        <User className="w-12 h-12 text-gray-400" />
      </div>
      <span className="text-white">@{name}</span>
    </div>
  );

  return (
    <div className="flex flex-col items-center w-full max-w-md text-center">
      <span className="text-8xl mb-6">🤝</span>
      <h2 className="text-3xl text-white mb-4 font-semibold">
        Connection completed!
      </h2>
      <p className="text-gray-400 text-lg mb-10">
        Now it's time to train like a champ with your coach!
      </p>

      <div className="flex items-center justify-center w-full space-x-8 mb-12">
        <ProfileAvatar name="David.Miller" />
        <ArrowRightLeft className="w-8 h-8 text-gray-500" />
        <ProfileAvatar name="Ryan.Davis" />
      </div>

      <Button variant="link" className="text-cyan-400 text-lg">
        Message coach
      </Button>
      <Button
        onClick={() => onSubmit({})} // Llama al submit final
        className="w-full bg-cyan-400 text-black font-bold text-lg hover:bg-cyan-500 mt-4"
        size="lg"
      >
        Go to dashboard
      </Button>
    </div>
  );
}