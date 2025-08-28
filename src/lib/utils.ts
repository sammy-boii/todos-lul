import { type Result } from '@/types'
import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'
import { ZodError } from 'zod'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const normalizeName = (name: string) => {
  return name
    .trim()
    .replace(/[^a-z\s\d-]/gi, '')
    .replace(/\s+/g, ' ')
    .toLowerCase()
    .replace(/\b\w/g, (char) => char.toUpperCase())
}

export async function tryCatch<T>(
  fn: () => Promise<T>,
  ctx?: string
): Promise<Result<T>> {
  try {
    const data = await fn()
    return { data, error: null }
  } catch (err) {
    if (err instanceof ZodError) {
      return {
        data: null,
        error: {
          ...err,
          message: `${err.issues[0].message} at ${err.issues[0].path}`
        }
      }
    }

    if (err instanceof Error) {
      return {
        data: null,
        error: {
          ...err,
          message:
            `An error occurred ${ctx ? `while ${ctx}` : ''}: ` + err.message
        }
      }
    }

    return {
      error: new Error(`Unkown error ${ctx ? `while ${ctx}` : ''}:`),
      data: null
    }
  }
}
