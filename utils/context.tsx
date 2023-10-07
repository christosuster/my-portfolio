import { TemplateType } from "@/types/TemplateType";
import { createContext } from "react";

export const dataContext = createContext<TemplateType | null>(null);
