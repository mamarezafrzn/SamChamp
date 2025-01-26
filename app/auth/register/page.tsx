"use client";
import { FC, useState } from "react";
import Link from "@/node_modules/next/link";
import Image from "@/node_modules/next/image";
import FormInput from "@/components/form/form-input";
import FormButton from "@/components/form/form-button";
import AuthPlatforms from "../components/auth-platforms";
import frameImg from "../../../public/images/register-frame.svg";
import { useDispatch, useSelector } from "react-redux";
import { auth } from "@/store/slices/auth/authActions";
import { validateEmail, validatePassword } from "@/utils/validation";
import { RootState } from "@/store";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";
import { APP_ROUTES } from "@/app/constants/appRoutes";
import { API_ROUTES } from "@/app/constants/apiRoutes";

const Register: FC = () => {
  const dispatch = useDispatch();

  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errors, setErrors] = useState({
    email: "",
    password: "",
    confirmPassword: "",
  });

    //if the user exists move to profile page
  const { user } = useSelector((state: RootState) => state.auth);
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

  const handleSubmit = (e) => {
    e.preventDefault();
    const newErrors = {
      email: validateEmail(email),
      password: validatePassword(password),
      confirmPassword:
        confirmPassword != password ? "password does not match" : "",
    };
    setErrors(newErrors);
    const isValid = Object.values(newErrors).every((error) => !error);
    if (isValid) {
      const formData = {
        email,
        password,
        password_confirmation: confirmPassword,
      };
      dispatch(auth(formData, API_ROUTES.AUTH.REGISTER));
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
            <Link href="/auth/login" className="text-yellow-sun">
              Login
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Register;
