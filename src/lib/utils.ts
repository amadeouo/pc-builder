import {
  ClassValue,
  clsx
} from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

const PUBLIC_PATHS = new Set(['/login', '/signup'])

export function isPublicPath(path: string) {
  if (PUBLIC_PATHS.has(path)) return true
  return path.startsWith('/api/');
}

export function getTabName(path: string) {
  if (path.startsWith("/dashboard")) return "dashboard"
  if (path.startsWith("/builds/explore")) return "explore"
  if (path === "/builds") return "builds"
  return ""
}