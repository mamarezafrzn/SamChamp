"use client";

import { FC, SubmitEvent, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";

import { APP_ROUTES } from "@/app/constants/appRoutes";

import FormButton from "@/components/form/form-button";
import FormInput from "@/components/form/form-input";

import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { register } from "@/store/slices/auth/authActions";

import { validateEmail, validatePassword } from "@/utils/validation";

import frameImg from "../../../public/images/register-frame.svg";
import AuthPlatforms from "../components/auth-platforms";

const Register: FC = () => {
  const dispatch = useAppDispatch();

  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errors, setErrors] = useState({
    email: "",
    password: "",
    confirmPassword: "",
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
  const confirmPasswordChangeHandler = (value: string) => {
    setConfirmPassword(value);
  };

  const handleSubmit = (e: SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();
    const newErrors = {
      email: validateEmail(email),
      password: validatePassword(password),
      confirmPassword:
        confirmPassword !== password ? "password does not match" : "",
    };
    setErrors(newErrors);
    const isValid = Object.values(newErrors).every((error) => !error);
    if (isValid) {
      dispatch(
        register({ email, password, password_confirmation: confirmPassword }),
      );
    }
  };

  return (
    <div className="w-full min-h-screen relative">
      <div className="absolute bottom-0 w-full max-h-full overflow-y-auto">
        <Image src={frameImg} alt="Frame image" className="w-full mb-[-8%]" />
        <div className="rounded-t-[2rem] bg-grey-charcoal p-6 pt-10">
          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <h1 className="mb-2">Register</h1>
            <FormInput
              label="E-mail"
              placeholder="name@example.com"
              type="text"
              sendValue={emailChangeHandler}
              error={errors.email}
            />
            <FormInput
              label="Password"
              placeholder="At least 8 characters"
              type="password"
              sendValue={passwordChangeHandler}
              error={errors.password}
            />
            <FormInput
              label="Confirm Password"
              placeholder="Re-type your password"
              type="password"
              sendValue={confirmPasswordChangeHandler}
              error={errors.confirmPassword}
            />
            <label
              htmlFor="terms"
              className="flex flex-row items-center text-white text-sm font-normal gap-2"
            >
              <input type="checkbox" id="terms" required />
              By registering, you will accept our{" "}
              <Link href="#" className="text-yellow-sun">
                terms
              </Link>
            </label>
            <FormButton type="submit" title="Register" styles="my-2" />
          </form>
          <AuthPlatforms />
          <p className="text-center text-white-ash font-normal text-sm">
            Already a member?{" "}
            <Link href={APP_ROUTES.AUTH.LOGIN} className="text-yellow-sun">
              Login
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Register;
