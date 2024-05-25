import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"
import { customAlphabet } from 'nanoid'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function genId(pfx: string) {
  const nanoid = customAlphabet('0123456789abcdefghijklmnopqrstuvwxyz', 10)
  return [pfx, nanoid()].join('_')
}

export function generateRandomSixDigitNumber(): string {
  const randomNum = Math.floor(Math.random() * 1000000);
  const randomSixDigitStr = randomNum.toString().padStart(6, '0');
  return randomSixDigitStr;
}