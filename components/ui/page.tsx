import { ReactNode } from "react";

import { cn } from "@/lib/cn";

interface PageProps {
  /** A string renders as the page's `h1`; pass an element for a custom header (e.g. a back button). */
  title: ReactNode;
  /** Optional element on the right of the header, e.g. a "Skip" button. */
  action?: ReactNode;
  className?: string;
  children?: ReactNode;
}

/** Standard page container: padding, spacing, and a header row. */
export default function Page({
  title,
  action,
  className,
  children,
}: PageProps) {
  return (
    <div className={cn("flex w-full flex-col gap-8 px-6 py-8", className)}>
      <div className="flex flex-row justify-between">
        {typeof title === "string" ? <h1>{title}</h1> : title}
        {action}
      </div>
      {children}
    </div>
  );
}
