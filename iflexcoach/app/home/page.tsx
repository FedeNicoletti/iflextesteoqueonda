import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function HomePage() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24">
      <h1 className="text-4xl font-bold mb-8">
        ¡Login Exitoso! Bienvenido a la Home.
      </h1>
      <p className="mb-4">
        Esta es la página principal (protegida).
      </p>
      <Button asChild variant="outline">
        <Link href="/">Volver al Login</Link>
      </Button>
    </main>
  );
}