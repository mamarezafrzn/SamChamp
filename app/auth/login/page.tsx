"use client";
import { FC, useState } from "react";
import Link from "@/node_modules/next/link";
import Image from "@/node_modules/next/image";
import FormInput from "@/components/form/form-input";
import FormButton from "@/components/form/form-button";
import AuthPlatforms from "../components/auth-platforms";
import frameImg from "../../../public/images/login-frame.svg";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/navigation";
import { RootState } from "@/store";
import { validateEmail, validatePassword } from "@/utils/validation";
import { auth } from "@/store/slices/auth/authActions";
import Cookies from "js-cookie";
import { API_ROUTES } from "@/app/constants/apiRoutes";
import { APP_ROUTES } from "@/app/constants/appRoutes";

const Login: FC = () => {
  const dispatch = useDispatch();

  const router = useRouter()

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({
    email: "",
    password: "",
  });

  //if the user exists move to profile page
  const {user} = useSelector((state:RootState)=>state.auth)
  if(user){
    router.push(APP_ROUTES.PROFILE.EDIT_ACCOUNT)
    console.log("login success")

  }

  const emailChangeHandler = (value: string) => {
    setEmail(value);
  };
  const passwordChangeHandler = (value: string) => {
    setPassword(value);
  };


  const handleSubmit = (e) => {
    e.preventDefault();
    const newErrors = {
      email: validateEmail(email),
      password: validatePassword(password),
    };
    setErrors(newErrors);
    const isValid = Object.values(newErrors).every((error) => !error);
    if (isValid) {
      const formData = {
        email,
        password,
      };
      dispatch(auth(formData,API_ROUTES.AUTH.LOGIN));
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
