"use client";
import * as React from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Trash2 } from "lucide-react";

type Props = {
  onSubmit: (data: { assistants: string[] }) => void;
};

export function CoachStep5InviteAssistants({ onSubmit }: Props) {
  const [email, setEmail] = React.useState("");
  const [emailList, setEmailList] = React.useState<string[]>([
    // Datos de ejemplo como en el diseño
    "julianapinocciidg@gmail.com",
    "federiconicoletti@outlook.com",
  ]);

  const handleAddEmail = (e: React.FormEvent) => {
    e.preventDefault();
    if (email && !emailList.includes(email)) {
      setEmailList(prev => [...prev, email]);
      setEmail("");
    }
  };

  const handleRemoveEmail = (emailToRemove: string) => {
    setEmailList(prev => prev.filter(e => e !== emailToRemove));
  };

  return (
    <div className="flex flex-col items-center w-full max-w-lg">
      <h2 className="text-3xl text-white mb-8 text-center font-semibold">
        Invite your Assistant Coaches
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

      <div className="w-full space-y-3 my-6">
        {emailList.map((e) => (
          <div key={e} className="flex justify-between items-center text-white p-2">
            <span>{e}</span>
            <Button variant="ghost" size="icon" onClick={() => handleRemoveEmail(e)}>
              <Trash2 className="w-5 h-5 text-gray-400 hover:text-red-500" />
            </Button>
          </div>
        ))}
      </div>

      <Button
        onClick={() => onSubmit({ assistants: emailList })}
        className="w-full bg-cyan-400 text-black font-bold text-lg hover:bg-cyan-500"
      >
        Confirm Assistant Coaches
      </Button>
    </div>
  );
}