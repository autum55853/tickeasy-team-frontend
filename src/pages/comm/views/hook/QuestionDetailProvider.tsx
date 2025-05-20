import { useState, ReactNode } from "react";
import { QuestionDetailContext } from "@/context/questionDetailContext";

export function QuestionDetailProvider({ children }: { children: ReactNode }) {
  const [activeQuestion, setActiveQuestion] = useState<string>("");
  return <QuestionDetailContext.Provider value={{ activeQuestion, setActiveQuestion }}>{children}</QuestionDetailContext.Provider>;
}
