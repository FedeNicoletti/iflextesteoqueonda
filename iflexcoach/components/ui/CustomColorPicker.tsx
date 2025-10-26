"use client";
import * as React from "react";
import Saturation from "@uiw/react-color-saturation";
import Hue from "@uiw/react-color-hue";
import Alpha from "@uiw/react-color-alpha";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { ArrowRightLeft } from "lucide-react";
import { colord } from "colord";
import { cn } from "@/lib/utils";
import { TinyColor } from "@ctrl/tinycolor"; // Importar el helper de color

type CustomColorPickerProps = {
  color: string; // El color (en cualquier formato: hex, rgba, etc.)
  onChange: (newColor: string) => void;
  backgroundColor?: string;
};

export function CustomColorPicker({
  color: parentColor,
  onChange,
  backgroundColor = "#030712",
}: CustomColorPickerProps) {
  
  // Esta librería funciona con HSVa
  const [hsva, setHsva] = React.useState(() => new TinyColor(parentColor).toHsv());

  // Sincronizar estado padre cuando el estado interno (hsva) cambia
  const handleColorChange = (newHsva: typeof hsva) => {
    setHsva(newHsva);
    onChange(new TinyColor(newHsva).toHex8String()); // Pasamos hex8 (con alpha)
  };

  // Sincronizar estado interno si el estado padre cambia
  React.useEffect(() => {
    setHsva(new TinyColor(parentColor).toHsv());
  }, [parentColor]);

  // Lógica de accesibilidad
  const { isAccessible, ratio } = React.useMemo(() => {
    const c = colord(new TinyColor(hsva).toRgbString());
    const contrastRatio = c.contrast(backgroundColor);
    return { isAccessible: contrastRatio >= 4.5, ratio: contrastRatio.toFixed(2) };
  }, [hsva, backgroundColor]);

  // Lógica para los inputs
  const hex = React.useMemo(() => new TinyColor(hsva).toHexString(), [hsva]);
  const alphaPercent = React.useMemo(() => `${Math.round(hsva.a * 100)}%`, [hsva.a]);

  const handleHexChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newColor = new TinyColor(e.target.value);
    if (newColor.isValid) {
      handleColorChange(newColor.toHsv());
    }
  };

  return (
    <div className="w-full space-y-4 p-4 bg-gray-900 rounded-lg">
      {/* 1. Panel de Saturación (Cuadrado grande) */}
      <div className="w-full h-40 rounded-md overflow-hidden relative">
        <Saturation
          hsva={hsva}
          onChange={handleColorChange}
        />
      </div>

      {/* 2. Slider de Matiz (Hue) */}
      <div className="w-full h-6 rounded-lg overflow-hidden relative">
        <Hue
          hue={hsva.h}
          onChange={handleColorChange}
        />
      </div>
      
      {/* 3. Slider de Opacidad (Alpha) */}
      <div className="w-full h-6 rounded-lg overflow-hidden relative">
        <Alpha
          hsva={hsva}
          onChange={handleColorChange}
        />
      </div>

      {/* 4. Inputs Personalizados (Hex y Alpha) */}
      <div className="flex w-full">
        <Button
          type="button"
          variant="outline"
          className="bg-gray-800 border-gray-700 text-gray-400 rounded-r-none border-r-0"
        >
          Hex <ArrowRightLeft className="w-4 h-4 ml-2" />
        </Button>
        <Input
          value={hex.toUpperCase()}
          onChange={handleHexChange}
          className="bg-gray-800 border-gray-700 text-white rounded-none border-r-0 focus-visible:ring-0"
        />
        <Input
          value={alphaPercent}
          readOnly // El slider de Alpha controla esto
          className="bg-gray-800 border-gray-700 text-white rounded-l-none w-20 text-center focus-visible:ring-0"
        />
      </div>
      
      {/* 5. Mensaje de Accesibilidad */}
      <p className={cn(
        "text-sm",
        isAccessible ? "text-green-500" : "text-red-500"
      )}>
        {isAccessible 
          ? `Your color passes our accessibility checks. (Ratio: ${ratio})`
          : `This color might be hard to read. (Ratio: ${ratio})`
        }
      </p>
    </div>
  );
}