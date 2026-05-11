import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

const PUBLIC_PATHS = new Set(['/login', '/signup'])

export function isPublicPath(path: string) {
  if (PUBLIC_PATHS.has(path)) return true
  return path.startsWith('/api/');
}