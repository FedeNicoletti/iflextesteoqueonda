"use client";
import * as React from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog"; // Importar DialogTitle
import { Upload, FileText, Download, Trash2, Plus } from "lucide-react";

// Este componente ahora es una copia de 'Certificates'
// pero lo adaptamos para 'Documents'

type Document = {
  id: number;
  title: string;
  institution: string;
};

// Vista 1: Formulario para subir
const UploadView = ({ onBack, onConfirm }: { onBack: () => void, onConfirm: (doc: Document) => void }) => {
  const [title, setTitle] = React.useState("");
  const [institution, setInstitution] = React.useState("");
  
  const handleConfirm = () => {
    onConfirm({ id: Date.now(), title, institution });
  };

  return (
    <div className="flex flex-col">
      <div className="w-full h-48 bg-gray-700 rounded-lg flex flex-col items-center justify-center text-center p-4 mb-6">
        <Upload className="w-12 h-12 text-gray-400 mb-2" />
        <p className="text-white font-semibold">Upload a document</p>
        <p className="text-gray-400 text-sm">(.pdf, .jpg, .jpeg, .png)</p>
      </div>
      <h3 className="text-xl text-white font-semibold mb-4">Your documents</h3> {/* Título cambiado */}
      <div className="space-y-4">
        <Input
          placeholder="Document Title" // Texto cambiado
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

// Vista 2: Lista de documentos
const ListView = ({ documents, onAdd, onDelete }: { 
  documents: Document[], 
  onAdd: () => void,
  onDelete: (id: number) => void 
}) => (
  <div className="w-full">
    <div className="flex justify-between items-center mb-6">
      <h2 className="text-2xl text-white font-semibold">Your documents</h2> {/* Título cambiado */}
      <Button onClick={onAdd} size="icon" className="bg-cyan-400 hover:bg-cyan-500 rounded-full">
        <Plus className="w-6 h-6 text-black" />
      </Button>
    </div>
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {documents.map((doc) => (
        <div key={doc.id} className="bg-gray-800 border border-gray-700 rounded-lg p-4">
          <div className="w-full h-32 bg-gray-700 rounded-md flex items-center justify-center mb-4">
            <FileText className="w-16 h-16 text-gray-500" />
          </div>
          <h3 className="text-white font-semibold">{doc.title}</h3>
          <p className="text-gray-400 text-sm mb-4">{doc.institution}</p>
          <div className="flex justify-end gap-2">
            <Button variant="ghost" size="icon"><Download className="w-5 h-5 text-gray-400" /></Button>
            <Button variant="ghost" size="icon" onClick={() => onDelete(doc.id)}>
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
    <span className="text-7xl mb-6">📄</span>
    <h2 className="text-2xl text-white font-semibold mb-2">Upload your documents</h2> {/* Título cambiado */}
    <p className="text-gray-400 mb-6 max-w-xs">
      Upload any legal or waiver documents needed for your trainees.
    </p>
    <Button
      onClick={onUpload}
      className="bg-cyan-400 text-black font-bold text-lg hover:bg-cyan-500"
    >
      Upload document
    </Button>
    <p className="text-gray-500 mt-6 text-sm">Don't worry, you can change this later</p>
  </div>
);

// Componente Principal del Modal
type ModalProps = {
  open: boolean;
  setOpen: (open: boolean) => void;
};
export function CoachDocumentsModal({ open, setOpen }: ModalProps) {
  const [view, setView] = React.useState<"empty" | "list" | "upload">("empty");
  const [documents, setDocuments] = React.useState<Document[]>([]);

  React.useEffect(() => {
    if (open) {
      setView(documents.length > 0 ? "list" : "empty");
    }
  }, [open, documents.length]);

  const handleAddDocument = (doc: Document) => {
    setDocuments(prev => [...prev, doc]);
    setView("list");
  };

  const handleDeleteDocument = (id: number) => {
    setDocuments(prev => prev.filter(c => c.id !== id));
  };

  const renderView = () => {
    switch (view) {
      case "empty":
        return <EmptyView onUpload={() => setView("upload")} />;
      case "list":
        return <ListView documents={documents} onAdd={() => setView("upload")} onDelete={handleDeleteDocument} />;
      case "upload":
        return <UploadView onBack={() => setView(documents.length > 0 ? "list" : "empty")} onConfirm={handleAddDocument} />;
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="bg-gray-900 border-gray-700 text-white max-w-2xl p-8">
        {/* ¡AQUÍ ESTÁ LA SOLUCIÓN! */}
        <DialogTitle className="sr-only">Manage your documents</DialogTitle> 
        {renderView()}
      </DialogContent>
    </Dialog>
  );
}