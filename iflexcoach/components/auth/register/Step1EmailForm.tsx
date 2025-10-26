"use client";

import * as React from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { FaFacebook, FaGithub } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import { FaApple } from "react-icons/fa"; // Icono de Apple

type Step1Props = {
  onSubmit: (data: { email: string; password: string }) => void;
};

export function Step1EmailForm({ onSubmit }: Step1Props) {
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [confirmPassword, setConfirmPassword] = React.useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Aquí iría la validación (ej. password === confirmPassword)
    if (password !== confirmPassword) {
      alert("Las contraseñas no coinciden");
      return;
    }
    onSubmit({ email, password });
  };

  return (
    <div className="flex flex-col items-center w-full">
      {/* Título (sugerencia aceptada) */}
      <h2 className="text-3xl text-white mb-8 text-center">
        Create your account
      </h2>

      <form onSubmit={handleSubmit} className="w-full space-y-4">
        <Input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="bg-gray-800 border-gray-700 text-white placeholder:text-gray-400"
          required
        />
        <Input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="bg-gray-800 border-gray-700 text-white placeholder:text-gray-400"
          required
        />
        <Input
          type="password"
          placeholder="Confirm password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          className="bg-gray-800 border-gray-700 text-white placeholder:text-gray-400"
          required
        />
        <Button
          type="submit"
          className="w-full bg-cyan-400 text-black font-bold text-lg hover:bg-cyan-500"
          size="lg"
        >
          Next
        </Button>
      </form>

      {/* Separador y Login Social */}
      <div className="flex items-center w-full my-6">
        <Separator className="flex-1 bg-gray-600" />
        <span className="mx-4 text-gray-400 text-sm">or</span>
        <Separator className="flex-1 bg-gray-600" />
      </div>

      <p className="text-gray-400 text-sm mb-4">Sign in with</p>

      <div className="flex gap-4">
        <Button variant="outline" size="icon" className="rounded-full border-gray-600 hover:border-white">
          <FaFacebook className="h-6 w-6 text-blue-500" />
        </Button>
        <Button variant="outline" size="icon" className="rounded-full border-gray-600 hover:border-white">
          <FcGoogle className="h-6 w-6" />
        </Button>
        <Button variant="outline" size="icon" className="rounded-full border-gray-600 hover:border-white">
          <FaApple className="h-6 w-6 text-white" />
        </Button>
      </div>
    </div>
  );
}