import { ReactNode } from "react";
import Image, { type StaticImageData } from "next/image";

interface AuthLayoutProps {
  /** Illustration above the card. */
  image: StaticImageData;
  /** Size and overlap of the illustration, which differ per page. */
  imageClassName: string;
  children: ReactNode;
}

/** Shell of the auth pages: illustration on top, rounded card at the bottom. */
export default function AuthLayout({
  image,
  imageClassName,
  children,
}: AuthLayoutProps) {
  return (
    <div className="relative min-h-screen w-full">
      <div className="absolute bottom-0 max-h-full w-full overflow-y-auto">
        <Image src={image} alt="Frame image" className={imageClassName} />
        <div className="rounded-t-card bg-surface p-6 pt-10">{children}</div>
      </div>
    </div>
  );
}
