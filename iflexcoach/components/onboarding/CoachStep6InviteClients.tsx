"use client";
import * as React from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Trash2 } from "lucide-react";

type Props = {
  onSubmit: (data: { clients: string[] }) => void;
};

export function CoachStep6InviteClients({ onSubmit }: Props) {
  const [email, setEmail] = React.useState("");
  const [emailList, setEmailList] = React.useState<string[]>([]);

  const handleAddEmail = (e: React.FormEvent) => {
    e.preventDefault();
    if (email && !emailList.includes(email)) {
      setEmailList(prev => [...prev, email]);
      setEmail("");
    }
  };

  // ... (Aquí iría la lógica de borrar emails, igual que en Asistentes)

  return (
    <div className="flex flex-col items-center w-full max-w-lg">
      <h2 className="text-3xl text-white mb-8 text-center font-semibold">
        Invite your clients
      </h2>
      
      <form onSubmit={handleAddEmail} className="w-full">
        <Input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="bg-gray-800 border-gray-700 text-white"
        />
      </form>

      {/* Aquí iría la lista de emails, la omito por brevedad */}
      <div className="w-full space-y-3 my-6 min-h-[100px]">
        {/* ... emailList.map(...) ... */}
      </div>

      {emailList.length === 0 && (
        <Button
          onClick={() => onSubmit({ clients: [] })}
          variant="link"
          className="text-cyan-400 text-lg my-4"
        >
          No clients yet
        </Button>
      )}

      <Button
        onClick={() => onSubmit({ clients: emailList })}
        className="w-full bg-cyan-400 text-black font-bold text-lg hover:bg-cyan-500"
      >
        Confirm clients
      </Button>
    </div>
  );
}