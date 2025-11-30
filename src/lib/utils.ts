import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const getPaginationRange = (page: number, totalPages: number) => {
  const delta = 2;
  const range: (number | string)[] = [];

  // Always show first page
  range.push(0);

  // Pages around current page
  for (
    let i = Math.max(1, page - delta);
    i <= Math.min(totalPages - 2, page + delta);
    i++
  ) {
    range.push(i);
  }

  // Always show last page
  if (totalPages > 1) {
    range.push(totalPages - 1);
  }

  // Insert ellipsis correctly
  const rangeWithDots: (number | string)[] = [];
  let prevPage: number | null = null;

  for (const p of range) {
    if (typeof p !== "number") continue;

    if (prevPage !== null && p - prevPage > 1) {
      rangeWithDots.push("ellipsis");
    }

    rangeWithDots.push(p);
    prevPage = p;
  }

  return rangeWithDots;
};