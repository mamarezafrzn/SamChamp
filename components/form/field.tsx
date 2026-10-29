import { ReactNode } from "react";

import { cn } from "@/lib/cn";

/** Text style of every field label (and similar form captions). */
export const fieldLabel = "text-sm text-white";

/** The input box shared by text inputs and the birthday input. */
export const fieldBox = (hasError?: boolean) =>
  cn(
    "h-14 w-full rounded-2xl border border-subtle bg-field px-5 py-4",
    hasError && "border-danger",
  );

/** Error message shown under a single field. */
export function FieldError({ children }: { children: ReactNode }) {
  return <p className="text-danger">{children}</p>;
}
