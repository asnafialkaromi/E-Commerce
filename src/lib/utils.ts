import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function getPageNumbers(current: number, total: number) {
  const pages: (number | "...")[] = [];

  if (total <= 7) {
    // Show all
    return Array.from({ length: total }, (_, i) => i);
  }

  // Always show first
  pages.push(0);

  // Left ellipsis
  if (current > 2) {
    pages.push("...");
  }

  // Middle pages
  const start = Math.max(1, current - 1);
  const end = Math.min(total - 2, current + 1);

  for (let i = start; i <= end; i++) {
    pages.push(i);
  }

  // Right ellipsis
  if (current < total - 3) {
    pages.push("...");
  }

  // Always show last
  pages.push(total - 1);

  return pages;
}