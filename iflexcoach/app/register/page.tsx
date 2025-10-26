"use client";

import * as React from "react";
import { useState } from "react";
import { useRouter } from "next/navigation";

// Importar los componentes de cada paso
import {Step1EmailForm} from "@/components/auth/register/Step1EmailForm";
import {Step2ProfileForm} from "@/components/auth/register/Step2ProfileForm";
import {Step3VerifyEmail} from "@/components/auth/register/Step3VerifyEmail";

// Definimos un tipo para los datos del formulario
type FormData = {
  email: string;
  password: string;
  name: string;
  lastName: string;
  username: string;
  role: "trainee" | "coach" | "";
};

export default function RegisterPage() {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState<FormData>({
    email: "",
    password: "",
    name: "",
    lastName: "",
    username: "",
    role: "",
  });
  const router = useRouter();

  // Función para pasar al siguiente paso
  const nextStep = () => setStep((prev) => prev + 1);

  // Función para actualizar los datos del formulario
  const updateFormData = (data: Partial<FormData>) => {
    setFormData((prev) => ({ ...prev, ...data }));
  };

  // Lógica para manejar el submit de cada paso
  const handleStep1Submit = (data: Partial<FormData>) => {
    updateFormData(data);
    nextStep();
  };

  const handleStep2Submit = (data: Partial<FormData>) => {
    updateFormData(data);
    nextStep(); // Pasa al Paso 3 (OTP)
  };

  const handleStep3Submit = () => {
    // El OTP fue exitoso
    nextStep(); // Pasa al Paso 4 (Onboarding)
  };


  const renderStep = () => {
    switch (step) {
      case 1:
        return <Step1EmailForm onSubmit={handleStep1Submit} />;
      case 2:
        return (
          <Step2ProfileForm
            onSubmit={handleStep2Submit}
            email={formData.email} // Pasamos el email para pre-rellenar
          />
        );
      case 3:
        return (
          <Step3VerifyEmail
            onSubmit={handleStep3Submit}
            email={formData.email} // Pasamos el email para mostrarlo
          />
        );
      default:
        return <Step1EmailForm onSubmit={handleStep1Submit} />;
    }
  };

  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-4">
      {/* Logo consistente en la parte superior */}
      <h1 className="text-4xl font-bold text-white mb-10 tracking-wider absolute top-10">
        iFLEXCOACH
      </h1>
      
      {/* El contenedor del formulario que cambia */}
      <div className="w-full max-w-md">
        {renderStep()}
      </div>
    </main>
  );
}