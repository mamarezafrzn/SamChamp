import { FC } from "react";
import Image from "next/image";

import { useGoogleLogin } from "@react-oauth/google";

import { API_ROUTES } from "@/app/constants/apiRoutes";
import { APP_ROUTES } from "@/app/constants/appRoutes";

import Button from "@/components/ui/button";

import { API_BASE_URL } from "@/lib/api";

import appleImg from "@/public/images/apple.svg";
import facebookImg from "@/public/images/facebook.svg";
import googleImg from "@/public/images/google.svg";

const PROVIDERS = [
  { name: "google", icon: googleImg },
  { name: "apple", icon: appleImg },
  { name: "facebook", icon: facebookImg },
];

/** Social login buttons shown under the login and register forms. */
const AuthPlatforms: FC = () => {
  // TODO: send Google's token to the backend and only redirect when it accepts it.
  const login = useGoogleLogin({
    onSuccess: () => {
      fetch(`${API_BASE_URL}${API_ROUTES.AUTH.GOOGLE}`, {
        method: "GET",
        headers: { "Content-Type": "application/json" },
      })
        .then((res) => res.json())
        .then(() => {
          window.location.href = APP_ROUTES.HOME;
        })
        .catch((error) => console.error("Google login failed:", error));
    },
    onError: () => {
      console.error("Google login failed");
    },
    flow: "implicit",
  });

  return (
    <div className="my-4 flex flex-col gap-6">
      <div className="flex flex-row items-center gap-4">
        <div className="h-px w-full border-b border-subtle"></div>
        <p className="whitespace-nowrap font-roboto text-sm text-subtle">
          Or continue with
        </p>
        <div className="h-full w-full border-b border-subtle"></div>
      </div>
      <div className="flex flex-row gap-4">
        {PROVIDERS.map((provider) => (
          <Button
            key={provider.name}
            variant="tile"
            className="flex-1"
            onClick={provider.name === "google" ? () => login() : undefined}
          >
            <Image
              src={provider.icon}
              alt={`Login with ${provider.name} profile`}
              className="mx-auto"
              width={24}
              height={24}
            />
          </Button>
        ))}
      </div>
    </div>
  );
};

export default AuthPlatforms;
