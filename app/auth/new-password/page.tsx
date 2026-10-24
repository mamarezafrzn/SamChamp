"use client";

import { FC, useState } from "react";
import Image from "next/image";

import FormButton from "@/components/form/form-button";
import FormInput from "@/components/form/form-input";

import frameImg from "@/public/images/new-pass-frame.svg";

// TODO: submit to the reset-password endpoint once it exists.
const NewPassword: FC = () => {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  return (
    <div className="w-full min-h-screen relative">
      <div className="absolute bottom-0 w-full max-h-full overflow-y-auto">
        <Image
          src={frameImg}
          alt="Frame image"
          className="w-auto mb-[-3%] mx-auto"
        />
        <div className="rounded-t-[2rem] bg-grey-charcoal p-6 pt-10">
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
            <FormButton title="Continue" className="my-2" />
          </form>
        </div>
      </div>
    </div>
  );
};

export default NewPassword;
