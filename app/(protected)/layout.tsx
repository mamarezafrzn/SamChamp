import { ReactNode } from "react";

import SessionCheck from "@/components/session-check";

/**
 * Shared layout for pages that need a logged-in user. The `(protected)` folder
 * groups them without adding to the URL; the middleware guards the same routes.
 */
export default function ProtectedLayout({ children }: { children: ReactNode }) {
  return (
    <>
      <SessionCheck />
      {children}
    </>
  );
}
