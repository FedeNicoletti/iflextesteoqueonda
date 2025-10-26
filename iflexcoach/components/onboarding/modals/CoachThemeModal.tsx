"use client";
import * as React from "react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";

// --- INICIO DE LA CORRECCIÓN ---
import { colord } from "colord";
import a11yPlugin from "colord/plugins/a11y"; // 1. Importar el plugin

colord.extend([a11yPlugin]); // 2. Extender la instancia de colord
// --- FIN DE LA CORRECCIÓN ---

type ModalProps = {
  open: boolean;
  setOpen: (open: boolean) => void;
};

export function CoachThemeModal({ open, setOpen }: ModalProps) {
  const [useDefault, setUseDefault] = React.useState(true);
  const [customColors, setCustomColors] = React.useState({
    primary: "#34D399", // Un verde como ejemplo
    secondary: "#F59E0B", // Un ámbar
  });

  // Colores por defecto del diseño
  const defaultColors = ["#FFFFFF", "#38BDF8", "#F59E0B", "#FCA5A5"];

  // --- Lógica de Accesibilidad (CORREGIDA) ---
  const checkContrast = (colorA: string, colorB: string) => {
    // 3. Usar el método .contrast() del plugin
    const ratio = colord(colorA).contrast(colorB); 
    // WCAG AA requiere 4.5:1 para texto normal
    return { ratio, isAccessible: ratio >= 4.5 };
  };
  
  // (El resto de la lógica es la misma)
  const { isAccessible: defaultAccessible } = checkContrast(defaultColors[1], "#000000");
  const { isAccessible: customAccessible } = checkContrast(customColors.primary, "#000000");

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      {/* Usamos max-w-7xl para un modal bien ancho, como el del diseño */}
      <DialogContent className="bg-gray-900 border-gray-700 text-white max-w-7xl p-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          
          {/* Columna 1: Opciones */}
          <div className="md:col-span-1 space-y-6">
            <div className="flex items-center justify-between p-4 bg-gray-800 rounded-lg">
              <Label htmlFor="default-colors" className="text-white text-lg">
                Use default app colors
                <p className="text-gray-400 text-sm">
                  These colors are optimized for accessibility and contrast.
                </p>
              </Label>
              <Switch
                id="default-colors"
                checked={useDefault}
                onCheckedChange={setUseDefault}
                className="data-[state=checked]:bg-cyan-400"
              />
            </div>
            
            <div className="flex items-center justify-between p-4 bg-gray-800 rounded-lg">
              <Label htmlFor="custom-colors" className="text-white text-lg">
                Use customized app colors
              </Label>
              <Switch
                id="custom-colors"
                checked={!useDefault}
                onCheckedChange={(checked) => setUseDefault(!checked)}
                className="data-[state=checked]:bg-cyan-400"
              />
            </div>

            <div className="flex gap-4">
              {defaultColors.map((color) => (
                <div
                  key={color}
                  className="w-12 h-12 rounded-lg"
                  style={{ backgroundColor: color }}
                />
              ))}
            </div>
            
            <Button
              onClick={() => setOpen(false)}
              className="w-full bg-cyan-400 text-black font-bold text-lg hover:bg-cyan-500"
            >
              Confirm
            </Button>
          </div>

          {/* Columna 2: Preview del Dashboard */}
          <div className="md:col-span-3">
            <h3 className="text-gray-400 text-sm mb-2">Dashboard</h3>
            {/* Aquí va el componente de PREVIEW. Usaré una imagen de placeholder */}
            <div className="w-full h-[500px] bg-gray-800 border border-gray-700 rounded-lg flex items-center justify-center">
              <p className="text-gray-500">Preview del Dashboard (WIP)</p>
              {/* <CoachDashboardPreview theme={useDefault ? defaultColors : customColors} /> */}
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}