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

export const getElapsedTime = (date: Date) => {
  const now = new Date();
  const elapsed = now.getTime() - date.getTime();

  const seconds = Math.floor(elapsed / 1000);
  const minutes = Math.floor(seconds / 60);
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);
  const weeks = Math.floor(days / 7);
  const months = Math.floor(days / 30);
  const years = Math.floor(days / 365);
  const timeUnits = [
    { unit: "year", value: years },
    { unit: "month", value: months },
    { unit: "week", value: weeks },
    { unit: "day", value: days },
    { unit: "hour", value: hours },
    { unit: "minute", value: minutes },
    { unit: "second", value: seconds },
  ];

  for (const { unit, value } of timeUnits) {
    if (value > 0) {
      return `${value} ${unit}(s) ago`;
    }
  }
};
