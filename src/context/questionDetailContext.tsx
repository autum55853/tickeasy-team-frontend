import { createContext } from "react";
interface QuestionDetailContextType {
  activeQuestion: string;
  setActiveQuestion: (value: string) => void;
}
export const QuestionDetailContext = createContext<QuestionDetailContextType | undefined>(undefined);
