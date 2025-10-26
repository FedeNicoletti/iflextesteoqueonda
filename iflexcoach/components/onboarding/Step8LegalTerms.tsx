"use client";
import * as React from "react";
import { Button } from "@/components/ui/button";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Checkbox } from "@/components/ui/checkbox";
import { Card, CardContent } from "@/components/ui/card";
import { Download, FileText } from "lucide-react";
import { cn } from "@/lib/utils";

type Props = {
  onSubmit: (data: { legalAccepted: boolean }) => void;
};

export function Step8LegalTerms({ onSubmit }: Props) {
  const [appTerms, setAppTerms] = React.useState(false);
  const [coachTerms, setCoachTerms] = React.useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (appTerms && coachTerms) {
      onSubmit({ legalAccepted: true });
    } else {
      alert("Please accept all terms and conditions to continue.");
    }
  };

  const appTermsList = [
    "Acceptance of terms", "Assumption of risk", "Not a substitute for medical advice",
    "Limitation of liability", "Termination", "Usage requirements", "Disclaimer of liability",
    "Intellectual property", "Contact information"
  ];
  
  const coachDocsList = [
    { title: "Trainee Waiver and Release of Liability", badge: "Signature required" },
    { title: "Informed Consent for Training Programs", badge: "Signed" },
  ];

  return (
    <div className="flex flex-col items-center w-full max-w-lg">
      <h2 className="text-3xl text-white mb-6 text-center font-semibold">
        App Terms and conditions
      </h2>
      <Accordion type="multiple" className="w-full bg-gray-900 rounded-lg p-4">
        {appTermsList.map((item, index) => (
          <AccordionItem key={index} value={`item-${index}`} className="border-gray-700">
            <AccordionTrigger className="text-white text-lg hover:no-underline">{item}</AccordionTrigger>
            <AccordionContent className="text-gray-400">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit...
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
      <div className="flex items-center space-x-2 w-full mt-4">
        <Checkbox 
          id="app-terms" 
          checked={appTerms}
          onCheckedChange={(checked) => setAppTerms(checked as boolean)}
          className="data-[state=checked]:bg-cyan-400"
        />
        <label htmlFor="app-terms" className="text-sm text-white">
          I have read and accept the App Terms and Conditions
        </label>
      </div>

      <h2 className="text-3xl text-white mb-6 mt-12 text-center font-semibold">
        Coach Legal documents
      </h2>
      <div className="w-full space-y-4">
        {coachDocsList.map((doc, index) => (
          <Card key={index} className="bg-gray-800 border-gray-700 text-white overflow-hidden">
            <CardContent className="p-4">
              {/* Placeholder para la vista previa del documento */}
              <div className="w-full h-32 bg-gray-700 rounded-md flex items-center justify-center mb-4">
                <FileText className="w-16 h-16 text-gray-500" />
              </div>
              <div className="flex justify-between items-center">
                <div>
                  <h3 className="font-semibold">{doc.title}</h3>
                  {doc.badge && (
                    <span className={cn(
                      "text-xs font-bold px-2 py-0.5 rounded-full mt-1 inline-block",
                      doc.badge === "Signed" ? "bg-green-800 text-green-300" : "bg-yellow-800 text-yellow-300"
                    )}>
                      {doc.badge}
                    </span>
                  )}
                </div>
                <Button variant="ghost" size="icon">
                  <Download className="w-5 h-5 text-gray-400" />
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
      <div className="flex items-center space-x-2 w-full mt-4">
        <Checkbox 
          id="coach-terms" 
          checked={coachTerms}
          onCheckedChange={(checked) => setCoachTerms(checked as boolean)}
          className="data-[state=checked]:bg-cyan-400"
        />
        <label htmlFor="coach-terms" className="text-sm text-white">
          I have read and accept the Coach Terms and Conditions
        </label>
      </div>

      <form onSubmit={handleSubmit} className="w-full mt-8">
        <Button
          type="submit"
          className="w-full bg-cyan-400 text-black font-bold text-lg hover:bg-cyan-500"
          size="lg"
        >
          Accept & Connect {/* <-- Texto cambiado (mejora de UX) */}
        </Button>
      </form>
    </div>
  );
}