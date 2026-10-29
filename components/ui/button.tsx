import { ButtonHTMLAttributes } from "react";

import { cn } from "@/lib/cn";

const VARIANTS = {
  /** Main action: yellow with dark text (Figma "primary", size M). */
  primary:
    "h-12 w-full rounded-2xl bg-primary px-5 py-3 text-base font-medium text-primary-foreground hover:bg-primary-hover",
  /** Alternative action: dark with a gold border and yellow text (Figma "secondary", size M). */
  secondary:
    "h-12 w-full rounded-2xl border border-secondary-border bg-secondary px-5 py-3 text-base text-secondary-foreground",
  /** Small pill, e.g. "Skip". */
  chip: "rounded-3xl bg-chip px-4 py-1 text-white",
  /** Square-ish icon button, e.g. the social login buttons. */
  tile: "h-12 rounded-lg bg-tile px-10 py-3",
};

export type ButtonVariant = keyof typeof VARIANTS;

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
}

/** The app's only button style source; pass `className` for layout tweaks like margins. */
export default function Button({
  variant = "primary",
  type = "button",
  className,
  ...props
}: ButtonProps) {
  return (
    <button
      type={type}
      className={cn(
        VARIANTS[variant],
        "disabled:cursor-not-allowed disabled:opacity-60",
        className,
      )}
      {...props}
    />
  );
}
