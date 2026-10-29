"use client";

import { FC, useState } from "react";

import FormInput from "@/components/form/form-input";
import Button from "@/components/ui/button";

import AuthLayout from "../components/auth-layout";

import frameImg from "@/public/images/new-pass-frame.svg";

// TODO: submit to the reset-password endpoint once it exists.
const NewPassword: FC = () => {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  return (
    <AuthLayout image={frameImg} imageClassName="mx-auto mb-[-3%] w-auto">
      <form className="flex flex-col gap-4">
        <h1 className="mb-2">New Password</h1>
        <FormInput
          label="Password"
          placeholder="Strong#Pass1"
          type="password"
          value={password}
          onChange={setPassword}
        />
        <FormInput
          label="Confirm Password"
          placeholder="Re-type your password"
          type="password"
          value={confirmPassword}
          onChange={setConfirmPassword}
        />
        <Button className="my-2">Continue</Button>
      </form>
    </AuthLayout>
  );
};

export default NewPassword;
