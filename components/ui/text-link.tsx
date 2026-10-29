import { ComponentProps } from "react";
import Link from "next/link";

import { cn } from "@/lib/cn";

/** An in-text link in the primary colour. */
export default function TextLink({
  className,
  ...props
}: ComponentProps<typeof Link>) {
  return <Link className={cn("text-primary", className)} {...props} />;
}
