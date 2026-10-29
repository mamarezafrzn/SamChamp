import { clsx, type ClassValue } from "clsx";
import { extendTailwindMerge } from "tailwind-merge";

// Teach tailwind-merge our custom tokens, so e.g. `text-heading` (a size)
// isn't mistaken for a text colour and dropped next to `text-white`.
const twMerge = extendTailwindMerge({
  extend: {
    theme: { borderRadius: ["card"] },
    classGroups: { "font-size": [{ text: ["heading"] }] },
  },
});

/** Joins class names, skips falsy ones, and lets later Tailwind classes override earlier ones. */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
