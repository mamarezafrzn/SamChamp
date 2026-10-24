"use client";

import { FC, SubmitEvent, useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";

import { APP_ROUTES } from "@/app/constants/appRoutes";

import FormButton from "@/components/form/form-button";
import FormInput from "@/components/form/form-input";

import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { register } from "@/store/slices/auth/authActions";
import { clearAuthError } from "@/store/slices/auth/authSlice";

import { getFormErrors } from "@/lib/api-error";
import { validateEmail, validatePassword } from "@/utils/validation";

import AuthPlatforms from "../components/auth-platforms";

import frameImg from "@/public/images/register-frame.svg";

const REGISTER_FIELDS = ["email", "password", "password_confirmation"] as const;

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

  const { user, loading, error } = useAppSelector((state) => state.auth);
  const serverErrors = getFormErrors(error, REGISTER_FIELDS);

  // Continue to the profile once registration succeeds (middleware handles later visits).
  useEffect(() => {
    if (user) router.push(APP_ROUTES.PROFILE.EDIT_ACCOUNT);
  }, [user, router]);

  // Don't greet the user with an error from an earlier visit or the login page.
  useEffect(() => {
    dispatch(clearAuthError());
  }, [dispatch]);

  const handleSubmit = (e: SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();
    dispatch(clearAuthError());
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
              autoComplete="email"
              value={email}
              onChange={setEmail}
              error={errors.email || serverErrors.fieldErrors.email}
            />
            <FormInput
              label="Password"
              placeholder="At least 8 characters"
              type="password"
              autoComplete="new-password"
              value={password}
              onChange={setPassword}
              error={errors.password || serverErrors.fieldErrors.password}
            />
            <FormInput
              label="Confirm Password"
              placeholder="Re-type your password"
              type="password"
              autoComplete="new-password"
              value={confirmPassword}
              onChange={setConfirmPassword}
              error={
                errors.confirmPassword ||
                serverErrors.fieldErrors.password_confirmation
              }
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
            {serverErrors.formError && (
              <p role="alert" className="text-red-error text-sm">
                {serverErrors.formError}
              </p>
            )}
            <FormButton
              type="submit"
              title="Register"
              disabled={loading}
              className="my-2"
            />
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
