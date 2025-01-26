import { FC } from "react";

import googleImg from "../../../public/images/google.svg";
import appleImg from "../../../public/images/apple.svg";
import facebookImg from "../../../public/images/facebook.svg";

import { useDispatch } from "react-redux";
import { auth, authPlatforms } from "@/store/slices/auth/authActions";
import { API_ROUTES } from "@/app/constants/apiRoutes";
import axios from "axios";
import { GoogleLogin } from "react-google-login";
import { APP_ROUTES } from "@/app/constants/appRoutes";
import { GoogleOAuthProvider, useGoogleLogin } from "@react-oauth/google";
import Image from "next/image";

//Shows login options using platforms

const AuthPlatforms: FC = () => {
  const dispatch = useDispatch();
  // const authClickHandler = (platform: string) => {
  // dispatch(authPlatforms(API_ROUTES.AUTH[platform]));
  // };
  const login = useGoogleLogin({
    onSuccess: (tokenResponse) => {
      console.log("Google Login Success:", tokenResponse);
      // Send the token to your backend for verification
      fetch(`${API_ROUTES.MAIN}${API_ROUTES.AUTH.GOOGLE}`, {
        method: "GET",
        headers: { "Content-Type": "application/json" },
      })
      .then((res) => res.json())
        .then((data) => {
          console.log('Backend response:', data);
          // Redirect to dashboard or other page upon successful login
          window.location.href = '/profile/edit-account';
        })
        .catch((error) => console.error("Error:", error));
    },
    onError: () => {
      console.error("Google Login Failed");
    },
    flow: "implicit", // or 'auth-code' for backend authentication
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
          // onClick={() => authClickHandler("GOOGLE")}
          className="flex-1 rounded-lg bg-grey-slate py-3 px-10 h-12"
          onClick={login}
        >
          <Image
            src={googleImg}
            alt="Login with google profile"
            className="mx-auto"
            width={24}
            height={24}
          />
        </button>
        <button
          // onClick={() => authClickHandler("APPLE")}
          className="flex-1 rounded-lg bg-grey-slate py-3 px-10 h-12"
        >
          <Image
            src={appleImg}
            alt="Login with apple profile"
            className="mx-auto"
            width={24}
            height={24}
          />
        </button>{" "}
        <button
          // onClick={() => authClickHandler("FACEBOOK")}
          className="flex-1 rounded-lg bg-grey-slate py-3 px-10 h-12"
        >
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
