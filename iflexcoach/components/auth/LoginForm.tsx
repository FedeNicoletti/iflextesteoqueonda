"use client";

import * as React from "react";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Eye, EyeOff } from "lucide-react";
import { FaFacebook, FaGithub } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";

/**
 * Un componente wrapper para el Input de contraseña 
 * que maneja la lógica de mostrar/ocultar.
 */
const PasswordInput = ({ ...props }) => {
  const [showPassword, setShowPassword] = useState(false);
  const Icon = showPassword ? EyeOff : Eye;

  return (
    <div className="relative">
      <Input
        type={showPassword ? "text" : "password"}
        {...props}
        className="bg-gray-800 border-gray-700 text-white placeholder:text-gray-400"
      />
      <button
        type="button"
        onClick={() => setShowPassword(!showPassword)}
        className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white"
        aria-label={showPassword ? "Hide password" : "Show password"}
      >
        <Icon size={20} />
      </button>
    </div>
  );
};

export default function LoginForm() {
  const router = useRouter();

  // Simulación de login: cualquier dato redirige a /home
  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Simulando login y redirigiendo a /home...");
    router.push("/home");
  };

  return (
    <div className="flex flex-col items-center w-full max-w-sm p-4">
      {/* 1. Logo (como h1) */}
      <h1 className="text-4xl font-bold text-white mb-16 tracking-wider">
        iFLEXCOACH
      </h1>

      {/* 2. Título */}
      <h2 className="text-3xl text-white mb-8">
        Your journey starts here!
      </h2>

      {/* 3. Formulario de Login */}
      <form onSubmit={handleLogin} className="w-full space-y-4">
        <div className="grid w-full items-center gap-1.5">
          {/* Usamos sr-only para accesibilidad, ya que el label es el placeholder */}
          <Label htmlFor="user" className="sr-only">
            User
          </Label>
          <Input
            type="text"
            id="user"
            placeholder="User"
            className="bg-gray-800 border-gray-700 text-white placeholder:text-gray-400"
            required
          />
        </div>
        <div className="grid w-full items-center gap-1.5">
          <Label htmlFor="password" className="sr-only">
            Password
          </Label>
          <PasswordInput
            id="password"
            placeholder="Password"
            required
          />
        </div>

        <Button
          type="submit"
          className="w-full bg-cyan-400 text-black font-bold text-lg hover:bg-cyan-500"
          size="lg"
        >
          Log in
        </Button>
      </form>

      <Button variant="link" className="text-gray-400 hover:text-cyan-400 mt-4">
        Forgot password?
      </Button>

      {/* 4. Separador y Login Social */}
      <div className="flex items-center w-full my-6 gap-4">
        <span className="text-gray-400 text-sm whitespace-nowrap">
          Log in with
        </span>
        <div className="flex gap-4">
          <Button variant="outline" size="icon" className="rounded-full border-gray-600 hover:border-white">
            <FaFacebook className="h-5 w-5 text-blue-500" />
          </Button>
          <Button variant="outline" size="icon" className="rounded-full border-gray-600 hover:border-white">
            <FcGoogle className="h-5 w-5" />
          </Button>
          <Button variant="outline" size="icon" className="rounded-full border-gray-600 hover:border-white">
            <FaGithub className="h-5 w-5 text-white" />
          </Button>
        </div>
      </div>

      <div className="flex items-center w-full my-4">
        <Separator className="flex-1 bg-gray-600" />
        <span className="mx-4 text-gray-400 text-sm">or</span>
        <Separator className="flex-1 bg-gray-600" />
      </div>

      {/* 5. Crear Cuenta (Ahora linkeando a /register) */}
<Button
  asChild // 1. Añadimos la prop asChild
  variant="outline"
  className="w-full border-cyan-400 text-cyan-400 hover:bg-cyan-900/20 hover:text-cyan-400 font-bold text-lg"
  size="lg"
>
  {/* 2. Envolvemos el texto con el Link */}
  <Link href="/register">
    Create an account
  </Link>
</Button>
    </div>
  );
}