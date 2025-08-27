import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

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

type Success<T> = {
  data: T
  error: null
}

type Failure<E> = {
  data: null
  error: E
}

type Result<T, E = Error> = Success<T> | Failure<E>

async function tryCatch<T, E = Error>(
  fn: () => Promise<T>
): Promise<Result<T, E>> {
  const data = await fn()

  return data
}
