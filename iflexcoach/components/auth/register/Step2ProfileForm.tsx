"use client";

import * as React from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Upload, Check } from "lucide-react"; // Importar Check

type Step2Props = {
  onSubmit: (data: {
    name: string;
    lastName: string;
    username: string;
  }) => void;
  email: string;
};

export function Step2ProfileForm({ onSubmit, email }: Step2Props) {
  const [name, setName] = React.useState("");
  const [lastName, setLastName] = React.useState("");
  const [username, setUsername] = React.useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({ name, lastName, username });
  };

  // Placeholder para el tick de validación (como en el diseño)
  const ValidatedIcon = () => (
    <div className="absolute right-3 top-1/2 -translate-y-1/2 text-green-500">
      <Check size={20} />
    </div>
  );

  return (
    <div className="flex flex-col items-center w-full">
      {/* Placeholder para Subir Foto */}
      <div className="w-32 h-32 rounded-full bg-gray-700 flex items-center justify-center mb-8 border-2 border-gray-600">
        <Upload className="w-12 h-12 text-gray-400" />
      </div>

      <form onSubmit={handleSubmit} className="w-full space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <Input
            placeholder="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="bg-gray-800 border-gray-700 text-white placeholder:text-gray-400"
            required
          />
          <Input
            placeholder="Last name"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            className="bg-gray-800 border-gray-700 text-white placeholder:text-gray-400"
            required
          />
        </div>
        
        <Input
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="bg-gray-800 border-gray-700 text-white placeholder:text-gray-400"
          required
        />
        
        {/* Email pre-rellenado y deshabilitado, con tick */}
        <div className="relative">
          <Input
            type="email"
            value={email}
            className="bg-gray-800 border-gray-700 text-white placeholder:text-gray-400"
            disabled
          />
          <ValidatedIcon />
        </div>

        {/* NOTA: Los campos de contraseña se omiten aquí como acordamos */}
        <p className="text-xs text-blue-400 text-center px-4">
          +8 characters <span className="text-gray-400">|</span> 1 capital letter <span className="text-gray-400">|</span> 1 special character
        </p>

        <Button
          type="submit"
          className="w-full bg-cyan-400 text-black font-bold text-lg hover:bg-cyan-500"
          size="lg"
        >
          Create Account
        </Button>
      </form>
      {/* NOTA: Los botones sociales se omiten aquí como acordamos */}
    </div>
  );
}