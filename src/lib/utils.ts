import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import dayjs, {Dayjs} from "dayjs";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function shuffle<T>(array: T[]) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    const temp = array[i];
    array[i] = array[j];
    array[j] = temp;
  }

  return array;
}

export function getAllDays(): Dayjs[] {
  const startDate = dayjs("2024-12-20");
  const endDate = dayjs("2026-01-01");

  let currentDay = startDate.clone();

  const arr = [];
  while (currentDay.isBefore(endDate)) {
    arr.push(currentDay.clone());
    currentDay = currentDay.add(1, "day");
  }

  return arr;
}
