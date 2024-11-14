import { techMap } from "@/constants";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const toPascalCase = (str: string) => {
  return str
    .toLowerCase()
    .replace(/(?:^|\s|_|\-)(\w)/g, (match, char) => char.toUpperCase());
};

export const getDevIconClassName = (techName: string) => {
  const normalizedTechName = techName.replace(/[\s.]/g, "").toLowerCase();
  return techMap[normalizedTechName]
    ? `${techMap[normalizedTechName]} colored`
    : "devicon-devicon-plain";
};
