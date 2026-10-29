"use client";

import { FC, SubmitEvent, useEffect, useState } from "react";
import { useRouter } from "next/navigation";

import { APP_ROUTES } from "@/app/constants/appRoutes";

import FormInput from "@/components/form/form-input";
import Button from "@/components/ui/button";
import FormError from "@/components/ui/form-error";

import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { login } from "@/store/slices/auth/authActions";
import { clearAuthError } from "@/store/slices/auth/authSlice";

import { getFormErrors } from "@/lib/api-error";
import { validateEmail, validatePassword } from "@/utils/validation";

import AuthLayout from "../components/auth-layout";
import AuthPlatforms from "../components/auth-platforms";
import AuthPrompt from "../components/auth-prompt";

import frameImg from "@/public/images/login-frame.svg";

const LOGIN_FIELDS = ["email", "password"] as const;

const Login: FC = () => {
  const dispatch = useAppDispatch();

  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({
    email: "",
    password: "",
  });

  const { user, loading, error } = useAppSelector((state) => state.auth);
  const serverErrors = getFormErrors(error, LOGIN_FIELDS);

  // Continue to home once login succeeds (middleware handles later visits).
  useEffect(() => {
    if (user) router.push(APP_ROUTES.HOME);
  }, [user, router]);

  // Don't greet the user with an error from an earlier visit or the register page.
  useEffect(() => {
    dispatch(clearAuthError());
  }, [dispatch]);

  const handleSubmit = (e: SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();
    dispatch(clearAuthError());
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
    <AuthLayout image={frameImg} imageClassName="mx-auto mb-[-4%] w-auto">
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <h1 className="mb-2">Login</h1>
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
          placeholder="Strong#Pass1"
          type="password"
          autoComplete="current-password"
          value={password}
          onChange={setPassword}
          error={errors.password || serverErrors.fieldErrors.password}
        />
        <AuthPrompt
          text="Forgot your password?"
          linkText="click here"
          href={APP_ROUTES.AUTH.NEW_PASSWORD}
          className="text-right"
        />
        <FormError message={serverErrors.formError} />
        <Button type="submit" disabled={loading} className="my-2">
          Login
        </Button>
      </form>
      <AuthPlatforms />
      <AuthPrompt
        text="Not a member?"
        linkText="Register now"
        href={APP_ROUTES.AUTH.REGISTER}
      />
    </AuthLayout>
  );
};

export default Login;
