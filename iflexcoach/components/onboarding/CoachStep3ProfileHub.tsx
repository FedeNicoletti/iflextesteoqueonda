"use client";
import * as React from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Upload, Pencil, Check, FileText, Palette } from "lucide-react";

// ¡IMPORTAR LOS MODALES REALES!
import { CoachCertificatesModal } from "./modals/CoachCertificatesModal";
import { CoachDocumentsModal } from "./modals/CoachDocumentsModal";
import { CoachThemeModal } from "./modals/CoachThemeModal";

type Props = {
  onSubmit: (data: {}) => void;
};

// Helper para inputs con icono de editar
const EditableInput = ({ placeholder, value }: { placeholder: string, value: string }) => (
  <div className="relative">
    <Input
      placeholder={placeholder}
      defaultValue={value}
      className="bg-gray-800 border-gray-700 text-white pr-10"
    />
    <Pencil className="w-4 h-4 text-gray-400 absolute right-3 top-1/2 -translate-y-1/2" />
  </div>
);

// Helper para selects
const FormSelect = ({ placeholder }: { placeholder: string }) => (
  <Select>
    <SelectTrigger className="w-full bg-gray-800 border-gray-700 text-white">
      <SelectValue placeholder={placeholder} />
    </SelectTrigger>
    <SelectContent className="bg-gray-800 border-gray-700 text-white">
      <SelectItem value="a">Opción A</SelectItem>
      <SelectItem value="b">Opción B</SelectItem>
    </SelectContent>
  </Select>
);

// Helper para los botones del Hub
const HubButton = ({ icon: Icon, text, onClick }: { icon: React.ElementType, text: string, onClick: () => void }) => (
  <Button
    type="button"
    onClick={onClick}
    variant="outline"
    className="bg-gray-800 border-gray-700 text-white h-16 flex justify-between items-center p-4 hover:bg-gray-700 hover:text-white"
  >
    <div className="flex items-center gap-3">
      <Icon className="w-5 h-5 text-cyan-400" />
      <span className="text-lg">{text}</span>
    </div>
    <Check className="w-5 h-5 text-green-500" />
  </Button>
);

export function CoachStep3ProfileHub({ onSubmit }: Props) {
  const [showCertificates, setShowCertificates] = React.useState(false);
  const [showDocuments, setShowDocuments] = React.useState(false);
  const [showTheme, setShowTheme] = React.useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Aquí se guardarían los datos del formulario
    onSubmit({}); // Pasa al Paso 4 (Goal)
  };

  return (
    <>
      <form onSubmit={handleSubmit} className="w-full max-w-4xl space-y-6">
        <div className="flex flex-col md:flex-row gap-6">
          {/* Columna Izquierda (Foto y Bio) */}
          <div className="flex flex-col items-center gap-4 w-full md:w-1/3">
            <div className="w-40 h-40 rounded-full bg-gray-700 flex items-center justify-center border-2 border-gray-600">
              <Upload className="w-16 h-16 text-gray-400" />
            </div>
            <Button variant="link" className="text-white">
              Edit Photo <Pencil className="w-4 h-4 ml-2" />
            </Button>
            <Textarea
              placeholder="Bio"
              className="bg-gray-800 border-gray-700 text-white h-32 resize-none"
              maxLength={500}
            />
          </div>

          {/* Columna Derecha (Formulario) */}
          <div className="flex-1 grid grid-cols-2 gap-4">
            <EditableInput placeholder="Username" value="@Ryan.Davis" />
            <EditableInput placeholder="Name" value="@Ryan.Davis" />
            <EditableInput placeholder="Last Name" value="@Ryan.Davis" />
            <FormSelect placeholder="Gender" />
            <FormSelect placeholder="Country" />
            <FormSelect placeholder="Region" />
            <FormSelect placeholder="City" />
            <Input placeholder="Phone number" className="bg-gray-800 border-gray-700 text-white" />
            <FormSelect placeholder="Languages" />
            <FormSelect placeholder="Training specialization" />
          </div>
        </div>

        {/* Botones del Hub */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <HubButton icon={Check} text="Certificates" onClick={() => setShowCertificates(true)} />
          <HubButton icon={FileText} text="Documents" onClick={() => setShowDocuments(true)} />
          <HubButton icon={Palette} text="Customize theme" onClick={() => setShowTheme(true)} />
        </div>
        
        <Button
          type="submit"
          className="w-full bg-cyan-400 text-black font-bold text-lg hover:bg-cyan-500"
          size="lg"
        >
          Confirm
        </Button>
      </form>

      {/* Modales (se renderizan aquí pero están ocultos hasta que se activan) */}
      <CoachCertificatesModal open={showCertificates} setOpen={setShowCertificates} />
      <CoachDocumentsModal open={showDocuments} setOpen={setShowDocuments} />
      <CoachThemeModal open={showTheme} setOpen={setShowTheme} />
    </>
  );
}