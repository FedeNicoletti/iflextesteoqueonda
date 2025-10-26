"use client";
import * as React from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";
import { CalendarIcon, Check } from "lucide-react";

type Props = {
  onSubmit: (data: { personalInfo: object }) => void;
};

// Componente helper para los Select (desplegables)
const FormSelect = ({ placeholder, options }: { placeholder: string, options: string[] }) => (
  <Select>
    <SelectTrigger className="w-full bg-gray-800 border-gray-700 text-white">
      <SelectValue placeholder={placeholder} />
    </SelectTrigger>
    <SelectContent className="bg-gray-800 border-gray-700 text-white">
      {options.map(opt => <SelectItem key={opt} value={opt}>{opt}</SelectItem>)}
    </SelectContent>
  </Select>
);

export function Step6PersonalInfo({ onSubmit }: Props) {
  const [date, setDate] = React.useState<Date>();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Aquí se recolectarían todos los datos del formulario
    onSubmit({ personalInfo: { date } }); 
  };

  return (
    <div className="flex flex-col items-center w-full max-w-lg">
      <h2 className="text-3xl text-white mb-10 text-center font-semibold">
        Personalize your app
      </h2>
      <form onSubmit={handleSubmit} className="w-full space-y-5">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <FormSelect placeholder="Country" options={["Argentina", "USA", "Spain"]} />
          <FormSelect placeholder="Region" options={["Buenos Aires", "California", "Madrid"]} />
          <FormSelect placeholder="City" options={["Mar del Plata", "Los Angeles", "Barcelona"]} />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant={"outline"}
                className={cn(
                  "w-full justify-between text-left font-normal",
                  !date && "text-gray-400",
                  "bg-gray-800 border-gray-700 hover:bg-gray-700"
                )}
              >
                {date ? date.toLocaleDateString() : <span>Birth Date</span>}
                <CalendarIcon className="mr-2 h-4 w-4" />
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0 bg-gray-800 border-gray-700 text-white">
              <Calendar
                mode="single"
                selected={date}
                onSelect={setDate}
                initialFocus
              />
            </PopoverContent>
          </Popover>
          <FormSelect placeholder="Gender" options={["Male", "Female", "Other"]} />
          <FormSelect placeholder="Injuries or health conditions" options={["None", "Knee", "Back"]} />
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
          <div className="bg-gray-800 border border-gray-700 rounded-md p-3 flex items-center justify-between">
            <Input placeholder="Height" type="number" className="bg-transparent border-none text-white w-2/3" />
            <div className="flex items-center space-x-2">
              <span className="text-gray-400">cm</span>
              <Switch id="height-unit" className="data-[state=checked]:bg-cyan-400" />
              <span className="text-white">in</span>
            </div>
          </div>
          <div className="bg-gray-800 border border-gray-700 rounded-md p-3 flex items-center justify-between">
            <Input placeholder="Weight" type="number" className="bg-transparent border-none text-white w-2/3" />
            <div className="flex items-center space-x-2">
              <span className="text-gray-400">kg</span>
              <Switch id="weight-unit" className="data-[state=checked]:bg-cyan-400" />
              <span className="text-white">lb</span>
            </div>
          </div>
        </div>

        <div className="flex items-center space-x-2">
          <Switch id="ideal-weight-toggle" className="data-[state=checked]:bg-cyan-400" />
          <Label htmlFor="ideal-weight-toggle" className="text-white">I have an ideal weight</Label>
        </div>
        
        <Input placeholder="Ideal Weight" className="bg-gray-800 border-gray-700 text-white placeholder:text-gray-400" />
        
        <Button
          type="submit"
          className="w-full bg-cyan-400 text-black font-bold text-lg hover:bg-cyan-500"
          size="lg"
        >
          Confirm
        </Button>
      </form>
    </div>
  );
}