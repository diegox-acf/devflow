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
