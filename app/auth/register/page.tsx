"use client";

import { FC, SubmitEvent, useEffect, useState } from "react";
import { useRouter } from "next/navigation";

import { APP_ROUTES } from "@/app/constants/appRoutes";

import { fieldLabel } from "@/components/form/field";
import FormInput from "@/components/form/form-input";
import Button from "@/components/ui/button";
import FormError from "@/components/ui/form-error";
import TextLink from "@/components/ui/text-link";

import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { register } from "@/store/slices/auth/authActions";
import { clearAuthError } from "@/store/slices/auth/authSlice";

import { getFormErrors } from "@/lib/api-error";
import { cn } from "@/lib/cn";
import { validateEmail, validatePassword } from "@/utils/validation";

import AuthLayout from "../components/auth-layout";
import AuthPlatforms from "../components/auth-platforms";
import AuthPrompt from "../components/auth-prompt";

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
    <AuthLayout image={frameImg} imageClassName="mb-[-8%] w-full">
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
          className={cn(fieldLabel, "flex flex-row items-center gap-2")}
        >
          <input type="checkbox" id="terms" required />
          By registering, you will accept our{" "}
          <TextLink href="#">terms</TextLink>
        </label>
        <FormError message={serverErrors.formError} />
        <Button type="submit" disabled={loading} className="my-2">
          Register
        </Button>
      </form>
      <AuthPlatforms />
      <AuthPrompt
        text="Already a member?"
        linkText="Login"
        href={APP_ROUTES.AUTH.LOGIN}
      />
    </AuthLayout>
  );
};

export default Register;
