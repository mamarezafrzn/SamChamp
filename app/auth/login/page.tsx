"use client";

import { FC, SubmitEvent, useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";

import { APP_ROUTES } from "@/app/constants/appRoutes";

import FormButton from "@/components/form/form-button";
import FormInput from "@/components/form/form-input";

import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { login } from "@/store/slices/auth/authActions";
import { clearAuthError } from "@/store/slices/auth/authSlice";

import { getFormErrors } from "@/lib/api-error";
import { validateEmail, validatePassword } from "@/utils/validation";

import frameImg from "../../../public/images/login-frame.svg";
import AuthPlatforms from "../components/auth-platforms";

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

  // Continue to the profile once login succeeds (middleware handles later visits).
  useEffect(() => {
    if (user) router.push(APP_ROUTES.PROFILE.EDIT_ACCOUNT);
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
            <p className="text-right text-white-ash font-normal text-sm">
              Forgot your password?{" "}
              <Link
                href={APP_ROUTES.AUTH.NEW_PASSWORD}
                className="text-yellow-sun"
              >
                click here
              </Link>
            </p>
            {serverErrors.formError && (
              <p role="alert" className="text-red-error text-sm">
                {serverErrors.formError}
              </p>
            )}
            <FormButton
              type="submit"
              title="Login"
              disabled={loading}
              className="my-2"
            />
          </form>
          <AuthPlatforms />
          <p className="text-center text-white-ash font-normal text-sm">
            Not a member?{" "}
            <Link href={APP_ROUTES.AUTH.REGISTER} className="text-yellow-sun">
              Register now
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
