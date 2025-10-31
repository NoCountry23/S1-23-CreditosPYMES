// ✅ crea un nuevo archivo context.ts
// app/(client)/upload-data/context.ts
import { createContext } from "react";

export const StepContext = createContext<{
  step: number;
  setStep: React.Dispatch<React.SetStateAction<number>>;
} | null>(null);
