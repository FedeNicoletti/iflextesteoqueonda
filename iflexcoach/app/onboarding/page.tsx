"use client";
import * as React from "react";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Progress } from "@/components/ui/progress";

// PASO 1 (COMÚN)
import { Step1Role } from "@/components/onboarding/Step1Role";

// PASOS DE TRAINEE (2-9)
import { Step2Usage } from "@/components/onboarding/Step2Usage";
import { Step3Goal } from "@/components/onboarding/Step3Goal";
import { Step4ActivityLevel } from "@/components/onboarding/Step4ActivityLevel";
import { Step5ExerciseType } from "@/components/onboarding/Step5ExerciseType";
import { Step6PersonalInfo } from "@/components/onboarding/Step6PersonalInfo";
import { Step7Notifications } from "@/components/onboarding/Step7Notifications";
import { Step8LegalTerms } from "@/components/onboarding/Step8LegalTerms";
import { Step9Connection } from "@/components/onboarding/Step9Connection";

// PASOS DE COACH (2-6) - ¡NUEVOS!
import { CoachStep2Plan } from "@/components/onboarding/CoachStep2Plan";
import { CoachStep3ProfileHub } from "@/components/onboarding/CoachStep3ProfileHub";
import { CoachStep4Goal } from "@/components/onboarding/CoachStep4Goal";
import { CoachStep5InviteAssistants } from "@/components/onboarding/CoachStep5InviteAssistants";
import { CoachStep6InviteClients } from "@/components/onboarding/CoachStep6InviteClients";


type OnboardingData = {
  // ... (tipos de datos)
  role?: "trainee" | "coach";
};

const TOTAL_STEPS_TRAINEE = 9;
const TOTAL_STEPS_COACH = 6; // 1.Rol, 2.Plan, 3.Hub, 4.Goal, 5.Asistentes, 6.Clientes

export default function OnboardingPage() {
  const [step, setStep] = useState(1);
  const [role, setRole] = useState<"trainee" | "coach" | "">("");
  const [data, setData] = useState<Partial<OnboardingData>>({});
  const router = useRouter();

  const nextStep = () => setStep((prev) => prev + 1);

  const updateOnboardingData = (stepData: Partial<OnboardingData>) => {
    const newData = { ...data, ...stepData };
    setData(newData);

    // Si es el primer paso, guardamos el ROL
    if (step === 1 && stepData.role) {
      setRole(stepData.role);
    }
    
    // Lógica de finalización
    const isTraineeDone = role === 'trainee' && step === TOTAL_STEPS_TRAINEE;
    const isCoachDone = role === 'coach' && step === TOTAL_STEPS_COACH;

    if (isTraineeDone || isCoachDone) {
      console.log("ONBOARDING COMPLETADO:", newData);
      // ¡Al Dashboard!
      router.push("/home");
    } else {
      nextStep();
    }
  };

  const getProgress = () => {
    if (role === "trainee") return (step / TOTAL_STEPS_TRAINEE) * 100;
    if (role === "coach") return (step / TOTAL_STEPS_COACH) * 100;
    return 0; // (step 1)
  };
  const progressValue = getProgress();

  // LA FUNCIÓN "GUARDAGUJAS"
  const renderStep = () => {
    // PASO 1: Selección de Rol (Común)
    if (step === 1) {
      return <Step1Role onSubmit={updateOnboardingData} />;
    }

    // FLUJO TRAINEE
    if (role === "trainee") {
      switch (step) {
        case 2: return <Step2Usage onSubmit={updateOnboardingData} />;
        case 3: return <Step3Goal onSubmit={updateOnboardingData} />;
        case 4: return <Step4ActivityLevel onSubmit={updateOnboardingData} />;
        case 5: return <Step5ExerciseType onSubmit={updateOnboardingData} />;
        case 6: return <Step6PersonalInfo onSubmit={updateOnboardingData} />;
        case 7: return <Step7Notifications onSubmit={updateOnboardingData} />;
        case 8: return <Step8LegalTerms onSubmit={updateOnboardingData} />;
        case 9: return <Step9Connection onSubmit={updateOnboardingData} />;
        default: return <Step1Role onSubmit={updateOnboardingData} />;
      }
    }

    // FLUJO COACH
    if (role === "coach") {
      switch (step) {
        case 2: return <CoachStep2Plan onSubmit={updateOnboardingData} />;
        case 3: return <CoachStep3ProfileHub onSubmit={updateOnboardingData} />;
        case 4: return <CoachStep4Goal onSubmit={updateOnboardingData} />;
        case 5: return <CoachStep5InviteAssistants onSubmit={updateOnboardingData} />;
        case 6: return <CoachStep6InviteClients onSubmit={updateOnboardingData} />;
        default: return <Step1Role onSubmit={updateOnboardingData} />;
      }
    }
    return <Step1Role onSubmit={updateOnboardingData} />; // Fallback inicial
  };

  return (
    <main className="flex min-h-screen flex-col items-center p-4">
      {/* Barra de Progreso y Logo */}
      <div className="w-full max-w-4xl fixed top-0 left-0 right-0 mx-auto p-4">
        { (step === 1 || (role === 'trainee' && step > 7)) && (
            <h1 className="text-4xl font-bold text-white text-center my-10 tracking-wider">
              iFLEXCOACH
            </h1>
        )}
        { ( (role === 'trainee' && step > 1 && step < 8) || (role === 'coach' && step > 1) ) && (
            <Progress value={progressValue} indicatorClassName="bg-cyan-400" />
        )}
      </div>
      
      <div className="flex flex-col items-center justify-center w-full max-w-4xl flex-1 mt-20">
        {renderStep()}
      </div>
    </main>
  );
}