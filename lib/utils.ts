import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export const cn = (...inputs: ClassValue[]) => {
  return twMerge(clsx(inputs))
}

// Official BGN to EUR exchange rate (fixed by law)
export const FIXED_RATE = 1.95583

export type ConversionDirection = 'BGN_TO_EUR' | 'EUR_TO_BGN'

export interface ConversionResult {
  input: number
  raw: number
  rounded: number
  thirdDigit: number
  direction: ConversionDirection
  explanation: string
  isValid: boolean
}

export const roundToTwoDecimals = (value: number): { rounded: number; thirdDigit: number } => {
  const thirdDigit = Math.floor((value * 1000) % 10)
  const rounded = thirdDigit >= 5
    ? Math.ceil(value * 100) / 100
    : Math.floor(value * 100) / 100
  return { rounded, thirdDigit }
}

export const convertCurrency = (
  amount: number,
  direction: ConversionDirection
): ConversionResult => {
  const isValid = !isNaN(amount) && amount > 0

  if (!isValid) {
    return {
      input: amount,
      raw: 0,
      rounded: 0,
      thirdDigit: 0,
      direction,
      explanation: 'Моля въведете валидна сума',
      isValid: false
    }
  }

  let raw: number
  let fromCurrency: string
  let toCurrency: string

  if (direction === 'BGN_TO_EUR') {
    raw = amount / FIXED_RATE
    fromCurrency = 'BGN'
    toCurrency = 'EUR'
  } else {
    raw = amount * FIXED_RATE
    fromCurrency = 'EUR'
    toCurrency = 'BGN'
  }

  const { rounded, thirdDigit } = roundToTwoDecimals(raw)

  const explanation = thirdDigit >= 5
    ? `Третата цифра е ${thirdDigit} ≥ 5, закръгляване нагоре`
    : `Третата цифра е ${thirdDigit} < 5, закръгляване надолу`

  return {
    input: amount,
    raw,
    rounded,
    thirdDigit,
    direction,
    explanation,
    isValid: true
  }
} 