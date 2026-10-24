import Image from "next/image";

import logoImg from "../public/images/logo.svg";

/** Full-screen logo shown while the app starts or a page is loading. */
export default function SplashScreen() {
  return (
    <div className="h-screen flex items-center justify-center bg-black-rich">
      <Image alt="Logo Image" src={logoImg} />
    </div>
  );
}
