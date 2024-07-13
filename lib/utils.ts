import { type ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'
import { customAlphabet } from 'nanoid'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function genId(pfx: string) {
  const nanoid = customAlphabet('0123456789abcdefghijklmnopqrstuvwxyz', 10)
  return [pfx, nanoid()].join('_')
}

export function generateRandomSixDigitNumber(): string {
  const randomNum = Math.floor(Math.random() * 1000000)
  const randomSixDigitStr = randomNum.toString().padStart(6, '0')
  return randomSixDigitStr
}

export function formatPhoneNumber(phoneNumber: string): string {
  // Entferne alle Leerzeichen
  const cleanedNumber = phoneNumber.replace(/\s+/g, '')

  // Ersetze führende 0 durch +49
  const formattedNumber = cleanedNumber.replace(/^0/, '+49')

  return formattedNumber
}

export function formatDateLong(date: Date): string {
  const year = date.getFullYear()
  const month = (date.getMonth() + 1).toString().padStart(2, '0')
  const day = date.getDate().toString().padStart(2, '0')
  const hours = date.getHours().toString().padStart(2, '0')
  const minutes = date.getMinutes().toString().padStart(2, '0')
  const seconds = date.getSeconds().toString().padStart(2, '0')

  return `${day}.${month}.${year} ${hours}:${minutes}:${seconds}`
}

export function formatDate(date: Date): string {
  const now = new Date()
  const diffInMs = now.getTime() - date.getTime()
  const diffInHours = diffInMs / (1000 * 60 * 60)
  const diffInDays = diffInMs / (1000 * 60 * 60 * 24)

  const hours = date.getHours().toString().padStart(2, '0')
  const minutes = date.getMinutes().toString().padStart(2, '0')

  if (diffInHours < 24) {
    // Innerhalb der letzten 24 Stunden: nur die Uhrzeit
    return `${hours}:${minutes}`
  } else if (diffInDays < 7) {
    // Innerhalb der letzten 7 Tage: Wochentag + Zeit
    const daysOfWeek = [
      'Sonntag',
      'Montag',
      'Dienstag',
      'Mittwoch',
      'Donnerstag',
      'Freitag',
      'Samstag',
    ]
    const dayOfWeek = daysOfWeek[date.getDay()]
    return `${dayOfWeek}`
  } else {
    // Älter: tt.mm.jjjj
    const year = date.getFullYear()
    const month = (date.getMonth() + 1).toString().padStart(2, '0')
    const day = date.getDate().toString().padStart(2, '0')
    return `${day}.${month}.${year}`
  }
}

export function formatDateDMY(date: Date): string {
  const year = date.getFullYear()
  const month = (date.getMonth() + 1).toString().padStart(2, '0')
  const day = date.getDate().toString().padStart(2, '0')

  return `${day}.${month}.${year}`
}

export const suggestions = [
  'Reciever',
  'Monitor',
  'Audio',
  'Laptop',
  'Headphone',
  'Smartphone',
  'Tablet',
  'Smartwatch',
  'Printer',
  'Camera',
  'Speaker',
  'Projector',
  'Game Console',
  'Drone',
  'Router',
  'Hard Drive',
  'SSD',
  'Keyboard',
  'Mouse',
  'Graphics Card',
  'Motherboard',
  'Power Supply',
  'RAM',
  'Cooling System',
  'VR Headset',
  'E-Reader',
  'Fitness Tracker',
  'Charger',
]

export const largestGermanCities = [
  'Berlin',
  'Hamburg',
  'München',
  'Köln',
  'Frankfurt am Main',
  'Stuttgart',
  'Düsseldorf',
  'Leipzig',
  'Dortmund',
  'Essen',
  'Bremen',
  'Dresden',
  'Hannover',
  'Nürnberg',
  'Duisburg',
  'Bochum',
  'Wuppertal',
  'Bielefeld',
  'Bonn',
  'Münster',
]
