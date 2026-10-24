import type { Metadata } from "next";
import { Geist, Roboto, Rubik } from "next/font/google";

import { GoogleOAuthProvider } from "@react-oauth/google";

import LoadingWrapper from "@/components/loading_wrapper";

import "./globals.css";

import { Providers } from "./providers";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});
const roboto = Roboto({
  subsets: ["latin"], // Subset to optimize font loading
  weight: ["400", "500", "700"], // Specify desired weights
  variable: "--font-roboto", // Optional: define a CSS variable
});

const rubik = Rubik({
  subsets: ["latin"],
  variable: "--font-rubik",
  weight: ["400", "500", "700"],
});

export const metadata: Metadata = {
  title: "SamChamp | MVP",
  description: "Let's Play",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${roboto.variable} ${rubik.variable} antialiased bg-black-rich max-w-xl m-auto`}
      >
        <GoogleOAuthProvider
          clientId={process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID!}
        >
          <Providers>
            <LoadingWrapper>{children}</LoadingWrapper>
          </Providers>
        </GoogleOAuthProvider>
      </body>
    </html>
  );
}
