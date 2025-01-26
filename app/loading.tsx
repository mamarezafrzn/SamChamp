"use client";

import LoadingWrapper from "@/components/loading_wrapper";
import { useEffect, useState } from "react";

export default function Loading() {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    // Set a timer to hide the loading component after 2 seconds
    const timer = setTimeout(() => {
      setIsVisible(false);
    }, 2000); // 2 seconds

    return () => clearTimeout(timer); // Cleanup the timer when the component unmounts
  }, []);

  // Render the loading UI if it's still within the 2-second window
  if (!isVisible) return null;

  return (
    <div className="bg-black-rich w-full h-full">
        <p>Count to 3</p>
    </div>
  );
}
