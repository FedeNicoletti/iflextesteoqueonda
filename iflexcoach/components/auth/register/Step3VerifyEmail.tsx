"use client";

import * as React from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Mail, Info } from "lucide-react";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

type Step3Props = {
  onSubmit: () => void;
  email: string;
};

export function Step3VerifyEmail({ onSubmit, email }: Step3Props) {
  const router = useRouter();
  const [value, setValue] = React.useState("");
  const [showSuccessModal, setShowSuccessModal] = React.useState(false);

  //
  const handleConfirm = () => {
    // Simulación de verificación de OTP
    if (value.length === 4) {
      console.log("OTP verificado:", value);
      setShowSuccessModal(true);
    } else {
      alert("Por favor, ingresá el código de 4 dígitos.");
    }
  };

  const handleModalContinue = () => {
    setShowSuccessModal(false);
   router.push('/onboarding')
  };

  return (
    <div className="flex flex-col items-center w-full text-center">
      {/* Placeholder para el Buzón 3D */}
      <div className="p-4 rounded-lg">
        <Mail className="w-32 h-32 text-cyan-400" />
      </div>
      
      <h2 className="text-3xl text-white my-4">Verify Your Email</h2>
      <p className="text-gray-400 mb-2">
        Please enter the 4 digit code sent to
      </p>
      <p className="text-white font-bold mb-6">{email}</p>

      <div className="mb-6">
        <InputOTP
          maxLength={4}
          value={value}
          onChange={(value) => setValue(value)}
        >
          <InputOTPGroup>
            <InputOTPSlot index={0} className="bg-gray-800 border-gray-700 text-white" />
            <InputOTPSlot index={1} className="bg-gray-800 border-gray-700 text-white" />
            <InputOTPSlot index={2} className="bg-gray-800 border-gray-700 text-white" />
            <InputOTPSlot index={3} className="bg-gray-800 border-gray-700 text-white" />
          </InputOTPGroup>
        </InputOTP>
      </div>
      
      <div className="flex items-center text-gray-500 text-sm mb-8">
        <Info size={16} className="mr-2" />
        Don't forget to check your spam folder
      </div>

      <Button
        onClick={handleConfirm}
        className="w-full bg-cyan-400 text-black font-bold text-lg hover:bg-cyan-500"
        size="lg"
      >
        Confirm
      </Button>

      <div className="flex justify-between w-full mt-6">
        <Button variant="link" className="text-cyan-400">Resend code</Button>
        <Button variant="link" className="text-cyan-400">Change email</Button>
      </div>

      {/* Modal de Éxito */}
      <Dialog open={showSuccessModal} onOpenChange={setShowSuccessModal}>
        <DialogContent className="bg-gray-900 border-gray-700 text-white max-w-xs p-8">
          <DialogHeader className="items-center">
            <div className="text-6xl mb-4">👍</div>
            <DialogTitle className="text-2xl mb-4">Successful verification!</DialogTitle>
            <Button
              onClick={handleModalContinue}
              className="w-full bg-cyan-400 text-black font-bold text-lg hover:bg-cyan-500"
              size="lg"
            >
              Start onboarding
            </Button>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </div>
  );
}