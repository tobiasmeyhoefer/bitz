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

export function formatPhoneNumber(phoneNumber: string): string {
  // Entferne alle Leerzeichen
  const cleanedNumber = phoneNumber.replace(/\s+/g, '');
  
  // Ersetze führende 0 durch +49
  const formattedNumber = cleanedNumber.replace(/^0/, '+49');
  
  return formattedNumber;
}
