import type { Metadata } from "next";
import { Roboto, Rubik } from "next/font/google";

import { GoogleOAuthProvider } from "@react-oauth/google";

import LoadingWrapper from "@/components/loading-wrapper";

import "./globals.css";

import { Providers } from "./providers";

const roboto = Roboto({
  subsets: ["latin"],
  weight: ["400"], // only used for "Or continue with"
  variable: "--font-roboto",
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
        className={`${roboto.variable} ${rubik.variable} m-auto max-w-xl bg-background font-rubik antialiased`}
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
