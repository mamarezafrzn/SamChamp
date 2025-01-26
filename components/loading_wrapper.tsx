// components/LoadingWrapper.tsx
"use client";

import Image from "@/node_modules/next/image";
import { useEffect, useState } from "react";
import logoImg from "../public/images/logo.svg";

export default function LoadingWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  const [showLoading, setShowLoading] = useState(true);

  useEffect(() => {
    // Enforce a 2-second loading screen
    const timer = setTimeout(() => setShowLoading(false), 100);

    return () => clearTimeout(timer); // Cleanup timer on unmount
  }, []);

  if (showLoading) {
    return (
      <div className="h-screen flex items-center justify-center bg-black-rich">
        <Image alt="Logo Image" src={logoImg} />
      </div>
    );
  }

  return <>{children}</>;
}
