"use client";

import { FC, SubmitEvent, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";

import { APP_ROUTES } from "@/app/constants/appRoutes";

import FormButton from "@/components/form/form-button";
import FormInput from "@/components/form/form-input";

import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { login } from "@/store/slices/auth/authActions";

import { validateEmail, validatePassword } from "@/utils/validation";

import frameImg from "../../../public/images/login-frame.svg";
import AuthPlatforms from "../components/auth-platforms";

const Login: FC = () => {
  const dispatch = useAppDispatch();

  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({
    email: "",
    password: "",
  });

  // A logged-in user has nothing to do here, so send them to their profile.
  const { user } = useAppSelector((state) => state.auth);
  if (user) {
    router.push(APP_ROUTES.PROFILE.EDIT_ACCOUNT);
  }

  const emailChangeHandler = (value: string) => {
    setEmail(value);
  };
  const passwordChangeHandler = (value: string) => {
    setPassword(value);
  };

  const handleSubmit = (e: SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();
    const newErrors = {
      email: validateEmail(email),
      password: validatePassword(password),
    };
    setErrors(newErrors);
    const isValid = Object.values(newErrors).every((error) => !error);
    if (isValid) {
      dispatch(login({ email, password }));
    }
  };
  return (
    <div className="w-full min-h-screen relative">
      <div className="absolute bottom-0 w-full max-h-full overflow-y-auto">
        <Image
          src={frameImg}
          alt="Frame image"
          className="w-auto mb-[-4%] mx-auto"
        />
        <div className="rounded-t-[2rem] bg-grey-charcoal p-6 pt-10">
          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <h1 className="mb-2">Login</h1>
            <FormInput
              label="E-mail"
              placeholder="name@example.com"
              type="text"
              sendValue={emailChangeHandler}
              error={errors.email}
            />
            <FormInput
              label="Password"
              placeholder="Strong#Pass1"
              type="password"
              sendValue={passwordChangeHandler}
              error={errors.password}
            />
            <p className="text-right text-white-ash font-normal text-sm">
              Forgot your password?{" "}
              <Link href="/auth/new-password" className="text-yellow-sun">
                click here
              </Link>
            </p>
            <FormButton type="submit" title="Login" styles="my-2" />
          </form>
          <AuthPlatforms />
          <p className="text-center text-white-ash font-normal text-sm">
            Not a member?{" "}
            <Link href="/auth/register" className="text-yellow-sun">
              Register now
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
