import { FC } from "react";
import Image from "next/image";

import { useGoogleLogin } from "@react-oauth/google";

import { API_ROUTES } from "@/app/constants/apiRoutes";

import { API_BASE_URL } from "@/lib/api";

import appleImg from "../../../public/images/apple.svg";
import facebookImg from "../../../public/images/facebook.svg";
import googleImg from "../../../public/images/google.svg";

/** Social login buttons shown under the login and register forms. */
const AuthPlatforms: FC = () => {
  // TODO(step 7): send Google's token to the backend and only redirect on success.
  const login = useGoogleLogin({
    onSuccess: () => {
      fetch(`${API_BASE_URL}${API_ROUTES.AUTH.GOOGLE}`, {
        method: "GET",
        headers: { "Content-Type": "application/json" },
      })
        .then((res) => res.json())
        .then(() => {
          window.location.href = "/profile/edit-account";
        })
        .catch((error) => console.error("Google login failed:", error));
    },
    onError: () => {
      console.error("Google login failed");
    },
    flow: "implicit",
  });

  return (
    <div className="flex flex-col gap-6 my-4">
      <div className="flex flex-row gap-4 items-center">
        <div className="w-full h-px border-b border-grey-silver"></div>
        <p className="w-content whitespace-nowrap text-border-grey-silver text-grey-silver font-normal text-sm font-roboto">
          Or continue with
        </p>
        <div className="w-full h-full border-b border-grey-silver"></div>
      </div>
      <div className="flex flex-row gap-4">
        <button
          className="flex-1 rounded-lg bg-grey-slate py-3 px-10 h-12"
          onClick={() => login()}
        >
          <Image
            src={googleImg}
            alt="Login with google profile"
            className="mx-auto"
            width={24}
            height={24}
          />
        </button>
        <button className="flex-1 rounded-lg bg-grey-slate py-3 px-10 h-12">
          <Image
            src={appleImg}
            alt="Login with apple profile"
            className="mx-auto"
            width={24}
            height={24}
          />
        </button>
        <button className="flex-1 rounded-lg bg-grey-slate py-3 px-10 h-12">
          <Image
            src={facebookImg}
            alt="Login with facebook profile"
            className="mx-auto"
            width={24}
            height={24}
          />
        </button>
      </div>
    </div>
  );
};

export default AuthPlatforms;
