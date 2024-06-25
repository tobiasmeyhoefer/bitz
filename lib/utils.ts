import { type ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'
import { customAlphabet } from 'nanoid'
import { getPlaiceholder } from 'plaiceholder'

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

export function convertPostcodeToCity(postcode: string): string {
  switch (true) {
    case postcode.startsWith('0'):
      if (postcode.startsWith('04')) {
        return 'Leipzig'
      }
      if (postcode.startsWith('01')) {
        return 'Dresden'
      }
      return 'Deutschland'
    case postcode.startsWith('1'):
      if (postcode.startsWith('144')) {
        return 'Potsdam'
      }
      if (postcode.startsWith('18')) {
        return 'Rostock'
      }
      return 'Berlin'
    case postcode.startsWith('2'):
      if (postcode.startsWith('20') || postcode.startsWith('21') || postcode.startsWith('22')) {
        return 'Hamburg'
      }
      if (postcode.startsWith('28')) {
        return 'Bremen'
      }
      if (postcode.startsWith('24')) {
        return 'Kiel'
      }
      return 'Deutschland'
    case postcode.startsWith('3'):
      if (postcode.startsWith('30')) {
        return 'Hannover'
      }
      if (postcode.startsWith('33')) {
        return 'Bielefeld'
      }
      if (postcode.startsWith('34')) {
        return 'Kassel'
      }
      if (postcode.startsWith('39')) {
        return 'Magdeburg'
      }
      return 'Deutschland'
    case postcode.startsWith('4'):
      if (postcode.startsWith('40')) {
        return 'Düsseldorf'
      }
      if (postcode.startsWith('42')) {
        return 'Wuppertal'
      }
      if (
        postcode.startsWith('443') ||
        postcode.startsWith('444') ||
        postcode.startsWith('445') ||
        postcode.startsWith('446')
      ) {
        return 'Dortmund'
      }
      if (postcode.startsWith('447') || postcode.startsWith('448') || postcode.startsWith('449')) {
        return 'Bochum'
      }
      if (postcode.startsWith('45')) {
        return 'Essen'
      }
      if (postcode.startsWith('47')) {
        return 'Duisburg'
      }
      if (postcode.startsWith('48')) {
        return 'Münster'
      }
      return 'Deutschland'
    case postcode.startsWith('5'):
      if (postcode.startsWith('50') || postcode.startsWith('51')) {
        return 'Köln'
      }
      if (postcode.startsWith('52')) {
        return 'Aachen'
      }
      if (postcode.startsWith('53')) {
        return 'Bonn'
      }
      if (postcode.startsWith('55')) {
        return 'Mainz'
      }
      return 'Deutschland'
    case postcode.startsWith('6'):
      if (postcode.startsWith('60')) {
        return 'Frankfurt am Main'
      }
      if (postcode.startsWith('65')) {
        return 'Wiesbaden'
      }
      if (postcode.startsWith('66')) {
        return 'Saarbrücken'
      }
      if (postcode.startsWith('68')) {
        return 'Mannheim'
      }
      return 'Deutschland'
    case postcode.startsWith('7'):
      if (postcode.startsWith('70')) {
        return 'Stuttgart'
      }
      if (postcode.startsWith('76')) {
        return 'Karlsruhe'
      }
      if (postcode.startsWith('79')) {
        return 'Freiburg'
      }
      return 'Deutschland'
    case postcode.startsWith('8'):
      if (postcode.startsWith('80') || postcode.startsWith('81')) {
        return 'München'
      }
      if (postcode.startsWith('86')) {
        return 'Augsburg'
      }
      return 'Deutschland'
    case postcode.startsWith('9'):
      if (postcode.startsWith('90')) {
        return 'Nürnberg'
      }
      if (postcode.startsWith('93')) {
        return 'Regensburg'
      }
      return 'Deutschland'
    default:
      return 'Deutschland'
  }
}

export function formatPhoneNumber(phoneNumber: string): string {
  // Entferne alle Leerzeichen
  const cleanedNumber = phoneNumber.replace(/\s+/g, '')

  // Ersetze führende 0 durch +49
  const formattedNumber = cleanedNumber.replace(/^0/, '+49')

  return formattedNumber
}

export function formatDate(date: Date): string {
  const year = date.getFullYear()
  const month = (date.getMonth() + 1).toString().padStart(2, '0')
  const day = date.getDate().toString().padStart(2, '0')
  const hours = date.getHours().toString().padStart(2, '0')
  const minutes = date.getMinutes().toString().padStart(2, '0')
  const seconds = date.getSeconds().toString().padStart(2, '0')

  return `${day}.${month}.${year} ${hours}:${minutes}:${seconds}`
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

// export async function getImage(src: string) {
//   const buffer = await fetch(src).then(async res =>
//     Buffer.from(await res.arrayBuffer())
//   )

//   const {
//     metadata: { height, width },
//     ...plaiceholder
//   } = await getPlaiceholder(buffer, { size: 10 })

//   return {
//     ...plaiceholder,
//     img: { src, height, width }
//   }
// }
