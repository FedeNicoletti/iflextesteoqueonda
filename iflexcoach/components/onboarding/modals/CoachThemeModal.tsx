"use client";
import * as React from "react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";
import { colord, extend } from "colord";
import a11yPlugin from "colord/plugins/a11y";

// Importar nuestro nuevo componente
import { CustomColorPicker } from "@/components/ui/CustomColorPicker";

extend([a11yPlugin]);

type ModalProps = {
  open: boolean;
  setOpen: (open: boolean) => void;
};

export function CoachThemeModal({ open, setOpen }: ModalProps) {
  const [useDefault, setUseDefault] = React.useState(true);
  
  // Estados para los dos selectores de color
  const [primaryColor, setPrimaryColor] = React.useState("#002EE6");
  const [secondaryColor, setSecondaryColor] = React.useState("#C7F21F");

  // Colores por defecto del diseño
  const defaultColors = ["#FFFFFF", "#38BDF8", "#F59E0B", "#FCA5A5"];

  // Generar los 4 swatches del tema
  const themeSwatches = React.useMemo(() => {
    if (useDefault) return defaultColors;
    
    // Generar tintes/sombras para los otros 2 swatches
    const primaryTint = colord(primaryColor).lighten(0.2).toHex();
    const secondaryTint = colord(secondaryColor).lighten(0.2).toHex();
    return [primaryColor, primaryTint, secondaryColor, secondaryTint];

  }, [useDefault, primaryColor, secondaryColor]);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="bg-gray-950 border-gray-800 text-white max-w-7xl p-0">
        <DialogTitle className="sr-only">Customize your theme</DialogTitle>
        <div className="flex flex-row">
          
          {/* Columna 1: Opciones */}
          <div className="w-96 p-8 space-y-6 border-r border-gray-800 flex flex-col overflow-y-auto max-h-[90vh]">
            
            <div className="flex-1 space-y-6">
              {/* Toggle 1: Default */}
              <div className="flex items-center justify-between p-4 bg-gray-800 rounded-lg">
                <Label htmlFor="default-colors" className="text-white text-lg">
                  Use default app colors
                  <p className="text-gray-400 text-sm">
                    Optimized for accessibility.
                  </p>
                </Label>
                <Switch
                  id="default-colors"
                  checked={useDefault}
                  onCheckedChange={setUseDefault}
                  className="data-[state=checked]:bg-cyan-400"
                />
              </div>
              
              {/* Toggle 2: Custom */}
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

              {/* Contenedor de Selectores de Color */}
              {!useDefault && (
                <div className="space-y-6">
                  {/* Selector de Color 1 */}
                  <CustomColorPicker 
                    color={primaryColor} 
                    onChange={setPrimaryColor} 
                  />
                  {/* Selector de Color 2 */}
                  <CustomColorPicker 
                    color={secondaryColor} 
                    onChange={setSecondaryColor} 
                  />
                </div>
              )}
            </div>
            
            {/* Swatches de Tema */}
            <div className="pt-6 border-t border-gray-700">
              <h4 className="text-white font-semibold mb-3">
                Your customized color theme
              </h4>
              <div className="flex gap-4">
                {themeSwatches.map((color, index) => ( // 1. Añadimos 'index'
                  <div
                    key={`${color}-${index}`} // 2. Usamos el index para una key única
                    className="w-12 h-12 rounded-lg border border-gray-700"
                    style={{ backgroundColor: color }}
                  />
                ))}
              </div>
            </div>

            {/* Botón Confirm */}
            <Button
              onClick={() => setOpen(false)}
              className="w-full bg-cyan-400 text-black font-bold text-lg hover:bg-cyan-500"
            >
              Confirm
            </Button>
          </div>

          {/* Columna 2: Preview del Dashboard */}
          <div className="flex-1 p-8 bg-gray-900">
            <h3 className="text-gray-400 text-sm mb-2">Dashboard</h3>
            <div className="w-full h-[600px] bg-gray-800/50 border border-gray-700 rounded-lg flex items-center justify-center">
              <p className="text-gray-500">Preview del Dashboard (WIP)</p>
            </div>
          </div>

        </div>
      </DialogContent>
    </Dialog>
  );
}