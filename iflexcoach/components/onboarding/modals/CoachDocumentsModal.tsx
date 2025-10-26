"use client";
import * as React from "react";
// Reutilizaremos los mismos componentes que "Certificados"
import { CoachCertificatesModal } from "./CoachCertificatesModal"; 

type ModalProps = {
  open: boolean;
  setOpen: (open: boolean) => void;
};

// Por ahora, este modal es solo una copia de "Certificados".
// Más adelante se puede personalizar con su propia lógica y vistas.
export function CoachDocumentsModal({ open, setOpen }: ModalProps) {
  return (
    <CoachCertificatesModal open={open} setOpen={setOpen} />
    // NOTA: En un futuro, aquí iría un componente
    // <Dialog open={open} onOpenChange={setOpen}>...</Dialog>
    // con su propia lógica para "Documentos".
  );
}