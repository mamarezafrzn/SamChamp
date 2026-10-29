import Image from "next/image";

import logoImg from "@/public/images/logo.svg";

/** Full-screen logo shown while the app starts or a page is loading. */
export default function SplashScreen() {
  return (
    <div className="flex h-screen items-center justify-center bg-background">
      <Image alt="Logo Image" src={logoImg} />
    </div>
  );
}
