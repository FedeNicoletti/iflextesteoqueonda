"use client"
import * as React from "react"
import * as ProgressPrimitive from "@radix-ui/react-progress"

import { cn } from "@/lib/utils"

// 1. Extendemos las Props para que acepte "indicatorClassName"
interface ProgressProps extends React.ComponentProps<typeof ProgressPrimitive.Root> {
  indicatorClassName?: string;
}

// 2. Usamos las nuevas Props
const Progress = React.forwardRef<
  React.ElementRef<typeof ProgressPrimitive.Root>,
  ProgressProps // <-- Cambio aquí
>(({ className, value, indicatorClassName, ...props }, ref) => ( // 3. Extraemos "indicatorClassName"
  <ProgressPrimitive.Root
    ref={ref}
    // 4. Aplicamos los estilos de TU DISEÑO (h-1, bg-gray-800)
    className={cn(
      "relative h-1 w-full overflow-hidden rounded-full bg-gray-800", 
      className
    )}
    {...props}
  >
    <ProgressPrimitive.Indicator
      // 5. Aplicamos el "indicatorClassName" al indicador cyan
      className={cn(
        "h-full w-full flex-1 transition-all",
        indicatorClassName // <-- Aquí lo usamos
      )}
      style={{ transform: `translateX(-${100 - (value || 0)}%)` }}
    />
  </ProgressPrimitive.Root>
))
Progress.displayName = ProgressPrimitive.Root.displayName

export { Progress }