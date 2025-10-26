"use client";
import * as React from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Upload, FileText, Download, Trash2, Plus } from "lucide-react";

// Tipo para un certificado (lo hardcodeamos por ahora)
type Certificate = {
  id: number;
  title: string;
  institution: string;
};

// Vista 1: Formulario para subir
const UploadView = ({ onBack, onConfirm }: { onBack: () => void, onConfirm: (cert: Certificate) => void }) => {
  const [title, setTitle] = React.useState("");
  const [institution, setInstitution] = React.useState("");
  
  const handleConfirm = () => {
    // Simular subida y creación
    onConfirm({ id: Date.now(), title, institution });
  };

  return (
    <div className="flex flex-col">
      {/* Placeholder para la zona de D&D */}
      <div className="w-full h-48 bg-gray-700 rounded-lg flex flex-col items-center justify-center text-center p-4 mb-6">
        <Upload className="w-12 h-12 text-gray-400 mb-2" />
        <p className="text-white font-semibold">Upload a document</p>
        <p className="text-gray-400 text-sm">(.pdf, .jpg, .jpeg, .png)</p>
      </div>
      <h3 className="text-xl text-white font-semibold mb-4">Your certificates</h3>
      <div className="space-y-4">
        <Input
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="bg-gray-800 border-gray-700 text-white"
        />
        <Input
          placeholder="Organization/Institution"
          value={institution}
          onChange={(e) => setInstitution(e.target.value)}
          className="bg-gray-800 border-gray-700 text-white"
        />
        <Button
          onClick={handleConfirm}
          className="w-full bg-cyan-400 text-black font-bold text-lg hover:bg-cyan-500"
        >
          Confirm
        </Button>
        <Button variant="ghost" onClick={onBack} className="w-full text-white">Cancel</Button>
      </div>
    </div>
  );
};

// Vista 2: Lista de certificados
const ListView = ({ certificates, onAdd, onDelete }: { 
  certificates: Certificate[], 
  onAdd: () => void,
  onDelete: (id: number) => void 
}) => (
  <div className="w-full">
    <div className="flex justify-between items-center mb-6">
      <h2 className="text-2xl text-white font-semibold">Your certificates</h2>
      <Button onClick={onAdd} size="icon" className="bg-cyan-400 hover:bg-cyan-500 rounded-full">
        <Plus className="w-6 h-6 text-black" />
      </Button>
    </div>
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {certificates.map((cert) => (
        <div key={cert.id} className="bg-gray-800 border border-gray-700 rounded-lg p-4">
          {/* Placeholder de la imagen del cert */}
          <div className="w-full h-32 bg-gray-700 rounded-md flex items-center justify-center mb-4">
            <FileText className="w-16 h-16 text-gray-500" />
          </div>
          <h3 className="text-white font-semibold">{cert.title}</h3>
          <p className="text-gray-400 text-sm mb-4">{cert.institution}</p>
          <div className="flex justify-end gap-2">
            <Button variant="ghost" size="icon"><Download className="w-5 h-5 text-gray-400" /></Button>
            <Button variant="ghost" size="icon" onClick={() => onDelete(cert.id)}>
              <Trash2 className="w-5 h-5 text-red-500" />
            </Button>
          </div>
        </div>
      ))}
    </div>
  </div>
);

// Vista 3: Estado vacío
const EmptyView = ({ onUpload }: { onUpload: () => void }) => (
  <div className="flex flex-col items-center text-center p-8">
    <span className="text-7xl mb-6">📚</span>
    <h2 className="text-2xl text-white font-semibold mb-2">Show your expertise!</h2>
    <p className="text-gray-400 mb-6 max-w-xs">
      Upload your certifications to showcase your skills and build trust with your trainees.
    </p>
    <Button
      onClick={onUpload}
      className="bg-cyan-400 text-black font-bold text-lg hover:bg-cyan-500"
    >
      Upload certificate
    </Button>
    <p className="text-gray-500 mt-6 text-sm">Don't worry, you can change this later</p>
  </div>
);

// Componente Principal del Modal
type ModalProps = {
  open: boolean;
  setOpen: (open: boolean) => void;
};
export function CoachCertificatesModal({ open, setOpen }: ModalProps) {
  const [view, setView] = React.useState<"empty" | "list" | "upload">("empty");
  const [certificates, setCertificates] = React.useState<Certificate[]>([]);

  React.useEffect(() => {
    // Decidir qué vista mostrar al abrir el modal
    if (open) {
      setView(certificates.length > 0 ? "list" : "empty");
    }
  }, [open, certificates.length]);

  const handleAddCertificate = (cert: Certificate) => {
    setCertificates(prev => [...prev, cert]);
    setView("list");
  };

  const handleDeleteCertificate = (id: number) => {
    setCertificates(prev => prev.filter(c => c.id !== id));
  };

  const renderView = () => {
    switch (view) {
      case "empty":
        return <EmptyView onUpload={() => setView("upload")} />;
      case "list":
        return <ListView certificates={certificates} onAdd={() => setView("upload")} onDelete={handleDeleteCertificate} />;
      case "upload":
        return <UploadView onBack={() => setView(certificates.length > 0 ? "list" : "empty")} onConfirm={handleAddCertificate} />;
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="bg-gray-900 border-gray-700 text-white max-w-2xl p-8">
        {renderView()}
      </DialogContent>
    </Dialog>
  );
}