"use client";

import { ReactNode, useEffect, useState } from "react";

import SplashScreen from "./splash-screen";

const SPLASH_DURATION_MS = 100;

/** Shows the splash screen briefly on first load, then renders the app. */
export default function LoadingWrapper({ children }: { children: ReactNode }) {
  const [showLoading, setShowLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setShowLoading(false), SPLASH_DURATION_MS);
    return () => clearTimeout(timer);
  }, []);

  return showLoading ? <SplashScreen /> : <>{children}</>;
}
